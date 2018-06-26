#!/usr/bin/env node
// module: data-stream, method: map

const DataStream = require("../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .map(
        (num) => ({val: num})
    )
    .tap()
;

// ------- END EXAMPLE --------

exports.test = (test) => {

    test.expect(4);

    const returned = exports.stream();

    returned.once("data", (num) => test.equals(num.val, 1, "Original stream items should not be affected"));

    returned
        .map(
            (obj) => ({num: obj.val})
        )
        .once(
            "data", (obj) => {
                test.ok(typeof obj === "object", "Mapped data must be mapped");
                test.ok("num" in obj, "Mapped data must be mapped");
                test.equals(obj.num, 1, "Mapped stream must be in the same order");
            }
        )
        .on(
            "end", () => test.done()
        );

};

exports.log = console.log.bind(console);
