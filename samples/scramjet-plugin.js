#!/usr/bin/env node
// method: plugin

let xSymbol = Symbol("x");
let cnt = 0;

let addX = function addX(test) { test.equals(this[xSymbol], xSymbol, "this must point to the stream context"); return this; };

const {DataStream, StringStream} = require("../").plugin(
    {
        DataStream: {
            constructor() {
                cnt++;
                this[xSymbol] = xSymbol;
            },
            addX
        },
        StringStream: {
            constructor({xSymbol: optionsX}) {
                if (optionsX === xSymbol) {
                    exports.log("abc");
                    return {
                        x: xSymbol
                    };
                } else {
                    exports.log("cba");
                }
            }
        }
    }
);

exports.stream = () => DataStream.fromArray([1,2,3,4,5,6,7,8,9,10]);
exports.stream2 = () => new StringStream({xSymbol});

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(5);
    cnt = 0;

    const stream = exports.stream();
    const stream2 = exports.stream2();

    test.equals(stream[xSymbol], xSymbol, "DataStream must be extended");
    test.equals(stream2.x, xSymbol, "StringStream must be replaced by constructor");
    test.equals(stream.addX, addX, "DataStream must have the plugin method");
    test.equals(cnt, 2, "DataStream constructor must be called before StringStream");
    stream.addX(test);

    test.done();

};

exports.log = console.log.bind(console);
