#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require('../').DataStream;
exports.log = console.log.bind(console);

let ref;
DataStream.fromArray([{a: 1, b: 2}, {a: 3, b: 4}, {a: 5, b: 6}, {a: 7, b: 8}, {a: 9, b: 10}])
    .on("end", () => exports.log("end1"))
    .debug((stream) => {
        exports.log((ref = stream)._writableState.ended);
    })
    .flatMap((item) => {
        return Object.keys(item)
            .map((k) => k + ':' + item[k]);
    })
    .on("end", () => exports.log("end2"))
    .reduce(
        (acc, item) => (acc.push(item), acc),
        []
    )
    .then(
        (ret) => exports.log(ret)
    )
    .catch(
        (e) => console.error(e)
    );
