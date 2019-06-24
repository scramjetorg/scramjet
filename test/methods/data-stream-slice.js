#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require("../../").DataStream;


exports.test = function(test) {
    test.expect(5);

    return Promise.all([
        DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
            .slice()
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [1,2,3,4,5,6,7,8,9,0], "Shifted items should be same as starting items");
            }),
        DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
            .slice(3,3)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [4,5,6], "Shifted items should be starting with fourth element");
            }),
        DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
            .slice(3,1)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [4], "Shifted items should be starting with fourth element");
            }),
        DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
            .slice(1,1)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [2], "Shifted items should be starting with second element");
            }),
        DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
            .slice(0,3)
            .toArray()
            .then(arr => {
                test.deepEqual(arr, [1, 2, 3], "Shifted items should be starting with first element");
            }),
    ]).then(() => test.done());
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
