![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="NumberStream"></a>

## NumberStream : DataStream
Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [NumberStream](#NumberStream)  <code>DataStream</code>
    * [new NumberStream(options)](#new_NumberStream_new)
    * [numberStream.sum()](#NumberStream+sum) ⇄ <code>Number</code>
    * [numberStream.avg()](#NumberStream+avg) ⇄ <code>Number</code>
    * [NumberStream:NumberStreamOptions](#NumberStream.NumberStreamOptions)  <code>DataStreamOptions</code>

<a name="new_NumberStream_new"></a>

### new NumberStream(options)
Creates an instance of NumberStream.


| Param | Type |
| --- | --- |
| options | <code>NumberStreamOptions</code> | 

<a name="NumberStream+sum"></a>

### numberStream.sum() : Number ⇄
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#NumberStream)  
<a name="NumberStream+avg"></a>

### numberStream.avg() : Number ⇄
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#NumberStream)  
<a name="NumberStream.NumberStreamOptions"></a>

### NumberStream:NumberStreamOptions : DataStreamOptions
NumberStream options

**Kind**: static typedef of [<code>NumberStream</code>](#NumberStream)  
**Extends**: <code>DataStreamOptions</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [valueOf] | <code>function</code> | <code>Number..valueOf</code> | value of the data item function. |

