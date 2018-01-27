const os = require('os');
const {DataStream} = require('./');

module.exports = {

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @memberof module:ScramjetCore~StringStream#
     * @todo implement splitting by buffer or string
     * @param  {String} [eol=os.EOL] End of line string
     * @return {StringStream}  the re-splitted string stream.
     *
     * @example {@link ../samples/string-stream-split.js}
     */
    lines(eol) {
        return this.split(eol || os.EOL);
    },

    /**
     * Parses each entry as JSON.
     * Ignores empty lines
     *
     * @memberof module:ScramjetCore~StringStream#
     * @param {Boolean} perLine instructs to split per line
     * @return {DataStream}  stream of parsed items
     */
    JSONParse(perLine = true) {
        let str = this;
        if (perLine) {
            str = str.lines();
        }

        return str.filter(a => a !== '').parse(JSON.parse);
    },

    /**
     * Parses CSV to DataString using 'csv-parse' module.
     *
     * @memberof module:ScramjetCore~StringStream#
     * @param options options for the csv-parse module.
     * @return {DataStream}  stream of parsed items
     */
    CSVParse(options) {
        const csv = require("csv-parse");
        return this.pipe(csv(options)).pipe(new DataStream());
    },

    /**
     * Appends given argument to all the items.
     *
     * @memberof module:ScramjetCore~StringStream#
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
     * @memberof module:ScramjetCore~StringStream#
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
