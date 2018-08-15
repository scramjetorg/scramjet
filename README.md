![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

**Version 4**

[![Master Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=master)](https://travis-ci.org/signicode/scramjet)
[![Develop Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=develop)](https://travis-ci.org/signicode/scramjet)
[![Dependencies](https://david-dm.org/signicode/scramjet/status.svg)](https://david-dm.org/signicode/scramjet)
[![Dev Dependencies](https://david-dm.org/signicode/scramjet/dev-status.svg)](https://david-dm.org/signicode/scramjet?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/signicode/scramjet/badge.svg)](https://snyk.io/test/github/signicode/scramjet)
[![Greenkeeper badge](https://badges.greenkeeper.io/signicode/scramjet.svg)](https://greenkeeper.io/)
[![DeepScan grade](https://deepscan.io/api/projects/2632/branches/17801/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2632&bid=17801)

## What does it do?

Scramjet is a fast, simple, multi-threaded functional stream programming framework written on top of node.js object
streams. It exposes a standards inspired javascript API and written fully in native ES6. Thanks to it some built in
optimizations scramjet is much faster and much much simpler than similar frameworks when using asynchronous operations.

It is built upon the logic behind three well known javascript array operations - namingly map, filter and reduce. This
means that if you've ever performed operations on an Array in JavaScript - you already know Scramjet like the back of
your hand.

The main advantage of scramjet is running asynchronous operations on your data streams. First of all it allows you to
perform the transformations both synchronously and asynchronously by using the same API - so now you can "map" your
stream from whatever source and call any number of API's consecutively.

The benchmarks are published in the [scramjet-benchmark repo](https://github.com/signicode/scramjet-benchmark).

## Example

How about a full API to API migration, reading a long list of items from one API and checking them one after another,
pushing them to another API? With simultaneous request control? And outputting the log of the conversion? Easy!

```javascript
const request = require("request");
const rp = require("request-promise-native");
const { StringStream } = require("scramjet");

StringStream.from(                                 // fetch your API to a scramjet stream
        request('https://api.example.org/v1/shows/list')
    )
    .setOptions({maxParallel: 4})                  // set your options
    .lines()                                       // split the stream by line
    .parse(theirShow => {                          // parse to your requirement
        return {
            id: theirShow.id,
            title: theirShow.name,
            url: theirShow.url
        }
    })
    .map(myShow => rp({                            // parse to your requirement
        method: "POST",
        simple: true,
        uri: `http://api.local/set/${myshow.id}`,
        body: JSON.stringify(myShow)
    })
    .map(resp => `+ Update succeeded ${err.uri}`)  // make your logs
    .catch(err => `! Error occured ${err.uri}`)
    .append('\n')
    .pipe(process.stdout);                         // pipe to any output
```

Of course you can also use the simple `CSVParse` method to do that. :)

## Usage

Scramjet uses functional programming to run transformations on your data streams in a fashion very similar to the well
known event-stream node module. Most transformations are done by passing a transform function. You can write your
function in three ways:

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

* Most of the methods take a callback argument that operates on the stream items.
* The callback, unless it's stated otherwise, will receive an argument with the next chunk.
* If you want to perform your operations asynchronously, return a Promise, otherwise just return the right value.

## CLI

Check out the command line interface for simplified scramjet usage with [scramjet-cli](https://www.npmjs.com/package/scramjet-cli)

    $ sjr -i http://datasource.org/file.csv ./transform-module-1 ./transform-module-1 | gzip > logs.gz

## Quick reference of some methods

### DataStream

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

[Detailed DataStream docs here](docs/data-stream.md)

**Most popular methods:**

* `new DataStream(opts)` - Create the DataStream.
* [`dataStream.map(func, Clazz) ↺`](docs/data-stream.md#DataStream+map) - Transforms stream objects into new ones, just like Array.prototype.map
* [`dataStream.filter(func) ↺`](docs/data-stream.md#DataStream+filter) - Filters object based on the function outcome, just like
* [`dataStream.reduce(func, into) ⇄`](docs/data-stream.md#DataStream+reduce) - Reduces the stream into a given accumulator
* [`dataStream.do(func) ↺`](docs/data-stream.md#DataStream+do) - Perform an asynchroneous operation without changing or resuming the stream.
* [`dataStream.into(func, into) ↺`](docs/data-stream.md#DataStream+into) - Allows own implementation of stream chaining.
* [`dataStream.use(func) ↺`](docs/data-stream.md#DataStream+use) - Calls the passed method in place with the stream as first argument, returns result.
* [`dataStream.run() ⇄`](docs/data-stream.md#DataStream+run) - Consumes all stream items doing nothing. Resolves when the stream is ended.
* [`dataStream.tap()`](docs/data-stream.md#DataStream+tap) - Stops merging transform callbacks at the current place in the command chain.
* [`dataStream.whenRead() ⇄`](docs/data-stream.md#DataStream+whenRead) - Reads a chunk from the stream and resolves the promise when read.
* [`dataStream.whenWrote(chunk, [...more]) ⇄`](docs/data-stream.md#DataStream+whenWrote) - Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
* [`dataStream.whenEnd() ⇄`](docs/data-stream.md#DataStream+whenEnd) - Resolves when stream ends - rejects on uncaught error
* [`dataStream.whenDrained() ⇄`](docs/data-stream.md#DataStream+whenDrained) - Returns a promise that resolves when the stream is drained
* [`dataStream.whenError() ⇄`](docs/data-stream.md#DataStream+whenError) - Returns a promise that resolves (!) when the stream is errors
* [`dataStream.setOptions(options) ↺`](docs/data-stream.md#DataStream+setOptions) - Allows resetting stream options.
* [`dataStream.tee(func) ↺`](docs/data-stream.md#DataStream+tee) - Duplicate the stream
* [`dataStream.each(func) ↺`](docs/data-stream.md#DataStream+each) - Performs an operation on every chunk, without changing the stream
* [`dataStream.while(func) ↺`](docs/data-stream.md#DataStream+while) - Reads the stream while the function outcome is truthy.
* [`dataStream.until(func) ↺`](docs/data-stream.md#DataStream+until) - Reads the stream until the function outcome is truthy.
* [`dataStream.catch(callback) ↺`](docs/data-stream.md#DataStream+catch) - Provides a way to catch errors in chained streams.
* [`dataStream.raise(err) ⇄`](docs/data-stream.md#DataStream+raise) - Executes all error handlers and if none resolves, then emits an error.
* [`dataStream.pipe(to, options) : Writable ↺`](docs/data-stream.md#DataStream+pipe) - Override of node.js Readable pipe.
* [`dataStream.bufferify(serializer) : BufferStream ↺`](docs/data-stream.md#DataStream+bufferify) - Creates a BufferStream
* [`dataStream.stringify(serializer) : StringStream ↺`](docs/data-stream.md#DataStream+stringify) - Creates a StringStream
* [`dataStream.toArray(initial) : Array ⇄`](docs/data-stream.md#DataStream+toArray) - Aggregates the stream into a single Array
* [`dataStream.toGenerator() : Iterable.<Promise.<*>>`](docs/data-stream.md#DataStream+toGenerator) - Returns an async generator
* [`dataStream.pull(incoming) : Number ⇄`](docs/data-stream.md#DataStream+pull) - Pulls in any Readable stream, resolves when the pulled stream ends.
* [`dataStream.shift(count, func) ↺`](docs/data-stream.md#DataStream+shift) - Shifts the first n items from the stream and pushes out the remaining ones.
* [`dataStream.peek(count, func) ↺`](docs/data-stream.md#DataStream+peek) - Allows previewing some of the streams data without removing them from the stream.
* [`dataStream.slice([start], [length]) ↺`](docs/data-stream.md#DataStream+slice) - Gets a slice of the stream to the callback function.
* [`dataStream.assign(func) ↺`](docs/data-stream.md#DataStream+assign) - Transforms stream objects by assigning the properties from the returned
* [`dataStream.empty(callback) ↺`](docs/data-stream.md#DataStream+empty) - Called when the stream ends without passing any items
* [`dataStream.unshift(item) ↺`](docs/data-stream.md#DataStream+unshift) - Pushes any data at call time (essentially at the beginning of the stream)
* [`dataStream.endWith(item) ↺`](docs/data-stream.md#DataStream+endWith) - Pushes any data at end of stream
* [`dataStream.accumulate(func, into) : Promise ⇄`](docs/data-stream.md#DataStream+accumulate) - Accumulates data into the object.
* [`~~dataStream.consume(func) ⇄~~`](docs/data-stream.md#DataStream+consume) - Consumes the stream by running each callback
* [`dataStream.reduceNow(func, into) : * ↺`](docs/data-stream.md#DataStream+reduceNow) - Reduces the stream into the given object, returning it immediately.
* [`dataStream.remap(func, Clazz) : DataStream ↺`](docs/data-stream.md#DataStream+remap) - Remaps the stream into a new stream.
* [`dataStream.flatMap(func, Clazz) : DataStream ↺`](docs/data-stream.md#DataStream+flatMap) - Takes any method that returns any iterable and flattens the result.
* [`dataStream.flatten() : DataStream ↺`](docs/data-stream.md#DataStream+flatten) - A shorthand for streams of Arrays to flatten them.
* [`dataStream.concat(streams) ↺`](docs/data-stream.md#DataStream+concat) - Returns a new stream that will append the passed streams to the callee
* [`dataStream.join(item) ↺`](docs/data-stream.md#DataStream+join) - Method will put the passed object between items. It can also be a function call.
* [`dataStream.keep(count) ↺`](docs/data-stream.md#DataStream+keep) - Keep a buffer of n-chunks for use with {@see DataStream..rewind}
* [`dataStream.rewind(count) ↺`](docs/data-stream.md#DataStream+rewind) - Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
* [`dataStream.distribute([affinity], clusterFunc, options) ↺`](docs/data-stream.md#DataStream+distribute) - Distributes processing into multiple subprocesses or threads if you like.
* [`dataStream.separateInto(streams, affinity) ↺`](docs/data-stream.md#DataStream+separateInto) - Seprates stream into a hash of streams. Does not create new streams!
* [`dataStream.separate(affinity, createOptions) : MultiStream ↺`](docs/data-stream.md#DataStream+separate) - Separates execution to multiple streams using the hashes returned by the passed callback.
* [`dataStream.delegate(delegateFunc, worker, [plugins]) ↺`](docs/data-stream.md#DataStream+delegate) - Delegates work to a specified worker.
* [`dataStream.batch(count) ↺`](docs/data-stream.md#DataStream+batch) - Aggregates chunks in arrays given number of number of items long.
* [`dataStream.timeBatch(ms, count) ↺`](docs/data-stream.md#DataStream+timeBatch) - Aggregates chunks to arrays not delaying output by more than the given number of ms.
* [`dataStream.nagle([size], [ms]) ↺`](docs/data-stream.md#DataStream+nagle) - Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
* [`dataStream.window(length) : WindowStream ↺`](docs/data-stream.md#DataStream+window) - Returns a WindowStream of the specified length
* [`dataStream.toJSONArray([enclosure]) : StringStream ↺`](docs/data-stream.md#DataStream+toJSONArray) - Transforms the stream to a streamed JSON array.
* [`dataStream.toJSONObject([entryCallback], [enclosure]) : StringStream ↺`](docs/data-stream.md#DataStream+toJSONObject) - Transforms the stream to a streamed JSON object.
* [`dataStream.JSONStringify([endline]) : StringStream ↺`](docs/data-stream.md#DataStream+JSONStringify) - Returns a StringStream containing JSON per item with optional end line
* [`dataStream.CSVStringify(options) : StringStream ↺`](docs/data-stream.md#DataStream+CSVStringify) - Stringifies CSV to DataString using 'papaparse' module.
* [`dataStream.debug(func) : DataStream ↺`](docs/data-stream.md#DataStream+debug) - Injects a ```debugger``` statement when called.
* [`dataStream.toBufferStream(serializer) : BufferStream ↺`](docs/data-stream.md#DataStream+toBufferStream) - Creates a BufferStream
* [`dataStream.toStringStream(serializer) : StringStream ↺`](docs/data-stream.md#DataStream+toStringStream) - Creates a StringStream
* [`DataStream:from(str, options) ↺`](docs/data-stream.md#DataStream.from) - Returns a DataStream from pretty much anything sensibly possible.
* [`DataStream:fromArray(arr) : DataStream`](docs/data-stream.md#DataStream.fromArray) - Create a DataStream from an Array
* [`DataStream:fromIterator(iter) : DataStream`](docs/data-stream.md#DataStream.fromIterator) - Create a DataStream from an Iterator

### StringStream

A stream of string objects for further transformation on top of DataStream.

Example:

```javascript
StringStream.fromString()
```

[Detailed StringStream docs here](docs/string-stream.md)

**Most popular methods:**

* `new StringStream(encoding)` - Constructs the stream with the given encoding
* [`stringStream.shift(bytes, func) ↺`](docs/string-stream.md#StringStream+shift) - Shifts given length of chars from the original stream
* [`stringStream.split(splitter) ↺`](docs/string-stream.md#StringStream+split) - Splits the string stream by the specified regexp or string
* [`stringStream.match(matcher) ↺`](docs/string-stream.md#StringStream+match) - Finds matches in the string stream and streams the match results
* [`stringStream.toBufferStream() : BufferStream ↺`](docs/string-stream.md#StringStream+toBufferStream) - Transforms the StringStream to BufferStream
* [`stringStream.parse(parser) : DataStream ↺`](docs/string-stream.md#StringStream+parse) - Parses every string to object
* [`stringStream.lines([eol]) ↺`](docs/string-stream.md#StringStream+lines) - Splits the string stream by the specified regexp or string
* [`stringStream.JSONParse(perLine) : DataStream ↺`](docs/string-stream.md#StringStream+JSONParse) - Parses each entry as JSON.
* [`stringStream.CSVParse(options) : DataStream ↺`](docs/string-stream.md#StringStream+CSVParse) - Parses CSV to DataString using 'papaparse' module.
* [`stringStream.append(arg) ↺`](docs/string-stream.md#StringStream+append) - Appends given argument to all the items.
* [`stringStream.prepend(arg) ↺`](docs/string-stream.md#StringStream+prepend) - Prepends given argument to all the items.
* [`stringStream.pop(bytes, func) ↺`](docs/string-stream.md#StringStream+pop) - Shifts given length of chars from the original stream
* [`StringStream:SPLIT_LINE`](docs/string-stream.md#StringStream.SPLIT_LINE) - A handly split by line regex to quickly get a line-by-line stream
* [`StringStream:fromString(str, encoding) : StringStream`](docs/string-stream.md#StringStream.fromString) - Creates a StringStream and writes a specific string.
* [`StringStream:from()`](docs/string-stream.md#StringStream.from) - Create StringStream from anything.

### BufferStream

A factilitation stream created for easy splitting or parsing buffers.

Useful for working on built-in Node.js streams from files, parsing binary formats etc.

A simple use case would be:

```javascript
 fs.createReadStream('pixels.rgba')
     .pipe(new BufferStream)         // pipe a buffer stream into scramjet
     .breakup(4)                     // split into 4 byte fragments
     .parse(buf => [
         buf.readInt8(0),            // the output is a stream of R,G,B and Alpha
         buf.readInt8(1),            // values from 0-255 in an array.
         buf.readInt8(2),
         buf.readInt8(3)
     ]);
```

[Detailed BufferStream docs here](docs/buffer-stream.md)

**Most popular methods:**

* `new BufferStream(opts)` - Creates the BufferStream
* [`bufferStream.shift(chars, func) : BufferStream ↺`](docs/buffer-stream.md#BufferStream+shift) - Shift given number of bytes from the original stream
* [`bufferStream.split(splitter) : BufferStream ↺`](docs/buffer-stream.md#BufferStream+split) - Splits the buffer stream into buffer objects
* [`bufferStream.breakup(number) : BufferStream ↺`](docs/buffer-stream.md#BufferStream+breakup) - Breaks up a stream apart into chunks of the specified length
* [`bufferStream.stringify(encoding) : StringStream`](docs/buffer-stream.md#BufferStream+stringify) - Creates a string stream from the given buffer stream
* [`bufferStream.parse(parser) : DataStream`](docs/buffer-stream.md#BufferStream+parse) - Parses every buffer to object
* [`bufferStream.toStringStream(encoding) : StringStream`](docs/buffer-stream.md#BufferStream+toStringStream) - Creates a string stream from the given buffer stream
* [`bufferStream.pop(chars, func) : BufferStream ↺`](docs/buffer-stream.md#BufferStream+pop) - Shift given number of bytes from the original stream
* [`bufferStream.toDataStream(parser) : DataStream`](docs/buffer-stream.md#BufferStream+toDataStream) - Parses every buffer to object
* [`BufferStream:from()`](docs/buffer-stream.md#BufferStream.from) - Create BufferStream from anything.

### MultiStream

An object consisting of multiple streams than can be refined or muxed.

[Detailed MultiStream docs here](docs/multi-stream.md)

**Most popular methods:**

* `new MultiStream(streams, options)` - Crates an instance of MultiStream with the specified stream list
* [`multiStream.streams : Array`](docs/multi-stream.md#MultiStream+streams) - Array of all streams
* [`multiStream.length : number`](docs/multi-stream.md#MultiStream+length) - Returns the current stream length
* [`multiStream.map(aFunc) : MultiStream ↺`](docs/multi-stream.md#MultiStream+map) - Returns new MultiStream with the streams returned by the transform.
* [`multiStream.find(...args) : DataStream`](docs/multi-stream.md#MultiStream+find) - Calls Array.prototype.find on the streams
* [`multiStream.filter(func) : MultiStream ↺`](docs/multi-stream.md#MultiStream+filter) - Filters the stream list and returns a new MultiStream with only the
* [`multiStream.mux(cmp) : DataStream`](docs/multi-stream.md#MultiStream+mux) - Muxes the streams into a single one
* [`multiStream.add(stream)`](docs/multi-stream.md#MultiStream+add) - Adds a stream to the MultiStream
* [`multiStream.remove(stream)`](docs/multi-stream.md#MultiStream+remove) - Removes a stream from the MultiStream
* [`multiStream.route([policy], [count]) : MultiStream`](docs/multi-stream.md#MultiStream+route) - Re-routes streams to a new MultiStream of specified size
* [`multiStream.smap(transform) ↺`](docs/multi-stream.md#MultiStream+smap) - Map stream synchronously
* [`multiStream.cluster(clusterFunc, options) ↺`](docs/multi-stream.md#MultiStream+cluster) - Distributes processing to multiple forked subprocesses.

### NumberStream

Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

[Detailed NumberStream docs here](docs/number-stream.md)

**Most popular methods:**

* `new NumberStream(options)` - Creates an instance of NumberStream.
* [`numberStream.sum() : Number ⇄`](docs/number-stream.md#NumberStream+sum) - Calculates the sum of all items in the stream.
* [`numberStream.avg() : Number ⇄`](docs/number-stream.md#NumberStream+avg) - Calculates the sum of all items in the stream.

### WindowStream

A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

[Detailed WindowStream docs here](docs/window-stream.md)

**Most popular methods:**

* [`windowStream.sum([valueOf]) : Promise.<Number> ↺`](docs/window-stream.md#WindowStream+sum) - Calculates moving sum of items, the output stream will contain the moving sum.
* [`windowStream.avg([valueOf]) : Promise.<Number> ↺`](docs/window-stream.md#WindowStream+avg) - Calculates the moving average of all items in the stream.

### :PromiseTransformStream



[Detailed :PromiseTransformStream docs here](docs/index.md)

**Most popular methods:**

* `new PromiseTransformStream()` - Provides a lazy-load accessor to PromiseTransformStream - the base class of scramjet streams



## Scramjet core

Don't like dependencies? Scramjet packs just a couple of those, but if you are really really annoyed by second depth of
deps, please try [scramjet-core](https://www.npmjs.com/package/scramjet-core).

Only the most vital methods there, but the library is dependency free.

## License and contributions

As of version 2.0 Scramjet is MIT Licensed.

## Help wanted

The project need's your help! There's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to me, signicode on Github or email me: scramjet@signicode.com.
