#!/usr/bin/env node
// module: buffer-stream, method: parse

const BreakupNum = 13;

exports.stream = () =>
    require("./buffer-stream-constructor")
    .stream()                                                                   // get BufferStream from another example
    .breakup(BreakupNum);                                                       // breakup into 13-byte chunks (remember! this is an Object stream!)

exports.test = (test) => {
    test.expect(1);

    let maxDataLength = 0;
    exports.stream
        .on("data", (data) => {
            console.log("data.length should be at most 13 and is", data.length);
            maxDataLength = Math.max(maxDataLength, data.length);
        })
        .on("end", () => {
            test.equals(maxDataLength, BreakupNum, "Data never exceeded " + BreakupNum + " chars");
            test.done();
        })
        .on("error",
            (e) => {
                console.error(e && e.stack);
                test.ok(false, "Should not throw error", e && e.stack);
                process.exit(100);
            }
        );
};
