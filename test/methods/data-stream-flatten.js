#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

const expected = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    201, 202, 203, 204, 205, 206, 207, 208, 209, 210,
    211, 212, 213, 214, 215, 216, 217, 218, 219, 220,
    301, 302, 303, 304, 305, 306, 307, 308, 309, 310,
    311, 312, 313, 314, 315, 316, 317, 318, 319, 320
];

exports.test = {
    async sync(test) {
        const data = await DataStream.fromArray([1, 101, 201, 301])
            .setOptions({ maxParallel: 4 })
            .map(a => new Promise(s => process.nextTick(s.bind(null, [
                a,
                a + 1,
                a + 2,
                a + 3,
                a + 4,
                a + 5,
                a + 6,
                a + 7,
                a + 8,
                a + 9,
                a + 10,
                a + 11,
                a + 12,
                a + 13,
                a + 14,
                a + 15,
                a + 16,
                a + 17,
                a + 18,
                a + 19,
            ]))))
            .flatten()
            .toArray();

        test.deepEqual(data, expected, "Passes array items into stream");
        test.done();
    },
    async async(test) {
        const data = await DataStream.fromArray([1, 101, 201, 301])
            .setOptions({ maxParallel: 4 })
            .map(a => (async function* () {
                yield a;
                yield a + 1;
                yield a + 2;
                yield a + 3;
                await new Promise(res => setTimeout(res, 50));
                yield a + 4;
                yield a + 5;
                yield a + 6;
                yield a + 7;
                yield a + 8;
                yield a + 9;
                yield a + 10;
                yield a + 11;
                yield a + 12;
                yield a + 13;
                yield a + 14;
                yield a + 15;
                yield a + 16;
                yield a + 17;
                yield a + 18;
                yield a + 19;
            })())
            .flatten()
            .toArray();

        test.deepEqual(data, expected, "Passes array items into stream");
        test.done();
    }
};
