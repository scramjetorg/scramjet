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
     */
    _selfInstance() {
        return new this.constructor();
    }

    /**
     * Injects a ```debugger``` statement when called.
     *
     * @param  {Function} func if passed, the function will be called on self
     *                         to add an option to inspect the stream in place,
     *                         while not breaking the transform chain
     * @return {DataStream}  self
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
     */
    reduceNow(func, into) {

        const prm = this.reduce(func, into);

        if (into instanceof EventEmitter)
            prm.catch((e) => into.emit("error", e));

        return into;
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
     */
    map(func) {
        return this.pipe(new DataStream({
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
     */
    filter(func) {
        return this.pipe(new DataStream({
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
     */
    pop(count, func) {
        const ret = [];
        const str = this._selfInstance();

        const chunkHandler = (chunk) => {
            ret.push(chunk);
            if (ret.length >= count) {
                unHook();
                this.pipe(str);
            }
        };

        const endHandler = (...args) => {
            if (ret.length < count) {
                unHook();
            }
            str.end(...args);
        };

        const errorHandler = str.emit.bind(str, "error");

        const unHook = () => {  // jshint ignore:line
            this.removeListener("data", chunkHandler);
            this.removeListener("end", endHandler);
            this.removeListener("error", errorHandler);
            func(ret);
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
     */
    separate(...funcs) {
        const streams = funcs.map();
        return new scramjet.MultiStream(streams);
    }

    pipe(to, options) {
        this.on("error", to.emit.bind(to, "error"));
        return super.pipe(to, options || {end: true});
    }

}

module.exports = DataStream;
