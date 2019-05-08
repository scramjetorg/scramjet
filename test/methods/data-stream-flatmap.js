#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = {
    async function_arg(test) {
        const data = await DataStream.fromArray([1, 4, 7, 10])
            .flatMap(a => new Promise(s => process.nextTick(s.bind(null, [a, a+1, a+2]))))
            .toArray();

        test.deepEqual(data, [1,2,3,4,5,6,7,8,9,10,11,12], "Passes array items into stream");
        test.done();
    },
    async iterable_arg(test) {
        test.expect(1);
        const arr = await (
            DataStream.from([1,2])
                .flatMap((init) => ({[Symbol.iterator]: function() {
                    let value = init;
                    return {
                        next() { return (value++ < 3) ? {value, done: false} : {done:true}; }
                    };
                }}), null, -1)
                .toArray()
        );
        test.deepEqual(arr, [2,3,3], "Should flatten asynchronous generator");
        test.done();
    },
    async generator_arg(test) {
        test.expect(1);
        const arr = await (
            DataStream.from([2,3])
                .flatMap(function*(x, y) { yield x+y; yield x+y+1; }, null, -1)
                .toArray()
        );
        test.deepEqual(arr, [1,2,2,3], "Should flatten asynchronous generator");
        test.done();
    },
    async async_generator(test) {
        test.expect(1);
        try {
            const agen = require("./lib/async-iterator");
            const arr = await (DataStream.from([2,3]).flatMap(agen, null, -1).toArray());
            test.deepEqual(arr, [11,12,21,22,31,32,41,42], "Should flatten asynchronous generator");
        } catch(e) {
            test.ok("Async iterators not supported");
        }
        test.done();
    },
    async async_generator_error(test) {
        test.expect(3);
        try {
            const agen = require("./lib/async-iterator");
            const arr = await (
                DataStream
                    .from([2,3])
                    .flatMap(agen, null, 666)
                    .catch(e => test.ok(e instanceof Error, "Expect to catch error"))
                    .toArray()
            );
            test.deepEqual(arr, [678,679,688,689], "Should flatten asynchronous generator up until the handled error");
        } catch(e) {
            test.ok("Async iterators not supported");
        }
        test.done();
    }
};
