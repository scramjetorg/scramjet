#!/usr/bin/env node
// module: data-stream, method: filter

const DataStream = require('../').DataStream;   // eslint-disable-line

exports.log = console.log.bind(console);

exports.test = async (test) => {
    const stream = DataStream.from([1,2,3,4]);

    const arr = await stream.map(x => x+1)
        .toArray();

    test.ok(Array.isArray(arr), "Return value is an Array");
    test.deepEquals(arr, [2,3,4,5], "Mapped array is returned");

    test.done();

};
