/**
 *
 * @type {Object}
 */
module.exports = {

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @todo implement splitting by buffer or string
     * @param  {RegExp|String} splitter What to split by
     * @return {StringStream}  the re-splitted string stream.
     *
     * @example {@link ../samples/string-stream-split.js}
     */
    lines() {
        return this.split("\n");
    },

    /**
     * Appends given argument to all the items.
     *
     * @param {Function|String} arg the argument to append. If function passed then it will be called and resolved
     *                              and the resolution will be appended.
     * @return {StringStream}  the resulting stream
     *
     * @example {@link ../samples/string-stream-append.js}
     */
    append(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => item + result)) : this.map(item => item + arg);
    },

    /**
     * Prepends given argument to all the items.
     *
     * @param {Function|String} arg the argument to prepend. If function passed then it will be called and resolved
     *                              and the resolution will be prepended.
     * @return {StringStream}  the resulting stream
     *
     * @example {@link ../samples/string-stream-prepend.js}
     */
    prepend(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => result + item)) : this.map(item => arg + item);
    }

};
