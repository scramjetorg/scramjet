const MultiStream = require("../multi-stream");
const DataStream = require("../data-stream");
const mergesort = require("mergesort-stream");

class MergeStream extends MultiStream {

    constructor(arrayOfStreams) {
        super();
        this.streams = arrayOfStreams;
    }

    mux(orderFunc) {
        var out = new DataStream();

        return mergesort(orderFunc, this.streams).pipe(new DataStream());
    }

}

module.exports = MergeStream;
