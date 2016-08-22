#!/usr/bin/env node
// Pump all the tomcat log files to a merge function then filter and stuff...

var argv = require('yargs')
    .usage('Usage: $0 [options] [source1] [source2] ...')
    .demand(1)
    .options("origin", {
        alias: "o",
        array: true,
        describe: "filter by log origin(s)"
    })
    .options("level", {
        alias: "l",
        array: true,
        describe: "filter by log level(s)"
    })
    .options("source", {
        alias: "s",
        array: true,
        describe: "filter by log source(s)"
    })
    .options("range", {
        alias: "r",
        array: true,
        describe: "date between"
    })
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2016 Signicode')
    .argv;

const fs = require("fs");
const path = require("path");

const range = argv.range.map(
    (r) => range.split(/:/).map(
        (ts, i) => {
            if (!ts.match(/^\d/)) {
                return new Date(+ts);
            } else if (ts) {
                return new Date(ts);
            } else {
                return (i - 0.5) * Infinity;
            }
        }
    )
);
const filters = [
    argv.origin && argv.origin.length && argv.origin.length === 1 ? (item) => argv.origin[0] === item.origin : (item) => argv.origin.indexOf(item.origin) >= 0,
    argv.source && argv.source.length && argv.source.length === 1 ? (item) => argv.source[0] === item.source : (item) => argv.source.indexOf(item.source) >= 0,
    argv.level && argv.level.length && argv.level.length === 1 ? (item) => argv.level[0] === item.level : (item) => argv.level.indexOf(item.level) >= 0,
    range && range.length && (item) => {
        for (const r of range) {
            if (item.ts > r[0] && item.ts < r[1])
                return true;
        }
        return false;
    }
].filter((f) => f).reduce(
    (o, f) => (i) => f(i) && o(i),
    () => true
);

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
    (openStreams) => new MultiStream(openStreams.map(
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
        ))
).then(
    (streams) => streams.each(
        (stream) => stream.filter(filters)
    )
).then(
    (streams) => {
        return new MergedStream(streams).mux(
            (a, b) => a.ts - b.ts
        );
    }
);
