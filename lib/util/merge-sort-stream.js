const DataStream = require('../../').DataStream;
const DefaultBufferLength = 16;

const wrapComparator = (comparator) => (a, b) => comparator(a[0], b[0]);
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

    const rest = [];

    const getMoreItemsForEntry = (stream, arr) => {
        let haveMore = stream.read();
        while (haveMore !== null && arr.length < bufferLength) {
            arr.push(haveMore);
            haveMore = stream.read();
        }

        if (arr.length)
            return Promise.resolve(arr);

        return new Promise((res, rej) => stream.once("readable", res).once("end", rej))
            .then(() => (getMoreItemsForEntry(stream, arr)));
    };

    const getMoreItems = () => {
        const ret = [];
        for (let entry of streamIndex.entries()) {
            ret.push(getMoreItemsForEntry(...entry));
        }

        return Promise.all(ret)
            .then((items) => (items));
    };

    // TODO: rewrite as generator?
    const getSorted = (arys) => {
        const ret = [];

        const arr = [];
        let min_length = Infinity;

        for (let i = 0; i < arys.length; i++) {
            if (!arys[i].length)
                return [];
            for (let j = 0; j < arys[i].length; j++) {
                arr.push([arys[i][j], i, arys[i].length - j - 1]);          // item, idx, left
            }
            min_length = arys[i].length < min_length ? arys[i].length : min_length;
        }

        arr.sort(comparator);

        while (min_length > 0) {

            const item = arr.shift();
            if (item[1] >= 0)
                arys[item[1]].shift();

            ret.push(item[0]);
            min_length = item[2];
        }

        return ret;
    };

    const writeSorted = (sorted) => {
        let ret = true;
        for (var i = 0; i < sorted.length; i++)
            ret = out.write(sorted[i]);

        return ret || new Promise((res) => out.once("drain", res));
    };

    let pushing = null;
    const pushMoreItems = () => {
        if (pushing)
            return pushing;

        return pushing = getMoreItems().then(
            (arys) => {
                return arys.length > 0 ? getSorted(arys) : Promise.reject();
            }
        ).then(
            writeSorted
        ).then(
            () => (pushing = null, pushMoreItems())
        ).catch(
            (e) => e instanceof Error ? console.error(e) : (pushing = null, Promise.resolve())
        );
    };

    multi.each(
        (addedStream) => streamIndex.set(addedStream, []),
        (removedStream) => (rest.push(...streamIndex.get(removedStream)), streamIndex.delete(removedStream))
    ).then(
        () => pushMoreItems()
    ).catch(
        e => multi.emit('error', e)
    );

    multi.on("empty", () => Promise.resolve(pushing).then(() => (writeSorted(rest), out.end())));

    return out;
};
