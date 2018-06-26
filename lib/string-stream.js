const os = require("os");
const {DataStream} = require("./");

module.exports = {

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @chainable
     * @memberof StringStream#
     * @todo implement splitting by buffer or string
     * @param  {String} [eol=os.EOL] End of line string
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
     * @chainable
     * @memberof StringStream#
     * @param {Boolean} perLine instructs to split per line
     * @return {DataStream}  stream of parsed items
     */
    JSONParse(perLine = true) {
        let str = this;
        if (perLine) {
            str = str.lines();
        }

        return str.filter(a => a !== "").parse(JSON.parse);
    },

    /**
     * Parses CSV to DataString using 'papaparse' module.
     *
     * @chainable
     * @memberof StringStream#
     * @param options options for the papaparse.parse method.
     * @return {DataStream}  stream of parsed items
     * @example {@link ../samples/data-stream-separate.js}
     */
    CSVParse(options = {}) {
        const out = new DataStream();
        require("papaparse").parse(this, Object.assign(options, {
            chunk: async ({data, errors}, parser) => {
                if (errors.length) {
                    return out.emit("error", Object.assign(new Error(), errors[0]));
                }

                if (!out.write(data)) {
                    parser.pause();
                    await out.whenDrained();
                    parser.resume();
                }
            },
            complete: () => {
                out.end();
            },
            error: (e) => {
                out.emit("error", e);
            }
        }));

        return out.flatten();
    },

    /**
     * Appends given argument to all the items.
     *
     * @chainable
     * @memberof StringStream#
     * @param {Function|String} arg the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     *
     * @example {@link ../samples/string-stream-append.js}
     */
    append(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => item + result)) : this.map(item => item + arg);
    },

    /**
     * Prepends given argument to all the items.
     *
     * @chainable
     * @memberof StringStream#
     * @param {Function|String} arg the argument to prepend. If function passed then it will be called and resolved
     *                              and the resolution will be prepended.
     *
     * @example {@link ../samples/string-stream-prepend.js}
     */
    prepend(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => result + item)) : this.map(item => arg + item);
    }

};
