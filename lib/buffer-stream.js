const DataStream = require('./data-stream');
const StringStream = require('./string-stream');

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
        if (parser instanceof Function) {
            return this.pipe(new DataStream({
                transform: (chunk, encoding, callback) => {
                    Promise.resolve(chunk)
                        .then(parser)
                        .then((ret) => callback(null, ret))
                        .catch(
                            (e) => this.emit("error", e)
                        );
                }
            }));
        }
    }

    tee(func) {
        func(this.pipe(new BufferStream()));
        return this;
    }

    _transform(chunk, encoding, callback) {
        thuis.push(Buffer.from(chunk, encoding));
        return callback();
    }

}

module.exports = BufferStream;
