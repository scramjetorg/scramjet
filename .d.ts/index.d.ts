import {Readable, Writable, Transform} from "stream";

import {EventEmitter} from "events";

type AsyncGeneratorFunction<T=any> = (...args: any[]) => {[Symbol.asyncIterator]: {next(): Promise<{value: T, done: boolean}>}}
type AsyncFunction = (...args: any[]) => Promise<any>;
type ThenFunction = (arg: any) => any;

declare class PromiseTransform implements NodeJS.ReadableStream, NodeJS.WritableStream {
    readable: boolean;
    read(size?: number | undefined): string | Buffer;
    setEncoding(encoding: string): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined; } | undefined): T;
    unpipe(destination?: NodeJS.WritableStream | undefined): this;
    unshift(chunk: string | Uint8Array, encoding?: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined): void;
    wrap(oldStream: NodeJS.ReadableStream): this;
    [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol | undefined): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    listenerCount(type: string | symbol): number;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    eventNames(): (string | symbol)[];
    writable: boolean;
    write(buffer: string | Uint8Array, cb?: ((err?: Error | null | undefined) => void) | undefined): boolean;
    write(str: string, encoding?: string | undefined, cb?: ((err?: Error | null | undefined) => void) | undefined): boolean;
    end(cb?: (() => void) | undefined): void;
    end(data: string | Uint8Array, cb?: (() => void) | undefined): void;
    end(str: string, encoding?: string | undefined, cb?: (() => void) | undefined): void;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol | undefined): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    listenerCount(type: string | symbol): number;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    eventNames(): (string | symbol)[];
}
/**
 * Creates a DataStream that's piped from the passed readable.
 * @param input argument to be turned into new stream
 * @param options options for creation of a new stream or the target stream
 * @param ...args additional arguments for the stream - will be passed to the function or generator
 */
declare function from(input: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, options?: DataStreamOptions | Writable, ...args: any[]): DataStream;

/**
 * Creates a DataStream from an Array
 * @param array list of chunks
 * @param options the read stream options
 */
declare function fromArray(array: any[], options?: DataStreamOptions): DataStream;

/**
 * Creates a safe wrapper for scramjet transform module. See [Modules documentation](modules.md) for more info.
 * @param transform
 * @param options
 * @param ...initialArgs
 */
declare function createTransformModule(transform: UseCallback, options?: CreateModuleOptions, ...initialArgs: any[]): Function;

/**
 * Creates a safe wrapper for scramjet read module. See [Modules documentation](modules.md) for more info.
 * @param anything
 * @param options
 * @param ...initialArgs
 */
declare function createReadModule(anything: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, options?: CreateModuleOptions, ...initialArgs: any[]): Function;

/**
 * Options for createModule
 */
declare interface CreateModuleOptions {
    /**
     * defines what class should the module assume
     */
    StreamClass: DataStream;
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
 * Plugs in methods for any of the classes
 * @param mixin the plugin object
 */
declare function plugin(mixin: ScramjetPlugin): ScramjetPlugin;

/**
 * Gets an API version (this may be important for future use)
 * @param version The required version (currently only: 1)
 */
declare function API(version: number): ScramjetPlugin;

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
declare class DataStream extends PromiseTransform {
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
    constructor(opts?: DataStreamOptions);

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
     * You can also pass a `Function` or `AsyncFunction` that will be executed and it's outcome will be
     * passed again to `from` and piped to the initially returned stream. Any additional arguments will be
     * passed as arguments to the function.
     * 
     * If a `String` is passed, scramjet will attempt to resolve it as a module and use the outcome
     * as an argument to `from` as in the Function case described above. For more information see {@link modules.md}
     * 
     * A simple example from a generator:
     * 
     * ```javascript
     * DataStream
     * .from(function* () {
     * while(x < 100) yield {x: x++};
     * })
     * .each(console.log)
     * // {x: 0}
     * // {x: 1}
     * // ...
     * // {x: 99}
     * ```
     * @param input argument to be turned into new stream
     * @param options options for creation of a new stream or the target stream
     * @param ...args additional arguments for the stream - will be passed to the function or generator
     */
    static from(input: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Promise<any> | Function | string | Readable, options?: DataStreamOptions | Writable, ...args: any[]): DataStream;

    /**
     * Transforms stream objects into new ones, just like Array.prototype.map
     * does.
     * 
     * Map takes an argument which is the Function function operating on every element
     * of the stream. If the function returns a Promise or is an AsyncFunction then the
     * stream will await for the outcome of the operation before pushing the data forwards.
     * 
     * A simple example that turns stream of urls into stream of responses
     * 
     * ```javascript
     * stream.map(async url => fetch(url));
     * ```
     * 
     * Multiple subsequent map operations (as well as filter, do, each and other simple ops)
     * will be merged together into a single operation to improve performance. Such behaviour
     * can be suppressed by chaining `.tap()` after `.map()`.
     * @param func The function that creates the new object
     * @param ClassType The class to be mapped to.
     */
    map(func: MapCallback, ClassType?: Function): this;

    /**
     * Filters object based on the function outcome, just like Array.prototype.filter.
     * 
     * Filter takes a Function argument which should be a Function or an AsyncFunction that
     * will be called on each stream item. If the outcome of the operation is `falsy` (`0`, `''`,
     * `false`, `null` or `undefined`) the item will be filtered from subsequent operations
     * and will not be pushed to the output of the stream. Otherwise the item will not be affected.
     * 
     * A simple example that filters out non-2xx responses from a stream
     * 
     * ```javascript
     * stream.filter(({statusCode}) => !(statusCode >= 200 && statusCode < 300));
     * ```
     * @param func The function that filters the object
     */
    filter(func: FilterCallback): this;

    /**
     * Reduces the stream into a given accumulator
     * 
     * Works similarly to Array.prototype.reduce, so whatever you return in the
     * former operation will be the first operand to the latter. The result is a
     * promise that's resolved with the return value of the last transform executed.
     * 
     * A simple example that sums values from a stream
     * 
     * ```javascript
     * stream.reduce((accumulator, {value}) => accumulator + value);
     * ```
     * 
     * This method is serial - meaning that any processing on an entry will
     * occur only after the previous entry is fully processed. This does mean
     * it's much slower than parallel functions.
     * @param func The into object will be passed as the  first argument, the data object from the stream as the second.
     * @param into Any object passed initially to the transform function
     */
    reduce(func: ReduceCallback, into: object): Promise<any>;

    /**
     * Perform an asynchronous operation without changing or resuming the stream.
     * 
     * In essence the stream will use the call to keep the backpressure, but the resolving value
     * has no impact on the streamed data (except for possible mutation of the chunk itself)
     * @param func the async function
     */
    do(func: DoCallback): this;

    /**
     * Processes a number of functions in parallel, returns a stream of arrays of results.
     * 
     * This method is to allow running multiple asynchronous operations and receive all the
     * results at one, just like Promise.all behaves.
     * 
     * Keep in mind that if one of your methods rejects, this behaves just like Promise.all
     * you won't be able to receive partial results.
     * @param functions list of async functions to run
     */
    all(functions: any[]): this;

    /**
     * Processes a number of functions in parallel, returns the first resolved.
     * 
     * This method is to allow running multiple asynchronous operations awaiting just the
     * result of the quickest to execute, just like Promise.race behaves.
     * 
     * Keep in mind that if one of your methods it will only raise an error if that was
     * the first method to reject.
     * @param functions list of async functions to run
     */
    race(functions: any[]): this;

    /**
     * Allows processing items without keeping order
     * 
     * This method useful if you are not concerned about the order in which the
     * chunks are being pushed out of the operation. The `maxParallel` option is
     * still used for keeping a number of simultaneous number of parallel operations
     * that are currently happening.
     * @param func the async function that will be unordered
     */
    unorder(func: MapCallback): void;

    /**
     * Allows own implementation of stream chaining.
     * 
     * The async Function is called on every chunk and should implement writes in it's own way. The
     * resolution will be awaited for flow control. The passed `into` argument is passed as the first
     * argument to every call.
     * 
     * It returns the DataStream passed as the second argument.
     * @param func the method that processes incoming chunks
     * @param into the DataStream derived class
     */
    into(func: IntoCallback, into: DataStream): this;

    /**
     * Calls the passed method in place with the stream as first argument, returns result.
     * 
     * The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
     * streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
     * from the command line.
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module. Lastly it can be a Transform stream.
     * @param ...parameters any additional parameters top be passed to the module
     */
    use(func: AsyncGeneratorFunction | GeneratorFunction | UseCallback | string | Readable, ...parameters: any[]): this;

    /**
     * Consumes all stream items doing nothing. Resolves when the stream is ended.
     * 
     * This is very convienient if you're looking to use up the stream in operations that work on each entry like `map`. This uncorks the stream
     * and allows all preceding operations to be run at any speed.
     * 
     * All the data of the current stream will be discarded.
     * 
     * The function returns a promise that is resolved when the stream ends.
     */
    run(): Promise<any>;

    /**
     * Creates a pipeline of streams and returns a scramjet stream.
     * 
     * This is similar to node.js stream pipeline method, but also takes scramjet modules
     * as possibilities in an array of transforms. It may be used to run a series of non-scramjet
     * transform streams.
     * 
     * The first argument is anything streamable and will be sanitized by {@link DataStream..from}.
     * 
     * Each following argument will be understood as a transform and can be any of:
     * * AsyncFunction or Function - will be executed by {@link DataStream..use}
     * * A transform stream that will be piped to the preceding stream
     * @param readable the initial readable argument that is streamable by scramjet.from
     * @param ...transforms Transform functions (as in {@link DataStream..use}) or Transform streams (any number of these as consecutive arguments)
     * @returns a new DataStream instance of the resulting pipeline
     */
    static pipeline(readable: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, ...transforms: any[]): DataStream;

    /**
     * Stops merging transform Functions at the current place in the command chain.
     */
    tap(): this;

    /**
     * Reads a chunk from the stream and resolves the promise when read.
     */
    whenRead(): Promise<any>;

    /**
     * Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
     * @param chunk a chunk to write
     * @param ...more more chunks to write
     */
    whenWrote(chunk: any, ...more: any[]): Promise<any>;

    /**
     * Resolves when stream ends - rejects on uncaught error
     */
    whenEnd(): Promise<any>;

    /**
     * Returns a promise that resolves when the stream is drained
     */
    whenDrained(): Promise<any>;

    /**
     * Returns a promise that resolves (!) when the stream is errors
     */
    whenError(): Promise<any>;

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
    setOptions(options: DataStreamOptions): this;

    /**
     * Returns a copy of the stream
     * 
     * Creates a new stream and pushes all the data from the current one to the new one.
     * This can be called serveral times.
     * @param func The duplicate stream will be passed as first argument.
     */
    copy(func: TeeCallback | Writable): this;

    /**
     * Duplicate the stream
     * 
     * Creates a duplicate stream instance and passes it to the Function.
     * @param func The duplicate stream will be passed as first argument.
     */
    tee(func: TeeCallback | Writable): this;

    /**
     * Performs an operation on every chunk, without changing the stream
     * 
     * This is a shorthand for ```stream.on("data", func)``` but with flow control.
     * Warning: this resumes the stream!
     * @param func a Function called for each chunk.
     */
    each(func: MapCallback): this;

    /**
     * Reads the stream while the function outcome is truthy.
     * 
     * Stops reading and emits end as soon as it finds the first chunk that evaluates
     * to false. If you're processing a file until a certain point or you just need to
     * confirm existence of some data, you can use it to end the stream before reaching end.
     * 
     * Keep in mind that whatever you piped to the stream will still need to be handled.
     * @param func The condition check
     */
    while(func: FilterCallback): this;

    /**
     * Reads the stream until the function outcome is truthy.
     * 
     * Works opposite of while.
     * @param func The condition check
     */
    until(func: FilterCallback): this;

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
    catch(callback: Function): this;

    /**
     * Executes all error handlers and if none resolves, then emits an error.
     * 
     * The returned promise will always be resolved even if there are no successful handlers.
     * @param err The thrown error
     */
    raise(err: Error): Promise<any>;

    /**
     * Creates a BufferStream.
     * 
     * The passed serializer must return a buffer.
     * @param serializer A method that converts chunks to buffers
     */
    bufferify(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream.
     * 
     * The passed serializer must return a string. If no serializer is passed chunks
     * toString method will be used.
     * @param serializer A method that converts chunks to strings
     */
    stringify(serializer?: MapCallback | never): StringStream;

    /**
     * Create a DataStream from an Array
     * @param array list of chunks
     * @param options the read stream options
     */
    static fromArray(array: any[], options?: DataStreamOptions): DataStream;

    /**
     * Create a DataStream from an Iterator
     * 
     * Doesn't end the stream until it reaches end of the iterator.
     * @param iterator the iterator object
     * @param options the read stream options
     */
    static fromIterator(iterator: Iterator<any>, options?: DataStreamOptions): DataStream;

    /**
     * Aggregates the stream into a single Array
     * 
     * In fact it's just a shorthand for reducing the stream into an Array.
     * @param initial Array to begin with (defaults to an empty array).
     * @returns
     */
    toArray(initial?: any[]): Promise<Array<any>>;

    /**
     * Returns an async generator
     */
    toGenerator(): Generator<Promise<any>>;

    /**
     * Pulls in any readable stream, resolves when the pulled stream ends.
     * 
     * You can also pass anything that can be passed to `DataStream.from`.
     * 
     * Does not preserve order, does not end this stream.
     * @param pullable
     * @param ...args any additional args
     * @returns resolved when incoming stream ends, rejects on incoming error
     */
    pull(pullable: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, ...args: any[]): Promise<Promise<any>>;

    /**
     * Shifts the first n items from the stream and pushes out the remaining ones.
     * @param count The number of items to shift.
     * @param func Function that receives an array of shifted items
     */
    shift(count: number, func: ShiftCallback): this;

    /**
     * Allows previewing some of the streams data without removing them from the stream.
     * 
     * Important: Peek does not resume the flow.
     * @param count The number of items to view before
     * @param func Function called before other streams
     */
    peek(count: number, func: ShiftCallback): this;

    /**
     * Slices out a part of the stream to the passed Function.
     * 
     * Returns a stream consisting of an array of items with `0` to `start`
     * omitted and `length` items after `start` included. Works similarly to
     * Array.prototype.slice.
     * 
     * Takes count from the moment it's called. Any previous items will not be
     * taken into account.
     * @param start omit this number of entries.
     * @param length get this number of entries to the resulting stream
     */
    slice(start?: number, length?: number): this;

    /**
     * Transforms stream objects by assigning the properties from the returned
     * data along with data from original ones.
     * 
     * The original objects are unaltered.
     * @param func The function that returns new object properties or just the new properties
     */
    assign(func: MapCallback | object): this;

    /**
     * Called only before the stream ends without passing any items
     * @param callback Function called when stream ends
     */
    empty(callback: Function): this;

    /**
     * Pushes any data at call time (essentially at the beginning of the stream)
     * 
     * This is a synchronous only function.
     * @param ...item list of items to unshift (you can pass more items)
     */
    unshift(...item: any[]): this;

    /**
     * Pushes any data at end of stream
     * @param item list of items to push at end
     */
    endWith(item: any): this;

    /**
     * Accumulates data into the object.
     * 
     * Works very similarly to reduce, but result of previous operations have
     * no influence over the accumulator in the next one.
     * 
     * Method works in parallel.
     * @param func The accumulation function
     * @param into Accumulator object
     */
    accumulate(func: AccumulateCallback, into: any): Promise<Promise<any>>;

    /**
     * Consumes the stream by running each Function
     * @deprecated use {@link DataStream#each} instead
     * @param func the consument
     * @param ...args additional args will be passed to generators
     */
    consume(func: ConsumeCallback | AsyncGeneratorFunction | GeneratorFunction, ...args: any[]): Promise<any>;

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
     * @param func The into object will be passed as the first argument, the data object from the stream as the second.
     * @param into Any object passed initially to the transform  function
     */
    reduceNow(func: ReduceCallback, into: any | EventEmitter): any;

    /**
     * Remaps the stream into a new stream.
     * 
     * This means that every item may emit as many other items as we like.
     * @param func A Function that is called on every chunk
     * @param ClassType Optional DataStream subclass to be constructed
     */
    remap(func: RemapCallback, ClassType?: Function): this;

    /**
     * Takes any method that returns any iterable and flattens the result.
     * 
     * The passed Function must return an iterable (otherwise an error will be emitted). The resulting stream will
     * consist of all the items of the returned iterables, one iterable after another.
     * @param func A Function that is called on every chunk
     * @param ClassType Optional DataStream subclass to be constructed
     * @param ...args additional args will be passed to generators
     */
    flatMap(func: FlatMapCallback, ClassType?: Function, ...args: any[]): this;

    /**
     * A shorthand for streams of arrays or iterables to flatten them.
     * 
     * More efficient equivalent of: `.flatmap(i => i);`
     * Works on streams of async iterables too.
     */
    flatten(): DataStream;

    /**
     * Returns a new stream that will append the passed streams to the callee
     * @param ...streams Streams to be injected into the current stream
     */
    concat(...streams: Readable[]): this;

    /**
     * Method will put the passed object between items. It can also be a function call or generator / iterator.
     * 
     * If a generator or iterator is passed, when the iteration is done no items will be interweaved.
     * Generator receives
     * @param item An object that should be interweaved between stream items
     * @param ...args additional args will be passed to generators
     */
    join(item: any | AsyncGeneratorFunction | GeneratorFunction | JoinCallback, ...args: any[]): this;

    /**
     * Keep a buffer of n-chunks for use with {@see DataStream..rewind}
     * @param count Number of objects or -1 for all the stream
     */
    keep(count?: number): this;

    /**
     * Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
     * @param count Number of objects or -1 for all the buffer
     */
    rewind(count?: number): this;

    /**
     * Returns a stream that stacks up incoming items always feeding out the newest items first.
     * It returns the older items when read
     * 
     * When the stack length exceeds the given `count` the given `drop` function is awaited
     * and used for flow control.
     * 
     * By default the drop function ignores and quietly disposes of items not read before overflow.
     * @param count
     * @param drop
     */
    stack(count?: number, drop?: Function): this;

    /**
     * Distributes processing into multiple sub-processes or threads if you like.
     * @todo Currently order is not kept.
     * @todo Example test breaks travis-ci build
     * @param affinity A Function that affixes the item to specific output stream which must exist in the object for each chunk, must return a string. A number may be passed to identify how many round-robin threads to start up. Defaults to Round Robin to twice the number of CPU threads.
     * @param clusterFunc stream transforms similar to {@see DataStream#use method}
     * @param options Options
     */
    distribute(affinity?: AffinityCallback | Function | number, clusterFunc?: Function | DataStreamOptions, options?: DataStreamOptions): this;

    /**
     * Separates stream into a hash of streams. Does not create new streams!
     * @param streams the object hash of streams. Keys must be the outputs of the affinity function
     * @param affinity the Function that affixes the item to specific streams which must exist in the object for each chunk.
     */
    separateInto(streams: object, affinity: AffinityCallback): this;

    /**
     * Separates execution to multiple streams using the hashes returned by the passed Function.
     * 
     * Calls the given Function for a hash, then makes sure all items with the same hash are processed within a single
     * stream. Thanks to that streams can be distributed to multiple threads.
     * @param affinity the affinity function
     * @param createOptions options to use to create the separated streams
     * @param ClassType options to use to create the separated streams
     */
    separate(affinity: AffinityCallback, createOptions?: DataStreamOptions, ClassType?: Function): MultiStream;

    /**
     * Delegates work to a specified worker.
     * @param delegateFunc A function to be run in the sub-thread.
     * @param worker
     * @param plugins
     */
    delegate(delegateFunc: DelegateCallback, worker: StreamWorker, plugins?: any[]): this;

    /**
     * Limit the rate of the stream to a given number of chunks per second or given timeframe.
     * @param cps Chunks per timeframe, the default timeframe is 1000 ms.
     * @param options Options for the limiter controlling the timeframe and time source. Both must work on same units.
     */
    rate(cps: number, options?: RateOptions): this;

    /**
     * Aggregates chunks in arrays given number of number of items long.
     * 
     * This can be used for micro-batch processing.
     * @param count How many items to aggregate
     */
    batch(count: number): this;

    /**
     * Aggregates chunks to arrays not delaying output by more than the given number of ms.
     * @param ms Maximum amount of milliseconds
     * @param count Maximum number of items in batch (otherwise no limit)
     */
    timeBatch(ms: number, count?: number): this;

    /**
     * Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
     * in bulk.
     * @todo needs more work, for now it's simply waiting some time, not checking the queues.
     * @param size maximum number of items to wait for
     * @param ms milliseconds to wait for more data
     */
    nagle(size?: number, ms?: number): this;

    /**
     * Returns a WindowStream of the specified length
     * @param length
     * @returns a stream of array's
     */
    window(length: number): WindowStream;

    /**
     * Transforms the stream to a streamed JSON array.
     * @param enclosure Any iterable object of two items (beginning and end)
     */
    toJSONArray(enclosure?: Iterable<any>): StringStream;

    /**
     * Transforms the stream to a streamed JSON object.
     * @param entryCallback async function returning an entry (array of [key, value])
     * @param enclosure Any iterable object of two items (beginning and end)
     */
    toJSONObject(entryCallback?: MapCallback, enclosure?: Iterable<any>): StringStream;

    /**
     * Returns a StringStream containing JSON per item with optional end line
     * @param endline whether to add endlines (boolean or string as delimiter)
     */
    JSONStringify(endline?: Boolean | string): StringStream;

    /**
     * Stringifies CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.unparse module.
     */
    CSVStringify(options?: object): StringStream;

    /**
     * Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
     * 
     * Pipes the current stream into the sub-processes stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     * 
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     * @param command command to execute
     * @param options options to be passed to `spawn` and defining serialization.
     * @param ...args additional args will be passed to function
     */
    exec(command: string, options?: ExecDataOptions | any, ...args: string[]): void;

    /**
     * Injects a ```debugger``` statement when called.
     * @param func if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain
     */
    debug(func: Function): DataStream;

    /**
     * Creates a BufferStream.
     * 
     * The passed serializer must return a buffer.
     * @param serializer A method that converts chunks to buffers
     */
    toBufferStream(serializer: MapCallback): BufferStream;

    /**
     * Creates a BufferStream.
     * 
     * The passed serializer must return a buffer.
     * @param serializer A method that converts chunks to buffers
     */
    toBufferStream(serializer: MapCallback): BufferStream;

    /**
     * Creates a StringStream.
     * 
     * The passed serializer must return a string. If no serializer is passed chunks
     * toString method will be used.
     * @param serializer A method that converts chunks to strings
     */
    toStringStream(serializer?: MapCallback | never): StringStream;

    /**
     * Creates a StringStream.
     * 
     * The passed serializer must return a string. If no serializer is passed chunks
     * toString method will be used.
     * @param serializer A method that converts chunks to strings
     */
    toStringStream(serializer?: MapCallback | never): StringStream;

}

/**
 * 
 * @param chunk the chunk to be mapped
 * @returns the mapped object
 */
declare type MapCallback = (chunk: any)=>Promise<any> | any;

/**
 * 
 * @param chunk the chunk to be filtered or not
 * @returns information if the object should remain in the filtered stream.
 */
declare type FilterCallback = (chunk: any)=>Promise<Boolean> | Boolean;

/**
 * 
 * @param accumulator the accumulator - the object initially passed or returned by the previous reduce operation
 * @param chunk the stream chunk.
 */
declare type ReduceCallback = (accumulator: any, chunk: object)=>Promise<any> | any;

/**
 * 
 * @param chunk source stream chunk
 * @returns the outcome is discarded
 */
declare type DoCallback = (chunk: object)=>Promise<any> | any;

/**
 * 
 * @param into stream passed to the into method
 * @param chunk source stream chunk
 */
declare type IntoCallback = (into: any, chunk: any)=>Promise<any> | any;

/**
 * 
 * @param stream
 * @param ...parameters
 * @returns
 */
declare type UseCallback = (stream: DataStream, ...parameters: any[])=>DataStream;

/**
 * 
 * @param teed The teed stream
 */
declare type TeeCallback = (teed: DataStream)=>void;

/**
 * Transform async callback. The passed transform should return a new chunk, unless
 * the output should be filtered - if so, the transform should return `undefined`.
 * 
 * Additionally the function can reject with `DataStream.filter` - the result will be
 * filtered and no other transforms will be run on the chunk.
 * @param chunk the stream chunk
 * @param encoding encoding of the chunk
 * @returns the result, undefined will be treated as filtered out.
 */
declare type ScramjetTransformCallback = (chunk: Buffer | string | any, encoding: string)=>Promise<any | undefined> | any | undefined;

/**
 * Write async callback. Await your async write and resolve.
 * @param chunk the stream chunk
 * @param encoding encoding of the chunk
 * @returns should resolve when the write ends
 */
declare type ScramjetWriteCallback = (chunk: Buffer | string | any, encoding: string)=>Promise<void> | void;

/**
 * Read async callback. Simply await your async operations and return the result as array.
 * @param count the number of chunks that should be read ("this is more like a set of guideline than actual rules").
 * @returns the read chunk.
 */
declare type ScramjetReadCallback = (count: number)=>any[] | Promise<Array<any>>;

/**
 * Standard options for scramjet streams.
 * 
 * Defines async transforms or read/write methods for a stream.
 */
declare interface DataStreamOptions {
    /**
     * an async function returning the next read item
     */
    promiseRead?: ScramjetReadCallback;
    /**
     * an async function writing the next written item
     */
    promiseWrite?: ScramjetWriteCallback;
    /**
     * an async function returning a transformed chunk
     */
    promiseTransform?: ScramjetTransformCallback;
    /**
     * an async function run before transform stream ends to push last chunks from the buffer
     */
    promiseFlush?: ScramjetReadCallback;
    /**
     * an async function run before the transform
     */
    beforeTransform?: ScramjetTransformCallback;
    /**
     * an async function run after the transform
     */
    afterTransform?: ScramjetTransformCallback;
    /**
     * the number of transforms done in parallel
     */
    maxParallel?: number;
    /**
     * a referring stream to point to (if possible the transforms will be pushed to it
     */
    referrer?: DataStream;
    /**
     * should the object mode be used instead of creating a new stream)
     */
    objectMode?: boolean;
    /**
     * The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource. Default: 16384 (16KB), or 16 for objectMode streams.
     */
    highWaterMark?: number;
    /**
     * If specified, then buffers will be decoded to strings using the specified encoding. Default: null.
     */
    encoding?: string;
    /**
     * Whether or not the stream should emit 'close' after it has been destroyed. Default: true.
     */
    emitClose?: boolean;
    /**
     * Implementation for the stream._read() method.
     */
    read?: Function;
    /**
     * Implementation for the stream._destroy() method.
     */
    destroy?: Function;
    /**
     * Implementation for the stream._construct() method.
     */
    construct?: Function;
    /**
     * Whether this stream should automatically call .destroy() on itself after ending. Default: true.
     */
    autoDestroy?: boolean;
}

/**
 * A stream of string objects for further transformation on top of DataStream.
 * 
 * Example:
 * 
 * ```js
 * StringStream.from(async () => (await fetch('https://example.com/data/article.txt')).text())
 *     .lines()
 *     .append("\r\n")
 *     .pipe(fs.createWriteStream('./path/to/file.txt'))
 * ```
 */
declare class StringStream extends DataStream {
    /**
     * A stream of string objects for further transformation on top of DataStream.
     * 
     * Example:
     * 
     * ```js
     * StringStream.from(async () => (await fetch('https://example.com/data/article.txt')).text())
     * .lines()
     * .append("\r\n")
     * .pipe(fs.createWriteStream('./path/to/file.txt'))
     * ```
     */
    constructor(encoding?: string, options?: DataStreamOptions);

    /**
     * Shifts given length of chars from the original stream
     * 
     * Works the same way as {@see DataStream.shift}, but in this case extracts
     * the given number of characters.
     * @param bytes The number of characters to shift.
     * @param func Function that receives a string of shifted chars.
     */
    shift(bytes: number, func: ShiftStringCallback): this;

    /**
     * A handy split by line regex to quickly get a line-by-line stream
     */
    static SPLIT_LINE: any;

    /**
     * Splits the string stream by the specified RegExp or string
     * @param splitter What to split by
     */
    split(splitter: RegExp | string): this;

    /**
     * Finds matches in the string stream and streams the match results
     * @param matcher A function that will be called for every
     *        stream chunk.
     */
    match(matcher: RegExp): this;

    /**
     * Transforms the StringStream to BufferStream
     * 
     * Creates a buffer stream from the given string stream. Still it returns a
     * DataStream derivative and isn't the typical node.js stream so you can do
     * all your transforms when you like.
     */
    toBufferStream(): BufferStream;

    /**
     * Parses every string to object
     * 
     * The method MUST parse EVERY string into a single object, so the string
     * stream here should already be split.
     * @param parser The transform function
     * @param StreamClass the output stream class to return
     */
    parse(parser: ParseCallback, StreamClass?: Function): DataStream;

    /**
     * Alias for {@link StringStream#parse}
     */
    toDataStream(): void;

    /**
     * Creates a StringStream and writes a specific string.
     * @param stream the string to push the your stream
     * @param encoding optional encoding
     */
    static fromString(stream: string, encoding: string): StringStream;

    /**
     * Creates a pipeline of streams and returns a scramjet stream.
     * @see DataStream.pipeline
     * @param readable the initial readable argument that is streamable by scramjet.from
     * @param transforms Transform functions (as in {@link DataStream..use}) or Transform streams (any number of these as consecutive arguments)
     * @returns a new StringStream instance of the resulting pipeline
     */
    static pipeline(readable: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, transforms: AsyncFunction | Function | Transform): StringStream;

    /**
     * Create StringStream from anything.
     * @see DataStream.from
     * @see module:scramjet.from
     * @param source argument to be turned into new stream
     * @param options
     */
    static from(source: string | any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | Readable, options?: DataStreamOptions | Writable): StringStream;

    /**
     * Splits the string stream by the specified regexp or string
     * @param eol End of line string or regex
     */
    lines(eol?: string | RegExp): this;

    /**
     * Parses each entry as JSON.
     * Ignores empty lines
     * @param perLine instructs to split per line
     */
    JSONParse(perLine?: Boolean): DataStream;

    /**
     * Parses CSV to DataString using 'papaparse' module.
     * @param options options for the papaparse.parse method.
     */
    CSVParse(options?: object): DataStream;

    /**
     * Appends given argument to all the items.
     * @param param the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     */
    append(param: ThenFunction | string): this;

    /**
     * Prepends given argument to all the items.
     * @param param the argument to prepend. If function passed then it will be called and resolved
     *             and the resolution will be prepended.
     */
    prepend(param: ThenFunction | string): this;

    /**
     * Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
     * 
     * Pipes the current stream into the sub-processes stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     * 
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     * @param command command to execute
     * @param options options to be passed to `spawn` and defining serialization.
     * @param ...args additional arguments (will overwrite to SpawnOptions args even if not given)
     */
    exec(command: string, options?: ExecOptions | any, ...args: string[]): void;

}

/**
 * 
 * @param shifted Shifted chars
 */
declare type ShiftStringCallback = (shifted: string | any)=>void;

/**
 * 
 * @param chunk the transformed chunk
 */
declare type ParseCallback = (chunk: string)=>Promise<any> | any;

/**
 * A facilitation stream created for easy splitting or parsing buffers.
 * 
 * Useful for working on built-in Node.js streams from files, parsing binary formats etc.
 * 
 * A simple use case would be:
 * 
 * ```javascript
 *  fs.createReadStream('pixels.rgba')
 *      .pipe(new BufferStream)         // pipe a buffer stream into scramjet
 *      .breakup(4)                     // split into 4 byte fragments
 *      .parse(buffer => [
 *          buffer.readInt8(0),            // the output is a stream of R,G,B and Alpha
 *          buffer.readInt8(1),            // values from 0-255 in an array.
 *          buffer.readInt8(2),
 *          buffer.readInt8(3)
 *      ]);
 * ```
 */
declare class BufferStream extends DataStream {
    /**
     * A facilitation stream created for easy splitting or parsing buffers.
     * 
     * Useful for working on built-in Node.js streams from files, parsing binary formats etc.
     * 
     * A simple use case would be:
     * 
     * ```javascript
     * fs.createReadStream('pixels.rgba')
     * .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     * .breakup(4)                     // split into 4 byte fragments
     * .parse(buffer => [
     * buffer.readInt8(0),            // the output is a stream of R,G,B and Alpha
     * buffer.readInt8(1),            // values from 0-255 in an array.
     * buffer.readInt8(2),
     * buffer.readInt8(3)
     * ]);
     * ```
     */
    constructor(opts?: DataStreamOptions);

    /**
     * Shift given number of bytes from the original stream
     * 
     * Works the same way as {@see DataStream.shift}, but in this case extracts
     * the given number of bytes.
     * @param chars The number of bytes to shift
     * @param func Function that receives a string of shifted bytes
     */
    shift(chars: number, func: ShiftBufferCallback): this;

    /**
     * Splits the buffer stream into buffer objects
     * @param splitter the buffer or string that the stream
     *        should be split by.
     */
    split(splitter: string | Buffer): BufferStream;

    /**
     * Breaks up a stream apart into chunks of the specified length
     * @param number the desired chunk length
     */
    breakup(number: number): BufferStream;

    /**
     * Creates a string stream from the given buffer stream
     * 
     * Still it returns a DataStream derivative and isn't the typical node.js
     * stream so you can do all your transforms when you like.
     * @param encoding The encoding to be used to convert the buffers
     *        to streams.
     */
    stringify(encoding?: string | any): StringStream;

    /**
     * Parses every buffer to object
     * 
     * The method MUST parse EVERY buffer into a single object, so the buffer
     * stream here should already be split or broken up.
     * @param parser The transform function
     */
    parse(parser: BufferParseCallback): DataStream;

    /**
     * Creates a pipeline of streams and returns a scramjet stream.
     * @see DataStream.pipeline
     * @param readable the initial readable argument that is streamable by scramjet.from
     * @param ...transforms Transform functions (as in {@link DataStream..use}) or Transform streams (any number of these as consecutive arguments)
     * @returns a new StringStream instance of the resulting pipeline
     */
    static pipeline(readable: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | string | Readable, ...transforms: any[]): BufferStream;

    /**
     * Create BufferStream from anything.
     * @see module:scramjet.from
     * @param stream argument to be turned into new stream
     * @param options options passed to the new stream if created
     */
    static from(stream: any[] | Iterable<any> | AsyncGeneratorFunction | GeneratorFunction | AsyncFunction | Function | Readable, options?: DataStreamOptions | Writable): BufferStream;

}

/**
 * Shift Function
 * @param shifted shifted bytes
 */
declare type ShiftBufferCallback = (shifted: Buffer | any)=>void;

/**
 * 
 * @param chunk the transformed chunk
 */
declare type BufferParseCallback = (chunk: Buffer)=>Promise<any> | any;

/**
 * An object consisting of multiple streams than can be refined or muxed.
 * 
 * The idea behind a MultiStream is being able to mux and demux streams when needed.
 * 
 * Usage:
 * ```javascript
 * new MultiStream([...streams])
 *  .mux();
 * 
 * new MultiStream(function*(){ yield* streams; })
 *  .map(stream => stream.filter(myFilter))
 *  .mux();
 * ```
 */
declare class MultiStream {
    /**
     * An object consisting of multiple streams than can be refined or muxed.
     * 
     * The idea behind a MultiStream is being able to mux and demux streams when needed.
     * 
     * Usage:
     * ```javascript
     * new MultiStream([...streams])
     * .mux();
     * 
     * new MultiStream(function*(){ yield* streams; })
     * .map(stream => stream.filter(myFilter))
     * .mux();
     * ```
     */
    constructor(streams: any[] | AsyncGenerator<Readable> | Generator<Readable>, options?: object);

    /**
     * Array of all streams
     */
    streams: any[];

    /**
     * Source of the MultiStream.
     * 
     * This is nulled when the stream ends and is used to control the
     */
    source: DataStream;

    /**
     * Constructs MultiStream from any number of streams-likes
     * @param streams the array of input streamlike elements
     * @param StreamClass
     * @returns
     */
    static from(streams: any[], StreamClass?: Function): MultiStream;

    /**
     * Returns the current stream length
     */
    length: any;

    /**
     * Returns new MultiStream with the streams returned by the transform.
     * 
     * Runs a callback for every stream, returns a new MultiStream of mapped
     * streams and creates a new MultiStream consisting of streams returned
     * by the Function.
     * @param aFunc Add callback (normally you need only this)
     * @param rFunc Remove callback, called when the stream is removed
     */
    map(aFunc: MultiMapCallback, rFunc: MultiMapCallback): Promise<MultiStream>;

    /**
     * Calls Array.prototype.find on the streams
     * @param ...args arguments for
     */
    find(...args: any[]): DataStream;

    /**
     * Filters the stream list and returns a new MultiStream with only the
     * streams for which the Function returned true
     * @param func Filter ran in Promise::then (so you can
     *        return a promise or a boolean)
     */
    filter(func: Function): MultiStream;

    /**
     * Muxes the streams into a single one
     * @todo For now using comparator will not affect the mergesort.
     * @todo Sorting requires all the streams to be constantly flowing, any
     *       single one drain results in draining the muxed too even if there
     *       were possible data on other streams.
     * @param comparator Should return -1 0 or 1 depending on the
     *        desired order. If passed the chunks will
     *        be added in a sorted order.
     * @param ClassType the class to be outputted
     */
    mux(comparator?: Function, ClassType?: Function): DataStream;

    /**
     * Adds a stream to the MultiStream
     * 
     * If the stream was muxed, filtered or mapped, this stream will undergo the
     * same transforms and conditions as if it was added in constructor.
     * @param stream [description]
     */
    add(stream: Readable): void;

    /**
     * Removes a stream from the MultiStream
     * 
     * If the stream was muxed, filtered or mapped, it will be removed from same
     * streams.
     * @param stream [description]
     */
    remove(stream: Readable): void;

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
    smap(transform: Function): this;

    /**
     * Distributes processing to multiple forked subprocesses.
     * @param clusterFunc a cluster callback with all operations working similarly to DataStream::use
     * @param options
     */
    cluster(clusterFunc: Function | string, options?: DistributeOptions): this;

}

/**
 * 
 * @param stream
 * @returns
 */
declare type MultiMapCallback = (stream: DataStream)=>DataStream;

/**
 * Shift Function
 * @param shifted an array of shifted chunks
 */
declare type ShiftCallback = (shifted: object[] | any)=>void;

/**
 * 
 * @param accumulator Accumulator passed to accumulate function
 * @param chunk the stream chunk
 */
declare type AccumulateCallback = (accumulator: any, chunk: any)=>Promise<any> | any;

/**
 * 
 * @param chunk the stream chunk
 */
declare type ConsumeCallback = (chunk: any)=>Promise<any> | any;

/**
 * 
 * @param emit a method to emit objects in the remapped stream
 * @param chunk the chunk from the original stream
 * @returns promise to be resolved when chunk has been processed
 */
declare type RemapCallback = (emit: Function, chunk: any)=>Promise<any> | any;

/**
 * 
 * @param chunk the chunk from the original stream
 * @returns promise to be resolved when chunk has been processed
 */
declare type FlatMapCallback = (chunk: any)=>AsyncGenerator<any, void, any> | Promise<Iterable<any>> | Iterable<any>;

/**
 * 
 * @param previous the chunk before
 * @param next the chunk after
 * @returns promise that is resolved with the joining item
 */
declare type JoinCallback = (previous: any, next: any)=>Promise<any> | any;

/**
 * 
 * @param chunk
 * @returns
 */
declare type AffinityCallback = (chunk: any)=>Symbol | string;

declare type DelegateCallback = ()=>void;

/**
 * 
 * @param timeFrame The size of the window to look for streams.
 * @param getTime Time source - anything that returns time.
 * @param setTimeout Timing function that works identically to setTimeout.
 */
declare interface RateOptions {
}

declare interface ExecDataOptions {
    /**
     * scramjet module to transform the stream to string or buffer stream
     */
    parse?: UseCallback;
    /**
     * scramjet module to transform from string or buffer stream to wanted version
     */
    stringify?: UseCallback;
}

declare interface ExecOptions {
    /**
     * (bitwise) the output stdio number to push out (defaults to stdout = 1)
     */
    stream?: number;
    /**
     * defaults to nothing, except on windows where "cmd.exe /c" will be spawned by default
     */
    interpreter?: string[];
}

/**
 * 
 * @param chunk stream object
 * @returns value of the object
 */
declare type ValueOfCallback = (chunk: any)=>Promise<number> | number;

/**
 * NumberStream options
 */
declare interface NumberStreamOptions {
    /**
     * value of the data item function.
     */
    valueOf?: ValueOfCallback;
}

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

    /**
     * Calculates the sum of all items in the stream.
     */
    sum(): Promise<number> | any;

    /**
     * Calculates the sum of all items in the stream.
     */
    avg(): Promise<number> | any;

}

/**
 * A stream for moving window calculation with some simple methods.
 * 
 * In essence it's a stream of Array's containing a list of items - a window.
 * It's best used when created by the `DataStream..window`` method.
 */
declare class WindowStream extends NumberStream {
    /**
     * A stream for moving window calculation with some simple methods.
     * 
     * In essence it's a stream of Array's containing a list of items - a window.
     * It's best used when created by the `DataStream..window`` method.
     */
    constructor();

    /**
     * Calculates moving sum of items, the output NumberStream will contain the moving sum.
     * @param valueOf value of method for array items
     */
    sum(valueOf?: ValueOfCallback): NumberStream;

    /**
     * Calculates the moving average of the window and returns the NumberStream
     * @param valueOf value of method for array items
     */
    avg(valueOf?: ValueOfCallback): NumberStream;

}

/**
 * StreamWorker class - intended for internal use
 * 
 * This class provides control over the subprocesses, including:
 *  - spawning
 *  - communicating
 *  - delivering streams
 */
declare class StreamWorker {
    /**
     * StreamWorker class - intended for internal use
     * 
     * This class provides control over the subprocesses, including:
     * - spawning
     * - communicating
     * - delivering streams
     */
    constructor();

    /**
     * Spawns the worker if necessary and provides the port information to it.
     */
    spawn(): Promise<StreamWorker>;

    /**
     * Delegates a stream to the child using tcp socket.
     * 
     * The stream gets serialized using JSON and passed on to the sub-process.
     * The sub-process then performs transforms on the stream and pushes them back to the main process.
     * The stream gets deserialized and outputted to the returned DataStream.
     * @param input stream to be delegated
     * @param delegateFunc Array of transforms or arrays describing ['module', 'method']
     * @param plugins List of plugins to load in the child
     */
    delegate(input: DataStream, delegateFunc: TeeCallback[] | any[], plugins?: any[]): DataStream;

    /**
     * Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.
     * @param count Number of processes to spawn. If other subprocesses are active only the missing ones will be spawned.
     */
    static fork(count?: number): Promise<Array<StreamWorker>>;

    /**
     * Picks next worker (not necessarily free one!)
     */
    static _getWorker(): Promise<StreamWorker>;

}

/**
 * Distribute options
 */
declare interface DistributeOptions {
    /**
     * a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself)
     */
    plugins?: any[];
    /**
     * the class to deserialize the stream to.
     */
    StreamClass?: string;
    /**
     * maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     */
    threads?: number;
    /**
     * maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     */
    createOptions?: DataStreamOptions;
    /**
     * worker implementation.
     */
    StreamWorker?: StreamWorker;
}

