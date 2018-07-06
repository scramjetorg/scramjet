#!/usr/bin/env node
// module: data-stream, method: map

const { DataStream } = require("../");

exports.test = {
    async whenWrote(test) {
        const stream = new DataStream({highWaterMark: 1});

        let ord = 0;
        const prm = [
            stream.whenWrote({x:1}).then(() => test.equals(ord++, 0, "Should resolve immediately")),
            stream.whenWrote({x:2}).then(() => test.equals(ord++, 1, "Should resolve before reading"))
        ];

        await new Promise(res => {
            process.nextTick(async () => {
                test.deepEqual(await stream.whenRead(), {x:1}, "Should read first written");
                ord++;
                res();
            });
        });
        await Promise.all(prm);

        test.done();
    },
    whenRead(test) {

        test.done();
    },
    whenEnd(test) {

        test.done();
    },
    whenError(test) {

        test.done();
    }
};

exports.log = console.log.bind(console);
