#!/usr/bin/env node
// module: buffer-stream, method: parse

const BufferStream = require('../').BufferStream;

const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(__dirname, "./data/in-nasdaq.bin"))           // read input data
    .pipe(new BufferStream())                                                   // pipe to the transforming stream
    .breakup(13)                                                                // breakup into 13-byte chunks (remember! this is an Object stream!)
    .on("data", (data) => {
        console.log("data.length should be at most 13 and is", data.length);
    })
    .on("error",
        (e) => {
            console.error(e && e.stack);
            process.exit(100);
        }
    );
