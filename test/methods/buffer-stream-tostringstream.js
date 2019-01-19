#!/usr/bin/env node
// module: buffer-stream, method: tostringstream

const {BufferStream, StringStream} = require("../../");
const fs = require("fs");
const path = require("path");

exports.stream = () =>
    fs.createReadStream(path.resolve(__dirname, "./data/in-binary.b64l"))       // read input data
        .pipe(new BufferStream())                                               // pipe to the transforming stream
        .split(Buffer.from("\n"))                                               // Split by LF in a buffer
        .toStringStream("ascii")                                                    // read as strings
        .each(exports.log)
        .map(
            (b64) => Buffer.from(b64, "base64").toString()
        );

exports.test = (test) => {
    test.expect(3);

    const ret = exports.stream()
        .toStringStream("utf-8")
        .once("data", (line) => {
            test.ok(typeof line === "string", "Should emit lines as strings");
            test.equals(line[0], "A", "First line in the file should begin with an A after decoded from Base64, and is " + line);
            test.done();
        })
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); });

    test.ok(ret instanceof StringStream, "Returns a StringStream");
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
