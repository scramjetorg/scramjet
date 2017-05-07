#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require('../').DataStream;
exports.log = console.log.bind(console);

DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .batch(3)
    .each(console.log)
    .reduce(
        (acc, item) => (acc.push(item), acc),
        []
    )
    .then(
        (ret) => console.log(ret)
    )
    .catch(
        (e) => console.error(e)
    );
