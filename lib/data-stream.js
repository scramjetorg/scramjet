/**
 * @module ScramjetCore
 */

const {PromiseTransformStream, StringStream, DataStream, MultiStream} = require('./');
const {EventEmitter} = require("events");

const os = require('os');

module.exports = {

    constructor() {
        /**
         * Source of time - must implement the interface of Date.
         *
         * @memberof module:ScramjetCore~DataStream#
         * @type {Object}
         */
        this.TimeSource = Date;

        /**
         * setTimeout method
         *
         * @memberof module:ScramjetCore~DataStream#
         * @type {Function}
         */
        this.setTimeout = setTimeout;

        /**
         * setTimeout method
         *
         * @memberof module:ScramjetCore~DataStream#
         * @type {Function}
         */
        this.clearTimeout = clearTimeout;
    },

    /**
     * Injects a ```debugger``` statement when called.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {Function} func if passed, the function will be called on self
     *                         to add an option to inspect the stream in place,
     *                         while not breaking the transform chain
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-debug.js}
     */
    debug(func) {
        debugger; // eslint-disable-line
        this.use(func);
        return this;
    },

    /**
     * Returns a StringStream containing JSON per item with optional end line
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @return {StringStream}  output stream
     */
    JSONStringify(eol = os.EOL) {
        if (!eol)
            eol = '';

        return this.stringify((item) => JSON.stringify(item) + eol);
    },

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param options options for the papaparse.unparse module.
     * @return {StringStream}  stream of parsed items
     *
     * @example {@link ../samples/data-stream-csv.js}
     */
    CSVStringify(options = {}) {
        const Papa = require('papaparse');
        let header = null;
        let start = 1;
        options = Object.assign({header: true, newline: os.EOL}, options);

        const outOptions = Object.assign({}, options, {header: false});

        return this
            .timeBatch(16, 64)
            .map((arr) => {
                const out = [];
                if (!header) {
                    header = Object.keys(arr[0]);
                    if (options.header) out.push(header);
                }
                for (const item of arr)
                    out.push(header.map(key => item[key]));

                const x = Papa.unparse(out, outOptions) + options.newline;
                if (start) {
                    start = 0;
                    return x;
                }
                return x;
            })
            .pipe(new StringStream())
        ;
    },

    /**
     * [BETA] Distributes processing into multiple subprocesses or threads if you like.
     *
     * @todo Currently order is not kept.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {AffinityCallback} affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     * @param {MultiStream#ClusterCallback} clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param {Object} options Options
     * @chainable
     */
    distribute(affinity, clusterFunc, {plugins = [], options = {}} = {}) {    // eslint-disable-line

        if (!Array.isArray(clusterFunc))
            clusterFunc = [clusterFunc];

        const streams = this
            .separate(affinity, options.createOptions, this.constructor)
            .cluster(clusterFunc, {
                plugins,
                threads: options.threads,
                StreamClass: this.constructor
            })
        ;

        return streams.mux();
    },

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {Object<DataStream>} streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param {AffinityCallback} affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     * @chainable
     */
    separateInto(streams, affinity) {
        this.consume(
            async (chunk) => {
                const streamId = await affinity(chunk);
                const found = streams[streamId];

                if (found) {
                    return found.whenWrote(chunk);
                }

                throw new Error('Output for ' + streamId + ' not found in ' + JSON.stringify(chunk));
            }
        );
        return this;
    },

    /**
     * Separates execution to multiple streams using the hashes returned by the passed callback.
     *
     * Calls the given callback for a hash, then makes sure all items with the same hash are processed within a single
     * stream. Thanks to that streams can be distributed to multiple threads.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {AffinityCallback} affinity the callback function
     * @param {Object} createOptions options to use to create the separated streams
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-separate.js}
     */
    separate(affinity, createOptions, CreateClass) {
        const ret = new MultiStream();
        const hashes = new Map();

        CreateClass = CreateClass || this.constructor;

        this
            .pipe(new DataStream({
                async parallelTransform(chunk) {
                    try {
                        const hash = await affinity(chunk);
                        let rightStream;
                        if (!hashes.has(hash)) {
                            rightStream = new CreateClass(createOptions);
                            rightStream._separateId = hash;
                            hashes.set(hash, rightStream);
                            ret.add(rightStream);
                        } else {
                            rightStream = hashes.get(hash);
                        }

                        return rightStream.whenWrote(chunk);
                    } catch(e) {
                        ret.emit("error", e);
                    }
                },
                referrer: this
            })
            .on("end", () => {
                ret.streams.forEach(stream => stream.end());
            })
            .resume()
        );

        return ret;
    },

    /**
     * Delegates work to a specified worker.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     * @chainable
     */
    delegate(delegateFunc, worker, plugins = []) {
        const ret = this._selfInstance();
        return worker.delegate(this, delegateFunc, plugins).pipe(ret);
    },

    /**
     * Gets a slice of the stream to the callback function.
     *
     * Returns a stream consisting of an array of items with `0` to `start`
     * omitted and `start` until `end` included. Works similarily to
     * Array.prototype.slice.
     * Takes count from the moment it's called. Any previous items will not be
     * taken into account.
     * Also note that the stream may end if both arguments are passed.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @todo to be implemented
     * @param {Number} start omit this number of entries.
     * @param {Number} end   end at this number of entries (from start)
     * @param {ShiftCallback} func the callback
     * @return {DataStream}  the affected stream
     *
     * @example {@link ../samples/data-stream-slice.js}
     */
    slice(/* start, end, func */) {

    },


    /**
    * @callback AccumulateCallback
    * @memberof module:ScramjetCore~
    * @param {*} acc Accumulator passed to accumulate function
    * @param {*} chunk the stream chunk
    * @return {Promise|*} resolved when all operations are completed
    */
    /**
     * Accumulates data into the object.
     *
     * Works very similarily to reduce, but result of previous operations have
     * no influence over the accumulator in the next one.
     *
     * Method is parallel
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise}  resolved with the "into" object on stream end.
     *
     * @example {@link ../samples/data-stream-accumulate.js}
     */
    async accumulate(func, into) {
        return new Promise((res, rej) => {
            const bound = (chunk) => (func(into,  chunk), Promise.reject(DataStream.filter));
            bound.to = func;

            this.tap().pipe(new PromiseTransformStream({
                    parallelTransform: bound,
                    referrer: this
                }))
                .on("end", () => res(into))
                .on("error", rej)
                .resume();
        });
    },

    /**
     * @callback ConsumeCallback
     * @memberof module:ScramjetCore~
     * @param {*} chunk the stream chunk
     * @return {Promise|*} resolved when all operations are completed
     */

    /**
     * Consumes the array by running each method
     * @memberof module:ScramjetCore~DataStream#
     * @param  {Function}  func the consument
     * @return {Promise}  resolved on end, rejected on error
     */
    async consume(func) {
        return new Promise((res, rej) => {
            const bound = (chunk) => (func(chunk), Promise.reject(DataStream.filter));
            bound.to = func;

            this.tap().pipe(new PromiseTransformStream({
                    parallelTransform: bound,
                    referrer: this
                }))
                .on("end", () => res())
                .on("error", rej)
                .resume();
        });
    },

    /**
     * Reduces the stream into the given object, returning it immediately.
     *
     * The main difference to reduce is that only the first object will be
     * returned at once (however the method will be called with the previous
     * entry).
     * If the object is an instance of EventEmitter then it will propagate the
     * error from the previous stream.
     *
     * This method is serial - meaning that any processing on an entry will
     * occur only after the previous entry is fully processed. This does mean
     * it's much slower than parallel functions.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {ReduceCallback} func The into object will be passed as the first
     * argument, the data object from the stream as the second.
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * function
     * @return {*} whatever was passed as into
     *
     * @example {@link ../samples/data-stream-reduceNow.js}
     */
    reduceNow(func, into) {

        const prm = this.reduce(func, into);

        if (into instanceof EventEmitter) {
            prm.catch((e) => into.emit("error", e));
        }

        return into;
    },

    /**
     * @callback RemapCallback
     * @param {Function} emit a method to emit objects in the remapped stream
     * @param {*} chunk the chunk from the original stream
     * @memberof module:ScramjetCore~
     * @returns {Promise|*} promise to be resolved when chunk has been processed
     */

    /**
     * Remaps the stream into a new stream.
     *
     * This means that every item may emit as many other items as we like.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-remap.js}
     */
    remap(func, Clazz) {

        Clazz = Clazz || this.constructor;

        const ref = this.pipe(new Clazz({
            async parallelTransform(chunk) {
                let out = [];
                await func((newChunk) => out.push(newChunk), chunk);

                out.slice().forEach(
                    (newChunk) => this.push(newChunk)
                );
                return Promise.reject(DataStream.filter);
            },
            referrer: this
        })).tap();

        return ref;
    },

    /**
     * @callback FlatMapCallback
     * @memberof module:ScramjetCore~
     * @param {*} chunk the chunk from the original stream
     * @returns {Promise<Iterable>|Iterable}  promise to be resolved when chunk has been processed
     */

    /**
     * Takes any method that returns any iterable and flattens the result.
     *
     * The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream will
     * consist of all the items of the returned iterables, one iterable after another.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-flatmap.js}
     */
    flatMap(func, Clazz) {
        Clazz = Clazz || this.constructor;

        const ref = this.pipe(new Clazz({
            async parallelTransform(chunk) {
                const out = await func(chunk);
                for (const val of out)
                    this.push(val);
                return Promise.reject(DataStream.filter);
            },
            referrer: this
        })).tap();

        return ref;
    },

    /**
     * Pushes any data at call time
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {*} item list of items to unshift (you can pass more items)
     * @chainable
     */
    unshift(...items) {
        items.forEach(
            item => this.write(item)
        );
        return this;
    },

    /**
     * A shorthand for streams of Arrays to flatten them.
     *
     * Runs: .flatmap(i => i);
     *
     * @memberof module:ScramjetCore~DataStream#
     * @return {DataStream}
     */
    flatten() {
        return this.pipe(new this.constructor({
            async parallelTransform(chunk) {
                for (const val of chunk)
                    this.push(val);
                return Promise.reject(DataStream.filter);
            },
            referrer: this
        })).tap();
    },

    /**
     * Aggregates chunks in arrays given number of number of items long.
     *
     * This can be used for microbatch processing.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {Number} count How many items to aggregate
     * @return {DataStream}   the stream of arrays
     *
     * @example {@link ../samples/data-stream-batch.js}
     */
    batch(count) {
        let arr = [];

        return this.pipe(new this.constructor({
            parallelTransform(chunk) {
                arr.push(chunk);
                if (arr.length >= count) {
                    const push = arr;
                    arr = [];
                    return push;
                }
                return Promise.reject(DataStream.filter);
            },
            async flushPromise() {
                if (arr.length > 0) {
                    return [arr];
                } else
                    return null;
            },
            referrer: this
        }));
    },

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     * @return {DataStream}   the stream of arrays
     *
     * @example {@link ../samples/data-stream-timebatch.js}
     */
    timeBatch(ms, count = Infinity) {
        let arr = [];

        const setTimeout = this.setTimeout;
        const clearTimeout = this.clearTimeout;

        let ret = new DataStream({
            referrer: this
        });

        let pushTimeout = null;
        let last;

        const push = () => {
            if (pushTimeout) {
                clearTimeout(pushTimeout);
                pushTimeout = null;
            }
            last = ret.whenWrote(arr);
            arr = [];
            return last;
        };

        this.pipe(new PromiseTransformStream({
            parallelTransform(chunk) {
                arr.push(chunk);
                if (arr.length >= count) {
                    return push();
                }
                if (!pushTimeout) {
                    pushTimeout = setTimeout(push, ms);
                }
                return Promise.reject(DataStream.filter);
            },
            async flushPromise() {
                if (arr.length) {
                    clearTimeout(pushTimeout);
                    await ret.whenWrote(arr);
                    ret.end();
                }
            },
            referrer: this
        }));

        return ret;
    },

    /**
     * Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
     * in bulk.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @todo needs more work, for now it's simply waiting some time, not checking the queues.
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
     * @chainable
     */
    nagle(size = 32, ms = 10) {
        return this.timeBatch(size, ms)
            .flatten();
    },

    /**
     * Transforms stream objects by assigning the properties from the returned
     * data along with data from original ones.
     *
     * The original objects are unaltered.
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {MapCallback|Object} func The function that returns new object properties or just the new properties
     * @return {DataStream}  mapped stream
     *
     * @example {@link ../samples/data-stream-assign.js}
     */
    assign(func) {
        if (typeof func === "function") {
            return this.map(
                (chunk) => Promise.resolve(func(chunk))
                    .then(obj => Object.assign({}, chunk, obj))
            );
        } else {
            return this.map(
                (chunk) => Object.assign({}, chunk, func)
            );
        }
    },

    /**
     * Shift callback
     *
     * @memberof module:ScramjetCore~
     * @callback ShiftCallback
     * @param {Array<Object>} shifted an array of shifted chunks
     */

    /**
     * Shifts the first n items from the stream and pipes the other
     *
     * @memberof module:ScramjetCore~DataStream#
     * @param {Number} count The number of items to shift.
     * @param {ShiftCallback} func Function that receives an array of shifted items
     * @return {DataStream}  substream.
     *
     * @example {@link ../samples/data-stream-shift.js}
     */
    shift(count, func) {
        const ret = [];
        const str = this.tap()._selfInstance({
            referrer: this
        });

        const chunkHandler = (chunk) => {
            ret.push(chunk);
            if (ret.length >= count) {
                this.pause();
                unHook().then(
                    () => this.resume().pipe(str)
                );
            }
        };

        const endHandler = (...args) => {
            unHook().then(
                () => str.end(...args)
            );
        };

        const errorHandler = str.emit.bind(str, "error");

        let hooked = true;
        const unHook = () => {  // jshint ignore:line
            if (hooked) {
                hooked = false;
                this.removeListener("data", chunkHandler);
                this.removeListener("end", endHandler);
                this.removeListener("error", errorHandler);
            }
            return Promise.resolve(ret)
                .then(func);
        };
        this.on("data", chunkHandler);
        this.on("end", endHandler);
        this.on("error", errorHandler);

        return str;
    }

};

module.exports.pop = module.exports.shift;
module.exports.group = module.exports.separate;
