const MultiStream = require('../../').MultiStream;
const DataStream = require('../../').DataStream;
const EventEmitter = require('events').EventEmitter;

const getStream = (n, z, k) => {
    z = z || 100;
    k = k || 1;
    const ret = new DataStream();
    ret.len = z;
    ret.init = n;
    let cnt = 0;
    for (let i = 0; i < z; i++)
        ret.write({val: +(k * cnt++ + n)});
    process.nextTick(() => ret.end());
    return ret;
};

const accumulate = (stream) => {
    let ret = [];
    return new Promise((s, j) => {
        stream.on("data", (i) => {
            ret.push(i);
        });
        stream.once("end", () => s(ret));
        stream.once("error", (e) => j(e));
    });
};

module.exports = {
    test_construct(test) {
        test.doesNotThrow(() => {
            new MultiStream();
        }, null, "MultiStream can be constructed without any arguments");
        test.doesNotThrow(() => {
            new MultiStream("0123456789".split("").map(
                (n) => getStream(n)
            ));
        }, null, "MultiStream can be constructed a list of streams");
        test.ok(new MultiStream() instanceof EventEmitter, "MultiStream extends EventEmitter");
        test.done();
    },
    test_mux(test) {
        const streams = [
            getStream(10, 10, 1),
            getStream(20, 10, 1)
        ];

        const mux = new MultiStream(streams).mux();
        test.ok(mux instanceof DataStream, "Returns DataStream instance");

        mux.accumulate(
            (acc, item) => acc.push(item.val),
            []
        ).then(
            (arr) => {
                test.equals(arr.length, 20, "Accumulates all chunks from both streams");
                test.notEqual(arr.indexOf(11), -1, "Contains chunks from first stream");
                test.notEqual(arr.indexOf(21), -1, "Contains chunks from second stream");
                test.done();
            }
        );
    },
    test_mux_cmp(test) {
        test.expect(5);

        const streams = [
            getStream(10, 10, 3),   // [10, 13, 16, 19, 22, 25, 28, 31, 34, 37]
            getStream(20, 10, 2)    // [20, 22, 24, 26, 28, 30, 32, 34, 36, 38]
        ];
        const lastStream = getStream(30, 10, 1);     // [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]

        const toMux = new MultiStream(streams);
        toMux.add(lastStream);

        const mux = toMux.mux((a, b) => a.val - b.val);
        mux.on("error", () => test.fail(true, "Should not error!"));

        process.once(
            'unhandledRejection',
            (reason) => console.log('Unhandled rejection: ' + (reason && reason.stack), test.fail(1, "Unhandled rejection"))
        );

        mux.accumulate(
            (acc, item) => acc.push(item.val),
            []
        ).then(
            (arr) => {
                test.equals(arr[0], 10, "Stream items must be merged in");
                test.equals(arr[4], 20, "Stream items must be merged in");
                test.equals(arr[5], 22, "Stream items must be merged in");
                test.equals(arr.length, 30, "All items should be consumed");
                test.equals(arr[14], 31, "Stream added after calling constructor should be taken into account");
                test.done();
            }
        ).catch(
            (reason) => console.log('Thrown: ' + reason.stack, test.fail(1, "Unhandled rejection"))
        );
    },
    test_map(test) {
        test.expect(3);
        const streams = [1,3,5].map((n) => getStream(n, 3));
        test.doesNotThrow(() => {
            new MultiStream(streams)
                .map(
                    (stream) => stream.map((n) => n.val + 1)
                )
                .then(
                    (ms) => {
                        test.ok(ms instanceof MultiStream, "Returns MultiStream (async)");
                        return accumulate(ms.mux());
                    }
                )
                .then((acc) => {
                    test.equals(acc.join(""), "246357468", "Outputs the mapped MultiStream");
                    test.done();
                })
                .catch((e) => {
                    test.fail(e, "Does not reject the promise");
                    test.done();
                });
        }, null, "Does not throw error");
    },
    test_filter(test) {
        test.expect(3);
        const streams = [1,2,3].map((n) => getStream(n, 3));
        test.doesNotThrow(() => {
            new MultiStream(streams)
                .filter(
                    (stream) => stream.init % 2
                )
                .then(
                    (ms) => ms.map(
                        (stream) => stream.map((n) => n.val + 1)
                    )
                )
                .then(
                    (ms) => {
                        test.ok(ms instanceof MultiStream, "Returns MultiStream (async)");
                        return accumulate(ms.mux());
                    }
                )
                .then((acc) => {
                    test.equals(acc.join(""), "243546", "Outputs the mapped MultiStream");
                    test.done();
                })
                .catch((e) => {
                    test.fail(e, "Does not reject the promise");
                    test.done();
                });
        }, null, "Does not throw error");
    }
};
