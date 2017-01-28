## Functions

<dl>
<dt><a href="#debug">debug(func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Injects a <code>debugger</code> statement when called.</p>
</dd>
<dt><a href="#group">group(func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Groups execution by key in a single thread</p>
<p>Calls the given callback for a hash, then makes sure all items with the
same hash are processed by a single thread (or server).</p>
</dd>
<dt><a href="#tee">tee(func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Duplicate the stream</p>
<p>Creates a duplicate stream instance and pases it to the callback.</p>
</dd>
<dt><a href="#slice">slice(start, end, func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Gets a slice of the stream to the callback function.</p>
<p>Returns a stream consisting of an array of items with <code>0</code> to <code>start</code>
omitted and <code>start</code> until <code>end</code> included. Works similarily to
Array.prototype.slice.
Takes count from the moment it&#39;s called. Any previous items will not be
taken into account.
Also note that the stream may end if both arguments are passed.</p>
</dd>
<dt><a href="#accumulate">accumulate(func, into)</a> ⇒ <code>Promise</code></dt>
<dd><p>Accumulates data into the object.</p>
<p>Works very similarily to reduce, but result of previous operations have
no influence over the accumulator in the next one.</p>
<p>Method is parallel</p>
</dd>
<dt><a href="#reduce">reduce(func, into)</a> ⇒ <code>Promise</code></dt>
<dd><p>Reduces the stream into a given accumulator</p>
<p>Works similarily to Array.prototype.reduce, so whatever you return in the
former operation will be the first operand to the latter.</p>
<p>This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it&#39;s much slower than parallel functions.</p>
</dd>
<dt><a href="#reduceNow">reduceNow(func, into)</a> ⇒ <code>*</code></dt>
<dd><p>Reduces the stream into the given object, returning it immediately.</p>
<p>The main difference to reduce is that only the first object will be
returned at once (however the method will be called with the previous
entry).
If the object is an instance of EventEmitter then it will propagate the
error from the previous stream.</p>
<p>This method is serial - meaning that any processing on an entry will
occur only after the previous entry is fully processed. This does mean
it&#39;s much slower than parallel functions.</p>
</dd>
<dt><a href="#remap">remap(func, Clazz)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Remaps the stream into a new stream.</p>
<p>This means that every item may emit as many other items as we like.</p>
</dd>
<dt><a href="#each">each(func)</a> ↩︎</dt>
<dd><p>Performs an operation on every chunk, without changing the stream</p>
<p>This is a shorthand for <code>stream.on(&quot;data&quot;, func)</code></p>
</dd>
<dt><a href="#map">map(func, Clazz)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Transforms stream objects into new ones, just like Array.prototype.map
does.</p>
</dd>
<dt><a href="#filter">filter(func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Filters object based on the function outcome, just like
Array.prototype.filter.</p>
</dd>
<dt><a href="#pop">pop(count, func)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Pops the first item from the stream and pipes the other</p>
</dd>
<dt><a href="#separate">separate()</a> ⇒ <code>MultiStream</code></dt>
<dd><p>Splits the stream two ways</p>
</dd>
<dt><a href="#toBufferStream">toBufferStream(serializer)</a> ⇒ <code>BufferStream</code></dt>
<dd><p>Creates a BufferStream</p>
</dd>
<dt><a href="#toStringStream">toStringStream(serializer)</a> ⇒ <code>StringStream</code></dt>
<dd><p>Creates a StringStream</p>
</dd>
<dt><a href="#fromArray">fromArray(arr)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Create a DataStream from an Array</p>
</dd>
<dt><a href="#toArray">toArray(initial)</a> ⇒ <code>Promise</code></dt>
<dd><p>Aggregates the stream into a single Array</p>
<p>In fact it&#39;s just a shorthand for reducing the stream into an Array.</p>
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

<a name="debug"></a>

## debug(func) ⇒ <code>DataStream</code>
Injects a ```debugger``` statement when called.

**Kind**: global function  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

**Example**  
```js
[../samples/data-stream-debug.js](../samples/data-stream-debug.js)
```
<a name="group"></a>

## group(func) ⇒ <code>DataStream</code>
Groups execution by key in a single threadCalls the given callback for a hash, then makes sure all items with thesame hash are processed by a single thread (or server).

**Kind**: global function  
**Returns**: <code>DataStream</code> - self  
**Todo**

- [ ] Not yet implemented


| Param | Type | Description |
| --- | --- | --- |
| func | <code>[GroupCallback](#GroupCallback)</code> | the callback function |

**Example**  
```js
[../samples/data-stream-group.js](../samples/data-stream-group.js)
```
<a name="tee"></a>

## tee(func) ⇒ <code>DataStream</code>
Duplicate the streamCreates a duplicate stream instance and pases it to the callback.

**Kind**: global function  
**Returns**: <code>DataStream</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[TeeCallback](#TeeCallback)</code> | The duplicate stream will be passed as                                  first argument. |

**Example**  
```js
[../samples/data-stream-tee.js](../samples/data-stream-tee.js)
```
<a name="slice"></a>

## slice(start, end, func) ⇒ <code>DataStream</code>
Gets a slice of the stream to the callback function.Returns a stream consisting of an array of items with `0` to `start`omitted and `start` until `end` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not betaken into account.Also note that the stream may end if both arguments are passed.

**Kind**: global function  
**Returns**: <code>DataStream</code> - the affected stream  
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
<a name="accumulate"></a>

## accumulate(func, into) ⇒ <code>Promise</code>
Accumulates data into the object.Works very similarily to reduce, but result of previous operations haveno influence over the accumulator in the next one.Method is parallel

**Kind**: global function  
**Returns**: <code>Promise</code> - resolved with the "into" object on stream end.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[AccumulateCallback](#AccumulateCallback)</code> | The accumulation function |
| into | <code>\*</code> | Accumulator object |

**Example**  
```js
[../samples/data-stream-accumulate.js](../samples/data-stream-accumulate.js)
```
<a name="reduce"></a>

## reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into a given accumulatorWorks similarily to Array.prototype.reduce, so whatever you return in theformer operation will be the first operand to the latter.This method is serial - meaning that any processing on an entry willoccur only after the previous entry is fully processed. This does meanit's much slower than parallel functions.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by thecall of the transform function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)
```
<a name="reduceNow"></a>

## reduceNow(func, into) ⇒ <code>\*</code>
Reduces the stream into the given object, returning it immediately.The main difference to reduce is that only the first object will bereturned at once (however the method will be called with the previousentry).If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.This method is serial - meaning that any processing on an entry willoccur only after the previous entry is fully processed. This does meanit's much slower than parallel functions.

**Kind**: global function  
**Returns**: <code>\*</code> - whatever was passed as into  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[ReduceCallback](#ReduceCallback)</code> | The into object will be passed as the first argument, the data object from the stream as the second. |
| into | <code>\*</code> &#124; <code>EventEmitter</code> | Any object passed initally to the transform function |

**Example**  
```js
[../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)
```
<a name="remap"></a>

## remap(func, Clazz) ⇒ <code>DataStream</code>
Remaps the stream into a new stream.This means that every item may emit as many other items as we like.

**Kind**: global function  
**Returns**: <code>DataStream</code> - a new DataStream of the given class with new chunks  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[RemapCallback](#RemapCallback)</code> | A callback that is called on every chunk |
| Clazz | <code>class</code> | Optional DataStream subclass to be constructed |

**Example**  
```js
[../samples/data-stream-remap.js](../samples/data-stream-remap.js)
```
<a name="each"></a>

## each(func) ↩︎
Performs an operation on every chunk, without changing the streamThis is a shorthand for ```stream.on("data", func)```

**Kind**: global function  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[MapCallback](#MapCallback)</code> | a callback called for each chunk. |

<a name="map"></a>

## map(func, Clazz) ⇒ <code>DataStream</code>
Transforms stream objects into new ones, just like Array.prototype.mapdoes.

**Kind**: global function  
**Returns**: <code>DataStream</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[MapCallback](#MapCallback)</code> | The function that creates the new object |
| Clazz | <code>Class</code> | (optional) The class to be mapped to. |

**Example**  
```js
[../samples/data-stream-map.js](../samples/data-stream-map.js)
```
<a name="filter"></a>

## filter(func) ⇒ <code>DataStream</code>
Filters object based on the function outcome, just likeArray.prototype.filter.

**Kind**: global function  
**Returns**: <code>DataStream</code> - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>[FilterCallback](#FilterCallback)</code> | The function that filters the object |

**Example**  
```js
[../samples/data-stream-filter.js](../samples/data-stream-filter.js)
```
<a name="pop"></a>

## pop(count, func) ⇒ <code>DataStream</code>
Pops the first item from the stream and pipes the other

**Kind**: global function  
**Returns**: <code>DataStream</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to pop. |
| func | <code>[PopCallback](#PopCallback)</code> | Function that receives an array of popped items |

**Example**  
```js
[../samples/data-stream-pop.js](../samples/data-stream-pop.js)
```
<a name="separate"></a>

## separate() ⇒ <code>MultiStream</code>
Splits the stream two ways

**Kind**: global function  
**Todo**

- [ ] Not yet implemented. Should use a number of tee+filter combination.


| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>TransformFunction</code> | The list of transfrom functions |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="toBufferStream"></a>

## toBufferStream(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: global function  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>[MapCallback](#MapCallback)</code> | A method that converts chunks to buffers |

**Example**  
```js
[../samples/data-stream-tobufferstream.js](../samples/data-stream-tobufferstream.js)
```
<a name="toStringStream"></a>

## toStringStream(serializer) ⇒ <code>StringStream</code>
Creates a StringStream

**Kind**: global function  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>[MapCallback](#MapCallback)</code> | A method that converts chunks to strings |

**Example**  
```js
[../samples/data-stream-tostringstream.js](../samples/data-stream-tostringstream.js)
```
<a name="fromArray"></a>

## fromArray(arr) ⇒ <code>DataStream</code>
Create a DataStream from an Array

**Kind**: global function  
**Returns**: <code>DataStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | list of chunks |

**Example**  
```js
[../samples/data-stream-fromarray.js](../samples/data-stream-fromarray.js)
```
<a name="toArray"></a>

## toArray(initial) ⇒ <code>Promise</code>
Aggregates the stream into a single ArrayIn fact it's just a shorthand for reducing the stream into an Array.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise resolved with the resulting array on stream                   end.  

| Param | Type | Description |
| --- | --- | --- |
| initial | <code>Array</code> | Optional array to begin with. |

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
| teed | <code>DataStream</code> | The teed stream |

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

