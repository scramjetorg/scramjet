#!/usr/bin/env node
// module: buffer-stream, method: parse

const DataStream = require("../").DataStream;

exports.stream = () =>
    require("./buffer-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .parse(                                                                     // parse every chunk
        (chunk) => ({
            symbol: chunk.toString("ascii", 0, 5).toUpperCase().trim(),         // extract symbol from first 5 bytes
            price: chunk.readUInt32LE(5) / 100,                                 // extract 4-byte unsigned price value
            change: chunk.readInt32LE(9) / 100                                  // extract 4-byte signed change value
        })
    );

exports.test = (test) => {
    test.expect(3);

    let allDataParsed = 0;
    const str = exports.stream()
        .on("data",
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

    test.ok(str instanceof DataStream, "");
};
