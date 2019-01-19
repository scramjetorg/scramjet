#!/usr/bin/env node
// module: string-stream, method: parse

// const StringStream = require("../../").StringStream;   // eslint-disable-line


exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
