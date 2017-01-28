## Functions

<dl>
<dt><a href="#pop">pop(chars, func)</a> ⇒ <code>BufferStream</code></dt>
<dd><p>Pops given number of bytes from the original stream</p>
<p>Works the same way as {@see DataStream.pop}, but in this case extracts
the given number of bytes.</p>
</dd>
<dt><a href="#split">split(splitter)</a> ⇒ <code>BufferStream</code></dt>
<dd><p>Splits the buffer stream into buffer objects</p>
</dd>
<dt><a href="#breakup">breakup(number)</a> ⇒ <code>BufferStream</code></dt>
<dd><p>Breaks up a stream apart into chunks of the specified length</p>
</dd>
<dt><a href="#toStringStream">toStringStream(encoding)</a> ⇒ <code>StringStream</code></dt>
<dd><p>Creates a string stream from the given buffer stream</p>
<p>Still it returns a DataStream derivative and isn&#39;t the typical node.js
stream so you can do all your transforms when you like.</p>
</dd>
<dt><a href="#parse">parse(parser)</a> ⇒ <code>DataStream</code></dt>
<dd><p>[Parallel] Parses every buffer to object</p>
<p>The method MUST parse EVERY buffer into a single object, so the buffer
stream here should already be splitted or broken up.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PopCallback">PopCallback</a> : <code>function</code></dt>
<dd><p>Pop callback</p>
</dd>
<dt><a href="#ParseCallback">ParseCallback</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="pop"></a>

## pop(chars, func) ⇒ <code>BufferStream</code>
Pops given number of bytes from the original streamWorks the same way as {@see DataStream.pop}, but in this case extractsthe given number of bytes.

**Kind**: global function  
**Returns**: <code>BufferStream</code> - substream  

| Param | Type | Description |
| --- | --- | --- |
| chars | <code>Number</code> | The number of bytes to pop |
| func | <code>[PopCallback](#PopCallback)</code> | Function that receives a string of popped bytes |

**Example**  
```js
[../samples/string-stream-pop.js](../samples/string-stream-pop.js)
```
<a name="split"></a>

## split(splitter) ⇒ <code>BufferStream</code>
Splits the buffer stream into buffer objects

**Kind**: global function  
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
<a name="breakup"></a>

## breakup(number) ⇒ <code>BufferStream</code>
Breaks up a stream apart into chunks of the specified length

**Kind**: global function  
**Returns**: <code>BufferStream</code> - the resulting buffer stream.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | the desired chunk length |

**Example**  
```js
[../samples/buffer-stream-breakup.js](../samples/buffer-stream-breakup.js)
```
<a name="toStringStream"></a>

## toStringStream(encoding) ⇒ <code>StringStream</code>
Creates a string stream from the given buffer streamStill it returns a DataStream derivative and isn't the typical node.jsstream so you can do all your transforms when you like.

**Kind**: global function  
**Returns**: <code>StringStream</code> - The converted stream.  

| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | The encoding to be used to convert the buffers                           to streams. |

**Example**  
```js
[../samples/buffer-stream-tostringstream.js](../samples/buffer-stream-tostringstream.js)
```
<a name="parse"></a>

## parse(parser) ⇒ <code>DataStream</code>
[Parallel] Parses every buffer to objectThe method MUST parse EVERY buffer into a single object, so the bufferstream here should already be splitted or broken up.

**Kind**: global function  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>[ParseCallback](#ParseCallback)</code> | The transform function |

**Example**  
```js
[../samples/buffer-stream-parse.js](../samples/buffer-stream-parse.js)
```
<a name="PopCallback"></a>

## PopCallback : <code>function</code>
Pop callback

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| popped | <code>Buffer</code> | popped bytes |

<a name="ParseCallback"></a>

## ParseCallback ⇒ <code>Promise</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

