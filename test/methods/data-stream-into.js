#!/usr/bin/env node
// module: data-stream, method: remap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = async (test) => {
    test.expect(1);

    const remapped = await DataStream.fromArray([[1,2,20], [3,4,21], [5,6,22], [7,8,23], [9,10,24]])
        .setOptions({maxParallel: 1})
        .into(async (out, item) => {
            exports.log("it", item);
            await out.whenWrote(item[0]);
            return new Promise(s => process.nextTick(() => {
                out.whenWrote(item[1]).then(s);
            }));
        }, new DataStream)
        .toArray();

    exports.log("r", remapped);

    test.deepEqual(remapped, [1,2,3,4,5,6,7,8,9,10], "Emits items as programmed");
    test.done();
};
