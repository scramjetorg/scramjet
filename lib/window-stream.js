const {NumberStream} = require("./");

/**
 * A stream for moving window calculation with some simple methods.
 *
 * In essence it's a stream of Array's containing a list of items - a window.
 * It's best used when created by the `DataStream..window`` method.
 *
 * @extends DataStream
 */
class WindowStream extends NumberStream {

    /**
     * Calculates moving sum of items, the output stream will contain the moving sum.
     *
     * @chainable
     * @param {Function} [valueOf] value of method for array items
     * @return {Promise.<Number>}
     */
    sum(valueOf = (x) => +x) {
        return this.map(
            arr => arr.reduce((a, x) => a + valueOf(x))
        );
    }

    /**
     * Calculates the moving average of all items in the stream.
     *
     * @chainable
     * @param {Function} [valueOf] value of method for array items
     * @return {Promise.<Number>}
     */
    avg(valueOf = (x) => +x) {
        let cnt = 0;
        return this.map(
            arr => arr.reduce((a, x) => (cnt * a + valueOf(x)) / ++cnt, 0)
        );
    }

}

module.exports = WindowStream;
