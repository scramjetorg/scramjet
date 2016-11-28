const MultiStream = require('../').MultiStream;
const DataStream = require('../').DataStream;
const EventEmitter = require('events').EventEmitter;

const getStream = (n, z) => {
    z = z || 100;
    const ret = new DataStream();
    ret.len = z;
    ret.init = n;
    let cnt = 0;
    for (let i = 0; i < z; i++)
        ret.write({val: +(cnt++ + n)});
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
