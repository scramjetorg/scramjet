#!/usr/bin/env node
// module: data-stream, method: filter

// const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
