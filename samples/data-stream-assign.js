#!/usr/bin/env node
// module: data-stream, method: assign

const DataStream = require("../").DataStream;

exports.stream = () => {
    const arr = [1,2,3,4,5,6,7,8,9,10].map(
        (num) => ({val: num})
    );
    const ret = DataStream.fromArray(arr)
        .tap();
    ret.org = arr;
    return ret;
};

// ------- END EXAMPLE --------

exports.test = {
    object_argument: (test) => {
        test.expect(5);

        const returned = exports.stream();

        returned.once("data", (num) => test.equals(num.val, 1, "Original stream items should not be affected"));

        const x = {abc: "t"};

        returned
            .assign(x)
            .once(
                "data", (obj) => {
                    try {
                        test.ok("abc" in obj, "Assigned data must be mapped");
                        test.equals(obj.abc, "t", "Assigned object properties must be mapped");
                        test.notEqual(obj, returned.org[0], "Assigned object must be newly created");
                        test.notEqual(obj, x, "Assigned object must not be equal to the passed one");
                    } catch(e) {
                        test.fail(true, "Should not throw error: " + e.stack);
                    }
                }
            )
            .on(
                "end", () => test.done()
            )
            .resume();

    },
    function_argument: (test) => {

        test.expect(4);

        const returned = exports.stream();

        returned.once("data", (num) => test.equals(num.val, 1, "Original stream items should not be affected"));

        returned
            .assign(
                ({val}) => ({num: val})
            )
            .once(
                "data", (obj) => {
                    test.ok("num" in obj, "Assigned data must be mapped");
                    test.equals(obj.num, 1, "Assigned stream must be in the same order");
                    test.notEqual(obj, returned.org[0], "Assigned object must be newly created");
                }
            )
            .on(
                "end", () => test.done()
            );
    }
};

exports.log = console.log.bind(console);
