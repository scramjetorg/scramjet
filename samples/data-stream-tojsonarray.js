#!/usr/bin/env node
// module: data-stream, method: filter

const {DataStream, StringStream} = require('../');   // eslint-disable-line
exports.log = console.log.bind(console);

exports.test = async (test) => {
    test.expect(2);
    const stream = DataStream.fromArray([1,2,3,4])
        .map(a => ({a}))
        .toJSONArray(["{\"abc\":[\n","\n]}"])
    ;

    test.ok(stream instanceof StringStream, "Returns a StringStream");

    const stringRep = (await stream.toArray()).join("");
    const arr = JSON.parse(stringRep);

    test.deepEqual({abc:[{"a":1},{"a":2},{"a":3},{"a":4}]}, arr, "Returns the full JSON array");
    test.done();
};
