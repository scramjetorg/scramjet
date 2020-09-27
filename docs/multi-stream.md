![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.MultiStream"></a>

## :MultiStream
An object consisting of multiple streams than can be refined or muxed.

The idea behind a MultiStream is being able to mux and demux streams when needed.

Usage:
```javascript
new MultiStream([...streams])
 .mux();

new MultiStream(function*(){ yield* streams; })
 .map(stream => stream.filter(myFilter))
 .mux();
```

**Kind**: static class  
**Test**: test/methods/multi-stream-constructor.js  

* [:MultiStream](#module_scramjet.MultiStream)
    * [new MultiStream(streams, [options])](#new_module_scramjet.MultiStream_new)
    * [multiStream.streams](#module_scramjet.MultiStream+streams)  <code>Array</code>
    * [multiStream.source](#module_scramjet.MultiStream+source)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [multiStream.length](#module_scramjet.MultiStream+length)  <code>number</code>
    * [multiStream.map(aFunc, rFunc)](#module_scramjet.MultiStream+map) ↺ <code>Promise.&lt;MultiStream&gt;</code>
    * [multiStream.find()](#module_scramjet.MultiStream+find)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [multiStream.filter(func)](#module_scramjet.MultiStream+filter) ↺ [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream)
    * [multiStream.mux([comparator], [ClassType])](#module_scramjet.MultiStream+mux)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [multiStream.add(stream)](#module_scramjet.MultiStream+add)
    * [multiStream.remove(stream)](#module_scramjet.MultiStream+remove)
    * [multiStream.route([policy], [count])](#module_scramjet.MultiStream+route)  [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream)
    * [multiStream.smap(transform)](#module_scramjet.MultiStream+smap) ↺
    * [multiStream.cluster(clusterFunc, [options])](#module_scramjet.MultiStream+cluster) ↺
    * [MultiStream:from(streams, [StreamClass])](#module_scramjet.MultiStream.from)  [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream)

<a name="new_module_scramjet.MultiStream_new"></a>

### new MultiStream(streams, [options])
Crates an instance of MultiStream with the specified stream list


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> \| <code>AsyncGenerator.&lt;Readable&gt;</code> \| <code>Generator.&lt;Readable&gt;</code> |  | the list of readable streams (other objects will be filtered out!) |
| [options] | <code>object</code> | <code>{}</code> | Optional options for the super object. ;) |

<a name="module_scramjet.MultiStream+streams"></a>

### multiStream.streams : Array
Array of all streams

**Kind**: instance property of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
<a name="module_scramjet.MultiStream+source"></a>

### multiStream.source : DataStream
Source of the MultiStream.

This is nulled when the stream ends and is used to control the

**Kind**: instance property of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
<a name="module_scramjet.MultiStream+length"></a>

### multiStream.length : number
Returns the current stream length

**Kind**: instance property of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
<a name="module_scramjet.MultiStream+map"></a>

### multiStream.map(aFunc, rFunc) : Promise.<MultiStream> ↺
Returns new MultiStream with the streams returned by the transform.

Runs a callback for every stream, returns a new MultiStream of mapped
streams and creates a new MultiStream consisting of streams returned
by the Function.

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Chainable**  
**Returns**: <code>Promise.&lt;MultiStream&gt;</code> - the mapped instance  
**Test**: test/methods/multi-stream-map.js  

| Param | Type | Description |
| --- | --- | --- |
| aFunc | [<code>MultiMapCallback</code>](definitions.md#module_scramjet..MultiMapCallback) | Add callback (normally you need only this) |
| rFunc | [<code>MultiMapCallback</code>](definitions.md#module_scramjet..MultiMapCallback) | Remove callback, called when the stream is removed |

<a name="module_scramjet.MultiStream+find"></a>

### multiStream.find() : DataStream
Calls Array.prototype.find on the streams

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - found DataStream  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;any&gt;</code> | arguments for |

<a name="module_scramjet.MultiStream+filter"></a>

### multiStream.filter(func) : MultiStream ↺
Filters the stream list and returns a new MultiStream with only the
streams for which the Function returned true

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Chainable**  
**Returns**: [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream) - the filtered instance  
**Test**: test/methods/multi-stream-filter.js  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

<a name="module_scramjet.MultiStream+mux"></a>

### multiStream.mux([comparator], [ClassType]) : DataStream
Muxes the streams into a single one

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - The resulting DataStream  
**Test**: test/methods/multi-stream-mux.js  
**Todo**

- [ ] For now using comparator will not affect the mergesort.
- [ ] Sorting requires all the streams to be constantly flowing, any
      single one drain results in draining the muxed too even if there
      were possible data on other streams.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [comparator] | <code>function</code> |  | Should return -1 0 or 1 depending on the                                  desired order. If passed the chunks will                                  be added in a sorted order. |
| [ClassType] | <code>function</code> | <code>DataStream</code> | the class to be outputted |

<a name="module_scramjet.MultiStream+add"></a>

### multiStream.add(stream)
Adds a stream to the MultiStream

If the stream was muxed, filtered or mapped, this stream will undergo the
same transforms and conditions as if it was added in constructor.

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Meta.noreadme**:   
**Test**: test/methods/multi-stream-add.js  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Readable</code> | [description] |

<a name="module_scramjet.MultiStream+remove"></a>

### multiStream.remove(stream)
Removes a stream from the MultiStream

If the stream was muxed, filtered or mapped, it will be removed from same
streams.

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Meta.noreadme**:   
**Test**: test/methods/multi-stream-remove.js  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Readable</code> | [description] |

<a name="module_scramjet.MultiStream+route"></a>

### multiStream.route([policy], [count]) : MultiStream
Re-routes streams to a new MultiStream of specified size

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Returns**: [<code>MultiStream</code>](multi-stream.md#module_scramjet.MultiStream) - [description]  
**Meta.noreadme**:   
**Todo**

- [ ] NYT: not yet tested
- [ ] NYD: not yet documented


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [policy] | <code>function</code> | <code>Affinity.RoundRobin</code> | [description] |
| [count] | <code>number</code> | <code>os.cpus().length</code> | [description] |

<a name="module_scramjet.MultiStream+smap"></a>

### multiStream.smap(transform) ↺
Map stream synchronously

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| transform | <code>function</code> | mapping function ran on every stream (SYNCHRONOUS!) |

<a name="module_scramjet.MultiStream+cluster"></a>

### multiStream.cluster(clusterFunc, [options]) ↺
Distributes processing to multiple forked subprocesses.

**Kind**: instance method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterFunc | <code>function</code> \| <code>string</code> |  | a cluster callback with all operations working similarly to DataStream::use |
| [options] | [<code>DistributeOptions</code>](definitions.md#module_scramjet..DistributeOptions) | <code>{}</code> |  |

<a name="module_scramjet.MultiStream.from"></a>

### MultiStream:from(streams, [StreamClass]) : MultiStream
Constructs MultiStream from any number of streams-likes

**Kind**: static method of [<code>MultiStream</code>](#module_scramjet.MultiStream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| streams | <code>Array.&lt;(Array\|Iterable.&lt;any&gt;\|AsyncGeneratorFunction\|GeneratorFunction\|AsyncFunction\|function()\|string\|Readable)&gt;</code> |  | the array of input streamlike elements |
| [StreamClass] | <code>function</code> | <code>DataStream</code> |  |

