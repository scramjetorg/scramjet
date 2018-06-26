#!/usr/bin/env node
// module: data-stream, method: slice

const DataStream = require('../').DataStream;   // eslint-disable-line


exports.test = function(test) {
    test.expect(1);
    DataStream.fromArray([1,2,3,4,5,6,7,8,9,0])
        .slice(3,3)
        .toArray()
        .then(arr => {
            test.deepEqual(arr, [4,5,6], "Shifted items should be starting with fourth element");
            test.done();
        });
};

exports.log = console.log.bind(console);
