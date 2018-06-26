#!/usr/bin/env node
// module: data-stream, method: filter

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

const dat = [1,2,3,4];
const iter = (function* () { yield* dat; })();
exports.stream = () => DataStream.fromIterator(iter);

exports.test = (test) => {
    test.expect(6);

    const returned = exports.stream();
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

};
