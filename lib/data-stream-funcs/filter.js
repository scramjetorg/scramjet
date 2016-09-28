const DataStream = require('../data-stream');

class FilteredStream extends DataStream {

    constructor(transform) {
        super({
            transform: (chunk, encoding, callback) => {
                Promise.resolve(chunk)
                    .then(transform)
                    .then(
                        (ret) => ret ? callback(null, chunk) : callback()
                    )
                    .catch(
                        (e) => callback(e)
                    );
            }
        });
    }

}

module.exports = FilteredStream;
