#!/usr/bin/env node
// module: buffer-stream, method: parse

const {DataStream, BufferStream} = require("../../");
const fs = require("fs");
const path = require("path");

exports.stream = () =>
    fs.createReadStream(path.resolve(__dirname, "./data/in-nasdaq.bin"))
        .pipe(new BufferStream())                                                   // construct the BufferStream
        .breakup(13)                                                                // get the data in 13 byte chunks
        .parse(                                                                     // parse every chunk
            (chunk) => ({
                symbol: chunk.toString("ascii", 0, 5).toUpperCase().trim(),         // extract symbol from first 5 bytes
                price: chunk.readUInt32LE(5) / 100,                                 // extract 4-byte unsigned price value
                change: chunk.readInt32LE(9) / 100                                  // extract 4-byte signed change value
            })
        );

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(2);

    let allDataParsed = 0;
    const str = exports.stream()
        .on("data",
            (data) => {
                if (typeof data.symbol === "string" && data.price > 0 && typeof data.change === "number")
                    allDataParsed++;
            }
        )
        .on("end", () => {
            test.equals(allDataParsed, 105, "All data was parsed properly");
            test.done();
        })
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); })
    ;
    test.ok(str instanceof DataStream, "Returns a DataStream");
};
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
