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
    constructor(opts: StreamOptions);

    /**
     * Returns a DataStream from any node.js Readable Stream
     * @param stream
     * @param options
     */
    static from(stream: ReadableStream, options: StreamOptions): DataStream;

    /**
     * @param func The function that creates the new object
     * @param Clazz (optional) The class to be mapped to.
     */
    map(func: MapCallback, Clazz: Class): DataStream;

    /**
     * @param  {FilterCallback} func The function that filters the object
     */
    filter(func: FilterCallback): DataStream;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: Object): void;

    /**
     * @param  {IntoCallback} func the method that processes incoming chunks
     * @param  {DataStream} into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): DataStream;

    /**
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
     * @param [...args] any additional args top be passed to the module
     */
    use(func: Function | String, ...args?: any): DataStream;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     */
    run(): void;

    /**
     * Stops merging transform callbacks at the current place in the command chain.
     */
    tap(): void;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): void;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param dat
     */
    whenWrote(...dat: any): void;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): void;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): void;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): void;

    /**
     * @param options
     */
    setOptions(options: StreamOptions): DataStream;

    /**
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback): DataStream;

    /**
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func: MapCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    while(func: FilterCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    until(func: FilterCallback): DataStream;

    /**
     * @param callback Error handler (async function)
     */
    catch(callback: Function): DataStream;

    /**
     * @param  {Error} err The thrown error
     */
    raise(err: Error): void;

    /**
     * @param  {Writable} to  Writable stream to write to
     * @param  {WritableOptions} options
     * @returns  the `to` stream
     */
    pipe(to: Writable, options: WritableOptions): Writable;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @returns  the resulting stream
     */
    stringify(serializer: MapCallback): StringStream;

    /**
     * Create a DataStream from an Array
     * @param  {Array} arr list of chunks
     */
    static fromArray(arr: any): DataStream;

    /**
     * @param  {Iterator} iter the iterator object
     */
    static fromIterator(iter: Iterator): DataStream;

    /**
     * @param  {Array} initial Optional array to begin with.
     */
    toArray(initial: any): any;

    /**
     * @returns Returns an iterator that returns a promise for each item.
     */
    toGenerator(): Iterable.<Promise.<*>>;

    /**
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
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     */
    peek(count: Number, func: ShiftCallback): DataStream;

    /**
     * @param [start=0] omit this number of entries.
     * @param [length=Infinity] get this number of entries to the resulting stream
     */
    slice(start?: Number, length?: Number): DataStream;

    /**
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | Object): DataStream;

    /**
     * Called when the stream ends without passing any items
     * @param  {Function} callback Function called when stream ends
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @returns  resolved with the "into" object on stream end.
     */
    accumulate(func: AccumulateCallback, into: any): Promise;


    /**
     * Consumes the stream by running each callback
     * @param  {Function}  func the consument
     */
    consume(func: Function): void;


    /**
     * @param  {ReduceCallback} func The into object will be passed as the first
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * @returns whatever was passed as into
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;


    /**
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    remap(func: RemapCallback, Clazz: class): DataStream;

    /**
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    flatMap(func: FlatMapCallback, Clazz: class): DataStream;


    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param  {*} streams Streams to be passed
     */
    concat(streams: any): DataStream;

    /**
     * Method will put the passed object between items. It can also be a function call.
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
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
     * @param [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: Object.<DataStream>, affinity: AffinityCallback): DataStream;

    /**
     * @param affinity the callback function
     * @param createOptions options to use to create the separated streams
     * @returns separated stream
     */
    separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any): DataStream;

    /**
     * @param  {Number} count How many items to aggregate
     */
    batch(count: Number): DataStream;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: Number, count: Number): DataStream;

    /**
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
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
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     */
    toJSONArray(enclosure?: Iterable): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @returns  output stream
     */
    JSONStringify(endline?: Boolean | String): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     * @returns  stream of parsed items
     */
    CSVStringify(options: any): StringStream;

    /**
     * Injects a ```debugger``` statement when called.
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @returns  self
     */
    debug(func: Function): DataStream;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    toBufferStream(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @returns  the resulting stream
     */
    toStringStream(serializer: MapCallback): StringStream;

}

/**
 * @param chunk the chunk to be mapped
 * @returns  the mapped object
 */
declare type MapCallback = (chunk: any)=>Promise | any;

/**
 * @param chunk the chunk to be filtered or not
 * @returns  information if the object should remain in
 */
declare type FilterCallback = (chunk: any)=>Promise | Boolean;

/**
 * @param acc the accumulator - the object initially passed or returned
 * @param chunk the stream chunk.
 * @returns  accumulator for the next pass
 */
declare type ReduceCallback = (acc: any, chunk: Object)=>Promise | any;

/**
 * @param into stream passed to the into method
 * @param chunk source stream chunk
 * @returns  resolution for the old stream (for flow control only)
 */
declare type IntoCallback = (into: any, chunk: Object)=>any;

/**
 * @param teed The teed stream
 */
declare type TeeCallback = (teed: DataStream)=>void;

/**
 * Standard options for scramjet streams.
 * instead of creating a new stream)
 */
declare interface StreamOptions {
    /**
     * the number of transforms done in parallel
     */
    maxParallel: Number;
    referrer: DataStream;
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
declare class StringStream {
    constructor(encoding: String);

    /**
     * @param bytes The number of characters to shift.
     * @param func Function that receives a string of shifted chars.
     */
    shift(bytes: Number, func: ShiftCallback): StringStream;

    /**
     * A handly split by line regex to quickly get a line-by-line stream
     */
    static SPLIT_LINE: any;

    /**
     * Splits the string stream by the specified regexp or string
     * @param  {RegExp|String} splitter What to split by
     */
    split(splitter: RegExp | String): StringStream;

    /**
     * Finds matches in the string stream and streams the match results
     * @param  {RegExp} matcher A function that will be called for every
     */
    match(matcher: RegExp): StringStream;

    /**
     * @returns  The converted stream.
     */
    toBufferStream(): BufferStream;

    /**
     * @param  {ParseCallback} parser The transform function
     * @returns  The parsed objects stream.
     */
    parse(parser: ParseCallback): DataStream;

    /**
     * Creates a StringStream and writes a specific string.
     * @param  {String} str      the string to push the your stream
     * @param  {String} encoding optional encoding
     * @returns          new StringStream.
     */
    static fromString(str: String, encoding: String): StringStream;

    /**
     * Splits the string stream by the specified regexp or string
     * @param  {String} [eol=os.EOL] End of line string
     */
    lines(eol?: String): StringStream;

    /**
     * @param perLine instructs to split per line
     * @returns  stream of parsed items
     */
    JSONParse(perLine: Boolean): DataStream;

    /**
     * Parses CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.parse method.
     * @returns  stream of parsed items
     */
    CSVParse(options: any): DataStream;

    /**
     * Appends given argument to all the items.
     * @param arg the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     */
    append(arg: Function | String): StringStream;

    /**
     * Prepends given argument to all the items.
     * @param arg the argument to prepend. If function passed then it will be called and resolved
     */
    prepend(arg: Function | String): StringStream;

    /**
     * @param func The function that creates the new object
     * @param Clazz (optional) The class to be mapped to.
     */
    map(func: MapCallback, Clazz: Class): DataStream;

    /**
     * @param  {FilterCallback} func The function that filters the object
     */
    filter(func: FilterCallback): DataStream;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: Object): void;

    /**
     * @param  {IntoCallback} func the method that processes incoming chunks
     * @param  {DataStream} into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): DataStream;

    /**
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
     * @param [...args] any additional args top be passed to the module
     */
    use(func: Function | String, ...args?: any): DataStream;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     */
    run(): void;

    /**
     * Stops merging transform callbacks at the current place in the command chain.
     */
    tap(): void;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): void;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param dat
     */
    whenWrote(...dat: any): void;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): void;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): void;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): void;

    /**
     * @param options
     */
    setOptions(options: StreamOptions): DataStream;

    /**
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback): DataStream;

    /**
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func: MapCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    while(func: FilterCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    until(func: FilterCallback): DataStream;

    /**
     * @param callback Error handler (async function)
     */
    catch(callback: Function): DataStream;

    /**
     * @param  {Error} err The thrown error
     */
    raise(err: Error): void;

    /**
     * @param  {Writable} to  Writable stream to write to
     * @param  {WritableOptions} options
     * @returns  the `to` stream
     */
    pipe(to: Writable, options: WritableOptions): Writable;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @returns  the resulting stream
     */
    stringify(serializer: MapCallback): StringStream;

    /**
     * @param  {Array} initial Optional array to begin with.
     */
    toArray(initial: any): any;

    /**
     * @returns Returns an iterator that returns a promise for each item.
     */
    toGenerator(): Iterable.<Promise.<*>>;

    /**
     * @param incoming
     * @returns resolved when incoming stream ends, rejects on incoming error
     */
    pull(incoming: Readable): Number;

    /**
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     */
    peek(count: Number, func: ShiftCallback): DataStream;

    /**
     * @param [start=0] omit this number of entries.
     * @param [length=Infinity] get this number of entries to the resulting stream
     */
    slice(start?: Number, length?: Number): DataStream;

    /**
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | Object): DataStream;

    /**
     * Called when the stream ends without passing any items
     * @param  {Function} callback Function called when stream ends
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @returns  resolved with the "into" object on stream end.
     */
    accumulate(func: AccumulateCallback, into: any): Promise;

    /**
     * Consumes the stream by running each callback
     * @param  {Function}  func the consument
     */
    consume(func: Function): void;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the first
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * @returns whatever was passed as into
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

    /**
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    remap(func: RemapCallback, Clazz: class): DataStream;

    /**
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    flatMap(func: FlatMapCallback, Clazz: class): DataStream;

    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param  {*} streams Streams to be passed
     */
    concat(streams: any): DataStream;

    /**
     * Method will put the passed object between items. It can also be a function call.
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
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
     * @param [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: Object.<DataStream>, affinity: AffinityCallback): DataStream;

    /**
     * @param affinity the callback function
     * @param createOptions options to use to create the separated streams
     * @returns separated stream
     */
    separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any): DataStream;

    /**
     * @param  {Number} count How many items to aggregate
     */
    batch(count: Number): DataStream;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: Number, count: Number): DataStream;

    /**
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
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
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     */
    toJSONArray(enclosure?: Iterable): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @returns  output stream
     */
    JSONStringify(endline?: Boolean | String): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     * @returns  stream of parsed items
     */
    CSVStringify(options: any): StringStream;

    /**
     * Injects a ```debugger``` statement when called.
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @returns  self
     */
    debug(func: Function): DataStream;

    /**
     * @param bytes The number of characters to shift.
     * @param func Function that receives a string of shifted chars.
     */
    pop(bytes: Number, func: ShiftCallback): StringStream;

}

/**
 * @param shifted Pooped chars
 */
declare type ShiftCallback = (shifted: String)=>void;

/**
 * @param chunk the transformed chunk
 * @returns  the promise should be resolved with the parsed object
 */
declare type ParseCallback = (chunk: String)=>Promise;

/**
 * Alias for {@link StringStream#parse}
 */
declare function toDataStream(): void;

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
declare class BufferStream {
    constructor(opts: object);

    /**
     * @param chars The number of bytes to shift
     * @param func Function that receives a string of shifted bytes
     * @returns substream
     */
    shift(chars: Number, func: ShiftCallback): BufferStream;

    /**
     * Splits the buffer stream into buffer objects
     * @param  {String|Buffer} splitter the buffer or string that the stream
     * @returns  the re-split buffer stream.
     */
    split(splitter: String | Buffer): BufferStream;

    /**
     * Breaks up a stream apart into chunks of the specified length
     * @param  {Number} number the desired chunk length
     * @returns  the resulting buffer stream.
     */
    breakup(number: Number): BufferStream;

    /**
     * @param  {String} encoding The encoding to be used to convert the buffers
     * @returns  The converted stream.
     */
    stringify(encoding: String): StringStream;

    /**
     * @param  {ParseCallback} parser The transform function
     * @returns  The parsed objects stream.
     */
    parse(parser: ParseCallback): DataStream;

    /**
     * @param func The function that creates the new object
     * @param Clazz (optional) The class to be mapped to.
     */
    map(func: MapCallback, Clazz: Class): DataStream;

    /**
     * @param  {FilterCallback} func The function that filters the object
     */
    filter(func: FilterCallback): DataStream;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: Object): void;

    /**
     * @param  {IntoCallback} func the method that processes incoming chunks
     * @param  {DataStream} into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): DataStream;

    /**
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
     * @param [...args] any additional args top be passed to the module
     */
    use(func: Function | String, ...args?: any): DataStream;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     */
    run(): void;

    /**
     * Stops merging transform callbacks at the current place in the command chain.
     */
    tap(): void;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): void;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param dat
     */
    whenWrote(...dat: any): void;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): void;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): void;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): void;

    /**
     * @param options
     */
    setOptions(options: StreamOptions): DataStream;

    /**
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback): DataStream;

    /**
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func: MapCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    while(func: FilterCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    until(func: FilterCallback): DataStream;

    /**
     * @param callback Error handler (async function)
     */
    catch(callback: Function): DataStream;

    /**
     * @param  {Error} err The thrown error
     */
    raise(err: Error): void;

    /**
     * @param  {Writable} to  Writable stream to write to
     * @param  {WritableOptions} options
     * @returns  the `to` stream
     */
    pipe(to: Writable, options: WritableOptions): Writable;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * @param  {Array} initial Optional array to begin with.
     */
    toArray(initial: any): any;

    /**
     * @returns Returns an iterator that returns a promise for each item.
     */
    toGenerator(): Iterable.<Promise.<*>>;

    /**
     * @param incoming
     * @returns resolved when incoming stream ends, rejects on incoming error
     */
    pull(incoming: Readable): Number;

    /**
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     */
    peek(count: Number, func: ShiftCallback): DataStream;

    /**
     * @param [start=0] omit this number of entries.
     * @param [length=Infinity] get this number of entries to the resulting stream
     */
    slice(start?: Number, length?: Number): DataStream;

    /**
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | Object): DataStream;

    /**
     * Called when the stream ends without passing any items
     * @param  {Function} callback Function called when stream ends
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @returns  resolved with the "into" object on stream end.
     */
    accumulate(func: AccumulateCallback, into: any): Promise;

    /**
     * Consumes the stream by running each callback
     * @param  {Function}  func the consument
     */
    consume(func: Function): void;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the first
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * @returns whatever was passed as into
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

    /**
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    remap(func: RemapCallback, Clazz: class): DataStream;

    /**
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    flatMap(func: FlatMapCallback, Clazz: class): DataStream;

    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param  {*} streams Streams to be passed
     */
    concat(streams: any): DataStream;

    /**
     * Method will put the passed object between items. It can also be a function call.
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
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
     * @param [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: Object.<DataStream>, affinity: AffinityCallback): DataStream;

    /**
     * @param affinity the callback function
     * @param createOptions options to use to create the separated streams
     * @returns separated stream
     */
    separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any): DataStream;

    /**
     * @param  {Number} count How many items to aggregate
     */
    batch(count: Number): DataStream;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: Number, count: Number): DataStream;

    /**
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
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
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     */
    toJSONArray(enclosure?: Iterable): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @returns  output stream
     */
    JSONStringify(endline?: Boolean | String): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     * @returns  stream of parsed items
     */
    CSVStringify(options: any): StringStream;

    /**
     * Injects a ```debugger``` statement when called.
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @returns  self
     */
    debug(func: Function): DataStream;

    /**
     * @param  {String} encoding The encoding to be used to convert the buffers
     * @returns  The converted stream.
     */
    toStringStream(encoding: String): StringStream;

    /**
     * @param chars The number of bytes to shift
     * @param func Function that receives a string of shifted bytes
     * @returns substream
     */
    pop(chars: Number, func: ShiftCallback): BufferStream;

    /**
     * @param  {ParseCallback} parser The transform function
     * @returns  The parsed objects stream.
     */
    toDataStream(parser: ParseCallback): DataStream;

}

/**
 * Alias for {@link BufferStream#stringify}
 */
declare function toStringStream(): void;

/**
 * An object consisting of multiple streams than can be refined or muxed.
 */
declare class MultiStream {
    constructor(streams: stream.Readable[], options: Object);

    /**
     * Array of all streams
     */
    streams: any;

    /**
     * Returns the current stream length
     */
    length: any;

    /**
     * @param  {MapCallback} aFunc Mapper ran in Promise::then (so you can
     * @returns  the mapped instance
     */
    map(aFunc: MapCallback): MultiStream;

    /**
     * Calls Array.prototype.find on the streams
     * @param  {Arguments} args arguments for
     * @returns  found DataStream
     */
    find(...args: Arguments): DataStream;

    /**
     * @param  {TransformFunction} func Filter ran in Promise::then (so you can
     * @returns  the filtered instance
     */
    filter(func: TransformFunction): MultiStream;

    /**
     * Muxes the streams into a single one
     * single one drain results in draining the muxed too even if there
     * were possible data on other streams.
     * @param  {ComparatorFunction} cmp Should return -1 0 or 1 depending on the
     * @returns  The resulting DataStream
     */
    mux(cmp: ComparatorFunction): DataStream;

    /**
     * @param stream [description]
     */
    add(stream: stream.Readable): void;

    /**
     * @param stream [description]
     */
    remove(stream: stream.Readable): void;

    /**
     * Re-routes streams to a new MultiStream of specified size
     * @param  {Function} [policy=Affinity.RoundRobin] [description]
     * @param  {number} [count=os.cpus().length]       [description]
     * @returns                             [description]
     */
    route(policy?: Function, count?: number): MultiStream;

    /**
     * Map stream synchronously
     * @param  {Function} transform mapping function ran on every stream (SYNCHRONOUS!)
     */
    smap(transform: Function): MultiStream;

    /**
     * Distributes processing to multiple forked subprocesses.
     * @param clusterFunc a cluster callback with all operations working similarily to DataStream::use
     * @param options
     */
    cluster(clusterFunc: ClusterCallback[], options: DistributeOptions): MultiStream;

}

declare module 'scramjet' {
    /**
     * Creates a DataStream that's piped from the passed readable.
     * @param str and node.js readable stream (`objectMode: true` is advised)
     */
    export function from(str: Readable): DataStream;

    /**
     * Creates a DataStream from an Array
     * @param args
     */
    export function fromArray(args: any): DataStream;

    /**
     * Exposes error classes (undocumented)
     */
    export var errors: ScramjetErrors;

    /**
     * Provides a lazy-load accessor to BufferStream
     */
    export var BufferStream: BufferStream;

    /**
     * Provides a lazy-load accessor to DataStream
     */
    export var DataStream: DataStream;

    /**
     * Provides a lazy-load accessor to MultiStream
     */
    export var MultiStream: MultiStream;

    /**
     * Provides a lazy-load accessor to StringStream
     */
    export var StringStream: StringStream;

    /**
     * Provides a lazy-load accessor to PromiseTransformStream - the base class of scramjet streams
     */
    export var PromiseTransformStream: PromiseTransformStream;

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
     * @param  {ScramjetPlugin} mixin the plugin object
     */
    export function plugin(mixin: ScramjetPlugin): void;

    /**
     * Gets an API version (this may be important for future use)
     * @param version The required version (currently only: 1)
     */
    export function API(version: Number): void;

    /**
     * A Stream Worker class
     */
    export var StreamWorker: StreamWorker;

    /**
     * A Number stream class
     */
    export var NumberStream: NumberStream;

    /**
     * Window stream class
     */
    export var WindowStream: WindowStream;

}

/**
 * Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
 * provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
 * `reduce` etc.
 */
declare class NumberStream {
    constructor(options: NumberStreamOptions);

    /**
     * Calculates the sum of all items in the stream.
     */
    sum(): Number;

    /**
     * Calculates the sum of all items in the stream.
     */
    avg(): Number;

    /**
     * @param func The function that creates the new object
     * @param Clazz (optional) The class to be mapped to.
     */
    map(func: MapCallback, Clazz: Class): DataStream;

    /**
     * @param  {FilterCallback} func The function that filters the object
     */
    filter(func: FilterCallback): DataStream;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: Object): void;

    /**
     * @param  {IntoCallback} func the method that processes incoming chunks
     * @param  {DataStream} into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): DataStream;

    /**
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
     * @param [...args] any additional args top be passed to the module
     */
    use(func: Function | String, ...args?: any): DataStream;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     */
    run(): void;

    /**
     * Stops merging transform callbacks at the current place in the command chain.
     */
    tap(): void;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): void;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param dat
     */
    whenWrote(...dat: any): void;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): void;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): void;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): void;

    /**
     * @param options
     */
    setOptions(options: StreamOptions): DataStream;

    /**
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback): DataStream;

    /**
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func: MapCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    while(func: FilterCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    until(func: FilterCallback): DataStream;

    /**
     * @param callback Error handler (async function)
     */
    catch(callback: Function): DataStream;

    /**
     * @param  {Error} err The thrown error
     */
    raise(err: Error): void;

    /**
     * @param  {Writable} to  Writable stream to write to
     * @param  {WritableOptions} options
     * @returns  the `to` stream
     */
    pipe(to: Writable, options: WritableOptions): Writable;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @returns  the resulting stream
     */
    stringify(serializer: MapCallback): StringStream;

    /**
     * @param  {Array} initial Optional array to begin with.
     */
    toArray(initial: any): any;

    /**
     * @returns Returns an iterator that returns a promise for each item.
     */
    toGenerator(): Iterable.<Promise.<*>>;

    /**
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
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     */
    peek(count: Number, func: ShiftCallback): DataStream;

    /**
     * @param [start=0] omit this number of entries.
     * @param [length=Infinity] get this number of entries to the resulting stream
     */
    slice(start?: Number, length?: Number): DataStream;

    /**
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | Object): DataStream;

    /**
     * Called when the stream ends without passing any items
     * @param  {Function} callback Function called when stream ends
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @returns  resolved with the "into" object on stream end.
     */
    accumulate(func: AccumulateCallback, into: any): Promise;

    /**
     * Consumes the stream by running each callback
     * @param  {Function}  func the consument
     */
    consume(func: Function): void;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the first
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * @returns whatever was passed as into
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

    /**
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    remap(func: RemapCallback, Clazz: class): DataStream;

    /**
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    flatMap(func: FlatMapCallback, Clazz: class): DataStream;

    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param  {*} streams Streams to be passed
     */
    concat(streams: any): DataStream;

    /**
     * Method will put the passed object between items. It can also be a function call.
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
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
     * @param [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: Object.<DataStream>, affinity: AffinityCallback): DataStream;

    /**
     * @param affinity the callback function
     * @param createOptions options to use to create the separated streams
     * @returns separated stream
     */
    separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any): DataStream;

    /**
     * @param  {Number} count How many items to aggregate
     */
    batch(count: Number): DataStream;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: Number, count: Number): DataStream;

    /**
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
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
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     */
    toJSONArray(enclosure?: Iterable): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @returns  output stream
     */
    JSONStringify(endline?: Boolean | String): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     * @returns  stream of parsed items
     */
    CSVStringify(options: any): StringStream;

    /**
     * Injects a ```debugger``` statement when called.
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @returns  self
     */
    debug(func: Function): DataStream;

}

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
 * A stream for moving window calculation with some simple methods.
 * 
 * In essence it's a stream of Array's containing a list of items - a window.
 * It's best used when created by the `DataStream..window`` method.
 */
declare class WindowStream {
    constructor();

    /**
     * Calculates moving sum of items, the output stream will contain the moving sum.
     * @param [valueOf] value of method for array items
     */
    sum(valueOf?: Function): Promise.<Number>;

    /**
     * Calculates the moving average of all items in the stream.
     * @param [valueOf] value of method for array items
     */
    avg(valueOf?: Function): Promise.<Number>;

    /**
     * @param func The function that creates the new object
     * @param Clazz (optional) The class to be mapped to.
     */
    map(func: MapCallback, Clazz: Class): DataStream;

    /**
     * @param  {FilterCallback} func The function that filters the object
     */
    filter(func: FilterCallback): DataStream;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param  {Object} into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: Object): void;

    /**
     * @param  {IntoCallback} func the method that processes incoming chunks
     * @param  {DataStream} into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): DataStream;

    /**
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module.
     * @param [...args] any additional args top be passed to the module
     */
    use(func: Function | String, ...args?: any): DataStream;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     */
    run(): void;

    /**
     * Stops merging transform callbacks at the current place in the command chain.
     */
    tap(): void;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): void;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param dat
     */
    whenWrote(...dat: any): void;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): void;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): void;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): void;

    /**
     * @param options
     */
    setOptions(options: StreamOptions): DataStream;

    /**
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback): DataStream;

    /**
     * @param  {MapCallback} func a callback called for each chunk.
     */
    each(func: MapCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    while(func: FilterCallback): DataStream;

    /**
     * @param  {FilterCallback} func The condition check
     */
    until(func: FilterCallback): DataStream;

    /**
     * @param callback Error handler (async function)
     */
    catch(callback: Function): DataStream;

    /**
     * @param  {Error} err The thrown error
     */
    raise(err: Error): void;

    /**
     * @param  {Writable} to  Writable stream to write to
     * @param  {WritableOptions} options
     * @returns  the `to` stream
     */
    pipe(to: Writable, options: WritableOptions): Writable;

    /**
     * Creates a BufferStream
     * @param  {MapCallback} serializer A method that converts chunks to buffers
     * @returns  the resulting stream
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream
     * @param  {MapCallback} serializer A method that converts chunks to strings
     * @returns  the resulting stream
     */
    stringify(serializer: MapCallback): StringStream;

    /**
     * @param  {Array} initial Optional array to begin with.
     */
    toArray(initial: any): any;

    /**
     * @returns Returns an iterator that returns a promise for each item.
     */
    toGenerator(): Iterable.<Promise.<*>>;

    /**
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
     * @param  {Number} count The number of items to view before
     * @param  {ShiftCallback} func Function called before other streams
     */
    peek(count: Number, func: ShiftCallback): DataStream;

    /**
     * @param [start=0] omit this number of entries.
     * @param [length=Infinity] get this number of entries to the resulting stream
     */
    slice(start?: Number, length?: Number): DataStream;

    /**
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | Object): DataStream;

    /**
     * Called when the stream ends without passing any items
     * @param  {Function} callback Function called when stream ends
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
     * @param  {AccumulateCallback} func The accumulation function
     * @param  {*} into Accumulator object
     * @returns  resolved with the "into" object on stream end.
     */
    accumulate(func: AccumulateCallback, into: any): Promise;

    /**
     * Consumes the stream by running each callback
     * @param  {Function}  func the consument
     */
    consume(func: Function): void;

    /**
     * @param  {ReduceCallback} func The into object will be passed as the first
     * @param  {*|EventEmitter} into Any object passed initally to the transform
     * @returns whatever was passed as into
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

    /**
     * @param  {RemapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    remap(func: RemapCallback, Clazz: class): DataStream;

    /**
     * @param  {FlatMapCallback} func A callback that is called on every chunk
     * @param  {class} Clazz Optional DataStream subclass to be constructed
     * @returns  a new DataStream of the given class with new chunks
     */
    flatMap(func: FlatMapCallback, Clazz: class): DataStream;

    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param  {*} streams Streams to be passed
     */
    concat(streams: any): DataStream;

    /**
     * Method will put the passed object between items. It can also be a function call.
     * @param  {*|JoinCallback} item An object that should be interweaved between stream items
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
     * @param [affinity] Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Number, clusterFunc: ClusterCallback, options: Object): DataStream;

    /**
     * Seprates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the callback function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: Object.<DataStream>, affinity: AffinityCallback): DataStream;

    /**
     * @param affinity the callback function
     * @param createOptions options to use to create the separated streams
     * @returns separated stream
     */
    separate(affinity: AffinityCallback, createOptions: Object): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param  {DelegateCallback} delegateFunc A function to be run in the subthread.
     * @param  {WorkerStream}     worker
     * @param  {Array}            [plugins=[]]
     */
    delegate(delegateFunc: DelegateCallback, worker: WorkerStream, plugins?: any): DataStream;

    /**
     * @param  {Number} count How many items to aggregate
     */
    batch(count: Number): DataStream;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param  {Number} ms    Maximum ammount of milliseconds
     * @param  {Number} count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: Number, count: Number): DataStream;

    /**
     * @param  {number} [size=32] maximum number of items to wait for
     * @param  {number} [ms=10]   milliseconds to wait for more data
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
     * @param  {Iterable} [enclosure='[]'] Any iterable object of two items (begining and end)
     */
    toJSONArray(enclosure?: Iterable): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param  {MapCallback} [entryCallback] async function returning an entry (array of [key, value])
     * @param  {Iterable} [enclosure='{}'] Any iterable object of two items (begining and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param  {Boolean|String} [endline=os.EOL] whether to add endlines (boolean or string as delimiter)
     * @returns  output stream
     */
    JSONStringify(endline?: Boolean | String): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     * @returns  stream of parsed items
     */
    CSVStringify(options: any): StringStream;

    /**
     * Injects a ```debugger``` statement when called.
     * @param  {Function} func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     * @returns  self
     */
    debug(func: Function): DataStream;

}

