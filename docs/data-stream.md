## Modules

<dl>
<dt><a href="#module_ScramjetCore">ScramjetCore</a></dt>
<dd></dd>
<dt><a href="#module_DataStream">DataStream</a></dt>
<dd></dd>
</dl>

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
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
    * [~StreamOptions](#module_ScramjetCore..StreamOptions) : <code>Object</code>
    * [~MapCallback](#module_ScramjetCore..MapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
    * [~FilterCallback](#module_ScramjetCore..FilterCallback) ⇒ <code>Promise</code> \| <code>Boolean</code>
    * [~ReduceCallback](#module_ScramjetCore..ReduceCallback) ⇒ <code>Promise</code> \| <code>\*</code>
    * [~IntoCallback](#module_ScramjetCore..IntoCallback) ⇒ <code>\*</code>
    * [~TeeCallback](#module_ScramjetCore..TeeCallback) : <code>function</code>

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

<a name="module_DataStream"></a>

## DataStream
