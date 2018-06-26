#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = async (test) => {
    const data = await DataStream.fromArray([1, 4, 7, 10])
        .flatMap(a => new Promise(s => process.nextTick(s.bind(null, [a, a+1, a+2]))))
        .toArray();

    test.deepEqual(data, [1,2,3,4,5,6,7,8,9,10,11,12], "Passes array items into stream");
    test.done();
};
