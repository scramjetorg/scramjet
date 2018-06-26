#!/usr/bin/env node
// module: buffer-stream, method: breakup

const BreakupNum = 13;

exports.stream = () =>
    require("./buffer-stream-constructor")
        .stream()                                                                   // get BufferStream from another example
        .breakup(BreakupNum);                                                       // breakup into 13-byte chunks (remember! this is an Object stream!)

// ------- END EXAMPLE --------

exports.test = (test) => {
    test.expect(1);

    let maxDataLength = 0;
    exports.stream()
        .on("data", (data) => {
            exports.log("data.length should be at most 13 and is", data.length);
            maxDataLength = Math.max(maxDataLength, data.length);
        })
        .on("end", () => {
            test.equals(maxDataLength, BreakupNum, "Data never exceeded " + BreakupNum + " chars");
            test.done();
        })
        .on("error", (e) => { console.error("Error", e && e.stack); test.ok(0, "Error should not occur"); })
    ;
};
exports.log = console.log.bind(console);
