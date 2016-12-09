#!/usr/bin/env node
// module: data-stream, method: remap

const DataStream = require('../').DataStream;

let ref;
DataStream.fromArray([[1,2], [3,4], [5,6], [7,8], [9,10]])
    .on("end", () => exports.log("end1"))
    .debug((stream) => {
        console.log((ref = stream)._writableState.ended);
    })
    .remap((emit, item) => {
        emit(item[0]);
        return new Promise((s) => (process.nextTick(() => {
            emit(item[1]);
            s();
        })));
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

exports.log = console.log.bind(console);
