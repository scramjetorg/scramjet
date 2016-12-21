const PassThrough = require('stream').PassThrough;
const Writeable = require('stream').Writable;
const scramjet = require('./');
const EventEmitter = require('events').EventEmitter;

/**
 * DataStream is the primary stream type for Scramjet. When you parse your
 * stream, just pipe it you can then perform calculations on the data objects
 * streamed through your flow.
 *
 * @extends stream.PassThrough
 */
class DataStream extends PassThrough {

    /**
     * Create the DataStream.
     *
     * @param {object} opts Stream options passed to superclass
     * @example {@link ../samples/data-stream-constructor.js}
     */
    constructor(opts) {
        super(Object.assign({
            writableObjectMode: true,
            readableObjectMode: true
        }, opts));
    }

    /**
     * Returns a new instance of self.
     *
     * Normally this doesn't have to be overridden.
     * When the constructor would use some special arguments this may be used to
     * override the object construction in {@see pop} and {@see tee}...
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
        func && func(this); // jshint ignore:line
        return this;
    }

    /**
     * @callback GroupCallback
     * @param {Object} chunk a the object
     * @return {Promise|String}  the key to hash by
     */

    /**
     * Groups execution by key in a single thread
     *
     * Calls the given callback for a hash, then makes sure all items with the
     * same hash are processed by a single thread (or server).
     *
     * @todo Not yet implemented
     * @param  {GroupCallback} func the callback function
     * @return {DataStream}  self
     *
     * @example {@link ../samples/data-stream-group.js}
     */
    group(/* func */) {
        // TODO: NYI, this needs some implementation
        return this;
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
        return this;
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
     * @param {PopCallback} func the callback
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @return {Promise}  resolved with the "into" object on stream end.
     */
    accumulate(func, into) {

        return new Promise((res, rej) => {

            const out = this.pipe(new Writeable({
                objectMode: true,
                write: (chunk, encoding, callback) => {
                    Promise.resolve(into)
                        .then((acc) => func(acc, chunk))
                        .then(() => callback(null))
                        .catch((err) => callback(err));
                },
            }));

            out.on("finish", () => {
                res(into);
            });
            out.on("error", rej);

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
     * Reduces the stream into the given object. The main difference to native
     * is that Array.prototype.reduce is that only the first object will be
     * passed to the following methods.
     *
     * @param  {TransformFunction} func The into object will be passed as the
     *                                  first argument, the data object from the
     *                                  stream as the second.
     * @param  {Object} into Any object passed initally to the transform
     *                       function
     * @return {Promise}  Promise resolved by the last object returned by the
     *                    call of the transform function.
     *
     * @example {@link ../samples/data-stream-reduce.js}
     */
    reduce(func, into) {

        return new Promise((res, rej) => {

            let last = Promise.resolve(into);

            const out = this.pipe(new Writeable({
                objectMode: true,
                write: (chunk, encoding, callback) => {
                    last = last.then((acc) => func(acc, chunk));

                    last.then(() => callback(null));
                    last.catch((err) => callback(err));
                },
            }));

            out.on("finish", () => {
                last.then(res);
            });
            out.on("error", rej);

        });
    }

    /**
     * Reduces the stream into the given object the same way as {@see reduce},
     * but resolves the promise at once with the passed object.
     * If the object is an instance of EventEmitter then it will propagate the
     * error from the previous stream.
     *
     * @param  {ReduceCallback} func The into object will be passed as the first
     *                               argument, the data object from the stream
     *                               as the second.
     * @param  {Object} into Any object passed initally to the transform
     *                       function
     * @return {Promise}  Promise resolved by the last object returned by the
     *                    call of the transform function.
     *
     * @example {@link ../samples/data-stream-reduceNow.js}
     */
    reduceNow(func, into) {

        const prm = this.reduce(func, into);

        if (into instanceof EventEmitter)
            prm.catch((e) => into.emit("error", e));

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

        const ref = new Clazz({
            transform(chunk, encoding, callback) {
                Promise.resolve(chunk)
                    .then(
                        (chunk) =>
                            func(
                                (arg) => {
                                    return !this.push(arg) ?
                                        new Promise((s) => this.once("drain", s)) :
                                        Promise.resolve();
                                },
                                chunk
                            )
                    )
                    .then(() => callback(null))
                    .catch((e) => callback(e))
                ;
            }
        });
        return this.pipe(ref);
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
        this.on("data", func);
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
            transform: (chunk, encoding, callback) => {
                Promise.resolve(chunk)
                    .then(func)
                    .then(
                        (ret) => callback(null, ret)
                    )
                    .catch(
                        (e) => {
                            callback(e);
                        }
                    );
            }
        }));
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
            transform: (chunk, encoding, callback) => {
                Promise.resolve(chunk)
                    .then(func)
                    .then(
                        (ret) => ret ? callback(null, chunk) : callback()
                    )
                    .catch(
                        (e) => callback(e)
                    );
            }
        }));
    }

    /**
     * Pop callback
     *
     * @callback PopCallback
     * @param {Array<Object>} popped an array of popped chunks
     */

    /**
     * Pops the first item from the stream and pipes the other
     *
     * @param {Number} count The number of items to pop.
     * @param {PopCallback} func Function that receives an array of popped items
     * @return {DataStream}  substream.
     *
     * @example {@link ../samples/data-stream-pop.js}
     */
    pop(count, func) {
        const ret = [];
        const str = this._selfInstance();

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
        this.on("error", to.emit.bind(to, "error"));
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
    toStringStream(serializer) {
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

module.exports = DataStream;
