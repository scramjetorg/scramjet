module.exports = require('scramjet-core');

/**
 * A Stream Worker class
 * 
 * @memberof module:ScramjetCore
 * @return {StreamWorker}    the resulting stream
 */
module.exports = module.exports.plugin({StreamWorker: require("./stream-worker")});

module.exports = module.exports.plugin({
    DataStream: require('./data-stream'),
    StringStream: require('./string-stream'),
    MultiStream: require('./multi-stream')
});
