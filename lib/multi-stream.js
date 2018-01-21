const {MultiStream, StreamWorker} = require('./');
const os = require('os');

module.exports = {
    /**
     * Re-routes streams to a new MultiStream of specified size
     *
     * @memberof module:ScramjetCore~MultiStream#
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
     * @memberof module:ScramjetCore~MultiStream#
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
     * [Beta] Distributes processing to multiple forked subprocesses.
     *
     * @memberof module:ScramjetCore~MultiStream#
     * @todo BETA
     * @param {ClusterCallback} clusterFunc a cluster callback with all operations working similarily to DataStream::use
     * @param {DistributeOptions} options
     * @return {MultiStream}    the resulting stream
     */
    cluster(clusterFunc, {plugins = [], threads = os.cpus().length, StreamClass, createOptions = {}}) {
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
