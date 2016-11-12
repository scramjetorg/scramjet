module.exports = {
    get BufferStream() { return require("./buffer-stream"); },
    get DataStream() { return require("./data-stream"); },
    get MultiStream() { return require("./multi-stream"); },
    get StringStream() { return require("./string-stream"); },
    API(version) {
        if (version === 1) return module.exports;
    }
};
