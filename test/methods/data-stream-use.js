#!/usr/bin/env node
// module: data-stream, method: use

const DataStream = require("../../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10]);

// ------- END EXAMPLE --------

exports.test = {
    sync(test) {
        test.expect(4);

        const stream = exports.stream();
        const ref = Symbol("test");

        let called = false;

        const out = stream.use(
            (innerStream, arg) => {
                test.equals(stream, innerStream, "Must be called with self as first argument");
                test.equals(ref, arg, "Additional arguments must be passed");
                called = true;
                return arg; // this should throw error
            },
            ref
        );

        test.equals(ref, out, "Must pass return value");
        test.ok(called, "Must be called and executed synchronously");
        test.done();
    },
    async async(test) {
        test.expect(5);

        const stream = exports.stream();
        const ref = Symbol("test");

        let called = false;

        const out = stream.use(
            async (innerStream, arg) => {
                test.equals(stream, innerStream, "Must be called with self as first argument");
                test.equals(ref, arg, "Additional arguments must be passed");
                called = true;
                await new Promise(res => process.nextTick(res));
                return innerStream.map(x => x - 1);
            },
            ref
        );

        test.ok(out instanceof DataStream, "Must return a stream synchonously");
        test.ok(called, "Must be called and executed synchronously"); // TODO: but rethink this, because why not async before resuming the stream?
        test.deepEqual(await out.toArray(), [0,1,2,3,4,5,6,7,8,9], "Must carry the items from an async stream");
        test.done();
    },
    async generator(test) {
        test.expect(6);

        const stream = exports.stream();
        const ref = Symbol("test");

        let called = false;

        const out = stream.use(
            function* (innerStream, arg) {
                test.equals(stream, innerStream, "Must be called with self as first argument");
                test.equals(ref, arg, "Additional arguments must be passed");
                called = true;

                yield Promise.all([
                    innerStream.whenRead(),
                    new Promise(res => process.nextTick(res))
                ]).then(([x]) => x);

                innerStream.whenRead().catch(() => 0);

                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
                yield innerStream.whenRead();
            },
            ref
        );

        test.ok(out instanceof DataStream, "Must return a stream synchonously");
        test.ok(!called, "Must not be called and executed synchronously");
        test.deepEqual(await out.toArray(), [1,3,4,5,6,7,8,9,10], "Must carry the items from an async stream");
        test.ok(called, "Must be called and executed asynchronously");
        test.done();
    }
};
