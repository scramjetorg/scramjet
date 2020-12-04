![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet..ShiftBufferCallback"></a>

## ~ShiftBufferCallback : function
Shift Function

**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Buffer</code> \| <code>any</code> | shifted bytes |

<a name="module_scramjet..BufferParseCallback"></a>

## ~BufferParseCallback : Promise.<any> | any
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

<a name="module_scramjet..MapCallback"></a>

## ~MapCallback : Promise.<any> | any
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>any</code> | the chunk to be mapped |

<a name="module_scramjet..FilterCallback"></a>

## ~FilterCallback : Promise.<Boolean> | Boolean
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> \| <code>Boolean</code> - information if the object should remain in the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>any</code> | the chunk to be filtered or not |

<a name="module_scramjet..ReduceCallback"></a>

## ~ReduceCallback : Promise.<any> | any
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>any</code> | the accumulator - the object initially passed or returned by the previous reduce operation |
| chunk | <code>object</code> | the stream chunk. |

<a name="module_scramjet..DoCallback"></a>

## ~DoCallback : Promise.<any> | any ⇄
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - the outcome is discarded  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>object</code> | source stream chunk |

<a name="module_scramjet..IntoCallback"></a>

## ~IntoCallback : Promise.<any> | any ⇄
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>any</code> | source stream chunk |

<a name="module_scramjet..UseCallback"></a>

## ~UseCallback : DataStream ⇄
**Kind**: inner typedef  

| Param | Type |
| --- | --- |
| stream | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | 
| ...parameters | <code>Array.&lt;any&gt;</code> | 

<a name="module_scramjet..TeeCallback"></a>

## ~TeeCallback : function
**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| teed | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | The teed stream |

<a name="module_scramjet..ScramjetTransformCallback"></a>

## ~ScramjetTransformCallback : Promise.<(any|undefined)> | any | undefined
Transform async callback. The passed transform should return a new chunk, unless
the output should be filtered - if so, the transform should return `undefined`.

Additionally the function can reject with `DataStream.filter` - the result will be
filtered and no other transforms will be run on the chunk.

**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;(any\|undefined)&gt;</code> \| <code>any</code> \| <code>undefined</code> - the result, undefined will be treated as filtered out.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>string</code> \| <code>any</code> | the stream chunk |
| encoding | <code>string</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetWriteCallback"></a>

## ~ScramjetWriteCallback : Promise.<void> | void
Write async callback. Await your async write and resolve.

**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;void&gt;</code> \| <code>void</code> - should resolve when the write ends  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>string</code> \| <code>any</code> | the stream chunk |
| encoding | <code>string</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetReadCallback"></a>

## ~ScramjetReadCallback : Array.<any> | Promise.<Array.<any>>
Read async callback. Simply await your async operations and return the result as array.

**Kind**: inner typedef  
**Returns**: <code>Array.&lt;any&gt;</code> \| <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - the read chunk.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | the number of chunks that should be read ("this is more like a set of guideline than actual rules"). |

<a name="module_scramjet..DataStreamOptions"></a>

## ~DataStreamOptions : object
Standard options for scramjet streams.

Defines async transforms or read/write methods for a stream.

**Kind**: inner typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [promiseRead] | [<code>ScramjetReadCallback</code>](definitions.md#module_scramjet..ScramjetReadCallback) | <code></code> | an async function returning the next read item |
| [promiseWrite] | [<code>ScramjetWriteCallback</code>](definitions.md#module_scramjet..ScramjetWriteCallback) | <code></code> | an async function writing the next written item |
| [promiseTransform] | [<code>ScramjetTransformCallback</code>](definitions.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function returning a transformed chunk |
| [promiseFlush] | [<code>ScramjetReadCallback</code>](definitions.md#module_scramjet..ScramjetReadCallback) | <code></code> | an async function run before transform stream ends to push last chunks from the buffer |
| [beforeTransform] | [<code>ScramjetTransformCallback</code>](definitions.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function run before the transform |
| [afterTransform] | [<code>ScramjetTransformCallback</code>](definitions.md#module_scramjet..ScramjetTransformCallback) | <code></code> | an async function run after the transform |
| [maxParallel] | <code>number</code> | <code>os.cpus.length*2</code> | the number of transforms done in parallel |
| [referrer] | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | <code></code> | a referring stream to point to (if possible the transforms will be pushed to it |
| [objectMode] | <code>boolean</code> | <code>true</code> | should the object mode be used instead of creating a new stream) |
| [highWaterMark] | <code>number</code> |  | The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource. Default: 16384 (16KB), or 16 for objectMode streams. |
| [encoding] | <code>string</code> |  | If specified, then buffers will be decoded to strings using the specified encoding. Default: null. |
| [emitClose] | <code>boolean</code> |  | Whether or not the stream should emit 'close' after it has been destroyed. Default: true. |
| [read] | <code>function</code> |  | Implementation for the stream._read() method. |
| [destroy] | <code>function</code> |  | Implementation for the stream._destroy() method. |
| [construct] | <code>function</code> |  | Implementation for the stream._construct() method. |
| [autoDestroy] | <code>boolean</code> |  | Whether this stream should automatically call .destroy() on itself after ending. Default: true. |

<a name="module_scramjet..ShiftCallback"></a>

## ~ShiftCallback : function
Shift Function

**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Array.&lt;object&gt;</code> \| <code>any</code> | an array of shifted chunks |

<a name="module_scramjet..AccumulateCallback"></a>

## ~AccumulateCallback : Promise.<any> | *
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_scramjet..ConsumeCallback"></a>

## ~ConsumeCallback : Promise.<any> | *
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_scramjet..RemapCallback"></a>

## ~RemapCallback : Promise.<any> | *
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_scramjet..FlatMapCallback"></a>

## ~FlatMapCallback : AsyncGenerator.<any, void, any> | Promise.<Iterable.<any>> | Iterable.<any>
**Kind**: inner typedef  
**Returns**: <code>AsyncGenerator.&lt;any, void, any&gt;</code> \| <code>Promise.&lt;Iterable.&lt;any&gt;&gt;</code> \| <code>Iterable.&lt;any&gt;</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_scramjet..JoinCallback"></a>

## ~JoinCallback : Promise.<*> | *
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;\*&gt;</code> \| <code>\*</code> - promise that is resolved with the joining item  

| Param | Type | Description |
| --- | --- | --- |
| previous | <code>\*</code> | the chunk before |
| next | <code>\*</code> | the chunk after |

<a name="module_scramjet..AffinityCallback"></a>

## ~AffinityCallback : Symbol | string
**Kind**: inner typedef  

| Param | Type |
| --- | --- |
| chunk | <code>\*</code> | 

<a name="module_scramjet..DelegateCallback"></a>

## ~DelegateCallback : function
**Kind**: inner typedef  
<a name="module_scramjet..RateOptions"></a>

## ~RateOptions : object
**Kind**: inner typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timeFrame] | <code>number</code> | <code>1000</code> | The size of the window to look for streams. |
| [getTime] | <code>function</code> | <code>Date.now</code> | Time source - anything that returns time. |
| [setTimeout] | <code>function</code> | <code>setTimeout</code> | Timing function that works identically to setTimeout. |

<a name="module_scramjet..ExecDataOptions"></a>

## ~ExecDataOptions : object
**Kind**: inner typedef  
**Extends**: <code>StringStream.ExecOptions</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [parse] | [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) | scramjet module to transform the stream to string or buffer stream |
| [stringify] | [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) | scramjet module to transform from string or buffer stream to wanted version |

<a name="module_scramjet..CreateModuleOptions"></a>

## ~CreateModuleOptions : object
Options for createModule

**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| StreamClass | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | defines what class should the module assume |

<a name="module_scramjet..StreamMixin"></a>

## ~StreamMixin : object
Definition of a single mixin for a specific Scramjet class. Should contain any number of stream methods.

**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |

<a name="module_scramjet..ScramjetPlugin"></a>

## ~ScramjetPlugin : object
Definition of a plugin in Scramjet

**Kind**: inner typedef  
**Internal**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | [<code>StreamMixin</code>](definitions.md#module_scramjet..StreamMixin) | definition of constructor and properties for the BufferStream prototype. |
| DataStream | [<code>StreamMixin</code>](definitions.md#module_scramjet..StreamMixin) | definition of constructor and properties for the DataStream prototype. |
| MultiStream | [<code>StreamMixin</code>](definitions.md#module_scramjet..StreamMixin) | definition of constructor and properties for the MultiStream prototype. |
| StringStream | [<code>StreamMixin</code>](definitions.md#module_scramjet..StreamMixin) | definition of constructor and properties for the StringStream prototype. |

<a name="module_scramjet..MultiMapCallback"></a>

## ~MultiMapCallback : DataStream ⇄
**Kind**: inner typedef  

| Param | Type |
| --- | --- |
| stream | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | 

<a name="module_scramjet..DistributeOptions"></a>

## ~DistributeOptions : object
Distribute options

**Kind**: inner typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [plugins] | <code>Array</code> | <code>[]</code> | a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself) |
| [StreamClass] | <code>string</code> | <code>&quot;DataStream&quot;</code> | the class to deserialize the stream to. |
| [threads] | <code>number</code> | <code>os.cpus().length * 2</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |
| [createOptions] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |
| [StreamWorker] | [<code>StreamWorker</code>](stream-worker.md#module_scramjet.StreamWorker) | <code>scramjet.StreamWorker</code> | worker implementation. |

<a name="module_scramjet..ValueOfCallback"></a>

## ~ValueOfCallback : Promise.<number> | number
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;number&gt;</code> \| <code>number</code> - value of the object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | stream object |

<a name="module_scramjet..NumberStreamOptions"></a>

## ~NumberStreamOptions : object
NumberStream options

**Kind**: inner typedef  
**Extends**: [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [valueOf] | [<code>ValueOfCallback</code>](definitions.md#module_scramjet..ValueOfCallback) | <code>x &#x3D;&gt; +x</code> | value of the data item function. |

<a name="module_scramjet..ShiftStringCallback"></a>

## ~ShiftStringCallback : function
**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>string</code> \| <code>any</code> | Shifted chars |

<a name="module_scramjet..ParseCallback"></a>

## ~ParseCallback : Promise.<any> | any
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;any&gt;</code> \| <code>any</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>string</code> | the transformed chunk |

<a name="module_scramjet..ExecOptions"></a>

## ~ExecOptions : object
**Kind**: inner typedef  
**Extends**: <code>child\_process.SpawnOptions</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [stream] | <code>number</code> | <code>1</code> | (bitwise) the output stdio number to push out (defaults to stdout = 1) |
| [interpreter] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | defaults to nothing, except on windows where "cmd.exe /c" will be spawned by default |

