[![Master Build Status](https://travis-ci.org/MichalCz/scramjet.svg?branch=master)](https://travis-ci.org/MichalCz/scramjet)
[![Develop Build Status](https://travis-ci.org/MichalCz/scramjet.svg?branch=develop)](https://travis-ci.org/MichalCz/scramjet)
[![Dependencies](https://david-dm.org/MichalCz/scramjet/status.svg)](https://david-dm.org/MichalCz/scramjet)
[![Dev Dependencies](https://david-dm.org/MichalCz/scramjet/dev-status.svg)](https://david-dm.org/MichalCz/scramjet?type=dev)

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

### DataStream extends Transform

| Method                  | Callback method    | Returns      | Description
|-------------------------|--------------------|--------------|-------------
| `map(func)`             | `func(chunk):Any`  | `new Self()` | Returns a new instance of stream which items are mapped by the passed function.
| `filter(func)`          | `func(chunk):Bool` | `new Self()` | Returns a new instance of stream filtered of chunks for which the passed function is resolved by a falsy value.
| `reduce(func, into)`    | `func(chunk):Any`  | `Promise`    | Allows to reduce the stream, just like Array::reduce. Returns a promise that will be resolved on stream end with the last returned value.
| `reduceNow(func, into)` | `func(chunk):Any`  | `Any`        | Works the same as above with the difference that it returns the "into" object at once.
| `tee(func)`             | `func(piped):void` | `this`       | Duplicates the stream into two like the `tee` in POSIX. The function is called with the duplicated stream.
| `pop(count, func)`      | `func(array):this` | `this`       | Pops `count` of chunks, filtering them from the original stream. Calls the callback with an array of popped chunks.

### BufferStream extends DataStream

| Method                  | Callback method   | Returns      | Description
|-------------------------|-------------------|--------------|-------------
| `parse(func, into)`     | `func(chunk):Any` | `DataStream` | Returns the stream passed as `into` or a new instance of DataStream that is fed with anything that is returned by the passed `func`
| `split(regexp)`         | N/A               | `new Self()` | Returns a new instance of stream which is split by ocurrences of the passed regex or string.
| `toStringStream(enc)`   | N/A               | `new Self()` | Returns a new instance of StringStream with the given encoding

Remeber: this is an Object stream - even though you're using Buffers. Calling read(30) will get you 30 buffers, not 30 bytes!

### StringStream extends DataStream

| Method                  | Callback method   | Returns      | Description
|-------------------------|-------------------|--------------|-------------
| `parse(func, into)`     | `func(chunk):Any` | `DataStream` | Returns the stream passed as `into` or a new instance of DataStream that is fed with anything that is returned by the passed `func`
| `split(regexp)`         | N/A               | `new Self()` | Returns a new instance of stream which is split by ocurrences of the passed regexp or string.
| `match(regexp)`         | N/A               | `new Self()` | Returns a new instance of stream fed by all the matches from the specified regexp.

Remeber: this is an Object stream - even though you're using Strings. Calling read(30) will get you 30 strings, not 30 bytes!

### MultiStream extends EventEmitter

A MultiStream is a number of streams that can be muxed together.

| Method                  | Returns            | Description
|-------------------------|--------------------|-------------
| `map(func)`             | `new Self()`       | Returns a new instance of MultiStream with mapped streams array.
| `filter(func)`          | `new Self()`       | Returns a new instance of MultiStream with filtered streams array.
| `mux()`                 | `new DataStream()` | Returns a new DataStream consisting of all the chunks from all the streams muxed into a single DataStream.
| `add(stream)`           | `this`             | Appends an additional stream to the MultiStream
| `remove(stream)`        | `this`             | Removes the specified stream from MultiStream

## Browserifying

Scramjet works in the browser too, there's a nice, self-contained sample in here, just run it:

```bash
    git clone https://github.com/MichalCz/scramjet.git
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

If you want to help and be part of the Scramjet team, please reach out to me, MichalCz on Github or email me: scramjet@signicode.com.
