/**
 * Scramjet main exports expose all the stream classes and a number of methods.
 * 
 * All scramjet streams allow writing, reading or transform modes - currently
 * exclusively (meaning you can't have two at once). Any of the scramjet streams
 * can be constructed with the following options passed to mimic node.js standard streams:
 * 
 * * `async promiseTransform(chunk)` - transform method that resolves with a single output chunk
 * * `async promiseWrite(chunk)` - write method that that resolves when chunk is written
 * * `async promiseRead(count)` - read method that resolves with an array of chunks when called
 * 
 * See {@link https://nodejs.org/api/stream.html#stream_api_for_stream_implementers node.js API for stream implementers for details}
 */
declare module 'scramjet' {
    /**
     * Creates a DataStream that's piped from the passed readable.
     * @param str and node.js readable stream (`objectMode: true` is advised)
     * @returns
     */
    export function from(str: any[] | Iterable | GeneratorFunction | AsyncFunction | Readable): DataStream;

    /**
     * Creates a DataStream from an Array
     * @param args
     * @returns
     */
    export function fromArray(args: any[]): DataStream;

    /**
     * Exposes error classes (undocumented)
     */
    export var errors: ScramjetErrors;

    declare class PromiseTransformStream {
        /**
         * Provides a lazy-load accessor to PromiseTransformStream - the base class of scramjet streams
         */
        constructor();

    }

    /**
     * Definition of a single mixin for a specific Scramjet class. Should contain any number of stream methods.
     */
    declare interface StreamMixin {
        /**
         * optional constructor that will be called in the stream constructor (this has to be an own property!)
         */
        constructor: Function;
    }

    /**
     * Definition of a plugin in Scramjet
     */
    declare interface ScramjetPlugin {
        /**
         * definition of constructor and properties for the BufferStream prototype.
         */
        BufferStream: StreamMixin;
        /**
         * definition of constructor and properties for the DataStream prototype.
         */
        DataStream: StreamMixin;
        /**
         * definition of constructor and properties for the MultiStream prototype.
         */
        MultiStream: StreamMixin;
        /**
         * definition of constructor and properties for the StringStream prototype.
         */
        StringStream: StreamMixin;
    }

    /**
     * Add a global plugin to scramjet - injects mixins into prototypes.
     * @param mixin the plugin object
     */
    export function plugin(mixin: ScramjetPlugin): scramjet;

    /**
     * Gets an API version (this may be important for future use)
     * @param version The required version (currently only: 1)
     */
    export function API(version: Number): scramjet;

    /**
     * DataStream is the primary stream type for Scramjet. When you parse your
     * stream, just pipe it you can then perform calculations on the data objects
     * streamed through your flow.
     * 
     * Use as:
     * 
     * ```javascript
     * const { DataStream } = require('scramjet');
     * 
     * await (DataStream.from(aStream) // create a DataStream
     *     .map(findInFiles)           // read some data asynchronously
     *     .map(sendToAPI)             // send the data somewhere
     *     .run());                    // wait until end
     * ```
     */
    declare class DataStream {
        /**
         * DataStream is the primary stream type for Scramjet. When you parse your
         * stream, just pipe it you can then perform calculations on the data objects
         * streamed through your flow.
         * 
         * Use as:
         * 
         * ```javascript
         * const { DataStream } = require('scramjet');
         * 
         * await (DataStream.from(aStream) // create a DataStream
         * .map(findInFiles)           // read some data asynchronously
         * .map(sendToAPI)             // send the data somewhere
         * .run());                    // wait until end
         * ```
         */
        constructor(opts: StreamOptions);

        /**
         * Returns a DataStream from pretty much anything sensibly possible.
         * 
         * Depending on type:
         * * `self` will return self immediately
         * * `Readable` stream will get piped to the current stream with errors forwarded
         * * `Array` will get iterated and all items will be pushed to the returned stream.
         * The stream will also be ended in such case.
         * * `GeneratorFunction` will get executed to return the iterator which will be used as source for items
         * * `AsyncGeneratorFunction` will also work as above (including generators) in node v10.
         * * `Iterable`s iterator will be used as a source for streams
         * 
         * You can also pass a `Function` or `AsyncFunction` that will result in anything passed to `from`
         * subsequently. You can use your stream immediately though.
         * @param str argument to be turned into new stream
         * @param options
         */
        static from(str: any[] | Iterable | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | Readable, options: StreamOptions | Writable): DataStream;

        /**
         * Transforms stream objects into new ones, just like Array.prototype.map
         * does.
         * @param func The function that creates the new object
         * @param Clazz (optional) The class to be mapped to.
         */
        map(func: MapCallback, Clazz: Class): DataStream;

        /**
         * Filters object based on the function outcome, just like
         * Array.prototype.filter.
         * @param func The function that filters the object
         */
        filter(func: FilterCallback): DataStream;

        /**
         * Reduces the stream into a given accumulator
         * 
         * Works similarly to Array.prototype.reduce, so whatever you return in the
         * former operation will be the first operand to the latter. The result is a
         * promise that's resolved with the return value of the last transform executed.
         * 
         * This method is serial - meaning that any processing on an entry will
         * occur only after the previous entry is fully processed. This does mean
         * it's much slower than parallel functions.
         * @param func The into object will be passed as the  first argument, the data object from the stream as the second.
         * @param into Any object passed initially to the transform function
         */
        reduce(func: ReduceCallback, into: Object): Promise;

        /**
         * Perform an asynchroneous operation without changing or resuming the stream.
         * 
         * In essence the stream will use the call to keep the backpressure, but the resolving value
         * has no impact on the streamed data (except for possile mutation of the chunk itself)
         * @param func the async function
         */
        do(func: DoCallback): DataStream;

        /**
         * Allows own implementation of stream chaining.
         * 
         * The async callback is called on every chunk and should implement writes in it's own way. The
         * resolution will be awaited for flow control. The passed `into` argument is passed as the first
         * argument to every call.
         * 
         * It returns the DataStream passed as the second argument.
         * @param func the method that processes incoming chunks
         * @param into the DataStream derived class
         */
        into(func: IntoCallback, into: DataStream): DataStream;

        /**
         * Calls the passed method in place with the stream as first argument, returns result.
         * 
         * The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
         * streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
         * from the command line.
         * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
         * @param ...args any additional args top be passed to the module
         */
        use(func: Function | String, ...args?: any): DataStream;

        /**
         * Consumes all stream items doing nothing. Resolves when the stream is ended.
         */
        run(): Promise;

        /**
         * Stops merging transform callbacks at the current place in the command chain.
         */
        tap(): void;

        /**
         * Reads a chunk from the stream and resolves the promise when read.
         */
        whenRead(): Promise;

        /**
         * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
         * @param chunk a chunk to write
         * @param more more chunks to write
         */
        whenWrote(chunk: any, ...more?: any): Promise;

        /**
         * Resolves when stream ends - rejects on uncaught error
         */
        whenEnd(): Promise;

        /**
         * Returns a promise that resolves when the stream is drained
         */
        whenDrained(): Promise;

        /**
         * Returns a promise that resolves (!) when the stream is errors
         */
        whenError(): Promise;

        /**
         * Allows resetting stream options.
         * 
         * It's much easier to use this in chain than constructing new stream:
         * 
         * ```javascript
         * stream.map(myMapper).filter(myFilter).setOptions({maxParallel: 2})
         * ```
         * @param options
         */
        setOptions(options: StreamOptions): DataStream;

        /**
         * Duplicate the stream
         * 
         * Creates a duplicate stream instance and passes it to the callback.
         * @param func The duplicate stream will be passed as first argument.
         */
        tee(func: TeeCallback | Writable): DataStream;

        /**
         * Performs an operation on every chunk, without changing the stream
         * 
         * This is a shorthand for ```stream.on("data", func)``` but with flow control.
         * Warning: this resumes the stream!
         * @param func a callback called for each chunk.
         */
        each(func: MapCallback): DataStream;

        /**
         * Reads the stream while the function outcome is truthy.
         * 
         * Stops reading and emits end as soon as it ends.
         * @param func The condition check
         */
        while(func: FilterCallback): DataStream;

        /**
         * Reads the stream until the function outcome is truthy.
         * 
         * Works opposite of while.
         * @param func The condition check
         */
        until(func: FilterCallback): DataStream;

        /**
         * Provides a way to catch errors in chained streams.
         * 
         * The handler will be called as asynchronous
         * - if it resolves then the error will be muted.
         * - if it rejects then the error will be passed to the next handler
         * 
         * If no handlers will resolve the error, an `error` event will be emitted
         * @param callback Error handler (async function)
         */
        catch(callback: Function): DataStream;

        /**
         * Executes all error handlers and if none resolves, then emits an error.
         * 
         * The returned promise will always be resolved even if there are no successful handlers.
         * @param err The thrown error
         */
        raise(err: Error): Promise;

        /**
         * Override of node.js Readable pipe.
         * 
         * Except for calling overridden method it proxies errors to piped stream.
         * @param to Writable stream to write to
         * @param options
         */
        pipe(to: Writable, options: WritableOptions): Writable;

        /**
         * Creates a BufferStream
         * @param serializer A method that converts chunks to buffers
         */
        bufferify(serializer: MapCallback): BufferStream;

        /**
         * Creates a StringStream
         * @param serializer A method that converts chunks to strings
         */
        stringify(serializer: MapCallback): StringStream;

        /**
         * Create a DataStream from an Array
         * @param arr list of chunks
         */
        static fromArray(arr: any[]): DataStream;

        /**
         * Create a DataStream from an Iterator
         * 
         * Doesn't end the stream until it reaches end of the iterator.
         * @param iter the iterator object
         */
        static fromIterator(iter: Iterator): DataStream;

        /**
         * Aggregates the stream into a single Array
         * 
         * In fact it's just a shorthand for reducing the stream into an Array.
         * @param initial Optional array to begin with.
         * @returns
         */
        toArray(initial: any[]): any[];

        /**
         * Returns an async generator
         * 
         * Ready for https://github.com/tc39/proposal-async-iteration
         */
        toGenerator(): Iterable.<Promise.<*>>;

        /**
         * Pulls in any Readable stream, resolves when the pulled stream ends.
         * 
         * Does not preserve order, does not end this stream.
         * @param incoming
         * @returns resolved when incoming stream ends, rejects on incoming error
         */
        pull(incoming: Readable): Number;

        /**
         * Shifts the first n items from the stream and pushes out the remaining ones.
         * @param count The number of items to shift.
         * @param func Function that receives an array of shifted items
         */
        shift(count: Number, func: ShiftCallback): DataStream;

        /**
         * Allows previewing some of the streams data without removing them from the stream.
         * 
         * Important: Peek does not resume the flow.
         * @param count The number of items to view before
         * @param func Function called before other streams
         */
        peek(count: Number, func: ShiftCallback): DataStream;

        /**
         * Gets a slice of the stream to the callback function.
         * 
         * Returns a stream consisting of an array of items with `0` to `start`
         * omitted and `length` items after `start` included. Works similarily to
         * Array.prototype.slice.
         * 
         * Takes count from the moment it's called. Any previous items will not be
         * taken into account.
         * @param start omit this number of entries.
         * @param length get this number of entries to the resulting stream
         */
        slice(start?: Number, length?: Number): DataStream;

        /**
         * Transforms stream objects by assigning the properties from the returned
         * data along with data from original ones.
         * 
         * The original objects are unaltered.
         * @param func The function that returns new object properties or just the new properties
         */
        assign(func: MapCallback | Object): DataStream;

        /**
         * Called when the stream ends without passing any items
         * @param callback Function called when stream ends
         */
        empty(callback: Function): DataStream;

        /**
         * Pushes any data at call time (essentially at the beginning of the stream)
         * @param item list of items to unshift (you can pass more items)
         */
        unshift(item: any): DataStream;

        /**
         * Pushes any data at end of stream
         * @param item list of items to push at end
         */
        endWith(item: any): DataStream;

        /**
         * Accumulates data into the object.
         * 
         * Works very similarily to reduce, but result of previous operations have
         * no influence over the accumulator in the next one.
         * 
         * Method is parallel
         * @param func The accumulation function
         * @param into Accumulator object
         */
        accumulate(func: AccumulateCallback, into: any): Promise;

        /**
         * Consumes the stream by running each callback
         * @deprecated use {@link DataStream#each} instead
         * @param func the consument
         */
        consume(func: Function): Promise;

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
         * @param func The into object will be passed as the first
         *        argument, the data object from the stream as the second.
         * @param into Any object passed initally to the transform
         *        function
         */
        reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

        /**
         * Remaps the stream into a new stream.
         * 
         * This means that every item may emit as many other items as we like.
         * @param func A callback that is called on every chunk
         * @param Clazz Optional DataStream subclass to be constructed
         */
        remap(func: RemapCallback, Clazz: class): DataStream;

        /**
         * Takes any method that returns any iterable and flattens the result.
         * 
         * The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream will
         * consist of all the items of the returned iterables, one iterable after another.
         * @param func A callback that is called on every chunk
         * @param Clazz Optional DataStream subclass to be constructed
         */
        flatMap(func: FlatMapCallback, Clazz: class): DataStream;

        /**
         * A shorthand for streams of Arrays to flatten them.
         * 
         * More efficient equivalent of: .flatmap(i => i);
         */
        flatten(): DataStream;

        /**
         * Returns a new stream that will append the passed streams to the callee
         * @param streams Streams to be passed
         */
        concat(streams: any): DataStream;

        /**
         * Method will put the passed object between items. It can also be a function call.
         * @param item An object that should be interweaved between stream items
         */
        join(item: any | JoinCallback): DataStream;

        /**
         * Keep a buffer of n-chunks for use with {@see DataStream..rewind}
         * @param count Number of objects or -1 for all the stream
         */
        keep(count: number): DataStream;

        /**
         * Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
         * @param count Number of objects or -1 for all the buffer
         */
        rewind(count: number): DataStream;

        /**
         * Distributes processing into multiple subprocesses or threads if you like.
         * @todo Currently order is not kept.
         * @todo Example test breaks travis build
         * @param affinity Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
         * @param clusterFunc stream transforms similar to {@see DataStream#use method}
         * @param options Options
         * @see
         */
        distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

        /**
         * Seprates stream into a hash of streams. Does not create new streams!
         * @param streams the object hash of streams. Keys must be the outputs of the affinity function
         * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
         */
        separateInto(streams: Object<DataStream>, affinity: AffinityCallback): DataStream;

        /**
         * Separates execution to multiple streams using the hashes returned by the passed callback.
         * 
         * Calls the given callback for a hash, then makes sure all items with the same hash are processed within a single
         * stream. Thanks to that streams can be distributed to multiple threads.
         * @param affinity the callback function
         * @param createOptions options to use to create the separated streams
         */
        separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

        /**
         * Delegates work to a specified worker.
         * @param delegateFunc A function to be run in the subthread.
         * @param worker
         * @param plugins
         */
        delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any[]): DataStream;

        /**
         * Aggregates chunks in arrays given number of number of items long.
         * 
         * This can be used for microbatch processing.
         * @param count How many items to aggregate
         */
        batch(count: Number): DataStream;

        /**
         * Aggregates chunks to arrays not delaying output by more than the given number of ms.
         * @param ms Maximum ammount of milliseconds
         * @param count Maximum number of items in batch (otherwise no limit)
         */
        timeBatch(ms: Number, count: Number): DataStream;

        /**
         * Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
         * in bulk.
         * @todo needs more work, for now it's simply waiting some time, not checking the queues.
         * @param size maximum number of items to wait for
         * @param ms milliseconds to wait for more data
         */
        nagle(size?: number, ms?: number): DataStream;

        /**
         * Returns a WindowStream of the specified length
         * @param length
         * @returns a stream of array's
         */
        window(length: Number): WindowStream;

        /**
         * Transforms the stream to a streamed JSON array.
         * @param enclosure Any iterable object of two items (begining and end)
         */
        toJSONArray(enclosure?: Iterable): StringStream;

        /**
         * Transforms the stream to a streamed JSON object.
         * @param entryCallback async function returning an entry (array of [key, value])
         * @param enclosure Any iterable object of two items (begining and end)
         */
        toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

        /**
         * Returns a StringStream containing JSON per item with optional end line
         * @param endline whether to add endlines (boolean or string as delimiter)
         */
        JSONStringify(endline?: Boolean | String): StringStream;

        /**
         * Stringifies CSV to DataString using 'papaparse' module.
         * @param options options for the papaparse.unparse module.
         */
        CSVStringify(options: any): StringStream;

        /**
         * Injects a ```debugger``` statement when called.
         * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
         */
        debug(func: Function): DataStream;

    }

    /**
     * A stream of string objects for further transformation on top of DataStream.
     * 
     * Example:
     * 
     * ```javascript
     * StringStream.fromString()
     * ```
     */
    declare class StringStream extends DataStream {
        /**
         * A stream of string objects for further transformation on top of DataStream.
         * 
         * Example:
         * 
         * ```javascript
         * StringStream.fromString()
         * ```
         */
        constructor(encoding: String);

    }

    /**
     * Shifts given length of chars from the original stream
     * 
     * Works the same way as {@see DataStream.shift}, but in this case extracts
     * the given number of characters.
     * @param bytes The number of characters to shift.
     * @param func Function that receives a string of shifted chars.
     */
    declare function shift(bytes: Number, func: ShiftCallback): StringStream;

    /**
     * A handly split by line regex to quickly get a line-by-line stream
     */
    export var SPLIT_LINE: any;

    /**
     * Splits the string stream by the specified regexp or string
     * @param splitter What to split by
     */
    declare function split(splitter: RegExp | String): StringStream;

    /**
     * Finds matches in the string stream and streams the match results
     * @param matcher A function that will be called for every
     *        stream chunk.
     */
    declare function match(matcher: RegExp): StringStream;

    /**
     * Transforms the StringStream to BufferStream
     * 
     * Creates a buffer stream from the given string stream. Still it returns a
     * DataStream derivative and isn't the typical node.js stream so you can do
     * all your transforms when you like.
     */
    declare function toBufferStream(): BufferStream;

    /**
     * Parses every string to object
     * 
     * The method MUST parse EVERY string into a single object, so the string
     * stream here should already be split.
     * @param parser The transform function
     */
    declare function parse(parser: ParseCallback): DataStream;

    /**
     * Creates a StringStream and writes a specific string.
     * @param str the string to push the your stream
     * @param encoding optional encoding
     */
    export function fromString(str: String, encoding: String): StringStream;

    /**
     * Create StringStream from anything.
     * @see module:scramjet.from
     */
    export function from(): void;

    /**
     * A factilitation stream created for easy splitting or parsing buffers.
     * 
     * Useful for working on built-in Node.js streams from files, parsing binary formats etc.
     * 
     * A simple use case would be:
     * 
     * ```javascript
     *  fs.createReadStream('pixels.rgba')
     *      .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     *      .breakup(4)                     // split into 4 byte fragments
     *      .parse(buf => [
     *          buf.readInt8(0),            // the output is a stream of R,G,B and Alpha
     *          buf.readInt8(1),            // values from 0-255 in an array.
     *          buf.readInt8(2),
     *          buf.readInt8(3)
     *      ]);
     * ```
     */
    declare class BufferStream extends DataStream {
        /**
         * A factilitation stream created for easy splitting or parsing buffers.
         * 
         * Useful for working on built-in Node.js streams from files, parsing binary formats etc.
         * 
         * A simple use case would be:
         * 
         * ```javascript
         * fs.createReadStream('pixels.rgba')
         * .pipe(new BufferStream)         // pipe a buffer stream into scramjet
         * .breakup(4)                     // split into 4 byte fragments
         * .parse(buf => [
         * buf.readInt8(0),            // the output is a stream of R,G,B and Alpha
         * buf.readInt8(1),            // values from 0-255 in an array.
         * buf.readInt8(2),
         * buf.readInt8(3)
         * ]);
         * ```
         */
        constructor(opts: object);

    }

    /**
     * Shift given number of bytes from the original stream
     * 
     * Works the same way as {@see DataStream.shift}, but in this case extracts
     * the given number of bytes.
     * @param chars The number of bytes to shift
     * @param func Function that receives a string of shifted bytes
     */
    declare function shift(chars: Number, func: ShiftCallback): BufferStream;

    /**
     * Splits the buffer stream into buffer objects
     * @param splitter the buffer or string that the stream
     *        should be split by.
     */
    declare function split(splitter: String | Buffer): BufferStream;

    /**
     * Breaks up a stream apart into chunks of the specified length
     * @param number the desired chunk length
     */
    declare function breakup(number: Number): BufferStream;

    /**
     * Creates a string stream from the given buffer stream
     * 
     * Still it returns a DataStream derivative and isn't the typical node.js
     * stream so you can do all your transforms when you like.
     * @param encoding The encoding to be used to convert the buffers
     *        to streams.
     */
    declare function stringify(encoding: String): StringStream;

    /**
     * Parses every buffer to object
     * 
     * The method MUST parse EVERY buffer into a single object, so the buffer
     * stream here should already be split or broken up.
     * @param parser The transform function
     */
    declare function parse(parser: ParseCallback): DataStream;

    /**
     * Create BufferStream from anything.
     * @see module:scramjet.from
     */
    export function from(): void;

    /**
     * An object consisting of multiple streams than can be refined or muxed.
     */
    declare class MultiStream {
        /**
         * An object consisting of multiple streams than can be refined or muxed.
         */
        constructor(streams: any[], options: Object);

        /**
         * Array of all streams
         */
        streams: any[];

        /**
         * Returns the current stream length
         */
        length: any;

        /**
         * Returns new MultiStream with the streams returned by the transform.
         * 
         * Runs callback for every stream, returns a new MultiStream of mapped
         * streams and creates a new multistream consisting of streams returned
         * by the callback.
         * @param aFunc Mapper ran in Promise::then (so you can
         *        return a promise or an object)
         */
        map(aFunc: MapCallback): MultiStream;

        /**
         * Calls Array.prototype.find on the streams
         * @param args arguments for
         */
        find(...args: Arguments): DataStream;

        /**
         * Filters the stream list and returns a new MultiStream with only the
         * streams for which the callback returned true
         * @param func Filter ran in Promise::then (so you can
         *        return a promise or a boolean)
         */
        filter(func: TransformFunction): MultiStream;

        /**
         * Muxes the streams into a single one
         * @todo For now using comparator will not affect the mergesort.
         * @todo Sorting requires all the streams to be constantly flowing, any
         *       single one drain results in draining the muxed too even if there
         *       were possible data on other streams.
         * @param cmp Should return -1 0 or 1 depending on the
         *        desired order. If passed the chunks will
         *        be added in a sorted order.
         */
        mux(cmp: ComparatorFunction): DataStream;

        /**
         * Adds a stream to the MultiStream
         * 
         * If the stream was muxed, filtered or mapped, this stream will undergo the
         * same transorms and conditions as if it was added in constructor.
         * @param stream [description]
         */
        add(stream: stream.Readable): void;

        /**
         * Removes a stream from the MultiStream
         * 
         * If the stream was muxed, filtered or mapped, it will be removed from same
         * streams.
         * @param stream [description]
         */
        remove(stream: stream.Readable): void;

        /**
         * Re-routes streams to a new MultiStream of specified size
         * @todo NYT: not yet tested
         * @todo NYD: not yet documented
         * @param policy [description]
         * @param count [description]
         */
        route(policy?: Function, count?: number): MultiStream;

        /**
         * Map stream synchronously
         * @param transform mapping function ran on every stream (SYNCHRONOUS!)
         */
        smap(transform: Function): MultiStream;

        /**
         * Distributes processing to multiple forked subprocesses.
         * @param clusterFunc a cluster callback with all operations working similarily to DataStream::use
         * @param options
         */
        cluster(clusterFunc: Function | String, options: DistributeOptions): MultiStream;

    }

    /**
     * Splits the string stream by the specified regexp or string
     * @todo implement splitting by buffer or string
     * @param eol End of line string
     */
    declare function lines(eol?: String): StringStream;

    /**
     * Parses each entry as JSON.
     * Ignores empty lines
     * @param perLine instructs to split per line
     */
    declare function JSONParse(perLine: Boolean): DataStream;

    /**
     * Parses CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.parse method.
     */
    declare function CSVParse(options: any): DataStream;

    /**
     * Appends given argument to all the items.
     * @param arg the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     */
    declare function append(arg: Function | String): StringStream;

    /**
     * Prepends given argument to all the items.
     * @param arg the argument to prepend. If function passed then it will be called and resolved
     *        and the resolution will be prepended.
     */
    declare function prepend(arg: Function | String): StringStream;

    /**
     * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
     * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
     * `reduce` etc.
     */
    declare class NumberStream extends DataStream {
        /**
         * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
         * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
         * `reduce` etc.
         */
        constructor(options: NumberStreamOptions);

    }

    /**
     * Calculates the sum of all items in the stream.
     */
    declare function sum(): Number;

    /**
     * Calculates the sum of all items in the stream.
     */
    declare function avg(): Number;

    /**
     * A stream for moving window calculation with some simple methods.
     * 
     * In essence it's a stream of Array's containing a list of items - a window.
     * It's best used when created by the `DataStream..window`` method.
     */
    declare class WindowStream extends DataStream {
        /**
         * A stream for moving window calculation with some simple methods.
         * 
         * In essence it's a stream of Array's containing a list of items - a window.
         * It's best used when created by the `DataStream..window`` method.
         */
        constructor();

    }

    /**
     * Calculates moving sum of items, the output stream will contain the moving sum.
     * @param valueOf value of method for array items
     */
    declare function sum(valueOf?: Function): Promise<Number>;

    /**
     * Calculates the moving average of all items in the stream.
     * @param valueOf value of method for array items
     */
    declare function avg(valueOf?: Function): Promise<Number>;

}

/**
 * 
 * @param chunk the chunk to be mapped
 * @returns the mapped object
 */
declare type MapCallback = (chunk: any)=>Promise | any;

/**
 * 
 * @param chunk the chunk to be filtered or not
 * @returns information if the object should remain in
 *          the filtered stream.
 */
declare type FilterCallback = (chunk: any)=>Promise | Boolean;

/**
 * 
 * @param acc the accumulator - the object initially passed or returned
 *        by the previous reduce operation
 * @param chunk the stream chunk.
 */
declare type ReduceCallback = (acc: any, chunk: Object)=>Promise | any;

/**
 * 
 * @param chunk source stream chunk
 */
declare type DoCallback = (chunk: Object)=>void;

/**
 * 
 * @param into stream passed to the into method
 * @param chunk source stream chunk
 */
declare type IntoCallback = (into: any, chunk: Object)=>any;

/**
 * 
 * @param teed The teed stream
 */
declare type TeeCallback = (teed: DataStream)=>void;

/**
 * Standard options for scramjet streams.
 */
declare interface StreamOptions {
    /**
     * the number of transforms done in parallel
     */
    maxParallel: Number;
    /**
     * a referring stream to point to (if possible the transforms will be pushed to it
     *                                 instead of creating a new stream)
     */
    referrer: DataStream;
}

/**
 * 
 * @param shifted Popped chars
 */
declare type ShiftCallback = (shifted: String)=>void;

/**
 * 
 * @param chunk the transformed chunk
 */
declare type ParseCallback = (chunk: String)=>Promise;

/**
 * Alias for {@link StringStream#parse}
 */
declare function toDataStream(): void;

/**
 * Alias for {@link BufferStream#stringify}
 */
declare function toStringStream(): void;

/**
 * 
 * @param acc Accumulator passed to accumulate function
 * @param chunk the stream chunk
 */
declare type AccumulateCallback = (acc: any, chunk: any)=>Promise | any;

/**
 * 
 * @param chunk the stream chunk
 */
declare type ConsumeCallback = (chunk: any)=>Promise | any;

/**
 * 
 * @param emit a method to emit objects in the remapped stream
 * @param chunk the chunk from the original stream
 * @returns promise to be resolved when chunk has been processed
 */
declare type RemapCallback = (emit: Function, chunk: any)=>Promise | any;

/**
 * 
 * @param chunk the chunk from the original stream
 * @returns promise to be resolved when chunk has been processed
 */
declare type FlatMapCallback = (chunk: any)=>Promise<Iterable> | Iterable;

/**
 * 
 * @param prev the chunk before
 * @param next the chunk after
 * @returns promise that is resolved with the joining item
 */
declare type JoinCallback = (prev: any, next: any)=>Promise<any> | any;

/**
 * NumberStream options
 */
declare interface NumberStreamOptions {
    /**
     * value of the data item function.
     */
    valueOf?: Function;
}

/**
 * Distribute options
 */
declare interface DistributeOptions {
    /**
     * a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself)
     */
    plugins: any[];
    /**
     * the class to deserialize the stream to.
     */
    StreamClass: String;
    /**
     * maximum threads to use - defauls to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     */
    threads: Number;
}

