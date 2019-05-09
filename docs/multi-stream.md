![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="MultiStream"></a>

## MultiStream
An object consisting of multiple streams than can be refined or muxed.

The idea behind a MultiStream is being able to mux and demux streams when needed.

**Kind**: global class  

* [MultiStream](#MultiStream)
    * [new MultiStream(streams, options)](#new_MultiStream_new)
    * [multiStream.streams](#MultiStream+streams)  <code>Array</code>
    * [multiStream.length](#MultiStream+length)  <code>number</code>
    * [multiStream.map(aFunc)](#MultiStream+map) ↺ [<code>MultiStream</code>](multi-stream.md#MultiStream)
    * [multiStream.find(...args)](#MultiStream+find)  [<code>DataStream</code>](data-stream.md#DataStream)
    * [multiStream.filter(func)](#MultiStream+filter) ↺ [<code>MultiStream</code>](multi-stream.md#MultiStream)
    * [multiStream.mux(comparator)](#MultiStream+mux)  [<code>DataStream</code>](data-stream.md#DataStream)
    * [multiStream.add(stream)](#MultiStream+add)
    * [multiStream.remove(stream)](#MultiStream+remove)
    * [multiStream.route([policy], [count])](#MultiStream+route)  [<code>MultiStream</code>](multi-stream.md#MultiStream)
    * [multiStream.smap(transform)](#MultiStream+smap) ↺
    * [multiStream.cluster(clusterFunc, [options])](#MultiStream+cluster) ↺
    * [MultiStream~DistributeOptions](#MultiStream..DistributeOptions)

<a name="new_MultiStream_new"></a>

### new MultiStream(streams, options)
Crates an instance of MultiStream with the specified stream list


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> \| <code>AsyncGenerator.&lt;Readable&gt;</code> \| <code>Generator.&lt;Readable&gt;</code> | the list of readable streams (other                                     objects will be filtered out!) |
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

Runs Function for every stream, returns a new MultiStream of mapped
streams and creates a new MultiStream consisting of streams returned
by the Function.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](multi-stream.md#MultiStream) - the mapped instance  
**Test**: test/methods/multi-stream-map.js  

| Param | Type | Description |
| --- | --- | --- |
| aFunc | [<code>MapCallback</code>](data-stream.md#DataStream.MapCallback) | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

<a name="MultiStream+find"></a>

### multiStream.find(...args) : DataStream
Calls Array.prototype.find on the streams

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#DataStream) - found DataStream  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Arguments</code> | arguments for |

<a name="MultiStream+filter"></a>

### multiStream.filter(func) : MultiStream ↺
Filters the stream list and returns a new MultiStream with only the
streams for which the Function returned true

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](multi-stream.md#MultiStream) - the filtered instance  
**Test**: test/methods/multi-stream-filter.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

<a name="MultiStream+mux"></a>

### multiStream.mux(comparator) : DataStream
Muxes the streams into a single one

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#DataStream) - The resulting DataStream  
**Test**: test/methods/multi-stream-mux.js  
**Todo**

- [ ] For now using comparator will not affect the mergesort.
- [ ] Sorting requires all the streams to be constantly flowing, any
      single one drain results in draining the muxed too even if there
      were possible data on other streams.


| Param | Type | Description |
| --- | --- | --- |
| comparator | <code>ComparatorFunction</code> | Should return -1 0 or 1 depending on the                                  desired order. If passed the chunks will                                  be added in a sorted order. |

<a name="MultiStream+add"></a>

### multiStream.add(stream)
Adds a stream to the MultiStream

If the stream was muxed, filtered or mapped, this stream will undergo the
same transforms and conditions as if it was added in constructor.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Meta.noreadme**:   
**Test**: test/methods/multi-stream-add.js  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

<a name="MultiStream+remove"></a>

### multiStream.remove(stream)
Removes a stream from the MultiStream

If the stream was muxed, filtered or mapped, it will be removed from same
streams.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Meta.noreadme**:   
**Test**: test/methods/multi-stream-remove.js  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

<a name="MultiStream+route"></a>

### multiStream.route([policy], [count]) : MultiStream
Re-routes streams to a new MultiStream of specified size

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Returns**: [<code>MultiStream</code>](multi-stream.md#MultiStream) - [description]  
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

### multiStream.cluster(clusterFunc, [options]) ↺
Distributes processing to multiple forked subprocesses.

**Kind**: instance method of [<code>MultiStream</code>](#MultiStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterFunc | <code>function</code> \| <code>String</code> |  | a cluster callback with all operations working similarly to DataStream::use |
| [options] | [<code>DistributeOptions</code>](multi-stream.md#MultiStream..DistributeOptions) | <code>{}</code> |  |

<a name="MultiStream..DistributeOptions"></a>

### MultiStream~DistributeOptions
Distribute options

**Kind**: inner typedef of [<code>MultiStream</code>](#MultiStream)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [plugins] | <code>Array</code> | <code>[]</code> | a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself) |
| [StreamClass] | <code>String</code> | <code>DataStream</code> | the class to deserialize the stream to. |
| [threads] | <code>Number</code> | <code>os.cpus().length * 2</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |
| [createOptions] | [<code>DataStreamOptions</code>](index.md#module_scramjet..DataStreamOptions) | <code>{}</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |

