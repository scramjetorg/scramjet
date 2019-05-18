#!/usr/bin/env node
// module: data-stream, method: flatMap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = {
    async func(test) {
        test.expect(3);

        const stream = DataStream.fromArray([1, 2, 3]);

        let i = 0;
        await stream.consume(
            x => test.equals(x, ++i, "Consumes items by running the passed function")
        );

        test.done();
    },
    async generator(test) {
        test.expect(2);

        let agen;
        try {
            agen = require("./lib/async-consumer");
        } catch(e) {
            test.ok("Async iterators not supported");
            return test.done();
        }

        const stream = DataStream
            .fromArray([77, 23, 34])
        ;

        const data = {};
        await stream.consume(agen, data);

        test.equals(data.a, 77, "Should consume items");
        test.equals(data.b, 23, "Should consume items");

        test.done();
    }
};
