#!/usr/bin/env node

const scramjet = require("../../");
const fs = require("fs");
const path = require("path");
const {unhandledRejectionHandler} = require("./handlers");
const corePath = path.dirname(require.resolve("scramjet-core"));
const {promisify} = require("util");
const {runTests, flattenTests} = require("nodeunit-tape-compat");
const access = promisify(fs.access);

const matrix = [
    ["buffer", scramjet.BufferStream],
    ["string", scramjet.StringStream],
    ["multi", scramjet.MultiStream],
    ["data", scramjet.DataStream],
    ["scramjet", "index.js"]
];


process.on("unhandledRejection", unhandledRejectionHandler);
module.exports = scramjet.fromArray(
    matrix.map(
        (item) => ({
            cls: item[0],
            srcpath:
                path.resolve(__dirname, "../../lib/", typeof item[1] === "string" ? item[1] : item[0] + "-stream.js")
        })
    ).concat(
        matrix.map(
            (item) => ({
                cls: item[0],
                srcpath:
                    path.resolve(corePath, typeof item[1] === "string" ? item[1] : item[0] + "-stream.js")
            })
        )
    )
)
    .flatMap(
        async (item) => {
            const arr = await (fs.createReadStream(item.srcpath)
                .pipe(new scramjet.StringStream())
                .match(/@example.*\{@link ([^}]+)(?:\|[^}]*)?\}/gi)
                .map(match => {
                    const file = path.resolve(__dirname, "../../lib/", match);
                    const method = file.match(/([^-]+).js/)[1];

                    const prefix = item.cls + "-stream";

                    return Object.assign({}, item, {file, prefix, method});
                })
                .toArray());

            return arr;
        }
    )
    .assign(async (test) => {
        const {file, prefix, method} = test;

        try {
            await access(file, fs.constants.R_OK);
        } catch (err) {
            return {prefix, tests: {
                [method](test) {
                    test.fail(err, "Sample for "+method+" is inaccessible!");
                    test.done();
                }
            }};
        }

        try {
            const out = require(file);
            const tests = out.test ? {[method]: out.test} : {[method]: (test) => {
                test.ok(true, "Sample exists but there's no test.");
                test.done();
            }};
            out.log = () => 0;

            return {prefix, tests};
        } catch(err) {
            return {prefix, conf: {timeout: 1000}, tests: {
                [method](test) {
                    test.fail(err, "Test is failed to load: \n" + (err && err.stack));
                    test.done();
                }
            }};
        }
    })
    .assign(
        flattenTests
    )
    .assign(
        runTests
    )
    .catch(
        (e) => {
            console.error("ERRROR", e && e.stack);
            process.exit(103);
        }
    )
    .filter(
        (test) => !test.ok
    )
    .toArray()
    .then(
        (arr) => {
            if (!arr.length)
                return console.error("Tests succeeded!");

            arr.forEach(
                test => console.error(test)
            );

            process.exit(101);
        }
    )
    .catch(
        (error) => {
            console.error("Error", error);
            process.exit(100);
        }
    );
