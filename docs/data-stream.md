## Classes

<dl>
<dt><a href="#DataStream">DataStream</a> ⇐ <code>stream.PassThrough</code></dt>
<dd><p>DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.</p>
<pre><code class="lang-javascript"> await (DataStream.fromArray([1,2,3,4,5]) // create a DataStream
     .map(readFile)                       // read some data asynchronously
     .map(sendToApi)                      // send the data somewhere
     .whenEnd());                         // wait until end
</code></pre>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#toStringStream">toStringStream()</a></dt>
<dd><p>Alias for <a href="#DataStream+stringify">stringify</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MapCallback">MapCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#FilterCallback">FilterCallback</a> ⇒ <code>Promise</code> | <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#ReduceCallback">ReduceCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#IntoCallback">IntoCallback</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#TeeCallback">TeeCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#StreamOptions">StreamOptions</a> : <code>Object</code></dt>
<dd><p>Standard options for scramjet streams.</p>
</dd>
</dl>

<a name="DataStream"></a>

## DataStream ⇐ <code>stream.PassThrough</code>
DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.

```javascript
 await (DataStream.fromArray([1,2,3,4,5]) // create a DataStream
     .map(readFile)                       // read some data asynchronously
     .map(sendToApi)                      // send the data somewhere
     .whenEnd());                         // wait until end
```

**Kind**: global class  
**Extends**: <code>stream.PassThrough</code>  

* [DataStream](#DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_DataStream_new)
    * _instance_
        * [.map(func, Clazz)](#DataStream+map) ⇒ [<code>DataStream</code>](#DataStream)
        * [.filter(func)](#DataStream+filter) ⇒ [<code>DataStream</code>](#DataStream)
        * [.reduce(func, into)](#DataStream+reduce) ⇒ <code>Promise</code>
        * [.into(func, into)](#DataStream+into) ⇒ [<code>DataStream</code>](#DataStream)
        * [.use(func)](#DataStream+use) ⇒ <code>\*</code>
        * [.tee(func)](#DataStream+tee) ⇒ [<code>DataStream</code>](#DataStream)
        * [.each(func)](#DataStream+each) ↩︎
        * [.while(func)](#DataStream+while) ⇒ [<code>DataStream</code>](#DataStream)
        * [.until(func)](#DataStream+until) ⇒ [<code>DataStream</code>](#DataStream)
        * [.catch(callback)](#DataStream+catch) ↩︎
        * [.raise(err)](#DataStream+raise) ⇒ <code>Promise</code>
        * [.pipe(to, options)](#DataStream+pipe) ⇒ <code>Writable</code>
        * [.bufferify(serializer)](#DataStream+bufferify) ⇒ <code>BufferStream</code>
        * [.stringify(serializer)](#DataStream+stringify) ⇒ <code>StringStream</code>
        * [.run()](#DataStream+run) ⇒ <code>Promise</code>
        * [.toArray(initial)](#DataStream+toArray) ⇒ <code>Promise</code>
        * [.toGenerator()](#DataStream+toGenerator) ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
        * [.tap()](#DataStream+tap)
        * [.whenRead()](#DataStream+whenRead) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.whenWrote(...data)](#DataStream+whenWrote) ⇒ <code>Promise</code>
        * [.whenEnd()](#DataStream+whenEnd) ⇒ <code>Promise</code>
        * [.whenDrained()](#DataStream+whenDrained) ⇒ <code>Promise</code>
        * [.whenError()](#DataStream+whenError) ⇒ <code>Promise</code>
        * [.setOptions(options)](#DataStream+setOptions) ↩︎
        * [.shift(count, func)](#DataStream+shift) ⇒ [<code>DataStream</code>](#DataStream)
        * [.peek(count, func)](#DataStream+peek) ↩︎
        * [.slice([start], [length])](#DataStream+slice) ⇒ [<code>DataStream</code>](#DataStream)
        * [.assign(func)](#DataStream+assign) ⇒ [<code>DataStream</code>](#DataStream)
        * [.empty(callback)](#DataStream+empty) ↩︎
        * [.unshift(item)](#DataStream+unshift) ↩︎
        * [.endWith(item)](#DataStream+endWith) ↩︎
        * [.accumulate(func, into)](#DataStream+accumulate) ⇒ <code>Promise</code>
        * ~~[.consume(func)](#DataStream+consume) ⇒ <code>Promise</code>~~
        * [.reduceNow(func, into)](#DataStream+reduceNow) ⇒ <code>\*</code>
        * [.remap(func, Clazz)](#DataStream+remap) ⇒ [<code>DataStream</code>](#DataStream)
        * [.flatMap(func, Clazz)](#DataStream+flatMap) ⇒ [<code>DataStream</code>](#DataStream)
        * [.flatten()](#DataStream+flatten) ⇒ [<code>DataStream</code>](#DataStream)
        * [.concat(streams)](#DataStream+concat) ↩︎
        * [.join(item)](#DataStream+join) ↩︎
        * [.distribute([affinity], clusterFunc, options)](#DataStream+distribute) ↩︎
        * [.separateInto(streams, affinity)](#DataStream+separateInto) ↩︎
        * [.separate(affinity, createOptions)](#DataStream+separate) ⇒ <code>MultiStream</code>
        * [.delegate(delegateFunc, worker, [plugins])](#DataStream+delegate) ↩︎
        * [.batch(count)](#DataStream+batch) ⇒ [<code>DataStream</code>](#DataStream)
        * [.timeBatch(ms, count)](#DataStream+timeBatch) ⇒ [<code>DataStream</code>](#DataStream)
        * [.nagle([size], [ms])](#DataStream+nagle) ↩︎
        * [.toJSONArray([enclosure])](#DataStream+toJSONArray) ⇒ <code>StringStream</code>
        * [.toJSONObject([entryCallback], [enclosure])](#DataStream+toJSONObject) ⇒ <code>StringStream</code>
        * [.JSONStringify([endline])](#DataStream+JSONStringify) ⇒ <code>StringStream</code>
        * [.CSVStringify(options)](#DataStream+CSVStringify) ⇒ <code>StringStream</code>
        * [.debug(func)](#DataStream+debug) ⇒ [<code>DataStream</code>](#DataStream)
    * _static_
        * [.fromArray(arr)](#DataStream.fromArray) ⇒ [<code>DataStream</code>](#DataStream)
        * [.fromIterator(iter)](#DataStream.fromIterator) ⇒ [<code>DataStream</code>](#DataStream)

<a name="new_DataStream_new"></a>

### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | [<code>StreamOptions</code>](#StreamOptions) | Stream options passed to superclass |

<a name="DataStream+map"></a>

### dataStream.map(func, Clazz) ⇒ [<code>DataStream</code>](#DataStream)
Transforms stream objects into new ones, just like Array.prototype.map
does.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](#MapCallback) | The function that creates the new object |
| Clazz | <code>Class</code> | (optional) The class to be mapped to. |

**Example**  
```js
[../samples/data-stream-map.js](../samples/data-stream-map.js)
```
<a name="DataStream+filter"></a>

### dataStream.filter(func) ⇒ [<code>DataStream</code>](#DataStream)
Filters object based on the function outcome, just like
Array.prototype.filter.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](#FilterCallback) | The function that filters the object |

**Example**  
```js
[../samples/data-stream-filter.js](../samples/data-stream-filter.js)
```
<a name="DataStream+reduce"></a>

### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulator

Works similarily to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter.

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the call of the transform function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the  first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="DataStream+into"></a>

### dataStream.into(func, into) ⇒ [<code>DataStream</code>](#DataStream)
Pushes the data into another scramjet stream while keeping flow control and

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the object passed as `into`  

| Param | Type | Description |
| --- | --- | --- |
| func |  | [description] |
| into | [<code>DataStream</code>](#DataStream) | [description] |

<a name="DataStream+use"></a>

### dataStream.use(func) ⇒ <code>\*</code>
Calls the passed method in place with the stream as first argument, returns result.

The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
from the command line.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>\*</code> - anything the passed function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> \| <code>String</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain.                         Alternatively this can be a relative path to a scramjet-module. |

**Example**  
```js
[../samples/data-stream-use.js](../samples/data-stream-use.js)
```
<a name="DataStream+tee"></a>

### dataStream.tee(func) ⇒ [<code>DataStream</code>](#DataStream)
Duplicate the stream

Creates a duplicate stream instance and passes it to the callback.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - self  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>TeeCallback</code>](#TeeCallback) | The duplicate stream will be passed as first argument. |

**Example**  
```js
[../samples/data-stream-tee.js](../samples/data-stream-tee.js)
```
<a name="DataStream+each"></a>

### dataStream.each(func) ↩︎
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)``` but with flow control.
Warning: this resumes the stream!

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](#MapCallback) | a callback called for each chunk. |

<a name="DataStream+while"></a>

### dataStream.while(func) ⇒ [<code>DataStream</code>](#DataStream)
Reads the stream while the function outcome is truthy.

Stops reading and emits end as soon as it ends.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](#FilterCallback) | The condition check |

<a name="DataStream+until"></a>

### dataStream.until(func) ⇒ [<code>DataStream</code>](#DataStream)
Reads the stream until the function outcome is truthy.

Works opposite of while.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>FilterCallback</code>](#FilterCallback) | The condition check |

<a name="DataStream+catch"></a>

### dataStream.catch(callback) ↩︎
Provides a way to catch errors in chained streams.

The handler will be called as asynchronous
 - if it resolves then the error will be muted.
 - if it rejects then the error will be passed to the next handler

If no handlers will resolve the error, an `error` event will be emitted

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Error handler (async function) |

<a name="DataStream+raise"></a>

### dataStream.raise(err) ⇒ <code>Promise</code>
Executes all error handlers and if none resolves, then emits an error.

The returned promise will always be resolved even if there are no successful handlers.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - the promise that will be resolved when the error is handled.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The thrown error |

<a name="DataStream+pipe"></a>

### dataStream.pipe(to, options) ⇒ <code>Writable</code>
Override of node.js Readable pipe.

Except for calling overridden method it proxies errors to piped stream.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Writable</code> - the `to` stream  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Writable</code> | Writable stream to write to |
| options | <code>WritableOptions</code> |  |

<a name="DataStream+bufferify"></a>

### dataStream.bufferify(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | [<code>MapCallback</code>](#MapCallback) | A method that converts chunks to buffers |

**Example**  
```js
[../samples/data-stream-tobufferstream.js](../samples/data-stream-tobufferstream.js)
```
<a name="DataStream+stringify"></a>

### dataStream.stringify(serializer) ⇒ <code>StringStream</code>
Creates a StringStream

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | [<code>MapCallback</code>](#MapCallback) | A method that converts chunks to strings |

**Example**  
```js
[../samples/data-stream-tostringstream.js](../samples/data-stream-tostringstream.js)
```
<a name="DataStream+run"></a>

### dataStream.run() ⇒ <code>Promise</code>
Consumes all stream items without doing anything

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - Resolved when the whole stream is read  
<a name="DataStream+toArray"></a>

### dataStream.toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

<a name="DataStream+toGenerator"></a>

### dataStream.toGenerator() ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
Returns an async generator

Ready for https://github.com/tc39/proposal-async-iteration

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code> - Returns an iterator that returns a promise for each item.  
<a name="DataStream+tap"></a>

### dataStream.tap()
Stops merging transform callbacks at the current place in the command chain.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Example**  
```js
[../samples/data-stream-tap.js](../samples/data-stream-tap.js)
```
<a name="DataStream+whenRead"></a>

### dataStream.whenRead() ⇒ <code>Promise.&lt;Object&gt;</code>
Reads a chunk from the stream and resolves the promise when read.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - the read item  
<a name="DataStream+whenWrote"></a>

### dataStream.whenWrote(...data) ⇒ <code>Promise</code>
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Description |
| --- | --- | --- |
| ...data | <code>\*</code> | Chunk(s) to be written before resolving. |

<a name="DataStream+whenEnd"></a>

### dataStream.whenEnd() ⇒ <code>Promise</code>
Resolves when stream ends - rejects on uncaught error

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+whenDrained"></a>

### dataStream.whenDrained() ⇒ <code>Promise</code>
Returns a promise that resolves when the stream is drained

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+whenError"></a>

### dataStream.whenError() ⇒ <code>Promise</code>
Returns a promise that resolves (!) when the stream is errors

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
<a name="DataStream+setOptions"></a>

### dataStream.setOptions(options) ↩︎
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

<a name="DataStream+shift"></a>

### dataStream.shift(count, func) ⇒ [<code>DataStream</code>](#DataStream)
Shifts the first n items from the stream and pipes the other

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - substream.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to shift. |
| func | <code>ShiftCallback</code> | Function that receives an array of shifted items |

**Example**  
```js
[../samples/data-stream-shift.js](../samples/data-stream-shift.js)
```
<a name="DataStream+peek"></a>

### dataStream.peek(count, func) ↩︎
Allows previewing some of the streams data without removing them from the stream.Important: Peek does not resume the flow.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to view before |
| func | <code>ShiftCallback</code> | Function called before other streams |

<a name="DataStream+slice"></a>

### dataStream.slice([start], [length]) ⇒ [<code>DataStream</code>](#DataStream)
Gets a slice of the stream to the callback function.Returns a stream consisting of an array of items with `0` to `start`omitted and `length` items after `start` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not betaken into account.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the affected stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>Number</code> | <code>0</code> | omit this number of entries. |
| [length] | <code>Number</code> | <code>Infinity</code> | get this number of entries to the resulting stream |

**Example**  
```js
[../samples/data-stream-slice.js](../samples/data-stream-slice.js)
```
<a name="DataStream+assign"></a>

### dataStream.assign(func) ⇒ [<code>DataStream</code>](#DataStream)
Transforms stream objects by assigning the properties from the returneddata along with data from original ones.The original objects are unaltered.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>MapCallback</code>](#MapCallback) \| <code>Object</code> | The function that returns new object properties or just the new properties |

**Example**  
```js
[../samples/data-stream-assign.js](../samples/data-stream-assign.js)
```
<a name="DataStream+empty"></a>

### dataStream.empty(callback) ↩︎
Called when the stream ends without passing any items

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function called when stream ends |

**Example**  
```js
[../samples/data-stream-empty.js](../samples/data-stream-empty.js)
```
<a name="DataStream+unshift"></a>

### dataStream.unshift(item) ↩︎
Pushes any data at call time (essentially at the begining of the stream)

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to unshift (you can pass more items) |

<a name="DataStream+endWith"></a>

### dataStream.endWith(item) ↩︎
Pushes any data at end of stream

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to push at end |

**Example**  
```js
[../samples/data-stream-endwith.js](../samples/data-stream-endwith.js)
```
<a name="DataStream+accumulate"></a>

### dataStream.accumulate(func, into) ⇒ <code>Promise</code>
Accumulates data into the object.Works very similarily to reduce, but result of previous operations haveno influence over the accumulator in the next one.Method is parallel

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AccumulateCallback</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

**Example**  
```js
[../samples/data-stream-accumulate.js](../samples/data-stream-accumulate.js)
```
<a name="DataStream+consume"></a>

### ~~dataStream.consume(func) ⇒ <code>Promise</code>~~
***Deprecated***

Consumes the stream by running each callback

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>Promise</code> - resolved on end, rejected on error  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the consument |

<a name="DataStream+reduceNow"></a>

### dataStream.reduceNow(func, into) ⇒ <code>\*</code>
Reduces the stream into the given object, returning it immediately.The main difference to reduce is that only the first object will bereturned at once (however the method will be called with the previousentry).If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.This method is serial - meaning that any processing on an entry willoccur only after the previous entry is fully processed. This does meanit's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>\*</code> - whatever was passed as into  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>ReduceCallback</code>](#ReduceCallback) | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> \| <code>EventEmitter</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)
```
<a name="DataStream+remap"></a>

### dataStream.remap(func, Clazz) ⇒ [<code>DataStream</code>](#DataStream)
Remaps the stream into a new stream.This means that every item may emit as many other items as we like.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>RemapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-remap.js](../samples/data-stream-remap.js)
```
<a name="DataStream+flatMap"></a>

### dataStream.flatMap(func, Clazz) ⇒ [<code>DataStream</code>](#DataStream)
Takes any method that returns any iterable and flattens the result.The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream willconsist of all the items of the returned iterables, one iterable after another.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FlatMapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-flatmap.js](../samples/data-stream-flatmap.js)
```
<a name="DataStream+flatten"></a>

### dataStream.flatten() ⇒ [<code>DataStream</code>](#DataStream)
A shorthand for streams of Arrays to flatten them.Runs: .flatmap(i => i);

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Example**  
```js
[../samples/data-stream-flatten.js](../samples/data-stream-flatten.js)
```
<a name="DataStream+concat"></a>

### dataStream.concat(streams) ↩︎
Returns a new stream that will append the passed streams to the callee

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>\*</code> | Streams to be passed |

**Example**  
```js
[../samples/data-stream-concat.js](../samples/data-stream-concat.js)
```
<a name="DataStream+join"></a>

### dataStream.join(item) ↩︎
Method will put the passed object between items. It can also be a function call.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> \| <code>JoinCallback</code> | An object that should be interweaved between stream items |

**Example**  
```js
[../samples/data-stream-join.js](../samples/data-stream-join.js)
```
<a name="DataStream+distribute"></a>

### dataStream.distribute([affinity], clusterFunc, options) ↩︎
Distributes processing into multiple subprocesses or threads if you like.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**See**: [../samples/data-stream-distribute.js](../samples/data-stream-distribute.js)  
**Todo**

- [ ] Currently order is not kept.
- [ ] Example test breaks travis build


| Param | Type | Description |
| --- | --- | --- |
| [affinity] | <code>AffinityCallback</code> \| <code>Number</code> | Number that runs round-robin the callback function that affixes the item to specific streams which must exist in the object for each chunk. Defaults to Round Robin to twice the number of cpu threads. |
| clusterFunc | <code>MultiStream#ClusterCallback</code> | stream transforms similar to {@see DataStream#use method} |
| options | <code>Object</code> | Options |

<a name="DataStream+separateInto"></a>

### dataStream.separateInto(streams, affinity) ↩︎
Seprates stream into a hash of streams. Does not create new streams!

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | [<code>Object.&lt;DataStream&gt;</code>](#DataStream) | the object hash of streams. Keys must be the outputs of the affinity function |
| affinity | <code>AffinityCallback</code> | the callback function that affixes the item to specific streams which must exist in the object for each chunk. |

<a name="DataStream+separate"></a>

### dataStream.separate(affinity, createOptions) ⇒ <code>MultiStream</code>
Separates execution to multiple streams using the hashes returned by the passed callback.Calls the given callback for a hash, then makes sure all items with the same hash are processed within a singlestream. Thanks to that streams can be distributed to multiple threads.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>MultiStream</code> - separated stream  

| Param | Type | Description |
| --- | --- | --- |
| affinity | <code>AffinityCallback</code> | the callback function |
| createOptions | <code>Object</code> | options to use to create the separated streams |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="DataStream+delegate"></a>

### dataStream.delegate(delegateFunc, worker, [plugins]) ↩︎
Delegates work to a specified worker.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delegateFunc | <code>DelegateCallback</code> |  | A function to be run in the subthread. |
| worker | <code>WorkerStream</code> |  |  |
| [plugins] | <code>Array</code> | <code>[]</code> |  |

<a name="DataStream+batch"></a>

### dataStream.batch(count) ⇒ [<code>DataStream</code>](#DataStream)
Aggregates chunks in arrays given number of number of items long.This can be used for microbatch processing.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | How many items to aggregate |

**Example**  
```js
[../samples/data-stream-batch.js](../samples/data-stream-batch.js)
```
<a name="DataStream+timeBatch"></a>

### dataStream.timeBatch(ms, count) ⇒ [<code>DataStream</code>](#DataStream)
Aggregates chunks to arrays not delaying output by more than the given number of ms.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | Maximum ammount of milliseconds |
| count | <code>Number</code> | Maximum number of items in batch (otherwise no limit) |

**Example**  
```js
[../samples/data-stream-timebatch.js](../samples/data-stream-timebatch.js)
```
<a name="DataStream+nagle"></a>

### dataStream.nagle([size], [ms]) ↩︎
Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases themin bulk.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Chainable**  
**Todo**

- [ ] needs more work, for now it's simply waiting some time, not checking the queues.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>32</code> | maximum number of items to wait for |
| [ms] | <code>number</code> | <code>10</code> | milliseconds to wait for more data |

<a name="DataStream+toJSONArray"></a>

### dataStream.toJSONArray([enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON array.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [enclosure] | <code>Iterable</code> | <code>&#x27;[]&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonarray.js](../samples/data-stream-tojsonarray.js)
```
<a name="DataStream+toJSONObject"></a>

### dataStream.toJSONObject([entryCallback], [enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON object.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>StringStream</code> - [description]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entryCallback] | [<code>MapCallback</code>](#MapCallback) |  | async function returning an entry (array of [key, value]) |
| [enclosure] | <code>Iterable</code> | <code>&#x27;{}&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonobject.js](../samples/data-stream-tojsonobject.js)
```
<a name="DataStream+JSONStringify"></a>

### dataStream.JSONStringify([endline]) ⇒ <code>StringStream</code>
Returns a StringStream containing JSON per item with optional end line

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>StringStream</code> - output stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [endline] | <code>Boolean</code> \| <code>String</code> | <code>os.EOL</code> | whether to add endlines (boolean or string as delimiter) |

<a name="DataStream+CSVStringify"></a>

### dataStream.CSVStringify(options) ⇒ <code>StringStream</code>
Stringifies CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: <code>StringStream</code> - stream of parsed items  

| Param | Description |
| --- | --- |
| options | options for the papaparse.unparse module. |

**Example**  
```js
[../samples/data-stream-csv.js](../samples/data-stream-csv.js)
```
<a name="DataStream+debug"></a>

### dataStream.debug(func) ⇒ [<code>DataStream</code>](#DataStream)
Injects a ```debugger``` statement when called.

**Kind**: instance method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

**Example**  
```js
[../samples/data-stream-debug.js](../samples/data-stream-debug.js)
```
<a name="DataStream.fromArray"></a>

### DataStream.fromArray(arr) ⇒ [<code>DataStream</code>](#DataStream)
Create a DataStream from an Array

**Kind**: static method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | list of chunks |

**Example**  
```js
[../samples/data-stream-fromarray.js](../samples/data-stream-fromarray.js)
```
<a name="DataStream.fromIterator"></a>

### DataStream.fromIterator(iter) ⇒ [<code>DataStream</code>](#DataStream)
Create a DataStream from an Iterator

Doesn't end the stream until it reaches end of the iterator.

**Kind**: static method of [<code>DataStream</code>](#DataStream)  
**Returns**: [<code>DataStream</code>](#DataStream) - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| iter | <code>Iterator</code> | the iterator object |

**Example**  
```js
[../samples/data-stream-fromiterator.js](../samples/data-stream-fromiterator.js)
```
<a name="toStringStream"></a>

## toStringStream()
Alias for [stringify](#DataStream+stringify)

**Kind**: global function  
<a name="MapCallback"></a>

## MapCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="FilterCallback"></a>

## FilterCallback ⇒ <code>Promise</code> \| <code>Boolean</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> \| <code>Boolean</code> - information if the object should remain in
                            the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="ReduceCallback"></a>

## ReduceCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | the accumulator - the object initially passed or retuned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="IntoCallback"></a>

## IntoCallback ⇒ <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>\*</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>Object</code> | source stream chunk |

<a name="TeeCallback"></a>

## TeeCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| teed | [<code>DataStream</code>](#DataStream) | The teed stream |

<a name="StreamOptions"></a>

## StreamOptions : <code>Object</code>
Standard options for scramjet streams.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxParallel | <code>Number</code> | the number of transforms done in parallel |
| referrer | [<code>DataStream</code>](#DataStream) | a referring stream to point to (if possible the transforms will be pushed to it                                 instead of creating a new stream) |

