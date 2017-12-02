/**
 * @memberof module:ScramjetCore~
 * @callback AffinityCallback
 * @param {Object} chunk a the object
 * @return {Promise|Object}  the key to hash by (key is used in a Map)
 */

/**
 * Affinity functions allow specific chunks to be affixed to specific output streams.
 *
 * This is mainly intended for use for separation of data to specific threads for cache reusability. In other words it's
 * like sticky session of the stream chunks.
 *
 * @memberof module:ScramjetCore~
 * @callback AffinityFunction
 * @param {Function} affinity Affinity callback for chaining
 * @param {number} length     Length of the stream set to calculate affinity for
 * @return {AffinityCallback}  the affinity callback called by separate, cluster and route functions
 */

/**
 * An object aggregaating standard affinity functions.
 *
 * @memberof module:ScramjetCore~
 * @type {Object}
 */
module.exports = {
    /**
     * A simple round robin affinity.
     *
     * @param {Function} affinity Affinity callback for chaining - ingored in this case
     * @param {number} [length=Math.pow(2,33)] Length of hash
     * @return {AffinityCallback}
     */
    RoundRobin: (affinity, length = (1 << 30) * 8) => {
        let seq = new Uint32Array(1);
        return () => (seq[0]++) % length;
    },

    ConstistentHashRing: (affinity, length = Math.pow(2,52), seed = Math.random()*Math.pow(2^51)) => {
        const LC = require("light-cycle");
        const lc = new LC({
            seed,
            size: length
        });
        for (let i = 0; i < length; i++) {
            lc.add(`${i}`);
        }

        return async (item) => lc.locate(await affinity(item));
    },

};
