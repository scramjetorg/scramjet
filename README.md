[![Master Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=master)](https://travis-ci.org/signicode/scramjet)
[![Develop Build Status](https://travis-ci.org/signicode/scramjet.svg?branch=develop)](https://travis-ci.org/signicode/scramjet)
[![Dependencies](https://david-dm.org/signicode/scramjet/status.svg)](https://david-dm.org/signicode/scramjet)
[![Dev Dependencies](https://david-dm.org/signicode/scramjet/dev-status.svg)](https://david-dm.org/signicode/scramjet?type=dev)

## What does it do?

Scramjet is a powerful, yet simple framework written on top of node.js object streams, somewhat similar to the well-known [event-stream](https://www.npmjs.com/package/event-stream) module, but with more simplicty in mind and written in ES6. It is built upon the logic behind three well known javascript array operations - namingly map, filter and reduce. This means that if you've ever performed operations on an Array in JavaScript - you already know Scramjet like the back of your hand.

It allows you to perform the transformations both synchronously and asynchronously in the same API.

## Example

How about a CSV parser of all the parkings in the city of Wrocław from http://www.wroclaw.pl/open-data/...

```javascript
const request = require("request");
const StringStream = require("scramjet").StringStream;

let columns = null;
request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    .parse((line) => line.split(";"))
    .pop(1, (data) => columns = data)
    .map((data) => columns.reduce((acc, id, i) => (acc[id] = data[i], acc), {}))
    .on("data", console.log.bind(console))
```

## API Docs

Here's the list of the exposed classes, please review the specific documentation for details:

* [```scramjet.DataStream```](docs/data-stream.md) - the base class for all scramjet classes.
* [```scramjet.BufferStream```](docs/buffer-stream.md) - a DataStream of Buffers.
* [```scramjet.StringStream```](docs/string-stream.md) - a DataStream of Strings.
* [```scramjet.MultiStream```](docs/multi-stream.md) - a DataStream of Strings.

Note that:

* Most of the methods take a callback argument that operates on the stream items.
* The callback, unless it's stated otherwise, will receive an argument with the next chunk.
* If you want to perform your operations asynchronously, return a Promise, otherwise just return the right value.

The quick reference of the exposed classes:


<a name="DataStream"></a>
### DataStream ⇐ stream.PassThrough

DataStream is the primary stream type for Scramjet. When you parse yourstream, just pipe it you can then perform calculations on the data objectsstreamed through your flow.

[Detailed DataStream docs here](docs/data-stream.md)

| Method | Description | Example
|--------|-------------|---------
| new DataStream(opts) | Create the DataStream. | [DataStream example](../samples/data-stream-constructor.js) |
| dataStream.debug(func) ⇒ <code>[DataStream](#DataStream)</code> | Injects a ```debugger``` statement when called. | [debug example](../samples/data-stream-debug.js) |
| dataStream.group(func) ⇒ <code>[DataStream](#DataStream)</code> | Groups execution by key in a single thread | [group example](../samples/data-stream-group.js) |
| dataStream.tee(func) ⇒ <code>[DataStream](#DataStream)</code> | Duplicate the stream | [tee example](../samples/data-stream-tee.js) |
| dataStream.slice(start, end, func) ⇒ <code>[DataStream](#DataStream)</code> | Gets a slice of the stream to the callback function. | [slice example](../samples/data-stream-slice.js) |
| dataStream.accumulate(func, into) ⇒ <code>Promise</code> | Accumulates data into the object. | [accumulate example](../samples/data-stream-accumulate.js) |
| dataStream.reduce(func, into) ⇒ <code>Promise</code> | Reduces the stream into a given accumulator | [reduce example](../samples/data-stream-reduce.js) |
| dataStream.reduceNow(func, into) ⇒ <code>\*</code> | Reduces the stream into the given object, returning it immediately. | [reduceNow example](../samples/data-stream-reduceNow.js) |
| dataStream.remap(func, Clazz) ⇒ <code>[DataStream](#DataStream)</code> | Remaps the stream into a new stream. | [remap example](../samples/data-stream-remap.js) |
| dataStream.each(func) ↩︎ | Performs an operation on every chunk, without changing the stream |  |
| dataStream.map(func, Clazz) ⇒ <code>[DataStream](#DataStream)</code> | Transforms stream objects into new ones, just like Array.prototype.map | [map example](../samples/data-stream-map.js) |
| dataStream.filter(func) ⇒ <code>[DataStream](#DataStream)</code> | Filters object based on the function outcome, just like | [filter example](../samples/data-stream-filter.js) |
| dataStream.shift(count, func) ⇒ <code>[DataStream](#DataStream)</code> | Shifts the first n items from the stream and pipes the other | [shift example](../samples/data-stream-shift.js) |
| dataStream.separate() ⇒ <code>[MultiStream](#MultiStream)</code> | Splits the stream two ways | [separate example](../samples/data-stream-separate.js) |
| dataStream.toBufferStream(serializer) ⇒ <code>[BufferStream](#BufferStream)</code> | Creates a BufferStream | [toBufferStream example](../samples/data-stream-tobufferstream.js) |
| dataStream.stringify(serializer) ⇒ <code>[StringStream](#StringStream)</code> | Creates a StringStream | [stringify example](../samples/data-stream-tostringstream.js) |
| dataStream.toArray(initial) ⇒ <code>Promise</code> | Aggregates the stream into a single Array |  |
| DataStream.fromArray(arr) ⇒ <code>[DataStream](#DataStream)</code> | Create a DataStream from an Array | [fromArray example](../samples/data-stream-fromarray.js) |


<a name="StringStream"></a>
### StringStream ⇐ DataStream

A stream of string objects for further transformation on top of DataStream.

[Detailed StringStream docs here](docs/string-stream.md)

| Method | Description | Example
|--------|-------------|---------
| new StringStream(encoding) | Constructs the stream with the given encoding | [StringStream example](../samples/string-stream-constructor.js) |
| stringStream.shift(bytes, func) ⇒ <code>[StringStream](#StringStream)</code> | Shifts given length of chars from the original stream | [shift example](../samples/string-stream-shift.js) |
| stringStream.split(splitter) ⇒ <code>[StringStream](#StringStream)</code> | Splits the string stream by the specified regexp or string | [split example](../samples/string-stream-split.js) |
| stringStream.match(splitter) ⇒ <code>[StringStream](#StringStream)</code> | Finds matches in the string stream and streams the match results | [match example](../samples/string-stream-match.js) |
| stringStream.toBufferStream() ⇒ <code>[StringStream](#StringStream)</code> | Transforms the StringStream to BufferStream | [toBufferStream example](../samples/string-stream-tobufferstream.js) |
| stringStream.parse(parser) ⇒ <code>[DataStream](#DataStream)</code> | Parses every string to object | [parse example](../samples/string-stream-parse.js) |
| StringStream.SPLIT_LINE | A handly split by line regex to quickly get a line-by-line stream |  |


<a name="BufferStream"></a>
### BufferStream ⇐ DataStream

A factilitation stream created for easy splitting or parsing buffers

[Detailed BufferStream docs here](docs/buffer-stream.md)

| Method | Description | Example
|--------|-------------|---------
| new BufferStream(opts) | Creates the BufferStream | [BufferStream example](../samples/buffer-stream-constructor.js) |
| bufferStream.shift(chars, func) ⇒ <code>[BufferStream](#BufferStream)</code> | Shift given number of bytes from the original stream | [shift example](../samples/string-stream-shift.js) |
| bufferStream.split(splitter) ⇒ <code>[BufferStream](#BufferStream)</code> | Splits the buffer stream into buffer objects | [split example](../samples/buffer-stream-split.js) |
| bufferStream.breakup(number) ⇒ <code>[BufferStream](#BufferStream)</code> | Breaks up a stream apart into chunks of the specified length | [breakup example](../samples/buffer-stream-breakup.js) |
| bufferStream.toStringStream(encoding) ⇒ <code>[StringStream](#StringStream)</code> | Creates a string stream from the given buffer stream | [toStringStream example](../samples/buffer-stream-tostringstream.js) |
| bufferStream.parse(parser) ⇒ <code>[DataStream](#DataStream)</code> | [Parallel] Parses every buffer to object | [parse example](../samples/buffer-stream-parse.js) |


<a name="MultiStream"></a>
### MultiStream

An object consisting of multiple streams than can be refined or muxed.

[Detailed MultiStream docs here](docs/multi-stream.md)

| Method | Description | Example
|--------|-------------|---------
| new MultiStream(streams, options) | Crates an instance of MultiStream with the specified stream list | [MultiStream example](../samples/multi-stream-constructor.js) |
| multiStream.map(func) ⇒ <code>[MultiStream](#MultiStream)</code> | Returns new MultiStream with the streams returned by the tranform. | [map example](../samples/multi-stream-map.js) |
| multiStream.filter(func) ⇒ <code>[MultiStream](#MultiStream)</code> | Filters the stream list and returns a new MultiStream with only the | [filter example](../samples/multi-stream-filter.js) |
| multiStream.dedupe(cmp) ⇒ <code>[DataStream](#DataStream)</code> | Makes a number of redundant streams into a single one | [dedupe example](../samples/multi-stream-dedupe.js) |
| multiStream.mux(cmp) ⇒ <code>[DataStream](#DataStream)</code> | Muxes the streams into a single one | [mux example](../samples/multi-stream-mux.js) |
| multiStream.add(stream) | Adds a stream to the MultiStream | [add example](../samples/multi-stream-add.js) |
| multiStream.remove(stream) | Removes a stream from the MultiStream | [remove example](../samples/multi-stream-remove.js) |


## Browserifying

Scramjet works in the browser too, there's a nice, self-contained sample in here, just run it:

```bash
    git clone https://github.com/signicode/scramjet.git
    cd scramjet
    npm install .
    cd samples/browser
    npm start # point your browser to http://localhost:30035 and open console
```

If you need your scramjet version for the browser, grab browserify and just run:

```bash
    browserify lib/index -standalone scramjet -o /path/to/your/browserified-scramjet.js
```

With this you can run your transformations in the browser, use websockets to send them back and forth. If you do and fail for some reason, please remember to be issuing those issues - as no one person can test all the use cases and I am but one person.

## Usage

Scramjet uses functional programming to run transformations on your data streams in a fashion very similar to the well known event-stream node module. Most transformations are done by passing a transform function. You can write your function in two ways:

1. Synchronous

 Example: a simple stream transform that outputs a stream of objects of the same id property and the length of the value string.

 ```javascript
    datastream.map(
        (item) => ({id: item.id, length: item.value.length})
    )
 ```

2. Asynchronous (using Promises)

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

The actual logic of this transform function is as if you passed your function
to the ```then``` method of a Promise resolved with the data from the input
stream.

## License and contributions

As of version 2.0 Scramjet is MIT Licensed.

## Help wanted

The project need's your help! There's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to me, signicode on Github or email me: scramjet@signicode.com.
