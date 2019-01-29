![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="StringStream"></a>

## StringStream : DataStream
A stream of string objects for further transformation on top of DataStream.

Example:

```javascript
StringStream.fromString()
```

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [StringStream](#StringStream)  <code>DataStream</code>
    * [new StringStream(encoding)](#new_StringStream_new)
    * [stringStream.shift(bytes, func)](#StringStream+shift) ↺
    * [stringStream.split(splitter)](#StringStream+split) ↺
    * [stringStream.match(matcher)](#StringStream+match) ↺
    * [stringStream.toBufferStream()](#StringStream+toBufferStream) ↺ <code>BufferStream</code>
    * [stringStream.parse(parser)](#StringStream+parse) ↺ <code>DataStream</code>
    * [stringStream.toDataStream()](#StringStream+toDataStream)
    * [stringStream.lines([eol])](#StringStream+lines) ↺
    * [stringStream.JSONParse(perLine)](#StringStream+JSONParse) ↺ <code>DataStream</code>
    * [stringStream.CSVParse(options)](#StringStream+CSVParse) ↺ <code>DataStream</code>
    * [stringStream.append(param)](#StringStream+append) ↺
    * [stringStream.prepend(param)](#StringStream+prepend) ↺
    * [stringStream.exec(command, options, args)](#StringStream+exec)
    * [stringStream.pop(bytes, func)](#StringStream+pop) ↺
    * [StringStream:SPLIT_LINE](#StringStream.SPLIT_LINE)
    * [StringStream:fromString(stream, encoding)](#StringStream.fromString)  [<code>StringStream</code>](#StringStream)
    * [StringStream:pipeline(readable, transforms)](#StringStream.pipeline)  [<code>StringStream</code>](#StringStream)
    * [StringStream:from(source, options)](#StringStream.from)  [<code>StringStream</code>](#StringStream)
    * [StringStream:ShiftCallback](#StringStream.ShiftCallback)  <code>function</code>
    * [StringStream:ParseCallback](#StringStream.ParseCallback)  <code>Promise</code>
    * [StringStream:ExecOptions](#StringStream.ExecOptions)  <code>child\_process.SpawnOptions</code>

<a name="new_StringStream_new"></a>

### new StringStream(encoding)
Constructs the stream with the given encoding


| Param | Type | Description |
| --- | --- | --- |
| encoding | <code>String</code> | the encoding to use |

<a name="StringStream+shift"></a>

### stringStream.shift(bytes, func) ↺
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | <code>ShiftCallback</code> | Function that receives a string of shifted chars. |

<a name="StringStream+split"></a>

### stringStream.split(splitter) ↺
Splits the string stream by the specified RegExp or string

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-split.js  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> \| <code>String</code> | What to split by |

<a name="StringStream+match"></a>

### stringStream.match(matcher) ↺
Finds matches in the string stream and streams the match results

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-match.js  

| Param | Type | Description |
| --- | --- | --- |
| matcher | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

<a name="StringStream+toBufferStream"></a>

### stringStream.toBufferStream() : BufferStream ↺
Transforms the StringStream to BufferStream

Creates a buffer stream from the given string stream. Still it returns a
DataStream derivative and isn't the typical node.js stream so you can do
all your transforms when you like.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>BufferStream</code> - The converted stream.  
**Meta.noreadme**:   
**Test**: test/methods/string-stream-tobufferstream.js  
<a name="StringStream+parse"></a>

### stringStream.parse(parser) : DataStream ↺
Parses every string to object

The method MUST parse EVERY string into a single object, so the string
stream here should already be split.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - The parsed objects stream.  
**Test**: test/methods/string-stream-parse.js  

| Param | Type | Description |
| --- | --- | --- |
| parser | <code>ParseCallback</code> | The transform function |

<a name="StringStream+toDataStream"></a>

### stringStream.toDataStream()
Alias for [parse](#StringStream+parse)

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
<a name="StringStream+lines"></a>

### stringStream.lines([eol]) ↺
Splits the string stream by the specified regexp or string

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-split.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eol] | <code>String</code> | <code>/\r?\n/</code> | End of line string |

<a name="StringStream+JSONParse"></a>

### stringStream.JSONParse(perLine) : DataStream ↺
Parses each entry as JSON.
Ignores empty lines

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - stream of parsed items  

| Param | Type | Description |
| --- | --- | --- |
| perLine | <code>Boolean</code> | instructs to split per line |

<a name="StringStream+CSVParse"></a>

### stringStream.CSVParse(options) : DataStream ↺
Parses CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Returns**: <code>DataStream</code> - stream of parsed items  
**Test**: test/methods/data-stream-separate.js  

| Param | Description |
| --- | --- |
| options | options for the papaparse.parse method. |

<a name="StringStream+append"></a>

### stringStream.append(param) ↺
Appends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-append.js  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>function</code> \| <code>String</code> | the argument to append. If function passed then it will be called and resolved and the resolution will be appended. |

<a name="StringStream+prepend"></a>

### stringStream.prepend(param) ↺
Prepends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-prepend.js  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>function</code> \| <code>String</code> | the argument to prepend. If function passed then it will be called and resolved                              and the resolution will be prepended. |

<a name="StringStream+exec"></a>

### stringStream.exec(command, options, args)
Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.

Pipes the current stream into the sub-processes stdin.
The data is serialized and deserialized as JSON lines by default. You
can provide your own alternative methods in the ExecOptions object.

Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Test**: test/methods/string-stream-exec.js  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | command to execute |
| options | <code>ExecOptions</code> | options to be passed to `spawn` and defining serialization. |
| args | <code>String</code> | additional arguments (will overwrite to SpawnOptions args even if not given) |

<a name="StringStream+pop"></a>

### stringStream.pop(bytes, func) ↺
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Number</code> | The number of characters to shift. |
| func | <code>ShiftCallback</code> | Function that receives a string of shifted chars. |

<a name="StringStream.SPLIT_LINE"></a>

### StringStream:SPLIT_LINE
A handy split by line regex to quickly get a line-by-line stream

**Kind**: static property of [<code>StringStream</code>](#StringStream)  
<a name="StringStream.fromString"></a>

### StringStream:fromString(stream, encoding) : StringStream
Creates a StringStream and writes a specific string.

**Kind**: static method of [<code>StringStream</code>](#StringStream)  
**Returns**: [<code>StringStream</code>](#StringStream) - new StringStream.  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>String</code> | the string to push the your stream |
| encoding | <code>String</code> | optional encoding |

<a name="StringStream.pipeline"></a>

### StringStream:pipeline(readable, transforms) : StringStream
Creates a pipeline of streams and returns a scramjet stream.

**Kind**: static method of [<code>StringStream</code>](#StringStream)  
**Returns**: [<code>StringStream</code>](#StringStream) - a new StringStream instance of the resulting pipeline  
**See**: DataStream.pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>String</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| transforms | <code>AsyncFunction</code> \| <code>function</code> \| <code>Transform</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="StringStream.from"></a>

### StringStream:from(source, options) : StringStream
Create StringStream from anything.

**Kind**: static method of [<code>StringStream</code>](#StringStream)  
**Returns**: [<code>StringStream</code>](#StringStream) - new StringStream.  
**See**

- DataStream.from
- module:scramjet.from


| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> \| <code>Array</code> \| <code>Iterable</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>Readable</code> | argument to be turned into new stream |
| options | <code>StreamOptions</code> \| <code>Writable</code> |  |

<a name="StringStream.ShiftCallback"></a>

### StringStream:ShiftCallback : function
**Kind**: static typedef of [<code>StringStream</code>](#StringStream)  

| Param | Type | Description |
| --- | --- | --- |
| shifted | <code>String</code> | Popped chars |

<a name="StringStream.ParseCallback"></a>

### StringStream:ParseCallback : Promise
**Kind**: static typedef of [<code>StringStream</code>](#StringStream)  
**Returns**: <code>Promise</code> - the promise should be resolved with the parsed object  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>String</code> | the transformed chunk |

<a name="StringStream.ExecOptions"></a>

### StringStream:ExecOptions : child_process.SpawnOptions
**Kind**: static typedef of [<code>StringStream</code>](#StringStream)  
**Extends**: <code>child\_process.SpawnOptions</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [stream] | <code>number</code> | <code>1</code> | (bitwise) the output stdio number to push out (defaults to stdout = 1) |
| [interpreter] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | defaults to nothing, except on windows where "cmd.exe /c" will be spawned by default |

