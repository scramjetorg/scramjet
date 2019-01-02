#!/usr/bin/env node
// module: string-stream, method: shift

const StringStream = require("../../").StringStream;
exports.log = console.log.bind(console);

exports.test = {
    shell(test) {
        StringStream
            .from(["a1", "b1", "c2", "c1"])
            .append("\n")
            .exec("./lib/test-exec.sh")
            .split("\n")
            .toArray()
            .then(arr => test.deepEqual(arr, ["c2", "c1"], "Should execute the grep test"))
            .catch(err => test.fail(err))
            .then(() => test.done())
        ;
    }
};
