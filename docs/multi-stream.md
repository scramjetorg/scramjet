<a name="MultiStream"></a>

## MultiStream
An object consisting of multiple streams than can be refined or muxed.

**Kind**: global class  

* [MultiStream](#MultiStream)
    * [new MultiStream(streams, options)](#new_MultiStream_new)
    * [.map(func)](#MultiStream+map) ⇒ <code>[MultiStream](#MultiStream)</code>
    * [.filter(func)](#MultiStream+filter) ⇒ <code>[MultiStream](#MultiStream)</code>
    * [.dedupe(cmp)](#MultiStream+dedupe) ⇒ <code>DataStream</code>
    * [.mux(cmp)](#MultiStream+mux) ⇒ <code>DataStream</code>
    * [.add(stream)](#MultiStream+add)
    * [.remove(stream)](#MultiStream+remove)

<a name="new_MultiStream_new"></a>

### new MultiStream(streams, options)
Crates an instance of MultiStream with the specified stream list.


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> | the list of readable streams (other                                     objects will be filtered out!) |
| options | <code>Object</code> | Optional options for the super object. ;) |

<a name="MultiStream+map"></a>

### multiStream.map(func) ⇒ <code>[MultiStream](#MultiStream)</code>
Runs callback for every stream, returns a new MultiStream of mappedstreams and creates a new multistream consisting of streams returnedby the callback.

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>[MultiStream](#MultiStream)</code> - the mapped instance  
**Todo**

- [ ] For later add/remove operations to work properly, the stream mustcurrently return the same instance!


| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Mapper ran in Promise::then (so you can                                  return a promise or an object) |

<a name="MultiStream+filter"></a>

### multiStream.filter(func) ⇒ <code>[MultiStream](#MultiStream)</code>
Filters the stream list and returns a new MultiStream with only thestreams for which the callback returned true

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>[MultiStream](#MultiStream)</code> - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Filter ran in Promise::then (so you can                                  return a promise or a boolean) |

<a name="MultiStream+dedupe"></a>

### multiStream.dedupe(cmp) ⇒ <code>DataStream</code>
Makes a number of redundant streams into a single one

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>DataStream</code> - the deduplicated stream  
**Todo**

- [ ] Not yet implemented


| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>TransformFunction</code> | returns the object hash for comparison |

<a name="MultiStream+mux"></a>

### multiStream.mux(cmp) ⇒ <code>DataStream</code>
Muxes the streams into a single one.

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>DataStream</code> - The resulting DataStream  
**Todo**

- [ ] For now using comparator will not affect the mergesort.
- [ ] Sorting requires all the streams to be constantly flowing, any      single one drain results in draining the muxed too even if there      were possible data on other streams.


| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>ComparatorFunction</code> | Should return -1 0 or 1 depending on the                                  desired order. If passed the chunks will                                  be added in a sorted order. |

<a name="MultiStream+add"></a>

### multiStream.add(stream)
Adds a stream to the MultiStream. If the stream was muxed, filtered ormapped, this stream will undergo the same transorms and conditions asif it was added in constructor.

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

<a name="MultiStream+remove"></a>

### multiStream.remove(stream)
Removes a stream from the MultiStream. If the stream was muxed, filteredor mapped, it will be removed from same streams

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>stream.Readable</code> | [description] |

