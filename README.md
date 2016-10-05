## What does it do?

Scramjet is a powerful, infinitely scalable yet simple framework for transformation and analysis of so called "live data". It is built upon the logic behind three well known javascript array operations - namingly map, filter and reduce. This means that if you've ever performed operations on an Array in JavaScript - you already know Scramjet like the back of your hand.

Thanks to Scramjet you can simply focus on your data, test it on a simple case, on a subset and then, send the processing to the server when you like. You can make constant adjustments and fixes, quickly test and change your assumptions because you don't need a field of servers to run it.

Scramjet doesn't use configs or fixed environments. It's up to your preference to choose the best system for your needs. All you need is bare node.js, your data and those 5 lines of code that are between your given input and your desired outcome!

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

## License and contributions

At this moment Scramjet is released under the terms of GPL-3.

## Help wanted

The project is in it's relative infancy, there's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to me, MichalCz on Github or email me: scramjet@signicode.com.
