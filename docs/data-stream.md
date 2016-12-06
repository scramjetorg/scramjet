<a name="DataStream"></a>

## DataStream ⇐ <code>stream.PassThrough</code>
DataStream is the primary stream type for Scramjet. When you parse yourstream, just pipe it you can then perform calculations on the data objectsstreamed through your flow.

**Kind**: global class  
**Extends:** <code>stream.PassThrough</code>  

* [DataStream](#DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_DataStream_new)
    * [._selfInstance()](#DataStream+_selfInstance) ⇒ <code>[DataStream](#DataStream)</code>
    * [.debug(func)](#DataStream+debug) ⇒ <code>[DataStream](#DataStream)</code>
    * [.group(func)](#DataStream+group) ⇒ <code>[DataStream](#DataStream)</code>
    * [.tee(func)](#DataStream+tee) ⇒ <code>[DataStream](#DataStream)</code>
    * [.slice(start, end)](#DataStream+slice) ⇒ <code>[DataStream](#DataStream)</code>
    * [.reduce(func, into)](#DataStream+reduce) ⇒ <code>Promise</code>
    * [.reduceNow(func, into)](#DataStream+reduceNow) ⇒ <code>Promise</code>
    * [.map(func)](#DataStream+map) ⇒ <code>[DataStream](#DataStream)</code>
    * [.filter(func)](#DataStream+filter) ⇒ <code>[DataStream](#DataStream)</code>
    * [.pop(count, func)](#DataStream+pop) ⇒ <code>[DataStream](#DataStream)</code>
    * [.separate()](#DataStream+separate) ⇒ <code>MultiStream</code>
    * [.toBufferStream(serializer)](#DataStream+toBufferStream) ⇒ <code>BufferStream</code>
    * [.toStringStream(serializer)](#DataStream+toStringStream) ⇒ <code>StringStream</code>

<a name="new_DataStream_new"></a>

### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

<a name="DataStream+_selfInstance"></a>

### dataStream._selfInstance() ⇒ <code>[DataStream](#DataStream)</code>
Should return a new instance of self. Normally this doesn't have to beoverridden.When the constructor would use some special arguments this may be used tooverride the object construction in {@see pop} and {@see tee}...

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - an empty instance of the same class.  
**See**: example in file: [../samples/data-stream-selfinstance.js](../samples/data-stream-selfinstance.js)  
<a name="DataStream+debug"></a>

### dataStream.debug(func) ⇒ <code>[DataStream](#DataStream)</code>
Injects a ```debugger``` statement when called.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  
**See**: example in file: [../samples/data-stream-debug.js](../samples/data-stream-debug.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

<a name="DataStream+group"></a>

### dataStream.group(func) ⇒ <code>[DataStream](#DataStream)</code>
Calls the given callback for a hash, then makes sure all items with thesame hash are processed by a single thread (or server).

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  
**See**: example in file: [../samples/data-stream-group.js](../samples/data-stream-group.js)  
**Todo**

- [ ] Not yet implemented


| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | the callback function |

<a name="DataStream+tee"></a>

### dataStream.tee(func) ⇒ <code>[DataStream](#DataStream)</code>
Duplicate the stream and pass the duplicate to the passed callbackfunction.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  
**See**: example in file: [../samples/data-stream-tee.js](../samples/data-stream-tee.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The duplicate stream will be passed as                                  first argument. |

<a name="DataStream+slice"></a>

### dataStream.slice(start, end) ⇒ <code>[DataStream](#DataStream)</code>
Returns a stream consisting of an array of items with `0` to `start`omitted and `start` until `end` included. Works similarily toArray.prototype.slice.Takes count from the moment it's called. Any previous items will not becounted.Also take into account that the stream will end if both arguments arepassed.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - the affected stream  
**See**: example in file: [../samples/data-stream-slice.js](../samples/data-stream-slice.js)  
**Todo**

- [ ] to be implemented


| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> | omit this number of entries. |
| end | <code>Number</code> | end at this number of entries (from 0) |

<a name="DataStream+reduce"></a>

### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into the given object. The main difference to nativeis that Array.prototype.reduce is that only the first object will bepassed to the following methods.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the                   call of the transform function.  
**See**: example in file: [../samples/data-stream-reduce.js](../samples/data-stream-reduce.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the                                  first argument, the data object from the                                  stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform                       function |

<a name="DataStream+reduceNow"></a>

### dataStream.reduceNow(func, into) ⇒ <code>Promise</code>
Reduces the stream into the given object the same way as {@see reduce},but resolves the promise at once with the passed object.If the object is an instance of EventEmitter then it will propagate theerror from the previous stream.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the                   call of the transform function.  
**See**: example in file: [../samples/data-stream-reduceNow.js](../samples/data-stream-reduceNow.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the                                  first argument, the data object from the                                  stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform                       function |

<a name="DataStream+map"></a>

### dataStream.map(func) ⇒ <code>[DataStream](#DataStream)</code>
Transforms stream objects into new ones, just like Array.prototype.mapdoes.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - mapped stream  
**See**: example in file: [../samples/data-stream-map.js](../samples/data-stream-map.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The function that creates the new                                  object. As usually it can return a                                  Promise or just return the new                                  object. |

<a name="DataStream+filter"></a>

### dataStream.filter(func) ⇒ <code>[DataStream](#DataStream)</code>
Filters object based on the function outcome, just likeArray.prototype.filter.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - filtered stream  
**See**: example in file: [../samples/data-stream-filter.js](../samples/data-stream-filter.js)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The function that filters the object.                                  As usually it can return a Promise or                                  just return the boolean value of true                                  if the item should not be filtered,                                  false otherwise. |

<a name="DataStream+pop"></a>

### dataStream.pop(count, func) ⇒ <code>[DataStream](#DataStream)</code>
Pops the first item from the stream and pipes the other.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - substream.  
**See**: example in file: [../samples/data-stream-pop.js](../samples/data-stream-pop.js)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of items to pop. |
| func | <code>TransformFunction</code> | Function that receives an array of popped                                 items. |

<a name="DataStream+separate"></a>

### dataStream.separate() ⇒ <code>MultiStream</code>
Splits the stream two ways

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**See**: example in file: [../samples/data-stream-separate.js](../samples/data-stream-separate.js)  
**Todo**

- [ ] Not yet implemented. Should use a number of tee+filter combination.


| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>TransformFunction</code> | The list of transfrom functions |

<a name="DataStream+toBufferStream"></a>

### dataStream.toBufferStream(serializer) ⇒ <code>BufferStream</code>
Creates a BufferStream

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>BufferStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>TransformFunction</code> | A method that converts objects to                                        Buffer. |

<a name="DataStream+toStringStream"></a>

### dataStream.toStringStream(serializer) ⇒ <code>StringStream</code>
Creates a StringStream.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>StringStream</code> - the resulting stream  

| Param | Type | Description |
| --- | --- | --- |
| serializer | <code>TransformFunction</code> | A method that converts objects to                                        String. |

