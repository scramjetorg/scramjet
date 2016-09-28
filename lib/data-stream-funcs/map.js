const DataStream = require('../data-stream');

class MappedStream extends DataStream {

    constructor(transform, options) {
        super({
            transform: (chunk, encoding, callback) => {
                Promise.resolve(chunk)
                    .then(transform)
                    .then(
                        (ret) => callback(null, ret)
                    )
                    .catch(
                        (e) => callback(e)
                    );
            }
        });
    }

}

module.exports = MappedStream;
