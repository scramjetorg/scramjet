![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.StreamWorker"></a>

## :StreamWorker
StreamWorker class - intended for internal use

This class provides control over the subprocesses, including:
 - spawning
 - communicating
 - delivering streams

**Kind**: static class  
**Internal**:   

* [:StreamWorker](#module_scramjet.StreamWorker)
    * [new StreamWorker()](#new_module_scramjet.StreamWorker_new)
    * [streamWorker.spawn()](#module_scramjet.StreamWorker+spawn) ⇄ [<code>StreamWorker</code>](stream-worker.md#module_scramjet.StreamWorker)
    * [streamWorker.delegate(input, delegateFunc, [plugins])](#module_scramjet.StreamWorker+delegate)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [StreamWorker:fork([count])](#module_scramjet.StreamWorker.fork) ⇄ <code>Array.&lt;StreamWorker&gt;</code>
    * [StreamWorker:_getWorker()](#module_scramjet.StreamWorker._getWorker) ⇄ [<code>StreamWorker</code>](stream-worker.md#module_scramjet.StreamWorker)

<a name="new_module_scramjet.StreamWorker_new"></a>

### new StreamWorker()
Private constructor

<a name="module_scramjet.StreamWorker+spawn"></a>

### streamWorker.spawn() : StreamWorker ⇄
Spawns the worker if necessary and provides the port information to it.

**Kind**: instance method of [<code>StreamWorker</code>](#module_scramjet.StreamWorker)  
<a name="module_scramjet.StreamWorker+delegate"></a>

### streamWorker.delegate(input, delegateFunc, [plugins]) : DataStream
Delegates a stream to the child using tcp socket.

The stream gets serialized using JSON and passed on to the sub-process.
The sub-process then performs transforms on the stream and pushes them back to the main process.
The stream gets deserialized and outputted to the returned DataStream.

**Kind**: instance method of [<code>StreamWorker</code>](#module_scramjet.StreamWorker)  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - stream after transforms and back to the main process.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) |  | stream to be delegated |
| delegateFunc | <code>Array.&lt;TeeCallback&gt;</code> \| <code>Array</code> |  | Array of transforms or arrays describing ['module', 'method'] |
| [plugins] | <code>Array.&lt;any&gt;</code> | <code>[]</code> | List of plugins to load in the child |

<a name="module_scramjet.StreamWorker.fork"></a>

### StreamWorker:fork([count]) : Array.<StreamWorker> ⇄
Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.

**Kind**: static method of [<code>StreamWorker</code>](#module_scramjet.StreamWorker)  
**Returns**: <code>Array.&lt;StreamWorker&gt;</code> - list of StreamWorkers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>number</code> | <code>os.cpus().length</code> | Number of processes to spawn. If other subprocesses are active only the missing ones will be spawned. |

<a name="module_scramjet.StreamWorker._getWorker"></a>

### StreamWorker:_getWorker() : StreamWorker ⇄
Picks next worker (not necessarily free one!)

**Kind**: static method of [<code>StreamWorker</code>](#module_scramjet.StreamWorker)  
