<a name="MultiStream"></a>

## MultiStream
An object consisting of multiple streams than can be refined or muxed.

**Kind**: global class  

* [MultiStream](#MultiStream)
    * [new MultiStream(streams)](#new_MultiStream_new)
    * [.map(func)](#MultiStream+map) ⇒ <code>[MultiStream](#MultiStream)</code>
    * [.filter(func)](#MultiStream+filter) ⇒ <code>[MultiStream](#MultiStream)</code>
    * [.mux(cmp)](#MultiStream+mux) ⇒ <code>DataStream</code>

<a name="new_MultiStream_new"></a>

### new MultiStream(streams)
Crates an instance of MultiStream with the specified stream list.


| Param | Type | Description |
| --- | --- | --- |
| streams | <code>Array.&lt;stream.Readable&gt;</code> | the list of readable streams (other objects will be filtered out!) |

<a name="MultiStream+map"></a>

### multiStream.map(func) ⇒ <code>[MultiStream](#MultiStream)</code>
Runs callback for every stream, returns a new MultiStream of mappedstreams and creates a new multistream consisting of streams returnedby the callback.

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>[MultiStream](#MultiStream)</code> - the mapped instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the callback (recevices stream as the first arg) |

<a name="MultiStream+filter"></a>

### multiStream.filter(func) ⇒ <code>[MultiStream](#MultiStream)</code>
Filters the stream list and returns a new MultiStream with only thestreams for which the callback returned true

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>[MultiStream](#MultiStream)</code> - the filtered instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the callback (recevices stream as the first arg) |

<a name="MultiStream+mux"></a>

### multiStream.mux(cmp) ⇒ <code>DataStream</code>
Muxes the streams in order defined by the passed comparator functionas it was an array.

**Kind**: instance method of <code>[MultiStream](#MultiStream)</code>  
**Returns**: <code>DataStream</code> - The resulting DataStream  

| Param | Type | Description |
| --- | --- | --- |
| cmp | <code>ComparatorFunction</code> | Should return -1 0 or 1 depending on the                                  desired order |

