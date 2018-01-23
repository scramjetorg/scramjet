const {DataStream} = require("../../");

const source = DataStream.fromArray([1,2,3,4,5]).map(v => ({v}));

source.pipe(new DataStream())
    .JSONStringify()
    .pipe(process.stdout);

source.pipe(new DataStream())
    .CSVStringify()
    .pipe(process.stderr);

// ✔ /signicode/scramjet
// 13:43 $ node samples/so-examples/double-pipe.js
// 1
// 2
// {"v":1}
// 3
// {"v":2}
// 4
// {"v":3}
// 5
// {"v":4}
// {"v":5}
