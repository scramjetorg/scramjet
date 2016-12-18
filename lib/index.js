/**
 * Exports
 *
 * @name scramjet
 * @type {Object}
 */
module.exports = {
    fromArray(...args) {
        return this.DataStream.fromArray(...args);
    },
    /**
    * Provides a lazy-load accessor to BufferStream
    */
    get BufferStream() { return require("./buffer-stream"); },
    /**
    * Provides a lazy-load accessor to DataStream
    */
    get DataStream() { return require("./data-stream"); },
    /**
    * Provides a lazy-load accessor to MultiStream
    */
    get MultiStream() { return require("./multi-stream"); },
    /**
    * Provides a lazy-load accessor to StringStream
    */
    get StringStream() { return require("./string-stream"); },
    /**
     * Gets an API version (this may be important for future use)
     * @param {Number} version The required version (currently only: 1)
     */
    API(version) {
        if (version === 1) return module.exports;
    }
};
