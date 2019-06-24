#!/usr/bin/env node
// module: data-stream, method: tap

const DataStream = require("../../").DataStream;
exports.log = process.env.TEST_VERBOSE === 1 ? console.log.bind(console) : () => 0;

const dat = [1, 2, 3, 4];
exports.stream = () => DataStream.fromArray(dat);

exports.test = {
    async finite(test) {
        test.expect(3);
        const stream = DataStream.fromArray([1,2,3,4])
            .keep(3);
        stream.on("end", () => test.ok(true, "Stream should end"));

        const arr1 = await stream.toArray();
        test.deepEqual(arr1, [1, 2, 3, 4], "Should accumulate all chunks as if nothing changed");

        const arr2 = await stream.rewind().toArray();
        test.deepEqual(arr2, [2, 3, 4], "Should return a stream that contains last <n=3> items");

        test.done();
    },
    async infinite(test) {
        test.expect(2);

        const stream = DataStream.fromArray([1, 2, 3, 4])
            .keep();

        const arr1 = await stream.toArray();
        const arr2 = await stream.rewind().toArray();

        test.deepEqual(arr1, [1, 2, 3, 4], "Should accumulate all chunks as if nothing changed");
        test.deepEqual(arr2, [1, 2, 3, 4], "Should return a stream that contains all streamed items");

        test.done();
    },
    async rewindAndFlatmap(test) {

        const stream = DataStream.from([[1,2],[3,4]]).keep();

        test.deepEqual(await Promise.all([
            stream.rewind().flatMap(async x => x).toArray(),
            stream.run()
        ]), [[1,2,3,4], undefined], "Runs initially");
        test.deepEqual(await stream.rewind().flatMap(async x => x).toArray(), [1,2,3,4], "Runs a number of times");
        test.deepEqual(await stream.rewind().flatMap(async x => x).toArray(), [1,2,3,4], "Runs a number of times");

        test.done();

    },
    async justRewind(test) {
        test.expect(2);

        const stream = DataStream.fromArray([1, 2, 3, 4]).keep();

        const arr1 = await stream.rewind().toArray();
        const arr2 = await stream.rewind().toArray();

        test.deepEqual(arr1, [1, 2, 3, 4], "Should once return a stream that contains all streamed items");
        test.deepEqual(arr2, [1, 2, 3, 4], "Should twice return a stream that contains all streamed items");

        test.done();
    }
};
