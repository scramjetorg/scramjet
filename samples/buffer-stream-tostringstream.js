#!/usr/bin/env node
// module: buffer-stream, method: tostringstream

const BufferStream = require('../').BufferStream;
const fs = require('fs');
const path = require('path');

let cnt = 0;

fs.createReadStream(path.resolve(__dirname, "./data/in-binary.b640"))           // read input data
    .pipe(new BufferStream())                                                   // pipe to the transforming stream
    .split(Buffer.from("\n"))                                                   // Split by LF
    .toStringStream("ascii")                                                    // read as ASCII
    .map(
        (b64) => Buffer.from(b64, "base64").toString()
    )
    .on("data", (str) => (console.log("got a line", str), cnt++))
    .on("error",
        (e) => {
            console.error("Error", e && e.stack);
            process.exit(100);
        }
    );
