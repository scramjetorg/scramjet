module.exports = {
    get Accumulator() { return require("./lib/accumulator"); },
    get BufferStream() { return require("./lib/buffer-stream"); },
    get DataEmitter() { return require("./lib/data-emitter"); },
    get DataStream() { return require("./lib/data-stream"); },
    get MultiStream() { return require("./lib/multi-stream"); },
    get StringStream() { return require("./lib/string-stream"); }
};
