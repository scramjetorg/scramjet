![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet"></a>

## scramjet : Object
Scramjet main exports expose all the stream classes and a number of methods.

All scramjet streams allow writing, reading or transform modes - currently
exclusively (meaning you can't have two at once). Any of the scramjet streams
can be constructed with the following options passed to mimic node.js standard streams:

* `async promiseTransform(chunk)` - transform method that resolves with a single output chunk
* `async promiseWrite(chunk)` - write method that that resolves when chunk is written
* `async promiseRead(count)` - read method that resolves with an array of chunks when called

See [node.js API for stream implementers for details](https://nodejs.org/api/stream.html#stream_api_for_stream_implementers)

**Extends**: <code>Object</code>  

* [scramjet](#module_scramjet)  <code>Object</code>
    * [:PromiseTransformStream](#module_scramjet.PromiseTransformStream)
        * [new PromiseTransformStream()](#new_module_scramjet.PromiseTransformStream_new)
    * [:errors](#module_scramjet.errors)  <code>ScramjetErrors</code>
    * [:BufferStream](#module_scramjet.BufferStream)
    * [:DataStream](#module_scramjet.DataStream)
    * [:MultiStream](#module_scramjet.MultiStream)
    * [:StringStream](#module_scramjet.StringStream)
    * [:StreamWorker](#module_scramjet.StreamWorker)  <code>StreamWorker</code>
    * [:NumberStream](#module_scramjet.NumberStream)  <code>NumberStream</code>
    * [:WindowStream](#module_scramjet.WindowStream)
    * [:from(str)](#module_scramjet.from)  <code>DataStream</code>
    * [:fromArray(args)](#module_scramjet.fromArray)  <code>DataStream</code>
    * [:plugin(mixin)](#module_scramjet.plugin)  <code>scramjet</code>
    * [:API(version)](#module_scramjet.API)  <code>scramjet</code>
    * [~StreamMixin](#module_scramjet..StreamMixin)  <code>Object</code>
    * [~ScramjetPlugin](#module_scramjet..ScramjetPlugin)  <code>Object</code>

<a name="module_scramjet.PromiseTransformStream"></a>

### scramjet:PromiseTransformStream
**Kind**: static class of [<code>scramjet</code>](#module_scramjet)  
<a name="new_module_scramjet.PromiseTransformStream_new"></a>

#### new PromiseTransformStream()
Provides a lazy-load accessor to PromiseTransformStream - the base class of scramjet streams

<a name="module_scramjet.errors"></a>

### scramjet:errors : ScramjetErrors
Exposes error classes (undocumented)

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Read only**: true  
<a name="module_scramjet.BufferStream"></a>

### scramjet:BufferStream
Provides a lazy-load accessor to BufferStream

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Read only**: true  
**Inject**: BufferStream  
**See**: [buffer-stream.md](buffer-stream.md)  
<a name="module_scramjet.DataStream"></a>

### scramjet:DataStream
Provides a lazy-load accessor to DataStream

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: DataStream  
**See**: [data-stream.md](data-stream.md)  
<a name="module_scramjet.MultiStream"></a>

### scramjet:MultiStream
Provides a lazy-load accessor to MultiStream

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: MultiStream  
**See**: [multi-stream.md](multi-stream.md)  
<a name="module_scramjet.StringStream"></a>

### scramjet:StringStream
Provides a lazy-load accessor to StringStream

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: StringStream  
**See**: [string-stream.md](string-stream.md)  
<a name="module_scramjet.StreamWorker"></a>

### scramjet:StreamWorker : StreamWorker
A Stream Worker class

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: StreamWorker  
<a name="module_scramjet.NumberStream"></a>

### scramjet:NumberStream : NumberStream
A Number stream class

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: NumberStream  
**See**: [number-stream.md](number-stream.md)  
<a name="module_scramjet.WindowStream"></a>

### scramjet:WindowStream
Window stream class

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: WindowStream  
**See**: [number-stream.md](number-stream.md)  
<a name="module_scramjet.from"></a>

### scramjet:from(str) : DataStream
Creates a DataStream that's piped from the passed readable.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>Array</code> \| <code>Iterable</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>Readable</code> | and node.js readable stream (`objectMode: true` is advised) |

<a name="module_scramjet.fromArray"></a>

### scramjet:fromArray(args) : DataStream
Creates a DataStream from an Array

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type |
| --- | --- |
| args | <code>Array.&lt;\*&gt;</code> | 

<a name="module_scramjet.plugin"></a>

### scramjet:plugin(mixin) : scramjet
Add a global plugin to scramjet - injects mixins into prototypes.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| mixin | <code>ScramjetPlugin</code> | the plugin object |

**Example**  
```js
[../samples/scramjet-plugin.js](../samples/scramjet-plugin.js)
```
<a name="module_scramjet.API"></a>

### scramjet:API(version) : scramjet
Gets an API version (this may be important for future use)

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>Number</code> | The required version (currently only: 1) |

<a name="module_scramjet..StreamMixin"></a>

### scramjet~StreamMixin : Object
Definition of a single mixin for a specific Scramjet class. Should contain any number of stream methods.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |

<a name="module_scramjet..ScramjetPlugin"></a>

### scramjet~ScramjetPlugin : Object
Definition of a plugin in Scramjet

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | <code>StreamMixin</code> | definition of constructor and properties for the BufferStream prototype. |
| DataStream | <code>StreamMixin</code> | definition of constructor and properties for the DataStream prototype. |
| MultiStream | <code>StreamMixin</code> | definition of constructor and properties for the MultiStream prototype. |
| StringStream | <code>StreamMixin</code> | definition of constructor and properties for the StringStream prototype. |

