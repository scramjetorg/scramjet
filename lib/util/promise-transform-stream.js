const Transform = require('stream').Transform;
const DefaultHighWaterMark = require("os").cpus().length * 4;

const DefaultBeforeTransform = (chunk) => Promise.resolve(chunk);
const DefaultAfterTransform = (chunk) => chunk;

/**
 * DataStream is the primary stream type for Scramjet. When you parse your
 * stream, just pipe it you can then perform calculations on the data objects
 * streamed through your flow.
 *
 * @extends stream.PassThrough
 */
class PromiseTransformStream extends Transform {

    constructor(options) {
        options = Object.assign({
            objectMode: true,
            parallelTransform: null,
            referrer: null,
            beforeTransform: DefaultBeforeTransform,
            afterTransform: DefaultAfterTransform,
            maxParallel: DefaultHighWaterMark
        }, options);


        super(options);
        this._tapped = false;

        this.cork();
        if (options.referrer instanceof PromiseTransformStream && !options.referrer._tapped) {
            return options.referrer.pushTransform(options);
        }

        process.nextTick(this.uncork.bind(this));
        return this.pushTransform(options);
    }

    tap() {
        this._tapped = true;
        return this;
    }

    pushTransform(options) {

        if (this._ptsOptions && typeof this._ptsOptions.parallelTransform === "function") {
            const previousOptions = this._ptsOptions;
            const currentOptions = options;
            this._ptsOptions = Object.assign({}, this._ptsOptions, options, {
                beforeTransform: previousOptions.beforeTransform,
                parallelTransform: (item) => {

                    console.log("here0");
                    let ret = previousOptions.parallelTransform(item);
                    ret.then(() => console.log("here1"));

                    if (previousOptions.afterTransform !== DefaultAfterTransform) {
                        ret = ret.then(previousOptions.afterTransform);
                    }

                    if (currentOptions.beforeTransform !== DefaultBeforeTransform) {
                        ret = ret.then(currentOptions.beforeTransform);
                    }

                    ret = ret.then(
                        currentOptions.parallelTransform
                    );

                    ret.then(() => console.log("here2"));

                    return ret;
                }

            });
            return this;
        } else {
            this.tap();
        }

        this._ptsOptions = options;

        if (options.parallelTransform) {
            let last = new Promise((res) => process.nextTick(res));
            /* HERE's the problem! */
            let processing = [];

            this._theTransform = (chunk, encoding, callback) => {

                last = Promise.all([
                    this._ptsOptions.beforeTransform(chunk)
                        .then((arg) => this._ptsOptions.parallelTransform.call(this, arg)),
                    last
                ]).then(
                    (args) => {
                        return args[0];
                    }
                );

                if (this._ptsOptions.afterTransform)
                    last = last.then((res) => this._ptsOptions.afterTransform(res, chunk));

                if (processing.length >= this._ptsOptions.maxParallel) {
                    processing[processing.length - this._ptsOptions.maxParallel]
                        .then(() => {
                            callback();
                        });
                } else {
                    callback();
                }

                const ref = last;
                processing.push(ref);   // append item to queue

                ref
                    .then((arg) => (arg !== null && this.push(arg)))
                    .then(() => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!", chunk)))
                    .catch(e => this.emit("error", e, chunk));

            };

            this._theFlush = () => last || Promise.resolve();
        }

        return this;
    }

    _flush(callback) {
        if (this._theFlush) {
            this._theFlush().then(() => callback());
        } else {
            callback();
        }
    }

    _transform(chunk, encoding, callback) {
        if (this._theTransform)
            this._theTransform(chunk, encoding, callback);
        else
            callback(null, chunk);
    }
}

module.exports = PromiseTransformStream;
