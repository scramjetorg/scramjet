#!/usr/bin/env node
// @ts-nocheck

const scramjet = require("../../");
const fs = require("fs");
const path = require("path");
const {unhandledRejectionHandler} = require("./handlers");
const corePath = path.dirname(require.resolve("scramjet-core"));
const {promisify} = require("util");
const {runTests, flattenTests} = require("nodeunit-tape-compat");
const access = promisify(fs.access);
const decache = require("decache");

const matrix = [
    ["buffer", scramjet.BufferStream],
    ["string", scramjet.StringStream],
    ["multi", scramjet.MultiStream],
    ["data", scramjet.DataStream],
    ["scramjet", "index.js"]
];

// cleanup environment before running tests.
delete require.cache["scramjet"];
delete require.cache["scramjet-core"];

process.on("unhandledRejection", unhandledRejectionHandler);
process.on("uncaughtExceptionMonitor", unhandledRejectionHandler);

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
        async (item) => fs.createReadStream(item.srcpath)
            .pipe(new scramjet.StringStream())
            .match(/@test (.+)/gi)
            .map(match => {
                const file = path.resolve(__dirname, "../../", match);
                const method = file.match(/([^-]+).js/)[1];

                const prefix = item.cls + "-stream";

                return Object.assign({}, item, {file, prefix, method});
            })
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
            Object.keys(require.cache).forEach(mod => decache(mod));

            const out = require(file);
            if (!out) return scramjet.DataStream.filter();

            out.log = () => 0;

            if (out.test) {
                return { prefix, tests: out.test };
            }

            return {prefix, tests: {[method]: (test) => {
                test.ok(true, "Sample exists but there's no test.");
                test.done();
            }}};
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
    .do(x => unhandledRejectionHandler.lastAction = x.file)
    .setOptions({maxParallel: 1})
    .assign(
        runTests
    )
    .tap()
    .catch(
        (e) => {
            console.error("ERROR", e && e.stack);
            if (e && e.chunk) console.error("CHUNK", e.chunk);
            process.exit(103);
        }
    )
    .filter(
        (test) => !test.ok
    )
    .setOptions({maxParallel: 1024})
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
