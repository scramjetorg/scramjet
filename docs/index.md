<a name="scramjet"></a>

## scramjet : <code>Object</code>
Exports

**Kind**: global variable  
<a name="StreamMixin"></a>

## StreamMixin : <code>Object</code>
Definition of a single mixin for a specific Scramjet class

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| constructor | <code>function</code> | optional constructor that will be called in the stream constructor (this has to be an own property!) |
| * | <code>function</code> | any name given will be mixed in to the scramjet stream (except for constructor) |

<a name="ScramjetPlugin"></a>

## ScramjetPlugin : <code>Object</code>
Definition of a plugin in Scramjet

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BufferStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the BufferStream prototype. |
| DataStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the DataStream prototype. |
| MultiStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the MultiStream prototype. |
| StringStream | [<code>StreamMixin</code>](#StreamMixin) | definition of constructor and properties for the StringStream prototype. |

