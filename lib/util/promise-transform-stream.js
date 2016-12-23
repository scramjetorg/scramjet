const Transform = require('stream').Transform;
const DefaultHighWaterMark = require("os").cpus().length * 2;

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
            sequentialTransform: null,
            parallelTransform: null,
            unorderedTransform: null,
            beforeTransform: (chunk) => Promise.resolve(chunk),
            afterTransform: (chunk) => chunk,
            initial: null,
            maxParallel: DefaultHighWaterMark
        }, options);

        if (options.sequentialTransform) {

            let last = Promise.resolve(options.initial);
            let processing = [];
            options.transform = (chunk, encoding, callback) => {
                last = Promise.all([last, chunk])
                    .then((args) => options.sequentialTransform.call(null, ...args));

                if (processing.length >= options.maxParallel) {
                    processing[processing.length - options.maxParallel]
                        .then(() => callback());
                } else {
                    callback();
                }

                const ref = last;
                processing.push(ref);   // append item to queue

                ref
                    .then((res) => this.push(res))
                    .then(() => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!")))
                    .catch(e => this.emit("error", e));

            };

            options.flush = (callback) => {
                last.then(callback);
            };

        } else if (options.parallelTransform) {

            const rel = new Error().stack;

            let last = null;
            let processing = [];
            options.transform = (chunk, encoding, callback) => {
                if (typeof options.parallelTransform !== "function")
                    console.log(rel, options);

                last = Promise.all([
                    options.beforeTransform(chunk)
                        .then((arg) => options.parallelTransform.call(this, arg)),
                    last
                ]).then(
                    (args) => {
                        return args[0];
                    }
                );
                if (options.afterTransform)
                    last = last.then((res) => options.afterTransform(res, chunk));

                if (processing.length >= options.maxParallel) {
                    processing[processing.length - options.maxParallel]
                        .then(() => {
                            callback();
                        });
                } else {
                    callback();
                }

                const ref = last;
                processing.push(ref);   // append item to queue

                ref
                    .then((arg) => arg !== null && this.push(arg))
                    .then(() => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!")))
                    .catch(e => this.emit("error", e));

            };

            options.flush = (callback) => {
                if (last)
                    last.then(() => callback());
                else
                    callback();
            };

        } else if (options.unorderedTransform) {

            let last = Promise.resolve(options.initial);
            let processing = [];
            options.transform = (chunk, encoding, callback) => {

                last = Promise.resolve(chunk)
                    .then((arg) => options.unorderedTransform.call(this, arg));

                if (processing.length >= options.maxParallel) {
                    options.flush(callback);
                } else {
                    callback();
                }

                const res = last;
                processing.push(res);   // append item to queue
                res
                    .then((res) => this.push(res))
                    .then(() => processing.indexOf(res) >= 0 ? processing.splice(processing.indexOf(res), 1) : this.emit("error", new Error("Promise resolved out of sequence!")))
                    .catch(e => this.emit("error", e));

            };

            options.flush = (callback) => {
                Promise.race(processing)
                    .then(callback);
            };

        } else if (!("transform" in options)) {

            options.transform = (chunk, encoding, callback) => callback(null, chunk);

        }

        super(options);

    }

}

module.exports = PromiseTransformStream;
