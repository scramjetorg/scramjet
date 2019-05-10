![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet..ShiftBufferCallback"></a>

## ~ShiftBufferCallback : function
Shift Function

**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Buffer</code> | shifted bytes |

<a name="module_scramjet..ParseCallback"></a>

## ~ParseCallback : Promise
**Kind**: inner typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> | the transformed chunk |

<a name="module_scramjet..MapCallback"></a>

## ~MapCallback : Promise | *
**Kind**: inner typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - the mapped object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be mapped |

<a name="module_scramjet..FilterCallback"></a>

## ~FilterCallback : Promise.<Boolean> | Boolean
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> \| <code>Boolean</code> - information if the object should remain in the filtered stream.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the chunk to be filtered or not |

<a name="module_scramjet..ReduceCallback"></a>

## ~ReduceCallback : Promise | *
**Kind**: inner typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - accumulator for the next pass  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>\*</code> | the accumulator - the object initially passed or returned                by the previous reduce operation |
| chunk | <code>Object</code> | the stream chunk. |

<a name="module_scramjet..DoCallback"></a>

## ~DoCallback : function ⇄
**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Object</code> | source stream chunk |

<a name="module_scramjet..IntoCallback"></a>

## ~IntoCallback : * ⇄
**Kind**: inner typedef  
**Returns**: <code>\*</code> - resolution for the old stream (for flow control only)  

| Param | Type | Description |
| --- | --- | --- |
| into | <code>\*</code> | stream passed to the into method |
| chunk | <code>Object</code> | source stream chunk |

<a name="module_scramjet..UseCallback"></a>

## ~UseCallback : DataStream ⇄
**Kind**: inner typedef  

| Param | Type |
| --- | --- |
| stream | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | 
| ...parameters | <code>any</code> | 

<a name="module_scramjet..TeeCallback"></a>

## ~TeeCallback : function
**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| teed | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | The teed stream |

<a name="module_scramjet..ScramjetTransformCallback"></a>

## ~ScramjetTransformCallback : * | undefined
Transform async callback. The passed transform should return a new chunk, unless
the output should be filtered - if so, the transform should return `undefined`.

Additionally the function can reject with `DataStream.filter` - the result will be
filtered and no other transforms will be run on the chunk.

**Kind**: inner typedef  
**Returns**: <code>\*</code> \| <code>undefined</code> - the result, undefined will be treated as filtered out.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>String</code> \| <code>\*</code> | the stream chunk |
| encoding | <code>String</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetWriteCallback"></a>

## ~ScramjetWriteCallback : function
Write async callback. Await your async write and resolve.

**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>String</code> \| <code>\*</code> | the stream chunk |
| encoding | <code>String</code> | encoding of the chunk |

<a name="module_scramjet..ScramjetReadCallback"></a>

## ~ScramjetReadCallback : Array.<*>
Read async callback. Simply await your async operations and return the result as array.

**Kind**: inner typedef  
**Returns**: <code>Array.&lt;\*&gt;</code> - the read chunk.  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | the number of chunks that should be read ("this is more like a set of guideline than actual rules"). |

<a name="module_scramjet..DataStreamOptions"></a>

## ~DataStreamOptions : Object
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
| [maxParallel] | <code>Number</code> | <code>os.cpus.length*2</code> | the number of transforms done in parallel |
| [referrer] | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | <code></code> | a referring stream to point to (if possible the transforms will be pushed to it |
| [objectMode] | <code>boolean</code> | <code>true</code> | should the object mode be used                                 instead of creating a new stream) |

<a name="module_scramjet..ShiftCallback"></a>

## ~ShiftCallback : function
Shift Function

**Kind**: inner typedef  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>Array.&lt;Object&gt;</code> | an array of shifted chunks |

<a name="module_scramjet..AccumulateCallback"></a>

## ~AccumulateCallback : Promise | *
**Kind**: inner typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| accumulator | <code>\*</code> | Accumulator passed to accumulate function |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_scramjet..ConsumeCallback"></a>

## ~ConsumeCallback : Promise | *
**Kind**: inner typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - resolved when all operations are completed  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | the stream chunk |

<a name="module_scramjet..RemapCallback"></a>

## ~RemapCallback : Promise | *
**Kind**: inner typedef  
**Returns**: <code>Promise</code> \| <code>\*</code> - promise to be resolved when chunk has been processed  

| Param | Type | Description |
| --- | --- | --- |
| emit | <code>function</code> | a method to emit objects in the remapped stream |
| chunk | <code>\*</code> | the chunk from the original stream |

<a name="module_scramjet..FlatMapCallback"></a>

## ~FlatMapCallback : Promise.<Iterable> | Iterable
**Kind**: inner typedef  
**Returns**: <code>Promise.&lt;Iterable&gt;</code> \| <code>Iterable</code> - promise to be resolved when chunk has been processed  

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

## ~AffinityCallback : Symbol | String
**Kind**: inner typedef  

| Param | Type |
| --- | --- |
| chunk | <code>\*</code> | 

<a name="module_scramjet..RateOptions"></a>

## ~RateOptions
**Kind**: inner typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timeFrame] | <code>Number</code> | <code>1000</code> | The size of the window to look for streams. |
| [getTime] | <code>function</code> | <code>Date.now</code> | Time source - anything that returns time. |
| [setTimeout] | <code>function</code> | <code>setTimeout</code> | Timing function that works identically to setTimeout. |

<a name="module_scramjet..ExecDataOptions"></a>

## ~ExecDataOptions : StringStream.ExecOptions
**Kind**: inner typedef  
**Extends**: <code>StringStream.ExecOptions</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [parse] | [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) | scramjet module to transform the stream to string or buffer stream |
| [stringify] | [<code>UseCallback</code>](definitions.md#module_scramjet..UseCallback) | scramjet module to transform from string or buffer stream to wanted version |

<a name="module_scramjet..CreateModuleOptions"></a>

## ~CreateModuleOptions
Options for createModule

**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| StreamClass | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) | defines what class should the module assume |

<a name="module_scramjet..ScramjetErrors"></a>

## ~ScramjetErrors
**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| StreamError | <code>function</code> | stream error class |

<a name="module_scramjet..StreamMixin"></a>

## ~StreamMixin : Object
Definition of a single mixin for a specific Scramjet class. Should contain any number of stream methods.

**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |

<a name="module_scramjet..ScramjetPlugin"></a>

## ~ScramjetPlugin : Object
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

## ~DistributeOptions
Distribute options

**Kind**: inner typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [plugins] | <code>Array</code> | <code>[]</code> | a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself) |
| [StreamClass] | <code>String</code> | <code>DataStream</code> | the class to deserialize the stream to. |
| [threads] | <code>Number</code> | <code>os.cpus().length * 2</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |
| [createOptions] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code. |

<a name="module_scramjet..ValueOfCallback"></a>

## ~ValueOfCallback : Number
**Kind**: inner typedef  
**Returns**: <code>Number</code> - value of the object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>\*</code> | stream object |

<a name="module_scramjet..NumberStreamOptions"></a>

## ~NumberStreamOptions : DataStreamOptions
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
| shifted | <code>String</code> | Popped chars |

<a name="module_scramjet..ParseCallback"></a>

## ~ParseCallback : Promise
**Kind**: inner typedef  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

<a name="module_scramjet..ExecOptions"></a>

## ~ExecOptions : child_process.SpawnOptions
**Kind**: inner typedef  
**Extends**: <code>child\_process.SpawnOptions</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [stream] | <code>number</code> | <code>1</code> | (bitwise) the output stdio number to push out (defaults to stdout = 1) |
| [interpreter] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | defaults to nothing, except on windows where "cmd.exe /c" will be spawned by default |

