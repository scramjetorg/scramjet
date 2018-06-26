#!/usr/bin/env node
// module: data-stream, method: constructor

const DataStream = require("../").DataStream;

exports.stream = () =>require("./buffer-stream-parse")
    .stream()                                                                   // get BufferStream from another example
    .pipe(new DataStream())                                                     // construct the DataStream
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.ok(exports.stream() instanceof DataStream, "exports.stream instance of DataStream");
    test.done();
};

exports.log = console.log.bind(console);
