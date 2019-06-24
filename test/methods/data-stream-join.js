#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require("../../").DataStream;


exports.test = {
    function_arg(test) {
        test.expect(1);
        DataStream.fromArray([1, 2, 3])
            .join((prev, next, extra) => extra + prev / next, .7)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [1, 1 / 2 + .7, 2, 2 / 3 + .7, 3], "join items should be added between items");
                test.done();
            });
    },
    generator_arg(test) {
        test.expect(1);
        DataStream.fromArray([1, 2, 3, 4])
            .join(function* (extra) {
                const x = yield extra;
                yield x - 3;
            }, -6)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [1, -6, 2, -2, 3, 4], "join items should be added between items");
                test.done();
            });
    },
    item_arg(test) {
        test.expect(1);
        DataStream.fromArray([1, 2, 3])
            .join(0)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [1, 0, 2, 0, 3], "join items should be added between items");
                test.done();
            });
    }
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
