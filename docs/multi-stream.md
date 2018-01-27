## Modules

<dl>
<dt><a href="#module_ScramjetCore">ScramjetCore</a></dt>
<dd></dd>
<dt><a href="#module_ScramjetCore">ScramjetCore</a></dt>
<dd></dd>
</dl>

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~MultiStream](#module_ScramjetCore..MultiStream)
        * [new MultiStream(streams, options)](#new_module_ScramjetCore..MultiStream_new)
        * [.streams](#module_ScramjetCore..MultiStream+streams) : <code>Array</code>
        * [.length](#module_ScramjetCore..MultiStream+length) ⇒ <code>number</code>
        * [.map(aFunc)](#module_ScramjetCore..MultiStream+map) ⇒ <code>MultiStream</code>
        * [.find(...args)](#module_ScramjetCore..MultiStream+find) ⇒ <code>DataStream</code>
        * [.filter(func)](#module_ScramjetCore..MultiStream+filter) ⇒ <code>MultiStream</code>
        * [.mux(cmp)](#module_ScramjetCore..MultiStream+mux) ⇒ <code>DataStream</code>
        * [.add(stream)](#module_ScramjetCore..MultiStream+add)
        * [.remove(stream)](#module_ScramjetCore..MultiStream+remove)
        * [.route([policy], [count])](#module_ScramjetCore..MultiStream+route) ⇒ <code>MultiStream</code>
        * [.smap(transform)](#module_ScramjetCore..MultiStream+smap) ⇒ <code>MultiStream</code>
        * [.cluster(clusterFunc, options)](#module_ScramjetCore..MultiStream+cluster) ⇒ <code>MultiStream</code>

<a name="module_ScramjetCore..MultiStream"></a>

### ScramjetCore~MultiStream
An object consisting of multiple streams than can be refined or muxed.

**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  

* [~MultiStream](#module_ScramjetCore..MultiStream)
    * [new MultiStream(streams, options)](#new_module_ScramjetCore..MultiStream_new)
    * [.streams](#module_ScramjetCore..MultiStream+streams) : <code>Array</code>
    * [.length](#module_ScramjetCore..MultiStream+length) ⇒ <code>number</code>
    * [.map(aFunc)](#module_ScramjetCore..MultiStream+map) ⇒ <code>MultiStream</code>
    * [.find(...args)](#module_ScramjetCore..MultiStream+find) ⇒ <code>DataStream</code>
    * [.filter(func)](#module_ScramjetCore..MultiStream+filter) ⇒ <code>MultiStream</code>
    * [.mux(cmp)](#module_ScramjetCore..MultiStream+mux) ⇒ <code>DataStream</code>
    * [.add(stream)](#module_ScramjetCore..MultiStream+add)
    * [.remove(stream)](#module_ScramjetCore..MultiStream+remove)
    * [.route([policy], [count])](#module_ScramjetCore..MultiStream+route) ⇒ <code>MultiStream</code>
    * [.smap(transform)](#module_ScramjetCore..MultiStream+smap) ⇒ <code>MultiStream</code>
    * [.cluster(clusterFunc, options)](#module_ScramjetCore..MultiStream+cluster) ⇒ <code>MultiStream</code>

<a name="new_module_ScramjetCore..MultiStream_new"></a>

#### new MultiStream(streams, options)
Crates an instance of MultiStream with the specified stream list


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> | the list of readable streams (other                                     objects will be filtered out!) |
| options | <code>Object</code> | Optional options for the super object. ;) |

<a name="module_ScramjetCore..MultiStream+streams"></a>

#### multiStream.streams : <code>Array</code>
Array of all streams

**Kind**: instance property of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
<a name="module_ScramjetCore..MultiStream+length"></a>

#### multiStream.length ⇒ <code>number</code>
Returns the current stream length

**Kind**: instance property of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
<a name="module_ScramjetCore..MultiStream+map"></a>

#### multiStream.map(aFunc) ⇒ <code>MultiStream</code>
Returns new MultiStream with the streams returned by the tranform.

Runs callback for every stream, returns a new MultiStream of mapped
streams and creates a new multistream consisting of streams returned
by the callback.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the mapped instance  
**Todo**

- [ ] For later add/remove operations to work properly, the stream must
currently return the same instance!


| Param | Type | Description |
| --- | --- | --- |
| aFunc | <code>MapCallback</code> | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

**Example**  
```js
[../samples/multi-stream-map.js](../samples/multi-stream-map.js)
```
<a name="module_ScramjetCore..MultiStream+find"></a>

#### multiStream.find(...args) ⇒ <code>DataStream</code>
Calls Array.prototype.find on the streams

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>DataStream</code> - found DataStream  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Arguments</code> | arguments for |

<a name="module_ScramjetCore..MultiStream+filter"></a>

#### multiStream.filter(func) ⇒ <code>MultiStream</code>
Filters the stream list and returns a new MultiStream with only the
streams for which the callback returned true

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

**Example**  
```js
[../samples/multi-stream-filter.js](../samples/multi-stream-filter.js)
```
<a name="module_ScramjetCore..MultiStream+mux"></a>

#### multiStream.mux(cmp) ⇒ <code>DataStream</code>
Muxes the streams into a single one

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
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
<a name="module_ScramjetCore..MultiStream+add"></a>

#### multiStream.add(stream)
Adds a stream to the MultiStream

If the stream was muxed, filtered or mapped, this stream will undergo the
same transorms and conditions as if it was added in constructor.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-add.js](../samples/multi-stream-add.js)
```
<a name="module_ScramjetCore..MultiStream+remove"></a>

#### multiStream.remove(stream)
Removes a stream from the MultiStream

If the stream was muxed, filtered or mapped, it will be removed from same
streams.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-remove.js](../samples/multi-stream-remove.js)
```
<a name="module_ScramjetCore..MultiStream+route"></a>

#### multiStream.route([policy], [count]) ⇒ <code>MultiStream</code>
Re-routes streams to a new MultiStream of specified size

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - [description]  
**Todo**

- [ ] NYT: not yet tested
- [ ] NYD: not yet documented


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [policy] | <code>function</code> | <code>Affinity.RoundRobin</code> | [description] |
| [count] | <code>number</code> | <code>os.cpus().length</code> | [description] |

<a name="module_ScramjetCore..MultiStream+smap"></a>

#### multiStream.smap(transform) ⇒ <code>MultiStream</code>
Map stream synchronously

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - mapped multistream  

| Param | Type | Description |
| --- | --- | --- |
| transform | <code>function</code> | mapping function ran on every stream (SYNCHRONOUS!) |

<a name="module_ScramjetCore..MultiStream+cluster"></a>

#### multiStream.cluster(clusterFunc, options) ⇒ <code>MultiStream</code>
[Beta] Distributes processing to multiple forked subprocesses.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the resulting stream  
**Todo**

- [ ] BETA


| Param | Type | Description |
| --- | --- | --- |
| clusterFunc | <code>ClusterCallback</code> | a cluster callback with all operations working similarily to DataStream::use |
| options | <code>DistributeOptions</code> |  |

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~MultiStream](#module_ScramjetCore..MultiStream)
        * [new MultiStream(streams, options)](#new_module_ScramjetCore..MultiStream_new)
        * [.streams](#module_ScramjetCore..MultiStream+streams) : <code>Array</code>
        * [.length](#module_ScramjetCore..MultiStream+length) ⇒ <code>number</code>
        * [.map(aFunc)](#module_ScramjetCore..MultiStream+map) ⇒ <code>MultiStream</code>
        * [.find(...args)](#module_ScramjetCore..MultiStream+find) ⇒ <code>DataStream</code>
        * [.filter(func)](#module_ScramjetCore..MultiStream+filter) ⇒ <code>MultiStream</code>
        * [.mux(cmp)](#module_ScramjetCore..MultiStream+mux) ⇒ <code>DataStream</code>
        * [.add(stream)](#module_ScramjetCore..MultiStream+add)
        * [.remove(stream)](#module_ScramjetCore..MultiStream+remove)
        * [.route([policy], [count])](#module_ScramjetCore..MultiStream+route) ⇒ <code>MultiStream</code>
        * [.smap(transform)](#module_ScramjetCore..MultiStream+smap) ⇒ <code>MultiStream</code>
        * [.cluster(clusterFunc, options)](#module_ScramjetCore..MultiStream+cluster) ⇒ <code>MultiStream</code>

<a name="module_ScramjetCore..MultiStream"></a>

### ScramjetCore~MultiStream
An object consisting of multiple streams than can be refined or muxed.

**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  

* [~MultiStream](#module_ScramjetCore..MultiStream)
    * [new MultiStream(streams, options)](#new_module_ScramjetCore..MultiStream_new)
    * [.streams](#module_ScramjetCore..MultiStream+streams) : <code>Array</code>
    * [.length](#module_ScramjetCore..MultiStream+length) ⇒ <code>number</code>
    * [.map(aFunc)](#module_ScramjetCore..MultiStream+map) ⇒ <code>MultiStream</code>
    * [.find(...args)](#module_ScramjetCore..MultiStream+find) ⇒ <code>DataStream</code>
    * [.filter(func)](#module_ScramjetCore..MultiStream+filter) ⇒ <code>MultiStream</code>
    * [.mux(cmp)](#module_ScramjetCore..MultiStream+mux) ⇒ <code>DataStream</code>
    * [.add(stream)](#module_ScramjetCore..MultiStream+add)
    * [.remove(stream)](#module_ScramjetCore..MultiStream+remove)
    * [.route([policy], [count])](#module_ScramjetCore..MultiStream+route) ⇒ <code>MultiStream</code>
    * [.smap(transform)](#module_ScramjetCore..MultiStream+smap) ⇒ <code>MultiStream</code>
    * [.cluster(clusterFunc, options)](#module_ScramjetCore..MultiStream+cluster) ⇒ <code>MultiStream</code>

<a name="new_module_ScramjetCore..MultiStream_new"></a>

#### new MultiStream(streams, options)
Crates an instance of MultiStream with the specified stream list


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> | the list of readable streams (other                                     objects will be filtered out!) |
| options | <code>Object</code> | Optional options for the super object. ;) |

<a name="module_ScramjetCore..MultiStream+streams"></a>

#### multiStream.streams : <code>Array</code>
Array of all streams

**Kind**: instance property of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
<a name="module_ScramjetCore..MultiStream+length"></a>

#### multiStream.length ⇒ <code>number</code>
Returns the current stream length

**Kind**: instance property of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
<a name="module_ScramjetCore..MultiStream+map"></a>

#### multiStream.map(aFunc) ⇒ <code>MultiStream</code>
Returns new MultiStream with the streams returned by the tranform.

Runs callback for every stream, returns a new MultiStream of mapped
streams and creates a new multistream consisting of streams returned
by the callback.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the mapped instance  
**Todo**

- [ ] For later add/remove operations to work properly, the stream must
currently return the same instance!


| Param | Type | Description |
| --- | --- | --- |
| aFunc | <code>MapCallback</code> | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

**Example**  
```js
[../samples/multi-stream-map.js](../samples/multi-stream-map.js)
```
<a name="module_ScramjetCore..MultiStream+find"></a>

#### multiStream.find(...args) ⇒ <code>DataStream</code>
Calls Array.prototype.find on the streams

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>DataStream</code> - found DataStream  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Arguments</code> | arguments for |

<a name="module_ScramjetCore..MultiStream+filter"></a>

#### multiStream.filter(func) ⇒ <code>MultiStream</code>
Filters the stream list and returns a new MultiStream with only the
streams for which the callback returned true

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

**Example**  
```js
[../samples/multi-stream-filter.js](../samples/multi-stream-filter.js)
```
<a name="module_ScramjetCore..MultiStream+mux"></a>

#### multiStream.mux(cmp) ⇒ <code>DataStream</code>
Muxes the streams into a single one

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
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
<a name="module_ScramjetCore..MultiStream+add"></a>

#### multiStream.add(stream)
Adds a stream to the MultiStream

If the stream was muxed, filtered or mapped, this stream will undergo the
same transorms and conditions as if it was added in constructor.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-add.js](../samples/multi-stream-add.js)
```
<a name="module_ScramjetCore..MultiStream+remove"></a>

#### multiStream.remove(stream)
Removes a stream from the MultiStream

If the stream was muxed, filtered or mapped, it will be removed from same
streams.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

**Example**  
```js
[../samples/multi-stream-remove.js](../samples/multi-stream-remove.js)
```
<a name="module_ScramjetCore..MultiStream+route"></a>

#### multiStream.route([policy], [count]) ⇒ <code>MultiStream</code>
Re-routes streams to a new MultiStream of specified size

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - [description]  
**Todo**

- [ ] NYT: not yet tested
- [ ] NYD: not yet documented


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [policy] | <code>function</code> | <code>Affinity.RoundRobin</code> | [description] |
| [count] | <code>number</code> | <code>os.cpus().length</code> | [description] |

<a name="module_ScramjetCore..MultiStream+smap"></a>

#### multiStream.smap(transform) ⇒ <code>MultiStream</code>
Map stream synchronously

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - mapped multistream  

| Param | Type | Description |
| --- | --- | --- |
| transform | <code>function</code> | mapping function ran on every stream (SYNCHRONOUS!) |

<a name="module_ScramjetCore..MultiStream+cluster"></a>

#### multiStream.cluster(clusterFunc, options) ⇒ <code>MultiStream</code>
[Beta] Distributes processing to multiple forked subprocesses.

**Kind**: instance method of [<code>MultiStream</code>](#module_ScramjetCore..MultiStream)  
**Returns**: <code>MultiStream</code> - the resulting stream  
**Todo**

- [ ] BETA


| Param | Type | Description |
| --- | --- | --- |
| clusterFunc | <code>ClusterCallback</code> | a cluster callback with all operations working similarily to DataStream::use |
| options | <code>DistributeOptions</code> |  |

