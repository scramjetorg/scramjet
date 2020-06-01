const scramjet = require("./");
const os = require("os");

module.exports = {
    /**
     * Re-routes streams to a new MultiStream of specified size
     *
     * @meta.noreadme
     * @memberof module:scramjet.MultiStream#
     * @todo NYT: not yet tested
     * @todo NYD: not yet documented
     * @param  {Function} [policy=Affinity.RoundRobin] [description]
     * @param  {number} [count=os.cpus().length]       [description]
     * @return {MultiStream}                             [description]
     */
    route(policy, count = os.cpus().length) {
        const affine = policy(null, count);
        return this.mux().separate(
            async (item) => await affine(item)
        );
    },

    /**
     * Map stream synchronously
     *
     * @chainable
     * @memberof module:scramjet.MultiStream#
     * @param  {Function} transform mapping function ran on every stream (SYNCHRONOUS!)
     */
    smap(transform) {
        const out = new this.constructor(this.streams.map(transform));
        this.each(
            (stream) => out.add(transform(stream)),
            (stream) => out.remove(transform(stream))
        );
        return out;
    },

    /**
     * Distribute options
     *
     * @typedef {object} DistributeOptions
     * @memberof module:scramjet~
     * @prop {Array} [plugins=[]] a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself)
     * @prop {string} [StreamClass=DataStream] the class to deserialize the stream to.
     * @prop {number} [threads=os.cpus().length * 2] maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     * @prop {DataStreamOptions} [createOptions={}] maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     * @prop {StreamWorker} [StreamWorker=scramjet.StreamWorker] worker implementation.
     */

    /**
     * Distributes processing to multiple forked subprocesses.
     *
     * @chainable
     * @memberof module:scramjet.MultiStream#
     * @param {Function|string} clusterFunc a cluster callback with all operations working similarly to DataStream::use
     * @param {DistributeOptions} [options={}]
     */
    cluster(clusterFunc, {plugins = [], threads = os.cpus().length * 2, StreamClass = scramjet.DataStream, createOptions = {}, StreamWorker = scramjet.StreamWorker} = {}) {
        const out = new this.constructor();

        StreamWorker.fork(threads);

        this.each(
            (stream) => StreamWorker
                .fork(threads)
                .then(
                    ([worker]) => out.add(worker.delegate(stream, [clusterFunc], plugins).pipe(new StreamClass(createOptions)))
                )
        );

        return out;
    },

};
