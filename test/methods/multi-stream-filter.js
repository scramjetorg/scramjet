#!/usr/bin/env node
// module: multi-stream, method: filter

// const MultiStream = require("../../").MultiStream;   // eslint-disable-line


exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
