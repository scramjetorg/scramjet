const PassThrough = require('stream').PassThrough;
const Writeable = require('stream').Writable;
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
    group(func) {
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
        func(this.pipe(new DataStream()));
        return this;
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

        let last = Promise.resolve(into);

        const out = this.pipe(new Writeable({
            objectMode: true,
            write: (chunk, encoding, callback) => {
                last = last.then((acc) => func(acc, chunk));

                last.then((acc) => callback(null));
                last.catch((err) => callback(err));
            }
        }));

        return new Promise((res, rej) => {
            this.on("end", () => res(last));
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
     * @todo Not yet implemented. Should use the filter method above.
     * @param  {TransformFunction} func Would receive the first item as the
     *                                  first argument.
     * @return {DataStream}  substream.
     */
    pop(func) {
        this.emit("error", new Error("NYI: should pop first chunk and pass it to the passed function, while piping all the following chunks"));
        return this;
    }

    /**
     * Splits the stream into a Multistream where every function passed creates
     * a separate stream.
     *
     * @todo Not yet implemented. Should use a number of tee+filter combination.
     * @param  {TransformFunction} ...funcs The list of transfrom functions
     * @return {MultiStream}
     */
    separate(...funcs) {
        //return new MultiStream([this]);
    }

    pipe(to, options) {
        this.on("error", to.emit.bind(to, "error"));
        return super.pipe(to, options || {end: true});
    }

}

module.exports = DataStream;
