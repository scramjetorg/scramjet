#!/usr/bin/env node
// module: buffer-stream, method: parse

const BufferStream = require('../').BufferStream;

const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(__dirname, "./data/in-nasdaq.bin"))           // read input data
    .pipe(new BufferStream())                                                   // pipe to the transforming stream
    .breakup(13)                                                                // breakup into 11-byte chunks (remember! this is an Object stream!)
    .parse(                                                                     // parse every chunk
        (chunk) => ({
            symbol: chunk.toString("ascii", 0, 5).toUpperCase().trim(),         // extract symbol from first 5 bytes
            price: chunk.readUInt32LE(5) / 100,                                 // extract 4-byte unsigned price value
            change: chunk.readInt32LE(9) / 100                                  // extract 4-byte signed change value
        })
    )
    .on("data",
        (data) => console.log("stock: ", data.symbol, data.price + " USD", data.change + " USD")
    )
    .on("error",
        (e) => {
            console.error("Error", e && e.stack);
            process.exit(100);
        }
    );
