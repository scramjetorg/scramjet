#!/usr/bin/env node
// module: data-stream, method: reduce

const DataStream = require("../").DataStream;

let ref;
exports.stream = () =>
    DataStream.fromArray([
        {num: 0},
        {num: 1},
        {num: 2},
        {num: 3},
        {num: 4},
        {num: 5},
        {num: 6},
        {num: 7},
        {num: 8},
        {num: 9},
        {num: 10}
    ]).reduce(
        (acc, item) => {
            acc.sum += item.num;
            acc.cnt++;
            return ref = Object.assign({avg: acc.sum / acc.cnt}, acc);
        },
        {sum: 0, cnt: 0}
    );

exports.test = (test) => {
    const returned = exports.stream();
    test.expect(4);

    test.ok(returned instanceof Promise, "Must return promise");
    returned.then(
        (sum) => {
            test.equals(sum.sum, 55, "Sum must be calculated from all values");
            test.equals(sum.cnt, 11, "Reduce from all values");
            test.equals(sum, ref, "Last value returned must be passed here");
            test.done();
        }
    );
};

exports.log = console.log.bind(console);
