const {publish} = require("@otris/jsdoc-tsd/src-out/src/core/publish");

/**
 * @param {String} a
 * @param {String} b
 */
const unprefix = (a, b) => {
    if (a === b) return ['',''];
    if (a[0] !== b[0]) return [a,b];

    const len = Math.min(a.length, b.length);
    let pos = len;

    for (let i = 1; i < Math.log2(len) + 1; i++) {
        if (a.substr(0, pos) === b.substr(0, pos)) {
            if (a[pos] !== b[pos]) break;
            pos += Math.floor(len / 2**i);
        } else {
            pos -= Math.floor(len / 2**i);
        }
    }

    return [a.substr(pos), b.substr(pos)];
}

module.exports = {
    publish(data, opts) {
        data({ undocumented: true }).remove();

        data({ inherited: true }).update(function() {
            if (this.tags && this.tags.find(({title}) => title === "chainable")) {
                const wouldReturn = this.inherits.substring(
                    this.inherits.indexOf('.') + 1,
                    this.inherits.length - this.name.length - 1
                );
                const shouldReturn = this.memberof.substring(
                    this.memberof.indexOf('.') + 1
                );
                this.returns.forEach(
                    value => value.type && value.type.names && (value.type.names = value.type.names.map(
                        name => name === wouldReturn ? shouldReturn : name
                    ))
                )
            }
        });

        return publish(data, opts);
    }
}
