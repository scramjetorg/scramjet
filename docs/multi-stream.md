![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="MultiStream"></a>

## MultiStream
An object consisting of multiple streams than can be refined or muxed.

**Kind**: global class  

* [MultiStream](#MultiStream)
    * [new MultiStream(streams, options)](#new_MultiStream_new)
    * [multiStream.streams](#MultiStream+streams)  <code>Array</code>
    * [multiStream.length](#MultiStream+length)  <code>number</code>
    * [multiStream.map(aFunc)](#MultiStream+map) ↺ [<code>MultiStream</code>](#MultiStream)
    * [multiStream.find(...args)](#MultiStream+find)  <code>DataStream</code>
    * [multiStream.filter(func)](#MultiStream+filter) ↺ [<code>MultiStream</code>](#MultiStream)
    * [multiStream.mux(cmp)](#MultiStream+mux)  <code>DataStream</code>
    * [multiStream.add(stream)](#MultiStream+add)
    * [multiStream.remove(stream)](#MultiStream+remove)
    * [multiStream.route([policy], [count])](#MultiStream+route)  [<code>MultiStream</code>](#MultiStream)
    * [multiStream.smap(transform)](#MultiStream+smap) ↺
    * [multiStream.cluster(clusterFunc, options)](#MultiStream+cluster) ↺

<a name="new_MultiStream_new"></a>

### new MultiStream(streams, options)
Crates an instance of MultiStream with the specified stream list


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> | the list of readable streams (other                                     objects will be filtered out!) |
| options | <code>Object</code> | Optional options for the super object. ;) |

<a name="MultiStream+streams"></a>

### multiStream.streams : Array
Array of all streams

**Kind**: instance property of [<code>MultiStream</code>](#MultiStream)  
<a name="MultiStream+length"></a>

### multiStream.length : number
Returns the current stream length

**Kind**: instance property of [<code>MultiStream</code>](#MultiStream)  
<a name="MultiStream+map"></a>

### multiStream.map(aFunc) : MultiStream ↺
Returns new MultiStream with the streams returned by the transform.

Runs callback for every stream, returns a new MultiStream of mapped
streams and creates a new multistream consisting of streams returned
by the callback.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](#MultiStream) - the mapped instance  

| Param | Type | Description |
| --- | --- | --- |
| aFunc | <code>MapCallback</code> | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

**Example**  
```js
[../samples/multi-stream-map.js](../samples/multi-stream-map.js)
```
<a name="MultiStream+find"></a>

### multiStream.find(...args) : DataStream
Calls Array.prototype.find on the streams

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: <code>DataStream</code> - found DataStream  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Arguments</code> | arguments for |

<a name="MultiStream+filter"></a>

### multiStream.filter(func) : MultiStream ↺
Filters the stream list and returns a new MultiStream with only the
streams for which the callback returned true

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](#MultiStream) - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

**Example**  
```js
[../samples/multi-stream-filter.js](../samples/multi-stream-filter.js)
```
<a name="MultiStream+mux"></a>

### multiStream.mux(cmp) : DataStream
Muxes the streams into a single one

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: <code>DataStream</code> - The resulting DataStream  
**Todo**

- [ ] For now using comparator will not affect the mergesort.
- [ ] Sorting requires all the streams to be constantly flowing, any
      single one drain results in draining the muxed too even if there
      were possible data on other streams.


| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>ComparatorFunction</code> | Should return -1 0 or 1 depending on the                                  desired order. If passed the chunks will                                  be added in a sorted order. |

**Example**  
```js
[../samples/multi-stream-mux.js](../samples/multi-stream-mux.js)
```
<a name="MultiStream+add"></a>

### multiStream.add(stream)
Adds a stream to the MultiStream

If the stream was muxed, filtered or mapped, this stream will undergo the
same transorms and conditions as if it was added in constructor.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-add.js](../samples/multi-stream-add.js)
```
<a name="MultiStream+remove"></a>

### multiStream.remove(stream)
Removes a stream from the MultiStream

If the stream was muxed, filtered or mapped, it will be removed from same
streams.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Meta.noreadme**:   

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-remove.js](../samples/multi-stream-remove.js)
```
<a name="MultiStream+route"></a>

### multiStream.route([policy], [count]) : MultiStream
Re-routes streams to a new MultiStream of specified size

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: [<code>MultiStream</code>](#MultiStream) - [description]  
**Meta.noreadme**:   
**Todo**

- [ ] NYT: not yet tested
- [ ] NYD: not yet documented


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [policy] | <code>function</code> | <code>Affinity.RoundRobin</code> | [description] |
| [count] | <code>number</code> | <code>os.cpus().length</code> | [description] |

<a name="MultiStream+smap"></a>

### multiStream.smap(transform) ↺
Map stream synchronously

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| transform | <code>function</code> | mapping function ran on every stream (SYNCHRONOUS!) |

<a name="MultiStream+cluster"></a>

### multiStream.cluster(clusterFunc, options) ↺
Distributes processing to multiple forked subprocesses.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| clusterFunc | <code>function</code> \| <code>String</code> | a cluster callback with all operations working similarily to DataStream::use |
| options | [<code>DistributeOptions</code>](#DistributeOptions) |  |

<a name="DistributeOptions"></a>

## DistributeOptions
Distribute options

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| plugins | <code>Array</code> | a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself) |
| StreamClass | <code>String</code> | the class to deserialize the stream to. |
| threads | <code>Number</code> | maximum threads to use - defauls to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |

