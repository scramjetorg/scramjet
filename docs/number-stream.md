<a name="NumberStream"></a>

## NumberStream ⇐ <code>DataStream</code>
Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [NumberStream](#NumberStream) ⇐ <code>DataStream</code>
    * [new NumberStream(options)](#new_NumberStream_new)
    * [.sum()](#NumberStream+sum) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.avg()](#NumberStream+avg) ⇒ <code>Promise.&lt;Number&gt;</code>

<a name="new_NumberStream_new"></a>

### new NumberStream(options)
Creates an instance of NumberStream.


| Param | Type |
| --- | --- |
| options | [<code>NumberStreamOptions</code>](#NumberStreamOptions) | 

<a name="NumberStream+sum"></a>

### numberStream.sum() ⇒ <code>Promise.&lt;Number&gt;</code>
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#NumberStream)  
<a name="NumberStream+avg"></a>

### numberStream.avg() ⇒ <code>Promise.&lt;Number&gt;</code>
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#NumberStream)  
<a name="NumberStreamOptions"></a>

## NumberStreamOptions ⇐ <code>DataStreamOptions</code>
NumberStream options

**Kind**: global typedef  
**Extends**: <code>DataStreamOptions</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [valueOf] | <code>function</code> | <code>Number..valueOf</code> | value of the data item function. |

