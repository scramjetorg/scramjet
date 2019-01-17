// refers to https://stackoverflow.com/questions/54214327/nodejs-functional-programming-with-generators-and-promises/54221383#54221383

    const sleep = () => new Promise(res => process.nextTick(res));
    const writeDataToSocketIo = (dat) => 0;

    const {DataStream} = require("../../");
    async function* getDocs(n) {
        for (let i = 0; i < n; ++i) {
            if (!(i % 100)) await sleep(1);
            yield { i: i, t: Date.now() };
        }
    }

    DataStream
        .from(getDocs(10000))
        .use(stream => {
            let counter = 0;

            const items = new DataStream();
            const out = new DataStream();

            stream
                .peek(1, async ([first]) => out.whenWrote(first))
                .batch(100)
                .reduce(async (acc, result) => {
                    await items.whenWrote(result);

                    return result[result.length - 1];
                }, null)
                .then((last) => out.whenWrote(last))
                .then(() => items.end());

            items
                .setOptions({ maxParallel: 1 })
                .do(arr => counter += arr.length)
                .each(batch => writeDataToSocketIo(batch))
                .run()
                .then(() => (out.end(counter)))
            ;

            return out;
        })
        .toArray()
        .then(([first, last, count]) => ({ first, count, last }))
        .then(console.log)
    ;
