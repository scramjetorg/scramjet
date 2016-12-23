const scramjet = require('./');

const SPLIT_LINE = /\r\n?|\n/g;

/**
 * A stream of string objects for further transformation on top of DataStream.
 *
 * @extends DataStream
 */
class StringStream extends scramjet.DataStream {

    /**
     * Constructs the stream with the given encoding
     *
     * @param  {String} encoding the encoding to use
     * @return {StringStream}  the created data stream
     *
     * @example {@link ../samples/string-stream-constructor.js}
     */
    constructor(encoding, options) {

        super(typeof encoding === "string" ? options : encoding);
        this.buffer = "";
        this.constructed = new Error().stack;
        this.encoding = typeof encoding === "string" ? encoding : "utf-8";
    }

    /**
     * @callback PopCallback
     * @param {String} popped Pooped chars
     */

    /**
     * Pops given length of chars from the original stream
     *
     * Works the same way as {@see DataStream.pop}, but in this case extracts
     * the given number of characters.
     *
     * @param {Number} bytes The number of characters to pop.
     * @param {PopCallback} func Function that receives a string of popped
     *                                 chars.
     * @return {StringStream}  substream.
     *
     * @example {@link ../samples/string-stream-pop.js}
     */
    pop(bytes, func) {
        const ret = "";
        const str = this._selfInstance();
        let offs = 0;

        const chunkHandler = (chunk) => {
            const length = Math.min(bytes - offs, chunk.length);
            chunk.substr(0, length);
            offs += length;
            if (length >= bytes) {
                unHook()
                    .then(
                        () => {
                            str.write(chunk.slice(length));
                            this.pipe(str);
                        }
                    );
            }
        };

        const endHandler = (...args) => {
            if (ret.length < bytes) {
                unHook();
            }
            str.end(...args);
        };

        const errorHandler = str.emit.bind(str, "error");

        const unHook = () => {  // jshint ignore:line
            this.removeListener("data", chunkHandler);
            this.removeListener("end", endHandler);
            this.removeListener("error", errorHandler);
            return Promise.resolve(ret)
                .then(func);
        };


        this.on("data", chunkHandler);
        this.on("end", endHandler);
        this.on("error", errorHandler);

        return str;
    }

    /**
     * A handly split by line regex to quickly get a line-by-line stream
     */
    static get SPLIT_LINE() {
        return SPLIT_LINE;
    }

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @todo implement splitting by buffer or string
     * @param  {RegExp|String} splitter What to split by
     * @return {StringStream}  the re-splitted string stream.
     *
     * @example {@link ../samples/string-stream-split.js}
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
                flush(callback) {
                    this.push(this.buffer);
                    this.buffer = "";
                    callback();
                }
            }));
        } else if (splitter instanceof Function) {
            return this.pipe(new StringStream({
                transform: splitter
            }));
        }
    }

    /**
     * Finds matches in the string stream and streams the match results
     *
     * @todo implement splitting by buffer or string
     * @param  {RegExp} splitter A function that will be called for every
     *                             stream chunk.
     * @return {StringStream}  string stream of matches.
     *
     * @example {@link ../samples/string-stream-match.js}
     */
    match(matcher) {
        if (matcher instanceof RegExp) {
            const replaceRegex = new RegExp("^.*?" + matcher.source, (matcher.ignoreCase ? 'i' : '') + (matcher.multiline ? 'm' : '') + (matcher.unicode ? 'u' : '') + 'g');
            if (replaceRegex.source.search(/\((?!\?)/g)) {
                return this.pipe(new scramjet.DataStream({
                    transform(chunk, encoding, callback) {
                        this.buffer += chunk.toString("utf-8");
                        this.buffer = this.buffer.replace(replaceRegex, (...match) => {
                            this.push(match.slice(1, match.length - 2).join(""));
                            return '';
                        });

                        callback();
                    }
                }));
            } else {
                return this.pipe(new scramjet.DataStream({
                    transform(chunk, encoding, callback) {
                        this.buffer += chunk.toString("utf-8");
                        this.buffer = this.buffer.replace(replaceRegex, (match) => {
                            this.push(match);
                        });

                        callback();
                    }
                }));

            }

        }
        throw new Error("Mathcher must be a RegExp!");
    }

    /**
     * Transforms the StringStream to BufferStream
     *
     * Creates a buffer stream from the given string stream. Still it returns a
     * DataStream derivative and isn't the typical node.js stream so you can do
     * all your transforms when you like.
     *
     * @return {StringStream}  The converted stream.
     *
     * @example {@link ../samples/string-stream-tobufferstream.js}
     */
    toBufferStream() {
        return this.map(
            (str) => Buffer.from(str, this.encoding),
            new scramjet.BufferStream()
        );
    }

    toStringStream(encoding) {
        if (encoding)
            return this.pipe(this._selfInstance(encoding));
        else
            return this;
    }

    /**
     * @callback ParseCallback
     * @param {String} chunk the transformed chunk
     * @return {Promise}  the promise should be resolved with the parsed object
     */

     /**
      * Parses every string to object
      *
      * The method MUST parse EVERY string into a single object, so the string
      * stream here should already be splitted.
      *
      * @param  {ParseCallback} parser The transform function
      * @return {DataStream}  The parsed objects stream.
      *
      * @example {@link ../samples/string-stream-parse.js}
      */
    parse(parser) {
        if (parser instanceof Function) {
            return this.pipe(new scramjet.DataStream({
                transform: (chunk, encoding, callback) => {
                    Promise.resolve(chunk.toString(this.encoding))
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
        this.push(chunk.toString(this.encoding));
        return callback();
    }

}

module.exports = StringStream;
