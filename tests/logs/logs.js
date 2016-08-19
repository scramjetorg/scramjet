#!/usr/bin/env node
// Pump all the tomcat log files to a merge function then filter and stuff...

var argv = require('yargs')
    .usage('Usage: $0 [options] [source1] [source2] ...')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .demand(1)
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2016 Signicode')
    .argv;

const fs = require("fs");
const path = require("path");
const ArrayWithSortedSet = require("../../lib/util/array-with-sorted-set");

Promise.all(argv._.map(
    (source) => new Promise((solve, ject) => {
        const stream = fs.createReadStream(path.resolve(process.cwd(), source));
        const out = (err) => {
            stream.removeListener("open", out);
            stream.removeListener("error", out);

            if (err instanceof Error)
                ject(err);
            else
                solve(stream);
        };
        stream.on("open", out);
        stream.on("error", out);
    })
)).then(
    (openStreams) => {
        return new MergedStream(openStreams.map(
            (stream) => stream.pipe(new StringStream("utf-8"))
                .split(/[\n^$](?=\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3,}\s)/g)
                .parse((logline) => {
                    const ret = {};
                    log.replace(/^([\s\d\-+\:,]+)\s+\[([^\]]+)\]\s+([^\s]+)\s+([^\-]+)\s+-\s*([^]*)$/m,
                        (all, ts, origin, level, source, message) => {
                            ret.ts = new Date(ts.replace(/,\d+$/, ".$1Z"));
                            ret.origin = origin;
                            ret.level = level;
                            ret.source = source;
                            ret.message = message;
                        }
                    );
                    return ret;
                })
        )).mux(
            (a, b) => a.ts - b.ts,
            (sorted, streams, callback) => callback(sorted.shift())
        );
    }
);
