## Classes

<dl>
<dt><a href="#StringStream">StringStream</a> ⇐ <code>DataStream</code></dt>
<dd><p>A stream of string objects for further transformation on top of DataStream.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ShiftCallback">ShiftCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ParseCallback">ParseCallback</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="StringStream"></a>

## StringStream ⇐ <code>DataStream</code>
A stream of string objects for further transformation on top of DataStream.

**Kind**: global class  
**Extends:** <code>DataStream</code>  

* [StringStream](#StringStream) ⇐ <code>DataStream</code>
    * [new StringStream(encoding)](#new_StringStream_new)
    * _instance_
        * [.shift(bytes, func)](#StringStream+shift) ⇒ <code>[StringStream](#StringStream)</code>
        * [.split(splitter)](#StringStream+split) ⇒ <code>[StringStream](#StringStream)</code>
        * [.append(arg)](#StringStream+append) ⇒ <code>[StringStream](#StringStream)</code>
        * [.prepend(arg)](#StringStream+prepend) ⇒ <code>[StringStream](#StringStream)</code>
        * [.match(splitter)](#StringStream+match) ⇒ <code>[StringStream](#StringStream)</code>
        * [.toBufferStream()](#StringStream+toBufferStream) ⇒ <code>[StringStream](#StringStream)</code>
        * [.parse(parser)](#StringStream+parse) ⇒ <code>DataStream</code>
    * _static_
        * [.SPLIT_LINE](#StringStream.SPLIT_LINE)
        * [.fromString(str, encoding)](#StringStream.fromString) ⇒ <code>[StringStream](#StringStream)</code>

<a name="new_StringStream_new"></a>

### new StringStream(encoding)
Constructs the stream with the given encoding


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

**Example**  
```js
[../samples/string-stream-constructor.js](../samples/string-stream-constructor.js)
```
<a name="StringStream+shift"></a>

### stringStream.shift(bytes, func) ⇒ <code>[StringStream](#StringStream)</code>
Shifts given length of chars from the original streamWorks the same way as {@see DataStream.shift}, but in this case extractsthe given number of characters.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | <code>[ShiftCallback](#ShiftCallback)</code> | Function that receives a string of shifted                                 chars. |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="StringStream+split"></a>

### stringStream.split(splitter) ⇒ <code>[StringStream](#StringStream)</code>
Splits the string stream by the specified regexp or string

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - the re-splitted string stream.  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> &#124; <code>String</code> | What to split by |

**Example**  
```js
[../samples/string-stream-split.js](../samples/string-stream-split.js)
```
<a name="StringStream+append"></a>

### stringStream.append(arg) ⇒ <code>[StringStream](#StringStream)</code>
Appends given argument to all the items.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>function</code> &#124; <code>String</code> | the argument to append. If function passed then it will be called and resolved                              and the resolution will be appended. |

**Example**  
```js
[../samples/string-stream-append.js](../samples/string-stream-append.js)
```
<a name="StringStream+prepend"></a>

### stringStream.prepend(arg) ⇒ <code>[StringStream](#StringStream)</code>
Prepends given argument to all the items.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>function</code> &#124; <code>String</code> | the argument to prepend. If function passed then it will be called and resolved                              and the resolution will be prepended. |

**Example**  
```js
[../samples/string-stream-prepend.js](../samples/string-stream-prepend.js)
```
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

**Example**  
```js
[../samples/string-stream-match.js](../samples/string-stream-match.js)
```
<a name="StringStream+toBufferStream"></a>

### stringStream.toBufferStream() ⇒ <code>[StringStream](#StringStream)</code>
Transforms the StringStream to BufferStreamCreates a buffer stream from the given string stream. Still it returns aDataStream derivative and isn't the typical node.js stream so you can doall your transforms when you like.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - The converted stream.  
**Example**  
```js
[../samples/string-stream-tobufferstream.js](../samples/string-stream-tobufferstream.js)
```
<a name="StringStream+parse"></a>

### stringStream.parse(parser) ⇒ <code>DataStream</code>
Parses every string to objectThe method MUST parse EVERY string into a single object, so the stringstream here should already be splitted.

**Kind**: instance method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>[ParseCallback](#ParseCallback)</code> | The transform function |

**Example**  
```js
[../samples/string-stream-parse.js](../samples/string-stream-parse.js)
```
<a name="StringStream.SPLIT_LINE"></a>

### StringStream.SPLIT_LINE
A handly split by line regex to quickly get a line-by-line stream

**Kind**: static property of <code>[StringStream](#StringStream)</code>  
<a name="StringStream.fromString"></a>

### StringStream.fromString(str, encoding) ⇒ <code>[StringStream](#StringStream)</code>
Creates a StringStream and writes a specific string.

**Kind**: static method of <code>[StringStream](#StringStream)</code>  
**Returns**: <code>[StringStream](#StringStream)</code> - new StringStream.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | the string to push the your stream |
| encoding | <code>String</code> | optional encoding |

<a name="ShiftCallback"></a>

## ShiftCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>String</code> | Pooped chars |

<a name="ParseCallback"></a>

## ParseCallback ⇒ <code>Promise</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

