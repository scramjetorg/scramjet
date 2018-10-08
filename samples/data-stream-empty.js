#!/usr/bin/env node
// module: data-stream, method: map

const DataStream = require("../").DataStream;

exports.stream = (n) => DataStream.fromArray(n ? [] : [1]);

// ------- END EXAMPLE --------

exports._test = (test) => {
    test.expect(3);

    const empty = exports.stream(true);
    empty.test = 1;
    empty.empty(
        () => {
            empty.called = true;
            test.ok(true, "empty should be called on a stream with no chunks");
        }
    );
    console.log(empty.type);

    const full = exports.stream();
    full.test = 2;
    full.empty(
        () => {
            full.called = true;
            test.ok(false, "non empty stream empty method should not be called");
        }
    );

    Promise.all([
        full.run()
            .then(() => test.ok(!full.called, "Empty should not be called")),
        empty.run()
            .then(() => test.ok(empty.called, "Empty should be called before end"))
    ]).then(
        () => {
            test.done();
        }
    );
};

exports.log = console.log.bind(console);
