![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.StringStream"></a>

## :StringStream : DataStream
A stream of string objects for further transformation on top of DataStream.

Example:

```js
StringStream.from(async () => (await fetch('https://example.com/data/article.txt')).text())
    .lines()
    .append("\r\n")
    .pipe(fs.createWriteStream('./path/to/file.txt'))
```

**Kind**: static class  
**Extends**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)  
**Scope**: public  

* [:StringStream](#module_scramjet.StringStream)  [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [new StringStream([encoding], [options])](#new_module_scramjet.StringStream_new)
    * [stringStream.shift(bytes, func)](#module_scramjet.StringStream+shift) ↺
    * [stringStream.split(splitter)](#module_scramjet.StringStream+split) ↺
    * [stringStream.match(matcher)](#module_scramjet.StringStream+match) ↺
    * [stringStream.toBufferStream()](#module_scramjet.StringStream+toBufferStream) ↺ [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream)
    * [stringStream.parse(parser, [StreamClass])](#module_scramjet.StringStream+parse) ↺ [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [stringStream.toDataStream()](#module_scramjet.StringStream+toDataStream)
    * [stringStream.lines([eol])](#module_scramjet.StringStream+lines) ↺
    * [stringStream.JSONParse([perLine])](#module_scramjet.StringStream+JSONParse) ↺ [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [stringStream.CSVParse([options])](#module_scramjet.StringStream+CSVParse) ↺ [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream)
    * [stringStream.append(param)](#module_scramjet.StringStream+append) ↺
    * [stringStream.prepend(param)](#module_scramjet.StringStream+prepend) ↺
    * [stringStream.exec(command, [options])](#module_scramjet.StringStream+exec)
    * [StringStream:SPLIT_LINE](#module_scramjet.StringStream.SPLIT_LINE)
    * [StringStream:fromString(stream, encoding)](#module_scramjet.StringStream.fromString)  [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [StringStream:pipeline(readable, transforms)](#module_scramjet.StringStream.pipeline)  [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)
    * [StringStream:from(source, [options])](#module_scramjet.StringStream.from)  [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream)

<a name="new_module_scramjet.StringStream_new"></a>

### new StringStream([encoding], [options])
Constructs the stream with the given encoding

**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - the created data stream  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [encoding] | <code>string</code> | <code>&quot;\&quot;utf-8\&quot;&quot;</code> | the encoding to use |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) | <code>{}</code> | the encoding to use |

<a name="module_scramjet.StringStream+shift"></a>

### stringStream.shift(bytes, func) ↺
Shifts given length of chars from the original stream

Works the same way as {@see DataStream.shift}, but in this case extracts
the given number of characters.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-shift.js  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>number</code> | The number of characters to shift. |
| func | [<code>ShiftStringCallback</code>](definitions.md#module_scramjet..ShiftStringCallback) | Function that receives a string of shifted chars. |

<a name="module_scramjet.StringStream+split"></a>

### stringStream.split(splitter) ↺
Splits the string stream by the specified RegExp or string

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-split.js  

| Param | Type | Description |
| --- | --- | --- |
| splitter | <code>RegExp</code> \| <code>string</code> | What to split by |

<a name="module_scramjet.StringStream+match"></a>

### stringStream.match(matcher) ↺
Finds matches in the string stream and streams the match results

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-match.js  

| Param | Type | Description |
| --- | --- | --- |
| matcher | <code>RegExp</code> | A function that will be called for every                             stream chunk. |

<a name="module_scramjet.StringStream+toBufferStream"></a>

### stringStream.toBufferStream() : BufferStream ↺
Transforms the StringStream to BufferStream

Creates a buffer stream from the given string stream. Still it returns a
DataStream derivative and isn't the typical node.js stream so you can do
all your transforms when you like.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Returns**: [<code>BufferStream</code>](buffer-stream.md#module_scramjet.BufferStream) - The converted stream.  
**Meta.noreadme**:   
**Test**: test/methods/string-stream-tobufferstream.js  
<a name="module_scramjet.StringStream+parse"></a>

### stringStream.parse(parser, [StreamClass]) : DataStream ↺
Parses every string to object

The method MUST parse EVERY string into a single object, so the string
stream here should already be split.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - The parsed objects stream.  
**Test**: test/methods/string-stream-parse.js  

| Param | Type | Description |
| --- | --- | --- |
| parser | [<code>ParseCallback</code>](definitions.md#module_scramjet..ParseCallback) | The transform function |
| [StreamClass] | <code>function</code> | the output stream class to return |

<a name="module_scramjet.StringStream+toDataStream"></a>

### stringStream.toDataStream()
Alias for [StringStream#parse](StringStream#parse)

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
<a name="module_scramjet.StringStream+lines"></a>

### stringStream.lines([eol]) ↺
Splits the string stream by the specified regexp or string

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-split.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eol] | <code>string</code> \| <code>RegExp</code> | <code>&quot;/\\r?\\n/&quot;</code> | End of line string or regex |

<a name="module_scramjet.StringStream+JSONParse"></a>

### stringStream.JSONParse([perLine]) : DataStream ↺
Parses each entry as JSON.
Ignores empty lines

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - stream of parsed items  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [perLine] | <code>Boolean</code> | <code>true</code> | instructs to split per line |

<a name="module_scramjet.StringStream+CSVParse"></a>

### stringStream.CSVParse([options]) : DataStream ↺
Parses CSV to DataString using 'papaparse' module.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Returns**: [<code>DataStream</code>](data-stream.md#module_scramjet.DataStream) - stream of parsed items  
**Test**: test/methods/data-stream-separate.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | options for the papaparse.parse method. |

<a name="module_scramjet.StringStream+append"></a>

### stringStream.append(param) ↺
Appends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-append.js  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>ThenFunction</code> \| <code>string</code> | the argument to append. If function passed then it will be called and resolved and the resolution will be appended. |

<a name="module_scramjet.StringStream+prepend"></a>

### stringStream.prepend(param) ↺
Prepends given argument to all the items.

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Chainable**  
**Test**: test/methods/string-stream-prepend.js  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>ThenFunction</code> \| <code>string</code> | the argument to prepend. If function passed then it will be called and resolved                              and the resolution will be prepended. |

<a name="module_scramjet.StringStream+exec"></a>

### stringStream.exec(command, [options])
Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.

Pipes the current stream into the sub-processes stdin.
The data is serialized and deserialized as JSON lines by default. You
can provide your own alternative methods in the ExecOptions object.

Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!

**Kind**: instance method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Test**: test/methods/string-stream-exec.js  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | <code>string</code> |  | command to execute |
| [options] | [<code>ExecOptions</code>](definitions.md#module_scramjet..ExecOptions) \| <code>any</code> | <code>{}</code> | options to be passed to `spawn` and defining serialization. |
| ...args | <code>Array.&lt;string&gt;</code> |  | additional arguments (will overwrite to SpawnOptions args even if not given) |

<a name="module_scramjet.StringStream.SPLIT_LINE"></a>

### StringStream:SPLIT_LINE
A handy split by line regex to quickly get a line-by-line stream

**Kind**: static property of [<code>StringStream</code>](#module_scramjet.StringStream)  
<a name="module_scramjet.StringStream.fromString"></a>

### StringStream:fromString(stream, encoding) : StringStream
Creates a StringStream and writes a specific string.

**Kind**: static method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - new StringStream.  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>string</code> | the string to push the your stream |
| encoding | <code>string</code> | optional encoding |

<a name="module_scramjet.StringStream.pipeline"></a>

### StringStream:pipeline(readable, transforms) : StringStream
Creates a pipeline of streams and returns a scramjet stream.

**Kind**: static method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - a new StringStream instance of the resulting pipeline  
**See**: DataStream.pipeline  

| Param | Type | Description |
| --- | --- | --- |
| readable | <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>string</code> \| <code>Readable</code> | the initial readable argument that is streamable by scramjet.from |
| transforms | <code>AsyncFunction</code> \| <code>function</code> \| <code>Transform</code> | Transform functions (as in [DataStream..use](DataStream..use)) or Transform streams (any number of these as consecutive arguments) |

<a name="module_scramjet.StringStream.from"></a>

### StringStream:from(source, [options]) : StringStream
Create StringStream from anything.

**Kind**: static method of [<code>StringStream</code>](#module_scramjet.StringStream)  
**Returns**: [<code>StringStream</code>](string-stream.md#module_scramjet.StringStream) - new StringStream.  
**See**

- DataStream.from
- module:scramjet.from


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array</code> \| <code>Iterable.&lt;any&gt;</code> \| <code>AsyncGeneratorFunction</code> \| <code>GeneratorFunction</code> \| <code>AsyncFunction</code> \| <code>function</code> \| <code>Readable</code> |  | argument to be turned into new stream |
| [options] | [<code>DataStreamOptions</code>](definitions.md#module_scramjet..DataStreamOptions) \| <code>Writable</code> | <code>{}</code> |  |

