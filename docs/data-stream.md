<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
        * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
        * _instance_
            * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
            * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
            * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
            * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
            * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
            * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
            * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
            * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
            * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
            * [.toBufferStream(serializer)](#module_ScramjetCore..DataStream+toBufferStream) ⇒ <code>BufferStream</code>
            * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
            * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
        * _static_
            * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
            * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>
    * [~tap()](#module_ScramjetCore..tap)
    * [~whenRead()](#module_ScramjetCore..whenRead) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~whenWrote()](#module_ScramjetCore..whenWrote) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~setOptions(options)](#module_ScramjetCore..setOptions) ↩︎
    * [~toStringStream()](#module_ScramjetCore..toStringStream)
    * [~StreamOptions](#module_ScramjetCore..StreamOptions) : <code>Object</code>
    * [~TeeCallback](#module_ScramjetCore..TeeCallback) : <code>function</code>
    * [~ReduceCallback](#module_ScramjetCore..ReduceCallback) ⇒ <code>Promise</code> \| <code>\*</code>
    * [~MapCallback](#module_ScramjetCore..MapCallback) ⇒ <code>Promise</code> \| <code>\*</code>
    * [~FilterCallback](#module_ScramjetCore..FilterCallback) ⇒ <code>Promise</code> \| <code>Boolean</code>

<a name="module_ScramjetCore..DataStream"></a>

### ScramjetCore~DataStream ⇐ <code>stream.PassThrough</code>
**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Extends**: <code>stream.PassThrough</code>  

* [~DataStream](#module_ScramjetCore..DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_module_ScramjetCore..DataStream_new)
    * _instance_
        * [.use(func)](#module_ScramjetCore..DataStream+use) ⇒ <code>\*</code>
        * [.tee(func)](#module_ScramjetCore..DataStream+tee) ⇒ <code>DataStream</code>
        * [.reduce(func, into)](#module_ScramjetCore..DataStream+reduce) ⇒ <code>Promise</code>
        * [.each(func)](#module_ScramjetCore..DataStream+each) ↩︎
        * [.map(func, Clazz)](#module_ScramjetCore..DataStream+map) ⇒ <code>DataStream</code>
        * [.filter(func)](#module_ScramjetCore..DataStream+filter) ⇒ <code>DataStream</code>
        * [.while(func)](#module_ScramjetCore..DataStream+while) ⇒ <code>DataStream</code>
        * [.until(func)](#module_ScramjetCore..DataStream+until) ⇒ <code>DataStream</code>
        * [.pipe(to, options)](#module_ScramjetCore..DataStream+pipe) ⇒ <code>Writable</code>
        * [.toBufferStream(serializer)](#module_ScramjetCore..DataStream+toBufferStream) ⇒ <code>BufferStream</code>
        * [.stringify(serializer)](#module_ScramjetCore..DataStream+stringify) ⇒ <code>StringStream</code>
        * [.toArray(initial)](#module_ScramjetCore..DataStream+toArray) ⇒ <code>Promise</code>
    * _static_
        * [.fromArray(arr)](#module_ScramjetCore..DataStream.fromArray) ⇒ <code>DataStream</code>
        * [.fromIterator(iter)](#module_ScramjetCore..DataStream.fromIterator) ⇒ <code>DataStream</code>

<a name="new_module_ScramjetCore..DataStream_new"></a>

#### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>StreamOptions</code> | Stream options passed to superclass |

<a name="module_ScramjetCore..DataStream+use"></a>

#### dataStream.use(func) ⇒ <code>\*</code>
Calls the passed in place with the stream as first argument, returns result.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>\*</code> - anything the passed function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

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
<a name="module_ScramjetCore..DataStream+reduce"></a>

#### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulator

Works similarily to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter.

This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it's much slower than parallel functions.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the
call of the transform function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="module_ScramjetCore..DataStream+each"></a>

#### dataStream.each(func) ↩︎
Performs an operation on every chunk, without changing the stream

This is a shorthand for ```stream.on("data", func)```

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | a callback called for each chunk. |

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

<a name="module_ScramjetCore..DataStream+toBufferStream"></a>

#### dataStream.toBufferStream(serializer) ⇒ <code>BufferStream</code>
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
<a name="module_ScramjetCore..DataStream+toArray"></a>

#### dataStream.toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single Array

In fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of [<code>DataStream</code>](#module_ScramjetCore..DataStream)  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream
                   end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

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

### ScramjetCore~whenWrote() ⇒ <code>Promise.&lt;Object&gt;</code>
Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - the read item  
<a name="module_ScramjetCore..setOptions"></a>

### ScramjetCore~setOptions(options) ↩︎
Allows resetting stream options.

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type |
| --- | --- |
| options | <code>StreamOptions</code> | 

<a name="module_ScramjetCore..toStringStream"></a>

### ScramjetCore~toStringStream()
Alias for [DataStream#stringify](DataStream#stringify)

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..StreamOptions"></a>

### ScramjetCore~StreamOptions : <code>Object</code>
Standard options for scramjet streams.

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxParallel | <code>Number</code> | the number of transforms done in parallel |
| referrer | <code>DataStream</code> | a referring stream to point to (if possible the transforms will be pushed to it                                 instead of creating a new stream) |

<a name="module_ScramjetCore..TeeCallback"></a>

### ScramjetCore~TeeCallback : <code>function</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| teed | <code>DataStream</code> | The teed stream |

<a name="module_ScramjetCore..ReduceCallback"></a>

### ScramjetCore~ReduceCallback ⇒ <code>Promise</code> \| <code>\*</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | the accumulator - the object initially passed or retuned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

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

