## Modules

<dl>
<dt><a href="#module_ScramjetCore">ScramjetCore</a></dt>
<dd></dd>
<dt><a href="#module_ScramjetCore">ScramjetCore</a></dt>
<dd></dd>
</dl>

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * _static_
        * [.empty(callback)](#module_ScramjetCore.empty) ↩︎
        * [.concat(streams)](#module_ScramjetCore.concat) ↩︎
        * [.toJSONArray([enclosure])](#module_ScramjetCore.toJSONArray) ⇒ <code>StringStream</code>
        * [.toJSONObject([entryCallback], [enclosure])](#module_ScramjetCore.toJSONObject) ⇒ <code>StringStream</code>
    * _inner_
        * [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
            * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
            * _instance_
                * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
                * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
                * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
                * [.into(func, into)](#module_ScramjetCore..DataStream+into) ⇒ <code>DataStream</code>
                * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
                * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
                * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
                * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
                * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
                * [.catch(callback)](#module_ScramjetCore..DataStream+catch) ↩︎
                * [.raise(err)](#module_ScramjetCore..DataStream+raise) ⇒ <code>Promise</code>
                * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
                * [.bufferify(serializer)](#module_ScramjetCore..DataStream+bufferify) ⇒ <code>BufferStream</code>
                * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
                * [.run()](#module_ScramjetCore..DataStream+run) ⇒ <code>Promise</code>
                * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
                * [.toGenerator()](#module_ScramjetCore..DataStream+toGenerator) ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
                * [._selfInstance()](#module_ScramjetCore..DataStream+_selfInstance) ⇒ <code>DataStream</code>
                * [.shift(count, func)](#module_ScramjetCore..DataStream+shift) ⇒ <code>DataStream</code>
                * [.peek(count, func)](#module_ScramjetCore..DataStream+peek) ↩︎
                * [.slice([start], [length])](#module_ScramjetCore..DataStream+slice) ⇒ <code>DataStream</code>
                * [.assign(func)](#module_ScramjetCore..DataStream+assign) ⇒ <code>DataStream</code>
                * [.unshift(item)](#module_ScramjetCore..DataStream+unshift) ↩︎
                * [.endWith(item)](#module_ScramjetCore..DataStream+endWith) ↩︎
                * [.accumulate(func, into)](#module_ScramjetCore..DataStream+accumulate) ⇒ <code>Promise</code>
                * ~~[.consume(func)](#module_ScramjetCore..DataStream+consume) ⇒ <code>Promise</code>~~
                * [.reduceNow(func, into)](#module_ScramjetCore..DataStream+reduceNow) ⇒ <code>\*</code>
                * [.remap(func, Clazz)](#module_ScramjetCore..DataStream+remap) ⇒ <code>DataStream</code>
                * [.flatMap(func, Clazz)](#module_ScramjetCore..DataStream+flatMap) ⇒ <code>DataStream</code>
                * [.flatten()](#module_ScramjetCore..DataStream+flatten) ⇒ <code>DataStream</code>
                * [.distribute([affinity], clusterFunc, options)](#module_ScramjetCore..DataStream+distribute) ↩︎
                * [.separateInto(streams, affinity)](#module_ScramjetCore..DataStream+separateInto) ↩︎
                * [.separate(affinity, createOptions)](#module_ScramjetCore..DataStream+separate) ⇒ <code>MultiStream</code>
                * [.delegate(delegateFunc, worker, [plugins])](#module_ScramjetCore..DataStream+delegate) ↩︎
                * [.batch(count)](#module_ScramjetCore..DataStream+batch) ⇒ <code>DataStream</code>
                * [.timeBatch(ms, count)](#module_ScramjetCore..DataStream+timeBatch) ⇒ <code>DataStream</code>
                * [.nagle([size], [ms])](#module_ScramjetCore..DataStream+nagle) ↩︎
                * [.JSONStringify([endline])](#module_ScramjetCore..DataStream+JSONStringify) ⇒ <code>StringStream</code>
                * [.CSVStringify(options)](#module_ScramjetCore..DataStream+CSVStringify) ⇒ <code>StringStream</code>
                * [.debug(func)](#module_ScramjetCore..DataStream+debug) ⇒ <code>DataStream</code>
            * _static_
                * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
                * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>
        * [~toStringStream()](#module_ScramjetCore..toStringStream)
        * [~tap()](#module_ScramjetCore..tap)
        * [~whenRead()](#module_ScramjetCore..whenRead) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [~whenWrote()](#module_ScramjetCore..whenWrote) ⇒ <code>Promise</code>
        * [~whenEnd()](#module_ScramjetCore..whenEnd) ⇒ <code>Promise</code>
        * [~whenDrained()](#module_ScramjetCore..whenDrained) ⇒ <code>Promise</code>
        * [~whenDrained()](#module_ScramjetCore..whenDrained) ⇒ <code>Promise</code>
        * [~setOptions(options)](#module_ScramjetCore..setOptions) ↩︎
        * [~join(item)](#module_ScramjetCore..join) ↩︎
        * [~StreamOptions](#module_ScramjetCore..StreamOptions) : <code>Object</code>
        * [~MapCallback](#module_ScramjetCore..MapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~FilterCallback](#module_ScramjetCore..FilterCallback) ⇒ <code>Promise</code> \| <code>Boolean</code>
        * [~ReduceCallback](#module_ScramjetCore..ReduceCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~IntoCallback](#module_ScramjetCore..IntoCallback) ⇒ <code>\*</code>
        * [~TeeCallback](#module_ScramjetCore..TeeCallback) : <code>function</code>
        * [~ShiftCallback](#module_ScramjetCore..ShiftCallback) : <code>function</code>
        * [~AccumulateCallback](#module_ScramjetCore..AccumulateCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~ConsumeCallback](#module_ScramjetCore..ConsumeCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~RemapCallback](#module_ScramjetCore..RemapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~FlatMapCallback](#module_ScramjetCore..FlatMapCallback) ⇒ <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code>
        * [~JoinCallback](#module_ScramjetCore..JoinCallback) ⇒ <code>Promise.&lt;\*&gt;</code> \| <code>\*</code>

<a name="module_ScramjetCore.empty"></a>

### ScramjetCore.empty(callback) ↩︎
Called when the stream ends without passing any items

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function called when stream ends |

**Example**  
```js
[../samples/data-stream-empty.js](../samples/data-stream-empty.js)
```
<a name="module_ScramjetCore.concat"></a>

### ScramjetCore.concat(streams) ↩︎
Returns a new stream that will append the passed streams to the callee

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>\*</code> | Streams to be passed |

**Example**  
```js
[../samples/data-stream-concat.js](../samples/data-stream-concat.js)
```
<a name="module_ScramjetCore.toJSONArray"></a>

### ScramjetCore.toJSONArray([enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON array.

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [enclosure] | <code>Iterable</code> | <code>&#x27;[]&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonarray.js](../samples/data-stream-tojsonarray.js)
```
<a name="module_ScramjetCore.toJSONObject"></a>

### ScramjetCore.toJSONObject([entryCallback], [enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON object.

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>StringStream</code> - [description]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entryCallback] | <code>MapCallback</code> |  | async function returning an entry (array of [key, value]) |
| [enclosure] | <code>Iterable</code> | <code>&#x27;{}&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonobject.js](../samples/data-stream-tojsonobject.js)
```
<a name="module_ScramjetCore..DataStream"></a>

### ScramjetCore~DataStream ⇐ <code>stream.PassThrough</code>
**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Extends**: <code>stream.PassThrough</code>  

* [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
    * _instance_
        * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
        * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
        * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
        * [.into(func, into)](#module_ScramjetCore..DataStream+into) ⇒ <code>DataStream</code>
        * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
        * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
        * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
        * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
        * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
        * [.catch(callback)](#module_ScramjetCore..DataStream+catch) ↩︎
        * [.raise(err)](#module_ScramjetCore..DataStream+raise) ⇒ <code>Promise</code>
        * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
        * [.bufferify(serializer)](#module_ScramjetCore..DataStream+bufferify) ⇒ <code>BufferStream</code>
        * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
        * [.run()](#module_ScramjetCore..DataStream+run) ⇒ <code>Promise</code>
        * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
        * [.toGenerator()](#module_ScramjetCore..DataStream+toGenerator) ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
        * [._selfInstance()](#module_ScramjetCore..DataStream+_selfInstance) ⇒ <code>DataStream</code>
        * [.shift(count, func)](#module_ScramjetCore..DataStream+shift) ⇒ <code>DataStream</code>
        * [.peek(count, func)](#module_ScramjetCore..DataStream+peek) ↩︎
        * [.slice([start], [length])](#module_ScramjetCore..DataStream+slice) ⇒ <code>DataStream</code>
        * [.assign(func)](#module_ScramjetCore..DataStream+assign) ⇒ <code>DataStream</code>
        * [.unshift(item)](#module_ScramjetCore..DataStream+unshift) ↩︎
        * [.endWith(item)](#module_ScramjetCore..DataStream+endWith) ↩︎
        * [.accumulate(func, into)](#module_ScramjetCore..DataStream+accumulate) ⇒ <code>Promise</code>
        * ~~[.consume(func)](#module_ScramjetCore..DataStream+consume) ⇒ <code>Promise</code>~~
        * [.reduceNow(func, into)](#module_ScramjetCore..DataStream+reduceNow) ⇒ <code>\*</code>
        * [.remap(func, Clazz)](#module_ScramjetCore..DataStream+remap) ⇒ <code>DataStream</code>
        * [.flatMap(func, Clazz)](#module_ScramjetCore..DataStream+flatMap) ⇒ <code>DataStream</code>
        * [.flatten()](#module_ScramjetCore..DataStream+flatten) ⇒ <code>DataStream</code>
        * [.distribute([affinity], clusterFunc, options)](#module_ScramjetCore..DataStream+distribute) ↩︎
        * [.separateInto(streams, affinity)](#module_ScramjetCore..DataStream+separateInto) ↩︎
        * [.separate(affinity, createOptions)](#module_ScramjetCore..DataStream+separate) ⇒ <code>MultiStream</code>
        * [.delegate(delegateFunc, worker, [plugins])](#module_ScramjetCore..DataStream+delegate) ↩︎
        * [.batch(count)](#module_ScramjetCore..DataStream+batch) ⇒ <code>DataStream</code>
        * [.timeBatch(ms, count)](#module_ScramjetCore..DataStream+timeBatch) ⇒ <code>DataStream</code>
        * [.nagle([size], [ms])](#module_ScramjetCore..DataStream+nagle) ↩︎
        * [.JSONStringify([endline])](#module_ScramjetCore..DataStream+JSONStringify) ⇒ <code>StringStream</code>
        * [.CSVStringify(options)](#module_ScramjetCore..DataStream+CSVStringify) ⇒ <code>StringStream</code>
        * [.debug(func)](#module_ScramjetCore..DataStream+debug) ⇒ <code>DataStream</code>
    * _static_
        * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
        * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>

<a name="new_module_ScramjetCore..DataStream_new"></a>

#### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>StreamOptions</code> | Stream options passed to superclass |

<a name="module_ScramjetCore..DataStream+map"></a>

#### dataStream.map(func, Clazz) ⇒ <code>DataStream</code>
Transforms stream objects into new ones, just like Array.prototype.map
does.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | The function that creates the new object |
| Clazz | <code>Class</code> | (optional) The class to be mapped to. |

**Example**  
```js
[../samples/data-stream-map.js](../samples/data-stream-map.js)
```
<a name="module_ScramjetCore..DataStream+filter"></a>

#### dataStream.filter(func) ⇒ <code>DataStream</code>
Filters object based on the function outcome, just like
Array.prototype.filter.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The function that filters the object |

**Example**  
```js
[../samples/data-stream-filter.js](../samples/data-stream-filter.js)
```
<a name="module_ScramjetCore..DataStream+reduce"></a>

#### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulator

Works similarily to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter.

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the call of the transform function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the  first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="module_ScramjetCore..DataStream+into"></a>

#### dataStream.into(func, into) ⇒ <code>DataStream</code>
Pushes the data into another scramjet stream while keeping flow control and

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the object passed as `into`  

| Param | Type | Description |
| --- | --- | --- |
| func |  | [description] |
| into | <code>DataStream</code> | [description] |

<a name="module_ScramjetCore..DataStream+use"></a>

#### dataStream.use(func) ⇒ <code>\*</code>
Calls the passed method in place with the stream as first argument, returns result.

The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
from the command line.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>\*</code> - anything the passed function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> \| <code>String</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain.                         Alternatively this can be a relative path to a scramjet-module. |

**Example**  
```js
[../samples/data-stream-use.js](../samples/data-stream-use.js)
```
<a name="module_ScramjetCore..DataStream+tee"></a>

#### dataStream.tee(func) ⇒ <code>DataStream</code>
Duplicate the stream

Creates a duplicate stream instance and pases it to the callback.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TeeCallback</code> | The duplicate stream will be passed as first argument. |

**Example**  
```js
[../samples/data-stream-tee.js](../samples/data-stream-tee.js)
```
<a name="module_ScramjetCore..DataStream+each"></a>

#### dataStream.each(func) ↩︎
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)``` but with flow control.
Warning: this resumes the stream!

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | a callback called for each chunk. |

<a name="module_ScramjetCore..DataStream+while"></a>

#### dataStream.while(func) ⇒ <code>DataStream</code>
Reads the stream while the function outcome is truthy.

Stops reading and emits end as soon as it ends.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="module_ScramjetCore..DataStream+until"></a>

#### dataStream.until(func) ⇒ <code>DataStream</code>
Reads the stream until the function outcome is truthy.

Works oposite of while.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="module_ScramjetCore..DataStream+catch"></a>

#### dataStream.catch(callback) ↩︎
Provides an way to catch errors in chanined streams.

The handler will be called as asynchronous
 - if it resolves then the error will be muted.
 - if it rejects then the error will be passed to the next handler

If no handlers will resolve the error, an `error` event will be emitted

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Error handler (async function) |

<a name="module_ScramjetCore..DataStream+raise"></a>

#### dataStream.raise(err) ⇒ <code>Promise</code>
Executes all error handlers and if none resolves, then emits an error.

The returned promise will always be resolved even if there are no succesful handers.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - the promise that will be resolved when the error is handled.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The thrown error |

<a name="module_ScramjetCore..DataStream+pipe"></a>

#### dataStream.pipe(to, options) ⇒ <code>Writable</code>
Override of node.js Readable pipe.

Except for calling overriden method it proxies errors to piped stream.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Writable</code> - the `to` stream  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Writable</code> | Writable stream to write to |
| options | <code>WritableOptions</code> |  |

<a name="module_ScramjetCore..DataStream+bufferify"></a>

#### dataStream.bufferify(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to buffers |

**Example**  
```js
[../samples/data-stream-tobufferstream.js](../samples/data-stream-tobufferstream.js)
```
<a name="module_ScramjetCore..DataStream+stringify"></a>

#### dataStream.stringify(serializer) ⇒ <code>StringStream</code>
Creates a StringStream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to strings |

**Example**  
```js
[../samples/data-stream-tostringstream.js](../samples/data-stream-tostringstream.js)
```
<a name="module_ScramjetCore..DataStream+run"></a>

#### dataStream.run() ⇒ <code>Promise</code>
Consumes all stream items without doing anything

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Resolved when the whole stream is read  
<a name="module_ScramjetCore..DataStream+toArray"></a>

#### dataStream.toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

<a name="module_ScramjetCore..DataStream+toGenerator"></a>

#### dataStream.toGenerator() ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
Returns an async generator

Ready for https://github.com/tc39/proposal-async-iteration

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code> - Returns an iterator that returns a promise for each item.  
<a name="module_ScramjetCore..DataStream+_selfInstance"></a>

#### dataStream._selfInstance() ⇒ <code>DataStream</code>
Returns a new instance of self.

Normally this doesn't have to be overridden.
When the constructor would use some special arguments this may be used to
override the object construction in [tee](tee)...

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - an empty instance of the same class.  
**Internal**:   
**Example**  
```js
[../samples/data-stream-selfinstance.js](../samples/data-stream-selfinstance.js)
```
<a name="module_ScramjetCore..DataStream+shift"></a>

#### dataStream.shift(count, func) ⇒ <code>DataStream</code>
Shifts the first n items from the stream and pipes the other

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to shift. |
| func | <code>ShiftCallback</code> | Function that receives an array of shifted items |

**Example**  
```js
[../samples/data-stream-shift.js](../samples/data-stream-shift.js)
```
<a name="module_ScramjetCore..DataStream+peek"></a>

#### dataStream.peek(count, func) ↩︎
Allows previewing some of the streams data without removing them from the stream.Important: Peek does not resume the flow.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to view before |
| func | <code>ShiftCallback</code> | Function called before other streams |

<a name="module_ScramjetCore..DataStream+slice"></a>

#### dataStream.slice([start], [length]) ⇒ <code>DataStream</code>
Gets a slice of the stream to the callback function.Returns a stream consisting of an array of items with `0` to `start`omitted and `length` items after `start` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not betaken into account.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the affected stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>Number</code> | <code>0</code> | omit this number of entries. |
| [length] | <code>Number</code> | <code>Infinity</code> | get this number of entries to the resulting stream |

**Example**  
```js
[../samples/data-stream-slice.js](../samples/data-stream-slice.js)
```
<a name="module_ScramjetCore..DataStream+assign"></a>

#### dataStream.assign(func) ⇒ <code>DataStream</code>
Transforms stream objects by assigning the properties from the returneddata along with data from original ones.The original objects are unaltered.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> \| <code>Object</code> | The function that returns new object properties or just the new properties |

**Example**  
```js
[../samples/data-stream-assign.js](../samples/data-stream-assign.js)
```
<a name="module_ScramjetCore..DataStream+unshift"></a>

#### dataStream.unshift(item) ↩︎
Pushes any data at call time (essentially at the begining of the stream)

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to unshift (you can pass more items) |

<a name="module_ScramjetCore..DataStream+endWith"></a>

#### dataStream.endWith(item) ↩︎
Pushes any data at end of stream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to push at end |

**Example**  
```js
[../samples/data-stream-endwith.js](../samples/data-stream-endwith.js)
```
<a name="module_ScramjetCore..DataStream+accumulate"></a>

#### dataStream.accumulate(func, into) ⇒ <code>Promise</code>
Accumulates data into the object.Works very similarily to reduce, but result of previous operations haveno influence over the accumulator in the next one.Method is parallel

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AccumulateCallback</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

**Example**  
```js
[../samples/data-stream-accumulate.js](../samples/data-stream-accumulate.js)
```
<a name="module_ScramjetCore..DataStream+consume"></a>

#### ~~dataStream.consume(func) ⇒ <code>Promise</code>~~
***Deprecated***

Consumes the stream by running each callback

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - resolved on end, rejected on error  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the consument |

<a name="module_ScramjetCore..DataStream+reduceNow"></a>

#### dataStream.reduceNow(func, into) ⇒ <code>\*</code>
Reduces the stream into the given object, returning it immediately.The main difference to reduce is that only the first object will bereturned at once (however the method will be called with the previousentry).If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.This method is serial - meaning that any processing on an entry willoccur only after the previous entry is fully processed. This does meanit's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>\*</code> - whatever was passed as into  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>ReduceCallback</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> \| <code>EventEmitter</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)
```
<a name="module_ScramjetCore..DataStream+remap"></a>

#### dataStream.remap(func, Clazz) ⇒ <code>DataStream</code>
Remaps the stream into a new stream.This means that every item may emit as many other items as we like.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>RemapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-remap.js](../samples/data-stream-remap.js)
```
<a name="module_ScramjetCore..DataStream+flatMap"></a>

#### dataStream.flatMap(func, Clazz) ⇒ <code>DataStream</code>
Takes any method that returns any iterable and flattens the result.The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream willconsist of all the items of the returned iterables, one iterable after another.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FlatMapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-flatmap.js](../samples/data-stream-flatmap.js)
```
<a name="module_ScramjetCore..DataStream+flatten"></a>

#### dataStream.flatten() ⇒ <code>DataStream</code>
A shorthand for streams of Arrays to flatten them.Runs: .flatmap(i => i);

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Example**  
```js
[../samples/data-stream-flatten.js](../samples/data-stream-flatten.js)
```
<a name="module_ScramjetCore..DataStream+distribute"></a>

#### dataStream.distribute([affinity], clusterFunc, options) ↩︎
[BETA] Distributes processing into multiple subprocesses or threads if you like.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
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

<a name="module_ScramjetCore..DataStream+separateInto"></a>

#### dataStream.separateInto(streams, affinity) ↩︎
Seprates stream into a hash of streams. Does not create new streams!

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Object.&lt;DataStream&gt;</code> | the object hash of streams. Keys must be the outputs of the affinity function |
| affinity | <code>AffinityCallback</code> | the callback function that affixes the item to specific streams which must exist in the object for each chunk. |

<a name="module_ScramjetCore..DataStream+separate"></a>

#### dataStream.separate(affinity, createOptions) ⇒ <code>MultiStream</code>
Separates execution to multiple streams using the hashes returned by the passed callback.Calls the given callback for a hash, then makes sure all items with the same hash are processed within a singlestream. Thanks to that streams can be distributed to multiple threads.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>MultiStream</code> - separated stream  

| Param | Type | Description |
| --- | --- | --- |
| affinity | <code>AffinityCallback</code> | the callback function |
| createOptions | <code>Object</code> | options to use to create the separated streams |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="module_ScramjetCore..DataStream+delegate"></a>

#### dataStream.delegate(delegateFunc, worker, [plugins]) ↩︎
Delegates work to a specified worker.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delegateFunc | <code>DelegateCallback</code> |  | A function to be run in the subthread. |
| worker | <code>WorkerStream</code> |  |  |
| [plugins] | <code>Array</code> | <code>[]</code> |  |

<a name="module_ScramjetCore..DataStream+batch"></a>

#### dataStream.batch(count) ⇒ <code>DataStream</code>
Aggregates chunks in arrays given number of number of items long.This can be used for microbatch processing.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | How many items to aggregate |

**Example**  
```js
[../samples/data-stream-batch.js](../samples/data-stream-batch.js)
```
<a name="module_ScramjetCore..DataStream+timeBatch"></a>

#### dataStream.timeBatch(ms, count) ⇒ <code>DataStream</code>
Aggregates chunks to arrays not delaying output by more than the given number of ms.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | Maximum ammount of milliseconds |
| count | <code>Number</code> | Maximum number of items in batch (otherwise no limit) |

**Example**  
```js
[../samples/data-stream-timebatch.js](../samples/data-stream-timebatch.js)
```
<a name="module_ScramjetCore..DataStream+nagle"></a>

#### dataStream.nagle([size], [ms]) ↩︎
Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases themin bulk.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  
**Todo**

- [ ] needs more work, for now it's simply waiting some time, not checking the queues.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>32</code> | maximum number of items to wait for |
| [ms] | <code>number</code> | <code>10</code> | milliseconds to wait for more data |

<a name="module_ScramjetCore..DataStream+JSONStringify"></a>

#### dataStream.JSONStringify([endline]) ⇒ <code>StringStream</code>
Returns a StringStream containing JSON per item with optional end line

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - output stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [endline] | <code>Boolean</code> \| <code>String</code> | <code>os.EOL</code> | whether to add endlines (boolean or string as delimiter) |

<a name="module_ScramjetCore..DataStream+CSVStringify"></a>

#### dataStream.CSVStringify(options) ⇒ <code>StringStream</code>
Stringifies CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - stream of parsed items  

| Param | Description |
| --- | --- |
| options | options for the papaparse.unparse module. |

**Example**  
```js
[../samples/data-stream-csv.js](../samples/data-stream-csv.js)
```
<a name="module_ScramjetCore..DataStream+debug"></a>

#### dataStream.debug(func) ⇒ <code>DataStream</code>
Injects a ```debugger``` statement when called.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

**Example**  
```js
[../samples/data-stream-debug.js](../samples/data-stream-debug.js)
```
<a name="module_ScramjetCore..DataStream.fromArray"></a>

#### DataStream.fromArray(arr) ⇒ <code>DataStream</code>
Create a DataStream from an Array

**Kind**: static method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | list of chunks |

**Example**  
```js
[../samples/data-stream-fromarray.js](../samples/data-stream-fromarray.js)
```
<a name="module_ScramjetCore..DataStream.fromIterator"></a>

#### DataStream.fromIterator(iter) ⇒ <code>DataStream</code>
Create a DataStream from an Iterator

Doesn't end the stream until it reaches end of the iterator.

**Kind**: static method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| iter | <code>Iterator</code> | the iterator object |

**Example**  
```js
[../samples/data-stream-fromiterator.js](../samples/data-stream-fromiterator.js)
```
<a name="module_ScramjetCore..toStringStream"></a>

### ScramjetCore~toStringStream()
Alias for [DataStream#stringify](DataStream#stringify)

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..tap"></a>

### ScramjetCore~tap()
Stops merging transform callbacks at the current place in the command chain.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Example**  
```js
[../samples/data-stream-tap.js](../samples/data-stream-tap.js)
```
<a name="module_ScramjetCore..whenRead"></a>

### ScramjetCore~whenRead() ⇒ <code>Promise.&lt;Object&gt;</code>
Reads a chunk from the stream and resolves the promise when read.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - the read item  
<a name="module_ScramjetCore..whenWrote"></a>

### ScramjetCore~whenWrote() ⇒ <code>Promise</code>
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenEnd"></a>

### ScramjetCore~whenEnd() ⇒ <code>Promise</code>
Resolves when stream ends - rejects on uncaught error

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenDrained"></a>

### ScramjetCore~whenDrained() ⇒ <code>Promise</code>
Returns a promise that resolves when the stream is drained

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenDrained"></a>

### ScramjetCore~whenDrained() ⇒ <code>Promise</code>
Returns a promise that resolves (!) when the stream is errors

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..setOptions"></a>

### ScramjetCore~setOptions(options) ↩︎
Allows resetting stream options.

It's much easier to use this in chain than constructing new stream:

```javascript
    stream.map(myMapper).filter(myFilter).setOptions({maxParallel: 2})
```

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  
**Meta.conds**: keep-order,chain  

| Param | Type |
| --- | --- |
| options | <code>StreamOptions</code> | 

<a name="module_ScramjetCore..join"></a>

### ScramjetCore~join(item) ↩︎
Method will put the passed object between items. It can also be a function call.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> \| <code>JoinCallback</code> | An object that should be interweaved between stream items |

**Example**  
```js
[../samples/data-stream-join.js](../samples/data-stream-join.js)
```
<a name="module_ScramjetCore..StreamOptions"></a>

### ScramjetCore~StreamOptions : <code>Object</code>
Standard options for scramjet streams.

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxParallel | <code>Number</code> | the number of transforms done in parallel |
| referrer | <code>DataStream</code> | a referring stream to point to (if possible the transforms will be pushed to it                                 instead of creating a new stream) |

<a name="module_ScramjetCore..MapCallback"></a>

### ScramjetCore~MapCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="module_ScramjetCore..FilterCallback"></a>

### ScramjetCore~FilterCallback ⇒ <code>Promise</code> \| <code>Boolean</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>Boolean</code> - information if the object should remain in
                            the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="module_ScramjetCore..ReduceCallback"></a>

### ScramjetCore~ReduceCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | the accumulator - the object initially passed or retuned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="module_ScramjetCore..IntoCallback"></a>

### ScramjetCore~IntoCallback ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>\*</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>Object</code> | source stream chunk |

<a name="module_ScramjetCore..TeeCallback"></a>

### ScramjetCore~TeeCallback : <code>function</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| teed | <code>DataStream</code> | The teed stream |

<a name="module_ScramjetCore..ShiftCallback"></a>

### ScramjetCore~ShiftCallback : <code>function</code>
Shift callback

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Array.&lt;Object&gt;</code> | an array of shifted chunks |

<a name="module_ScramjetCore..AccumulateCallback"></a>

### ScramjetCore~AccumulateCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_ScramjetCore..ConsumeCallback"></a>

### ScramjetCore~ConsumeCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_ScramjetCore..RemapCallback"></a>

### ScramjetCore~RemapCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_ScramjetCore..FlatMapCallback"></a>

### ScramjetCore~FlatMapCallback ⇒ <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_ScramjetCore..JoinCallback"></a>

### ScramjetCore~JoinCallback ⇒ <code>Promise.&lt;\*&gt;</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;\*&gt;</code> \| <code>\*</code> - promise that is resolved with the joining item  

| Param | Type | Description |
| --- | --- | --- |
| prev | <code>\*</code> | the chunk before |
| next | <code>\*</code> | the chunk after |

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * _static_
        * [.empty(callback)](#module_ScramjetCore.empty) ↩︎
        * [.concat(streams)](#module_ScramjetCore.concat) ↩︎
        * [.toJSONArray([enclosure])](#module_ScramjetCore.toJSONArray) ⇒ <code>StringStream</code>
        * [.toJSONObject([entryCallback], [enclosure])](#module_ScramjetCore.toJSONObject) ⇒ <code>StringStream</code>
    * _inner_
        * [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
            * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
            * _instance_
                * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
                * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
                * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
                * [.into(func, into)](#module_ScramjetCore..DataStream+into) ⇒ <code>DataStream</code>
                * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
                * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
                * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
                * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
                * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
                * [.catch(callback)](#module_ScramjetCore..DataStream+catch) ↩︎
                * [.raise(err)](#module_ScramjetCore..DataStream+raise) ⇒ <code>Promise</code>
                * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
                * [.bufferify(serializer)](#module_ScramjetCore..DataStream+bufferify) ⇒ <code>BufferStream</code>
                * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
                * [.run()](#module_ScramjetCore..DataStream+run) ⇒ <code>Promise</code>
                * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
                * [.toGenerator()](#module_ScramjetCore..DataStream+toGenerator) ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
                * [._selfInstance()](#module_ScramjetCore..DataStream+_selfInstance) ⇒ <code>DataStream</code>
                * [.shift(count, func)](#module_ScramjetCore..DataStream+shift) ⇒ <code>DataStream</code>
                * [.peek(count, func)](#module_ScramjetCore..DataStream+peek) ↩︎
                * [.slice([start], [length])](#module_ScramjetCore..DataStream+slice) ⇒ <code>DataStream</code>
                * [.assign(func)](#module_ScramjetCore..DataStream+assign) ⇒ <code>DataStream</code>
                * [.unshift(item)](#module_ScramjetCore..DataStream+unshift) ↩︎
                * [.endWith(item)](#module_ScramjetCore..DataStream+endWith) ↩︎
                * [.accumulate(func, into)](#module_ScramjetCore..DataStream+accumulate) ⇒ <code>Promise</code>
                * ~~[.consume(func)](#module_ScramjetCore..DataStream+consume) ⇒ <code>Promise</code>~~
                * [.reduceNow(func, into)](#module_ScramjetCore..DataStream+reduceNow) ⇒ <code>\*</code>
                * [.remap(func, Clazz)](#module_ScramjetCore..DataStream+remap) ⇒ <code>DataStream</code>
                * [.flatMap(func, Clazz)](#module_ScramjetCore..DataStream+flatMap) ⇒ <code>DataStream</code>
                * [.flatten()](#module_ScramjetCore..DataStream+flatten) ⇒ <code>DataStream</code>
                * [.distribute([affinity], clusterFunc, options)](#module_ScramjetCore..DataStream+distribute) ↩︎
                * [.separateInto(streams, affinity)](#module_ScramjetCore..DataStream+separateInto) ↩︎
                * [.separate(affinity, createOptions)](#module_ScramjetCore..DataStream+separate) ⇒ <code>MultiStream</code>
                * [.delegate(delegateFunc, worker, [plugins])](#module_ScramjetCore..DataStream+delegate) ↩︎
                * [.batch(count)](#module_ScramjetCore..DataStream+batch) ⇒ <code>DataStream</code>
                * [.timeBatch(ms, count)](#module_ScramjetCore..DataStream+timeBatch) ⇒ <code>DataStream</code>
                * [.nagle([size], [ms])](#module_ScramjetCore..DataStream+nagle) ↩︎
                * [.JSONStringify([endline])](#module_ScramjetCore..DataStream+JSONStringify) ⇒ <code>StringStream</code>
                * [.CSVStringify(options)](#module_ScramjetCore..DataStream+CSVStringify) ⇒ <code>StringStream</code>
                * [.debug(func)](#module_ScramjetCore..DataStream+debug) ⇒ <code>DataStream</code>
            * _static_
                * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
                * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>
        * [~toStringStream()](#module_ScramjetCore..toStringStream)
        * [~tap()](#module_ScramjetCore..tap)
        * [~whenRead()](#module_ScramjetCore..whenRead) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [~whenWrote()](#module_ScramjetCore..whenWrote) ⇒ <code>Promise</code>
        * [~whenEnd()](#module_ScramjetCore..whenEnd) ⇒ <code>Promise</code>
        * [~whenDrained()](#module_ScramjetCore..whenDrained) ⇒ <code>Promise</code>
        * [~whenDrained()](#module_ScramjetCore..whenDrained) ⇒ <code>Promise</code>
        * [~setOptions(options)](#module_ScramjetCore..setOptions) ↩︎
        * [~join(item)](#module_ScramjetCore..join) ↩︎
        * [~StreamOptions](#module_ScramjetCore..StreamOptions) : <code>Object</code>
        * [~MapCallback](#module_ScramjetCore..MapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~FilterCallback](#module_ScramjetCore..FilterCallback) ⇒ <code>Promise</code> \| <code>Boolean</code>
        * [~ReduceCallback](#module_ScramjetCore..ReduceCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~IntoCallback](#module_ScramjetCore..IntoCallback) ⇒ <code>\*</code>
        * [~TeeCallback](#module_ScramjetCore..TeeCallback) : <code>function</code>
        * [~ShiftCallback](#module_ScramjetCore..ShiftCallback) : <code>function</code>
        * [~AccumulateCallback](#module_ScramjetCore..AccumulateCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~ConsumeCallback](#module_ScramjetCore..ConsumeCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~RemapCallback](#module_ScramjetCore..RemapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
        * [~FlatMapCallback](#module_ScramjetCore..FlatMapCallback) ⇒ <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code>
        * [~JoinCallback](#module_ScramjetCore..JoinCallback) ⇒ <code>Promise.&lt;\*&gt;</code> \| <code>\*</code>

<a name="module_ScramjetCore.empty"></a>

### ScramjetCore.empty(callback) ↩︎
Called when the stream ends without passing any items

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function called when stream ends |

**Example**  
```js
[../samples/data-stream-empty.js](../samples/data-stream-empty.js)
```
<a name="module_ScramjetCore.concat"></a>

### ScramjetCore.concat(streams) ↩︎
Returns a new stream that will append the passed streams to the callee

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>\*</code> | Streams to be passed |

**Example**  
```js
[../samples/data-stream-concat.js](../samples/data-stream-concat.js)
```
<a name="module_ScramjetCore.toJSONArray"></a>

### ScramjetCore.toJSONArray([enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON array.

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [enclosure] | <code>Iterable</code> | <code>&#x27;[]&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonarray.js](../samples/data-stream-tojsonarray.js)
```
<a name="module_ScramjetCore.toJSONObject"></a>

### ScramjetCore.toJSONObject([entryCallback], [enclosure]) ⇒ <code>StringStream</code>
Transforms the stream to a streamed JSON object.

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>StringStream</code> - [description]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [entryCallback] | <code>MapCallback</code> |  | async function returning an entry (array of [key, value]) |
| [enclosure] | <code>Iterable</code> | <code>&#x27;{}&#x27;</code> | Any iterable object of two items (begining and end) |

**Example**  
```js
[../samples/data-stream-tojsonobject.js](../samples/data-stream-tojsonobject.js)
```
<a name="module_ScramjetCore..DataStream"></a>

### ScramjetCore~DataStream ⇐ <code>stream.PassThrough</code>
**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Extends**: <code>stream.PassThrough</code>  

* [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
    * _instance_
        * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
        * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
        * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
        * [.into(func, into)](#module_ScramjetCore..DataStream+into) ⇒ <code>DataStream</code>
        * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
        * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
        * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
        * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
        * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
        * [.catch(callback)](#module_ScramjetCore..DataStream+catch) ↩︎
        * [.raise(err)](#module_ScramjetCore..DataStream+raise) ⇒ <code>Promise</code>
        * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
        * [.bufferify(serializer)](#module_ScramjetCore..DataStream+bufferify) ⇒ <code>BufferStream</code>
        * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
        * [.run()](#module_ScramjetCore..DataStream+run) ⇒ <code>Promise</code>
        * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
        * [.toGenerator()](#module_ScramjetCore..DataStream+toGenerator) ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
        * [._selfInstance()](#module_ScramjetCore..DataStream+_selfInstance) ⇒ <code>DataStream</code>
        * [.shift(count, func)](#module_ScramjetCore..DataStream+shift) ⇒ <code>DataStream</code>
        * [.peek(count, func)](#module_ScramjetCore..DataStream+peek) ↩︎
        * [.slice([start], [length])](#module_ScramjetCore..DataStream+slice) ⇒ <code>DataStream</code>
        * [.assign(func)](#module_ScramjetCore..DataStream+assign) ⇒ <code>DataStream</code>
        * [.unshift(item)](#module_ScramjetCore..DataStream+unshift) ↩︎
        * [.endWith(item)](#module_ScramjetCore..DataStream+endWith) ↩︎
        * [.accumulate(func, into)](#module_ScramjetCore..DataStream+accumulate) ⇒ <code>Promise</code>
        * ~~[.consume(func)](#module_ScramjetCore..DataStream+consume) ⇒ <code>Promise</code>~~
        * [.reduceNow(func, into)](#module_ScramjetCore..DataStream+reduceNow) ⇒ <code>\*</code>
        * [.remap(func, Clazz)](#module_ScramjetCore..DataStream+remap) ⇒ <code>DataStream</code>
        * [.flatMap(func, Clazz)](#module_ScramjetCore..DataStream+flatMap) ⇒ <code>DataStream</code>
        * [.flatten()](#module_ScramjetCore..DataStream+flatten) ⇒ <code>DataStream</code>
        * [.distribute([affinity], clusterFunc, options)](#module_ScramjetCore..DataStream+distribute) ↩︎
        * [.separateInto(streams, affinity)](#module_ScramjetCore..DataStream+separateInto) ↩︎
        * [.separate(affinity, createOptions)](#module_ScramjetCore..DataStream+separate) ⇒ <code>MultiStream</code>
        * [.delegate(delegateFunc, worker, [plugins])](#module_ScramjetCore..DataStream+delegate) ↩︎
        * [.batch(count)](#module_ScramjetCore..DataStream+batch) ⇒ <code>DataStream</code>
        * [.timeBatch(ms, count)](#module_ScramjetCore..DataStream+timeBatch) ⇒ <code>DataStream</code>
        * [.nagle([size], [ms])](#module_ScramjetCore..DataStream+nagle) ↩︎
        * [.JSONStringify([endline])](#module_ScramjetCore..DataStream+JSONStringify) ⇒ <code>StringStream</code>
        * [.CSVStringify(options)](#module_ScramjetCore..DataStream+CSVStringify) ⇒ <code>StringStream</code>
        * [.debug(func)](#module_ScramjetCore..DataStream+debug) ⇒ <code>DataStream</code>
    * _static_
        * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
        * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>

<a name="new_module_ScramjetCore..DataStream_new"></a>

#### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>StreamOptions</code> | Stream options passed to superclass |

<a name="module_ScramjetCore..DataStream+map"></a>

#### dataStream.map(func, Clazz) ⇒ <code>DataStream</code>
Transforms stream objects into new ones, just like Array.prototype.map
does.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | The function that creates the new object |
| Clazz | <code>Class</code> | (optional) The class to be mapped to. |

**Example**  
```js
[../samples/data-stream-map.js](../samples/data-stream-map.js)
```
<a name="module_ScramjetCore..DataStream+filter"></a>

#### dataStream.filter(func) ⇒ <code>DataStream</code>
Filters object based on the function outcome, just like
Array.prototype.filter.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The function that filters the object |

**Example**  
```js
[../samples/data-stream-filter.js](../samples/data-stream-filter.js)
```
<a name="module_ScramjetCore..DataStream+reduce"></a>

#### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulator

Works similarily to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter.

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the call of the transform function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the  first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="module_ScramjetCore..DataStream+into"></a>

#### dataStream.into(func, into) ⇒ <code>DataStream</code>
Pushes the data into another scramjet stream while keeping flow control and

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the object passed as `into`  

| Param | Type | Description |
| --- | --- | --- |
| func |  | [description] |
| into | <code>DataStream</code> | [description] |

<a name="module_ScramjetCore..DataStream+use"></a>

#### dataStream.use(func) ⇒ <code>\*</code>
Calls the passed method in place with the stream as first argument, returns result.

The main intention of this method is to run scramjet modules - transforms that allow complex transforms of
streams. These modules can also be run with [scramjet-cli](https://github.com/signicode/scramjet-cli) directly
from the command line.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>\*</code> - anything the passed function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> \| <code>String</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain.                         Alternatively this can be a relative path to a scramjet-module. |

**Example**  
```js
[../samples/data-stream-use.js](../samples/data-stream-use.js)
```
<a name="module_ScramjetCore..DataStream+tee"></a>

#### dataStream.tee(func) ⇒ <code>DataStream</code>
Duplicate the stream

Creates a duplicate stream instance and pases it to the callback.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TeeCallback</code> | The duplicate stream will be passed as first argument. |

**Example**  
```js
[../samples/data-stream-tee.js](../samples/data-stream-tee.js)
```
<a name="module_ScramjetCore..DataStream+each"></a>

#### dataStream.each(func) ↩︎
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)``` but with flow control.
Warning: this resumes the stream!

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | a callback called for each chunk. |

<a name="module_ScramjetCore..DataStream+while"></a>

#### dataStream.while(func) ⇒ <code>DataStream</code>
Reads the stream while the function outcome is truthy.

Stops reading and emits end as soon as it ends.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="module_ScramjetCore..DataStream+until"></a>

#### dataStream.until(func) ⇒ <code>DataStream</code>
Reads the stream until the function outcome is truthy.

Works oposite of while.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the shortened stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FilterCallback</code> | The condition check |

<a name="module_ScramjetCore..DataStream+catch"></a>

#### dataStream.catch(callback) ↩︎
Provides an way to catch errors in chanined streams.

The handler will be called as asynchronous
 - if it resolves then the error will be muted.
 - if it rejects then the error will be passed to the next handler

If no handlers will resolve the error, an `error` event will be emitted

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Error handler (async function) |

<a name="module_ScramjetCore..DataStream+raise"></a>

#### dataStream.raise(err) ⇒ <code>Promise</code>
Executes all error handlers and if none resolves, then emits an error.

The returned promise will always be resolved even if there are no succesful handers.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - the promise that will be resolved when the error is handled.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The thrown error |

<a name="module_ScramjetCore..DataStream+pipe"></a>

#### dataStream.pipe(to, options) ⇒ <code>Writable</code>
Override of node.js Readable pipe.

Except for calling overriden method it proxies errors to piped stream.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Writable</code> - the `to` stream  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Writable</code> | Writable stream to write to |
| options | <code>WritableOptions</code> |  |

<a name="module_ScramjetCore..DataStream+bufferify"></a>

#### dataStream.bufferify(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to buffers |

**Example**  
```js
[../samples/data-stream-tobufferstream.js](../samples/data-stream-tobufferstream.js)
```
<a name="module_ScramjetCore..DataStream+stringify"></a>

#### dataStream.stringify(serializer) ⇒ <code>StringStream</code>
Creates a StringStream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>MapCallback</code> | A method that converts chunks to strings |

**Example**  
```js
[../samples/data-stream-tostringstream.js](../samples/data-stream-tostringstream.js)
```
<a name="module_ScramjetCore..DataStream+run"></a>

#### dataStream.run() ⇒ <code>Promise</code>
Consumes all stream items without doing anything

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Resolved when the whole stream is read  
<a name="module_ScramjetCore..DataStream+toArray"></a>

#### dataStream.toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

<a name="module_ScramjetCore..DataStream+toGenerator"></a>

#### dataStream.toGenerator() ⇒ <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code>
Returns an async generator

Ready for https://github.com/tc39/proposal-async-iteration

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Iterable.&lt;Promise.&lt;\*&gt;&gt;</code> - Returns an iterator that returns a promise for each item.  
<a name="module_ScramjetCore..DataStream+_selfInstance"></a>

#### dataStream._selfInstance() ⇒ <code>DataStream</code>
Returns a new instance of self.

Normally this doesn't have to be overridden.
When the constructor would use some special arguments this may be used to
override the object construction in [tee](tee)...

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - an empty instance of the same class.  
**Internal**:   
**Example**  
```js
[../samples/data-stream-selfinstance.js](../samples/data-stream-selfinstance.js)
```
<a name="module_ScramjetCore..DataStream+shift"></a>

#### dataStream.shift(count, func) ⇒ <code>DataStream</code>
Shifts the first n items from the stream and pipes the other

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to shift. |
| func | <code>ShiftCallback</code> | Function that receives an array of shifted items |

**Example**  
```js
[../samples/data-stream-shift.js](../samples/data-stream-shift.js)
```
<a name="module_ScramjetCore..DataStream+peek"></a>

#### dataStream.peek(count, func) ↩︎
Allows previewing some of the streams data without removing them from the stream.Important: Peek does not resume the flow.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to view before |
| func | <code>ShiftCallback</code> | Function called before other streams |

<a name="module_ScramjetCore..DataStream+slice"></a>

#### dataStream.slice([start], [length]) ⇒ <code>DataStream</code>
Gets a slice of the stream to the callback function.Returns a stream consisting of an array of items with `0` to `start`omitted and `length` items after `start` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not betaken into account.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the affected stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [start] | <code>Number</code> | <code>0</code> | omit this number of entries. |
| [length] | <code>Number</code> | <code>Infinity</code> | get this number of entries to the resulting stream |

**Example**  
```js
[../samples/data-stream-slice.js](../samples/data-stream-slice.js)
```
<a name="module_ScramjetCore..DataStream+assign"></a>

#### dataStream.assign(func) ⇒ <code>DataStream</code>
Transforms stream objects by assigning the properties from the returneddata along with data from original ones.The original objects are unaltered.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> \| <code>Object</code> | The function that returns new object properties or just the new properties |

**Example**  
```js
[../samples/data-stream-assign.js](../samples/data-stream-assign.js)
```
<a name="module_ScramjetCore..DataStream+unshift"></a>

#### dataStream.unshift(item) ↩︎
Pushes any data at call time (essentially at the begining of the stream)

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to unshift (you can pass more items) |

<a name="module_ScramjetCore..DataStream+endWith"></a>

#### dataStream.endWith(item) ↩︎
Pushes any data at end of stream

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | list of items to push at end |

**Example**  
```js
[../samples/data-stream-endwith.js](../samples/data-stream-endwith.js)
```
<a name="module_ScramjetCore..DataStream+accumulate"></a>

#### dataStream.accumulate(func, into) ⇒ <code>Promise</code>
Accumulates data into the object.Works very similarily to reduce, but result of previous operations haveno influence over the accumulator in the next one.Method is parallel

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>AccumulateCallback</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

**Example**  
```js
[../samples/data-stream-accumulate.js](../samples/data-stream-accumulate.js)
```
<a name="module_ScramjetCore..DataStream+consume"></a>

#### ~~dataStream.consume(func) ⇒ <code>Promise</code>~~
***Deprecated***

Consumes the stream by running each callback

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - resolved on end, rejected on error  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the consument |

<a name="module_ScramjetCore..DataStream+reduceNow"></a>

#### dataStream.reduceNow(func, into) ⇒ <code>\*</code>
Reduces the stream into the given object, returning it immediately.The main difference to reduce is that only the first object will bereturned at once (however the method will be called with the previousentry).If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.This method is serial - meaning that any processing on an entry willoccur only after the previous entry is fully processed. This does meanit's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>\*</code> - whatever was passed as into  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>ReduceCallback</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> \| <code>EventEmitter</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)
```
<a name="module_ScramjetCore..DataStream+remap"></a>

#### dataStream.remap(func, Clazz) ⇒ <code>DataStream</code>
Remaps the stream into a new stream.This means that every item may emit as many other items as we like.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>RemapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-remap.js](../samples/data-stream-remap.js)
```
<a name="module_ScramjetCore..DataStream+flatMap"></a>

#### dataStream.flatMap(func, Clazz) ⇒ <code>DataStream</code>
Takes any method that returns any iterable and flattens the result.The passed callback must return an iterable (otherwise an error will be emitted). The resulting stream willconsist of all the items of the returned iterables, one iterable after another.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>FlatMapCallback</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-flatmap.js](../samples/data-stream-flatmap.js)
```
<a name="module_ScramjetCore..DataStream+flatten"></a>

#### dataStream.flatten() ⇒ <code>DataStream</code>
A shorthand for streams of Arrays to flatten them.Runs: .flatmap(i => i);

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Example**  
```js
[../samples/data-stream-flatten.js](../samples/data-stream-flatten.js)
```
<a name="module_ScramjetCore..DataStream+distribute"></a>

#### dataStream.distribute([affinity], clusterFunc, options) ↩︎
[BETA] Distributes processing into multiple subprocesses or threads if you like.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
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

<a name="module_ScramjetCore..DataStream+separateInto"></a>

#### dataStream.separateInto(streams, affinity) ↩︎
Seprates stream into a hash of streams. Does not create new streams!

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Object.&lt;DataStream&gt;</code> | the object hash of streams. Keys must be the outputs of the affinity function |
| affinity | <code>AffinityCallback</code> | the callback function that affixes the item to specific streams which must exist in the object for each chunk. |

<a name="module_ScramjetCore..DataStream+separate"></a>

#### dataStream.separate(affinity, createOptions) ⇒ <code>MultiStream</code>
Separates execution to multiple streams using the hashes returned by the passed callback.Calls the given callback for a hash, then makes sure all items with the same hash are processed within a singlestream. Thanks to that streams can be distributed to multiple threads.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>MultiStream</code> - separated stream  

| Param | Type | Description |
| --- | --- | --- |
| affinity | <code>AffinityCallback</code> | the callback function |
| createOptions | <code>Object</code> | options to use to create the separated streams |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="module_ScramjetCore..DataStream+delegate"></a>

#### dataStream.delegate(delegateFunc, worker, [plugins]) ↩︎
Delegates work to a specified worker.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delegateFunc | <code>DelegateCallback</code> |  | A function to be run in the subthread. |
| worker | <code>WorkerStream</code> |  |  |
| [plugins] | <code>Array</code> | <code>[]</code> |  |

<a name="module_ScramjetCore..DataStream+batch"></a>

#### dataStream.batch(count) ⇒ <code>DataStream</code>
Aggregates chunks in arrays given number of number of items long.This can be used for microbatch processing.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | How many items to aggregate |

**Example**  
```js
[../samples/data-stream-batch.js](../samples/data-stream-batch.js)
```
<a name="module_ScramjetCore..DataStream+timeBatch"></a>

#### dataStream.timeBatch(ms, count) ⇒ <code>DataStream</code>
Aggregates chunks to arrays not delaying output by more than the given number of ms.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the stream of arrays  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | Maximum ammount of milliseconds |
| count | <code>Number</code> | Maximum number of items in batch (otherwise no limit) |

**Example**  
```js
[../samples/data-stream-timebatch.js](../samples/data-stream-timebatch.js)
```
<a name="module_ScramjetCore..DataStream+nagle"></a>

#### dataStream.nagle([size], [ms]) ↩︎
Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases themin bulk.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  
**Todo**

- [ ] needs more work, for now it's simply waiting some time, not checking the queues.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>32</code> | maximum number of items to wait for |
| [ms] | <code>number</code> | <code>10</code> | milliseconds to wait for more data |

<a name="module_ScramjetCore..DataStream+JSONStringify"></a>

#### dataStream.JSONStringify([endline]) ⇒ <code>StringStream</code>
Returns a StringStream containing JSON per item with optional end line

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - output stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [endline] | <code>Boolean</code> \| <code>String</code> | <code>os.EOL</code> | whether to add endlines (boolean or string as delimiter) |

<a name="module_ScramjetCore..DataStream+CSVStringify"></a>

#### dataStream.CSVStringify(options) ⇒ <code>StringStream</code>
Stringifies CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>StringStream</code> - stream of parsed items  

| Param | Description |
| --- | --- |
| options | options for the papaparse.unparse module. |

**Example**  
```js
[../samples/data-stream-csv.js](../samples/data-stream-csv.js)
```
<a name="module_ScramjetCore..DataStream+debug"></a>

#### dataStream.debug(func) ⇒ <code>DataStream</code>
Injects a ```debugger``` statement when called.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

**Example**  
```js
[../samples/data-stream-debug.js](../samples/data-stream-debug.js)
```
<a name="module_ScramjetCore..DataStream.fromArray"></a>

#### DataStream.fromArray(arr) ⇒ <code>DataStream</code>
Create a DataStream from an Array

**Kind**: static method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | list of chunks |

**Example**  
```js
[../samples/data-stream-fromarray.js](../samples/data-stream-fromarray.js)
```
<a name="module_ScramjetCore..DataStream.fromIterator"></a>

#### DataStream.fromIterator(iter) ⇒ <code>DataStream</code>
Create a DataStream from an Iterator

Doesn't end the stream until it reaches end of the iterator.

**Kind**: static method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>DataStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| iter | <code>Iterator</code> | the iterator object |

**Example**  
```js
[../samples/data-stream-fromiterator.js](../samples/data-stream-fromiterator.js)
```
<a name="module_ScramjetCore..toStringStream"></a>

### ScramjetCore~toStringStream()
Alias for [DataStream#stringify](DataStream#stringify)

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..tap"></a>

### ScramjetCore~tap()
Stops merging transform callbacks at the current place in the command chain.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Example**  
```js
[../samples/data-stream-tap.js](../samples/data-stream-tap.js)
```
<a name="module_ScramjetCore..whenRead"></a>

### ScramjetCore~whenRead() ⇒ <code>Promise.&lt;Object&gt;</code>
Reads a chunk from the stream and resolves the promise when read.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - the read item  
<a name="module_ScramjetCore..whenWrote"></a>

### ScramjetCore~whenWrote() ⇒ <code>Promise</code>
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenEnd"></a>

### ScramjetCore~whenEnd() ⇒ <code>Promise</code>
Resolves when stream ends - rejects on uncaught error

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenDrained"></a>

### ScramjetCore~whenDrained() ⇒ <code>Promise</code>
Returns a promise that resolves when the stream is drained

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..whenDrained"></a>

### ScramjetCore~whenDrained() ⇒ <code>Promise</code>
Returns a promise that resolves (!) when the stream is errors

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..setOptions"></a>

### ScramjetCore~setOptions(options) ↩︎
Allows resetting stream options.

It's much easier to use this in chain than constructing new stream:

```javascript
    stream.map(myMapper).filter(myFilter).setOptions({maxParallel: 2})
```

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  
**Meta.conds**: keep-order,chain  

| Param | Type |
| --- | --- |
| options | <code>StreamOptions</code> | 

<a name="module_ScramjetCore..join"></a>

### ScramjetCore~join(item) ↩︎
Method will put the passed object between items. It can also be a function call.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> \| <code>JoinCallback</code> | An object that should be interweaved between stream items |

**Example**  
```js
[../samples/data-stream-join.js](../samples/data-stream-join.js)
```
<a name="module_ScramjetCore..StreamOptions"></a>

### ScramjetCore~StreamOptions : <code>Object</code>
Standard options for scramjet streams.

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxParallel | <code>Number</code> | the number of transforms done in parallel |
| referrer | <code>DataStream</code> | a referring stream to point to (if possible the transforms will be pushed to it                                 instead of creating a new stream) |

<a name="module_ScramjetCore..MapCallback"></a>

### ScramjetCore~MapCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="module_ScramjetCore..FilterCallback"></a>

### ScramjetCore~FilterCallback ⇒ <code>Promise</code> \| <code>Boolean</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>Boolean</code> - information if the object should remain in
                            the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="module_ScramjetCore..ReduceCallback"></a>

### ScramjetCore~ReduceCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | the accumulator - the object initially passed or retuned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="module_ScramjetCore..IntoCallback"></a>

### ScramjetCore~IntoCallback ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>\*</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>Object</code> | source stream chunk |

<a name="module_ScramjetCore..TeeCallback"></a>

### ScramjetCore~TeeCallback : <code>function</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| teed | <code>DataStream</code> | The teed stream |

<a name="module_ScramjetCore..ShiftCallback"></a>

### ScramjetCore~ShiftCallback : <code>function</code>
Shift callback

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Array.&lt;Object&gt;</code> | an array of shifted chunks |

<a name="module_ScramjetCore..AccumulateCallback"></a>

### ScramjetCore~AccumulateCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_ScramjetCore..ConsumeCallback"></a>

### ScramjetCore~ConsumeCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_ScramjetCore..RemapCallback"></a>

### ScramjetCore~RemapCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_ScramjetCore..FlatMapCallback"></a>

### ScramjetCore~FlatMapCallback ⇒ <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_ScramjetCore..JoinCallback"></a>

### ScramjetCore~JoinCallback ⇒ <code>Promise.&lt;\*&gt;</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;\*&gt;</code> \| <code>\*</code> - promise that is resolved with the joining item  

| Param | Type | Description |
| --- | --- | --- |
| prev | <code>\*</code> | the chunk before |
| next | <code>\*</code> | the chunk after |

