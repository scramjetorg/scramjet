#!/usr/bin/env node
// module: buffer-stream, method: pop

const crypto = require('crypto');

let popped;

exports.stream = () => require("./buffer-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .pop(13, (p) => {                                                           // pop 13 bytes
        popped = {
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
            test.equals(popped.len, 13, "All data was parsed properly");
            test.notEqual(popped.buf.toString("hex"), buf.toString("hex"), "Pop removed data from the item");
            test.done();
        })
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); })
    ;

};

exports.log = console.log.bind(console);
