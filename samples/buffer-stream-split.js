#!/usr/bin/env node
// module: buffer-stream, method: split

const BufferStream = require('../').BufferStream;
const fs = require('fs');
const path = require('path');

let cnt = 0;

fs.createReadStream(path.resolve(__dirname, "./data/in-binary.b640"))           // read input data
    .pipe(new BufferStream())                                                   // pipe to the transforming stream
    .split(Buffer.from("\n"))                                                   // Split by LF
    .on("data", (line) => (console.log("got a line", line), cnt++))
    .on("error",
        (e) => {
            console.error("Error", e && e.stack);
            process.exit(100);
        }
    );
