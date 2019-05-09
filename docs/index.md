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

**Extends**: <code>Object</code>  

* [scramjet](#module_scramjet)  <code>Object</code>
    * [~ScramjetTransformCallback](#module_scramjet..ScramjetTransformCallback)  <code>\*</code> \| <code>undefined</code>
    * [~ScramjetWriteCallback](#module_scramjet..ScramjetWriteCallback)  <code>function</code>
    * [~ScramjetReadCallback](#module_scramjet..ScramjetReadCallback)  <code>Array.&lt;\*&gt;</code>
    * [~DataStreamOptions](#module_scramjet..DataStreamOptions)  <code>Object</code>
    * [:errors](#module_scramjet.errors)  <code>ScramjetErrors</code>
    * [:StreamWorker](#module_scramjet.StreamWorker)  [<code>StreamWorker</code>](index.md#module_scramjet.StreamWorker)
    * [:NumberStream](#module_scramjet.NumberStream)  [<code>NumberStream</code>](index.md#module_scramjet.NumberStream)
    * [:WindowStream](#module_scramjet.WindowStream)
    * [:from(input, [options])](#module_scramjet.from)  [<code>DataStream</code>](data-stream.md#DataStream)
    * [:fromArray(args)](#module_scramjet.fromArray)  [<code>DataStream</code>](data-stream.md#DataStream)
    * [:createTransformModule(transform, options, ...initialArgs)](#module_scramjet.createTransformModule)
    * [:createReadModule(anything, options, ...initialArgs)](#module_scramjet.createReadModule)
    * [:plugin(mixin)](#module_scramjet.plugin)  [<code>scramjet</code>](index.md#module_scramjet)
    * [:API(version)](#module_scramjet.API)  [<code>scramjet</code>](index.md#module_scramjet)
    * [:ScramjetPlugin](#module_scramjet.ScramjetPlugin)  <code>Object</code>
    * [~CreateModuleOptions](#module_scramjet..CreateModuleOptions)
    * [~StreamMixin](#module_scramjet..StreamMixin)  <code>Object</code>

<a name="module_scramjet..ScramjetTransformCallback"></a>

### scramjet~ScramjetTransformCallback : * | undefined
Transform async callback. The passed transform should return a new chunk, unless
the output should be filtered - if so, the transform should return `undefined`.

Additionally the function can reject with `DataStream.filter` - the result will be
filtered and no other transforms will be run on the chunk.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Returns**: <code>\*</code> \| <code>undefined</code> - the result, undefined will be treated as filtered out.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>String</code> \| <code>\*</code> | the stream chunk |
| encoding | <code>String</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetWriteCallback"></a>

### scramjet~ScramjetWriteCallback : function
Write async callback. Await your async write and resolve.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>String</code> \| <code>\*</code> | the stream chunk |
| encoding | <code>String</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetReadCallback"></a>

### scramjet~ScramjetReadCallback : Array.<*>
Read async callback. Simply await your async operations and return the result as array.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Returns**: <code>Array.&lt;\*&gt;</code> - the read chunk.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | the number of chunks that should be read ("this is more like a set of guideline than actual rules"). |

<a name="module_scramjet..DataStreamOptions"></a>

### scramjet~DataStreamOptions : Object
Standard options for scramjet streams.

Defines async transforms or read/write methods for a stream.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [promiseRead] | [<code>ScramjetReadCallback</code>](index.md#module_scramjet..ScramjetReadCallback) | <code></code> | an async function returning the next read item |
| [promiseWrite] | [<code>ScramjetWriteCallback</code>](index.md#module_scramjet..ScramjetWriteCallback) | <code></code> | an async function writing the next written item |
| [promiseTransform] | [<code>ScramjetTransformCallback</code>](index.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function returning a transformed chunk |
| [promiseFlush] | [<code>ScramjetReadCallback</code>](index.md#module_scramjet..ScramjetReadCallback) | <code></code> | an async function run before transform stream ends to push last chunks from the buffer |
| [beforeTransform] | [<code>ScramjetTransformCallback</code>](index.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function run before the transform |
| [afterTransform] | [<code>ScramjetTransformCallback</code>](index.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function run after the transform |
| maxParallel | <code>Number</code> |  | the number of transforms done in parallel |
| referrer | [<code>DataStream</code>](data-stream.md#DataStream) |  | a referring stream to point to (if possible the transforms will be pushed to it |
| [objectMode] | <code>boolean</code> | <code>true</code> | should the object mode be used                                 instead of creating a new stream) |

<a name="module_scramjet.errors"></a>

### scramjet:errors : ScramjetErrors
Exposes error classes (undocumented)

**Kind**: static property of [<code>scramjet</code>](#module_scramjet)  
**Read only**: true  
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

### scramjet:from(input, [options]) : DataStream
Creates a DataStream that's piped from the passed readable.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> |  | argument to be turned into new stream |
| [options] | [<code>DataStreamOptions</code>](index.md#module_scramjet..DataStreamOptions) \| <code>Writable</code> | <code>{}</code> | options for creation of a new stream or the target stream |
| [...args] | <code>\*</code> |  | additional arguments for the stream - will be passed to the function or generator |

<a name="module_scramjet.fromArray"></a>

### scramjet:fromArray(args) : DataStream
Creates a DataStream from an Array

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type |
| --- | --- |
| args | <code>Array.&lt;\*&gt;</code> | 

<a name="module_scramjet.createTransformModule"></a>

### scramjet:createTransformModule(transform, options, ...initialArgs)
Creates a safe wrapper for scramjet transform module. See [Modules documentation](modules.md) for more info.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type |
| --- | --- |
| transform | <code>UseCallback</code> | 
| options | [<code>CreateModuleOptions</code>](index.md#module_scramjet..CreateModuleOptions) | 
| ...initialArgs | <code>any</code> | 

<a name="module_scramjet.createReadModule"></a>

### scramjet:createReadModule(anything, options, ...initialArgs)
Creates a safe wrapper for scramjet read module. See [Modules documentation](modules.md) for more info.

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type |
| --- | --- |
| anything | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | 
| options | [<code>CreateModuleOptions</code>](index.md#module_scramjet..CreateModuleOptions) | 
| ...initialArgs | <code>any</code> | 

<a name="module_scramjet.plugin"></a>

### scramjet:plugin(mixin) : scramjet
ignore

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  
**Test**: test/methods/scramjet-plugin.js  

| Param | Type | Description |
| --- | --- | --- |
| mixin | [<code>ScramjetPlugin</code>](index.md#module_scramjet.ScramjetPlugin) | the plugin object |

<a name="module_scramjet.API"></a>

### scramjet:API(version) : scramjet
Gets an API version (this may be important for future use)

**Kind**: static method of [<code>scramjet</code>](#module_scramjet)  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>Number</code> | The required version (currently only: 1) |

<a name="module_scramjet.ScramjetPlugin"></a>

### scramjet:ScramjetPlugin : Object
Definition of a plugin in Scramjet

**Kind**: static typedef of [<code>scramjet</code>](#module_scramjet)  
**Internal**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | [<code>StreamMixin</code>](index.md#module_scramjet..StreamMixin) | definition of constructor and properties for the BufferStream prototype. |
| DataStream | [<code>StreamMixin</code>](index.md#module_scramjet..StreamMixin) | definition of constructor and properties for the DataStream prototype. |
| MultiStream | [<code>StreamMixin</code>](index.md#module_scramjet..StreamMixin) | definition of constructor and properties for the MultiStream prototype. |
| StringStream | [<code>StreamMixin</code>](index.md#module_scramjet..StreamMixin) | definition of constructor and properties for the StringStream prototype. |

<a name="module_scramjet..CreateModuleOptions"></a>

### scramjet~CreateModuleOptions
Options for createModule

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| StreamClass | [<code>DataStream</code>](data-stream.md#DataStream) | defines what class should the module assume |

<a name="module_scramjet..StreamMixin"></a>

### scramjet~StreamMixin : Object
Definition of a single mixin for a specific Scramjet class. Should contain any number of stream methods.

**Kind**: inner typedef of [<code>scramjet</code>](#module_scramjet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |

