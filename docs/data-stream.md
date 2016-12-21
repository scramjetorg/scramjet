## Classes

<dl>
<dt><a href="#DataStream">DataStream</a> ⇐ <code>stream.PassThrough</code></dt>
<dd><p>DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GroupCallback">GroupCallback</a> ⇒ <code>Promise</code> | <code>String</code></dt>
<dd></dd>
<dt><a href="#TeeCallback">TeeCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#AccumulateCallback">AccumulateCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#ReduceCallback">ReduceCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#RemapCallback">RemapCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#MapCallback">MapCallback</a> ⇒ <code>Promise</code> | <code>*</code></dt>
<dd></dd>
<dt><a href="#FilterCallback">FilterCallback</a> ⇒ <code>Promise</code> | <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#PopCallback">PopCallback</a> : <code>function</code></dt>
<dd><p>Pop callback</p>
</dd>
</dl>

<a name="DataStream"></a>

## DataStream ⇐ <code>stream.PassThrough</code>
DataStream is the primary stream type for Scramjet. When you parse yourstream, just pipe it you can then perform calculations on the data objectsstreamed through your flow.

**Kind**: global class  
**Extends:** <code>stream.PassThrough</code>  

* [DataStream](#DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_DataStream_new)
    * _instance_
        * [.debug(func)](#DataStream+debug) ⇒ <code>[DataStream](#DataStream)</code>
        * [.group(func)](#DataStream+group) ⇒ <code>[DataStream](#DataStream)</code>
        * [.tee(func)](#DataStream+tee) ⇒ <code>[DataStream](#DataStream)</code>
        * [.slice(start, end, func)](#DataStream+slice) ⇒ <code>[DataStream](#DataStream)</code>
        * [.accumulate(func, into)](#DataStream+accumulate) ⇒ <code>Promise</code>
        * [.reduce(func, into)](#DataStream+reduce) ⇒ <code>Promise</code>
        * [.reduceNow(func, into)](#DataStream+reduceNow) ⇒ <code>Promise</code>
        * [.remap(func, Clazz)](#DataStream+remap) ⇒ <code>[DataStream](#DataStream)</code>
        * [.each(func)](#DataStream+each) ↩︎
        * [.map(func)](#DataStream+map) ⇒ <code>[DataStream](#DataStream)</code>
        * [.filter(func)](#DataStream+filter) ⇒ <code>[DataStream](#DataStream)</code>
        * [.pop(count, func)](#DataStream+pop) ⇒ <code>[DataStream](#DataStream)</code>
        * [.separate()](#DataStream+separate) ⇒ <code>MultiStream</code>
        * [.toBufferStream(serializer)](#DataStream+toBufferStream) ⇒ <code>BufferStream</code>
        * [.toStringStream(serializer)](#DataStream+toStringStream) ⇒ <code>StringStream</code>
        * [.toArray(initial)](#DataStream+toArray) ⇒ <code>Promise</code>
    * _static_
        * [.fromArray(arr)](#DataStream.fromArray) ⇒ <code>[DataStream](#DataStream)</code>

<a name="new_DataStream_new"></a>

### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

**Example**  
```js
[../samples/data-stream-constructor.js](../samples/data-stream-constructor.js)
```
<a name="DataStream+debug"></a>

### dataStream.debug(func) ⇒ <code>[DataStream](#DataStream)</code>
Injects a ```debugger``` statement when called.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

**Example**  
```js
[../samples/data-stream-debug.js](../samples/data-stream-debug.js)
```
<a name="DataStream+group"></a>

### dataStream.group(func) ⇒ <code>[DataStream](#DataStream)</code>
Groups execution by key in a single threadCalls the given callback for a hash, then makes sure all items with thesame hash are processed by a single thread (or server).

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  
**Todo**

- [ ] Not yet implemented


| Param | Type | Description |
| --- | --- | --- |
| func | <code>[GroupCallback](#GroupCallback)</code> | the callback function |

**Example**  
```js
[../samples/data-stream-group.js](../samples/data-stream-group.js)
```
<a name="DataStream+tee"></a>

### dataStream.tee(func) ⇒ <code>[DataStream](#DataStream)</code>
Duplicate the streamCreates a duplicate stream instance and pases it to the callback.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[TeeCallback](#TeeCallback)</code> | The duplicate stream will be passed as                                  first argument. |

**Example**  
```js
[../samples/data-stream-tee.js](../samples/data-stream-tee.js)
```
<a name="DataStream+slice"></a>

### dataStream.slice(start, end, func) ⇒ <code>[DataStream](#DataStream)</code>
Gets a slice of the stream to the callback function.Returns a stream consisting of an array of items with `0` to `start`omitted and `start` until `end` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not betaken into account.Also note that the stream may end if both arguments are passed.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - the affected stream  
**Todo**

- [ ] to be implemented


| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> | omit this number of entries. |
| end | <code>Number</code> | end at this number of entries (from 0) |
| func | <code>[PopCallback](#PopCallback)</code> | the callback |

**Example**  
```js
[../samples/data-stream-slice.js](../samples/data-stream-slice.js)
```
<a name="DataStream+accumulate"></a>

### dataStream.accumulate(func, into) ⇒ <code>Promise</code>
Accumulates data into the object.Works very similarily to reduce, but result of previous operations haveno influence over the accumulator in the next one.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[AccumulateCallback](#AccumulateCallback)</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

<a name="DataStream+reduce"></a>

### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulatorReduces the stream into the given object. The main difference to nativeis that Array.prototype.reduce is that only the first object will bepassed to the following methods.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the                   call of the transform function.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the                                  first argument, the data object from the                                  stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform                       function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="DataStream+reduceNow"></a>

### dataStream.reduceNow(func, into) ⇒ <code>Promise</code>
Reduces the stream into the given object the same way as {@see reduce},but resolves the promise at once with the passed object.If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the                   call of the transform function.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[ReduceCallback](#ReduceCallback)</code> | The into object will be passed as the first                               argument, the data object from the stream                               as the second. |
| into | <code>Object</code> | Any object passed initally to the transform                       function |

**Example**  
```js
[../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)
```
<a name="DataStream+remap"></a>

### dataStream.remap(func, Clazz) ⇒ <code>[DataStream](#DataStream)</code>
Remaps the stream into a new stream. This means that every item mayemit as many other items as we like.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | A TransformFunction that is called with                                     * `emit` function as the first                                       argument that should be called to                                       push entries in the other stream.                                     * `chunk` chunk. |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-remap.js](../samples/data-stream-remap.js)
```
<a name="DataStream+each"></a>

### dataStream.each(func) ↩︎
Performs an operation on every chunk, without changing the streamThis is a shorthand for ```stream.on("data", func)```

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[MapCallback](#MapCallback)</code> | a callback called for each chunk. |

<a name="DataStream+map"></a>

### dataStream.map(func) ⇒ <code>[DataStream](#DataStream)</code>
Transforms stream objects into new ones, just like Array.prototype.mapdoes.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[MapCallback](#MapCallback)</code> | The function that creates the new object |

**Example**  
```js
[../samples/data-stream-map.js](../samples/data-stream-map.js)
```
<a name="DataStream+filter"></a>

### dataStream.filter(func) ⇒ <code>[DataStream](#DataStream)</code>
Filters object based on the function outcome, just likeArray.prototype.filter.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[FilterCallback](#FilterCallback)</code> | The function that filters the object |

**Example**  
```js
[../samples/data-stream-filter.js](../samples/data-stream-filter.js)
```
<a name="DataStream+pop"></a>

### dataStream.pop(count, func) ⇒ <code>[DataStream](#DataStream)</code>
Pops the first item from the stream and pipes the other

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to pop. |
| func | <code>[PopCallback](#PopCallback)</code> | Function that receives an array of popped items |

**Example**  
```js
[../samples/data-stream-pop.js](../samples/data-stream-pop.js)
```
<a name="DataStream+separate"></a>

### dataStream.separate() ⇒ <code>MultiStream</code>
Splits the stream two ways

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Todo**

- [ ] Not yet implemented. Should use a number of tee+filter combination.


| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>TransformFunction</code> | The list of transfrom functions |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="DataStream+toBufferStream"></a>

### dataStream.toBufferStream(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>[MapCallback](#MapCallback)</code> | A method that converts chunks to buffers |

**Example**  
```js
[../samples/data-stream-tobufferstream.js](../samples/data-stream-tobufferstream.js)
```
<a name="DataStream+toStringStream"></a>

### dataStream.toStringStream(serializer) ⇒ <code>StringStream</code>
Creates a StringStream

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>[MapCallback](#MapCallback)</code> | A method that converts chunks to strings |

**Example**  
```js
[../samples/data-stream-tostringstream.js](../samples/data-stream-tostringstream.js)
```
<a name="DataStream+toArray"></a>

### dataStream.toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single ArrayIn fact it's just a shorthand for reducing the stream into an Array.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream                   end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

<a name="DataStream.fromArray"></a>

### DataStream.fromArray(arr) ⇒ <code>[DataStream](#DataStream)</code>
Create a DataStream from an Array

**Kind**: static method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | list of chunks |

**Example**  
```js
[../samples/data-stream-fromarray.js](../samples/data-stream-fromarray.js)
```
<a name="GroupCallback"></a>

## GroupCallback ⇒ <code>Promise</code> &#124; <code>String</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>String</code> - the key to hash by  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Object</code> | a the object |

<a name="TeeCallback"></a>

## TeeCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| teed | <code>[DataStream](#DataStream)</code> | The teed stream |

<a name="AccumulateCallback"></a>

## AccumulateCallback ⇒ <code>Promise</code> &#124; <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="ReduceCallback"></a>

## ReduceCallback ⇒ <code>Promise</code> &#124; <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| acc | <code>\*</code> | the accumulator - the object initially passed or retuned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="RemapCallback"></a>

## RemapCallback ⇒ <code>Promise</code> &#124; <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="MapCallback"></a>

## MapCallback ⇒ <code>Promise</code> &#124; <code>\*</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="FilterCallback"></a>

## FilterCallback ⇒ <code>Promise</code> &#124; <code>Boolean</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> &#124; <code>Boolean</code> - information if the object should remain in                            the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="PopCallback"></a>

## PopCallback : <code>function</code>
Pop callback

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| popped | <code>Array.&lt;Object&gt;</code> | an array of popped chunks |

