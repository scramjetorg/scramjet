#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = async (test) => {
    const stream1 = DataStream.fromArray([1, 2, 3]);
    const stream2 = DataStream.fromArray([4, 5, 6]);

    const data = await (stream1.concat(stream2).toArray());

    test.deepEqual(data, [1,2,3,4,5,6], "Passes second array items after the first");
    test.done();
};
