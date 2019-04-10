const scramjet = require("./");
const os = require("os");

module.exports = {
    /**
     * Re-routes streams to a new MultiStream of specified size
     *
     * @meta.noreadme
     * @memberof MultiStream#
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
     * @memberof MultiStream#
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
     * @typedef DistributeOptions
     * @memberof MultiStream.
     * @prop {Array} [plugins=[]] a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself)
     * @prop {String} [StreamClass=DataStream] the class to deserialize the stream to.
     * @prop {Number} [threads=os.cpus().length * 2] maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     * @prop {DataStreamOptions} [createOptions={}] maximum threads to use - defaults to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     */

    /**
     * Distributes processing to multiple forked subprocesses.
     *
     * @chainable
     * @memberof MultiStream#
     * @param {Function|String} clusterFunc a cluster callback with all operations working similarly to DataStream::use
     * @param {DistributeOptions} [options={}]
     */
    cluster(clusterFunc, {plugins = [], threads = os.cpus().length * 2, StreamClass = scramjet.DataStream, createOptions = {}} = {}) {
        const out = new this.constructor();
        const {StreamWorker} = scramjet;

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
