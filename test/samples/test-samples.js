#!/usr/bin/env node

const scramjet = require("../../");
const fs = require('fs');
const path = require('path');
const {unhandledRejectionHandler} = require("./handlers");
const corepath = path.dirname(require.resolve("scramjet-core"));
const {promisify} = require('util');
const {runTests, flattenTests} = require("scramjet-core/test/tape-runner");

const matrix = [
    ["buffer", scramjet.BufferStream],
    ["string", scramjet.StrinStream],
    ["multi", scramjet.MultiStream],
    ["data", scramjet.DataStream],
    ["scramjet", "index.js"]
];

const access = promisify(fs.access);

process.on("unhandledRejection", unhandledRejectionHandler);
module.exports = scramjet.fromArray(
    matrix.map(
        (item) => ({
            cls: item[0],
            srcpath:
                path.resolve(__dirname, "../../lib/", typeof item[1] === "string" ? item[1] : item[0] + '-stream.js')
        })
    ).concat(
        matrix.map(
            (item) => ({
                cls: item[0],
                srcpath:
                    path.resolve(corepath, typeof item[1] === "string" ? item[1] : item[0] + '-stream.js')
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

                return Object.assign({}, item, {file, method});
            })
            .toArray());

        return arr;
    }
)
.assign(async (test) => {
    const {file, cls, method} = test;

    const prefix = cls + '-stream';

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
        const tests = out.test ? {[method]: out.test} : [];
        out.log = () => 0;

        return {prefix, tests: {
            [method]: tests || ((test) => {
                test.ok(true, "Sample exists but there's no test.");
                test.done();
            })
        }};
    } catch(err) {
        return {prefix, tests: {
            [method](test) {
                test.fail(err, "Test is failed to load: \n" + err && err.stack);
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
        console.error('ERRROR', e && e.stack);
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
