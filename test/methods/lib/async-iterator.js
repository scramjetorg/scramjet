/* eslint-disable node/no-unsupported-features/es-syntax */

module.exports = async function*(x = 1, z = 0) {
    yield* [10 + x + z, 20 + x + z];
    await new Promise(res => process.nextTick(res));
    if (z === 666) throw new Error("An error occured");
    yield* [30 + x + z, 40 + x + z];
};
