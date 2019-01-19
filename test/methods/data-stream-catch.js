#!/usr/bin/env node
// module: data-stream, method: map

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
