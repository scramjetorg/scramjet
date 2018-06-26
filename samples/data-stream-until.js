#!/usr/bin/env node
// module: data-stream, method: map

const { DataStream } = require("../");

exports.stream = () => DataStream.fromArray([1, 2, 3, 5, 4])
    .until(x => x === 5);

// ------- END EXAMPLE --------

exports.test = async (test) => {
    test.expect(1);

    const res = await exports.stream().toArray();
    test.deepEquals(res, [1,2,3], "Stream should not contain any items past the one that fulfills the condition");
    test.done();
};

exports.log = console.log.bind(console);
