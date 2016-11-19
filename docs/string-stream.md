<a name="StringStream"></a>

## StringStream ⇐ <code>DataStream</code>
A stream of string objects for further transformation on top of DataStream.

**Kind**: global class  
**Extends:** <code>DataStream</code>  

* [StringStream](#StringStream) ⇐ <code>DataStream</code>
    * [new StringStream(encoding)](#new_StringStream_new)
    * [.split(splitter)](#StringStream+split) ⇒ <code>BufferStream</code>
    * [.match(splitter)](#StringStream+match) ⇒ <code>[StringStream](#StringStream)</code>

<a name="new_StringStream_new"></a>

### new StringStream(encoding)
Constructs the stream with the given encoding.


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

<a name="StringStream+split"></a>

### stringStream.split(splitter) ⇒ <code>BufferStream</code>
Splits the buffer stream into buffer objects according to the passedfunction.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>BufferStream</code> - the re-splitted buffer stream.  
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
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

