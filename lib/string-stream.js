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
        this.encoding = typeof encoding === "string" ? encoding : "utf8";
    }

    /**
     * @callback ShiftCallback
     * @param {String} shifted Pooped chars
     */

    /**
     * Shifts given length of chars from the original stream
     *
     * Works the same way as {@see DataStream.shift}, but in this case extracts
     * the given number of characters.
     *
     * @param {Number} bytes The number of characters to shift.
     * @param {ShiftCallback} func Function that receives a string of shifted
     *                                 chars.
     * @return {StringStream}  substream.
     *
     * @example {@link ../samples/string-stream-shift.js}
     */
    shift(bytes, func) {
        const ret = "";
        const str = this.tap()._selfInstance({
            referrer: this
        });
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
            return this.tap().pipe(new StringStream({
                transform(chunk, encoding, callback) {
                    this.buffer += chunk.toString(this.encoding);
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
                },
                referrer: this
            }));
        } else if (splitter instanceof Function) {
            return this.tap().pipe(new StringStream({
                transform: splitter,
                referrer: this
            }));
        }
    }

    /**
     * Appends given argument to all the items.
     *
     * @param {Function|String} arg the argument to append. If function passed then it will be called and resolved
     *                              and the resolution will be appended.
     * @return {StringStream}  the resulting stream
     *
     * @example {@link ../samples/string-stream-append.js}
     */
    append(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => item + result)) : this.map(item => item + arg);
    }

    /**
     * Prepends given argument to all the items.
     *
     * @param {Function|String} arg the argument to prepend. If function passed then it will be called and resolved
     *                              and the resolution will be prepended.
     * @return {StringStream}  the resulting stream
     *
     * @example {@link ../samples/string-stream-prepend.js}
     */
    prepend(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => result + item)) : this.map(item => arg + item);
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
            const replaceRegex = (matcher.source.search(/\((?!\?)/g) > -1) ?
                new RegExp("[\\s\\S]*?" + matcher.source, (matcher.ignoreCase ? 'i' : '') + (matcher.multiline ? 'm' : '') + (matcher.unicode ? 'u' : '') + 'g') :
                new RegExp("[\\s\\S]*?(" + matcher.source + ")", (matcher.ignoreCase ? 'i' : '') + (matcher.multiline ? 'm' : '') + (matcher.unicode ? 'u' : '') + 'g')
                ;

            return this.tap().pipe(new scramjet.DataStream({
                transform(chunk, encoding, callback) {
                    this.buffer = (this.buffer || "") + chunk.toString("utf-8");
                    this.buffer = this.buffer.replace(replaceRegex, (...match) => {
                        this.push(match.slice(1, match.length - 2).join(""));
                        return '';
                    });

                    callback();
                },
                referrer: this
            }));

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
        return this.tap().map(
            (str) => Buffer.from(str, this.encoding),
            new scramjet.BufferStream({
                referrer: this
            })
        );
    }

    toStringStream(encoding) {
        if (encoding)
            return this.tap().pipe(this._selfInstance(encoding, {
                referrer: this
            }));
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
        return this.tap().map(parser, scramjet.DataStream);
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString(this.encoding));
        return callback();
    }

    /**
     * Creates a StringStream and writes a specific string.
     *
     * @param  {String} str      the string to push the your stream
     * @param  {String} encoding optional encoding
     * @return {StringStream}          new StringStream.
     */
    static fromString(str, encoding) {
        const st =  new StringStream(encoding || 'utf-8');
        st.end(str);
        return st;
    }

}

StringStream.prototype.pop = StringStream.prototype.shift;

module.exports = StringStream;
