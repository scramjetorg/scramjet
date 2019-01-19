#!/usr/bin/env node
// module: data-stream, method: _selfInstance

// const DataStream = require("../../").DataStream;   // eslint-disable-line
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
