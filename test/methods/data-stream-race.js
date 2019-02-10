#!/usr/bin/env node
// module: data-stream, method: batch

const {DataStream} = require("../../");

exports.test = async (test) => {
    const stream = DataStream.from([1,2,3,4]);

    const arr = await (
        stream
            .all([
                x => x+1,
                x => x+2
            ])
            .toArray()
    );

    test.deepEquals(arr, [[2,3],[3,4],[4,5],[5,6]]);
    test.done();
};

exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;
