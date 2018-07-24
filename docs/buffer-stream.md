![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="BufferStream"></a>

## BufferStream : DataStream
A factilitation stream created for easy splitting or parsing buffers.

Useful for working on built-in Node.js streams from files, parsing binary formats etc.

A simple use case would be:

```javascript
 fs.createReadStream('pixels.rgba')
     .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     .breakup(4)                     // split into 4 byte fragments
     .parse(buf => [
         buf.readInt8(0),            // the output is a stream of R,G,B and Alpha
         buf.readInt8(1),            // values from 0-255 in an array.
         buf.readInt8(2),
         buf.readInt8(3)
     ]);
```

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [BufferStream](#BufferStream)  <code>DataStream</code>
    * [new BufferStream(opts)](#new_BufferStream_new)
    * [bufferStream.shift(chars, func)](#BufferStream+shift) ↺ [<code>BufferStream</code>](#BufferStream)
    * [bufferStream.split(splitter)](#BufferStream+split) ↺ [<code>BufferStream</code>](#BufferStream)
    * [bufferStream.breakup(number)](#BufferStream+breakup) ↺ [<code>BufferStream</code>](#BufferStream)
    * [bufferStream.stringify(encoding)](#BufferStream+stringify)  <code>StringStream</code>
    * [bufferStream.parse(parser)](#BufferStream+parse)  <code>DataStream</code>
    * [bufferStream.toStringStream(encoding)](#BufferStream+toStringStream)  <code>StringStream</code>
    * [bufferStream.pop(chars, func)](#BufferStream+pop) ↺ [<code>BufferStream</code>](#BufferStream)
    * [bufferStream.toDataStream(parser)](#BufferStream+toDataStream)  <code>DataStream</code>
    * [BufferStream:from()](#BufferStream.from)

<a name="new_BufferStream_new"></a>

### new BufferStream(opts)
Creates the BufferStream


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

<a name="BufferStream+shift"></a>

### bufferStream.shift(chars, func) : BufferStream ↺
Shift given number of bytes from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of bytes.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - substream  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | [<code>ShiftCallback</code>](#ShiftCallback) | Function that receives a string of shifted bytes |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="BufferStream+split"></a>

### bufferStream.split(splitter) : BufferStream ↺
Splits the buffer stream into buffer objects

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - the re-split buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>String</code> \| <code>Buffer</code> | the buffer or string that the stream                                  should be split by. |

**Example**  
```js
[../samples/buffer-stream-split.js](../samples/buffer-stream-split.js)
```
<a name="BufferStream+breakup"></a>

### bufferStream.breakup(number) : BufferStream ↺
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - the resulting buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

**Example**  
```js
[../samples/buffer-stream-breakup.js](../samples/buffer-stream-breakup.js)
```
<a name="BufferStream+stringify"></a>

### bufferStream.stringify(encoding) : StringStream
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>StringStream</code> - The converted stream.  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

**Example**  
```js
[../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)
```
<a name="BufferStream+parse"></a>

### bufferStream.parse(parser) : DataStream
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be split or broken up.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | [<code>ParseCallback</code>](#ParseCallback) | The transform function |

**Example**  
```js
[../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)
```
<a name="BufferStream+toStringStream"></a>

### bufferStream.toStringStream(encoding) : StringStream
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>StringStream</code> - The converted stream.  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

**Example**  
```js
[../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)
```
<a name="BufferStream+pop"></a>

### bufferStream.pop(chars, func) : BufferStream ↺
Shift given number of bytes from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of bytes.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - substream  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | [<code>ShiftCallback</code>](#ShiftCallback) | Function that receives a string of shifted bytes |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="BufferStream+toDataStream"></a>

### bufferStream.toDataStream(parser) : DataStream
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be split or broken up.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | [<code>ParseCallback</code>](#ParseCallback) | The transform function |

**Example**  
```js
[../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)
```
<a name="BufferStream.from"></a>

### BufferStream:from()
Create BufferStream from anything.

**Kind**: static method of [<code>BufferStream</code>](#BufferStream)  
**See**: module:scramjet.from  
<a name="toStringStream"></a>

## toStringStream()
Alias for [stringify](#BufferStream+stringify)

**Kind**: global function  
<a name="ShiftCallback"></a>

## ShiftCallback : function
Shift callback

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Buffer</code> | shifted bytes |

<a name="ParseCallback"></a>

## ParseCallback : Promise
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

