const DataStream = require('../data-stream');

class MappedStream extends DataStream {

    constructor(transform) {
        super({
            transform: (chunk, encoding, callback) => Promise.resolve(chunk)
                .then(callback)
                .catch((e) => this.emit("error", e))
        });
    }

}

module.exports = MappedStream;
