const DataStream = require('../../').DataStream;

const getStream = () => {
    const ret = new DataStream();
    let cnt = 0;
    for (let i = 0; i < 100; i++)
        ret.write({val: cnt++});
    process.nextTick(() => ret.end());
    return ret;
};

const decorateAsynchronously = (cb, chunk) => new Promise((res) => {
    setTimeout(
        () => (cb(chunk), res(Object.assign({ref: true}, chunk))),
        100+50*(chunk.val%4)
    );
});

const decorateAsynchronouslyWithError = (cb, chunk) => {
    if (chunk.val > 0 && (chunk.val % 22) === 0) {
        return new Promise((res, rej) => {
            setTimeout(() => rej(new Error("Err")), 100);
        });
    } else {
        return decorateAsynchronously(cb, chunk);
    }
};

module.exports = {
    test_ok(test) {
        test.expect(2);
        const a = [];
        getStream()
            .map(decorateAsynchronously.bind(null, () => 0))
            .each((i) => a.push(i))
            .on(
                "end",
                () => {
                    test.equals(a.length, 100, "accumulated all items");
                    test.ok(
                        a[0].val === 0 &&
                        a[1].val === 1 &&
                        a[2].val === 2 &&
                        a[3].val === 3,
                        "Order should be preserved"
                    );
                    test.done();
                }
            )
            .on(
                "error",
                (e) => test.ok(false, "should not fail! " + e)
            );
    },
    test_err(test) {
        test.expect(3);
        getStream()
            .map(decorateAsynchronouslyWithError.bind(null, () => 0))
            .once("error", (e, chunk) => {
                test.ok(true, "Should emit error");
                test.ok(e instanceof Error, "Thrown should be an instance of Error");
                test.equals(chunk.val, 22, "Should error on and pass catch 22... I mean chunk...");
                test.done();
            })
        ;
    }
};
