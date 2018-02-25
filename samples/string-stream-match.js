#!/usr/bin/env node
// module: string-stream, method: match

const StringStream = require('../').StringStream;   // eslint-disable-line

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n" +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n" +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est\n" +
    "laborum."
;

exports.log = console.log.bind(console);

exports.test = async (test) => {
    const words4 = await StringStream.fromString(text)
        .match(/\b(\w{4})[^\w]/g)
        .toArray();

    test.ok(!words4.find(a => a.length !== 4), "Only 4 letter words are matched");
    test.done();
};
