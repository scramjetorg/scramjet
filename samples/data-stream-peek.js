#!/usr/bin/env node
// module: data-stream, method: map

const DataStream = require("../").DataStream;

exports.stream = () => DataStream.fromArray([1, 2, 3, 4]);

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(2);
    const stream = exports.stream();

    Promise.all([
        new Promise(res =>
            stream.peek(2, (x) => test.deepEqual([1,2], x, "Should take first two chunks", res()))
        ),
        stream.toArray()
            .then(arr => test.equals(arr.length, 4, "Should not remove items from stream"))
    ]).then(
        () => test.done()
    );

};

exports.log = console.log.bind(console);
