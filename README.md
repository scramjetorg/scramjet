![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

**Version 4**

[![Master Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=master)](https://travis-ci.org/signicode/scramjet)
[![Develop Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=develop)](https://travis-ci.org/signicode/scramjet)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsignicode%2Fscramjet.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsignicode%2Fscramjet?ref=badge_shield)
[![Known Vulnerabilities](https://snyk.io/test/github/signicode/scramjet/badge.svg)](https://snyk.io/test/github/signicode/scramjet)
[![DeepScan grade](https://deepscan.io/api/projects/2632/branches/17801/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2632&bid=17801)

## What does it do?
Scramjet is a fast, simple, functional reactive stream programming framework written on top of node.js object
streams. The code is written by chaining functions that transform the streamed data, including well known map, filter and
reduce and fully compatible with ES7 async/await. Thanks to it some built in optimizations scramjet is much faster and much
much simpler than similar frameworks when using asynchronous operations.

The main advantage of scramjet is running asynchronous operations on your data streams. First of all it allows you to
perform the transformations both synchronously and asynchronously by using the same API - so now you can "map" your
stream from whatever source and call any number of API's consecutively. And if you're after some heavy maths
there's an option of running your stream as multi-threaded!

The benchmarks are published in the [scramjet-benchmark repo](https://github.com/signicode/scramjet-benchmark).

## Example

How about a full API to API migration, reading a long list of items from one API and checking them one after another,
pushing them to another API? With simultaneous request control? And outputting the log of the conversion? Easy!

```javascript
const fetch = require("node-fetch");
const get = async (url, options = {}) => (await fetch(url, options)).json;
const { StringStream } = require("scramjet");

StringStream.from(                                 // fetch your API to a scramjet stream
    () => get("https://api.example.org/v1/shows/list")
)
    .setOptions({maxParallel: 4})                  // set your options
    .lines()                                       // split the stream by line
    .parse(line => {                               // parse strings to data
        const [id, title, url] = line.split(",");
        return { id, title, url };
    })
    .map(async myShow => get({                      // use asynchronous mapping (for example send requests)
        uri: `http://api.local/set/${myShow.id}`,
        body: JSON.stringify(myShow)
    }))
    .stringify(resp => `+ Updated "${resp}"`)
    .catch(err => `! Error occured ${err.uri}`)    // handle errors
    .append("\n")
    .pipe(process.stdout)                          // use any stream
;

```

Here you can find a most basic guide on how to execute the above example starting from just having access to some command
line: [Scramjet from Scratch](./docs/scramjet-from-scratch.md)

## Usage

Scramjet uses functional programming to run transformations on your data streams in a fashion
very similar to the well known event-stream node module. First create a stream from a source:

Use `DataStream.from(someThing)` to create a new stream from an Array, Generator, AsyncGenerator,
Iterator or Readable stream. See the [DataStream.from docs](docs/data-stream.md#DataStream.from)
for more information, here's a sample.

```javascript
/* global StringStream, fs */
StringStream
    .from(fs.createReadStream("./log.txt"))     // get from any readable stream
    .lines()                                 // split the stream by line
    .use("./your-file")                      // use some trasforms from another file
;

```

Use `DataStream.pipeline(readable, transforms)` to create a pipeline of transform streams and/or
stream modules. Any number of consecutive arguments will get piped one into another.

```javascript
/* global StringStream, fs, gzip */
StringStream
    .pipeline(                              // process a number of streams
        fs.createReadStream("./log.txt.gz"),
        gzip.unzip()                        // all errors here will get forwarded
    )
    .lines()                                // split the stream by line
    .use("./your-file")                     // use some trasforms from another file
;

```

Some methods like `from`, `use`, `flatMap` allow using ES6 generators and ES7 async generators:

```javascript
const fetch = require("node-fetch");
const { StringStream } = require("scramjet");

StringStream
    .from(
        async function* () {                       // construct a stream from an async generator
            yield "houses\n";                      // yield - push a stream chunk
                                                   // yield - push a whole stream
            yield* (await fetch("https://example.org/categories")).body;
        },
        {maxParallel: 4}                           // set your options
    )
    .lines()                                       // split the stream by line
    .flatMap(async function* (category) {
        const req = await fetch(`https://example.org/posts/${category}/`);
        yield* await req.json();                   // yield - push a whole array
    })
    .catch(err => `! Error occured ${err.uri}`)
    .toStringStream()
    .append("\n")
    .pipe(process.stdout)   // pipe to any output
;

```

Most transformations are done by passing a transform function. You can write your function in three ways:

1. Synchronous

Example: a simple stream transform that outputs a stream of objects of the same id property and the length of the value string.

 ```javascript
DataStream
    .from(items)
    .map(
        (item) => ({id: item.id, length: item.value.length})
    )
 ```

2. Asynchronous using ES2015 async await

Example: A simple stream that uses `Fetch API` to get all the contents of all entries in the stream

```javascript
StringStream
    .from(urls)
    .map(
        async (url) => fetch(url).then(res => res.json())
    )
    .JSONParse()
```

3. Asynchronous using Promises

 Example: A simple stream that fetches an url mentioned in the incoming object

 ```javascript
    datastream.map(
        (item) => new Promise((resolve, reject) => {
            request(item.url, (err, res, data) => {
                if (err)
                    reject(err); // will emit an "error" event on the stream
                else
                    resolve(data);
            });
        })
    )
 ```

The actual logic of this transform function is as if you passed your function to the `then` method of a Promise
resolved with the data from the input stream.

4. Streams with multi-threading

To distribute your code among the processor cores, just use the method ```distribute```:

 ```javascript
    datastream.distribute(
        16, // number of threads
        (stream) => {
            // multi-threaded code goes here.
            // it MUST return a valid stream back to the main thread.
        }
    )
 ```

## Writing modules

Scramjet allows writing simple modules that are resolved in the same way as node's `require`. A module
is a simple javascript file that exposes a function taking a stream and any number of following arguments
as default export.

Here's an example:

```javascript
module.exports = (stream, arg1) => {
    const mapper = (chunk) => mapper(chunk, arg1);
    return stream.map(mapper);
}
```

Then it can be used with `DataStream.use` function like this:

```javascript
myStream.use("./path/to/my-module", "arg1");
```

If these modules are published you can also simply use `myStream.use("published-module")`.

For more universal modules you can use helper methods `createTransformModule` and `createReadModule` that scramjet exports. See more in about this in this blog post [Scramjet Modules](https://www.scramjet.org/posts/modules).

## Typescript support

Scramjet aims to be fully documented and expose TypeScript declarations. First version to include  definitions in `.d.ts`
folder is 4.15.0. More TypeScript support will be added with next versions, so feel free to report issues in GitHub.

## Detailed docs

Here's the list of the exposed classes and methods, please review the specific documentation for details:

* [```scramjet```](docs/index.md) - module exports explained
* [```scramjet.DataStream```](docs/data-stream.md) - the base class for all scramjet classes, object stream.
* [```scramjet.BufferStream```](docs/buffer-stream.md) - a stream of Buffers.
* [```scramjet.StringStream```](docs/string-stream.md) - a stream of Strings.
* [```scramjet.NumberStream```](docs/number-stream.md) - a stream of Numbers
* [```scramjet.MultiStream```](docs/multi-stream.md) - A group of streams (for multi-threading and muxing).
* [more on plugins](docs/plugins.md) - a description and link.

Note that:

* Most of the methods take a Function argument that operates on the stream items.
* The Function, unless it's stated otherwise, will receive an argument with the next chunk.
* If you want to perform your operations asynchronously, return a Promise, otherwise just return the right value.

## CLI

Check out the command line interface for simplified scramjet usage with [scramjet-cli](https://www.npmjs.com/package/scramjet-cli)

    $ sjr -i http://datasource.org/file.csv ./transform-module-1 ./transform-module-1 | gzip > logs.gz

## Quick reference of some methods

### :DataStream
DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.

Use as:

```javascript
const { DataStream } = require('scramjet');

await (DataStream.from(aStream) // create a DataStream
    .map(findInFiles)           // read some data asynchronously
    .map(sendToAPI)             // send the data somewhere
    .run());                    // wait until end
```

[Detailed :DataStream docs here](docs/data-stream.md)

**Most popular methods:**

* `new DataStream([opts])` - Create the DataStream.
* [`dataStream.map(func, [ClassType]) ↺`](docs/data-stream.md#module_scramjet.DataStream+map) - Transforms stream objects into new ones, just like Array.prototype.map
* [`dataStream.filter(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+filter) - Filters object based on the function outcome, just like Array.prototype.filter.
* [`dataStream.reduce(func, into) ⇄`](docs/data-stream.md#module_scramjet.DataStream+reduce) - Reduces the stream into a given accumulator
* [`dataStream.do(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+do) - Perform an asynchronous operation without changing or resuming the stream.
* [`dataStream.all(functions) ↺`](docs/data-stream.md#module_scramjet.DataStream+all) - Processes a number of functions in parallel, returns a stream of arrays of results.
* [`dataStream.race(functions) ↺`](docs/data-stream.md#module_scramjet.DataStream+race) - Processes a number of functions in parallel, returns the first resolved.
* [`dataStream.unorder(func)`](docs/data-stream.md#module_scramjet.DataStream+unorder) - Allows processing items without keeping order
* [`dataStream.into(func, into) ↺`](docs/data-stream.md#module_scramjet.DataStream+into) - Allows own implementation of stream chaining.
* [`dataStream.use(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+use) - Calls the passed method in place with the stream as first argument, returns result.
* [`dataStream.run() ⇄`](docs/data-stream.md#module_scramjet.DataStream+run) - Consumes all stream items doing nothing. Resolves when the stream is ended.
* [`dataStream.tap() ↺`](docs/data-stream.md#module_scramjet.DataStream+tap) - Stops merging transform Functions at the current place in the command chain.
* [`dataStream.whenRead() ⇄`](docs/data-stream.md#module_scramjet.DataStream+whenRead) - Reads a chunk from the stream and resolves the promise when read.
* [`dataStream.whenWrote(chunk) ⇄`](docs/data-stream.md#module_scramjet.DataStream+whenWrote) - Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
* [`dataStream.whenEnd() ⇄`](docs/data-stream.md#module_scramjet.DataStream+whenEnd) - Resolves when stream ends - rejects on uncaught error
* [`dataStream.whenDrained() ⇄`](docs/data-stream.md#module_scramjet.DataStream+whenDrained) - Returns a promise that resolves when the stream is drained
* [`dataStream.whenError() ⇄`](docs/data-stream.md#module_scramjet.DataStream+whenError) - Returns a promise that resolves (!) when the stream is errors
* [`dataStream.setOptions(options) ↺`](docs/data-stream.md#module_scramjet.DataStream+setOptions) - Allows resetting stream options.
* [`dataStream.copy(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+copy) - Returns a copy of the stream
* [`dataStream.tee(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+tee) - Duplicate the stream
* [`dataStream.each(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+each) - Performs an operation on every chunk, without changing the stream
* [`dataStream.while(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+while) - Reads the stream while the function outcome is truthy.
* [`dataStream.until(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+until) - Reads the stream until the function outcome is truthy.
* [`dataStream.catch(callback) ↺`](docs/data-stream.md#module_scramjet.DataStream+catch) - Provides a way to catch errors in chained streams.
* [`dataStream.raise(err) ⇄`](docs/data-stream.md#module_scramjet.DataStream+raise) - Executes all error handlers and if none resolves, then emits an error.
* [`dataStream.bufferify(serializer) : BufferStream ↺`](docs/data-stream.md#module_scramjet.DataStream+bufferify) - Creates a BufferStream.
* [`dataStream.stringify([serializer]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+stringify) - Creates a StringStream.
* [`dataStream.toArray([initial]) : Array.<any> ⇄`](docs/data-stream.md#module_scramjet.DataStream+toArray) - Aggregates the stream into a single Array
* [`dataStream.toGenerator() : Generator.<Promise.<any>>`](docs/data-stream.md#module_scramjet.DataStream+toGenerator) - Returns an async generator
* [`dataStream.pull(pullable) : Promise.<any> ⇄`](docs/data-stream.md#module_scramjet.DataStream+pull) - Pulls in any readable stream, resolves when the pulled stream ends.
* [`dataStream.shift(count, func) ↺`](docs/data-stream.md#module_scramjet.DataStream+shift) - Shifts the first n items from the stream and pushes out the remaining ones.
* [`dataStream.peek(count, func) ↺`](docs/data-stream.md#module_scramjet.DataStream+peek) - Allows previewing some of the streams data without removing them from the stream.
* [`dataStream.slice([start], [length]) ↺`](docs/data-stream.md#module_scramjet.DataStream+slice) - Slices out a part of the stream to the passed Function.
* [`dataStream.assign(func) ↺`](docs/data-stream.md#module_scramjet.DataStream+assign) - Transforms stream objects by assigning the properties from the returned
* [`dataStream.empty(callback) ↺`](docs/data-stream.md#module_scramjet.DataStream+empty) - Called only before the stream ends without passing any items
* [`dataStream.unshift() ↺`](docs/data-stream.md#module_scramjet.DataStream+unshift) - Pushes any data at call time (essentially at the beginning of the stream)
* [`dataStream.endWith(item) ↺`](docs/data-stream.md#module_scramjet.DataStream+endWith) - Pushes any data at end of stream
* [`dataStream.accumulate(func, into) : Promise.<any> ⇄`](docs/data-stream.md#module_scramjet.DataStream+accumulate) - Accumulates data into the object.
* [`~~dataStream.consume(func) ⇄~~`](docs/data-stream.md#module_scramjet.DataStream+consume) - Consumes the stream by running each Function
* [`dataStream.reduceNow(func, into) : * ↺`](docs/data-stream.md#module_scramjet.DataStream+reduceNow) - Reduces the stream into the given object, returning it immediately.
* [`dataStream.remap(func, [ClassType]) ↺`](docs/data-stream.md#module_scramjet.DataStream+remap) - Remaps the stream into a new stream.
* [`dataStream.flatMap(func, [ClassType]) ↺`](docs/data-stream.md#module_scramjet.DataStream+flatMap) - Takes any method that returns any iterable and flattens the result.
* [`dataStream.flatten() : DataStream ↺`](docs/data-stream.md#module_scramjet.DataStream+flatten) - A shorthand for streams of arrays or iterables to flatten them.
* [`dataStream.concat() ↺`](docs/data-stream.md#module_scramjet.DataStream+concat) - Returns a new stream that will append the passed streams to the callee
* [`dataStream.join(item) ↺`](docs/data-stream.md#module_scramjet.DataStream+join) - Method will put the passed object between items. It can also be a function call or generator / iterator.
* [`dataStream.keep([count]) ↺`](docs/data-stream.md#module_scramjet.DataStream+keep) - Keep a buffer of n-chunks for use with {@see DataStream..rewind}
* [`dataStream.rewind([count]) ↺`](docs/data-stream.md#module_scramjet.DataStream+rewind) - Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
* [`dataStream.stack([count], [drop]) ↺`](docs/data-stream.md#module_scramjet.DataStream+stack) - Returns a stream that stacks up incoming items always feeding out the newest items first.
* [`dataStream.distribute([affinity], [clusterFunc], [options]) ↺`](docs/data-stream.md#module_scramjet.DataStream+distribute) - Distributes processing into multiple sub-processes or threads if you like.
* [`dataStream.separateInto(streams, affinity) ↺`](docs/data-stream.md#module_scramjet.DataStream+separateInto) - Separates stream into a hash of streams. Does not create new streams!
* [`dataStream.separate(affinity, [createOptions], [ClassType]) : MultiStream ↺`](docs/data-stream.md#module_scramjet.DataStream+separate) - Separates execution to multiple streams using the hashes returned by the passed Function.
* [`dataStream.delegate(delegateFunc, worker, [plugins]) ↺`](docs/data-stream.md#module_scramjet.DataStream+delegate) - Delegates work to a specified worker.
* [`dataStream.rate(cps, [options]) ↺`](docs/data-stream.md#module_scramjet.DataStream+rate) - Limit the rate of the stream to a given number of chunks per second or given timeframe.
* [`dataStream.batch(count) ↺`](docs/data-stream.md#module_scramjet.DataStream+batch) - Aggregates chunks in arrays given number of number of items long.
* [`dataStream.timeBatch(ms, [count]) ↺`](docs/data-stream.md#module_scramjet.DataStream+timeBatch) - Aggregates chunks to arrays not delaying output by more than the given number of ms.
* [`dataStream.nagle([size], [ms]) ↺`](docs/data-stream.md#module_scramjet.DataStream+nagle) - Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
* [`dataStream.window(length) : WindowStream ↺`](docs/data-stream.md#module_scramjet.DataStream+window) - Returns a WindowStream of the specified length
* [`dataStream.toJSONArray([enclosure]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toJSONArray) - Transforms the stream to a streamed JSON array.
* [`dataStream.toJSONObject([entryCallback], [enclosure]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toJSONObject) - Transforms the stream to a streamed JSON object.
* [`dataStream.JSONStringify([endline]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+JSONStringify) - Returns a StringStream containing JSON per item with optional end line
* [`dataStream.CSVStringify([options]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+CSVStringify) - Stringifies CSV to DataString using 'papaparse' module.
* [`dataStream.exec(command, [options])`](docs/data-stream.md#module_scramjet.DataStream+exec) - Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
* [`dataStream.debug(func) : DataStream ↺`](docs/data-stream.md#module_scramjet.DataStream+debug) - Injects a ```debugger``` statement when called.
* [`dataStream.toBufferStream(serializer) : BufferStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toBufferStream) - Creates a BufferStream.
* [`dataStream.toStringStream([serializer]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toStringStream) - Creates a StringStream.
* [`dataStream.toBufferStream(serializer) : BufferStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toBufferStream) - Creates a BufferStream.
* [`dataStream.toStringStream([serializer]) : StringStream ↺`](docs/data-stream.md#module_scramjet.DataStream+toStringStream) - Creates a StringStream.
* [`DataStream:from(input, [options]) : DataStream`](docs/data-stream.md#module_scramjet.DataStream.from) - Returns a DataStream from pretty much anything sensibly possible.
* [`DataStream:pipeline(readable) : DataStream`](docs/data-stream.md#module_scramjet.DataStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
* [`DataStream:fromArray(array, [options]) : DataStream`](docs/data-stream.md#module_scramjet.DataStream.fromArray) - Create a DataStream from an Array
* [`DataStream:fromIterator(iterator, [options]) : DataStream`](docs/data-stream.md#module_scramjet.DataStream.fromIterator) - Create a DataStream from an Iterator

### :StringStream
A stream of string objects for further transformation on top of DataStream.

Example:

```js
StringStream.from(async () => (await fetch('https://example.com/data/article.txt')).text())
    .lines()
    .append("\r\n")
    .pipe(fs.createWriteStream('./path/to/file.txt'))
```

[Detailed :StringStream docs here](docs/string-stream.md)

**Most popular methods:**

* `new StringStream([encoding], [options])` - Constructs the stream with the given encoding
* [`stringStream.shift(bytes, func) ↺`](docs/string-stream.md#module_scramjet.StringStream+shift) - Shifts given length of chars from the original stream
* [`stringStream.split(splitter) ↺`](docs/string-stream.md#module_scramjet.StringStream+split) - Splits the string stream by the specified RegExp or string
* [`stringStream.match(matcher) ↺`](docs/string-stream.md#module_scramjet.StringStream+match) - Finds matches in the string stream and streams the match results
* [`stringStream.toBufferStream() : BufferStream ↺`](docs/string-stream.md#module_scramjet.StringStream+toBufferStream) - Transforms the StringStream to BufferStream
* [`stringStream.parse(parser, [StreamClass]) : DataStream ↺`](docs/string-stream.md#module_scramjet.StringStream+parse) - Parses every string to object
* [`stringStream.toDataStream()`](docs/string-stream.md#module_scramjet.StringStream+toDataStream) - Alias for {@link StringStream#parse}
* [`stringStream.lines([eol]) ↺`](docs/string-stream.md#module_scramjet.StringStream+lines) - Splits the string stream by the specified regexp or string
* [`stringStream.JSONParse([perLine]) : DataStream ↺`](docs/string-stream.md#module_scramjet.StringStream+JSONParse) - Parses each entry as JSON.
* [`stringStream.CSVParse([options]) : DataStream ↺`](docs/string-stream.md#module_scramjet.StringStream+CSVParse) - Parses CSV to DataString using 'papaparse' module.
* [`stringStream.append(param) ↺`](docs/string-stream.md#module_scramjet.StringStream+append) - Appends given argument to all the items.
* [`stringStream.prepend(param) ↺`](docs/string-stream.md#module_scramjet.StringStream+prepend) - Prepends given argument to all the items.
* [`stringStream.exec(command, [options])`](docs/string-stream.md#module_scramjet.StringStream+exec) - Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
* [`StringStream:SPLIT_LINE`](docs/string-stream.md#module_scramjet.StringStream.SPLIT_LINE) - A handy split by line regex to quickly get a line-by-line stream
* [`StringStream:fromString(stream, encoding) : StringStream`](docs/string-stream.md#module_scramjet.StringStream.fromString) - Creates a StringStream and writes a specific string.
* [`StringStream:pipeline(readable, transforms) : StringStream`](docs/string-stream.md#module_scramjet.StringStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
* [`StringStream:from(source, [options]) : StringStream`](docs/string-stream.md#module_scramjet.StringStream.from) - Create StringStream from anything.

### :BufferStream
A facilitation stream created for easy splitting or parsing buffers.

Useful for working on built-in Node.js streams from files, parsing binary formats etc.

A simple use case would be:

```javascript
 fs.createReadStream('pixels.rgba')
     .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     .breakup(4)                     // split into 4 byte fragments
     .parse(buffer => [
         buffer.readInt8(0),            // the output is a stream of R,G,B and Alpha
         buffer.readInt8(1),            // values from 0-255 in an array.
         buffer.readInt8(2),
         buffer.readInt8(3)
     ]);
```

[Detailed :BufferStream docs here](docs/buffer-stream.md)

**Most popular methods:**

* `new BufferStream([opts])` - Creates the BufferStream
* [`bufferStream.shift(chars, func) ↺`](docs/buffer-stream.md#module_scramjet.BufferStream+shift) - Shift given number of bytes from the original stream
* [`bufferStream.split(splitter) : BufferStream ↺`](docs/buffer-stream.md#module_scramjet.BufferStream+split) - Splits the buffer stream into buffer objects
* [`bufferStream.breakup(number) : BufferStream ↺`](docs/buffer-stream.md#module_scramjet.BufferStream+breakup) - Breaks up a stream apart into chunks of the specified length
* [`bufferStream.stringify([encoding]) : StringStream`](docs/buffer-stream.md#module_scramjet.BufferStream+stringify) - Creates a string stream from the given buffer stream
* [`bufferStream.parse(parser) : DataStream`](docs/buffer-stream.md#module_scramjet.BufferStream+parse) - Parses every buffer to object
* [`BufferStream:pipeline(readable) : BufferStream`](docs/buffer-stream.md#module_scramjet.BufferStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
* [`BufferStream:from(stream, [options]) : BufferStream`](docs/buffer-stream.md#module_scramjet.BufferStream.from) - Create BufferStream from anything.

### :MultiStream
An object consisting of multiple streams than can be refined or muxed.

The idea behind a MultiStream is being able to mux and demux streams when needed.

Usage:
```javascript
new MultiStream([...streams])
 .mux();

new MultiStream(function*(){ yield* streams; })
 .map(stream => stream.filter(myFilter))
 .mux();
```

[Detailed :MultiStream docs here](docs/multi-stream.md)

**Most popular methods:**

* `new MultiStream(streams, [options])` - Crates an instance of MultiStream with the specified stream list
* [`multiStream.streams : Array`](docs/multi-stream.md#module_scramjet.MultiStream+streams) - Array of all streams
* [`multiStream.source : DataStream`](docs/multi-stream.md#module_scramjet.MultiStream+source) - Source of the MultiStream.
* [`multiStream.length : number`](docs/multi-stream.md#module_scramjet.MultiStream+length) - Returns the current stream length
* [`multiStream.map(aFunc, rFunc) : Promise.<MultiStream> ↺`](docs/multi-stream.md#module_scramjet.MultiStream+map) - Returns new MultiStream with the streams returned by the transform.
* [`multiStream.find() : DataStream`](docs/multi-stream.md#module_scramjet.MultiStream+find) - Calls Array.prototype.find on the streams
* [`multiStream.filter(func) : MultiStream ↺`](docs/multi-stream.md#module_scramjet.MultiStream+filter) - Filters the stream list and returns a new MultiStream with only the
* [`multiStream.mux([comparator], [ClassType]) : DataStream`](docs/multi-stream.md#module_scramjet.MultiStream+mux) - Muxes the streams into a single one
* [`multiStream.add(stream)`](docs/multi-stream.md#module_scramjet.MultiStream+add) - Adds a stream to the MultiStream
* [`multiStream.remove(stream)`](docs/multi-stream.md#module_scramjet.MultiStream+remove) - Removes a stream from the MultiStream
* [`multiStream.route([policy], [count]) : MultiStream`](docs/multi-stream.md#module_scramjet.MultiStream+route) - Re-routes streams to a new MultiStream of specified size
* [`multiStream.smap(transform) ↺`](docs/multi-stream.md#module_scramjet.MultiStream+smap) - Map stream synchronously
* [`multiStream.cluster(clusterFunc, [options]) ↺`](docs/multi-stream.md#module_scramjet.MultiStream+cluster) - Distributes processing to multiple forked subprocesses.
* [`MultiStream:from(streams, [StreamClass]) : MultiStream`](docs/multi-stream.md#module_scramjet.MultiStream.from) - Constructs MultiStream from any number of streams-likes

### :NumberStream
Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

[Detailed :NumberStream docs here](docs/number-stream.md)

**Most popular methods:**

* `new NumberStream(options)` - Creates an instance of NumberStream.
* [`numberStream.sum() : Promise.<number> | any ⇄`](docs/number-stream.md#module_scramjet.NumberStream+sum) - Calculates the sum of all items in the stream.
* [`numberStream.avg() : Promise.<number> | any ⇄`](docs/number-stream.md#module_scramjet.NumberStream+avg) - Calculates the sum of all items in the stream.

### :WindowStream
A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

[Detailed :WindowStream docs here](docs/window-stream.md)

**Most popular methods:**

* [`windowStream.sum([valueOf]) : NumberStream ↺`](docs/window-stream.md#module_scramjet.WindowStream+sum) - Calculates moving sum of items, the output NumberStream will contain the moving sum.
* [`windowStream.avg([valueOf]) : NumberStream ↺`](docs/window-stream.md#module_scramjet.WindowStream+avg) - Calculates the moving average of the window and returns the NumberStream

### :StreamWorker
StreamWorker class - intended for internal use

This class provides control over the subprocesses, including:
 - spawning
 - communicating
 - delivering streams

[Detailed :StreamWorker docs here](docs/stream-worker.md)

**Most popular methods:**

* `new StreamWorker()` - Private constructor
* [`streamWorker.spawn() : StreamWorker ⇄`](docs/stream-worker.md#module_scramjet.StreamWorker+spawn) - Spawns the worker if necessary and provides the port information to it.
* [`streamWorker.delegate(input, delegateFunc, [plugins]) : DataStream`](docs/stream-worker.md#module_scramjet.StreamWorker+delegate) - Delegates a stream to the child using tcp socket.
* [`StreamWorker:fork([count]) : Array.<StreamWorker> ⇄`](docs/stream-worker.md#module_scramjet.StreamWorker.fork) - Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.
* [`StreamWorker:_getWorker() : StreamWorker ⇄`](docs/stream-worker.md#module_scramjet.StreamWorker._getWorker) - Picks next worker (not necessarily free one!)



## Scramjet core

Don't like dependencies? Scramjet packs just a couple of those, but if you are really really annoyed by second depth of
deps, please try [scramjet-core](https://www.npmjs.com/package/scramjet-core).

Only the most vital methods there, but the library is dependency free.

## License and contributions

As of version 2.0 Scramjet is MIT Licensed.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsignicode%2Fscramjet-core.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsignicode%2Fscramjet-core?ref=badge_large)

## Help wanted

The project need's your help! There's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to us, [on slack](https://join.slack.com/t/scramjetframework/shared_invite/zt-bb16pluv-XlICrq5Khuhbq5beenP2Fg) or email us: [opensource@scramjet.org](opensource@scramjet.org).
