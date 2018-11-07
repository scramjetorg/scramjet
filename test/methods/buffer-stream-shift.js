#!/usr/bin/env node
// module: buffer-stream, method: shift

const crypto = require("crypto");

let shifted;

exports.stream = () => require("./buffer-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .shift(13, (p) => {                                                           // shift 13 bytes
        shifted = {
            buf: p,
            len: p.length,
            md5: crypto.createHash("md5").update(p).digest("hex")
        };
    })
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(2);

    exports.stream()
        .once("data", (buf) => {
            test.equals(shifted.len, 13, "All data was parsed properly");
            test.notEqual(shifted.buf.toString("hex"), buf.toString("hex"), "Shift removed data from the item");
            test.done();
        })
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); })
    ;

};

exports.log = console.log.bind(console);
