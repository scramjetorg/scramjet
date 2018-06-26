#!/usr/bin/env node
// module: buffer-stream, method: constructor

const BufferStream = require("../").BufferStream;

exports.stream = () =>
    require("fs").createReadStream(
        require("path").resolve(__dirname, "./data/in-nasdaq.bin")
    )
        .pipe(new BufferStream())                                                   // construct the BufferStream
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.ok(exports.stream() instanceof BufferStream, "exports.stream instance of BufferStream");
    test.done();
};

exports.log = console.log.bind(console);
