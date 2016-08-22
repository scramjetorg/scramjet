
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

}

module.exports = MultiStream;
