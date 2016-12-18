#!/usr/bin/env node
// module: data-stream, method: group

const DataStream = require('../').DataStream;

exports.stream = () =>
    DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .group((item) => item % 2)                                                  // group odd and even numbers in separate threads
;

exports.log = console.log.bind(console);
