#!/usr/bin/env node
// module: buffer-stream, method: constructor

const BufferStream = require('scramjet').BufferStream;

require("fs")
    .createReadStream(require("path").resolve(__filename, "./data/in-binary.bin"))
    .pipe(new BufferStream())
    .on("data", (chunk) => console.log("chunk of " + chunk.length + " bytes"))
;
