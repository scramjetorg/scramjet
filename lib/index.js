module.exports = {
    get Accumulator() { return require("./accumulator"); },
    get BufferStream() { return require("./buffer-stream"); },
    get DataEmitter() { return require("./data-emitter"); },
    get DataStream() { return require("./data-stream"); },
    get MultiStream() { return require("./multi-stream"); },
    get StringStream() { return require("./string-stream"); },
    API(version) {
        if (version === 1) return module.exports;
    }
};
