const Accumulator = require('../accumulator');

class ReducingStream extends Accumulator {

    constructor(push, into, flowCtl, options) {
        super(into, flowCtl, options);
        this.push = push;
    }

    _write(chunk, encoding, callback) {
        Promise.resolve(chunk)
            .then((chunk) => this.push(this.into, chunk))
            .then((ret) => this.into = ret)
            .then(callback);
    }

    _writev(chunks, encoding, callback) {
        let ret = Promise.resolve(this.into);
        chunks.forEach(ret = ret.then(
            (chunk) => (() => this.push(this.into, chunk).then((ret) => this.into = ret))
        ));
        ret.then(callback);
    }

}

module.exports = ReducingStream;
