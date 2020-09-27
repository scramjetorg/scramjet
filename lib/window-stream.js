const {NumberStream} = require("./");

/**
 * A stream for moving window calculation with some simple methods.
 *
 * In essence it's a stream of Array's containing a list of items - a window.
 * It's best used when created by the `DataStream..window`` method.
 *
 * @memberof module:scramjet.
 * @extends NumberStream
 */
class WindowStream extends NumberStream {

    /**
     * Calculates moving sum of items, the output NumberStream will contain the moving sum.
     *
     * @chainable
     * @param {ValueOfCallback} [valueOf] value of method for array items
     * @return {NumberStream}
     */
    sum(valueOf = (x) => +x) {
        return this.map(
            arr => arr.reduce((a, x) => a + valueOf(x)),
            NumberStream
        );
    }

    /**
     * Calculates the moving average of the window and returns the NumberStream
     *
     * @chainable
     * @param {ValueOfCallback} [valueOf] value of method for array items
     * @return {NumberStream}
     */
    avg(valueOf = (x) => +x) {
        let cnt = 0;
        return this.map(
            arr => arr.reduce((a, x) => (cnt * a + valueOf(x)) / ++cnt, 0),
            NumberStream
        );
    }
}

module.exports = WindowStream;
