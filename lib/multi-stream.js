const {MultiStream, StreamWorker} = require('./');
const os = require('os');

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
     * @memberof MultiStream#
     * @param  {Function} transform mapping function ran on every stream (SYNCHRONOUS!)
     * @return {MultiStream}  mapped multistream
     */
    smap(transform) {
        const out = new this.constructor(this.streams.map(transform));
        this.each(
            out.add.bind(out),
            out.remove.bind(out)
        );
        return out;
    },

    /**
     * Distribute options
     *
     * @typedef {DistributeOptions}
     * @prop {Array} plugins a list of scramjet plugins to load (if omitted, will use just the ones in scramjet itself)
     * @prop {String} StreamClass the class to deserialize the stream to.
     * @prop {Number} threads maximum threads to use - defauls to number of processor threads in os, but it may be sensible to go over this value if you'd intend to run synchronous code.
     */

    /**
     * Function or string pointing to a scramjet-module.
     *
     * A scramjet-module is a simple node.js module that exports a single method as module.exports (or default export).
     * It will be called the same way as a UseCallback
     *
     * @typedef {ClusterCallback}
     */

    /**
     * Distributes processing to multiple forked subprocesses.
     *
     * @memberof MultiStream#
     * @param {ClusterCallback[]} clusterFunc a cluster callback with all operations working similarily to DataStream::use
     * @param {DistributeOptions} options
     * @return {MultiStream}    the resulting stream
     */
    cluster(clusterFunc, {plugins = [], threads = os.cpus().length * 2, StreamClass, createOptions = {}}) {
        const out = new MultiStream();

        StreamWorker.fork(threads);

        this.each(
            (stream) => StreamWorker
                .fork(1)
                .then(
                    ([worker]) => out.add(worker.delegate(stream, clusterFunc, plugins)
                        .pipe(new StreamClass(createOptions)))
                )
        );

        return out;
    },

};
