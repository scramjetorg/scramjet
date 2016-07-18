const Duplex = require('stream').Duplex;

class DataStream extends Duplex {

    constructor(...args) {
        super({
            writableObjectMode: true,
            readableObjectMode: true
        });
    }

    group(func) {
        // TODO: NYI, this needs some implementation
        return this;
    }

    tee(func) {
        func(this.pipe(new DataStream()));
        return this;
    }

    reduce(func, into) {
        return this.pipe(new ReducingStream(func, into, this)).into;
    }

    map(func) {
        return this.pipe(new MappedStream(func));
    }

    filter(func) {
        return this.pipe(new FilteredStream(func));
    }

}

module.exports = DataStream;

const MappedStream = require("./streams/mapped");
const ReducingStream = require("./streams/reducing");
const FilteredStream = require("./streams/filtered");
