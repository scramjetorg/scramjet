#!/usr/bin/env node
// module: data-stream, method: shift

let shifted;

const DataStream = require("../").DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .shift(2, (p) => {                                                            // shift 2 items
        shifted = p;
    })
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(3);

    shifted = null;

    exports.stream()
        .once("data", (obj) => {
            test.ok(Array.isArray(shifted), "Shifted data is an array");
            test.equals(shifted.length, 2, "All data was parsed properly");
            test.notEqual(shifted[0], obj, "Shift removed data from the item");
            test.done();
        })
        .on("error", (e) => {
            console.error("Error", e && e.stack);
            test.ok(0, "Error should not occur");
        })
    ;

};
