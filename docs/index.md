![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="scramjet"></a>

## scramjet : Object
Scramjet main exports expose all the stream classes and a number of methods.

All scramjet streams allow writing, reading or transform modes - currently
exclusively (meaning you can't have two at once). Any of the scramjet streams
can be constructed with the following options passed to mimic node.js standard streams:

* `async promiseTransform(chunk)` - transform method that resolves with a single output chunk
* `async promiseWrite(chunk)` - write method that that resolves when chunk is written
* `async promiseRead(count)` - read method that resolves with an array of chunks when called

See [node.js API for stream implementers for details](https://nodejs.org/api/stream.html#stream_api_for_stream_implementers)

**Kind**: global variable  
**Extends**: <code>Object</code>  

* [scramjet](#scramjet)  <code>Object</code>
    * [:BufferStream](#scramjet.BufferStream)  <code>BufferStream</code>
    * [:DataStream](#scramjet.DataStream)  <code>DataStream</code>
    * [:MultiStream](#scramjet.MultiStream)  <code>MultiStream</code>
    * [:StringStream](#scramjet.StringStream)  <code>StringStream</code>
    * [:PromiseTransformStream](#scramjet.PromiseTransformStream)  <code>PromiseTransformStream</code>
    * [:StreamWorker](#scramjet.StreamWorker)  <code>StreamWorker</code>
    * [:NumberStream](#scramjet.NumberStream)  <code>NumberStream</code>

<a name="scramjet.BufferStream"></a>

### scramjet:BufferStream : BufferStream
Provides a lazy-load accessor to BufferStream

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**See**: [buffer-stream.md](buffer-stream.md)  
<a name="scramjet.DataStream"></a>

### scramjet:DataStream : DataStream
Provides a lazy-load accessor to DataStream

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**See**: [data-stream.md](data-stream.md)  
<a name="scramjet.MultiStream"></a>

### scramjet:MultiStream : MultiStream
Provides a lazy-load accessor to MultiStream

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**See**: [multi-stream.md](multi-stream.md)  
<a name="scramjet.StringStream"></a>

### scramjet:StringStream : StringStream
Provides a lazy-load accessor to StringStream

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**See**: [string-stream.md](string-stream.md)  
<a name="scramjet.PromiseTransformStream"></a>

### scramjet:PromiseTransformStream : PromiseTransformStream
Provides a lazy-load accessor to PromiseTransformStream - the base class of scramjet streams

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
<a name="scramjet.StreamWorker"></a>

### scramjet:StreamWorker : StreamWorker
A Stream Worker class

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**Returns**: <code>StreamWorker</code> - the resulting stream  
<a name="scramjet.NumberStream"></a>

### scramjet:NumberStream : NumberStream
A Number stream class

**Kind**: static property of [<code>scramjet</code>](#scramjet)  
**Returns**: <code>NumberStream</code> - the resulting stream  
**See**: [number-stream.md](number-stream.md)  
<a name="StreamMixin"></a>

## StreamMixin : Object
Definition of a single mixin for a specific Scramjet class

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |
| * | <code>function</code> | any name given will be mixed in to the scramjet stream (except for constructor) |

<a name="ScramjetPlugin"></a>

## ScramjetPlugin : Object
Definition of a plugin in Scramjet

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the BufferStream prototype. |
| DataStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the DataStream prototype. |
| MultiStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the MultiStream prototype. |
| StringStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the StringStream prototype. |

