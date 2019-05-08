#!/usr/bin/env node
// module: data-stream, method: filter

const {DataStream} = require("../../");
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

exports.test = {
    async with_serizalizer(test) {
        test.expect(1);

        const out = await DataStream
            .from([1,2,3])
            .stringify(x => `=${x},`)
            .toArray();

        test.strictEqual(out.join(""), "=1,=2,=3,");
        test.done();
    },
    async no_serializer(test) {
        test.expect(1);

        const out = await DataStream
            .from([1,{toString(){ return "xxx"; }},3])
            .stringify()
            .toArray();

        test.strictEqual(out.join(""), "1xxx3");
        test.done();
    }
};
