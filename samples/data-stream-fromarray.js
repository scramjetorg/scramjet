#!/usr/bin/env node
// module: data-stream, method: filter

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

const dat = [1,2,3,4];
exports.stream = () => DataStream.fromArray(dat);

exports.test = (test) => {
    test.expect(5);

    const returned = exports.stream();
    dat.push(5);

    returned
        .on("data", (num) => {
            test.equals(num, dat.shift(), "Items should be pushed in order " + num);
        })
        .on("end", () => {
            test.equals(dat.length, 1, "All items must be pushed and items should not be affected by any modification of the original Array");
            test.done();
        });

};
