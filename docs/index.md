<a name="module_ScramjetCore"></a>

## ScramjetCore

* [ScramjetCore](#module_ScramjetCore)
    * _static_
        * [.BufferStream](#module_ScramjetCore.BufferStream)
        * [.DataStream](#module_ScramjetCore.DataStream)
        * [.MultiStream](#module_ScramjetCore.MultiStream)
        * [.StringStream](#module_ScramjetCore.StringStream)
        * [.PromiseTransformStream](#module_ScramjetCore.PromiseTransformStream)
        * [.module.exports](#module_ScramjetCore.module.exports) ⇒ <code>StreamWorker</code>
        * [.plugin(mixin)](#module_ScramjetCore.plugin) ↩︎
        * [.API(version)](#module_ScramjetCore.API)
    * _inner_
        * [~scramjet](#module_ScramjetCore..scramjet) : <code>Object</code>
        * [~StreamMixin](#module_ScramjetCore..StreamMixin) : <code>Object</code>
        * [~ScramjetPlugin](#module_ScramjetCore..ScramjetPlugin) : <code>Object</code>

<a name="module_ScramjetCore.BufferStream"></a>

### ScramjetCore.BufferStream
Provides a lazy-load accessor to BufferStream

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore.DataStream"></a>

### ScramjetCore.DataStream
Provides a lazy-load accessor to DataStream

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore.MultiStream"></a>

### ScramjetCore.MultiStream
Provides a lazy-load accessor to MultiStream

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore.StringStream"></a>

### ScramjetCore.StringStream
Provides a lazy-load accessor to StringStream

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore.PromiseTransformStream"></a>

### ScramjetCore.PromiseTransformStream
Provides a lazy-load accessor to PromiseTransformStream

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore.module.exports"></a>

### ScramjetCore.module.exports ⇒ <code>StreamWorker</code>
A Stream Worker class

**Kind**: static property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Returns**: <code>StreamWorker</code> - the resulting stream  
<a name="module_ScramjetCore.plugin"></a>

### ScramjetCore.plugin(mixin) ↩︎
Add a global plugin to scramjet - injects mixins into prototypes.

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| mixin | <code>ScramjetPlugin</code> | the plugin object |

**Example**  
```js
[../samples/scramjet-plugin.js](../samples/scramjet-plugin.js)
```
<a name="module_ScramjetCore.API"></a>

### ScramjetCore.API(version)
Gets an API version (this may be important for future use)

**Kind**: static method of [<code>ScramjetCore</code>](#module_ScramjetCore)  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>Number</code> | The required version (currently only: 1) |

<a name="module_ScramjetCore..scramjet"></a>

### ScramjetCore~scramjet : <code>Object</code>
Exports

**Kind**: inner property of [<code>ScramjetCore</code>](#module_ScramjetCore)  
<a name="module_ScramjetCore..StreamMixin"></a>

### ScramjetCore~StreamMixin : <code>Object</code>
Definition of a single mixin for a specific Scramjet class

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |
| * | <code>function</code> | any name given will be mixed in to the scramjet stream (except for constructor) |

<a name="module_ScramjetCore..ScramjetPlugin"></a>

### ScramjetCore~ScramjetPlugin : <code>Object</code>
Definition of a plugin in Scramjet

**Kind**: inner typedef of [<code>ScramjetCore</code>](#module_ScramjetCore)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | <code>StreamMixin</code> | definition of constructor and properties for the BufferStream prototype. |
| DataStream | <code>StreamMixin</code> | definition of constructor and properties for the DataStream prototype. |
| MultiStream | <code>StreamMixin</code> | definition of constructor and properties for the MultiStream prototype. |
| StringStream | <code>StreamMixin</code> | definition of constructor and properties for the StringStream prototype. |

