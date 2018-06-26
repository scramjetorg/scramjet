#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = async (test) => {
    test.expect(1);

    let x = new DataStream();

    x.write(1);
    x.write(2);
    x.write(3);

    setTimeout(() => {
        x.write(4);
        x.write(5);

        setTimeout(() => {
            x.write(6);
            x.end(7);
        }, 450);
    }, 50);

    const out = await x.timeBatch(100, 2)
        .toArray();

    test.deepEqual([[1,2],[3,4,],[5],[6,7]], out, "Should output items in specific time");
    test.done();
};
