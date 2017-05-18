const {plgctor} = require('./util/promise-transform-stream');

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
     * Definition of a single mixin for a specific Scramjet class
     *
     * @typedef {Object} StreamMixin
     * @property {Function} constructor optional constructor that will be called in the stream constructor (this has to be an own property!)
     * @property {Function} * any name given will be mixed in to the scramjet stream (except for constructor)
     */

    /**
     * Definition of a plugin in Scramjet
     *
     * @typedef {Object} ScramjetPlugin
     * @property {StreamMixin} BufferStream definition of constructor and properties for the BufferStream prototype.
     * @property {StreamMixin} DataStream definition of constructor and properties for the DataStream prototype.
     * @property {StreamMixin} MultiStream definition of constructor and properties for the MultiStream prototype.
     * @property {StreamMixin} StringStream definition of constructor and properties for the StringStream prototype.
     */

    /**
     * Add a global plugin to scramjet - injects mixins into prototypes.
     *
     * @param  {ScramjetPlugin} mixin the plugin object
     * @chainable
     *
     * @example {@link ../samples/scramjet-plugin.js}
     */
    plugin(mixins) {
        for (const key of Object.keys(mixins)) {
            if (key in this) {
                const Mixin = mixins[key];
                const Stream = this[key];
                if (Mixin.hasOwnProperty("constructor") && Stream[plgctor]) {
                    Stream[plgctor].ctors.push(Mixin.constructor);
                    delete Mixin.constructor;
                }
                Object.assign(Stream.prototype, Mixin);
            }
        }
        return this;
    },

    /**
     *
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
        if (version === 1) {
            return module.exports;
        }
    }
};
