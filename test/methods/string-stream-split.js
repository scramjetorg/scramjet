#!/usr/bin/env node
// module: string-stream, method: split

const StringStream = require("../../").StringStream;   // eslint-disable-line


const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = async (test) => {
    const arr = await StringStream.fromString(text)
        .split(/[^\w]+/g)
        .each(exports.log)
        .toArray();

    test.ok(!arr.find(a => a.indexOf(" ") > -1));
    test.done();
};


exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
