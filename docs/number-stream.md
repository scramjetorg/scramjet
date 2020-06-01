![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.NumberStream"></a>

## :NumberStream : DataStream
Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

**Kind**: static class  
**Extends**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)  

* [:NumberStream](#module_scramjet.NumberStream)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [new NumberStream(options)](#new_module_scramjet.NumberStream_new)
    * [numberStream.sum()](#module_scramjet.NumberStream+sum) ⇄ <code>Promise.&lt;number&gt;</code> \| <code>any</code>
    * [numberStream.avg()](#module_scramjet.NumberStream+avg) ⇄ <code>Promise.&lt;number&gt;</code> \| <code>any</code>

<a name="new_module_scramjet.NumberStream_new"></a>

### new NumberStream(options)
Creates an instance of NumberStream.


| Param | Type |
| --- | --- |
| options | [<code>NumberStreamOptions</code>](definitions.md#module_scramjet..NumberStreamOptions) | 

<a name="module_scramjet.NumberStream+sum"></a>

### numberStream.sum() : Promise.<number> | any ⇄
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#module_scramjet.NumberStream)  
<a name="module_scramjet.NumberStream+avg"></a>

### numberStream.avg() : Promise.<number> | any ⇄
Calculates the sum of all items in the stream.

**Kind**: instance method of [<code>NumberStream</code>](#module_scramjet.NumberStream)  
