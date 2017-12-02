const {DataStream, StreamWorker} = require('../../');
const hash = require("string-hash");

const iter = (function* () {
    for (i = 0; i < 300; i++) {
        yield {terms: i + 1e6};
    }
})();

const test = DataStream.fromIterator(iter)
//    .each((item) => console.log('pushing', item))
    .distribute(
        item => hash(JSON.stringify(item)),
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
            return {pi};
        }),
    )
    .each((item) => console.log('got back', item))
    .JSONStringify()
    .pipe(process.stdout)
;
