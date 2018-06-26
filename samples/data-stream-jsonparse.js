#!/usr/bin/env node
// module: data-stream, method: JSONStringify

const {StringStream} = require("../");
exports.log = console.log.bind(console);

const dat = [1,2,3,4].map((n) => `{"n":${n}}`).join("\n") + "\n";

exports.stream = () => {
    const stream = new StringStream();
    stream.end(dat);
    return stream;
};

exports.test = async (test) => {
    test.expect(1);

    const withEol = await exports.stream()
        .JSONParse()
        .map(({n}) => n)
        .toArray();
    test.deepEqual(withEol, [1,2,3,4], "Each line should end in os default EOL with no params");

    test.done();
};
