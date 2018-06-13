const {DataStream} = require('../../');

const iter = (function* () {
    for (let i = 0; i < 64; i++) {
        yield {terms: i + 1e7};
    }
})();

process.on('unhandledRejection', console.error);

let z = 0;

DataStream.fromIterator(iter)
//    .each((item) => console.log('pushing', item))
    .use(
        (stream) => stream.map((chunk) => {
            let {terms} = chunk;
            let pi = 0
            let k=1
            while (terms != 0) {
                terms--
                pi = pi / 4
                pi = pi + (1 / (   ((2*k)-1) *  (-1)*(Math.pow(-1,k))   ))
                pi = pi * 4
                k++
            }
            return {terms: chunk.terms, pid: process.pid, pi};
        }),
    )
    .JSONStringify()
    .map((x) => (z++ + '>> ' + x))
    .on('error', console.error)
    .on('end', () => exports.log('xx end'))
    .pipe(process.stdout)
;

exports.log = console.log.bind(console);
