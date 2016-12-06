<a name="BufferStream"></a>

## BufferStream ⇐ <code>DataStream</code>
A factilitation stream created for easy splitting or parsing a buffer

**Kind**: global class  
**Extends:** <code>DataStream</code>  

* [BufferStream](#BufferStream) ⇐ <code>DataStream</code>
    * [new BufferStream(opts)](#new_BufferStream_new)
    * [.split(splitter)](#BufferStream+split) ⇒ <code>[BufferStream](#BufferStream)</code>
    * [.breakup(number)](#BufferStream+breakup) ⇒ <code>[BufferStream](#BufferStream)</code>
    * [.toStringStream(encoding)](#BufferStream+toStringStream) ⇒ <code>StringStream</code>
    * [.parse(parser)](#BufferStream+parse) ⇒ <code>DataStream</code>

<a name="new_BufferStream_new"></a>

### new BufferStream(opts)
Create the BufferStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

<a name="BufferStream+split"></a>

### bufferStream.split(splitter) ⇒ <code>[BufferStream](#BufferStream)</code>
Splits the buffer stream into buffer objects according to the passedfunction.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>[BufferStream](#BufferStream)</code> - the re-splitted buffer stream.  
**See**: example in file: [../samples/buffer-stream-split.js](../samples/buffer-stream-split.js)  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>function</code> | A function that will be called for every                             stream chunk. |

<a name="BufferStream+breakup"></a>

### bufferStream.breakup(number) ⇒ <code>[BufferStream](#BufferStream)</code>
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>[BufferStream](#BufferStream)</code> - the resulting buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

<a name="BufferStream+toStringStream"></a>

### bufferStream.toStringStream(encoding) ⇒ <code>StringStream</code>
Creates a string stream from the given buffer stream. Still it returns aDataStream derivative and isn't the typical node.js stream so you can doall your transforms when you like.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>StringStream</code> - The converted stream.  
**See**: example in file: [../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

<a name="BufferStream+parse"></a>

### bufferStream.parse(parser) ⇒ <code>DataStream</code>
Parses every buffer to object. The method MUST parse EVERY buffer into asingle object, so the buffer stream here should already be splitted.

**Kind**: instance method of <code>[BufferStream](#BufferStream)</code>  
**Returns**: <code>DataStream</code> - The parsed objects stream.  
**See**: example in file: [../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>TransformFunction</code> | The transform function |

