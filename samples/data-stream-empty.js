#!/usr/bin/env node
// module: data-stream, method: map

const DataStream = require("../").DataStream;

exports.stream = (n) => DataStream.fromArray(n ? [] : [1]);

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(1);

    const empty = exports.stream(true);
    empty.test = 1;
    empty.empty(
        () => test.ok(true, "empty should be called on a stream with no chunks")
    );

    const full = exports.stream();
    full.test = 2;
    full.empty(
        () => test.ok(false, "non empty stream empty method should not be called")
    );

    Promise.all([
        full.toArray(),
        empty.toArray()
    ]).then(
        () => test.done()
    );
};

exports.log = console.log.bind(console);
