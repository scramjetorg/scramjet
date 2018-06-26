#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = (test) => {
    test.expect(6);
    DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
        .batch(3)
        .each(
            (item) => {
                test.ok("Items except for the last one must be length of 3", item[0] === 10 || item.length === 3);
                exports.log(item);
            }
        )
        .toArray()
        .then(
            (acc) => {
                test.ok("Result should be 4 items", acc.length === 4);
                test.ok("Items should be arrays", Array.isArray(acc[0]));
                test.done();
            }
        )
        .catch(
            (e) => {
                test.fail(e.stack);
                test.done();
            }
        );
};

exports.log = console.log.bind(console);
