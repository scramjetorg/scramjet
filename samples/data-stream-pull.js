#!/usr/bin/env node
// module: data-stream, method: flatMap

const { DataStream, NumberStream } = require("../");
exports.log = console.log.bind(console);

const stream = (v) => {
    const x = new DataStream();

    x.write(v + 1);

    setTimeout(() => {
        x.write(v + 2);

        setTimeout(() => {
            x.end(v + 3);
        }, 50);
    }, 50);

    return x;
};

exports.test = async (test) => {
    test.expect(1);

    const out = await (
        NumberStream.fromArray([10,20,30])
            .into(
                async (out, chunk) => out.pull(stream(chunk)),
                new DataStream
            )
            .each(
                exports.log
            )
            .toArray()
    );

    test.deepEqual(out, [11, 21, 31, 12, 22, 32, 13, 23, 33], "Accumulated all entries and ended");
    test.done();
};
