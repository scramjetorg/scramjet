![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.BufferStream"></a>

## :BufferStream : DataStream
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

**Kind**: static class  
**Extends**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)  
**Test**: test/methods/buffer-stream-constructor.js  

* [:BufferStream](#module_scramjet.BufferStream)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [new BufferStream([opts])](#new_module_scramjet.BufferStream_new)
    * [bufferStream.shift(chars, func)](#module_scramjet.BufferStream+shift) ↺
    * [bufferStream.split(splitter)](#module_scramjet.BufferStream+split) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [bufferStream.breakup(number)](#module_scramjet.BufferStream+breakup) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [bufferStream.stringify([encoding])](#module_scramjet.BufferStream+stringify)  [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [bufferStream.parse(parser)](#module_scramjet.BufferStream+parse)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [BufferStream:pipeline(readable)](#module_scramjet.BufferStream.pipeline)  [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [BufferStream:from(stream, [options])](#module_scramjet.BufferStream.from)  [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)

<a name="new_module_scramjet.BufferStream_new"></a>

### new BufferStream([opts])
Creates the BufferStream


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | Stream options passed to superclass |

<a name="module_scramjet.BufferStream+shift"></a>

### bufferStream.shift(chars, func) ↺
Shift given number of bytes from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of bytes.

**Kind**: instance method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Chainable**  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>number</code> | The number of bytes to shift |
| func | [<code>ShiftBufferCallback</code>](definitions.md#module_scramjet..ShiftBufferCallback) | Function that receives a string of shifted bytes |

<a name="module_scramjet.BufferStream+split"></a>

### bufferStream.split(splitter) : BufferStream ↺
Splits the buffer stream into buffer objects

**Kind**: instance method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - the re-split buffer stream.  
**Test**: test/methods/buffer-stream-split.js  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>string</code> \| <code>Buffer</code> | the buffer or string that the stream                                  should be split by. |

<a name="module_scramjet.BufferStream+breakup"></a>

### bufferStream.breakup(number) : BufferStream ↺
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - the resulting buffer stream.  
**Test**: test/methods/buffer-stream-breakup.js  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | the desired chunk length |

<a name="module_scramjet.BufferStream+stringify"></a>

### bufferStream.stringify([encoding]) : StringStream
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - The converted stream.  
**Test**: test/methods/buffer-stream-tostringstream.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [encoding] | <code>string</code> \| <code>any</code> | <code>&quot;\&quot;utf-8\&quot;&quot;</code> | The encoding to be used to convert the buffers                           to streams. |

<a name="module_scramjet.BufferStream+parse"></a>

### bufferStream.parse(parser) : DataStream
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be split or broken up.

**Kind**: instance method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - The parsed objects stream.  
**Test**: test/methods/buffer-stream-parse.js  

| Param | Type | Description |
| --- | --- | --- |
| parser | [<code>BufferParseCallback</code>](definitions.md#module_scramjet..BufferParseCallback) | The transform function |

<a name="module_scramjet.BufferStream.pipeline"></a>

### BufferStream:pipeline(readable) : BufferStream
Creates a pipeline of streams and returns a scramjet stream.

**Kind**: static method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - a new StringStream instance of the resulting pipeline  
**See**: DataStream.pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| ...transforms | <code>Array.&lt;(AsyncFunction\|function()\|Transform)&gt;</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="module_scramjet.BufferStream.from"></a>

### BufferStream:from(stream, [options]) : BufferStream
Create BufferStream from anything.

**Kind**: static method of [<code>BufferStream</code>](#module_scramjet.BufferStream)  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - new StringStream.  
**See**: module:scramjet.from  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stream | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>Readable</code> |  | argument to be turned into new stream |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) \| <code>Writable</code> | <code>{}</code> | options passed to the new stream if created |

