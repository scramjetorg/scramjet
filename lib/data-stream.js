const PassThrough = require('stream').PassThrough;

class DataStream extends PassThrough {

    constructor(opts) {
        super(Object.assign({
            writableObjectMode: true,
            readableObjectMode: true
        }, opts));
    }

    debug(func) {
        debugger; // jshint ignore:line
        func && func(this); // jshint ignore:line
        return this;
    }

    // Calls the given callback for a hash, then makes sure all items with the
    // same hash are processed by a single thread
    group(func) {
        // TODO: NYI, this needs some implementation
        return this;
    }

    tee(func) {
        func(this.pipe(new DataStream()));
        return this;
    }

    reduce(func, into) {
        this.pipe(new ReducingStream(func, into, this));
        return into;
    }

    map(func) {
        return this.pipe(new MappedStream(func));
    }

    filter(func) {
        return this.pipe(new FilteredStream(func));
    }

    pop(func) {
        this.emit("error", new Error("NYI: should pop first chunk and pass it to the passed function, while piping all the following chunks"));
        return this;
    }

    pipe(to, ...args) {
        this.on("error", to.emit.bind(to, "error"));
        return super.pipe(to, ...args);
    }

}

module.exports = DataStream;

const MappedStream = require("./data-stream-funcs/map");
const ReducingStream = require("./data-stream-funcs/reduce");
const FilteredStream = require("./data-stream-funcs/filter");
