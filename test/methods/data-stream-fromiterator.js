#!/usr/bin/env node
// module: data-stream, method: filter

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

const getStream = (iter) => DataStream.fromIterator(iter);

const syncIter = (dat) => (function* () { yield* dat; })(dat);
const asyncIter = (dat) => (function* () {
    for (let item of dat)
        yield new Promise(res => res(item));
})();

exports.test = {
    sync(test) {
        test.expect(6);

        const dat = [1,2,3,4];
        const returned = getStream(syncIter(dat));
        dat.push(5);

        const clone = dat.slice();

        returned
            .on("data", (num) => {
                test.equals(num, clone.shift(), "Items should be pushed in order " + num);
            })
            .on("end", () => {
                test.equals(clone.length, 0, "All items must be pushed and items must be affected by any modification of the original Array");
                test.done();
            });
    },
    async asyncIter(test) {
        test.expect(1);
        try {
            const agen = require("./lib/async-iterator");
            const arr = await (getStream(agen(2)).toArray());
            test.deepEqual(arr, [12,22,32,42], "Should iterate asynchronously");
        } catch(e) {
            test.ok("Async iterators not supported");
        }
        test.done();
    },
    async(test) {
        test.expect(6);

        const dat = [1,2,3,4];
        const returned = getStream(asyncIter(dat));
        dat.push(5);

        const clone = dat.slice();

        returned
            .on("data", (num) => {
                test.equals(num, clone.shift(), "Items should be pushed in order " + num);
            })
            .on("end", () => {
                test.equals(clone.length, 0, "All items must be pushed and items must be affected by any modification of the original Array");
                test.done();
            });
    }
};
