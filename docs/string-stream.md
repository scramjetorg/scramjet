![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="StringStream"></a>

## StringStream : DataStream
A stream of string objects for further transformation on top of DataStream.

Example:

```javascript
StringStream.fromString()
```

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [StringStream](#StringStream)  <code>DataStream</code>
    * [new StringStream(encoding)](#new_StringStream_new)
    * [stringStream.shift(bytes, func)](#StringStream+shift) ↺
    * [stringStream.split(splitter)](#StringStream+split) ↺
    * [stringStream.match(matcher)](#StringStream+match) ↺
    * [stringStream.toBufferStream()](#StringStream+toBufferStream) ↺ <code>BufferStream</code>
    * [stringStream.parse(parser)](#StringStream+parse) ↺ <code>DataStream</code>
    * [stringStream.lines([eol])](#StringStream+lines) ↺
    * [stringStream.JSONParse(perLine)](#StringStream+JSONParse) ↺ <code>DataStream</code>
    * [stringStream.CSVParse(options)](#StringStream+CSVParse) ↺ <code>DataStream</code>
    * [stringStream.append(arg)](#StringStream+append) ↺
    * [stringStream.prepend(arg)](#StringStream+prepend) ↺
    * [stringStream.pop(bytes, func)](#StringStream+pop) ↺
    * [StringStream:SPLIT_LINE](#StringStream.SPLIT_LINE)
    * [StringStream:fromString(str, encoding)](#StringStream.fromString)  [<code>StringStream</code>](#StringStream)
    * [StringStream:from()](#StringStream.from)

<a name="new_StringStream_new"></a>

### new StringStream(encoding)
Constructs the stream with the given encoding


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

<a name="StringStream+shift"></a>

### stringStream.shift(bytes, func) ↺
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | [<code>ShiftCallback</code>](#ShiftCallback) | Function that receives a string of shifted chars. |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="StringStream+split"></a>

### stringStream.split(splitter) ↺
Splits the string stream by the specified regexp or string

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> \| <code>String</code> | What to split by |

**Example**  
```js
[../samples/string-stream-split.js](../samples/string-stream-split.js)
```
<a name="StringStream+match"></a>

### stringStream.match(matcher) ↺
Finds matches in the string stream and streams the match results

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| matcher | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

**Example**  
```js
[../samples/string-stream-match.js](../samples/string-stream-match.js)
```
<a name="StringStream+toBufferStream"></a>

### stringStream.toBufferStream() : BufferStream ↺
Transforms the StringStream to BufferStream

Creates a buffer stream from the given string stream. Still it returns a
DataStream derivative and isn't the typical node.js stream so you can do
all your transforms when you like.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>BufferStream</code> - The converted stream.  
**Meta.noreadme**:   
**Example**  
```js
[../samples/string-stream-tobufferstream.js](../samples/string-stream-tobufferstream.js)
```
<a name="StringStream+parse"></a>

### stringStream.parse(parser) : DataStream ↺
Parses every string to object

The method MUST parse EVERY string into a single object, so the string
stream here should already be split.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | [<code>ParseCallback</code>](#ParseCallback) | The transform function |

**Example**  
```js
[../samples/string-stream-parse.js](../samples/string-stream-parse.js)
```
<a name="StringStream+lines"></a>

### stringStream.lines([eol]) ↺
Splits the string stream by the specified regexp or string

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eol] | <code>String</code> | <code>os.EOL</code> | End of line string |

**Example**  
```js
[../samples/string-stream-split.js](../samples/string-stream-split.js)
```
<a name="StringStream+JSONParse"></a>

### stringStream.JSONParse(perLine) : DataStream ↺
Parses each entry as JSON.
Ignores empty lines

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - stream of parsed items  

| Param | Type | Description |
| --- | --- | --- |
| perLine | <code>Boolean</code> | instructs to split per line |

<a name="StringStream+CSVParse"></a>

### stringStream.CSVParse(options) : DataStream ↺
Parses CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - stream of parsed items  

| Param | Description |
| --- | --- |
| options | options for the papaparse.parse method. |

**Example**  
```js
[../samples/data-stream-separate.js](../samples/data-stream-separate.js)
```
<a name="StringStream+append"></a>

### stringStream.append(arg) ↺
Appends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>function</code> \| <code>String</code> | the argument to append. If function passed then it will be called and resolved and the resolution will be appended. |

**Example**  
```js
[../samples/string-stream-append.js](../samples/string-stream-append.js)
```
<a name="StringStream+prepend"></a>

### stringStream.prepend(arg) ↺
Prepends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>function</code> \| <code>String</code> | the argument to prepend. If function passed then it will be called and resolved                              and the resolution will be prepended. |

**Example**  
```js
[../samples/string-stream-prepend.js](../samples/string-stream-prepend.js)
```
<a name="StringStream+pop"></a>

### stringStream.pop(bytes, func) ↺
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | [<code>ShiftCallback</code>](#ShiftCallback) | Function that receives a string of shifted chars. |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="StringStream.SPLIT_LINE"></a>

### StringStream:SPLIT_LINE
A handly split by line regex to quickly get a line-by-line stream

**Kind**: static property of [<code>StringStream</code>](#StringStream)  
<a name="StringStream.fromString"></a>

### StringStream:fromString(str, encoding) : StringStream
Creates a StringStream and writes a specific string.

**Kind**: static method of [<code>StringStream</code>](#StringStream)  
**Returns**: [<code>StringStream</code>](#StringStream) - new StringStream.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | the string to push the your stream |
| encoding | <code>String</code> | optional encoding |

<a name="StringStream.from"></a>

### StringStream:from()
Create StringStream from anything.

**Kind**: static method of [<code>StringStream</code>](#StringStream)  
**See**: module:scramjet.from  
<a name="toDataStream"></a>

## toDataStream()
Alias for [parse](#StringStream+parse)

**Kind**: global function  
<a name="ShiftCallback"></a>

## ShiftCallback : function
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>String</code> | Popped chars |

<a name="ParseCallback"></a>

## ParseCallback : Promise
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

