const DataStream = require('./data-stream');
const BufferStream = require('./buffer-stream');

/**
 * A stream of string objects for further transformation on top of DataStream.
 *
 * @extends DataStream
 */
class StringStream extends DataStream {

    /**
     * Constructs the stream with the given encoding.
     *
     * @param  {String} encoding the encoding to use
     * @return {StringStream}  the created data stream
     */
    constructor(encoding, ...args) {
        super(...(typeof encoding === "string" ? args : [encoding, ...args]));
        this.buffer = "";
        this.encoding = encoding;
    }

    /**
     * Splits the buffer stream into buffer objects according to the passed
     * function.
     *
     * @todo implement splitting by buffer or string
     * @param  {Function} splitter A function that will be called for every
     *                             stream chunk.
     * @return {BufferStream}  the re-splitted buffer stream.
     */
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

    /**
     * Duplicate the stream and pass the duplicate to the passed callback
     * function.
     *
     * @param  {TransformFunction} func The duplicate stream will be passed as
     *                                  first argument.
     * @return {StringStream}  self
     */
    tee(func) {
        func(this.pipe(new StringStream()));
        return this;
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString("utf-8"));
        return callback();
    }

}

StringStream.prototype.parse = BufferStream.prototype.parse;

module.exports = StringStream;
