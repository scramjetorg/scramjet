#!/usr/bin/env node
// module: data-stream, method: use

const DataStream = require("../../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10]);
