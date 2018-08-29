const { PromiseTransformStream, StringStream, DataStream, MultiStream, WindowStream } = require("./");
const { EventEmitter } = require("events");
const { ReReadable } = require("rereadable-stream");

const os = require("os");

module.exports = {

    constructor() {
        this.TimeSource = Date;
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;

        this.buffer = null;
    },

    /**
     * Pulls in any Readable stream, resolves when the pulled stream ends.
     *
     * Does not preserve order, does not end this stream.
     *
     * @async
     * @memberof DataStream#
     * @param {Readable} incoming
     * @returns {Number} resolved when incoming stream ends, rejects on incoming error
     *
     * @example {@link ../samples/data-stream-pull.js}
     */
    async pull(incoming) {
        return new Promise((res, rej) => {
            incoming.pipe(this, { end: false });
            incoming.on("end", res);
            incoming.on("error", rej);
        });
    },

    /**
     * Shift callback
     *
     * @callback ShiftCallback
     * @param {Array<Object>} shifted an array of shifted chunks
     */

    /**
     * Shifts the first n items from the stream and pushes out the remaining ones.
     *
     * @chainable
     * @memberof DataStream#
     * @param {Number} count The number of items to shift.
     * @param {ShiftCallback} func Function that receives an array of shifted items
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
     * @chainable
     * @memberof DataStream#
     * @param {Number} [start=0] omit this number of entries.
     * @param {Number} [length=Infinity] get this number of entries to the resulting stream
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
     * @chainable
     * @memberof DataStream#
     * @param {MapCallback|Object} func The function that returns new object properties or just the new properties
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
     * @chainable
     * @memberof DataStream#
     * @param  {Function} callback Function called when stream ends
     *
     * @example {@link ../samples/data-stream-empty.js}
     */
    empty(callback) {
        this.peek(1, (x) => x.length || callback());
        return this;
    },


    /**
     * Pushes any data at call time (essentially at the beginning of the stream)
     *
     * @chainable
     * @memberof DataStream#
     * @param {*} item list of items to unshift (you can pass more items)
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
     * @chainable
     * @memberof DataStream#
     * @param {*} item list of items to push at end
     * @meta.noreadme
     *
     * @example {@link ../samples/data-stream-endwith.js}
     */
    endWith(...items) {
        // TODO: overhead on unneeded transform, but requires changes in core.
        return this.pipe(this._selfInstance({
            referrer: this,
            promiseTransform: (a) => a,
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
     * @async
     * @memberof DataStream#
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise}  resolved with the "into" object on stream end.
     * @meta.noreadme
     *
     * @example {@link ../samples/data-stream-accumulate.js}
     */
    async accumulate(func, into) {
        return new Promise((res, rej) => {
            const bound = async (chunk) => (await func(into, chunk), Promise.reject(DataStream.filter));
            bound.to = func;

            this.tap().pipe(new PromiseTransformStream({
                promiseTransform: bound,
                referrer: this
            }))
                .on("end", () => res(into))
                .on("error", rej)
                .resume();
        });
    },

    /**
     * @callback AccumulateCallback
     * @param {*} acc Accumulator passed to accumulate function
     * @param {*} chunk the stream chunk
     * @return {Promise|*} resolved when all operations are completed
     */

    /**
     * Consumes the stream by running each callback
     * @deprecated use {@link DataStream#each} instead
     *
     * @async
     * @memberof DataStream#
     * @param  {Function}  func the consument
     * @meta.noreadme
     */
    async consume(func) {
        return this.tap()
            .each(func)
            .whenEnd();
    },

    /**
     * @callback ConsumeCallback
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
     * @meta.noreadme
     * @chainable
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
     * @returns {Promise|*} promise to be resolved when chunk has been processed
     */

    /**
     * Remaps the stream into a new stream.
     *
     * This means that every item may emit as many other items as we like.
     *
     * @meta.noreadme
     * @chainable
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
     * @chainable
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
     * @param {*} chunk the chunk from the original stream
     * @returns {Promise<Iterable>|Iterable}  promise to be resolved when chunk has been processed
     */

    /**
     * A shorthand for streams of Arrays to flatten them.
     *
     * More efficient equivalent of: .flatmap(i => i);
     *
     * @chainable
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
     * @chainable
     * @memberof DataStream#
     * @param  {*} streams Streams to be passed
     *
     * @example {@link ../samples/data-stream-concat.js}
     */
    concat(...streams) {
        const out = this._selfInstance({referrer: this});

        streams.unshift(this);

        const next = () => {
            if (streams.length)
                streams.shift()
                    .on("end", next)
                    .pipe(out, {end: !streams.length});
        };
        next();

        return out;
    },

    /**
     * Method will put the passed object between items. It can also be a function call.
     *
     * @chainable
     * @memberof DataStream#
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
     *
     * @example {@link ../samples/data-stream-join.js}
     */
    join(item) {
        const ref = this._selfInstance({referrer: this});

        let prev;
        let consumer;
        if (typeof item !== "function") {
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
     * Keep a buffer of n-chunks for use with {@see DataStream..rewind}
     *
     * @chainable
     * @memberof DataStream#
     * @param {number} count Number of objects or -1 for all the stream
     *
     * @example {@link ../samples/data-stream-keep.js}
     */
    keep(count = -1) {
        if (count < 0)
            count = Infinity;

        this.pipe(this.buffer = new ReReadable({ length: count, objectMode: true }));

        return this.tap();
    },

    /**
     * Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
     *
     * @chainable
     * @memberof DataStream#
     * @param {number} count Number of objects or -1 for all the buffer
     */
    rewind(count = -1) {
        if (count < 0)
            count = Infinity;

        if (this.buffer) {
            return this.buffer.tail(count).pipe(this._selfInstance());
        } else {
            throw new Error("Stream not buffered, cannot rewind.");
        }
    },

    /**
     * @callback JoinCallback
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
     * @chainable
     * @memberof DataStream#
     * @param {AffinityCallback|Number} [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param {ClusterCallback} clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param {Object} options Options
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

        if (typeof affinity === "number") {
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
     * @chainable
     * @meta.noreadme
     * @memberof DataStream#
     * @param {Object<DataStream>} streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param {AffinityCallback} affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams, affinity) {
        this.consume(
            async (chunk) => {
                const streamId = await affinity(chunk);
                const found = streams[streamId];

                if (found) {
                    return found.whenWrote(chunk);
                }

                throw new Error("Output for " + streamId + " not found in " + JSON.stringify(chunk));
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
     * @meta.noreadme
     * @chainable
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
            new this.constructor({
                async promiseTransform(chunk) {
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
     * @meta.noreadme
     * @chainable
     * @memberof DataStream#
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
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
     * @chainable
     * @memberof DataStream#
     * @param  {Number} count How many items to aggregate
     *
     * @example {@link ../samples/data-stream-batch.js}
     */
    batch(count) {
        let arr = [];

        return this.pipe(new this.constructor({
            promiseTransform(chunk) {
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
     * @meta.noreadme
     * @chainable
     * @memberof DataStream#
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
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
     * @meta.noreadme
     */
    nagle(size = 32, ms = 10) {
        return this.timeBatch(size, ms)
            .flatten();
    },

    /**
     * Returns a WindowStream of the specified length
     *
     * @memberof DataStream#
     * @chainable
     * @param {Number} length
     * @returns {WindowStream} a stream of array's
     * @meta.noreadme
     */
    window(length) {
        if (!(+length > 0))
            throw new Error("Length argument must be a positive integer!");

        const arr = [];
        return this.into(
            (out, chunk) => {
                arr.push(chunk);
                if (arr.length > length)
                    arr.shift();

                return out.whenWrote(arr.slice());
            },
            new WindowStream()
        );
    },

    /**
     * Transforms the stream to a streamed JSON array.
     *
     * @chainable
     * @memberof DataStream#
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     * @return {StringStream}
     * @meta.noreadme
     *
     * @example {@link ../samples/data-stream-tojsonarray.js}
     */
    toJSONArray(enclosure = ["[\n", "\n]"], separator = ",\n", stringify = JSON.stringify) {
        const ref = new StringStream({referrer: this});

        this.shift(1, ([first]) => (ref.push(enclosure[0]), ref.whenWrote(stringify(first))))
            .consume(
                (chunk) => Promise.all([
                    ref.whenWrote(separator),
                    ref.whenWrote(stringify(chunk))
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
     * @meta.noreadme
     * @chainable
     * @memberof DataStream#
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     * @return {StringStream}
     * @meta.noreadme
     *
     * @example {@link ../samples/data-stream-tojsonobject.js}
     */
    toJSONObject(entryCallback, enclosure = ["{\n","\n}"], separator = ",\n") {
        let ref = this;

        return ref.map((item) => [entryCallback(item), item])
            .toJSONArray(enclosure, separator, ([key, value]) => JSON.stringify(key.toString()) + ":" + JSON.stringify(value));
    },


    /**
     * Returns a StringStream containing JSON per item with optional end line
     *
     * @meta.noreadme
     * @chainable
     * @memberof DataStream#
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @return {StringStream}  output stream
     */
    JSONStringify(eol = os.EOL) {
        if (!eol)
            eol = "";

        return this.stringify((item) => JSON.stringify(item) + eol);
    },

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     *
     * @chainable
     * @memberof DataStream#
     * @param options options for the papaparse.unparse module.
     * @return {StringStream}  stream of parsed items
     *
     * @example {@link ../samples/data-stream-csv.js}
     */
    CSVStringify(options = {}) {
        const Papa = require("papaparse");
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
     * @meta.noreadme
     * @chainable
     * @memberof DataStream#
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
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
