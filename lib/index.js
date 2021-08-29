module.exports = require("./core");

module.exports.plugin({
    /**
     * A Stream Worker class
     *
     * @inject StreamWorker
     * @memberof module:scramjet
     * @type {StreamWorker}
     */
    StreamWorker: require("./stream-worker")
});

module.exports.plugin({
    DataStream: require("./data-stream"),
    BufferStream: require("./buffer-stream"),
    StringStream: require("./string-stream"),
    MultiStream: require("./multi-stream"),
    NumberStream: require("./number-stream")
}).plugin({
    WindowStream: require("./window-stream")
});
