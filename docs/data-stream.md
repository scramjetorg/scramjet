![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.DataStream"></a>

## :DataStream : import("stream").PassThrough
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

**Kind**: static class  
**Extends**: <code>import(&quot;stream&quot;).PassThrough</code>  
**Test**: test/methods/data-stream-constructor.js  

* [:DataStream](#module_scramjet.DataStream)  <code>import(&quot;stream&quot;).PassThrough</code>
    * [new DataStream([opts])](#new_module_scramjet.DataStream_new)
    * [dataStream.map(func, [ClassType])](#module_scramjet.DataStream+map) ↺
    * [dataStream.filter(func)](#module_scramjet.DataStream+filter) ↺
    * [dataStream.reduce(func, into)](#module_scramjet.DataStream+reduce)
    * [dataStream.do(func)](#module_scramjet.DataStream+do) ↺
    * [dataStream.all(functions)](#module_scramjet.DataStream+all) ↺
    * [dataStream.race(functions)](#module_scramjet.DataStream+race) ↺
    * [dataStream.unorder(func)](#module_scramjet.DataStream+unorder)
    * [dataStream.into(func, into)](#module_scramjet.DataStream+into) ↺
    * [dataStream.use(func)](#module_scramjet.DataStream+use) ↺
    * [dataStream.run()](#module_scramjet.DataStream+run)
    * [dataStream.tap()](#module_scramjet.DataStream+tap) ↺
    * [dataStream.whenRead()](#module_scramjet.DataStream+whenRead)
    * [dataStream.whenWrote(chunk)](#module_scramjet.DataStream+whenWrote)
    * [dataStream.whenEnd()](#module_scramjet.DataStream+whenEnd)
    * [dataStream.whenDrained()](#module_scramjet.DataStream+whenDrained)
    * [dataStream.whenError()](#module_scramjet.DataStream+whenError)
    * [dataStream.setOptions(options)](#module_scramjet.DataStream+setOptions) ↺
    * [dataStream.copy(func)](#module_scramjet.DataStream+copy) ↺
    * [dataStream.tee(func)](#module_scramjet.DataStream+tee) ↺
    * [dataStream.each(func)](#module_scramjet.DataStream+each) ↺
    * [dataStream.while(func)](#module_scramjet.DataStream+while) ↺
    * [dataStream.until(func)](#module_scramjet.DataStream+until) ↺
    * [dataStream.catch(callback)](#module_scramjet.DataStream+catch) ↺
    * [dataStream.raise(err)](#module_scramjet.DataStream+raise)
    * [dataStream.bufferify(serializer)](#module_scramjet.DataStream+bufferify) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [dataStream.stringify([serializer])](#module_scramjet.DataStream+stringify) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.toArray([initial])](#module_scramjet.DataStream+toArray) ⇄ <code>Array.&lt;any&gt;</code>
    * [dataStream.toGenerator()](#module_scramjet.DataStream+toGenerator)  <code>Generator.&lt;Promise.&lt;any&gt;&gt;</code>
    * [dataStream.pull(pullable)](#module_scramjet.DataStream+pull) ⇄ <code>Promise.&lt;any&gt;</code>
    * [dataStream.shift(count, func)](#module_scramjet.DataStream+shift) ↺
    * [dataStream.peek(count, func)](#module_scramjet.DataStream+peek) ↺
    * [dataStream.slice([start], [length])](#module_scramjet.DataStream+slice) ↺
    * [dataStream.assign(func)](#module_scramjet.DataStream+assign) ↺
    * [dataStream.empty(callback)](#module_scramjet.DataStream+empty) ↺
    * [dataStream.unshift()](#module_scramjet.DataStream+unshift) ↺
    * [dataStream.endWith(item)](#module_scramjet.DataStream+endWith) ↺
    * [dataStream.accumulate(func, into)](#module_scramjet.DataStream+accumulate) ⇄ <code>Promise.&lt;any&gt;</code>
    * ~~[dataStream.consume(func)](#module_scramjet.DataStream+consume)~~
    * [dataStream.reduceNow(func, into)](#module_scramjet.DataStream+reduceNow) ↺ <code>\*</code>
    * [dataStream.remap(func, [ClassType])](#module_scramjet.DataStream+remap) ↺
    * [dataStream.flatMap(func, [ClassType])](#module_scramjet.DataStream+flatMap) ↺
    * [dataStream.flatten()](#module_scramjet.DataStream+flatten) ↺ [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [dataStream.concat()](#module_scramjet.DataStream+concat) ↺
    * [dataStream.join(item)](#module_scramjet.DataStream+join) ↺
    * [dataStream.keep([count])](#module_scramjet.DataStream+keep) ↺
    * [dataStream.rewind([count])](#module_scramjet.DataStream+rewind) ↺
    * [dataStream.stack([count], [drop])](#module_scramjet.DataStream+stack) ↺
    * [dataStream.distribute([affinity], [clusterFunc], [options])](#module_scramjet.DataStream+distribute) ↺
    * [dataStream.separateInto(streams, affinity)](#module_scramjet.DataStream+separateInto) ↺
    * [dataStream.separate(affinity, [createOptions], [ClassType])](#module_scramjet.DataStream+separate) ↺ [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream)
    * [dataStream.delegate(delegateFunc, worker, [plugins])](#module_scramjet.DataStream+delegate) ↺
    * [dataStream.rate(cps, [options])](#module_scramjet.DataStream+rate) ↺
    * [dataStream.batch(count)](#module_scramjet.DataStream+batch) ↺
    * [dataStream.timeBatch(ms, [count])](#module_scramjet.DataStream+timeBatch) ↺
    * [dataStream.nagle([size], [ms])](#module_scramjet.DataStream+nagle) ↺
    * [dataStream.window(length)](#module_scramjet.DataStream+window) ↺ [<code>WindowStream</code>](window-stream.md#module_scramjet.WindowStream)
    * [dataStream.toJSONArray([enclosure])](#module_scramjet.DataStream+toJSONArray) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.toJSONObject([entryCallback], [enclosure])](#module_scramjet.DataStream+toJSONObject) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.JSONStringify([endline])](#module_scramjet.DataStream+JSONStringify) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.CSVStringify([options])](#module_scramjet.DataStream+CSVStringify) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.exec(command, [options])](#module_scramjet.DataStream+exec)
    * [dataStream.debug(func)](#module_scramjet.DataStream+debug) ↺ [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [dataStream.toBufferStream(serializer)](#module_scramjet.DataStream+toBufferStream) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [dataStream.toStringStream([serializer])](#module_scramjet.DataStream+toStringStream) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [dataStream.toBufferStream(serializer)](#module_scramjet.DataStream+toBufferStream) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [dataStream.toStringStream([serializer])](#module_scramjet.DataStream+toStringStream) ↺ [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [DataStream:from(input, [options])](#module_scramjet.DataStream.from)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [DataStream:pipeline(readable)](#module_scramjet.DataStream.pipeline)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [DataStream:fromArray(array, [options])](#module_scramjet.DataStream.fromArray)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [DataStream:fromIterator(iterator, [options])](#module_scramjet.DataStream.fromIterator)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)

<a name="new_module_scramjet.DataStream_new"></a>

### new DataStream([opts])
Create the DataStream.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | Stream options passed to superclass |

<a name="module_scramjet.DataStream+map"></a>

### dataStream.map(func, [ClassType]) ↺
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

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-map.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) |  | The function that creates the new object |
| [ClassType] | <code>function</code> | <code>this.constructor</code> | The class to be mapped to. |

<a name="module_scramjet.DataStream+filter"></a>

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

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-filter.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](definitions.md#module_scramjet..FilterCallback) | The function that filters the object |

<a name="module_scramjet.DataStream+reduce"></a>

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

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Test**: test/methods/data-stream-reduce.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>ReduceCallback</code>](definitions.md#module_scramjet..ReduceCallback) | The into object will be passed as the  first argument, the data object from the stream as the second. |
| into | <code>object</code> | Any object passed initially to the transform function |

<a name="module_scramjet.DataStream+do"></a>

### dataStream.do(func) ↺
Perform an asynchronous operation without changing or resuming the stream.

In essence the stream will use the call to keep the backpressure, but the resolving value
has no impact on the streamed data (except for possible mutation of the chunk itself)

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>DoCallback</code>](definitions.md#module_scramjet..DoCallback) | the async function |

<a name="module_scramjet.DataStream+all"></a>

### dataStream.all(functions) ↺
Processes a number of functions in parallel, returns a stream of arrays of results.

This method is to allow running multiple asynchronous operations and receive all the
results at one, just like Promise.all behaves.

Keep in mind that if one of your methods rejects, this behaves just like Promise.all
you won't be able to receive partial results.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-all.js  

| Param | Type | Description |
| --- | --- | --- |
| functions | <code>Array.&lt;function()&gt;</code> | list of async functions to run |

<a name="module_scramjet.DataStream+race"></a>

### dataStream.race(functions) ↺
Processes a number of functions in parallel, returns the first resolved.

This method is to allow running multiple asynchronous operations awaiting just the
result of the quickest to execute, just like Promise.race behaves.

Keep in mind that if one of your methods it will only raise an error if that was
the first method to reject.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-race.js  

| Param | Type | Description |
| --- | --- | --- |
| functions | <code>Array.&lt;function()&gt;</code> | list of async functions to run |

<a name="module_scramjet.DataStream+unorder"></a>

### dataStream.unorder(func)
Allows processing items without keeping order

This method useful if you are not concerned about the order in which the
chunks are being pushed out of the operation. The `maxParallel` option is
still used for keeping a number of simultaneous number of parallel operations
that are currently happening.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) | the async function that will be unordered |

<a name="module_scramjet.DataStream+into"></a>

### dataStream.into(func, into) ↺
Allows own implementation of stream chaining.

The async Function is called on every chunk and should implement writes in it's own way. The
resolution will be awaited for flow control. The passed `into` argument is passed as the first
argument to every call.

It returns the DataStream passed as the second argument.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-into.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>IntoCallback</code>](definitions.md#module_scramjet..IntoCallback) | the method that processes incoming chunks |
| into | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | the DataStream derived class |

<a name="module_scramjet.DataStream+use"></a>

### dataStream.use(func) ↺
Calls the passed method in place with the stream as first argument, returns result.

The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
from the command line.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-use.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) \| <code>string</code> \| <code>Readable</code> | if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain. Alternatively this can be a relative path to a scramjet-module. Lastly it can be a Transform stream. |
| ...parameters | <code>Array.&lt;any&gt;</code> | any additional parameters top be passed to the module |

<a name="module_scramjet.DataStream+run"></a>

### dataStream.run() ⇄
Consumes all stream items doing nothing. Resolves when the stream is ended.

This is very convienient if you're looking to use up the stream in operations that work on each entry like `map`. This uncorks the stream
and allows all preceding operations to be run at any speed.

All the data of the current stream will be discarded.

The function returns a promise that is resolved when the stream ends.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
<a name="module_scramjet.DataStream+tap"></a>

### dataStream.tap() ↺
Stops merging transform Functions at the current place in the command chain.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-tap.js  
<a name="module_scramjet.DataStream+whenRead"></a>

### dataStream.whenRead() ⇄
Reads a chunk from the stream and resolves the promise when read.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
<a name="module_scramjet.DataStream+whenWrote"></a>

### dataStream.whenWrote(chunk) ⇄
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | a chunk to write |
| ...more | <code>Array.&lt;any&gt;</code> | more chunks to write |

<a name="module_scramjet.DataStream+whenEnd"></a>

### dataStream.whenEnd() ⇄
Resolves when stream ends - rejects on uncaught error

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
<a name="module_scramjet.DataStream+whenDrained"></a>

### dataStream.whenDrained() ⇄
Returns a promise that resolves when the stream is drained

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
<a name="module_scramjet.DataStream+whenError"></a>

### dataStream.whenError() ⇄
Returns a promise that resolves (!) when the stream is errors

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
<a name="module_scramjet.DataStream+setOptions"></a>

### dataStream.setOptions(options) ↺
Allows resetting stream options.

It's much easier to use this in chain than constructing new stream:

```javascript
    stream.map(myMapper).filter(myFilter).setOptions({maxParallel: 2})
```

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.conditions**: keep-order,chain  

| Param | Type |
| --- | --- |
| options | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | 

<a name="module_scramjet.DataStream+copy"></a>

### dataStream.copy(func) ↺
Returns a copy of the stream

Creates a new stream and pushes all the data from the current one to the new one.
This can be called serveral times.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>TeeCallback</code>](definitions.md#module_scramjet..TeeCallback) \| <code>Writable</code> | The duplicate stream will be passed as first argument. |

<a name="module_scramjet.DataStream+tee"></a>

### dataStream.tee(func) ↺
Duplicate the stream

Creates a duplicate stream instance and passes it to the Function.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-tee.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>TeeCallback</code>](definitions.md#module_scramjet..TeeCallback) \| <code>Writable</code> | The duplicate stream will be passed as first argument. |

<a name="module_scramjet.DataStream+each"></a>

### dataStream.each(func) ↺
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)``` but with flow control.
Warning: this resumes the stream!

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) | a Function called for each chunk. |

<a name="module_scramjet.DataStream+while"></a>

### dataStream.while(func) ↺
Reads the stream while the function outcome is truthy.

Stops reading and emits end as soon as it finds the first chunk that evaluates
to false. If you're processing a file until a certain point or you just need to
confirm existence of some data, you can use it to end the stream before reaching end.

Keep in mind that whatever you piped to the stream will still need to be handled.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-while.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](definitions.md#module_scramjet..FilterCallback) | The condition check |

<a name="module_scramjet.DataStream+until"></a>

### dataStream.until(func) ↺
Reads the stream until the function outcome is truthy.

Works opposite of while.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-until.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](definitions.md#module_scramjet..FilterCallback) | The condition check |

<a name="module_scramjet.DataStream+catch"></a>

### dataStream.catch(callback) ↺
Provides a way to catch errors in chained streams.

The handler will be called as asynchronous
 - if it resolves then the error will be muted.
 - if it rejects then the error will be passed to the next handler

If no handlers will resolve the error, an `error` event will be emitted

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-catch.js  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Error handler (async function) |

<a name="module_scramjet.DataStream+raise"></a>

### dataStream.raise(err) ⇄
Executes all error handlers and if none resolves, then emits an error.

The returned promise will always be resolved even if there are no successful handlers.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Test**: test/methods/data-stream-raise.js  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The thrown error |

<a name="module_scramjet.DataStream+bufferify"></a>

### dataStream.bufferify(serializer) : BufferStream ↺
Creates a BufferStream.

The passed serializer must return a buffer.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - the resulting stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tobufferstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) | A method that converts chunks to buffers |

<a name="module_scramjet.DataStream+stringify"></a>

### dataStream.stringify([serializer]) : StringStream ↺
Creates a StringStream.

The passed serializer must return a string. If no serializer is passed chunks
toString method will be used.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - the resulting stream  
**Test**: test/methods/data-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| [serializer] | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) \| <code>never</code> | A method that converts chunks to strings |

<a name="module_scramjet.DataStream+toArray"></a>

### dataStream.toArray([initial]) : Array.<any> ⇄
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [initial] | <code>Array</code> | <code>[]</code> | Array to begin with (defaults to an empty array). |

<a name="module_scramjet.DataStream+toGenerator"></a>

### dataStream.toGenerator() : Generator.<Promise.<any>>
Returns an async generator

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Returns**: <code>Generator.&lt;Promise.&lt;any&gt;&gt;</code> - Returns an iterator that returns a promise for each item.  
<a name="module_scramjet.DataStream+pull"></a>

### dataStream.pull(pullable) : Promise.<any> ⇄
Pulls in any readable stream, resolves when the pulled stream ends.

You can also pass anything that can be passed to `DataStream.from`.

Does not preserve order, does not end this stream.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Returns**: <code>Promise.&lt;any&gt;</code> - resolved when incoming stream ends, rejects on incoming error  
**Test**: test/methods/data-stream-pull.js  

| Param | Type | Description |
| --- | --- | --- |
| pullable | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> |  |
| ...args | <code>Array.&lt;any&gt;</code> | any additional args |

<a name="module_scramjet.DataStream+shift"></a>

### dataStream.shift(count, func) ↺
Shifts the first n items from the stream and pushes out the remaining ones.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of items to shift. |
| func | [<code>ShiftCallback</code>](definitions.md#module_scramjet..ShiftCallback) | Function that receives an array of shifted items |

<a name="module_scramjet.DataStream+peek"></a>

### dataStream.peek(count, func) ↺
Allows previewing some of the streams data without removing them from the stream.

Important: Peek does not resume the flow.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of items to view before |
| func | [<code>ShiftCallback</code>](definitions.md#module_scramjet..ShiftCallback) | Function called before other streams |

<a name="module_scramjet.DataStream+slice"></a>

### dataStream.slice([start], [length]) ↺
Slices out a part of the stream to the passed Function.

Returns a stream consisting of an array of items with `0` to `start`
omitted and `length` items after `start` included. Works similarly to
Array.prototype.slice.

Takes count from the moment it's called. Any previous items will not be
taken into account.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-slice.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>number</code> | <code>0</code> | omit this number of entries. |
| [length] | <code>number</code> | <code>Infinity</code> | get this number of entries to the resulting stream |

<a name="module_scramjet.DataStream+assign"></a>

### dataStream.assign(func) ↺
Transforms stream objects by assigning the properties from the returned
data along with data from original ones.

The original objects are unaltered.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-assign.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) \| <code>object</code> | The function that returns new object properties or just the new properties |

<a name="module_scramjet.DataStream+empty"></a>

### dataStream.empty(callback) ↺
Called only before the stream ends without passing any items

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-empty.js  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function called when stream ends |

<a name="module_scramjet.DataStream+unshift"></a>

### dataStream.unshift() ↺
Pushes any data at call time (essentially at the beginning of the stream)

This is a synchronous only function.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| ...item | <code>Array.&lt;any&gt;</code> | list of items to unshift (you can pass more items) |

<a name="module_scramjet.DataStream+endWith"></a>

### dataStream.endWith(item) ↺
Pushes any data at end of stream

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-endwith.js  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to push at end |

<a name="module_scramjet.DataStream+accumulate"></a>

### dataStream.accumulate(func, into) : Promise.<any> ⇄
Accumulates data into the object.

Works very similarly to reduce, but result of previous operations have
no influence over the accumulator in the next one.

Method works in parallel.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Returns**: <code>Promise.&lt;any&gt;</code> - resolved with the "into" object on stream end.  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-accumulate.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>AccumulateCallback</code>](definitions.md#module_scramjet..AccumulateCallback) | The accumulation function |
| into | <code>\*</code> | Accumulator object |

<a name="module_scramjet.DataStream+consume"></a>

### ~~dataStream.consume(func) ⇄~~
***Deprecated***

Consumes the stream by running each Function

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>ConsumeCallback</code>](definitions.md#module_scramjet..ConsumeCallback) \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> | the consument |
| ...args | <code>Array.&lt;any&gt;</code> | additional args will be passed to generators |

<a name="module_scramjet.DataStream+reduceNow"></a>

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

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: <code>\*</code> - whatever was passed as into  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-reduceNow.js  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>ReduceCallback</code>](definitions.md#module_scramjet..ReduceCallback) | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> \| <code>EventEmitter</code> | Any object passed initially to the transform  function |

<a name="module_scramjet.DataStream+remap"></a>

### dataStream.remap(func, [ClassType]) ↺
Remaps the stream into a new stream.

This means that every item may emit as many other items as we like.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-remap.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | [<code>RemapCallback</code>](definitions.md#module_scramjet..RemapCallback) |  | A Function that is called on every chunk |
| [ClassType] | <code>function</code> | <code>this.constructor</code> | Optional DataStream subclass to be constructed |

<a name="module_scramjet.DataStream+flatMap"></a>

### dataStream.flatMap(func, [ClassType]) ↺
Takes any method that returns any iterable and flattens the result.

The passed Function must return an iterable (otherwise an error will be emitted). The resulting stream will
consist of all the items of the returned iterables, one iterable after another.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-flatmap.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | [<code>FlatMapCallback</code>](definitions.md#module_scramjet..FlatMapCallback) |  | A Function that is called on every chunk |
| [ClassType] | <code>function</code> | <code>this.constructor</code> | Optional DataStream subclass to be constructed |
| ...args | <code>Array.&lt;any&gt;</code> |  | additional args will be passed to generators |

<a name="module_scramjet.DataStream+flatten"></a>

### dataStream.flatten() : DataStream ↺
A shorthand for streams of arrays or iterables to flatten them.

More efficient equivalent of: `.flatmap(i => i);`
Works on streams of async iterables too.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-flatten.js  
<a name="module_scramjet.DataStream+concat"></a>

### dataStream.concat() ↺
Returns a new stream that will append the passed streams to the callee

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-concat.js  

| Param | Type | Description |
| --- | --- | --- |
| ...streams | <code>Array.&lt;Readable&gt;</code> | Streams to be injected into the current stream |

<a name="module_scramjet.DataStream+join"></a>

### dataStream.join(item) ↺
Method will put the passed object between items. It can also be a function call or generator / iterator.

If a generator or iterator is passed, when the iteration is done no items will be interweaved.
Generator receives

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-join.js  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| [<code>JoinCallback</code>](definitions.md#module_scramjet..JoinCallback) | An object that should be interweaved between stream items |
| ...args | <code>Array.&lt;any&gt;</code> | additional args will be passed to generators |

<a name="module_scramjet.DataStream+keep"></a>

### dataStream.keep([count]) ↺
Keep a buffer of n-chunks for use with {@see DataStream..rewind}

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-keep.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>number</code> | <code>Infinity</code> | Number of objects or -1 for all the stream |

<a name="module_scramjet.DataStream+rewind"></a>

### dataStream.rewind([count]) ↺
Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>number</code> | <code>Infinity</code> | Number of objects or -1 for all the buffer |

<a name="module_scramjet.DataStream+stack"></a>

### dataStream.stack([count], [drop]) ↺
Returns a stream that stacks up incoming items always feeding out the newest items first.
It returns the older items when read

When the stack length exceeds the given `count` the given `drop` function is awaited
and used for flow control.

By default the drop function ignores and quietly disposes of items not read before overflow.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-stack.js  

| Param | Type | Default |
| --- | --- | --- |
| [count] | <code>number</code> | <code>1000</code> | 
| [drop] | <code>function</code> |  | 

<a name="module_scramjet.DataStream+distribute"></a>

### dataStream.distribute([affinity], [clusterFunc], [options]) ↺
Distributes processing into multiple sub-processes or threads if you like.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-distribute.js  
**Todo**

- [ ] Currently order is not kept.
- [ ] Example test breaks travis-ci build


| Param | Type | Description |
| --- | --- | --- |
| [affinity] | [<code>AffinityCallback</code>](definitions.md#module_scramjet..AffinityCallback) \| <code>function</code> \| <code>number</code> | A Function that affixes the item to specific output stream which must exist in the object for each chunk, must return a string. A number may be passed to identify how many round-robin threads to start up. Defaults to Round Robin to twice the number of CPU threads. |
| [clusterFunc] | <code>function</code> \| [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | stream transforms similar to {@see DataStream#use method} |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | Options |

<a name="module_scramjet.DataStream+separateInto"></a>

### dataStream.separateInto(streams, affinity) ↺
Separates stream into a hash of streams. Does not create new streams!

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>object</code> | the object hash of streams. Keys must be the outputs of the affinity function |
| affinity | [<code>AffinityCallback</code>](definitions.md#module_scramjet..AffinityCallback) | the Function that affixes the item to specific streams which must exist in the object for each chunk. |

<a name="module_scramjet.DataStream+separate"></a>

### dataStream.separate(affinity, [createOptions], [ClassType]) : MultiStream ↺
Separates execution to multiple streams using the hashes returned by the passed Function.

Calls the given Function for a hash, then makes sure all items with the same hash are processed within a single
stream. Thanks to that streams can be distributed to multiple threads.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream) - separated stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-separate.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| affinity | [<code>AffinityCallback</code>](definitions.md#module_scramjet..AffinityCallback) |  | the affinity function |
| [createOptions] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) |  | options to use to create the separated streams |
| [ClassType] | <code>function</code> | <code>this.constructor</code> | options to use to create the separated streams |

<a name="module_scramjet.DataStream+delegate"></a>

### dataStream.delegate(delegateFunc, worker, [plugins]) ↺
Delegates work to a specified worker.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delegateFunc | [<code>DelegateCallback</code>](definitions.md#module_scramjet..DelegateCallback) |  | A function to be run in the sub-thread. |
| worker | [<code>StreamWorker</code>](stream-worker.md#module_scramjet.StreamWorker) |  |  |
| [plugins] | <code>Array</code> | <code>[]</code> |  |

<a name="module_scramjet.DataStream+rate"></a>

### dataStream.rate(cps, [options]) ↺
Limit the rate of the stream to a given number of chunks per second or given timeframe.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cps | <code>number</code> |  | Chunks per timeframe, the default timeframe is 1000 ms. |
| [options] | [<code>RateOptions</code>](definitions.md#module_scramjet..RateOptions) | <code>{}</code> | Options for the limiter controlling the timeframe and time source. Both must work on same units. |

<a name="module_scramjet.DataStream+batch"></a>

### dataStream.batch(count) ↺
Aggregates chunks in arrays given number of number of items long.

This can be used for micro-batch processing.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Test**: test/methods/data-stream-batch.js  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | How many items to aggregate |

<a name="module_scramjet.DataStream+timeBatch"></a>

### dataStream.timeBatch(ms, [count]) ↺
Aggregates chunks to arrays not delaying output by more than the given number of ms.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-timebatch.js  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Maximum amount of milliseconds |
| [count] | <code>number</code> | Maximum number of items in batch (otherwise no limit) |

<a name="module_scramjet.DataStream+nagle"></a>

### dataStream.nagle([size], [ms]) ↺
Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
in bulk.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Todo**

- [ ] needs more work, for now it's simply waiting some time, not checking the queues.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>32</code> | maximum number of items to wait for |
| [ms] | <code>number</code> | <code>10</code> | milliseconds to wait for more data |

<a name="module_scramjet.DataStream+window"></a>

### dataStream.window(length) : WindowStream ↺
Returns a WindowStream of the specified length

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>WindowStream</code>](window-stream.md#module_scramjet.WindowStream) - a stream of array's  
**Meta.noreadme**:   

| Param | Type |
| --- | --- |
| length | <code>number</code> | 

<a name="module_scramjet.DataStream+toJSONArray"></a>

### dataStream.toJSONArray([enclosure]) : StringStream ↺
Transforms the stream to a streamed JSON array.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tojsonarray.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [enclosure] | <code>Iterable.&lt;any&gt;</code> | <code>&#x27;[]&#x27;</code> | Any iterable object of two items (beginning and end) |

<a name="module_scramjet.DataStream+toJSONObject"></a>

### dataStream.toJSONObject([entryCallback], [enclosure]) : StringStream ↺
Transforms the stream to a streamed JSON object.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Meta.noreadme**:   
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tojsonobject.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entryCallback] | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) |  | async function returning an entry (array of [key, value]) |
| [enclosure] | <code>Iterable.&lt;any&gt;</code> | <code>&#x27;{}&#x27;</code> | Any iterable object of two items (beginning and end) |

<a name="module_scramjet.DataStream+JSONStringify"></a>

### dataStream.JSONStringify([endline]) : StringStream ↺
Returns a StringStream containing JSON per item with optional end line

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - output stream  
**Meta.noreadme**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [endline] | <code>Boolean</code> \| <code>string</code> | <code>os.EOL</code> | whether to add endlines (boolean or string as delimiter) |

<a name="module_scramjet.DataStream+CSVStringify"></a>

### dataStream.CSVStringify([options]) : StringStream ↺
Stringifies CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - stream of parsed items  
**Test**: test/methods/data-stream-csv.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | options for the papaparse.unparse module. |

<a name="module_scramjet.DataStream+exec"></a>

### dataStream.exec(command, [options])
Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.

Pipes the current stream into the sub-processes stdin.
The data is serialized and deserialized as JSON lines by default. You
can provide your own alternative methods in the ExecOptions object.

Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Test**: test/methods/data-stream-exec.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>string</code> |  | command to execute |
| [options] | [<code>ExecDataOptions</code>](definitions.md#module_scramjet..ExecDataOptions) \| <code>any</code> | <code>{}</code> | options to be passed to `spawn` and defining serialization. |
| ...args | <code>Array.&lt;string&gt;</code> |  | additional args will be passed to function |

<a name="module_scramjet.DataStream+debug"></a>

### dataStream.debug(func) : DataStream ↺
Injects a ```debugger``` statement when called.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - self  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-debug.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self to add an option to inspect the stream in place, while not breaking the transform chain |

<a name="module_scramjet.DataStream+toBufferStream"></a>

### dataStream.toBufferStream(serializer) : BufferStream ↺
Creates a BufferStream.

The passed serializer must return a buffer.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - the resulting stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tobufferstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) | A method that converts chunks to buffers |

<a name="module_scramjet.DataStream+toStringStream"></a>

### dataStream.toStringStream([serializer]) : StringStream ↺
Creates a StringStream.

The passed serializer must return a string. If no serializer is passed chunks
toString method will be used.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - the resulting stream  
**Test**: test/methods/data-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| [serializer] | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) \| <code>never</code> | A method that converts chunks to strings |

<a name="module_scramjet.DataStream+toBufferStream"></a>

### dataStream.toBufferStream(serializer) : BufferStream ↺
Creates a BufferStream.

The passed serializer must return a buffer.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - the resulting stream  
**Meta.noreadme**:   
**Test**: test/methods/data-stream-tobufferstream.js  

| Param | Type | Description |
| --- | --- | --- |
| serializer | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) | A method that converts chunks to buffers |

<a name="module_scramjet.DataStream+toStringStream"></a>

### dataStream.toStringStream([serializer]) : StringStream ↺
Creates a StringStream.

The passed serializer must return a string. If no serializer is passed chunks
toString method will be used.

**Kind**: instance method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Chainable**  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - the resulting stream  
**Test**: test/methods/data-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| [serializer] | [<code>MapCallback</code>](definitions.md#module_scramjet..MapCallback) \| <code>never</code> | A method that converts chunks to strings |

<a name="module_scramjet.DataStream.from"></a>

### DataStream:from(input, [options]) : DataStream
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
     while(x < 100) yield {x: x++};
  })
  .each(console.log)
  // {x: 0}
  // {x: 1}
  // ...
  // {x: 99}
```

**Kind**: static method of [<code>DataStream</code>](#module_scramjet.DataStream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>Promise.&lt;any&gt;</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> |  | argument to be turned into new stream |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) \| <code>Writable</code> | <code>{}</code> | options for creation of a new stream or the target stream |
| ...args | <code>Array.&lt;any&gt;</code> |  | additional arguments for the stream - will be passed to the function or generator |

<a name="module_scramjet.DataStream.pipeline"></a>

### DataStream:pipeline(readable) : DataStream
Creates a pipeline of streams and returns a scramjet stream.

This is similar to node.js stream pipeline method, but also takes scramjet modules
as possibilities in an array of transforms. It may be used to run a series of non-scramjet
transform streams.

The first argument is anything streamable and will be sanitized by [DataStream..from](DataStream..from).

Each following argument will be understood as a transform and can be any of:
* AsyncFunction or Function - will be executed by [DataStream..use](DataStream..use)
* A transform stream that will be piped to the preceding stream

**Kind**: static method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - a new DataStream instance of the resulting pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| ...transforms | <code>Array.&lt;(AsyncFunction\|function()\|Transform)&gt;</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="module_scramjet.DataStream.fromArray"></a>

### DataStream:fromArray(array, [options]) : DataStream
Create a DataStream from an Array

**Kind**: static method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Test**: test/methods/data-stream-fromarray.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>Array.&lt;\*&gt;</code> |  | list of chunks |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | the read stream options |

<a name="module_scramjet.DataStream.fromIterator"></a>

### DataStream:fromIterator(iterator, [options]) : DataStream
Create a DataStream from an Iterator

Doesn't end the stream until it reaches end of the iterator.

**Kind**: static method of [<code>DataStream</code>](#module_scramjet.DataStream)  
**Test**: test/methods/data-stream-fromiterator.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>Iterator.&lt;any&gt;</code> |  | the iterator object |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | the read stream options |

