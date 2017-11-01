#!/usr/bin/env node
// module: string-stream, method: match

const StringStream = require('../').StringStream;   // eslint-disable-line

const test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n" +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n" +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est\n" +
    "laborum."
;

exports.log = console.log.bind(console);

StringStream.fromString(test)
    .match(/\b(\w{4})[^\w]/g)
    // .match(/c[\w]+/gi)
    .each(exports.log);
