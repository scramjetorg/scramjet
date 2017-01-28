## Functions

<dl>
<dt><a href="#map">map(func)</a> ⇒ <code>MultiStream</code></dt>
<dd><p>Returns new MultiStream with the streams returned by the tranform.</p>
<p>Runs callback for every stream, returns a new MultiStream of mapped
streams and creates a new multistream consisting of streams returned
by the callback.</p>
</dd>
<dt><a href="#filter">filter(func)</a> ⇒ <code>MultiStream</code></dt>
<dd><p>Filters the stream list and returns a new MultiStream with only the
streams for which the callback returned true</p>
</dd>
<dt><a href="#dedupe">dedupe(cmp)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Makes a number of redundant streams into a single one</p>
</dd>
<dt><a href="#mux">mux(cmp)</a> ⇒ <code>DataStream</code></dt>
<dd><p>Muxes the streams into a single one</p>
</dd>
<dt><a href="#add">add(stream)</a></dt>
<dd><p>Adds a stream to the MultiStream</p>
<p>If the stream was muxed, filtered or mapped, this stream will undergo the
same transorms and conditions as if it was added in constructor.</p>
</dd>
<dt><a href="#remove">remove(stream)</a></dt>
<dd><p>Removes a stream from the MultiStream</p>
<p>If the stream was muxed, filtered or mapped, it will be removed from same
streams.</p>
</dd>
</dl>

<a name="map"></a>

## map(func) ⇒ <code>MultiStream</code>
Returns new MultiStream with the streams returned by the tranform.Runs callback for every stream, returns a new MultiStream of mappedstreams and creates a new multistream consisting of streams returnedby the callback.

**Kind**: global function  
**Returns**: <code>MultiStream</code> - the mapped instance  
**Todo**

- [ ] For later add/remove operations to work properly, the stream mustcurrently return the same instance!


| Param | Type | Description |
| --- | --- | --- |
| func | <code>MapCallback</code> | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

**Example**  
```js
[../samples/multi-stream-map.js](../samples/multi-stream-map.js)
```
<a name="filter"></a>

## filter(func) ⇒ <code>MultiStream</code>
Filters the stream list and returns a new MultiStream with only thestreams for which the callback returned true

**Kind**: global function  
**Returns**: <code>MultiStream</code> - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

**Example**  
```js
[../samples/multi-stream-filter.js](../samples/multi-stream-filter.js)
```
<a name="dedupe"></a>

## dedupe(cmp) ⇒ <code>DataStream</code>
Makes a number of redundant streams into a single one

**Kind**: global function  
**Returns**: <code>DataStream</code> - the deduplicated stream  
**Todo**

- [ ] Not yet implemented


| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>TransformFunction</code> | returns the object hash for comparison |

**Example**  
```js
[../samples/multi-stream-dedupe.js](../samples/multi-stream-dedupe.js)
```
<a name="mux"></a>

## mux(cmp) ⇒ <code>DataStream</code>
Muxes the streams into a single one

**Kind**: global function  
**Returns**: <code>DataStream</code> - The resulting DataStream  
**Todo**

- [ ] For now using comparator will not affect the mergesort.
- [ ] Sorting requires all the streams to be constantly flowing, any      single one drain results in draining the muxed too even if there      were possible data on other streams.


| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>ComparatorFunction</code> | Should return -1 0 or 1 depending on the                                  desired order. If passed the chunks will                                  be added in a sorted order. |

**Example**  
```js
[../samples/multi-stream-mux.js](../samples/multi-stream-mux.js)
```
<a name="add"></a>

## add(stream)
Adds a stream to the MultiStreamIf the stream was muxed, filtered or mapped, this stream will undergo thesame transorms and conditions as if it was added in constructor.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-add.js](../samples/multi-stream-add.js)
```
<a name="remove"></a>

## remove(stream)
Removes a stream from the MultiStreamIf the stream was muxed, filtered or mapped, it will be removed from samestreams.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-remove.js](../samples/multi-stream-remove.js)
```
