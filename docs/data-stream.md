![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="DataStream"></a>

## DataStream : stream.PassThrough
DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.

Use as:

```javascript
const { DataStream } = require('scramjet');

await (DataStream.from(aStream) // create a DataStream
    .map(findInFiles)           // read some data asynchronously
    .map(sendToAPI)             // send the data somewhere
    .run());                    // wait until end
```

**Kind**: global class  
**Extends**: <code>stream.PassThrough</code>  

* [DataStream](#DataStream)  <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_DataStream_new)
    * [dataStream.map(func, ClassType)](#DataStream+map) ↺
    * [dataStream.filter(func)](#DataStream+filter) ↺
    * [dataStream.reduce(func, into)](#DataStream+reduce)
    * [dataStream.do(func)](#DataStream+do) ↺
    * [dataStream.unorder(func)](#DataStream+unorder)
    * [dataStream.into(func, into)](#DataStream+into) ↺
    * [dataStream.use(func)](#DataStream+use) ↺
    * [dataStream.run()](#DataStream+run)
    * [dataStream.tap()](#DataStream+tap)
    * [dataStream.whenRead()](#DataStream+whenRead)
    * [dataStream.whenWrote(chunk, [...more])](#DataStream+whenWrote)
    * [dataStream.whenEnd()](#DataStream+whenEnd)
    * [dataStream.whenDrained()](#DataStream+whenDrained)
    * [dataStream.whenError()](#DataStream+whenError)
    * [dataStream.setOptions(options)](#DataStream+setOptions) ↺
    * [dataStream.tee(func)](#DataStream+tee) ↺
    * [dataStream.each(func)](#DataStream+each) ↺
    * [dataStream.while(func)](#DataStream+while) ↺
    * [dataStream.until(func)](#DataStream+until) ↺
    * [dataStream.catch(callback)](#DataStream+catch) ↺
    * [dataStream.raise(err)](#DataStream+raise)
    * [dataStream.pipe(to, options)](#DataStream+pipe) ↺ <code>Writable</code>
    * [dataStream.bufferify(serializer)](#DataStream+bufferify) ↺ <code>BufferStream</code>
    * [dataStream.stringify(serializer)](#DataStream+stringify) ↺ <code>StringStream</code>
    * [dataStream.toArray(initial)](#DataStream+toArray) ⇄ <code>Array</code>
    * [dataStream.toGenerator()](#DataStream+toGenerator)  <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
    * [dataStream.pull(pullable)](#DataStream+pull) ⇄ <code>Promise</code>
    * [dataStream.shift(count, func)](#DataStream+shift) ↺
    * [dataStream.peek(count, func)](#DataStream+peek) ↺
    * [dataStream.slice([start], [length])](#DataStream+slice) ↺
    * [dataStream.assign(func)](#DataStream+assign) ↺
    * [dataStream.empty(callback)](#DataStream+empty) ↺
    * [dataStream.unshift(item)](#DataStream+unshift) ↺
    * [dataStream.endWith(item)](#DataStream+endWith) ↺
    * [dataStream.accumulate(func, into)](#DataStream+accumulate) ⇄ <code>Promise</code>
    * ~~[dataStream.consume(func)](#DataStream+consume)~~
    * [dataStream.reduceNow(func, into)](#DataStream+reduceNow) ↺ <code>\*</code>
    * [dataStream.remap(func, TypeClass)](#DataStream+remap) ↺ [<code>DataStream</code>](#DataStream)
    * [dataStream.flatMap(func, TypeClass)](#DataStream+flatMap) ↺ [<code>DataStream</code>](#DataStream)
    * [dataStream.flatten()](#DataStream+flatten) ↺ [<code>DataStream</code>](#DataStream)
    * [dataStream.concat(streams)](#DataStream+concat) ↺
    * [dataStream.join(item)](#DataStream+join) ↺
    * [dataStream.keep(count)](#DataStream+keep) ↺
    * [dataStream.rewind(count)](#DataStream+rewind) ↺
    * [dataStream.distribute([affinity], clusterFunc, options)](#DataStream+distribute) ↺
    * [dataStream.separateInto(streams, affinity)](#DataStream+separateInto) ↺
    * [dataStream.separate(affinity, createOptions)](#DataStream+separate) ↺ <code>MultiStream</code>
    * [dataStream.delegate(delegateFunc, worker, [plugins])](#DataStream+delegate) ↺
    * [dataStream.rate(cps, [options])](#DataStream+rate) ↺
    * [dataStream.batch(count)](#DataStream+batch) ↺
    * [dataStream.timeBatch(ms, count)](#DataStream+timeBatch) ↺
    * [dataStream.nagle([size], [ms])](#DataStream+nagle) ↺
    * [dataStream.window(length)](#DataStream+window) ↺ <code>WindowStream</code>
    * [dataStream.toJSONArray([enclosure])](#DataStream+toJSONArray) ↺ <code>StringStream</code>
    * [dataStream.toJSONObject([entryCallback], [enclosure])](#DataStream+toJSONObject) ↺ <code>StringStream</code>
    * [dataStream.JSONStringify([endline])](#DataStream+JSONStringify) ↺ <code>StringStream</code>
    * [dataStream.CSVStringify(options)](#DataStream+CSVStringify) ↺ <code>StringStream</code>
    * [dataStream.exec(command, options, args)](#DataStream+exec)
    * [dataStream.debug(func)](#DataStream+debug) ↺ [<code>DataStream</code>](#DataStream)
    * [dataStream.toBufferStream(serializer)](#DataStream+toBufferStream) ↺ <code>BufferStream</code>
    * [dataStream.toStringStream(serializer)](#DataStream+toStringStream) ↺ <code>StringStream</code>
    * [DataStream:from(input, options)](#DataStream.from)  [<code>DataStream</code>](#DataStream)
    * [DataStream:pipeline(readable, ...transforms)](#DataStream.pipeline)  [<code>DataStream</code>](#DataStream)
    * [DataStream:fromArray(array, options)](#DataStream.fromArray)  [<code>DataStream</code>](#DataStream)
    * [DataStream:fromIterator(iterator, options)](#DataStream.fromIterator)  [<code>DataStream</code>](#DataStream)
    * [DataStream:MapCallback](#DataStream.MapCallback)  <code>Promise</code> \| <code>\*</code>
    * [DataStream:FilterCallback](#DataStream.FilterCallback)  <code>Promise</code> \| <code>Boolean</code>
    * [DataStream:ReduceCallback](#DataStream.ReduceCallback)  <code>Promise</code> \| <code>\*</code>
    * [DataStream:DoCallback](#DataStream.DoCallback) ⇄ <code>function</code>
    * [DataStream:IntoCallback](#DataStream.IntoCallback) ⇄ <code>\*</code>
    * [DataStream:TeeCallback](#DataStream.TeeCallback)  <code>function</code>
    * [DataStream:ShiftCallback](#DataStream.ShiftCallback)  <code>function</code>
    * [DataStream:AccumulateCallback](#DataStream.AccumulateCallback)  <code>Promise</code> \| <code>\*</code>
    * [DataStream:ConsumeCallback](#DataStream.ConsumeCallback)  <code>Promise</code> \| <code>\*</code>
    * [DataStream:RemapCallback](#DataStream.RemapCallback)  <code>Promise</code> \| <code>\*</code>
    * [DataStream:FlatMapCallback](#DataStream.FlatMapCallback)  <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code>
    * [DataStream:JoinCallback](#DataStream.JoinCallback)  <code>Promise.&lt;\*&gt;</code> \| <code>\*</code>
    * [DataStream:RateOptions](#DataStream.RateOptions)

<a name="new_DataStream_new"></a>

### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | [<code>StreamOptions</code>](#StreamOptions) | Stream options passed to superclass |

<a name="DataStream+map"></a>

### dataStream.map(func, ClassType) ↺
Transforms stream objects into new ones, just like Array.prototype.map
does.

Map takes an argument which is the Function function operating on every element
of the stream. If the function returns a Promise or is an AsyncFunction then the
stream will await for the outcome of the operation before pushing the data forwards.

A simple example that turns stream of urls into stream of responses

```javascript
stream.map(async url => fetch(url));
```

Multiple subsequent map operations (as well as filter, do, each and other simple ops)
will be merged together into a single operation to improve performance. Such behaviour
can be suppressed by chaining `.tap()` after `.map()`.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-map.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | The function that creates the new object |
| ClassType | <code>Class</code> | (optional) The class to be mapped to. |

<a name="DataStream+filter"></a>

### dataStream.filter(func) ↺
Filters object based on the function outcome, just like Array.prototype.filter.

Filter takes a Function argument which should be a Function or an AsyncFunction that
will be called on each stream item. If the outcome of the operation is `falsy` (`0`, `''`,
`false`, `null` or `undefined`) the item will be filtered from subsequent operations
and will not be pushed to the output of the stream. Otherwise the item will not be affected.

A simple example that filters out non-2xx responses from a stream

```javascript
stream.filter(({statusCode}) => !(statusCode >= 200 && statusCode < 300));
```

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-filter.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The function that filters the object |

<a name="DataStream+reduce"></a>

### dataStream.reduce(func, into) ⇄
Reduces the stream into a given accumulator

Works similarly to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter. The result is a
promise that's resolved with the return value of the last transform executed.

A simple example that sums values from a stream

```javascript
stream.reduce((accumulator, {value}) => accumulator + value);
```

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-reduce.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>ReduceCallback</code> | The into object will be passed as the  first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initially to the transform function |

<a name="DataStream+do"></a>

### dataStream.do(func) ↺
Perform an asynchronous operation without changing or resuming the stream.

In essence the stream will use the call to keep the backpressure, but the resolving value
has no impact on the streamed data (except for possible mutation of the chunk itself)

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>DoCallback</code> | the async function |

<a name="DataStream+unorder"></a>

### dataStream.unorder(func)
Allows processing items without keeping order

This method useful if you are not concerned about the order in which the
chunks are being pushed out of the operation. The `maxParallel` option is
still used for keeping a number of simultaneous number of parallel operations
that are currently happening.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | the async function that will be unordered |

<a name="DataStream+into"></a>

### dataStream.into(func, into) ↺
Allows own implementation of stream chaining.

The async Function is called on every chunk and should implement writes in it's own way. The
resolution will be awaited for flow control. The passed `into` argument is passed as the first
argument to every call.

It returns the DataStream passed as the second argument.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-into.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>IntoCallback</code> | the method that processes incoming chunks |
| into | [<code>DataStream</code>](#DataStream) | the DataStream derived class |

<a name="DataStream+use"></a>

### dataStream.use(func) ↺
Calls the passed method in place with the stream as first argument, returns result.

The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
from the command line.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-use.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module. Lastly it can be a Transform stream. |
| [...parameters] | <code>\*</code> | any additional parameters top be passed to the module |

<a name="DataStream+run"></a>

### dataStream.run() ⇄
Consumes all stream items doing nothing. Resolves when the stream is ended.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+tap"></a>

### dataStream.tap()
Stops merging transform Functions at the current place in the command chain.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-tap.js  
<a name="DataStream+whenRead"></a>

### dataStream.whenRead() ⇄
Reads a chunk from the stream and resolves the promise when read.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+whenWrote"></a>

### dataStream.whenWrote(chunk, [...more]) ⇄
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | a chunk to write |
| [...more] | <code>\*</code> | more chunks to write |

<a name="DataStream+whenEnd"></a>

### dataStream.whenEnd() ⇄
Resolves when stream ends - rejects on uncaught error

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+whenDrained"></a>

### dataStream.whenDrained() ⇄
Returns a promise that resolves when the stream is drained

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+whenError"></a>

### dataStream.whenError() ⇄
Returns a promise that resolves (!) when the stream is errors

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+setOptions"></a>

### dataStream.setOptions(options) ↺
Allows resetting stream options.

It's much easier to use this in chain than constructing new stream:

```javascript
    stream.map(myMapper).filter(myFilter).setOptions({maxParallel: 2})
```

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.conditions**: keep-order,chain  

| Param | Type |
| --- | --- |
| options | [<code>StreamOptions</code>](#StreamOptions) | 

<a name="DataStream+tee"></a>

### dataStream.tee(func) ↺
Duplicate the stream

Creates a duplicate stream instance and passes it to the Function.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-tee.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TeeCallback</code> \| <code>Writable</code> | The duplicate stream will be passed as first argument. |

<a name="DataStream+each"></a>

### dataStream.each(func) ↺
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)``` but with flow control.
Warning: this resumes the stream!

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | a Function called for each chunk. |

<a name="DataStream+while"></a>

### dataStream.while(func) ↺
Reads the stream while the function outcome is truthy.

Stops reading and emits end as soon as it finds the first chunk that evaluates
to false. If you're processing a file until a certain point or you just need to
confirm existence of some data, you can use it to end the stream before reaching end.

Keep in mind that whatever you piped to the stream will still need to be handled.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-while.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="DataStream+until"></a>

### dataStream.until(func) ↺
Reads the stream until the function outcome is truthy.

Works opposite of while.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-until.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="DataStream+catch"></a>

### dataStream.catch(callback) ↺
Provides a way to catch errors in chained streams.

The handler will be called as asynchronous
 - if it resolves then the error will be muted.
 - if it rejects then the error will be passed to the next handler

If no handlers will resolve the error, an `error` event will be emitted

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-catch.js  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Error handler (async function) |

<a name="DataStream+raise"></a>

### dataStream.raise(err) ⇄
Executes all error handlers and if none resolves, then emits an error.

The returned promise will always be resolved even if there are no successful handlers.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-raise.js  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The thrown error |

<a name="DataStream+pipe"></a>

### dataStream.pipe(to, options) : Writable ↺
Override of node.js Readable pipe.

Except for calling overridden method it proxies errors to piped stream.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>Writable</code> - the `to` stream  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Writable</code> | Writable stream to write to |
| options | <code>WritableOptions</code> |  |

<a name="DataStream+bufferify"></a>

### dataStream.bufferify(serializer) : BufferStream ↺
Creates a BufferStream.

The passed serializer must return a buffer.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>BufferStream</code> - the resulting stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tobufferstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to buffers |

<a name="DataStream+stringify"></a>

### dataStream.stringify(serializer) : StringStream ↺
Creates a StringStream.

The passed serializer must return a string.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>StringStream</code> - the resulting stream  
**Test**: test/methods/data-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to strings |

<a name="DataStream+toArray"></a>

### dataStream.toArray(initial) : Array ⇄
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

<a name="DataStream+toGenerator"></a>

### dataStream.toGenerator() : Iterable.<Promise.<*>>
Returns an async generator

Ready for https://github.com/tc39/proposal-async-iteration

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code> - Returns an iterator that returns a promise for each item.  
<a name="DataStream+pull"></a>

### dataStream.pull(pullable) : Promise ⇄
Pulls in any readable stream, resolves when the pulled stream ends.

You can also pass anything that can be passed to `DataStream.from`.

Does not preserve order, does not end this stream.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - resolved when incoming stream ends, rejects on incoming error  
**Test**: test/methods/data-stream-pull.js  

| Param | Type |
| --- | --- |
| pullable | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | 

<a name="DataStream+shift"></a>

### dataStream.shift(count, func) ↺
Shifts the first n items from the stream and pushes out the remaining ones.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to shift. |
| func | <code>ShiftCallback</code> | Function that receives an array of shifted items |

<a name="DataStream+peek"></a>

### dataStream.peek(count, func) ↺
Allows previewing some of the streams data without removing them from the stream.

Important: Peek does not resume the flow.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to view before |
| func | <code>ShiftCallback</code> | Function called before other streams |

<a name="DataStream+slice"></a>

### dataStream.slice([start], [length]) ↺
Slices out a part of the stream to the passed Function.

Returns a stream consisting of an array of items with `0` to `start`
omitted and `length` items after `start` included. Works similarly to
Array.prototype.slice.

Takes count from the moment it's called. Any previous items will not be
taken into account.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-slice.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>Number</code> | <code>0</code> | omit this number of entries. |
| [length] | <code>Number</code> | <code>Infinity</code> | get this number of entries to the resulting stream |

<a name="DataStream+assign"></a>

### dataStream.assign(func) ↺
Transforms stream objects by assigning the properties from the returned
data along with data from original ones.

The original objects are unaltered.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-assign.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> \| <code>Object</code> | The function that returns new object properties or just the new properties |

<a name="DataStream+empty"></a>

### dataStream.empty(callback) ↺
Called only before the stream ends without passing any items

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-empty.js  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function called when stream ends |

<a name="DataStream+unshift"></a>

### dataStream.unshift(item) ↺
Pushes any data at call time (essentially at the beginning of the stream)

This is a synchronous only function.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to unshift (you can pass more items) |

<a name="DataStream+endWith"></a>

### dataStream.endWith(item) ↺
Pushes any data at end of stream

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-endwith.js  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to push at end |

<a name="DataStream+accumulate"></a>

### dataStream.accumulate(func, into) : Promise ⇄
Accumulates data into the object.

Works very similarly to reduce, but result of previous operations have
no influence over the accumulator in the next one.

Method is parallel

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-accumulate.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AccumulateCallback</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

<a name="DataStream+consume"></a>

### ~~dataStream.consume(func) ⇄~~
***Deprecated***

Consumes the stream by running each Function

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the consument |

<a name="DataStream+reduceNow"></a>

### dataStream.reduceNow(func, into) : * ↺
Reduces the stream into the given object, returning it immediately.

The main difference to reduce is that only the first object will be
returned at once (however the method will be called with the previous
entry).
If the object is an instance of EventEmitter then it will propagate the
error from the previous stream.

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>\*</code> - whatever was passed as into  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-reduceNow.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>ReduceCallback</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> \| <code>EventEmitter</code> | Any object passed initially to the transform function |

<a name="DataStream+remap"></a>

### dataStream.remap(func, TypeClass) : DataStream ↺
Remaps the stream into a new stream.

This means that every item may emit as many other items as we like.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](#DataStream) - a new DataStream of the given class with new chunks  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-remap.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>RemapCallback</code> | A Function that is called on every chunk |
| TypeClass | <code>class</code> | Optional DataStream subclass to be constructed |

<a name="DataStream+flatMap"></a>

### dataStream.flatMap(func, TypeClass) : DataStream ↺
Takes any method that returns any iterable and flattens the result.

The passed Function must return an iterable (otherwise an error will be emitted). The resulting stream will
consist of all the items of the returned iterables, one iterable after another.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](#DataStream) - a new DataStream of the given class with new chunks  
**Test**: test/methods/data-stream-flatmap.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FlatMapCallback</code> | A Function that is called on every chunk |
| TypeClass | <code>class</code> | Optional DataStream subclass to be constructed |

<a name="DataStream+flatten"></a>

### dataStream.flatten() : DataStream ↺
A shorthand for streams of Arrays to flatten them.

More efficient equivalent of: .flatmap(i => i);

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-flatten.js  
<a name="DataStream+concat"></a>

### dataStream.concat(streams) ↺
Returns a new stream that will append the passed streams to the callee

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-concat.js  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>\*</code> | Streams to be passed |

<a name="DataStream+join"></a>

### dataStream.join(item) ↺
Method will put the passed object between items. It can also be a function call.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-join.js  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> \| <code>JoinCallback</code> | An object that should be interweaved between stream items |

<a name="DataStream+keep"></a>

### dataStream.keep(count) ↺
Keep a buffer of n-chunks for use with {@see DataStream..rewind}

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-keep.js  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Number of objects or -1 for all the stream |

<a name="DataStream+rewind"></a>

### dataStream.rewind(count) ↺
Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Number of objects or -1 for all the buffer |

<a name="DataStream+distribute"></a>

### dataStream.distribute([affinity], clusterFunc, options) ↺
Distributes processing into multiple sub-processes or threads if you like.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-distribute.js  
**Todo**

- [ ] Currently order is not kept.
- [ ] Example test breaks travis-ci build


| Param | Type | Description |
| --- | --- | --- |
| [affinity] | <code>AffinityCallback</code> \| <code>Number</code> | A Function that affixes the item to specific output stream which must exist in the object for each chunk, must return a string. A number may be passed to identify how many round-robin threads to start up. Defaults to Round Robin to twice the number of CPU threads. |
| clusterFunc | <code>ClusterCallback</code> | stream transforms similar to {@see DataStream#use method} |
| options | <code>Object</code> | Options |

<a name="DataStream+separateInto"></a>

### dataStream.separateInto(streams, affinity) ↺
Separates stream into a hash of streams. Does not create new streams!

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| streams | [<code>Object.&lt;DataStream&gt;</code>](#DataStream) | the object hash of streams. Keys must be the outputs of the affinity function |
| affinity | <code>AffinityCallback</code> | the Function that affixes the item to specific streams which must exist in the object for each chunk. |

<a name="DataStream+separate"></a>

### dataStream.separate(affinity, createOptions) : MultiStream ↺
Separates execution to multiple streams using the hashes returned by the passed Function.

Calls the given Function for a hash, then makes sure all items with the same hash are processed within a single
stream. Thanks to that streams can be distributed to multiple threads.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>MultiStream</code> - separated stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-separate.js  

| Param | Type | Description |
| --- | --- | --- |
| affinity | <code>AffinityCallback</code> | the affinity function |
| createOptions | <code>Object</code> | options to use to create the separated streams |

<a name="DataStream+delegate"></a>

### dataStream.delegate(delegateFunc, worker, [plugins]) ↺
Delegates work to a specified worker.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delegateFunc | <code>DelegateCallback</code> |  | A function to be run in the sub-thread. |
| worker | <code>WorkerStream</code> |  |  |
| [plugins] | <code>Array</code> | <code>[]</code> |  |

<a name="DataStream+rate"></a>

### dataStream.rate(cps, [options]) ↺
Limit the rate of the stream to a given number of chunks per second or given timeframe.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cps | <code>Number</code> |  | Chunks per timeframe, the default timeframe is 1000 ms. |
| [options] | <code>RateOptions</code> | <code>{}</code> | Options for the limiter controlling the timeframe and time source. Both must work on same units. |

<a name="DataStream+batch"></a>

### dataStream.batch(count) ↺
Aggregates chunks in arrays given number of number of items long.

This can be used for micro-batch processing.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-batch.js  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | How many items to aggregate |

<a name="DataStream+timeBatch"></a>

### dataStream.timeBatch(ms, count) ↺
Aggregates chunks to arrays not delaying output by more than the given number of ms.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-timebatch.js  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | Maximum amount of milliseconds |
| count | <code>Number</code> | Maximum number of items in batch (otherwise no limit) |

<a name="DataStream+nagle"></a>

### dataStream.nagle([size], [ms]) ↺
Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
in bulk.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Todo**

- [ ] needs more work, for now it's simply waiting some time, not checking the queues.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>32</code> | maximum number of items to wait for |
| [ms] | <code>number</code> | <code>10</code> | milliseconds to wait for more data |

<a name="DataStream+window"></a>

### dataStream.window(length) : WindowStream ↺
Returns a WindowStream of the specified length

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>WindowStream</code> - a stream of array's  
**Meta.noreadme**:   

| Param | Type |
| --- | --- |
| length | <code>Number</code> | 

<a name="DataStream+toJSONArray"></a>

### dataStream.toJSONArray([enclosure]) : StringStream ↺
Transforms the stream to a streamed JSON array.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tojsonarray.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [enclosure] | <code>Iterable</code> | <code>&#x27;[]&#x27;</code> | Any iterable object of two items (beginning and end) |

<a name="DataStream+toJSONObject"></a>

### dataStream.toJSONObject([entryCallback], [enclosure]) : StringStream ↺
Transforms the stream to a streamed JSON object.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tojsonobject.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entryCallback] | <code>MapCallback</code> |  | async function returning an entry (array of [key, value]) |
| [enclosure] | <code>Iterable</code> | <code>&#x27;{}&#x27;</code> | Any iterable object of two items (beginning and end) |

<a name="DataStream+JSONStringify"></a>

### dataStream.JSONStringify([endline]) : StringStream ↺
Returns a StringStream containing JSON per item with optional end line

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>StringStream</code> - output stream  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [endline] | <code>Boolean</code> \| <code>String</code> | <code>os.EOL</code> | whether to add endlines (boolean or string as delimiter) |

<a name="DataStream+CSVStringify"></a>

### dataStream.CSVStringify(options) : StringStream ↺
Stringifies CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>StringStream</code> - stream of parsed items  
**Test**: test/methods/data-stream-csv.js  

| Param | Description |
| --- | --- |
| options | options for the papaparse.unparse module. |

<a name="DataStream+exec"></a>

### dataStream.exec(command, options, args)
Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.

Pipes the current stream into the sub-processes stdin.
The data is serialized and deserialized as JSON lines by default. You
can provide your own alternative methods in the ExecOptions object.

Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-exec.js  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | command to execute |
| options | <code>ExecDataOptions</code> | options to be passed to `spawn` and defining serialization. |
| args | <code>String</code> | additional arguments (will overwrite to SpawnOptions args even if not given) |

<a name="DataStream+debug"></a>

### dataStream.debug(func) : DataStream ↺
Injects a ```debugger``` statement when called.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](#DataStream) - self  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-debug.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain |

<a name="DataStream+toBufferStream"></a>

### dataStream.toBufferStream(serializer) : BufferStream ↺
Creates a BufferStream.

The passed serializer must return a buffer.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>BufferStream</code> - the resulting stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tobufferstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to buffers |

<a name="DataStream+toStringStream"></a>

### dataStream.toStringStream(serializer) : StringStream ↺
Creates a StringStream.

The passed serializer must return a string.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Returns**: <code>StringStream</code> - the resulting stream  
**Test**: test/methods/data-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to strings |

<a name="DataStream.from"></a>

### DataStream:from(input, options) : DataStream
Returns a DataStream from pretty much anything sensibly possible.

Depending on type:
* `self` will return self immediately
* `Readable` stream will get piped to the current stream with errors forwarded
* `Array` will get iterated and all items will be pushed to the returned stream.
  The stream will also be ended in such case.
* `GeneratorFunction` will get executed to return the iterator which will be used as source for items
* `AsyncGeneratorFunction` will also work as above (including generators) in node v10.
* `Iterable`s iterator will be used as a source for streams

You can also pass a `Function` or `AsyncFunction` that will be executed and it's outcome will be
passed again to `from` and piped to the initially returned stream. Any additional arguments will be
passed as arguments to the function.

If a `String` is passed, scramjet will attempt to resolve it as a module and use the outcome
as an argument to `from` as in the Function case described above. For more information see [modules.md](modules.md)

A simple example from a generator:

```javascript
DataStream
  .from(function* () {
     while(x < 100) yield x++;
  })
  .each(console.log)
  // 0
  // 1...
  // 99
```

**Kind**: static method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | argument to be turned into new stream |
| options | [<code>StreamOptions</code>](#StreamOptions) \| <code>Writable</code> |  |

<a name="DataStream.pipeline"></a>

### DataStream:pipeline(readable, ...transforms) : DataStream
Creates a pipeline of streams and returns a scramjet stream.

This is similar to node.js stream pipeline method, but also takes scramjet modules
as possibilities in an array of transforms. It may be used to run a series of non-scramjet
transform streams.

The first argument is anything streamable and will be sanitized by [DataStream..from](DataStream..from).

Each following argument will be understood as a transform and can be any of:
* AsyncFunction or Function - will be executed by [DataStream..use](DataStream..use)
* A transform stream that will be piped to the preceding stream

**Kind**: static method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - a new DataStream instance of the resulting pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| ...transforms | <code>AsyncFunction</code> \| <code>function</code> \| <code>Transform</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="DataStream.fromArray"></a>

### DataStream:fromArray(array, options) : DataStream
Create a DataStream from an Array

**Kind**: static method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-fromarray.js  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | list of chunks |
| options | <code>ScramjetOptions</code> | the read stream options |

<a name="DataStream.fromIterator"></a>

### DataStream:fromIterator(iterator, options) : DataStream
Create a DataStream from an Iterator

Doesn't end the stream until it reaches end of the iterator.

**Kind**: static method of [<code>DataStream</code>](#DataStream)  
**Test**: test/methods/data-stream-fromiterator.js  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>Iterator</code> | the iterator object |
| options | <code>ScramjetOptions</code> | the read stream options |

<a name="DataStream.MapCallback"></a>

### DataStream:MapCallback : Promise | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="DataStream.FilterCallback"></a>

### DataStream:FilterCallback : Promise | Boolean
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>Boolean</code> - information if the object should remain in
                            the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="DataStream.ReduceCallback"></a>

### DataStream:ReduceCallback : Promise | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>\*</code> | the accumulator - the object initially passed or returned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="DataStream.DoCallback"></a>

### DataStream:DoCallback : function ⇄
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Object</code> | source stream chunk |

<a name="DataStream.IntoCallback"></a>

### DataStream:IntoCallback : * ⇄
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>\*</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>Object</code> | source stream chunk |

<a name="DataStream.TeeCallback"></a>

### DataStream:TeeCallback : function
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| teed | [<code>DataStream</code>](#DataStream) | The teed stream |

<a name="DataStream.ShiftCallback"></a>

### DataStream:ShiftCallback : function
Shift Function

**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Array.&lt;Object&gt;</code> | an array of shifted chunks |

<a name="DataStream.AccumulateCallback"></a>

### DataStream:AccumulateCallback : Promise | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="DataStream.ConsumeCallback"></a>

### DataStream:ConsumeCallback : Promise | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the stream chunk |

<a name="DataStream.RemapCallback"></a>

### DataStream:RemapCallback : Promise | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> \| <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="DataStream.FlatMapCallback"></a>

### DataStream:FlatMapCallback : Promise.<Iterable> | Iterable
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="DataStream.JoinCallback"></a>

### DataStream:JoinCallback : Promise.<*> | *
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise.&lt;\*&gt;</code> \| <code>\*</code> - promise that is resolved with the joining item  

| Param | Type | Description |
| --- | --- | --- |
| previous | <code>\*</code> | the chunk before |
| next | <code>\*</code> | the chunk after |

<a name="DataStream.RateOptions"></a>

### DataStream:RateOptions
**Kind**: static typedef of [<code>DataStream</code>](#DataStream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timeFrame] | <code>Number</code> | <code>1000</code> | The size of the window to look for streams. |
| [getTime] | <code>function</code> | <code>Date.now</code> | Time source - anything that returns time. |
| [setTimeout] | <code>function</code> | <code>setTimeout</code> | Timing function that works identically to setTimeout. |

<a name="StreamOptions"></a>

## StreamOptions : Object
Standard options for scramjet streams.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxParallel | <code>Number</code> | the number of transforms done in parallel |
| referrer | [<code>DataStream</code>](#DataStream) | a referring stream to point to (if possible the transforms will be pushed to it                                 instead of creating a new stream) |

