#!/usr/bin/env node
// module: data-stream, method: remap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = async (test) => {
    test.expect(1);

    const stream = DataStream.from([1,2,3,4,5]).rate(3);

    const ret = [];
    setTimeout(() => ret.push("a"), 500);
    setTimeout(() => ret.push("b"), 1500);

    await (stream.rate(3)
        .each(x => ret.push(x))
        .run())
    ;

    await new Promise(res => setTimeout(res, 1000));

    test.deepEquals(ret, [1,2,3,"a",4,5,"b"]);
    test.done();
};
