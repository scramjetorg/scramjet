<a name="DataStream"></a>

## DataStream ⇐ <code>stream.PassThrough</code>
DataStream is the primary stream type for Scramjet. When you parse yourstream, just pipe it you can then perform calculations on the data objectsstreamed through your flow.

**Kind**: global class  
**Extends:** <code>stream.PassThrough</code>  

* [DataStream](#DataStream) ⇐ <code>stream.PassThrough</code>
    * [new DataStream(opts)](#new_DataStream_new)
    * [.debug(func)](#DataStream+debug) ⇒ <code>[DataStream](#DataStream)</code>
    * [.group(func)](#DataStream+group) ⇒ <code>[DataStream](#DataStream)</code>
    * [.tee(func)](#DataStream+tee) ⇒ <code>[DataStream](#DataStream)</code>
    * [.reduce(func, into)](#DataStream+reduce) ⇒ <code>Promise</code>
    * [.map(func)](#DataStream+map) ⇒ <code>[DataStream](#DataStream)</code>
    * [.filter(func)](#DataStream+filter) ⇒ <code>[DataStream](#DataStream)</code>
    * [.pop(func)](#DataStream+pop) ⇒ <code>[DataStream](#DataStream)</code>
    * [.separate()](#DataStream+separate) ⇒ <code>MultiStream</code>

<a name="new_DataStream_new"></a>

### new DataStream(opts)
Create the DataStream.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Stream options passed to superclass |

<a name="DataStream+debug"></a>

### dataStream.debug(func) ⇒ <code>[DataStream](#DataStream)</code>
Injects a ```debugger``` statement when called.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | if passed, the function will be called on self                         to add an option to inspect the stream in place,                         while not breaking the transform chain |

<a name="DataStream+group"></a>

### dataStream.group(func) ⇒ <code>[DataStream](#DataStream)</code>
Calls the given callback for a hash, then makes sure all items with thesame hash are processed by a single thread (or server).

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - self  
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

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The duplicate stream will be passed as                                  first argument. |

<a name="DataStream+reduce"></a>

### dataStream.reduce(func, into) ⇒ <code>Promise</code>
Reduces the stream into the given object. The main difference to nativeis that Array.prototype.reduce is that only the first object will bepassed to the following methods.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>Promise</code> - Promise resolved by the last object returned by the                   call of the transform function.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The into object will be passed as the                                  first argument, the data object from the                                  stream as the second. |
| into | <code>Object</code> | Any object passed initally to the transform                       function |

<a name="DataStream+map"></a>

### dataStream.map(func) ⇒ <code>[DataStream](#DataStream)</code>
Transforms stream objects into new ones, just like Array.prototype.mapdoes.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - mapped stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The function that creates the new                                  object. As usually it can return a                                  Promise or just return the new                                  object. |

<a name="DataStream+filter"></a>

### dataStream.filter(func) ⇒ <code>[DataStream](#DataStream)</code>
Filters object based on the function outcome, just likeArray.prototype.filter.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | The function that filters the object.                                  As usually it can return a Promise or                                  just return the boolean value of true                                  if the item should not be filtered,                                  false otherwise. |

<a name="DataStream+pop"></a>

### dataStream.pop(func) ⇒ <code>[DataStream](#DataStream)</code>
Pops the first item from the stream and pipes the other.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Returns**: <code>[DataStream](#DataStream)</code> - substream.  
**Todo**

- [ ] Not yet implemented. Should use the filter method above.


| Param | Type | Description |
| --- | --- | --- |
| func | <code>TransformFunction</code> | Would receive the first item as the                                  first argument. |

<a name="DataStream+separate"></a>

### dataStream.separate() ⇒ <code>MultiStream</code>
Splits the stream into a Multistream where every function passed createsa separate stream.

**Kind**: instance method of <code>[DataStream](#DataStream)</code>  
**Todo**

- [ ] Not yet implemented. Should use a number of tee+filter combination.


| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>TransformFunction</code> | The list of transfrom functions |

