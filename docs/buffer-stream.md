![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="BufferStream"></a>

## BufferStream : DataStream
A facilitation stream created for easy splitting or parsing buffers.

Useful for working on built-in Node.js streams from files, parsing binary formats etc.

A simple use case would be:

```javascript
 fs.createReadStream('pixels.rgba')
     .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     .breakup(4)                     // split into 4 byte fragments
     .parse(buffer => [
         buffer.readInt8(0),            // the output is a stream of R,G,B and Alpha
         buffer.readInt8(1),            // values from 0-255 in an array.
         buffer.readInt8(2),
         buffer.readInt8(3)
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
    * [BufferStream:pipeline(readable, transforms)](#BufferStream.pipeline)  [<code>BufferStream</code>](#BufferStream)
    * [BufferStream:from(stream, options)](#BufferStream.from)  [<code>BufferStream</code>](#BufferStream)
    * [BufferStream:ShiftCallback](#BufferStream.ShiftCallback)  <code>function</code>
    * [BufferStream:ParseCallback](#BufferStream.ParseCallback)  <code>Promise</code>

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
**Returns**: [<code>BufferStream</code>](#BufferStream) - sub-stream  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | <code>ShiftCallback</code> | Function that receives a string of shifted bytes |

<a name="BufferStream+split"></a>

### bufferStream.split(splitter) : BufferStream ↺
Splits the buffer stream into buffer objects

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - the re-split buffer stream.  
**Test**: test/methods/buffer-stream-split.js  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>String</code> \| <code>Buffer</code> | the buffer or string that the stream                                  should be split by. |

<a name="BufferStream+breakup"></a>

### bufferStream.breakup(number) : BufferStream ↺
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - the resulting buffer stream.  
**Test**: test/methods/buffer-stream-breakup.js  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

<a name="BufferStream+stringify"></a>

### bufferStream.stringify(encoding) : StringStream
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>StringStream</code> - The converted stream.  
**Test**: test/methods/buffer-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

<a name="BufferStream+parse"></a>

### bufferStream.parse(parser) : DataStream
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be split or broken up.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>DataStream</code> - The parsed objects stream.  
**Test**: test/methods/buffer-stream-parse.js  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>ParseCallback</code> | The transform function |

<a name="BufferStream+toStringStream"></a>

### bufferStream.toStringStream(encoding) : StringStream
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>StringStream</code> - The converted stream.  
**Test**: test/methods/buffer-stream-tostringstream.js  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

<a name="BufferStream+pop"></a>

### bufferStream.pop(chars, func) : BufferStream ↺
Shift given number of bytes from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of bytes.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](#BufferStream) - sub-stream  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | <code>ShiftCallback</code> | Function that receives a string of shifted bytes |

<a name="BufferStream+toDataStream"></a>

### bufferStream.toDataStream(parser) : DataStream
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be split or broken up.

**Kind**: instance method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>DataStream</code> - The parsed objects stream.  
**Test**: test/methods/buffer-stream-parse.js  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>ParseCallback</code> | The transform function |

<a name="BufferStream.pipeline"></a>

### BufferStream:pipeline(readable, transforms) : BufferStream
Creates a pipeline of streams and returns a scramjet stream.

**Kind**: static method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: [<code>BufferStream</code>](#BufferStream) - a new StringStream instance of the resulting pipeline  
**See**: DataStream.pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| transforms | <code>AsyncFunction</code> \| <code>function</code> \| <code>Transform</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="BufferStream.from"></a>

### BufferStream:from(stream, options) : BufferStream
Create BufferStream from anything.

**Kind**: static method of [<code>BufferStream</code>](#BufferStream)  
**Returns**: [<code>BufferStream</code>](#BufferStream) - new StringStream.  
**See**: module:scramjet.from  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>Readable</code> | argument to be turned into new stream |
| options | <code>StreamOptions</code> \| <code>Writable</code> |  |

<a name="BufferStream.ShiftCallback"></a>

### BufferStream:ShiftCallback : function
Shift Function

**Kind**: static typedef of [<code>BufferStream</code>](#BufferStream)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Buffer</code> | shifted bytes |

<a name="BufferStream.ParseCallback"></a>

### BufferStream:ParseCallback : Promise
**Kind**: static typedef of [<code>BufferStream</code>](#BufferStream)  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

