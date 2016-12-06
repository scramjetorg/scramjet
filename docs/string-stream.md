<a name="StringStream"></a>

## StringStream ⇐ <code>DataStream</code>
A stream of string objects for further transformation on top of DataStream.

**Kind**: global class  
**Extends:** <code>DataStream</code>  

* [StringStream](#StringStream) ⇐ <code>DataStream</code>
    * [new StringStream(encoding)](#new_StringStream_new)
    * _instance_
        * [.split(splitter)](#StringStream+split) ⇒ <code>[StringStream](#StringStream)</code>
        * [.match(splitter)](#StringStream+match) ⇒ <code>[StringStream](#StringStream)</code>
        * [.toBufferStream()](#StringStream+toBufferStream) ⇒ <code>[StringStream](#StringStream)</code>
        * [.parse(parser)](#StringStream+parse) ⇒ <code>DataStream</code>
    * _static_
        * [.SPLIT_LINE](#StringStream.SPLIT_LINE)

<a name="new_StringStream_new"></a>

### new StringStream(encoding)
Constructs the stream with the given encoding.


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

<a name="StringStream+split"></a>

### stringStream.split(splitter) ⇒ <code>[StringStream](#StringStream)</code>
Splits the buffer stream into buffer objects according to the passedfunction.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - the re-splitted string stream.  
**See**: example in file: [../samples/string-stream-split.js](../samples/string-stream-split.js)  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>function</code> | A function that will be called for every                             stream chunk. |

<a name="StringStream+match"></a>

### stringStream.match(splitter) ⇒ <code>[StringStream](#StringStream)</code>
Finds matches in the string stream and streams the match results

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - string stream of matches.  
**See**: example in file: [../samples/string-stream-match.js](../samples/string-stream-match.js)  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

<a name="StringStream+toBufferStream"></a>

### stringStream.toBufferStream() ⇒ <code>[StringStream](#StringStream)</code>
Creates a buffer stream from the given string stream. Still it returns aDataStream derivative and isn't the typical node.js stream so you can doall your transforms when you like.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - The converted stream.  
**See**: example in file: [../samples/string-stream-tobufferstream.js](../samples/string-stream-tobufferstream.js)  
<a name="StringStream+parse"></a>

### stringStream.parse(parser) ⇒ <code>DataStream</code>
Parses every string to object. The method MUST parse EVERY string into asingle object, so the string stream here should already be splitted.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>DataStream</code> - The parsed objects stream.  
**See**: example in file: [../samples/string-stream-parse.js](../samples/string-stream-parse.js)  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>TransformFunction</code> | The transform function |

<a name="StringStream.SPLIT_LINE"></a>

### StringStream.SPLIT_LINE
A handly split by line regex to quickly pass

**Kind**: static property of <code>[StringStream](#StringStream)</code>  
