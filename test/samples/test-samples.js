
const scramjet = require("../../");
const fs = require('fs');
const path = require('path');
const nodeunit = require('../lib/reporter');

const matrix = [
    ["buffer", scramjet.BufferStream],
    ["string", scramjet.StrinStream],
    ["multi", scramjet.MultiStream],
    ["data", scramjet.DataStream]
];

console.log("Samples testing");

module.exports = scramjet.fromArray(
    matrix.map(
        (item) => ({
            cls: item[0],
            srcpath:
                path.resolve(__dirname, "../../lib/", item[0] + '-stream.js'),
            Clazz: item[1]
        })
    )
).remap(
    (emit, item) => {
        return fs.createReadStream(item.srcpath)
            .pipe(new scramjet.StringStream())
            .split(scramjet.StringStream.SPLIT_LINE)
            .match(/@example.*\{@link ([^\}]+)(?:\|[^\}]*)?\}/gi)
            .map((match) => new Promise((s) => {
                const file = path.resolve(__dirname, "../", match);
                fs.access(
                    file,
                    (err) => s(Object.assign({
                        err: err,
                        sample: file
                    }, item))
                );
            }))
            .reduce((nutn, item) => {
                let out = null;
                const fname = item.sample.match(/([^-]+).js/)[1];
                if (item.err)
                    return emit(
                        Object.assign({method: fname, test: (test) => {
                            test.ok(false, "Sample for "+fname+" is missing!");
                            test.done();
                        }}, item)
                    );
                try {
                    out = require(item.sample);
                    out.log = () => 1;
                } catch(e) {
                    return emit(
                        Object.assign({method: fname, test: (test) => {
                            test.ok(false, "Test is failed to load: \n" + e && e.stack);
                            test.done();
                        }}, item)
                    );
                }

                return emit(
                    Object.assign({method: fname, test: out.test || ((test) => {
                        test.ok(true, "Sample exists but there's no test.");
                        test.done();
                    })}, item)
                );
            });
    }
).reduce(
    (acc, item) => {
        const base = item.cls + ":" + item.method;
        acc[base] = item.test;
        return acc;
    },
    {}
).then(
    (tests) => new Promise((s, j) => {
        console.log("Running "+Object.keys(tests).length+" tests");
        tests = Object.keys(tests).sort().reduce(
            (acc, key) => (acc[key] = tests[key], acc),
            {}
        );
        nodeunit.run("samples_test", tests, null, (err, outcome) => {
            if (err) {
                return j(err);
            } else {
                err = outcome.filter(
                    (item) => item.error
                );
                if (err.length) {
                    return j(err);
                } else {
                    return s();
                }
            }
        });
    })
).then(
    () => console.log("Tests succeeded!"),
    (e) => {
        console.error("Some tests failed", e);
        process.exit(101);
    }
).catch(
    (error) => {
        console.log("Error", error);
        process.exit(100);
    }
);
