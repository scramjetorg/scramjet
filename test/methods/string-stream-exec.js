#!/usr/bin/env node
// module: string-stream, method: shift

const {platform} = require("os");
const {resolve, relative} = require("path");
const {unlink} = require("fs");
const {promisify} = require("util");

const StringStream = require("../../").StringStream;
exports.log = console.log.bind(console);

exports.test = {
    shell: {
        windows(test) {
            if (platform() !== "win32") {
                test.ok(true, "Only testable on win32");
                test.done();
                return;
            }

            const path = relative(".", "./lib/test-exec.cmd");
            StringStream
                .from(["a1", "b1", "c2", "c1"])
                .append("\r\n")
                .exec(path)
                .split("\r\n")
                .toArray()
                .then(arr => test.deepEqual(arr, ["c2", "c1", ""], "Should execute the grep test"))
                .then(() => promisify(unlink)(resolve(__dirname, `${path}.did`)))
                .catch(err => test.fail(err))
                .then(() => test.done())
            ;
        },
        unix(test) {
            if (platform() === "win32") {
                test.ok(true, "Only testable on posix platforms");
                test.done();
                return;
            }

            const path = resolve(__dirname, "./lib/test-exec.sh");
            StringStream
                .from(["a1", "b1", "c2", "c1"])
                .append("\n")
                .exec(path)
                .split("\n")
                .toArray()
                .then(arr => test.deepEqual(arr, ["c2", "c1", ""], "Should execute the grep test"))
                .then(() => promisify(unlink)(resolve(__dirname, `${path}.did`)))
                .catch(err => test.fail(err))
                .then(() => test.done())
            ;
        }
    }
};
