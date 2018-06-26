#!/usr/bin/env node
// module: data-stream, method: group

const {DataStream, MultiStream} = require("../");

exports.stream = () =>
    DataStream.fromArray([0,1,2,3,4,5,6,7,8,9,10,11,12])             // group odd and even numbers in separate threads
;

exports.test = {
    oneToOne(test) {
        let str = exports.stream()
            .group((item) => "item" + item % 2);

        test.expect(3);
        test.ok(str instanceof MultiStream, "Returns MultiStream");
        let i = 0;
        str
            .on("error", (e) => console.error(e && e.stack))
            .map(
                (s) => s.map((chunk) => {
                    s.strId = s.strId || ("st" + i++);
                    return {
                        strId: s.strId,
                        chunk
                    };
                })
            )
            .then(
                (ms) => ms
                    .mux()
                    .accumulate(
                        (acc, item) => {
                            (acc[item.strId] = acc[item.strId] || []).push(item.chunk);
                        }, {}
                    )
                    .catch(
                        (e) => exports.log(e)
                    )
            )
            .then(
                (arr) => {
                    test.equals("" + arr.st0, "0,2,4,6,8,10,12", "First stream accumulates even items");
                    test.equals("" + arr.st1, "1,3,5,7,9,11", "Second stream accumulates odd items");
                    test.done();
                }
            );
    },
    oneToMany(test) {
        let str = exports.stream()
            .separate((item) => !(item % 6) ? ["2", "3"] : !(item % 3) ? "3" : !(item % 2) ? "2" : "1" );

        test.expect(4);
        test.ok(str instanceof MultiStream, "Returns MultiStream");
        let i = 0;
        str
            .on("error", (e) => console.error(e && e.stack))
            .map(
                (s) => s.map((chunk) => {
                    s.strId = s.strId || ("st" + i++);
                    return {
                        strId: s.strId,
                        chunk
                    };
                })
            )
            .then(
                (ms) => ms
                    .mux()
                    .accumulate(
                        (acc, item) => {
                            (acc[item.strId] = acc[item.strId] || []).push(item.chunk);
                        }, {}
                    )
                    .catch(
                        (e) => exports.log(e)
                    )
            )
            .then(
                (arr) => {
                    test.equals("" + arr.st0, "0,2,4,6,8,10,12", "Divisible by 2");
                    test.equals("" + arr.st1, "0,3,6,9,12", "Divisible by 3");
                    test.equals("" + arr.st2, "1,5,7,11", "Last one accumulated the rest");
                    test.done();
                }
            );
    }

};

exports.log = console.log.bind(console);
