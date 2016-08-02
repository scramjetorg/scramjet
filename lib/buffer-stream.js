const DataStream = require('./buffer-stream').DataStream;
const StringStream = require('./buffer-stream').StringStream;

class BufferStream extends DataStream {

    constructor(...args) {
        super(...args);
        this.buffer = [];
    }

    split(splitter) {
        if (splitter instanceof Buffer || typeof splitter === "string") {
            return this.pipe(new BufferStream({
                transform: (buffer) => {
                    // merge buffers before specific buffer.includes
                    // all that's left should be left where it was
                    // (without the actual split)
                }
            }));
        } else if (splitter instanceof Function) {
            return this.pipe(new BufferStream({
                transform: splitter
            }));
        } else if (splitter) {
            return this.pipe(new BufferStream(splitter));
        }
    }

    toStringStream(encoding) {
        return new StringStream();
    }

    parse(parser) {
        if (splitter instanceof Function) {
            return this.pipe(new DataStream({
                transform: parser
            }));
        }
    }

    tee(func) {
        func(this.pipe(new BufferStream()));
        return this;
    }

    transform(chunk, encoding, callback) {
        return callback(Buffer.from(chunk, encoding));
    }

}

module.exports = BufferStream;
