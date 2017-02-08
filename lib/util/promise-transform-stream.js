const Transform = require('stream').Transform;
const DefaultHighWaterMark = require("os").cpus().length * 2;

const DefaultBeforeTransform = (chunk) => Promise.resolve(chunk);
const DefaultAfterTransform = (chunk) => chunk;
const filter = Symbol("FILTER");

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
            referrer: options.referrer,
            constructed: (new Error().stack),
            maxParallel: newOptions.maxParallel,
        };

        if (newOptions.transform || !newOptions.parallelTransform) {
            return this.tap();
        }

        Object.assign(this._options, {
            transforms: [],
            beforeTransform: newOptions.beforeTransform,
            afterTransform: newOptions.afterTransform
        });

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

            const beforeTransform = typeof options.beforeTransform === "function" ? options.beforeTransform.bind(this) : DefaultBeforeTransform;
            const after = typeof options.afterTransform === "function" && options.afterTransform !== DefaultAfterTransform ? options.afterTransform.bind(this) : null;
            const main = options.parallelTransform.bind(this);

            if (after) {
                this._options.transforms.push((chunk) => beforeTransform(chunk).then(main).then(after.bind(null, chunk)));
            } else {
                this._options.transforms.push((chunk) => beforeTransform(chunk).then(main));
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
                return last.then(
                    () => callback(null, chunk)
                );
            }

            last = Promise.all([
                this._options.transforms.reduce(
                    (prev, transform) =>  prev.then(transform),
                    DefaultBeforeTransform(chunk)
                ).catch(
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
                    .then(() => {
                        callback();
                    });
            } else {
                callback();
            }

            const ref = last;
            processing.push(ref);   // append item to queue

            ref.then(
                    () => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!", chunk))
                )
                .catch(e => Promise.resolve(this.emit("error", e, chunk)))
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
