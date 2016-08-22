const MultiStream = require("../multi-stream");
const DataStream = require("../data-stream");
const mergesort = require("mergesort-stream2");

class MergeStream extends MultiStream {

    constructor(arrayOfStreams) {
        super();
        this.streams = arrayOfStreams;
    }

    mux(orderFunc) {
        return mergesort(this.streams, orderFunc).pipe();
    }

}

module.exports = MergeStream;
