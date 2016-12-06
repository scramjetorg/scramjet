#!/usr/bin/env node
// module: buffer-stream, method: constructor

const BufferStream = require('../').BufferStream;

require("fs")
    .createReadStream(require("path").resolve(__dirname, "./data/in-binary.bin"))
    .pipe(new BufferStream())
    .on("data", (chunk) => console.log("chunk of " + chunk.length + " bytes"))
;
