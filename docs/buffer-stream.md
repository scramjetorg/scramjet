## Classes

<dl>
<dt><a href="#BufferStream">BufferStream</a> ⇐ <code>DataStream</code></dt>
<dd><p>A factilitation stream created for easy splitting or parsing buffers</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PopCallback">PopCallback</a> : <code>function</code></dt>
<dd><p>Pop callback</p>
</dd>
<dt><a href="#ParseCallback">ParseCallback</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="BufferStream"></a>

## BufferStream ⇐ <code>DataStream</code>
A factilitation stream created for easy splitting or parsing buffers

**Kind**: global class  
**Extends:** <code>DataStream</code>  

* [BufferStream](#BufferStream) ⇐ <code>DataStream</code>
    * [new BufferStream(opts)](#new_BufferStream_new)
    * [.shift(chars, func)](#BufferStream+shift) ⇒ <code>[BufferStream](#BufferStream)</code>
    * [.split(splitter)](#BufferStream+split) ⇒ <code>[BufferStream](#BufferStream)</code>
    * [.breakup(number)](#BufferStream+breakup) ⇒ <code>[BufferStream](#BufferStream)</code>
    * [.toStringStream(encoding)](#BufferStream+toStringStream) ⇒ <code>StringStream</code>
    * [.parse(parser)](#BufferStream+parse) ⇒ <code>DataStream</code>

<a name="new_BufferStream_new"></a>

### new BufferStream(opts)
Creates the BufferStream


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

**Example**  
```js
[../samples/buffer-stream-constructor.js](../samples/buffer-stream-constructor.js)
```
<a name="BufferStream+shift"></a>

### bufferStream.shift(chars, func) ⇒ <code>[BufferStream](#BufferStream)</code>
Shift given number of bytes from the original streamWorks the same way as {@see DataStream.shift}, but in this case extractsthe given number of bytes.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>[BufferStream](#BufferStream)</code> - substream  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | <code>[PopCallback](#PopCallback)</code> | Function that receives a string of shifted bytes |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="BufferStream+split"></a>

### bufferStream.split(splitter) ⇒ <code>[BufferStream](#BufferStream)</code>
Splits the buffer stream into buffer objects

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>[BufferStream](#BufferStream)</code> - the re-splitted buffer stream.  
**Todo**

- [ ] implement splitting by function


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>String</code> &#124; <code>Buffer</code> | the buffer or string that the stream                                  should be split by. |

**Example**  
```js
[../samples/buffer-stream-split.js](../samples/buffer-stream-split.js)
```
<a name="BufferStream+breakup"></a>

### bufferStream.breakup(number) ⇒ <code>[BufferStream](#BufferStream)</code>
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>[BufferStream](#BufferStream)</code> - the resulting buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

**Example**  
```js
[../samples/buffer-stream-breakup.js](../samples/buffer-stream-breakup.js)
```
<a name="BufferStream+toStringStream"></a>

### bufferStream.toStringStream(encoding) ⇒ <code>StringStream</code>
Creates a string stream from the given buffer streamStill it returns a DataStream derivative and isn't the typical node.jsstream so you can do all your transforms when you like.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>StringStream</code> - The converted stream.  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

**Example**  
```js
[../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)
```
<a name="BufferStream+parse"></a>

### bufferStream.parse(parser) ⇒ <code>DataStream</code>
[Parallel] Parses every buffer to objectThe method MUST parse EVERY buffer into a single object, so the bufferstream here should already be splitted or broken up.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>[ParseCallback](#ParseCallback)</code> | The transform function |

**Example**  
```js
[../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)
```
<a name="PopCallback"></a>

## PopCallback : <code>function</code>
Pop callback

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| popped | <code>Buffer</code> | popped bytes |

<a name="ParseCallback"></a>

## ParseCallback ⇒ <code>Promise</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

