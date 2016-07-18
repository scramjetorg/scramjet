const Transform = require('stream').Transform;

class DataStream extends Transform {

    constructor(...args) {
        super(...args);
    }

    group(func) {
        // TODO: NYI, this needs some implementation
        return this;
    }

    tee(func) {
        func(this.pipe(new DataStream()));
        return this;
    }
}

module.exports = DataStream;

const MappedStream = require("./streams/mapped");
const ReducingStream = require("./streams/reducing");
const FilteredStream = require("./streams/filtered");
