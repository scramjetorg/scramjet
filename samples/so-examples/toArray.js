    const scramjet = require('../../');

    async function myAsyncFilterFunc(data) {
        return new Promise(res => {
            process.nextTick(res.bind(null, data % 2));
        });
    }

    async function x() {
        const x = await scramjet.fromArray([1,2,3,4,5])
            .filter(async (item) => myAsyncFilterFunc(item))
            .toArray();
        return x;
    }

    x().then(
        (out) => console.log(out),
        (err) => (console.error(err), process.exit(3)) // eslint-disable-line
    );
