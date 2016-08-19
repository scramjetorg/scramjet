const DataStream = require("../data-stream");
const mergesort = require("mergesort-stream2");

class MergeStream extends DataStream {

    constructor(arrayOfStreams) {
        super();
        this.streams = arrayOfStreams;
    }

    mux(orderFunc) {
        return mergesort(this.streams, orderFunc);
    }

}

module.exports = MergeStream;
