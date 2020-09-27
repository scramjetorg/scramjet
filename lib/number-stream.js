const {DataStream} = require("./");

/**
 * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
 * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
 * `reduce` etc.
 *
 * @memberof module:scramjet.
 * @extends DataStream
 */
class NumberStream extends DataStream {

    /**
     * @callback ValueOfCallback
     * @memberof module:scramjet~
     * @param {*} chunk stream object
     * @returns {Promise<number>|number} value of the object
     */

    /**
     * NumberStream options
     *
     * @typedef {object} NumberStreamOptions
     * @memberof module:scramjet~
     * @prop {ValueOfCallback} [valueOf=x => +x] value of the data item function.
     * @extends DataStreamOptions
     */

    /**
     * Creates an instance of NumberStream.
     * @param {NumberStreamOptions} options
     * @memberof module:scramjet
     */
    constructor(options, ...args) {
        super(options, ...args);
    }

    get _valueOf() {
        return this._options.valueOf || ((x) => +x);
    }

    /**
     * Calculates the sum of all items in the stream.
     *
     * @return {Promise<number>|any}
     */
    async sum() {
        const _valueOf = this._valueOf;
        return this.reduce(async (a, x) => a + await _valueOf(x), 0);
    }

    /**
     * Calculates the sum of all items in the stream.
     *
     * @return {Promise<number>|any}
     */
    async avg() {
        let cnt = 0;
        const _valueOf = this._valueOf;
        return this.reduce(async (a, x) => (cnt * a + await _valueOf(x)) / ++cnt, 0);
    }

}

module.exports = NumberStream;
