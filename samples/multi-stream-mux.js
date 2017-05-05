#!/usr/bin/env node
// module: multi-stream, method: mux

const {MultiStream, DataStream} = require('../');

exports.stream = (arr) => new MultiStream(arr);

exports.test = {
    constr(test) {
        exports.stream([
            DataStream.fromArray([1,3,5,7,9]),
            DataStream.fromArray([0,2,4,6,8])
        ])
            .mux()
            .reduce(
                (acc, i) => acc + i + ",",
                ""
            )
            .then(
                (ref) => {
                    [0,1,2,3,4,5,6,7,8,9].forEach(
                        (num) => test.ok(ref.indexOf(num +',') >= 0, "Item " +num + " is in stream")
                    );
                    test.done();
                }
            );
    },
    addRemove(test) {
        let odd = DataStream.fromArray([1,3,5,7,9]);
        let even = DataStream.fromArray([0,2,4,6,8]);
        let z = exports.stream();

        z
            .mux()
            .reduce(
                (acc, i) => acc + i + ",",
                ""
            )
            .then(
                (ref) => {
                    [0,1,2,3,4,5,6,7,8,9].forEach(
                        (num) => test.ok(ref.indexOf(num +',') >= 0, "Item " +num + " is in stream")
                    );
                    test.done();
                }
            );

        z.add(odd).add(even);
    }
};

exports.log = console.log.bind(console);
