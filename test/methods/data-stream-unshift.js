#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require("../../").DataStream;


exports.test = function(test) {
    test.expect(1);
    DataStream.from(async function() { return [4,5,6]; })
        .unshift(1,2,3)
        .toArray()
        .then(arr => {
            test.deepEqual(arr, [1,2,3,4,5,6], "Shifted items should contain unshifted elements in the begining");
            test.done();
        });
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
