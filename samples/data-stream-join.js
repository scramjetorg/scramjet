#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require('../').DataStream;   // eslint-disable-line


exports.test = function(test) {
    test.expect(1);
    DataStream.fromArray([1,2,3])
        .join(0)
        .toArray()
        .then(arr => {
            test.deepEqual(arr, [1,0,2,0,3], "join items should be added between items");
            test.done();
        });
};

exports.log = console.log.bind(console);
