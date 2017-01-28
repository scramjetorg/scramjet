## Members

<dl>
<dt><a href="#SPLIT_LINE">SPLIT_LINE</a></dt>
<dd><p>A handly split by line regex to quickly get a line-by-line stream</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#pop">pop(bytes, func)</a> ⇒ <code>StringStream</code></dt>
<dd><p>Pops given length of chars from the original stream</p>
<p>Works the same way as {@see DataStream.pop}, but in this case extracts
the given number of characters.</p>
</dd>
<dt><a href="#split">split(splitter)</a> ⇒ <code>StringStream</code></dt>
<dd><p>Splits the string stream by the specified regexp or string</p>
</dd>
<dt><a href="#match">match(splitter)</a> ⇒ <code>StringStream</code></dt>
<dd><p>Finds matches in the string stream and streams the match results</p>
</dd>
<dt><a href="#toBufferStream">toBufferStream()</a> ⇒ <code>StringStream</code></dt>
<dd><p>Transforms the StringStream to BufferStream</p>
<p>Creates a buffer stream from the given string stream. Still it returns a
DataStream derivative and isn&#39;t the typical node.js stream so you can do
all your transforms when you like.</p>
</dd>
<dt><a href="#parse">parse(parser)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Parses every string to object</p>
<p>The method MUST parse EVERY string into a single object, so the string
stream here should already be splitted.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PopCallback">PopCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ParseCallback">ParseCallback</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="SPLIT_LINE"></a>

## SPLIT_LINE
A handly split by line regex to quickly get a line-by-line stream

**Kind**: global variable  
<a name="pop"></a>

## pop(bytes, func) ⇒ <code>StringStream</code>
Pops given length of chars from the original streamWorks the same way as {@see DataStream.pop}, but in this case extractsthe given number of characters.

**Kind**: global function  
**Returns**: <code>StringStream</code> - substream.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to pop. |
| func | <code>[PopCallback](#PopCallback)</code> | Function that receives a string of popped                                 chars. |

**Example**  
```js
[../samples/string-stream-pop.js](../samples/string-stream-pop.js)
```
<a name="split"></a>

## split(splitter) ⇒ <code>StringStream</code>
Splits the string stream by the specified regexp or string

**Kind**: global function  
**Returns**: <code>StringStream</code> - the re-splitted string stream.  
**Todo**

- [ ] implement splitting by buffer or string


| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> &#124; <code>String</code> | What to split by |

**Example**  
```js
[../samples/string-stream-split.js](../samples/string-stream-split.js)
```
<a name="match"></a>

## match(splitter) ⇒ <code>StringStream</code>
Finds matches in the string stream and streams the match results

**Kind**: global function  
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
<a name="toBufferStream"></a>

## toBufferStream() ⇒ <code>StringStream</code>
Transforms the StringStream to BufferStreamCreates a buffer stream from the given string stream. Still it returns aDataStream derivative and isn't the typical node.js stream so you can doall your transforms when you like.

**Kind**: global function  
**Returns**: <code>StringStream</code> - The converted stream.  
**Example**  
```js
[../samples/string-stream-tobufferstream.js](../samples/string-stream-tobufferstream.js)
```
<a name="parse"></a>

## parse(parser) ⇒ <code>DataStream</code>
Parses every string to objectThe method MUST parse EVERY string into a single object, so the stringstream here should already be splitted.

**Kind**: global function  
**Returns**: <code>DataStream</code> - The parsed objects stream.  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>[ParseCallback](#ParseCallback)</code> | The transform function |

**Example**  
```js
[../samples/string-stream-parse.js](../samples/string-stream-parse.js)
```
<a name="PopCallback"></a>

## PopCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| popped | <code>String</code> | Pooped chars |

<a name="ParseCallback"></a>

## ParseCallback ⇒ <code>Promise</code>
**Kind**: global typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

