#!/usr/bin/env node
// module: data-stream, method: use

const DataStream = require("../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10]);

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(3);

    const stream = exports.stream();
    const ref = Symbol("test");

    let called = false;

    const out = stream.use(
        (innerStream) => {
            test.equals(stream, innerStream, "Must be called with self as first argument");
            called = true;
            return ref;
        }
    );

    test.equals(ref, out, "Must pass return value");
    test.ok(called, "Must be called and executed synchronously"); // TODO: but rethink this, because why not async before resuming the stream?
    test.done();

};
