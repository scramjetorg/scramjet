module.exports = require('scramjet-core');

module.exports = module.exports.plugin({
    /**
     * A Stream Worker class
     *
     * @memberof module:scramjet
     * @type {StreamWorker}
     */
    StreamWorker: require("./stream-worker")
});

module.exports = module.exports.plugin({
    DataStream: require('./data-stream'),
    StringStream: require('./string-stream'),
    /**
     * A Number stream class
     *
     * @memberof module:scramjet
     * @see {@link number-stream.md}
     * @type {NumberStream}
     */
    NumberStream: require('./number-stream'),
    // FSStream: require('./fs-stream'),
    MultiStream: require('./multi-stream')
});

module.exports = module.exports.plugin({
    /**
     * Window stream class
     *
     * @memberof module:scramjet
     * @see {@link number-stream.md}
     * @type {WindowStream}
     */
    WindowStream: require('./window-stream')
});
