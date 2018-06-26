#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { unhandledRejectionHandler } = require("./handlers");
const { promisify } = require("util");
const { runTests, flattenTests } = require("nodeunit-tape-compat");
const { DataStream } = require("../../");
const file = path.resolve(process.cwd(), process.argv[2]);
const access = promisify(fs.access);

process.on("unhandledRejection", unhandledRejectionHandler);

DataStream.fromArray([{
    file,
    prefix: process.argv[2].replace(/[^\w\d]+/g, "-"),
    method: "run-sample"
}])
    .assign(async (test) => {
        const { file, prefix, method } = test;

        try {
            await access(file, fs.constants.R_OK);
        } catch (err) {
            return {
                prefix, tests: {
                    [method](test) {
                        test.fail(err, "Sample for " + method + " is inaccessible!");
                        test.done();
                    }
                }
            };
        }

        try {
            const out = require(file);
            const tests = out.test ? {[method]: out.test} : {[method]: (test) => {
                test.ok(true, "Sample exists but there's no test.");
                test.done();
            }};

            return {
                prefix, tests
            };
        } catch (err) {
            return {
                prefix, conf: { timeout: 1000 }, tests: {
                    [method](test) {
                        test.fail(err, "Test is failed to load: \n" + (err && err.stack));
                        test.done();
                    }
                }
            };
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
    .catch(
        (err) => {
            console.error(err);
            process.exit(127);
        }
    );
