const OUT = Symbol("OUT");
const mergesortStream = require("mergesort-stream");
const Readable = require("stream").Readable;

/**
 * An object consisting of multiple streams than can be refined or muxed.
 */
class MultiStream {

    /**
     * Crates an instance of MultiStream with the specified stream list.
     *
     * @param  {stream.Readable[]} streams the list of readable streams (other objects will be filtered out!)
     */
    constructor(streams) {
        this.streams = [].concat(streams
        .filter((s) => s instanceof Readable));
    }

    add(stream) {
        this.streams.push(stream);
    }

    remove(stream) {
        this.strams.remove(stream);
    }

    /**
     * Runs callback for every stream, returns a new MultiStream of mapped
     * streams and creates a new multistream consisting of streams returned
     * by the callback.
     *
     * @param  {Function} func the callback (recevices stream as the first arg)
     * @return {MultiStream}  the mapped instance
     */
    map(func) {
        return new MultiStream(
            this.streams.map(func)
        );
    }

    /**
     * Filters the stream list and returns a new MultiStream with only the
     * streams for which the callback returned true
     *
     * @param  {Function} func the callback (recevices stream as the first arg)
     * @return {MultiStream}  the filtered instance
     */
    filter(func) {
        return new MultiStream(this.streams.filter(func));
    }

    /**
     * Muxes the streams in order defined by the passed comparator function
     * as it was an array.
     *
     * @param  {ComparatorFunction} cmp Should return -1 0 or 1 depending on the
     *                                  desired order
     * @return {DataStream}  The resulting DataStream
     */
    mux(cmp) {
        this[OUT] = new DataStream();

        if (!this.streams.length)
            return this[OUT];

        return mergesortStream(orderFunc, this.streams).pipe(this[OUT]);
    }

}

module.exports = MultiStream;
