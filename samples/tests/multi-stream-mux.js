#!/usr/bin/env node
// module: multi-stream, method: mux

const MultiStream = require('../../').MultiStream;
const DataStream = require('../../').DataStream;
const StringStream = require('../../').StringStream;

const fsp = require('fs-promise');

const getStream = (n, z, k) => {
    z = z || 100;
    k = k || 1;
    let cnt = 0;

    const getData = (function* getData() {
        while(cnt < z) {
            yield {val: +(k * cnt++ + n)};
        }
    })();

    const ret = new DataStream({
        read() {
            const dat = getData.next();
            this.push(dat.done ? null : dat.value);
        }
    });

    return ret;
};

process.on("unhandledRejection", (e) => console.error("Unhandled: ", e && e.stack));

const ts = Date.now();
Promise.all(
    [0,1,2].map(
        (off, idx, arr) => {
            const fname = __dirname + '/../generated-data/long-stream-' + off + '.jsl';
            const k = arr.length;
            return fsp.ensureFile(fname)
                .then(() => new Promise((res, rej) => fsp.truncate(fname, (err) => err ? rej() : res())))
                .then(() => getStream(off, 10000, k)
                    .stringify((item) => JSON.stringify(item) + '\n')
                )
                .then((stream) => stream.pipe(fsp.createWriteStream(fname)))
                .then((stream) => new Promise((res) => stream.on('finish', res)))
                .then(() => fname);
        }
    )
).then(
    (files) => new MultiStream(
        files.map(
            (file) => fsp.createReadStream(file)
                .pipe(new StringStream())
                .split("\n")
                .filter((a) => a)
                .parse(JSON.parse)
        )
    )
    .mux(
        (a, b) => a.val - b.val
    )
    .stringify(
        (item) => JSON.stringify(item) + '\n'
    )
    .on("end", () => console.log("Took", (Date.now() - ts) + 'ms'))
    .pipe(
        fsp.createWriteStream(__dirname + '/../generated-data/long-stream-out.jsl')
    )

);

exports.log = console.log.bind(console);
