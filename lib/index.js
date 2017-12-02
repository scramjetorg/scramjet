/**
 * Exports
 *
 * @name scramjet
 * @type {Object}
 */
module.exports = require('scramjet-core');

module.exports = module.exports.plugin({
    DataStream: require('./data-stream'),
    StringStream: require('./string-stream'),
    MultiStream: require('./multi-stream'),
    StreamWorker: require("./stream-worker")
});
