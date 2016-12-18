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
     *
     * @see example in file: {@link ../samples/data-stream-constructor.js}
     */
    constructor(opts) {
        super(Object.assign({
            writableObjectMode: true,
            readableObjectMode: true
        }, opts));
    }

    /**
     * Should return a new instance of self. Normally this doesn't have to be
     * overridden.
     * When the constructor would use some special arguments this may be used to
     * override the object construction in {@see pop} and {@see tee}...
     *
     * @return {DataStream}  an empty instance of the same class.
     *
     * @see example in file: {@link ../samples/data-stream-selfinstance.js}
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
     * @see example in file: {@link ../samples/data-stream-debug.js}
     */
    debug(func) {
        debugger; // jshint ignore:line
        func && func(this); // jshint ignore:line
        return this;
    }

    /**
     * Calls the given callback for a hash, then makes sure all items with the
     * same hash are processed by a single thread (or server).
     *
     * @todo Not yet implemented
     * @param  {TransformFunction} func the callback function
     * @return {DataStream}  self
     *
     * @see example in file: {@link ../samples/data-stream-group.js}
     */
    group(/* func */) {
        // TODO: NYI, this needs some implementation
        return this;
    }

    /**
     * Duplicate the stream and pass the duplicate to the passed callback
     * function.
     *
     * @param  {TransformFunction} func The duplicate stream will be passed as
     *                                  first argument.
     * @return {DataStream}  self
     *
     * @see example in file: {@link ../samples/data-stream-tee.js}
     */
    tee(func) {
        func(this.pipe(this._selfInstance()));
        return this;
    }

    /**
     * Returns a stream consisting of an array of items with `0` to `start`
     * omitted and `start` until `end` included. Works similarily to
     * Array.prototype.slice.
     * Takes count from the moment it's called. Any previous items will not be
     * counted.
     * Also take into account that the stream will end if both arguments are
     * passed.
     *
     * @todo to be implemented
     * @param  {Number} start omit this number of entries.
     * @param  {Number} end   end at this number of entries (from 0)
     * @return {DataStream}  the affected stream
     *
     * @see example in file: {@link ../samples/data-stream-slice.js}
     */
    slice(/* start, end */) {

    }

    /**
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
     * @see example in file: {@link ../samples/data-stream-reduce.js}
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
     * @param  {TransformFunction} func The into object will be passed as the
     *                                  first argument, the data object from the
     *                                  stream as the second.
     * @param  {Object} into Any object passed initally to the transform
     *                       function
     * @return {Promise}  Promise resolved by the last object returned by the
     *                    call of the transform function.
     *
     * @see example in file: {@link ../samples/data-stream-reduceNow.js}
     */
    reduceNow(func, into) {

        const prm = this.reduce(func, into);

        if (into instanceof EventEmitter)
            prm.catch((e) => into.emit("error", e));

        return into;
    }

    /**
     * Remaps the stream into a new stream. This means that every item may
     * emit as many other items as we like.
     *
     * @param  {TransformFunction} func  A TransformFunction that is called with
     *                                     * `emit` function as the first
     *                                       argument that should be called to
     *                                       push entries in the other stream.
     *                                     * `chunk` chunk.
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @return {DataStream}  a new DataStream of the given class with new chunks
     *
     * @see example in file: {@link ../samples/data-stream-remap.js}
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
                    .then(() => callback())
                    .catch((e) => callback(e))
                ;
            }
        });
        return this.pipe(ref);
    }

    each(func) {
        return this.on("data", func);
    }

    /**
     * Transforms stream objects into new ones, just like Array.prototype.map
     * does.
     *
     * @param  {TransformFunction} func The function that creates the new
     *                                  object. As usually it can return a
     *                                  Promise or just return the new
     *                                  object.
     *
     * @return {DataStream}  mapped stream
     *
     * @see example in file: {@link ../samples/data-stream-map.js}
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
     * Filters object based on the function outcome, just like
     * Array.prototype.filter.
     *
     * @param  {TransformFunction} func The function that filters the object.
     *                                  As usually it can return a Promise or
     *                                  just return the boolean value of true
     *                                  if the item should not be filtered,
     *                                  false otherwise.
     *
     * @return {DataStream}  filtered stream
     *
     * @see example in file: {@link ../samples/data-stream-filter.js}
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
     * Pops the first item from the stream and pipes the other.
     *
     * @param {Number} count The number of items to pop.
     * @param {TransformFunction} func Function that receives an array of popped
     *                                 items.
     * @return {DataStream}  substream.
     *
     * @see example in file: {@link ../samples/data-stream-pop.js}
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
     * @see example in file: {@link ../samples/data-stream-separate.js}
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
     * @param  {TransformFunction} serializer A method that converts objects to
     *                                        Buffer.
     * @return {BufferStream}  the resulting stream
     */
    toBufferStream(serializer) {
        return this.map(serializer, scramjet.BufferStream);
    }

    /**
     * Creates a StringStream.
     *
     * @param  {TransformFunction} serializer A method that converts objects to
     *                                        String.
     * @return {StringStream}  the resulting stream
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
     * @see example in file: {@link ../samples/data-stream-fromarray.js}
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
     * Aggregates the stream into a single Array. In fact it's just a shorthand
     * for reducing the stream into an Array.
     *
     * @param  {Array} initial Optional array to begin with.
     * @return {Promise}  Promise resolved with the resulting array on stream
     *                    end.
     */
    toArray(initial) {
        return this.reduce(
            (arr, item) => (arr.push(item), arr),
            initial || []
        );
    }

}

module.exports = DataStream;
