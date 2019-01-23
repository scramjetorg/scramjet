#!/usr/bin/env node
// module: string-stream, method: shift

const {platform, EOL: _EOL} = require("os");
const {resolve, relative} = require("path");
const {unlink} = require("fs");
const {promisify} = require("util");

const StringStream = require("../../").StringStream;
exports.log = console.log.bind(console);
const [executable, EOL] = !`${process.env.SHELL}`.includes("sh") && platform() === "win32"
    ? [relative(".", "./lib/test-exec.cmd"), _EOL]
    : [relative(".", "./lib/test-exec.sh"), "\n"];

exports.test = {
    shell: {
        basic(test) {
            test.expect(1);

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
            test.expect(1);

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
        },
        errors(test) {
            test.expect(3);

            StringStream
                .from(["a1", "b1", "c2", "c1"])
                .append(EOL)
                .exec(executable, {}, "err11")
                .split(EOL)
                .toArray()
                .then(arr => test.fail(`Should not succeed ${arr}`))
                .catch(err => {
                    test.ok(err instanceof Error, "Should raise error");
                    test.ok(err.cause instanceof Error, "Should carry cause");
                    test.equals(err.cause.exitCode, 11, "Should push error code");
                })
                .then(() => test.done())
            ;
        }
    }
};
