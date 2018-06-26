#!/usr/bin/env node
// module: buffer-stream, method: split

const BufferStream = require("../").BufferStream;
const fs = require("fs");
const path = require("path");

let cnt = 0;

exports.stream = () =>
    fs.createReadStream(path.resolve(__dirname, "./data/in-binary.b64l"))       // read input data
        .pipe(new BufferStream())                                               // pipe to the transforming stream
        .split(Buffer.from("\n"))                                               // Split by LF in a buffer
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(3);
    exports.stream()
        .on("data", (line) => (exports.log("got a line", line), cnt++))
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); })
        .toArray()
        .then(
            (arr) => {
                test.equals(cnt, 3, "Empty data is not emitted (In BufferStream)");
                test.equals(arr.length, 3, "All lines are splitted, empty buffers are not emitted");
                test.ok(Buffer.from(...arr).indexOf(Buffer.from("\n")) === -1, "The splitter doesn't appear in chunks");
                test.done();
            }
        )
        .catch(
            (e) => console.error(e && e.stack)
        );
};

exports.log = console.log.bind(console);
