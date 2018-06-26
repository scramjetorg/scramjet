#!/usr/bin/env node
// module: data-stream, method: filter

const DataStream = require("../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .filter((num) => num % 2 === 0)                                             // return true for even numbers
;

exports.test = {
    normal: (test) => {

        test.expect(2);

        const returned = exports.stream();

        returned
            .once("data", (num) => {
                test.equals(num, 2, "First item must be even");
            })
            .toArray()
            .then(
                (ret) => {
                    test.equals(ret.toString(), "2,4,6,8,10", "Odd items need to be filtered out");
                    test.done();
                }
            );
    },
    filterAll: (test) => {

        test.expect(1);
        DataStream.fromArray([1,2,3,4,5])
            .filter(() => 0)
            .map(() => test.ok(false, "No data should be outputted even on merged transforms"))
            .on("data", () => test.ok(false, "No data should be emitted"))
            .on("end", () => {
                test.ok(true, "Stream should end");
                test.done();
            });

    }
};

exports.log = console.log.bind(console);
