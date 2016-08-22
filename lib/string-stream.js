const DataStream = require('./data-stream');

class StringStream extends DataStream {

    constructor(encoding, ...args) {
        super(...args);
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
                flush(){
                    this.buffer = "";
                }
            }));
        } else if (splitter instanceof Function) {
            return this.pipe(new StringStream({
                transform: splitter
            }));
        } else if (splitter) {
            return this.pipe(new StringStream(
                splitter
            ));
        }
    }

    tee(func) {
        func(this.pipe(new StringStream()));
        return this;
    }

    transform(chunk, encoding, callback) {
        return callback(chunk.toString(encoding));
    }

}

StringStream.prototype.parse = require('./buffer-stream').prototype.parse;

module.exports = StringStream;
