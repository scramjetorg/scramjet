## What does it do?

Scramjet is a powerful, infinitely scalable yet simple framework for transformation and analysis of so called "live data". It is built upon the logic behind three well known javascript array operations - namingly map, filter and reduce. This means that if you've ever performed operations on an Array in JavaScript - you already know Scramjet like the back of your hand.

Scramjet can transform streams both in synchronous and asynchronous fashion thus facilitaing. The transorms can be run in chains

## Example

How about a CSV parser of all the parkings in the city of Wrocław from http://www.wroclaw.pl/open-data/...

```javascript
const request = require("request");
const StringStream = require("../lib/string-stream");

let columns = null;
request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    .parse((line) => line.split(";"))
    .filter((data) => columns === null ? (columns = data, false) : true) // some kind of a "pop function maybe?"
    .map((data) => columns.reduce((acc, id, i) => (acc[id] = data[i], acc), {}))
    .on("data", console.log.bind(console))
```

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

At this moment Scramjet is released under the terms of GPL-3.

## Help wanted

The project is in it's relative infancy, there's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to me, MichalCz on Github or email me: scramjet@signicode.com.
