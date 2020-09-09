module.exports = require("scramjet-core");

module.exports = module.exports.plugin({
    /**
     * A Stream Worker class
     *
     * @inject StreamWorker
     * @memberof module:scramjet
     * @type {StreamWorker}
     */
    StreamWorker: require("./stream-worker")
});

module.exports = module.exports.plugin({
    DataStream: require("./data-stream"),
    BufferStream: require("./buffer-stream"),
    StringStream: require("./string-stream"),
    NumberStream: require("./number-stream"),
    MultiStream: require("./multi-stream")
}).plugin({
    WindowStream: require("./window-stream")
});
