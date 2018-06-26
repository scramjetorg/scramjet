![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * [~StreamWorker](#module_ScramjetCore..StreamWorker)
        * [new StreamWorker()](#new_module_ScramjetCore..StreamWorker_new)
        * [streamWorker.spawn()](#module_ScramjetCore..StreamWorker+spawn) ⇄ <code>StreamWorker</code>
        * [streamWorker.delegate(input, delegateFunc, [plugins])](#module_ScramjetCore..StreamWorker+delegate)  <code>DataStream</code>
        * [StreamWorker:fork([count])](#module_ScramjetCore..StreamWorker.fork) ⇄ <code>Array.&lt;StreamWorker&gt;</code>
        * [StreamWorker:_getWorker()](#module_ScramjetCore..StreamWorker._getWorker) ⇄ <code>StreamWorker</code>

<a name="module_ScramjetCore..StreamWorker"></a>

### ScramjetCore~StreamWorker
StreamWorker class - intended for internal use

This class provides control over the subprocesses, incl:
 - spawning
 - communicating
 - delivering streams

**Kind**: inner class of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Internal**:   

* [~StreamWorker](#module_ScramjetCore..StreamWorker)
    * [new StreamWorker()](#new_module_ScramjetCore..StreamWorker_new)
    * [streamWorker.spawn()](#module_ScramjetCore..StreamWorker+spawn) ⇄ <code>StreamWorker</code>
    * [streamWorker.delegate(input, delegateFunc, [plugins])](#module_ScramjetCore..StreamWorker+delegate)  <code>DataStream</code>
    * [StreamWorker:fork([count])](#module_ScramjetCore..StreamWorker.fork) ⇄ <code>Array.&lt;StreamWorker&gt;</code>
    * [StreamWorker:_getWorker()](#module_ScramjetCore..StreamWorker._getWorker) ⇄ <code>StreamWorker</code>

<a name="new_module_ScramjetCore..StreamWorker_new"></a>

#### new StreamWorker()
Private constructor

<a name="module_ScramjetCore..StreamWorker+spawn"></a>

#### streamWorker.spawn() : StreamWorker ⇄
Spawns the worker if necessary and provides the port information to it.

**Kind**: instance method of [<code>StreamWorker</code>](#module_ScramjetCore..StreamWorker)  
<a name="module_ScramjetCore..StreamWorker+delegate"></a>

#### streamWorker.delegate(input, delegateFunc, [plugins]) : DataStream
Delegates a stream to the child using tcp socket.

The stream gets serialized using JSON and passed on to the subprocess.
The subprocess then peforms transforms on the stream and pushes them back to the main process.
The stream gets deserialized and outputted to the returned DataStream.

**Kind**: instance method of [<code>StreamWorker</code>](#module_ScramjetCore..StreamWorker)  
**Returns**: <code>DataStream</code> - stream after transforms and back to the main process.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>DataStream</code> |  | stream to be delegated |
| delegateFunc | <code>Array.&lt;DataStream~TeeCallback&gt;</code> \| <code>Array</code> |  | Array of transforms or arrays describing ['module', 'method'] |
| [plugins] | <code>Array</code> | <code>[]</code> | List of plugins to load in the child |

<a name="module_ScramjetCore..StreamWorker.fork"></a>

#### StreamWorker:fork([count]) : Array.<StreamWorker> ⇄
Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.

**Kind**: static method of [<code>StreamWorker</code>](#module_ScramjetCore..StreamWorker)  
**Returns**: <code>Array.&lt;StreamWorker&gt;</code> - list of StreamWorkers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>Number</code> | <code>os.cpus().length</code> | Number of processes to spawn. If other subprocesses are active only the missing ones will be spawned. |

<a name="module_ScramjetCore..StreamWorker._getWorker"></a>

#### StreamWorker:_getWorker() : StreamWorker ⇄
Picks next worker (not necessarly free one!)

**Kind**: static method of [<code>StreamWorker</code>](#module_ScramjetCore..StreamWorker)  
