#!/usr/bin/env node
// module: data-stream, method: map

const { DataStream } = require("../../");

exports.stream = () => DataStream.fromArray([1, 2, 3, 5, 4])
    .while(x => x < 5);

// ------- END EXAMPLE --------

exports.test = async (test) => {
    test.expect(1);

    const res = await exports.stream().toArray();
    test.deepEquals(res, [1,2,3], "Stream should not contain any items past the one that doesn't fulfill condition");
    test.done();
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
