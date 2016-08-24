const DataStream = require('../data-stream');

class MappedStream extends DataStream {

    constructor(transform, options) {
        super({
            transform: (chunk, encoding, callback) => {
                Promise.resolve(chunk)
                    .then(transform)
                    .then(
                        (ret) => {
                            this.push(ret);
                            return callback();
                        }
                    )
                    .catch(
                        (e) => this.emit("error", e)
                    );
            }
        });
    }

}

module.exports = MappedStream;
