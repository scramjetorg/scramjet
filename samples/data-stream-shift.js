#!/usr/bin/env node
// module: data-stream, method: pop

let popped;

const DataStream = require('../').DataStream;

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10])
    .pop(2, (p) => {                                                            // pop 2 items
        popped = p;
    })
;

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(3);

    popped = null;

    exports.stream()
        .once("data", (obj) => {
            test.ok(Array.isArray(popped), "Popped data is an array");
            test.equals(popped.length, 2, "All data was parsed properly");
            test.notEqual(popped[0], obj, "Pop removed data from the item");
            test.done();
        })
        .on("error", (e) => {
             console.error("Error", e && e.stack);
             test.ok(0, "Error should not occur");
         })
    ;

};
