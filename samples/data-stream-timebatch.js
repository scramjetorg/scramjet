#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require('../').DataStream;
exports.log = console.log.bind(console);

let x = new DataStream();

x.write(1);
x.write(2);
x.write(3);

setTimeout(() => {
    x.write(4);
    x.write(5);
    x.write(6);
}, 120);

x
    .timeBatch(100, 2)
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
