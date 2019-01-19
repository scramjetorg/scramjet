#!/usr/bin/env node
// module: data-stream, method: flatMap

const { DataStream, NumberStream } = require("../../");
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

const stream = (v) => {
    const x = new DataStream();

    x.write(v + 1);

    setTimeout(() => {
        x.write(v + 2);

        setTimeout(() => {
            x.end(v + 3);
        }, 20);
    }, 20);

    return x;
};

exports.test = {
    async stream(test) {
        test.expect(1);

        const out = await (
            NumberStream.fromArray([10,20,30])
                .into(
                    async (out, chunk) => out.pull(stream(chunk)),
                    new DataStream
                )
                .toArray()
        );

        test.deepEqual(out, [11, 21, 31, 12, 22, 32, 13, 23, 33], "Accumulated all entries and ended");
        test.done();
    },
    // async generator(test) {
    //     test.expect(1);

    //     const out = await (
    //         NumberStream.fromArray([10,20,30])
    //             .into(
    //                 async (out, chunk) => out.pull(function* (v) {
    //                     yield v + 1;
    //                     yield new Promise(res => setTimeout(res, 10)).then(() => v + 2);
    //                     yield new Promise(res => setTimeout(res, 20)).then(() => v + 3);
    //                 }, chunk),
    //                 new DataStream
    //             )
    //             .toArray()
    //     );

    //     test.deepEqual(out, [11, 21, 31, 12, 22, 32, 13, 23, 33], "Accumulated all entries and ended");
    //     test.done();
    // }
};
