const Transform = require('stream').Transform;
const DefaultHighWaterMark = require("os").cpus().length * 2;

const DefaultBeforeTransform = (chunk) => Promise.resolve(chunk);
const DefaultAfterTransform = (chunk) => chunk;
const filter = Symbol("FILTER");

const ignoreVal = Promise.resolve(0);
const ignore = () => ignoreVal;

/**
 * DataStream is the primary stream type for Scramjet. When you parse your
 * stream, just pipe it you can then perform calculations on the data objects
 * streamed through your flow.
 *
 * @extends stream.PassThrough
 */
class PromiseTransformStream extends Transform {

    constructor(options) {
        const newOptions = Object.assign({
            objectMode: true,
            parallelTransform: null,
            beforeTransform: DefaultBeforeTransform,
            afterTransform: DefaultAfterTransform,
            maxParallel: options.referrer && options.referrer._options && options.referrer._options.maxParallel || DefaultHighWaterMark
        }, options);

        super(newOptions);

        this._tapped = false;

        this._options = {
            transforms: [],
            referrer: options.referrer,
            constructed: (new Error().stack),
            maxParallel: newOptions.maxParallel,
        };

        if (newOptions.transform || !newOptions.parallelTransform) {
            return this.tap();
        }

        this.cork();
        if (options.referrer instanceof PromiseTransformStream && !options.referrer._tapped) {
            return options.referrer.pushTransform(options);
        }

        process.nextTick(this.uncork.bind(this));

        this.pushTransform(newOptions);

        if (this._options.transforms.length) this.mkTransform();

    }

    graph(func) {
        let referrer = this;
        const ret = [];
        while(referrer) {
            ret.push(referrer);
            referrer = referrer._options.referrer;
        }
        func(ret);
        return this;
    }

    tap() {
        this._tapped = true;
        return this;
    }

    pushTransform(options) {

        if (typeof options.parallelTransform === "function" && options.parallelTransform !== DefaultBeforeTransform) {

            if (options.beforeTransform && options.beforeTransform !== DefaultBeforeTransform) {
                this._options.transforms.push(options.beforeTransform);
            }
            this._options.transforms.push(options.parallelTransform);
            if (options.afterTransform && options.afterTransform !== DefaultAfterTransform) {
                this._options.transforms.push(options.afterTransform);
            }
        }

        return this;
    }

    mkTransform() {

        let last = new Promise((res) => process.nextTick(() => res()));
        /* HERE's the problem! */
        let processing = [];

        this._transform = (chunk, encoding, callback) => {
            if (!this._options.transforms.length) {
                return last = last.then(
                    () => callback(null, chunk)
                );
            }

            let prev = DefaultBeforeTransform(chunk);

            for (let transform of this._options.transforms) {
                prev = prev.then(transform);
            }

            last = Promise.all([
                prev.catch(
                    (err) => err === filter ? filter : Promise.reject(err)
                ),
                last
            ]).then(
                (args) => {
                    return args[0];
                }
            ).then(
                (arg) => (arg !== filter) && (this.push(arg))
            );

            if (processing.length >= this._options.maxParallel) {
                processing[processing.length - this._options.maxParallel]
                    .then(callback).catch(ignore);
            } else {
                callback();
            }

            const ref = last;
            processing.push(ref);   // append item to queue

            ref.then(
                    () => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!", chunk))
                )
                .catch(e => {
                    console.error(e);
                    this.emit("error", e, chunk);
                    return Promise.resolve();
                })
                ;

        };

        this._flush = (callback) => last.then(() => callback());

        return this;
    }

    _transform(chunk, encoding, callback) {
        callback(null, chunk);
    }

    static get filter() { return filter; }
}

module.exports = PromiseTransformStream;
