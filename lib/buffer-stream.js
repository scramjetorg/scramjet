const Transform = require('stream').Transform;

class BufferStream extends Transform {

    constructor(...args) {
        super(...args);
    }

    split(splitter) {
        return this.pipe(new Transform({transform: splitter}));
    }

    tee(func) {
        func(this.pipe(new DataStream()));
        return this;
    }
}

module.exports = DataStream;
