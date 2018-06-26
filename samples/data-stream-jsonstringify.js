#!/usr/bin/env node
// module: data-stream, method: JSONStringify

const os = require("os");

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

const dat = [1,2,3,4];
exports.stream = () => DataStream.fromArray(dat).map((n) => ({n}));

exports.test = async (test) => {
    test.expect(3);

    const withEol = await exports.stream()
        .JSONStringify()
        .toArray();
    test.deepEqual(withEol, ["{\"n\":1}"+os.EOL,"{\"n\":2}"+os.EOL,"{\"n\":3}"+os.EOL,"{\"n\":4}"+os.EOL], "Each line should end in os default EOL with no params");

    const withNl = await exports.stream()
        .JSONStringify("\n")
        .toArray();
    test.deepEqual(withNl, ["{\"n\":1}\n","{\"n\":2}\n","{\"n\":3}\n","{\"n\":4}\n"], "Each line should end in given EOL");

    const noEol = await exports.stream()
        .JSONStringify(false)
        .toArray();
    test.deepEqual(noEol, ["{\"n\":1}","{\"n\":2}","{\"n\":3}","{\"n\":4}"], "Each line should end not have EOL if false passed");

    test.done();
};
