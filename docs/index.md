![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet"></a>

## scramjet
Scramjet main exports expose all the stream classes and a number of methods.

All scramjet streams allow writing, reading or transform modes - currently
exclusively (meaning you can't have two at once). Any of the scramjet streams
can be constructed with the following options passed to mimic node.js standard streams:

* `async promiseTransform(chunk)` - transform method that resolves with a single output chunk
* `async promiseWrite(chunk)` - write method that that resolves when chunk is written
* `async promiseRead(count)` - read method that resolves with an array of chunks when called

See [node.js API for stream implementers for details](https://nodejs.org/api/stream.html#stream_api_for_stream_implementers)

The object exposes the following classes:

* `DataStream` {@see DataStream} - the basic object stream of any type
* `StringStream` {@see StringStream} - a stream of strings
* `BufferStream` {@see BufferStream} - a stream of buffers
* `MultiStream` {@see MultiStream} - a group of streams
* `NumberStream` {@see NumberStream} - a stream of numbers
* `WindowStream` {@see WindowStream} - a stream of windows of objects

The general concept of Scramjet streams is facilitating node's TransformStream mechanism so that you don't need
to create a number of streams and create the pipeline, but use the concept of chaining instead. When you call `parse`
method for instance, scramjet creates a new stream, pipes it to the callee and forwards errors.

What's worth mentioning - scramjet tries to limit the number of created transform streams and pushes the transforms
one after another into the same stream class therefore a code `stream.map(transform1).map(transform2).filter(transform3)`
will only operate on a single transform stream that evaluates all three transforms one after another.


* [scramjet](#module_scramjet)
    * [:StreamWorker](#module_scramjet.StreamWorker)  [<code>StreamWorker</code>](stream-worker.md#module_scramjet.StreamWorker)
    * [:from(input, [options])](#module_scramjet.from)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [:fromArray(array, [options])](#module_scramjet.fromArray)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [:createTransformModule(transform, [options])](#module_scramjet.createTransformModule)  <code>function</code>
    * [:createReadModule(anything, [options])](#module_scramjet.createReadModule)  <code>function</code>
    * [:plugin(mixin)](#module_scramjet.plugin)  [<code>ScramjetPlugin</code>](definitions.md#module_scramjet..ScramjetPlugin)
    * [:API(version)](#module_scramjet.API)  [<code>ScramjetPlugin</code>](definitions.md#module_scramjet..ScramjetPlugin)

<a name="module_scramjet.StreamWorker"></a>

### scramjet:StreamWorker : StreamWorker
A Stream Worker class

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Inject**: StreamWorker  
<a name="module_scramjet.from"></a>

### scramjet:from(input, [options]) : DataStream
Creates a DataStream that's piped from the passed readable.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> |  | argument to be turned into new stream |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) \| <code>Writable</code> | <code>{}</code> | options for creation of a new stream or the target stream |
| ...args | <code>Array.&lt;any&gt;</code> |  | additional arguments for the stream - will be passed to the function or generator |

<a name="module_scramjet.fromArray"></a>

### scramjet:fromArray(array, [options]) : DataStream
Creates a DataStream from an Array

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>Array</code> |  | list of chunks |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | the read stream options |

<a name="module_scramjet.createTransformModule"></a>

### scramjet:createTransformModule(transform, [options]) : function
Creates a safe wrapper for scramjet transform module. See [Modules documentation](modules.md) for more info.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  
**Returns**: <code>function</code> - a scramjet module function  

| Param | Type | Default |
| --- | --- | --- |
| transform | [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) |  | 
| [options] | [<code>CreateModuleOptions</code>](definitions.md#module_scramjet..CreateModuleOptions) | <code>{}</code> | 
| ...initialArgs | <code>Array.&lt;any&gt;</code> |  | 

<a name="module_scramjet.createReadModule"></a>

### scramjet:createReadModule(anything, [options]) : function
Creates a safe wrapper for scramjet read module. See [Modules documentation](modules.md) for more info.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  
**Returns**: <code>function</code> - a scramjet module function  

| Param | Type | Default |
| --- | --- | --- |
| anything | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> |  | 
| [options] | [<code>CreateModuleOptions</code>](definitions.md#module_scramjet..CreateModuleOptions) | <code>{}</code> | 
| ...initialArgs | <code>Array.&lt;any&gt;</code> |  | 

<a name="module_scramjet.plugin"></a>

### scramjet:plugin(mixin) : ScramjetPlugin
Plugs in methods for any of the classes

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  
**Test**: test/methods/scramjet-plugin.js  

| Param | Type | Description |
| --- | --- | --- |
| mixin | [<code>ScramjetPlugin</code>](definitions.md#module_scramjet..ScramjetPlugin) | the plugin object |

<a name="module_scramjet.API"></a>

### scramjet:API(version) : ScramjetPlugin
Gets an API version (this may be important for future use)

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>number</code> | The required version (currently only: 1) |

