/* eslint-disable node/no-unsupported-features/es-syntax */

module.exports = async function*(cons = {}) {
    cons.a = await (yield);
    cons.b = await (yield);

    return;
};
