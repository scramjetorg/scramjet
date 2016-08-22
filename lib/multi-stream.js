

class MultiStream {

    constructor(streams) {
        this.streams = streams;
    }

    each(func) {
        return new MultiStream(this.streams.map(func));
    }

    refine(func) {
        return new MultiStream(this.streams.filter(func));
    }

    merge(cmp) {
        return new MergeStream(this.streams).mux(cmp);
    }

}

module.exports = MultiStream;

const MergeStream = require("./data-stream-funcs/merge");
