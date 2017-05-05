const OUT = Symbol("OUT");

const mergesortStream = require("./util/merge-sort-stream");
const EventEmitter = require("events").EventEmitter;
const scramjet = require("./");

/**
 * An object consisting of multiple streams than can be refined or muxed.
 */
class MultiStream extends EventEmitter {

    /**
     * Crates an instance of MultiStream with the specified stream list
     *
     * @param  {stream.Readable[]} streams the list of readable streams (other
     *                                     objects will be filtered out!)
     * @param  {Object} options Optional options for the super object. ;)
     *
     * @example {@link ../samples/multi-stream-constructor.js}
     */
    constructor(streams, ...args) {

        super(args.length ? args[0] : streams);

        /**
         * Array of all streams
         * @type {Array}
         */
        this.streams = [];

        if (Array.isArray(streams))
            streams.forEach(
                (str) => this.add(str)
            );
    }

    /**
     * Returns new MultiStream with the streams returned by the tranform.
     *
     * Runs callback for every stream, returns a new MultiStream of mapped
     * streams and creates a new multistream consisting of streams returned
     * by the callback.
     * @todo For later add/remove operations to work properly, the stream must
     * currently return the same instance!
     *
     * @param  {MapCallback} aFunc Mapper ran in Promise::then (so you can
     *                                  return a promise or an object)
     * @return {MultiStream}  the mapped instance
     *
     * @example {@link ../samples/multi-stream-map.js}
     */
    map(aFunc, rFunc) {
        return Promise.all(
            this.streams.map(
                (s) => {
                    return Promise.resolve(s)
                        .then(aFunc)
                    ;
                }
            )
        ).then(
            (streams) => {
                const out = new MultiStream(
                    streams
                );

                this.on(
                    "add",
                    (stream) => Promise.resolve(stream)
                        .then(aFunc)
                        .then(out.add.bind(out))
                );

                if (rFunc)
                    this.on(
                        "remove",
                        (stream) => Promise.resolve(stream)
                            .then(rFunc)
                            .then(out.remove.bind(out))
                    );

                return out;
            }
        );
    }

    each(aFunc, rFunc) {
        return Promise.all(
            this.streams.map(
                (s) => {
                    return Promise.resolve(s)
                        .then(aFunc)
                    ;
                }
            )
        ).then(
            () => {
                this.on(
                    "add",
                    (stream) => Promise.resolve(stream).then(aFunc)
                );

                if (rFunc)
                    this.on(
                        "remove",
                        (stream) => Promise.resolve(stream).then(rFunc)
                    );

                return this;
            }
        );
    }

    /**
     * Filters the stream list and returns a new MultiStream with only the
     * streams for which the callback returned true
     *
     * @param  {TransformFunction} func Filter ran in Promise::then (so you can
     *                                  return a promise or a boolean)
     * @return {MultiStream}  the filtered instance
     *
     * @example {@link ../samples/multi-stream-filter.js}
     */
    filter(func) {
        return Promise.all(
            this.streams.map(
                (s) => Promise.resolve(s)
                    .then(func)
                    .then((o) => o ? s : null)
            )
        ).then(
            (streams) => {
                const out = new MultiStream(
                    streams.filter((s) => s)
                );
                this.on(
                    "add",
                    (stream) => Promise.resolve(stream)
                        .then(func)
                        .then(out.add.bind(out))
                );
                this.on(
                    "remove", out.remove.bind(out)
                );
                return out;
            }
        );
    }

    /**
     * Removes duplicate items from stream using the given hash function
     *
     * @todo Not yet implemented
     *
     * @param  {TransformFunction} cmp returns the object hash for comparison
     * @return {DataStream}  the deduplicated stream
     *
     * @example {@link ../samples/multi-stream-dedupe.js}
     */
    dedupe(cmp, Clazz) {
        cmp = cmp || (() => {
            const inspect = require("util").inspect;
            return (object) => inspect(object);
        });

        throw new Error("Not yet implemented", Clazz);
    }

    /**
     * Muxes the streams into a single one
     *
     * @todo For now using comparator will not affect the mergesort.
     * @todo Sorting requires all the streams to be constantly flowing, any
     *       single one drain results in draining the muxed too even if there
     *       were possible data on other streams.
     *
     * @param  {ComparatorFunction} cmp Should return -1 0 or 1 depending on the
     *                                  desired order. If passed the chunks will
     *                                  be added in a sorted order.
     * @return {DataStream}  The resulting DataStream
     *
     * @example {@link ../samples/multi-stream-mux.js}
     */
    mux(cmp, Clazz) {

        if (Clazz) {
            this[OUT] = new Clazz();
        } else {
            this[OUT] = new scramjet.DataStream();
        }

        if (!cmp) {

            let cnt = 0;

            const unpipeStream = (stream) => {
                if (stream)
                    stream.unpipe(this[OUT]);
                if (--cnt) {
                    this[OUT].end();
                }
            };

            const pipeStream = (stream) => {
                cnt++;
                stream.pipe(this[OUT], {end: false});
            };


            this.streams.forEach(pipeStream);

            this.on("add", pipeStream);
            this.on("remove", unpipeStream);

            return this[OUT];
        }

        return mergesortStream(this, cmp, 0, Clazz);
    }

    /**
     * Adds a stream to the MultiStream
     *
     * If the stream was muxed, filtered or mapped, this stream will undergo the
     * same transorms and conditions as if it was added in constructor.
     *
     * @param {stream.Readable} stream [description]
     *
     * @example {@link ../samples/multi-stream-add.js}
     */
    add(stream) {

        if (stream) {
            this.streams.push(stream);
            this.emit("add", stream, this.streams.length - 1);
            stream.on("end", () => this.remove(stream));
        }

        return this;
    }

    /**
     * Removes a stream from the MultiStream
     *
     * If the stream was muxed, filtered or mapped, it will be removed from same
     * streams.
     *
     * @param {stream.Readable} stream [description]
     *
     * @example {@link ../samples/multi-stream-remove.js}
     */
    remove(stream) {

        const strIndex = this.streams.indexOf(stream);
        if (strIndex >= 0) {
            this.streams.splice(strIndex, 1);
            this.emit("remove", stream, strIndex);
        }

        if (!this.streams.length) {
            this.emit("empty");
        }

        return this;
    }

}

module.exports = MultiStream;
