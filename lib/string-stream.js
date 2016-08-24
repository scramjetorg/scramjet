const DataStream = require('./data-stream');

class StringStream extends DataStream {

    constructor(encoding, ...args) {
        super(...(typeof encoding === "string" ? args : [encoding, ...args]));
        this.buffer = "";
        this.encoding = encoding;
    }

    split(splitter) {
        if (splitter instanceof RegExp || typeof splitter === "string") {
            return this.pipe(new StringStream({
                transform(chunk, encoding, callback) {
                    this.buffer += chunk.toString("utf-8");
                    const newChunks = this.buffer.split(splitter);
                    while(newChunks.length > 1) {
                        this.push(newChunks.shift());
                    }
                    this.buffer = newChunks[0];
                    callback();
                },
                flush() {
                    this.buffer = "";
                }
            }));
        } else if (splitter instanceof Function) {
            return this.pipe(new StringStream({
                transform: splitter
            }));
        }
    }

    tee(func) {
        func(this.pipe(new StringStream()));
        return this;
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString("utf-8"));
        return callback();
    }

}

StringStream.prototype.parse = require('./buffer-stream').prototype.parse;

module.exports = StringStream;
