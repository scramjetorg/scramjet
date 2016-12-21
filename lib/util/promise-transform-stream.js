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
            sequentialTransform: null,
            parallelTransform: null,
            unorderedTransform: null,
            initial: null,
            maxParallel: DefaultHighWaterMark
        }, options);


        if (options.sequentialTransform) {

            let last = Promise.resolve(options.initial);
            let processing = [];
            options.transform = (chunk, encoding, callback) => {

                last = Promise.all([last, chunk])
                    .then((args) => options.sequentialTransform.call(this, ...args));

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
                    .catch(e => this.emit("error", e))
                    .then(() => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!")));

            };

            options.flush = (callback) => {
                last.then(callback);
            };

        } else if (options.parallelTransform) {

            let last = null;
            let processing = [];
            options.transform = (chunk, encoding, callback) => {

                last = Promise.all([
                    last,
                    Promise.resolve(chunk)
                        .then((arg) => options.parallelTransform.call(this, arg))
                ]);

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
                    .catch(e => this.emit("error", e))
                    .then(() => ref === processing.shift() || this.emit("error", new Error("Promise resolved out of sequence!")));

            };

            options.flush = (callback) => {
                if (last)
                    last.then(callback);
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
                    .catch(e => this.emit("error", e))
                    .then(() => processing.indexOf(res) >= 0 ? processing.splice(processing.indexOf(res), 1) : this.emit("error", new Error("Promise resolved out of sequence!")));

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
