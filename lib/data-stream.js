const scramjet = require("./");
const { PromiseTransformStream, StringStream, DataStream, MultiStream } = scramjet;
const { EventEmitter } = require("events");
const { ReReadable } = require("rereadable-stream");
const { AsyncGeneratorFunction, GeneratorFunction } = require("scramjet-core/lib/util/utils");

const os = require("os");
const path = require("path");

/** @ignore */
const {getCalleeDirname} = require("scramjet-core/lib/util/utils");

module.exports = {

    constructor() {
        this.TimeSource = Date;
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;

        this.buffer = null;
    },

    /**
     * Pulls in any readable stream, resolves when the pulled stream ends.
     *
     * You can also pass anything that can be passed to `DataStream.from`.
     *
     * Does not preserve order, does not end this stream.
     *
     * @async
     * @memberof module:scramjet.DataStream#
     * @param {Array|Iterable<any>|AsyncGeneratorFunction|GeneratorFunction|AsyncFunction|Function|string|Readable} pullable
     * @param {any[]} ...args any additional args
     * @returns {Promise<any>} resolved when incoming stream ends, rejects on incoming error
     *
     * @test test/methods/data-stream-pull.js
     */
    async pull(pullable, ...args) {
        return new Promise((res, rej) => {
            const incoming = this.constructor.from(pullable, {}, ...args);

            incoming.pipe(this, { end: false });
            incoming.on("end", res);
            incoming.on("error", rej);
        });
    },

    /**
     * Shift Function
     *
     * @callback ShiftCallback
     * @memberof module:scramjet~
     * @param {Array<object>|any} shifted an array of shifted chunks
     */

    /**
     * Shifts the first n items from the stream and pushes out the remaining ones.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {number} count The number of items to shift.
     * @param {ShiftCallback} func Function that receives an array of shifted items
     *
     * @test test/methods/data-stream-shift.js
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
        const unHook = () => {
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
     * @memberof module:scramjet.DataStream#
     * @param  {number} count The number of items to view before
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
     * Slices out a part of the stream to the passed Function.
     *
     * Returns a stream consisting of an array of items with `0` to `start`
     * omitted and `length` items after `start` included. Works similarly to
     * Array.prototype.slice.
     *
     * Takes count from the moment it's called. Any previous items will not be
     * taken into account.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {number} [start=0] omit this number of entries.
     * @param {number} [length=Infinity] get this number of entries to the resulting stream
     *
     * @test test/methods/data-stream-slice.js
     */
    slice(start = 0, length = Infinity) {
        let n = 0;

        let stream = this;
        if (start > 0) {
            stream = this.shift(start, () => 0);
        }

        if (length === Infinity) {
            return this;
        }

        return stream.until(() => n++ >= length);
    },

    /**
     * Transforms stream objects by assigning the properties from the returned
     * data along with data from original ones.
     *
     * The original objects are unaltered.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {MapCallback|object} func The function that returns new object properties or just the new properties
     *
     * @test test/methods/data-stream-assign.js
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
     * Called only before the stream ends without passing any items
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {Function} callback Function called when stream ends
     *
     * @test test/methods/data-stream-empty.js
     */
    empty(callback) {
        let z = false;
        const promiseTransform = () => {
            z = true;
            this.dropTransform(promiseTransform);
        };

        this.pushTransform({promiseTransform})
            .tap()
            .whenEnd()
            .then(
                () => (z || Promise.resolve().then(callback)),
                () => 0
            );

        return this;
    },


    /**
     * Pushes any data at call time (essentially at the beginning of the stream)
     *
     * This is a synchronous only function.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {any[]} ...item list of items to unshift (you can pass more items)
     */
    unshift(...items) {
        items.forEach(
            item => this.write(item)
        );
        return this.tap();
    },

    /**
     * Pushes any data at end of stream
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {*} item list of items to push at end
     * @meta.noreadme
     *
     * @test test/methods/data-stream-endwith.js
     */
    endWith(...items) {
        // TODO: overhead on unneeded transform, but requires changes in core.
        // TODO: should accept similar args as `from`
        return this.pipe(this._selfInstance({
            referrer: this,
            promiseTransform: (a) => a,
            flushPromise: () => items
        }));
    },

    /**
     * Accumulates data into the object.
     *
     * Works very similarly to reduce, but result of previous operations have
     * no influence over the accumulator in the next one.
     *
     * Method works in parallel.
     *
     * @async
     * @memberof module:scramjet.DataStream#
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise<any>}  resolved with the "into" object on stream end.
     * @meta.noreadme
     *
     * @test test/methods/data-stream-accumulate.js
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
     * @memberof module:scramjet~
     * @param {*} accumulator Accumulator passed to accumulate function
     * @param {*} chunk the stream chunk
     * @return {Promise<any>|*} resolved when all operations are completed
     */

    /**
     * Consumes the stream by running each Function
     *
     * @deprecated use {@link DataStream#each} instead
     *
     * @async
     * @memberof module:scramjet.DataStream#
     * @param {ConsumeCallback|AsyncGeneratorFunction|GeneratorFunction} func the consument
     * @param {any[]} ...args additional args will be passed to generators
     * @meta.noreadme
     */
    async consume(func, ...args) {
        let runFunc = func;
        if (func instanceof GeneratorFunction || func instanceof AsyncGeneratorFunction) {
            const gen = await func(...args);
            await gen.next();
            runFunc = async item => {
                await gen.next(item);
            };
        }

        return this.tap()
            .do(runFunc)
            .resume()
            .whenEnd();
    },

    /**
     * @callback ConsumeCallback
     * @memberof module:scramjet~
     * @param {*} chunk the stream chunk
     * @return {Promise<any>|*} resolved when all operations are completed
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
     * @memberof module:scramjet.DataStream#
     * @param  {ReduceCallback} func The into object will be passed as the first argument, the data object from the stream as the second.
     * @param  {*|EventEmitter} into Any object passed initially to the transform  function
     * @return {*} whatever was passed as into
     *
     * @test test/methods/data-stream-reduceNow.js
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
     * @memberof module:scramjet~
     * @param {Function} emit a method to emit objects in the remapped stream
     * @param {*} chunk the chunk from the original stream
     * @returns {Promise<any>|*} promise to be resolved when chunk has been processed
     */

    /**
     * Remaps the stream into a new stream.
     *
     * This means that every item may emit as many other items as we like.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {RemapCallback} func A Function that is called on every chunk
     * @param  {function(new:DataStream)} [ClassType=this.constructor] Optional DataStream subclass to be constructed
     *
     * @test test/methods/data-stream-remap.js
     */
    remap(func, ClassType = this.constructor) {

        const ref = new (ClassType || this.constructor)({referrer: this});

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
     * The passed Function must return an iterable (otherwise an error will be emitted). The resulting stream will
     * consist of all the items of the returned iterables, one iterable after another.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {FlatMapCallback} func A Function that is called on every chunk
     * @param {function(new:DataStream)} [ClassType=this.constructor] Optional DataStream subclass to be constructed
     * @param {any[]} ...args additional args will be passed to generators
     *
     * @test test/methods/data-stream-flatmap.js
     */
    flatMap(func, ClassType, ...args) {
        if (typeof ClassType !== "function")
            ClassType = this.constructor;

        const ref = new ClassType({referrer: this});
        const iteratorSymbol = Symbol.asyncIterator;

        return this.into(
            async (ref, chunk) => {
                const out = await func(chunk, ...args);
                if (!out) {
                    throw new Error("Non iterable object returned for flatMap!");
                }

                if (iteratorSymbol && out[iteratorSymbol]) {
                    const iterator = out[iteratorSymbol]();
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const item = await iterator.next();
                        if (item.done) return;
                        if (!ref.write(item.value)) await ref.whenDrained();
                    }
                } else {
                    await ref.whenWrote(...out);
                }
            },
            ref
        );
    },

    /**
     * @callback FlatMapCallback
     * @memberof module:scramjet~
     * @param {*} chunk the chunk from the original stream
     * @returns {AsyncGenerator<any, void, any>|Promise<Iterable<any>>|Iterable<any>}  promise to be resolved when chunk has been processed
     */

    /**
     * A shorthand for streams of arrays or iterables to flatten them.
     *
     * More efficient equivalent of: `.flatmap(i => i);`
     * Works on streams of async iterables too.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @return {DataStream}
     *
     * @test test/methods/data-stream-flatten.js
     */
    flatten() {
        const iteratorSymbol = Symbol.asyncIterator;
        let wroteAll = Promise.resolve();

        return this.into(
            async (ref, chunk) => {
                const prevWrote = wroteAll;
                let res;
                wroteAll = new Promise(_res => res = _res);

                if (iteratorSymbol && chunk[iteratorSymbol]) {
                    const iterator = chunk[iteratorSymbol]();
                    await prevWrote;
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const item = await iterator.next();
                        
                        if (item.value && !ref.write(item.value)) await ref.whenDrained();
                        if (item.done) return res();
                    }
                } else {
                    let last = true;
                    await prevWrote;
                    for (const val of chunk) {
                        last = ref.write(val);
                        if (!last) await ref.whenDrained();
                    }
                    return res();
                }
            },
            this._selfInstance()
        );
    },

    /**
     * Returns a new stream that will append the passed streams to the callee
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {Readable[]} ...streams Streams to be injected into the current stream
     *
     * @test test/methods/data-stream-concat.js
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
     * @callback JoinCallback
     * @memberof module:scramjet~
     * @param {*} previous the chunk before
     * @param {*} next the chunk after
     * @returns {Promise<*>|*}  promise that is resolved with the joining item
     */

    /**
     * Method will put the passed object between items. It can also be a function call or generator / iterator.
     *
     * If a generator or iterator is passed, when the iteration is done no items will be interweaved.
     * Generator receives
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {*|AsyncGeneratorFunction|GeneratorFunction|JoinCallback} item An object that should be interweaved between stream items
     * @param {any[]} ...args additional args will be passed to generators
     *
     * @test test/methods/data-stream-join.js
     */
    join(item, ...args) {
        const ref = this._selfInstance({referrer: this});

        let prev;
        let consumer;
        if (typeof item !== "function") {
            consumer = (cur) => Promise.all([
                ref.whenWrote(item),
                ref.whenWrote(cur)
            ]);
        } else if (item instanceof GeneratorFunction || item instanceof AsyncGeneratorFunction) {
            const iterator = item(...args);
            consumer = cur => Promise.resolve()
                .then(() => iterator.next(prev))
                .then(({value, done}) => Promise.all([
                    !done && ref.whenWrote(value),
                    ref.whenWrote(prev = cur)
                ]))
            ;
        } else {
            consumer = cur =>
                Promise.resolve([prev, prev = cur])
                    .then(([prev, cur]) => item(prev, cur, ...args),)
                    .then(joint => Promise.all([
                        joint && ref.whenWrote(joint),
                        ref.whenWrote(cur)
                    ]))
            ;
        }

        this.shift(1, ([first]) => ref.push(prev = first))
            .consume(consumer)
            .then(() => ref.end());

        return ref;
    },

    /**
     * Keep a buffer of n-chunks for use with {@see DataStream..rewind}
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {number} [count=Infinity] Number of objects or -1 for all the stream
     *
     * @test test/methods/data-stream-keep.js
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
     * @memberof module:scramjet.DataStream#
     * @param {number} [count=Infinity] Number of objects or -1 for all the buffer
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
     * Returns a stream that stacks up incoming items always feeding out the newest items first.
     * It returns the older items when read
     *
     * When the stack length exceeds the given `count` the given `drop` function is awaited
     * and used for flow control.
     *
     * By default the drop function ignores and quietly disposes of items not read before overflow.
     *
     * @chainable
     * @param {number} [count=1000]
     * @param {function} [drop]
     * @memberof module:scramjet.DataStream#
     *
     * @test test/methods/data-stream-stack.js
     */
    stack(count = 1000, drop = () => 0) {
        if (count < 0)
            count = Infinity;

        return this.tap().use(
            source => {
                const stack = [];
                const waiting = [];
                let end = false;
                const target = new this.constructor({referrer: this, promiseRead() {
                    if (end) {
                        if (stack.length) {
                            const out = stack.slice().reverse();
                            stack.length = 0;
                            return out;
                        } else {
                            return [];
                        }
                    }
                    if (stack.length) {
                        return [stack.pop()];
                    }

                    return new Promise(res => {
                        waiting.push(res);
                    });
                }});

                source
                    .each(item => {
                        if (waiting.length === 0) {
                            stack.push(item);
                            if (stack.length > count) {
                                return drop(stack.shift());
                            }
                        } else {
                            waiting.shift()([item]);
                        }
                    })
                    .catch(
                        e => target.raise(e)
                    )
                    .whenEnd()
                    .then(() => {
                        end = true;
                        if (waiting.length) {
                            console.log(waiting[0]);
                            waiting.shift()([]);
                        }
                    });

                return target;
            }
        );
    },

    /**
     * Distributes processing into multiple sub-processes or threads if you like.
     *
     * @todo Currently order is not kept.
     * @todo Example test breaks travis-ci build
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {AffinityCallback|Function|number} [affinity] A Function that affixes the item to specific output stream which must exist in the object for each chunk, must return a string. A number may be passed to identify how many round-robin threads to start up. Defaults to Round Robin to twice the number of CPU threads.
     * @param {Function|DataStreamOptions} [clusterFunc] stream transforms similar to {@see DataStream#use method}
     * @param {DataStreamOptions} [options] Options
     *
     * @test test/methods/data-stream-distribute.js
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
     * Separates stream into a hash of streams. Does not create new streams!
     *
     * @chainable
     * @meta.noreadme
     * @memberof module:scramjet.DataStream#
     * @param {object} streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param {AffinityCallback} affinity the Function that affixes the item to specific streams which must exist in the object for each chunk.
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
     * @callback AffinityCallback
     * @memberof module:scramjet~
     * @param {*} chunk
     * @returns {Symbol|string}
     */

    /**
     * Separates execution to multiple streams using the hashes returned by the passed Function.
     *
     * Calls the given Function for a hash, then makes sure all items with the same hash are processed within a single
     * stream. Thanks to that streams can be distributed to multiple threads.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {AffinityCallback} affinity the affinity function
     * @param {DataStreamOptions} [createOptions] options to use to create the separated streams
     * @param {function(new:DataStream)} [ClassType=this.constructor] options to use to create the separated streams
     * @return {MultiStream} separated stream
     *
     * @test test/methods/data-stream-separate.js
     */
    separate(affinity, createOptions = {}, ClassType = this.constructor) {
        const ret = new MultiStream();
        const hashes = new Map();

        ClassType = ClassType || this.constructor;

        const pushChunk = async (hash, chunk) => {
            const _hash = hash.toString();
            let rightStream;
            if (!hashes.has(_hash)) {
                rightStream = new ClassType(createOptions);
                rightStream._separateId = _hash;
                hashes.set(_hash, rightStream);
                ret.add(rightStream);
            } else {
                rightStream = hashes.get(_hash);
            }

            return rightStream.whenWrote(chunk);
        };

        this.pipe(
            new this.constructor({
                async promiseTransform(chunk) {
                    try {
                        const hash = await affinity(chunk);
                        if (Array.isArray(hash)) return Promise.all(hash.map(str => pushChunk(str, chunk)));
                        else return pushChunk(hash, chunk);
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
     * @memberof module:scramjet~
     * @typedef {Function} DelegateCallback
     */

    /**
     * Delegates work to a specified worker.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {DelegateCallback} delegateFunc A function to be run in the sub-thread.
     * @param  {StreamWorker}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc, worker, plugins = []) {
        const ret = this._selfInstance({referrer: this});
        return worker.delegate(this, delegateFunc, plugins).pipe(ret);
    },

    /**
     * Limit the rate of the stream to a given number of chunks per second or given timeframe.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {number}      cps Chunks per timeframe, the default timeframe is 1000 ms.
     * @param  {RateOptions} [options={}] Options for the limiter controlling the timeframe and time source. Both must work on same units.
     */
    rate(cps, {windowSize = 1000, getTime = Date.now, setTimeout = global.setTimeout} = {}) {
        const refs = [];

        const defer = (time) => new Promise(res => setTimeout(res, time));

        return this.do(
            () => {
                const time = getTime();
                refs.push(time);

                if (refs.length <= cps) return; // DRY fail on purpose here - we don't need to slice the lemon twice.

                refs.splice(0, refs.find(x => x < time - windowSize));
                if (refs.length <= cps) return;

                return defer(time - refs.shift() + windowSize);
            }
        );
    },

    /**
     * @typedef {object} RateOptions
     * @memberof module:scramjet~
     * @param  {number}   [timeFrame=1000] The size of the window to look for streams.
     * @param  {Function} [getTime=Date.now] Time source - anything that returns time.
     * @param  {Function} [setTimeout=setTimeout] Timing function that works identically to setTimeout.
     */

    /**
     * Aggregates chunks in arrays given number of number of items long.
     *
     * This can be used for micro-batch processing.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {number} count How many items to aggregate
     *
     * @test test/methods/data-stream-batch.js
     */
    batch(count) {
        let arr = [];

        const ret = this.tap().pipe(new this.constructor({
            promiseTransform(chunk) {
                arr.push(chunk);
                if (arr.length >= count) {
                    const push = arr;
                    arr = [];
                    return push;
                }
                return Promise.reject(DataStream.filter);
            },
            promiseFlush() {
                if (arr.length > 0) {
                    return [arr];
                } else
                    return [];
            },
            referrer: this
        }));

        return ret;
    },

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {number} ms    Maximum amount of milliseconds
     * @param  {number} [count] Maximum number of items in batch (otherwise no limit)
     *
     * @test test/methods/data-stream-timebatch.js
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
     * @memberof module:scramjet.DataStream#
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
     * @memberof module:scramjet.DataStream#
     * @chainable
     * @param {number} length
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
            new scramjet.WindowStream()
        );
    },

    /**
     * Transforms the stream to a streamed JSON array.
     *
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {Iterable<any>} [enclosure='[]'] Any iterable object of two items (beginning and end)
     * @return {StringStream}
     * @meta.noreadme
     *
     * @test test/methods/data-stream-tojsonarray.js
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
     * @memberof module:scramjet.DataStream#
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable<any>} [enclosure='{}'] Any iterable object of two items (beginning and end)
     * @return {StringStream}
     * @meta.noreadme
     *
     * @test test/methods/data-stream-tojsonobject.js
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
     * @memberof module:scramjet.DataStream#
     * @param  {Boolean|string} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
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
     * @memberof module:scramjet.DataStream#
     * @param {object} [options={}] options for the papaparse.unparse module.
     * @return {StringStream}  stream of parsed items
     *
     * @test test/methods/data-stream-csv.js
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
     * @typedef {object} ExecDataOptions
     * @memberof module:scramjet~
     * @property {UseCallback} [parse] scramjet module to transform the stream to string or buffer stream
     * @property {UseCallback} [stringify] scramjet module to transform from string or buffer stream to wanted version
     * @extends StringStream.ExecOptions
     */

    /**
     * Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
     *
     * Pipes the current stream into the sub-processes stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     *
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     *
     * @param {string} command command to execute
     * @memberof module:scramjet.DataStream#
     * @param {ExecDataOptions|any} [options={}] options to be passed to `spawn` and defining serialization.
     * @param {string[]} ...args additional args will be passed to function
     *
     * @test test/methods/data-stream-exec.js
     */
    exec(command, options = {}, ...args) {
        const resolvedCmd = path.resolve(getCalleeDirname(1), command);
        const stringify = options.stringify || (stream => stream.JSONStringify());
        const parse = options.parse || (stream => stream.JSONParse());

        return this
            .use(stringify)
            .exec(resolvedCmd, options, ...args)
            .use(parse);
    },

    /**
     * Injects a ```debugger``` statement when called.
     *
     * @meta.noreadme
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @return {DataStream}  self
     *
     * @test test/methods/data-stream-debug.js
     */
    debug(func) {
        debugger; // eslint-disable-line
        this.use(func);
        return this;
    },

};

module.exports.pop = module.exports.shift;
module.exports.group = module.exports.separate;
