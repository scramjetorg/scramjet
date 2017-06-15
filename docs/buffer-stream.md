<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~BufferStream](#module_ScramjetCore..BufferStream) ⇐ <code>DataStream</code>
        * [new BufferStream(opts)](#new_module_ScramjetCore..BufferStream_new)
        * [.shift(chars, func)](#module_ScramjetCore..BufferStream+shift) ⇒ <code>BufferStream</code>
        * [.split(splitter)](#module_ScramjetCore..BufferStream+split) ⇒ <code>BufferStream</code>
        * [.breakup(number)](#module_ScramjetCore..BufferStream+breakup) ⇒ <code>BufferStream</code>
        * [.stringify(encoding)](#module_ScramjetCore..BufferStream+stringify) ⇒ <code>StringStream</code>
        * [.parse(parser)](#module_ScramjetCore..BufferStream+parse) ⇒ <code>DataStream</code>
    * [~toStringStream()](#module_ScramjetCore..toStringStream)
    * [~toDataStream()](#module_ScramjetCore..toDataStream)
    * [~PopCallback](#module_ScramjetCore..PopCallback) : <code>function</code>
    * [~ParseCallback](#module_ScramjetCore..ParseCallback) ⇒ <code>Promise</code>

<a name="module_ScramjetCore..BufferStream"></a>

### ScramjetCore~BufferStream ⇐ <code>DataStream</code>
A factilitation stream created for easy splitting or parsing buffers

**Kind**: inner class of <code>[ScramjetCore](#module_ScramjetCore)</code>  
**Extends**: <code>DataStream</code>  

* [~BufferStream](#module_ScramjetCore..BufferStream) ⇐ <code>DataStream</code>
    * [new BufferStream(opts)](#new_module_ScramjetCore..BufferStream_new)
    * [.shift(chars, func)](#module_ScramjetCore..BufferStream+shift) ⇒ <code>BufferStream</code>
    * [.split(splitter)](#module_ScramjetCore..BufferStream+split) ⇒ <code>BufferStream</code>
    * [.breakup(number)](#module_ScramjetCore..BufferStream+breakup) ⇒ <code>BufferStream</code>
    * [.stringify(encoding)](#module_ScramjetCore..BufferStream+stringify) ⇒ <code>StringStream</code>
    * [.parse(parser)](#module_ScramjetCore..BufferStream+parse) ⇒ <code>DataStream</code>

<a name="new_module_ScramjetCore..BufferStream_new"></a>

#### new BufferStream(opts)
Creates the BufferStream


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

**Example**  
```js
[../samples/buffer-stream-constructor.js](../samples/buffer-stream-constructor.js)
```
<a name="module_ScramjetCore..BufferStream+shift"></a>

#### bufferStream.shift(chars, func) ⇒ <code>BufferStream</code>
Shift given number of bytes from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of bytes.

**Kind**: instance method of <code>[BufferStream](#module_ScramjetCore..BufferStream)</code>  
**Returns**: <code>BufferStream</code> - substream  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to shift |
| func | <code>PopCallback</code> | Function that receives a string of shifted bytes |

**Example**  
```js
[../samples/string-stream-shift.js](../samples/string-stream-shift.js)
```
<a name="module_ScramjetCore..BufferStream+split"></a>

#### bufferStream.split(splitter) ⇒ <code>BufferStream</code>
Splits the buffer stream into buffer objects

**Kind**: instance method of <code>[BufferStream](#module_ScramjetCore..BufferStream)</code>  
**Returns**: <code>BufferStream</code> - the re-splitted buffer stream.  
**Todo**

- [ ] implement splitting by function


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>String</code> &#124; <code>Buffer</code> | the buffer or string that the stream                                  should be split by. |

**Example**  
```js
[../samples/buffer-stream-split.js](../samples/buffer-stream-split.js)
```
<a name="module_ScramjetCore..BufferStream+breakup"></a>

#### bufferStream.breakup(number) ⇒ <code>BufferStream</code>
Breaks up a stream apart into chunks of the specified length

**Kind**: instance method of <code>[BufferStream](#module_ScramjetCore..BufferStream)</code>  
**Returns**: <code>BufferStream</code> - the resulting buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

**Example**  
```js
[../samples/buffer-stream-breakup.js](../samples/buffer-stream-breakup.js)
```
<a name="module_ScramjetCore..BufferStream+stringify"></a>

#### bufferStream.stringify(encoding) ⇒ <code>StringStream</code>
Creates a string stream from the given buffer stream

Still it returns a DataStream derivative and isn't the typical node.js
stream so you can do all your transforms when you like.

**Kind**: instance method of <code>[BufferStream](#module_ScramjetCore..BufferStream)</code>  
**Returns**: <code>StringStream</code> - The converted stream.  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

**Example**  
```js
[../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)
```
<a name="module_ScramjetCore..BufferStream+parse"></a>

#### bufferStream.parse(parser) ⇒ <code>DataStream</code>
Parses every buffer to object

The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be splitted or broken up.

**Kind**: instance method of <code>[BufferStream](#module_ScramjetCore..BufferStream)</code>  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>ParseCallback</code> | The transform function |

**Example**  
```js
[../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)
```
<a name="module_ScramjetCore..toStringStream"></a>

### ScramjetCore~toStringStream()
Alias for [BufferStream#stringify](BufferStream#stringify)

**Kind**: inner method of <code>[ScramjetCore](#module_ScramjetCore)</code>  
<a name="module_ScramjetCore..toDataStream"></a>

### ScramjetCore~toDataStream()
Alias for [BufferStream#parse](BufferStream#parse)

**Kind**: inner method of <code>[ScramjetCore](#module_ScramjetCore)</code>  
<a name="module_ScramjetCore..PopCallback"></a>

### ScramjetCore~PopCallback : <code>function</code>
Pop callback

**Kind**: inner typedef of <code>[ScramjetCore](#module_ScramjetCore)</code>  

| Param | Type | Description |
| --- | --- | --- |
| popped | <code>Buffer</code> | popped bytes |

<a name="module_ScramjetCore..ParseCallback"></a>

### ScramjetCore~ParseCallback ⇒ <code>Promise</code>
**Kind**: inner typedef of <code>[ScramjetCore](#module_ScramjetCore)</code>  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

