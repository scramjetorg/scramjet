const { PromiseTransformStream, StringStream, DataStream, MultiStream } = require('./');
const { EventEmitter } = require("events");

const os = require('os');

module.exports = {

    constructor() {
        /**
         * Source of time - must implement the interface of Date.
         *
         * @memberof DataStream#
         * @type {Object}
         */
        this.TimeSource = Date;
        /**
         * setTimeout method
         *
         * @memberof DataStream#
         * @type {Function}
         */
        this.setTimeout = setTimeout;
        /**
         * setTimeout method
         *
         * @memberof DataStream#
         * @type {Function}
         */
        this.clearTimeout = clearTimeout;
     },

    /**
     * Shift callback
     *
     * @memberof module:
     * @callback ShiftCallback
     * @param {Array<Object>} shifted an array of shifted chunks
     */

    /**
     * Shifts the first n items from the stream and pipes the other
     *
     * @memberof DataStream#
     * @param {Number} count The number of items to shift.
     * @param {ShiftCallback} func Function that receives an array of shifted items
     * @return {DataStream}  sub-stream.
     *
     * @example {@link ../samples/data-stream-shift.js}
     */
    shift(count, func) {
        const ret = [];
        const str = this.tap()._selfInstance({referrer: this});

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
        const unHook = () => { // jshint ignore:line
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
    },

    /**
     * Allows previewing some of the streams data without removing them from the stream.
     *
     * Important: Peek does not resume the flow.
     *
     * @memberof DataStream#
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     * @chainable
     */
    peek(count, func) {
        const ref = this._selfInstance({referrer: this});

        this
            .tap()
            .pipe(ref)
            .shift(count, batch => {
                this.unpipe(ref);
                return func(batch);
            });

        return this;
    },

    /**
     * Gets a slice of the stream to the callback function.
     *
     * Returns a stream consisting of an array of items with `0` to `start`
     * omitted and `length` items after `start` included. Works similarily to
     * Array.prototype.slice.
     *
     * Takes count from the moment it's called. Any previous items will not be
     * taken into account.
     *
     * @memberof DataStream#
     * @param {Number} [start=0] omit this number of entries.
     * @param {Number} [length=Infinity] get this number of entries to the resulting stream
     * @return {DataStream}  the affected stream
     *
     * @example {@link ../samples/data-stream-slice.js}
     */
    slice(start = 0, length = Infinity) {
        let n = 0;
        return this.shift(start, () => 0)
            .until(() => n++ >= length);
    },

    /**
     * Transforms stream objects by assigning the properties from the returned
     * data along with data from original ones.
     *
     * The original objects are unaltered.
     *
     * @memberof DataStream#
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
     * Called when the stream ends without passing any items
     *
     * @memberof DataStream#
     * @param  {Function} callback Function called when stream ends
     * @chainable
     *
     * @example {@link ../samples/data-stream-empty.js}
     */
    empty(callback) {
        let empty = true;
        const ref = this._selfInstance({referrer: this});

        this
            .tap()
            .pipe(ref)
            .shift(1, (x) => {
                empty = x.length === 0;
                this.unpipe(ref.end());
            })
            .once("end", () => empty && callback())
            .resume();

        return this;
    },


    /**
     * Pushes any data at call time (essentially at the begining of the stream)
     *
     * @memberof DataStream#
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
     * Pushes any data at end of stream
     *
     * @memberof DataStream#
     * @param {*} item list of items to push at end
     * @chainable
     *
     * @example {@link ../samples/data-stream-endwith.js}
     */
    endWith(...items) {
        // TODO: overhead on unneeded transform, but requires changes in core.
        return this.pipe(this._selfInstance({
            referrer: this,
            parallelTransform: (a) => a,
            flushPromise: () => items
        }));
    },

    /**
     * Accumulates data into the object.
     *
     * Works very similarily to reduce, but result of previous operations have
     * no influence over the accumulator in the next one.
     *
     * Method is parallel
     *
     * @memberof DataStream#
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise}  resolved with the "into" object on stream end.
     *
     * @example {@link ../samples/data-stream-accumulate.js}
     */
    async accumulate(func, into) {
        return new Promise((res, rej) => {
            const bound = (chunk) => (func(into, chunk), Promise.reject(DataStream.filter));
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
     * @callback AccumulateCallback
     * @memberof module:
     * @param {*} acc Accumulator passed to accumulate function
     * @param {*} chunk the stream chunk
     * @return {Promise|*} resolved when all operations are completed
     */

    /**
     * Consumes the stream by running each callback
     * @deprecated use {@link DataStream#each} instead
     *
     * @memberof DataStream#
     * @param  {Function}  func the consument
     * @return {Promise}  resolved on end, rejected on error
     */
    async consume(func) {
        return this.tap()
            .each(func)
            .whenEnd();
    },

    /**
     * @callback ConsumeCallback
     * @memberof module:
     * @param {*} chunk the stream chunk
     * @return {Promise|*} resolved when all operations are completed
     */

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
     * @memberof DataStream#
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
     * @memberof module:
     * @returns {Promise|*} promise to be resolved when chunk has been processed
     */

    /**
     * Remaps the stream into a new stream.
     *
     * This means that every item may emit as many other items as we like.
     *
     * @memberof DataStream#
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-remap.js}
     */
    remap(func, Clazz) {

        const ref = new (Clazz || this.constructor)({referrer: this});

        return this.into(
            async (str, chunk) => {
                let out = [];
                await func((newChunk) => out.push(newChunk), chunk);

                let last = true;
                for (const val of out)
                    last = ref.write(val);

                return last ? null : ref.whenDrained();
            },
            ref
        );
    },

    /**
     * Takes any method that returns any iterable and flattens the result.
     *
     * The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream will
     * consist of all the items of the returned iterables, one iterable after another.
     *
     * @memberof DataStream#
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-flatmap.js}
     */
    flatMap(func, Clazz = DataStream) {
        const ref = new Clazz({referrer: this});

        return this.into(
            async (ref, chunk) => {
                const out = await func(chunk);

                let last = true;
                for (const val of out)
                    last = ref.write(val);

                return last ? null : ref.whenDrained();
            },
            ref
        );
    },

    /**
     * @callback FlatMapCallback
     * @memberof module:
     * @param {*} chunk the chunk from the original stream
     * @returns {Promise<Iterable>|Iterable}  promise to be resolved when chunk has been processed
     */

    /**
     * A shorthand for streams of Arrays to flatten them.
     *
     * Runs: .flatmap(i => i);
     *
     * @memberof DataStream#
     * @return {DataStream}
     *
     * @example {@link ../samples/data-stream-flatten.js}
     */
    flatten() {
        return this.into(
            async (ref, out) => {
                let last = true;
                for (const val of out)
                    last = ref.write(val);

                return last ? null : ref.whenDrained();
            },
            this._selfInstance()
        );
    },

    /**
     * Returns a new stream that will append the passed streams to the callee
     *
     * @memberof DataStream#
     * @param  {*} streams Streams to be passed
     * @chainable
     *
     * @example {@link ../samples/data-stream-concat.js}
     */
    concat(...streams) {
        const out = this._selfInstance({referrer: this});

        streams.unshift(this);

        const next = () => {
            if (streams.length)
                streams.shift()
                .on('end', next)
                    .pipe(out, {end: !streams.length});
        };
        next();

        return out;
    },

    /**
     * Pulls in any Readable stream, resolves when stream ends
     *
     * @param {Readable} incoming
     * @returns {Number} resolved when incoming stream ends, rejects on incoming error
     */
    async pull(incoming) {
        return new Promise((res, rej) => {
            incoming.pipe(this, {end: false});
            incoming.on('end', res);
            incoming.on('error', rej);
        });
    },

    /**
     * Method will put the passed object between items. It can also be a function call.
     *
     * @memberof DataStream#
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
     * @chainable
     *
     * @example {@link ../samples/data-stream-join.js}
     */
    join(item) {
        const ref = this._selfInstance({referrer: this});

        let prev;
        let consumer;
        if (typeof item !== 'function') {
            consumer = (cur) => Promise.all([
                ref.whenWrote(item),
                ref.whenWrote(cur)
            ]);
        } else {
            consumer = cur => Promise.resolve(item(prev, cur))
                .then(joint => Promise.all([
                    joint && ref.whenWrote(joint),
                    ref.whenWrote(prev = cur)
                ]))
            ;
        }

        this.shift(1, ([first]) => ref.push(prev = first))
            .consume(
                consumer
            )
            .then(
                () => ref.end()
            );
        return ref;
    },

    /**
     * @callback JoinCallback
     * @memberof module:
     * @param {*} prev the chunk before
     * @param {*} next the chunk after
     * @returns {Promise<*>|*}  promise that is resolved with the joining item
     */

    /**
     * Distributes processing into multiple subprocesses or threads if you like.
     *
     * @todo Currently order is not kept.
     * @todo Example test breaks travis build
     *
     * @memberof DataStream#
     * @param {AffinityCallback|Number} [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param {MultiStream#ClusterCallback} clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param {Object} options Options
     * @chainable
     *
     * @see {@link ../samples/data-stream-distribute.js}
     */
    distribute(affinity, clusterFunc = null, {
        plugins = [],
        options = {}
    } = {}) {

        if (!clusterFunc && affinity) {
            clusterFunc = affinity;
            affinity = os.cpus().length * 2;
        }

        if (typeof affinity === 'number') {
            const roundRobinLength = affinity;
            let z = 0;
            options.threads = affinity;
            affinity = () => z = ++z % roundRobinLength;
        }

        if (!Array.isArray(clusterFunc))
            clusterFunc = [clusterFunc];

        const streams = this
            .separate(affinity, options.createOptions, this.constructor)
            .cluster(clusterFunc, {
                plugins,
                threads: options.threads,
                StreamClass: this.constructor
            });

        return streams.mux();
    },

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     *
     * @memberof DataStream#
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
     * @memberof DataStream#
     * @param {AffinityCallback} affinity the callback function
     * @param {Object} createOptions options to use to create the separated streams
     * @return {MultiStream} separated stream
     *
     * @example {@link ../samples/data-stream-separate.js}
     */
    separate(affinity, createOptions, CreateClass) {
        const ret = new MultiStream();
        const hashes = new Map();

        CreateClass = CreateClass || this.constructor;

        const pushChunk = (hash, chunk) => {
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
        };

        this.pipe(
            new DataStream({
                async parallelTransform(chunk) {
                    try {
                        const hash = await affinity(chunk);

                        if (Array.isArray(hash))
                            return Promise.all(hash.map(str => pushChunk(str, chunk)));

                        return pushChunk(hash, chunk);
                    } catch (e) {
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
     * @memberof DataStream#
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     * @chainable
     */
    delegate(delegateFunc, worker, plugins = []) {
        const ret = this._selfInstance({referrer: this});
        return worker.delegate(this, delegateFunc, plugins).pipe(ret);
    },

    /**
     * Aggregates chunks in arrays given number of number of items long.
     *
     * This can be used for microbatch processing.
     *
     * @memberof DataStream#
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
     * @memberof DataStream#
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

        let ret = this._selfInstance({referrer: this});

        let pushTimeout = null;

        const push = () => {
            if (pushTimeout) {
                clearTimeout(pushTimeout);
                pushTimeout = null;
            }
            const last = ret.whenWrote(arr);
            arr = [];
            return last;
        };

        this.consume(async (chunk) => {
            arr.push(chunk);
            if (arr.length >= count) {
                await push();
            } else if (!pushTimeout) {
                pushTimeout = setTimeout(push, ms);
            }
        }).then(async () => {
            if (arr.length) {
                clearTimeout(pushTimeout);
                await ret.whenWrote(arr);
            }
            ret.end();
        });

        return ret;
    },

    /**
     * Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
     * in bulk.
     *
     * @memberof DataStream#
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
     * Transforms the stream to a streamed JSON array.
     *
     * @memberof DataStream#
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     * @return {StringStream}
     *
     * @example {@link ../samples/data-stream-tojsonarray.js}
     */
    toJSONArray(enclosure = ['[\n', '\n]'], separator = ',\n', stringifier = JSON.stringify) {
        const ref = new StringStream({referrer: this});

        this.shift(1, ([first]) => (ref.push(enclosure[0]), ref.whenWrote(stringifier(first))))
            .consume(
                (chunk) => Promise.all([
                    ref.whenWrote(separator),
                    ref.whenWrote(stringifier(chunk))
                ])
            )
            .then(
                () => ref.end(enclosure[1])
            );

        return ref;
    },

    /**
     * Transforms the stream to a streamed JSON object.
     *
     * @memberof DataStream#
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     * @return {StringStream}             [description]
     *
     * @example {@link ../samples/data-stream-tojsonobject.js}
     */
    toJSONObject(entryCallback, enclosure = ['{\n','\n}'], separator = ',\n') {
        let ref = this;

        return ref.map((item) => [entryCallback(item), item])
            .toJSONArray(enclosure, separator, ([key, value]) => JSON.stringify(key.toString()) + ':' + JSON.stringify(value));
    },


    /**
     * Returns a StringStream containing JSON per item with optional end line
     *
     * @memberof DataStream#
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
     * @memberof DataStream#
     * @param options options for the papaparse.unparse module.
     * @return {StringStream}  stream of parsed items
     *
     * @example {@link ../samples/data-stream-csv.js}
     */
    CSVStringify(options = {}) {
        const Papa = require('papaparse');
        let header = null;
        let start = 1;
        options = Object.assign({
            header: true,
            newline: os.EOL
        }, options);

        const outOptions = Object.assign({}, options, {
            header: false
        });

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
            .pipe(new StringStream());
    },

    /**
     * Injects a ```debugger``` statement when called.
     *
     * @memberof DataStream#
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

};

module.exports.pop = module.exports.shift;
module.exports.group = module.exports.separate;
