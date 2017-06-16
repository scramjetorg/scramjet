<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~StringStream](#module_ScramjetCore..StringStream) ⇐ <code>DataStream</code>
        * [new StringStream(encoding)](#new_module_ScramjetCore..StringStream_new)
        * _instance_
            * [.shift(bytes, func)](#module_ScramjetCore..StringStream+shift) ⇒ <code>StringStream</code>
            * [.split(splitter)](#module_ScramjetCore..StringStream+split) ⇒ <code>StringStream</code>
            * [.match(splitter)](#module_ScramjetCore..StringStream+match) ⇒ <code>StringStream</code>
            * [.toBufferStream()](#module_ScramjetCore..StringStream+toBufferStream) ⇒ <code>StringStream</code>
            * [.parse(parser)](#module_ScramjetCore..StringStream+parse) ⇒ <code>DataStream</code>
        * _static_
            * [.SPLIT_LINE](#module_ScramjetCore..StringStream.SPLIT_LINE)
            * [.fromString(str, encoding)](#module_ScramjetCore..StringStream.fromString) ⇒ <code>StringStream</code>
    * [~toDataStream()](#module_ScramjetCore..toDataStream)
    * [~ShiftCallback](#module_ScramjetCore..ShiftCallback) : <code>function</code>
    * [~ParseCallback](#module_ScramjetCore..ParseCallback) ⇒ <code>Promise</code>

<a name="module_ScramjetCore..StringStream"></a>

### ScramjetCore~StringStream ⇐ <code>DataStream</code>
A stream of string objects for further transformation on top of DataStream.

**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Extends**: <code>DataStream</code>  

* [~StringStream](#module_ScramjetCore..StringStream) ⇐ <code>DataStream</code>
    * [new StringStream(encoding)](#new_module_ScramjetCore..StringStream_new)
    * _instance_
        * [.shift(bytes, func)](#module_ScramjetCore..StringStream+shift) ⇒ <code>StringStream</code>
        * [.split(splitter)](#module_ScramjetCore..StringStream+split) ⇒ <code>StringStream</code>
        * [.match(splitter)](#module_ScramjetCore..StringStream+match) ⇒ <code>StringStream</code>
        * [.toBufferStream()](#module_ScramjetCore..StringStream+toBufferStream) ⇒ <code>StringStream</code>
        * [.parse(parser)](#module_ScramjetCore..StringStream+parse) ⇒ <code>DataStream</code>
    * _static_
        * [.SPLIT_LINE](#module_ScramjetCore..StringStream.SPLIT_LINE)
        * [.fromString(str, encoding)](#module_ScramjetCore..StringStream.fromString) ⇒ <code>StringStream</code>

<a name="new_module_ScramjetCore..StringStream_new"></a>

#### new StringStream(encoding)
Constructs the stream with the given encoding


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

**Example**  
```js
[../samples/string-stream-constructor.js](../samples/string-stream-constructor.js)
```
<a name="module_ScramjetCore..StringStream+shift"></a>

#### stringStream.shift(bytes, func) ⇒ <code>StringStream</code>
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>StringStream</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | <code>ShiftCallback</code> | Function that receives a string of shifted                                 chars. |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="module_ScramjetCore..StringStream+split"></a>

#### stringStream.split(splitter) ⇒ <code>StringStream</code>
Splits the string stream by the specified regexp or string

**Kind**: instance method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>StringStream</code> - the re-splitted string stream.  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> \| <code>String</code> | What to split by |

**Example**  
```js
[../samples/string-stream-split.js](../samples/string-stream-split.js)
```
<a name="module_ScramjetCore..StringStream+match"></a>

#### stringStream.match(splitter) ⇒ <code>StringStream</code>
Finds matches in the string stream and streams the match results

**Kind**: instance method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>StringStream</code> - string stream of matches.  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

**Example**  
```js
[../samples/string-stream-match.js](../samples/string-stream-match.js)
```
<a name="module_ScramjetCore..StringStream+toBufferStream"></a>

#### stringStream.toBufferStream() ⇒ <code>StringStream</code>
Transforms the StringStream to BufferStream

Creates a buffer stream from the given string stream. Still it returns a
DataStream derivative and isn't the typical node.js stream so you can do
all your transforms when you like.

**Kind**: instance method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>StringStream</code> - The converted stream.  
**Example**  
```js
[../samples/string-stream-tobufferstream.js](../samples/string-stream-tobufferstream.js)
```
<a name="module_ScramjetCore..StringStream+parse"></a>

#### stringStream.parse(parser) ⇒ <code>DataStream</code>
Parses every string to object

The method MUST parse EVERY string into a single object, so the string
stream here should already be splitted.

**Kind**: instance method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>ParseCallback</code> | The transform function |

**Example**  
```js
[../samples/string-stream-parse.js](../samples/string-stream-parse.js)
```
<a name="module_ScramjetCore..StringStream.SPLIT_LINE"></a>

#### StringStream.SPLIT_LINE
A handly split by line regex to quickly get a line-by-line stream

**Kind**: static property of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
<a name="module_ScramjetCore..StringStream.fromString"></a>

#### StringStream.fromString(str, encoding) ⇒ <code>StringStream</code>
Creates a StringStream and writes a specific string.

**Kind**: static method of [<code>StringStream</code>](#module_ScramjetCore..StringStream)  
**Returns**: <code>StringStream</code> - new StringStream.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | the string to push the your stream |
| encoding | <code>String</code> | optional encoding |

<a name="module_ScramjetCore..toDataStream"></a>

### ScramjetCore~toDataStream()
Alias for [StringStream#parse](StringStream#parse)

**Kind**: inner method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..ShiftCallback"></a>

### ScramjetCore~ShiftCallback : <code>function</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>String</code> | Pooped chars |

<a name="module_ScramjetCore..ParseCallback"></a>

### ScramjetCore~ParseCallback ⇒ <code>Promise</code>
**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

