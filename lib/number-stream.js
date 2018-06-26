const {DataStream} = require("./");

/**
 * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
 * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
 * `reduce` etc.
 *
 * @extends DataStream
 */
class NumberStream extends DataStream {

    /**
    * NumberStream options
    *
    * @typedef NumberStreamOptions
    * @prop {Function} [valueOf=Number..valueOf] value of the data item function.
    * @extends DataStreamOptions
    */

    /**
     * Creates an instance of NumberStream.
     * @param {NumberStreamOptions} options
     * @memberof NumberStream
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
     * @async
     * @return {Number}
     */
    async sum() {
        const _valueOf = this._valueOf;
        return this.reduce((a, x) => a + _valueOf(x), 0);
    }

    /**
     * Calculates the sum of all items in the stream.
     *
     * @async
     * @return {Number}
     */
    async avg() {
        let cnt = 0;
        const _valueOf = this._valueOf;
        return this.reduce((a, x) => (cnt * a + _valueOf(x)) / ++cnt, 0);
    }

}

module.exports = NumberStream;
