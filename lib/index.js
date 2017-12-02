/**
 * Exports
 *
 * @name scramjet
 * @type {Object}
 */
module.exports = require('scramjet-core');

module.exports = module.exports.plugin({StreamWorker: require("./stream-worker")});

module.exports = module.exports.plugin({
    DataStream: require('./data-stream'),
    StringStream: require('./string-stream'),
    MultiStream: require('./multi-stream')
});
