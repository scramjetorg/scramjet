#!/usr/bin/env node
// module: data-stream, method: map

const DataStream = require("../../").DataStream;

exports.stream = (cnt = 1010) => DataStream.from(function*() {
    for (let x = 0; x < cnt; x++)
        yield {x};
});

// ------- END EXAMPLE --------

const timeout = Symbol('timeout')
exports.test = {
    async defaultArgs(test) {
        test.expect(6);
        const stream = exports.stream();

        const stacked = stream.stack();

        const outcome = await Promise.race([
            stream.whenEnd(),
            new Promise(res => setTimeout(() => res(timeout), 100))
        ]);

        test.notEqual(outcome, timeout, "stream should end left to it's own devices");
        const out = await stacked.whenRead();
        test.deepEquals(out, {x: 1009}, "last item should be first");

        const rest = await stacked.toArray();
        test.deepEquals(rest[0], {x: 1008}, "should be in order on first element");
        test.deepEquals(rest[1], {x: 1007}, "should be in order on second element");
        test.deepEquals(rest[2], {x: 1006}, "should be in order on third element");
        test.equals(rest.length, 999, "should be default size of 1000 minus the one we read");

        test.done();
    },
    async drop(test) {
        const stream = exports.stream(10);
        const dropped = [];
        const stacked =  stream.stack(9, (...args) => dropped.push(args));

        const outcome = await Promise.race([
            stream.whenEnd(),
            new Promise(res => setTimeout(() => res(timeout), 100))
        ]);
        test.notEqual(outcome, timeout, "stream should end left to it's own devices");

        const out = await stacked.toArray();

        test.deepEquals(out, [ {x: 9}, {x: 8}, {x: 7}, {x: 6}, {x: 5}, {x: 4}, {x: 3}, {x: 2}, {x: 1} ], "Output should be in order");
        test.deepEquals(dropped, [ [{x: 0}] ], "Drop should get dropped items");

        test.done();
    }
    // todo flow control test
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
