#!/usr/bin/env node
// module: data-stream, method: remap

const DataStream = require("../").DataStream;
exports.log = console.log.bind(console);

exports.test = async (test) => {
    test.expect(1);

    const remapped = await DataStream.fromArray([[1,2,20], [3,4,21], [5,6,22], [7,8,23], [9,10,24]])
        .remap(async (emit, item) => {
            exports.log(item);
            emit(item[0]);
            return new Promise(s => process.nextTick(() => {
                emit(item[1]);
                s();
            }));
        })
        .toArray();

    exports.log("r", remapped);

    test.deepEqual(remapped, [1,2,3,4,5,6,7,8,9,10], "Emits items as programmed");
    test.done();
};
