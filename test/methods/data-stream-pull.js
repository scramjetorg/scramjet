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
            if (v>100) x.raise(new Error("Test"));
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
    async error(test) {
        test.expect(4);

        const out = await (
            NumberStream.fromArray([110,120,130])
                .into(
                    async (out, chunk) => {
                        if (chunk === 130) throw new Error("130");
                        return out.pull(stream(chunk));
                    },
                    new DataStream
                )
                .catch(e => test.ok(e instanceof Error, "Should throw..."))
                .toArray()
        );

        test.deepEqual(out, [111, 121, 112, 122, 113, 123], "Accumulated all entries until error and ended");
        test.done();
    },
    async generator(test) {
        test.expect(1);

        const out = await (
            NumberStream.fromArray([10,20,30])
                .into(
                    async (out, chunk) => out.pull(function* (v) {
                        yield v + 1;
                        yield new Promise(res => setTimeout(res, 10)).then(() => v + 2);
                        yield new Promise(res => setTimeout(res, 20)).then(() => v + 3);
                    }, chunk),
                    new DataStream
                )
                .toArray()
        );

        test.deepEqual(out, [11, 21, 31, 12, 22, 32, 13, 23, 33], "Accumulated all entries and ended");
        test.done();
    }
};
