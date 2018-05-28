module.exports = require('scramjet-core');

module.exports = module.exports.plugin({
    /**
     * A Stream Worker class
     *
     * @memberof scramjet
     * @return {StreamWorker}    the resulting stream
     */
    StreamWorker: require("./stream-worker")
});

module.exports = module.exports.plugin({
    DataStream: require('./data-stream'),
    StringStream: require('./string-stream'),
    /**
     * A Number stream class
     *
     * @memberof scramjet
     * @see {@link number-stream.md}
     * @return {NumberStream}    the resulting stream
     */
    NumberStream: require('./number-stream'),
    // FSStream: require('./fs-stream'),
    MultiStream: require('./multi-stream')
});

module.exports = module.exports.plugin({
    WindowStream: require('./window-stream')
});
