const DataStream = require('../data-stream');

const kBuffer = Symbol("Buffer");
const kWaitFor = Symbol("WaitFor");

class MappedStream extends DataStream {

    constructor(transform, options) {
        super(options);
        this.transform = transform;
        this[kBuffer] = [];
        this[kWaitFor] = 0;
    }

    _write(chunk, encoding, callback) {
        this[kBuffer].push(chunk);
        this.pump();
        callback();
    }
    _writev(chunks, encoding, callback) {
        chunks.forEach((chunk) => this[kBuffer].push(chunk));
        this.pump();
        callback();
    }

    pump() {
        this.read(this[kWaitFor], kWaitFor);
    }

    _read(size, internal) {

        size = size || 1;

        const els = this[kBuffer].splice(0, size).map(
            (el) => this.push(this.transform(el))
        );

        if (internal) {
            this[kWaitFor] -= els.length;
        } else if (els.length < size) {
            this[kWaitFor] = Math.max(this[kWaitFor], 0) + size - els.length;
        }
    }

}

module.exports = MappedStream;
