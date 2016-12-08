#!/usr/bin/env node
// module: buffer-stream, method: parse
const crypto = require('crypto');

let popped;

exports.stream = () =>
    require("./buffer-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .pop(13, (p) => {                                                           // pop 13 bytes
        popped = {
            buf: p,
            len: p.length,
            md5: crypto.createHash("md5").update(p).digest("hex")
        };
    });


exports.test = (test) => {
    test.expect(3);

    let allDataParsed = 0;
    exports.stream()
        .once("data",
            (data) => {
                console.log("stock: ", data.symbol, data.price + " USD", data.change + " USD");
                if (typeof data.symbol === "string" && data.price > 0 && typeof data.change === "number") {
                    allDataParsed++;
                }
            }
        )
        .on("end", () => {
            test.equals(allDataParsed, 105, "All data was parsed properly");
            test.done();
        })
        .on("error",
            (e) => {
                console.error(e && e.stack);
                test.ok(false, "Should not throw error", e && e.stack);
            }
        );


};
