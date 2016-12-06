#!/usr/bin/env node
// module: buffer-stream, method: parse
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BufferStream = require('../').BufferStream;
let popped;

fs.createReadStream(path.resolve(__dirname, "./data/in-nasdaq.bin"))           // read input data
    .pipe(new BufferStream())                                                   // pipe to the transforming stream
    .pop(13, (p) => {                                                           // pop 13 bytes
        popped = true;
        console.assert(p.length === 13, "Should pop the right amount?");
        console.log("Yey! Popped", p.length, "chars with md5:", crypto.createHash("md5").update(p).digest("hex"));
    })
    .on("error",
        (e) => {
            console.error("Error", e && e.stack);
            process.exit(100);
        }
    );

setTimeout(
    () => {
        if (!popped) {
            console.error("Should have so much popped by now!");
            process.exit(1);
        }
    },
    100
);
