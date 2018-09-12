#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = {
    async static(test) {
        test.expect(6);
        try {
            const acc = await (
                DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
                    .batch(3)
                    .each(
                        (item) => {
                            test.ok("Items except for the last one must be length of 3", item[0] === 10 || item.length === 3);
                        }
                    )
                    .toArray()
            );

            test.ok("Result should be 4 items", acc.length === 4);
            test.ok("Items should be arrays", Array.isArray(acc[0]));
            test.done();
        } catch (e) {
            test.fail(e.stack);
            test.done();
        }
    },
    async asynchronous(test) {
        const out = DataStream.from(function* () {
            let z = 0;
            while (z++ < 1031) {
                yield new Promise(res => setTimeout(res, z%4+3)).then(() => ({z}));
            }
        }).batch(64);

        const ret = await out.toArray();

        test.equals(ret.pop().length, 7);
        test.equals(ret.length, 16);

        ret.forEach(x => {
            test.ok(x[0].z > 0);
            test.equals(x.length, 64);
        });

        test.done();
    }
};

exports.log = console.log.bind(console);
