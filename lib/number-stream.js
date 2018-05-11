const {DataStream} = require('./');

/**
 * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
 * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
 * `reduce` etc.
 *
 * @extends DataStream
 */
class NumberStream extends DataStream {

    /**
     * Calculates the sum of all items in the stream.
     *
     * @return {Promise.<Number>}
     */
    sum() {
        return this.reduce((a, x) => a+x, 0);
    }

    /**
     * Calculates the sum of all items in the stream.
     *
     * @return {Promise.<Number>}
     */
    avg() {
        let cnt = 0;
        return this.reduce((a, x) => (cnt*a + x) / ++cnt, 0);
    }

}

module.exports = NumberStream;
