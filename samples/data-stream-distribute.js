#!/usr/bin/env node
// module: data-stream, method: constructor

const DataStream = require("../").DataStream;

const cpus = require("os").cpus().length * 2;

function* gen() {
    for (let z = 0; z < 1e3; z++)
        yield z;
}

exports.test = {
    distribute(test) {
        test.expect(3);

        DataStream.fromIterator(gen())
            .distribute(
                i => i % cpus,
                require.resolve("./tests/prime.js")
            )
            .toArray()
            .then((arr) => {
                test.equal(arr.length, 169, "169 prime numbers must be found");
                test.ok(arr.includes(13), "13 is prime");
                test.ok(!arr.includes(30), "30 isn't prime");
                test.done();
            });
    }
};
