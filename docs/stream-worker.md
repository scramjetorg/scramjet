![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="StreamWorker"></a>

## StreamWorker
StreamWorker class - intended for internal use

This class provides control over the subprocesses, including:
 - spawning
 - communicating
 - delivering streams

**Kind**: global class  
**Internal**:   

* [StreamWorker](#StreamWorker)
    * [new StreamWorker()](#new_StreamWorker_new)
    * [streamWorker.spawn()](#StreamWorker+spawn) ⇄ [<code>StreamWorker</code>](#StreamWorker)
    * [streamWorker.delegate(input, delegateFunc, [plugins])](#StreamWorker+delegate)  <code>DataStream</code>
    * [StreamWorker:fork([count])](#StreamWorker.fork) ⇄ [<code>Array.&lt;StreamWorker&gt;</code>](#StreamWorker)
    * [StreamWorker:_getWorker()](#StreamWorker._getWorker) ⇄ [<code>StreamWorker</code>](#StreamWorker)

<a name="new_StreamWorker_new"></a>

### new StreamWorker()
Private constructor

<a name="StreamWorker+spawn"></a>

### streamWorker.spawn() : StreamWorker ⇄
Spawns the worker if necessary and provides the port information to it.

**Kind**: instance method of [<code>StreamWorker</code>](#StreamWorker)  
<a name="StreamWorker+delegate"></a>

### streamWorker.delegate(input, delegateFunc, [plugins]) : DataStream
Delegates a stream to the child using tcp socket.

The stream gets serialized using JSON and passed on to the sub-process.
The sub-process then performs transforms on the stream and pushes them back to the main process.
The stream gets deserialized and outputted to the returned DataStream.

**Kind**: instance method of [<code>StreamWorker</code>](#StreamWorker)  
**Returns**: <code>DataStream</code> - stream after transforms and back to the main process.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>DataStream</code> |  | stream to be delegated |
| delegateFunc | <code>Array.&lt;DataStream~TeeCallback&gt;</code> \| <code>Array</code> |  | Array of transforms or arrays describing ['module', 'method'] |
| [plugins] | <code>Array</code> | <code>[]</code> | List of plugins to load in the child |

<a name="StreamWorker.fork"></a>

### StreamWorker:fork([count]) : Array.<StreamWorker> ⇄
Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.

**Kind**: static method of [<code>StreamWorker</code>](#StreamWorker)  
**Returns**: [<code>Array.&lt;StreamWorker&gt;</code>](#StreamWorker) - list of StreamWorkers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>Number</code> | <code>os.cpus().length</code> | Number of processes to spawn. If other subprocesses are active only the missing ones will be spawned. |

<a name="StreamWorker._getWorker"></a>

### StreamWorker:_getWorker() : StreamWorker ⇄
Picks next worker (not necessarily free one!)

**Kind**: static method of [<code>StreamWorker</code>](#StreamWorker)  
