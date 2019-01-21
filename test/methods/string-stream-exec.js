#!/usr/bin/env node
// module: string-stream, method: shift

const {platform, EOL} = require("os");
const {resolve, relative} = require("path");
const {unlink} = require("fs");
const {promisify} = require("util");

const StringStream = require("../../").StringStream;
exports.log = console.log.bind(console);
const executable = platform() === "win32"
    ? relative(".", "./lib/test-exec.cmd")
    : relative(".", "./lib/test-exec.sh");

exports.test = {
    shell: {
        basic(test) {
            StringStream
                .from(["a1", "b1", "c2", "c1"])
                .append(EOL)
                .exec(executable)
                .split(EOL)
                .toArray()
                .then(arr => test.deepEqual(arr, ["c2", "c1", ""], "Should execute the grep test"))
                .then(() => promisify(unlink)(resolve(__dirname, `${executable}.did`)))
                .catch(err => test.fail(err))
                .then(() => test.done())
            ;
        },
        args(test) {
            StringStream
                .from(["a1", "b1", "c2", "c1"])
                .append(EOL)
                .exec(executable, {}, "h1")
                .split(EOL)
                .toArray()
                .then(arr => test.deepEqual(arr, ["h1", "c2", "c1", ""], "Should execute the grep test"))
                .catch(err => test.fail(err))
                .then(() => test.done())
            ;
        }
    }
};
