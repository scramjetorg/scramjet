#!/usr/bin/env node
// module: data-stream, method: reduceNow

const DataStream = require("../").DataStream;

exports.log = console.log.bind(console);

exports.test = async (test) => {
    const stream = DataStream.fromArray([1,2,3,4]);

    const item = [];
    const ret = stream.reduceNow(
        (acc, item) => (acc.push(item + 1), acc),
        item
    );

    test.equals(item, ret, "Returns passed item immediately");
    test.equals(ret.length, 0, "Returns the same item before running operations");

    await stream.whenEnd();
    await new Promise(res => process.nextTick(res));

    test.equals(ret+"", "2,3,4,5", "Passes all items on next tick after original stream ends");

    test.done();

};
