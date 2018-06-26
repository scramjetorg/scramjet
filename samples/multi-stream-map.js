#!/usr/bin/env node
// module: multi-stream, method: map

const {MultiStream, DataStream} = require("../");

exports.stream = () =>
    new MultiStream([DataStream.fromArray([0,1,2,3,4,5,6,7,8,9]), DataStream.fromArray([10,11,12,13,14,15,16,17,18,19])])
        .map((str) => str.filter(i => i % 2))
;

exports.test = (test) => {

    const multi = exports.stream();

    multi.then(
        (multi) => Promise.all([
            multi.streams[0].reduce((acc, i) => acc + i + ",", ""),
            multi.streams[1].reduce((acc, i) => acc + i + ",", "")
        ])
            .then(([lo, hi]) => {
                test.equals("1,3,5,7,9,", lo, "lo must aggreagate all items");
                test.equals("11,13,15,17,19,", hi, "hi must aggreagate all items");
                test.done();
            })
            .catch(
                () => 0
            )
    );

};

exports.log = console.log.bind(console);
