const DataStream = require('../../').DataStream;
const DefaultBufferLength = 16;

const wrapComparator = (comparator) => (a, b) => comparator(a.val, b.val);
const DefaultComparator = (a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
};

module.exports = (multi, passedComparator, bufferLength, Clazz) => {

    bufferLength = bufferLength || DefaultBufferLength;

    Clazz = Clazz || DataStream;

    const comparator = wrapComparator(passedComparator || DefaultComparator);

    const out = new Clazz();
    const streamIndex = new Map();

    const getMoreItemsForEntry = (stream, arr) => {
        return new Promise((res) => {
            let newElements = 0;
            let haveMore;
            while (haveMore !== null && arr.length < bufferLength) {
                haveMore = stream.read();
                if (haveMore !== null) {
                    arr.push(haveMore);
                    newElements++;
                }
            }

            if (newElements)
                return res(arr);

            console.log('waiting for readable');

            return new Promise((res) => stream.on("readable", res))
                .then(() => getMoreItemsForEntry(stream, arr));
        });
    };

    const getMoreItems = () => {
        const ret = [];
        console.log("entry", streamIndex.entries());
        for (let entry of streamIndex.entries()) {
            ret.push(getMoreItemsForEntry(...entry));
        }

        return Promise.all(ret);
    };

    // TODO: rewrite as generator?
    const getSorted = (arys) => {
        const ret = [];

        const arr = [];
        for (let i = 0; i < arys.length; i++) {
            if (!arys[i].length)
                break;

            arr.push({idx: i, val: arys[i][0]});
        }

        while (arr.length === arys.length) {

            arr.sort(comparator);

            const item = arr.shift();


            arys[item.idx].shift();
            ret.push(item);

            if (arys[item.idx].length)
                arr.push(arys[item.idx][0]);
            // otherwise arr will be shorter than arys hence the loop will end.
        }

        return ret;
    };

    let pushing = null;
    const pushMoreItems = () => {
        if (pushing)
            return pushing;

        return pushing = getMoreItems().then(
            (arys) => arys.length > 0 ? getSorted(arys) : Promise.reject()
        ).then(
            (sorted) => {
                console.log("sorted");

                let ret = true;
                for (var i = 0; i < sorted.length; i++)
                    ret = out.write(sorted[i]);

                return ret || new Promise((res) => this.on("drain", res));
            }
        ).then(
            () => (pushing = null, pushMoreItems())
        ).catch(
            (e) => e instanceof Error ? console.error(e) : pushMoreItems
        );
    };

    multi.each(
        (addedStream) => (console.log("add"), streamIndex.set(addedStream, []), pushMoreItems()),
        (removedStream) => streamIndex.delete(removedStream)
    ).then(
        () => (console.log('push'), pushMoreItems())
    ).catch(
        e => multi.emit('error', e)
    );

    // TODO: wait for last push
    multi.on("empty", () => out.end());

    return out;
};
