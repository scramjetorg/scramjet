#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require('../').DataStream;   // eslint-disable-line


exports.test = function(test) {
    test.expect(1);
    DataStream.fromArray([1,2,3])
        .endWith(4)
        .toArray()
        .then(arr => {
            test.deepEqual(arr, [1,2,3,4], "End with items should be added at the end");
            test.done();
        });
};

exports.log = console.log.bind(console);
