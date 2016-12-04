const scramjet = require('.');

/**
 * A factilitation stream created for easy splitting or parsing a buffer
 *
 * @extends DataStream
 */
class BufferStream extends scramjet.DataStream {

    /**
     * Create the BufferStream.
     *
     * @param {object} opts Stream options passed to superclass
     *
     * @example see file: {@link ../samples/buffer-stream-constructor.js}
     */
    constructor(...args) {
        super(...args);
        this.buffer = [];
    }

    /**
     * Splits the buffer stream into buffer objects according to the passed
     * function.
     *
     * @todo implement splitting by buffer or string
     * @param  {Function} splitter A function that will be called for every
     *                             stream chunk.
     * @return {BufferStream}  the re-splitted buffer stream.
     *
     * @example see file: {@link ../samples/buffer-stream-split.js}
     */
    split(splitter) {
        if (splitter instanceof Buffer || typeof splitter === "string") {
            return this.pipe(new BufferStream({
                transform: (/* buffer */) => {
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

    /**
     * Creates a string stream from the given buffer stream. Still it returns a
     * DataStream derivative and isn't the typical node.js stream so you can do
     * all your transforms when you like.
     *
     * @param  {String} encoding The encoding to be used to convert the buffers
     *                           to streams.
     * @return {StringStream}  The converted stream.
     *
     * @example see file: {@link ../samples/buffer-stream-tostringstream.js}
     */
    toStringStream(encoding) {
        return this.pipe(new scramjet.StringStream(encoding));
    }

    /**
     * Parses every buffer to object. The method MUST parse EVERY buffer into a
     * single object, so the buffer stream here should already be splitted.
     *
     * @param  {TransformFunction} parser The transform function
     * @return {DataStream}  The parsed objects stream.
     *
     * @example see file: {@link ../samples/buffer-stream-parse.js}
     */
    parse(parser) {
        if (parser instanceof Function) {
            return this.pipe(new scramjet.DataStream({
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

    _transform(chunk, encoding, callback) {
        this.push(Buffer.from(chunk, encoding));
        return callback();
    }

}

module.exports = BufferStream;
