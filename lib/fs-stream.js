const {DataStream} = require("./");

/**
 * A scramjet stream that items point to filesystem items like files, directories etc. Provides methods like `stat`,
 * `contents`.
 *
 * This is useful for listing filesystem etc.
 *
 * @todo not yet implemented
 * @extends DataStream
 */
class FSStream extends DataStream {
}

module.exports = FSStream;
