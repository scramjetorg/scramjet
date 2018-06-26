#!/usr/bin/env node
// module: data-stream, method: constructor

const DataStream = require("../").DataStream;

let assigned;
exports.stream = () => require("./data-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .debug(                                                                     // pauses the debugger here (<-- HERE, not on data!)
        (stream) => exports.log(stream)                                         // inspect the kind of stream we have here
    )
    .debug(
        (stream) => assigned = stream
    )
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    const returned = exports.stream();
    test.ok(returned instanceof DataStream, "exports.stream instance of DataStream");
    test.ok(assigned, "debug should work synchronously");
    test.equals(returned, assigned, "debug should not change the stream");
    test.done();
};

exports.log = console.log.bind(console);
