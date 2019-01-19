#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = async (test) => {
    const data = await DataStream.fromArray([1, 4, 7, 10])
        .map(a => new Promise(s => process.nextTick(s.bind(null, [a, a+1, a+2]))))
        .flatten()
        .toArray();

    test.deepEqual(data, [1,2,3,4,5,6,7,8,9,10,11,12], "Passes array items into stream");
    test.done();
};
