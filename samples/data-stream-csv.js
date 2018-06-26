#!/usr/bin/env node
// module: data-stream, method: JSONStringify

const {StringStream, DataStream} = require("../");
const fs = require("fs");

exports.log = console.log.bind(console);

exports.test = async (test) => {
    test.expect(2);
    try {
        const withEol = await fs.createReadStream(__dirname + "/data/test.csv")
            .pipe(new StringStream("utf-8"))
            .CSVParse({header: true, newline: "\r\n"})
            .toArray();

        test.deepEqual(withEol, [
            { col1: "a a1,", col2: "20", col3: "0" },
            { col1: "a a2,", col2: "30", col3: "0" },
            { col1: "a a3,", col2: "40", col3: "0" },
            { col1: "a a4,", col2: "50", col3: "0" },
            { col1: "a a5,", col2: "60", col3: "0" }
        ], "CSV should be read");


        const out = DataStream.fromArray(withEol)
            .CSVStringify({newline: "\r\n", header: true});

        const aggr = await out.toArray();
        test.equals(aggr.join(""), "col1,col2,col3\r\n\"a a1,\",20,0\r\n\"a a2,\",30,0\r\n\"a a3,\",40,0\r\n\"a a4,\",50,0\r\n\"a a5,\",60,0\r\n", "CSV should be written");
    } catch(e) {
        test.ok(false, "Should not throw: " + e.stack);
    }

    test.done();
};
