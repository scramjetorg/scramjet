const DataStream = require('../data-stream');

class FilteredStream extends DataStream {

    constructor(transform) {
        super({
            transform: (chunk, encoding, callback) =>
                Promise.resolve(chunk)
                    .then(transform)
                    .then(
                        (ret) => {
                            if (ret) this.push(chunk);
                            return callback();
                        }
                    )
                    .catch(
                        (e) => this.emit("error", e)
                    )
        });
    }

}

module.exports = FilteredStream;
