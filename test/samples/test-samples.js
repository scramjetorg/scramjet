#!/usr/bin/env node

const scramjet = require("../../");
const fs = require('fs');
const path = require('path');
const nodeunit = require('../lib/reporter');
const {unhandledRejectionHandler} = require("./handlers");
const corepath = path.dirname(require.resolve("scramjet-core"));
const {promisify} = require('util');

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
.catch(e => console.error(e && e.stack))
.assign(async (test) => {
    const {file, method} = test;

    try {
        await access(file, fs.constants.R_OK);
    } catch (err) {
        return {err: err, test: (test) => {
            test.ok(false, "Sample for "+method+" is inaccessible!");
            test.done();
        }};
    }

    try {
        const out = require(file);

        return {log() {}, test: out.test || ((test) => {
            test.ok(true, "Sample exists but there's no test.");
            test.done();
        })};
    } catch(err) {
        return {err: err, test: (test) => {
            test.ok(false, "Test is failed to load: \n" + err && err.stack);
            test.done();
        }};
    }
})
.reduce(
    (acc, item) => {
        const base = item.cls + ":" + item.method;
        acc[base] = item.test;
        return acc;
    },
    {}
).then(
    async (tests) => {
        tests = Object.keys(tests).sort().reduce(
            (acc, key) => (acc[key] = tests[key], acc),
            {}
        );
        const outcome = await promisify(nodeunit.run)("samples_test", tests, null);

        const errs = outcome.map(({error}) => error)
            .filter(e => e)
        ;

        if (errs.length) {
            throw new Error(errs.length + " errors found");
        }
    }
).then(
    () => console.log("Tests succeeded!"),
    (e) => {
        console.error("Some tests failed", e.message);
        process.exit(101);
    }
).catch(
    (error) => {
        console.log("Error", error);
        process.exit(100);
    }
);
