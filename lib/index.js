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
    StringStream: require("./string-stream"),
    /**
     * A Number stream class
     *
     * @inject NumberStream
     * @memberof module:scramjet
     * @see {@link number-stream.md}
     * @type {NumberStream}
     */
    NumberStream: require("./number-stream"),
    // FSStream: require('./fs-stream'),
    MultiStream: require("./multi-stream")
});

module.exports = module.exports.plugin({
    /**
     * Window stream class
     *
     * @inject WindowStream
     * @memberof module:scramjet
     * @see {@link number-stream.md}
     */
    WindowStream: require("./window-stream")
});
