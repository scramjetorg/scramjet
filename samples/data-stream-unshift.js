#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require('../').DataStream;   // eslint-disable-line


exports.test = function(test) {
    test.expect(1);
    DataStream.fromArray([4,5,6])
        .unshift(1,2,3)
        .toArray()
        .then(arr => {
            test.deepEqual(arr, [1,2,3,4,5,6], "Shifted items should contain unshifted elements in the begining");
            test.done();
        });
};

exports.log = console.log.bind(console);
