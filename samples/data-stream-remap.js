#!/usr/bin/env node
// module: data-stream, method: remap

const DataStream = require('../').DataStream;
exports.log = console.log.bind(console);

DataStream.fromArray([[1,2,20], [3,4,21], [5,6,22], [7,8,23], [9,10,24]])
    .on("end", () => exports.log("end1"))
    .remap((emit, item) => {
        emit(item[0]);
        return new Promise((s) => (process.nextTick(() => {
            emit(item[1]);
            emit(item[2]);
            s();
        })));
    })
    .filter(
        (item) => item < 20
    )
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
