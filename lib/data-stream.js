const PromiseTransformStream = require('./util/promise-transform-stream');
const scramjet = require('./');
const EventEmitter = require('events').EventEmitter;

/**
 * DataStream is the primary stream type for Scramjet. When you parse your
 * stream, just pipe it you can then perform calculations on the data objects
 * streamed through your flow.
 *
 * @extends stream.PassThrough
 */
class DataStream extends PromiseTransformStream {

    /**
     * Create the DataStream.
     *
     * @param {object} opts Stream options passed to superclass
     * @example {@link ../samples/data-stream-constructor.js}
     */
    constructor(opts) {
        super(Object.assign({
            objectMode: true,
            writableObjectMode: true,
            readableObjectMode: true
        }, opts));
    }

    /**
     * @function tap
     *
     * Stops merging transform callbacks at the current place in the command
     * chain.
     *
     * @example {@link ../samples/data-stream-tap.js}
     */

    /**
     * Returns a new instance of self.
     *
     * Normally this doesn't have to be overridden.
     * When the constructor would use some special arguments this may be used to
     * override the object construction in {@see shift} and {@see tee}...
     *
     * @private
     * @return {DataStream}  an empty instance of the same class.
     * @example {@link ../samples/data-stream-selfinstance.js}
     */
    _selfInstance(...args) {
        return new this.constructor(...args);
    }

    /**
     * Injects a ```debugger``` statement when called.
     *
     * @param  {Function} func if passed, the function will be called on self
     *                         to add an option to inspect the stream in place,
     *                         while not breaking the transform chain
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-debug.js}
     */
    debug(func) {
        debugger; // jshint ignore:line
        this.use(func);
        return this;
    }

    /**
     * Calls the passed in place with the stream as first argument, returns result.
     *
     * @param  {Function} func if passed, the function will be called on self
     *                         to add an option to inspect the stream in place,
     *                         while not breaking the transform chain
     * @return {*}  anything the passed function returns
     *
     * @example {@link ../samples/data-stream-use.js}
     */
    use(func) {
        return func && func(this.tap());
    }

    /**
     * @callback GroupCallback
     * @param {Object} chunk a the object
     * @return {Promise|Object}  the key to hash by (key is used in a Map)
     */

    /**
     * Separates execution to multiple streams using the hashes returned by the passed callback
     *
     * Calls the given callback for a hash, then makes sure all items with the same hash are processed within a single
     * stream. Thanks to that streams can be distributed to multiple threads.
     *
     * @param  {GroupCallback} func the callback function
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-group.js}
     */
    group(func, createOptions, CreateClass) {
        const ret = new scramjet.MultiStream();
        const hashes = new Map();

        CreateClass = CreateClass || this.constructor;

        this
            .pipe(new DataStream({
                parallelTransform(chunk) {
                    return Promise.resolve(func(chunk))
                        .then((hash) => {
                            if (!hashes.has(hash)) {
                                const ns = new CreateClass(createOptions);
                                ns.id = hash;
                                hashes.set(hash, ns);
                                ret.add(ns);
                                return ns;
                            } else {
                                return hashes.get(hash);
                            }
                        })
                        .then(
                            stream => stream.whenWrote(chunk)
                        )
                        .catch(
                            e => ret.emit("error", e, console.error(e))
                        );
                },
                referrer: this
            })
            .on("end", () => {
                ret.each(stream => stream.end());
            })
            .resume()
        );

        return ret;
    }

    /**
     * @callback TeeCallback
     * @param {DataStream} teed The teed stream
     */

    /**
     * Duplicate the stream
     *
     * Creates a duplicate stream instance and pases it to the callback.
     *
     * @param  {TeeCallback} func The duplicate stream will be passed as
     *                                  first argument.
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-tee.js}
     */
    tee(func) {
        func(this.pipe(this._selfInstance()));
        return this.tap();
    }

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
     * @todo to be implemented
     * @param {Number} start omit this number of entries.
     * @param {Number} end   end at this number of entries (from 0)
     * @param {ShiftCallback} func the callback
     * @return {DataStream}  the affected stream
     *
     * @example {@link ../samples/data-stream-slice.js}
     */
    slice(/* start, end, func */) {

    }

    /**
     * @callback AccumulateCallback
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise}  resolved with the "into" object on stream end.
     *
     * @example {@link ../samples/data-stream-accumulate.js}
     */
    accumulate(func, into) {
        return new Promise((res, rej) => {
            const bound = (chunk) => (func(into,  chunk), DataStream.filter);
            bound.to = func;

            this.tap().pipe(new PromiseTransformStream({
                    parallelTransform: bound,
                    referrer: this
                }))
                .on("end", () => res(into))
                .on("error", rej)
                .resume();
        });
    }

    /**
     * @callback ReduceCallback
     * @param {*} acc the accumulator - the object initially passed or retuned
     *                by the previous reduce operation
     * @param {Object} chunk the stream chunk.
     * @return {Promise|*}  accumulator for the next pass
     */

    /**
     * Reduces the stream into a given accumulator
     *
     * Works similarily to Array.prototype.reduce, so whatever you return in the
     * former operation will be the first operand to the latter.
     *
     * This method is serial - meaning that any processing on an entry will
     * occur only after the previous entry is fully processed. This does mean
     * it's much slower than parallel functions.
     *
     * @param  {TransformFunction} func The into object will be passed as the
     * first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initally to the transform
     * function
     * @return {Promise}  Promise resolved by the last object returned by the
     * call of the transform function
     *
     * @example {@link ../samples/data-stream-reduce.js}
     */
    reduce(func, into) {

        return new Promise((res, rej) => {

            let last = Promise.resolve(into);

            this.tap().pipe(new PromiseTransformStream({
                parallelTransform: (chunk) => {
                    return last = last.then((acc) => func(acc, chunk));
                },
                referrer: this,
                initial: into
            }))
            .on("end", () => last.then(res))
            .on("error", rej)
            .resume();

        });

    }

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
    }

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
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-remap.js}
     */
    remap(func, Clazz) {

        Clazz = Clazz || this.constructor;

        const ref = this.pipe(new DataStream({
            parallelTransform(chunk) {
                let out = [];
                return Promise.resolve(func((newChunk) => out.push(newChunk), chunk))
                    .then(() => {
                        out.slice().forEach(
                            (newChunk) => this.push(newChunk),
                            this
                        );
                        return DataStream.filter;
                    });
            },
            referrer: this
        })).tap();

        return ref;
    }

    /**
     * @callback FlatMapCallback
     * @param {*} chunk the chunk from the original stream
     * @returns {Promise<Iterable>|Iterable}  promise to be resolved when chunk has been processed
     */

    /**
     * Takes any method that returns any iterable and flattens the result.
     *
     * The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream will
     * consist of all the items of the returned iterables, one iterable after another.
     *
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @example {@link ../samples/data-stream-flatmap.js}
     */
    flatMap(func, Clazz) {
        Clazz = Clazz || this.constructor;

        const ref = this.pipe(new DataStream({
            parallelTransform(chunk) {
                return Promise.resolve(func(chunk))
                    .then((out) => {
                        for (const val of out)
                            this.push(val);
                        return DataStream.filter;
                    });
            },
            referrer: this
        })).tap();

        return ref;
    }

    /**
     * Pushes any data at call time
     *
     * @param {*} item list of items to unshift (you can pass more items)
     * @chainable
     */
    unshift(...items) {
        items.forEach(
            item => this.write(item)
        );
        return this;
    }

    /**
     * A shorthand for streams of Arrays to flatten them.
     *
     * Runs: .flatmap(i => i);
     *
     * @return {DataStream}
     */
    flatten() {
        return this.flatMap(i => i);
    }

    /**
     * Aggregates a number of items for microbatch processing
     *
     * @param  {Number} count How many items to aggregate
     * @return {DataStream}   the microbatch stream
     *
     * @example {@link ../samples/data-stream-batch.js}
     */
    batch(count) {
        let arr = [];

        let ret = new DataStream({
            referrer: this
        });

        this.pipe(new PromiseTransformStream({
            parallelTransform(chunk) {
                arr.push(chunk);
                if (arr.length === count) {
                    const last = ret.whenWrote(arr);
                    arr = [];
                    return last;
                }
                return DataStream.filter;
            },
            flushPromise() {
                if (arr.length > 0)
                    return ret.whenWrote(arr);
            },
            referrer: this
        }));

        return ret;
    }

    /**
     * Performs an operation on every chunk, without changing the stream
     *
     * This is a shorthand for ```stream.on("data", func)```
     *
     * @chainable
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func) {
        this.tap().on("data", func);
        return this;
    }

    /**
     * @callback MapCallback
     * @param {*} chunk the chunk to be mapped
     * @returns {Promise|*}  the mapped object
     */

    /**
     * Transforms stream objects into new ones, just like Array.prototype.map
     * does.
     *
     * @param {MapCallback} func The function that creates the new object
     * @param {Class} Clazz (optional) The class to be mapped to.
     * @return {DataStream}  mapped stream
     *
     * @example {@link ../samples/data-stream-map.js}
     */
    map(func, Clazz) {
        Clazz = Clazz || this.constructor;
        return this.pipe(new Clazz({
            parallelTransform: func,
            referrer: this
        }));
    }

    /**
     * Transforms stream objects by assigning the properties from the returned
     * data along with data from original ones.
     *
     * The original objects are unaltered.
     *
     * @param {MapCallback} func The function that returns new object properties
     * @return {DataStream}  mapped stream
     *
     * @example {@link ../samples/data-stream-assign.js}
     */
    assign(func) {
        return this.map(
            (chunk) => Promise.resolve(func(chunk))
                .then(obj => Object.assign(obj, chunk))
        );
    }

    /**
     * @callback FilterCallback
     * @param {*} chunk the chunk to be filtered or not
     * @returns {Promise|Boolean}  information if the object should remain in
     *                             the filtered stream.
     */

    /**
     * Filters object based on the function outcome, just like
     * Array.prototype.filter.
     *
     * @param  {FilterCallback} func The function that filters the object
     * @return {DataStream}  filtered stream
     *
     * @example {@link ../samples/data-stream-filter.js}
     */
    filter(func) {
        return this.pipe(this._selfInstance({
            parallelTransform: func,
            afterTransform: (chunk, ret) => ret ? chunk : DataStream.filter,
            referrer: this
        }));
    }

    /**
     * Shift callback
     *
     * @callback ShiftCallback
     * @param {Array<Object>} shifted an array of shifted chunks
     */

    /**
     * Shifts the first n items from the stream and pipes the other
     *
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

    /**
     * Splits the stream two ways
     *
     * @todo Not yet implemented. Should use a number of tee+filter combination.
     * @param  {TransformFunction} ...funcs The list of transfrom functions
     * @return {MultiStream}
     *
     * @example {@link ../samples/data-stream-separate.js}
     */
    separate(...funcs) {
        const streams = funcs.map();
        return new scramjet.MultiStream(streams);
    }

    pipe(to, options) {
        if (to === this) {
            return this;
        }

        this.on("error", (...err) => to.emit("error", ...err));
        return super.pipe(to, options || {end: true});
    }

    /**
     * Creates a BufferStream
     *
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @return {BufferStream}  the resulting stream
     *
     * @example {@link ../samples/data-stream-tobufferstream.js}
     */
    toBufferStream(serializer) {
        return this.map(serializer, scramjet.BufferStream);
    }

    /**
     * Creates a StringStream
     *
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @return {StringStream}  the resulting stream
     *
     * @example {@link ../samples/data-stream-tostringstream.js}
     */
    stringify(serializer) {
        return this.map(serializer, scramjet.StringStream);
    }

    /**
     * Create a DataStream from an Array
     *
     * @param  {Array} arr list of chunks
     * @return {DataStream}  the resulting stream
     *
     * @example {@link ../samples/data-stream-fromarray.js}
     */
    static fromArray(arr) {
        const ret = new DataStream();
        arr = arr.slice();
        process.nextTick(() => {
            arr.forEach((item) => ret.write(item));
            ret.end();
        });
        return ret;
    }

    /**
     * Aggregates the stream into a single Array
     *
     * In fact it's just a shorthand for reducing the stream into an Array.
     *
     * @param  {Array} initial Optional array to begin with.
     * @return {Promise}  Promise resolved with the resulting array on stream
     *                    end.
     */
    toArray(initial) {
        return this.accumulate(
            (arr, item) => (arr.push(item), arr),
            initial || []
        );
    }

}

DataStream.prototype.toStringStream = DataStream.prototype.stringify;
DataStream.prototype.pop = DataStream.prototype.shift;

module.exports = DataStream;
