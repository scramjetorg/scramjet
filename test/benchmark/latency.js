const {DataStream} = require("../../");

/* eslint-disable node/no-unsupported-features/node-builtins */

DataStream.from(function *(){ let x = 0; while (x++ < 100) yield {x}; })
    .map(({x}) => ({x, ts: process.hrtime.bigint()}))
    .map(({x, ts}) => ({x, ts, latency: process.hrtime.bigint() - ts}))
    .reduce(([sum, cnt], {latency}) => ([
        sum + latency,
        /* eslint-disable-next-line */
        cnt + 1n
    ]), [0n,0n])
    .then(([sum, cnt]) => console.log(sum/cnt));
