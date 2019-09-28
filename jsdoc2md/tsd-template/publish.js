// eslint-disable-next-line node/no-unpublished-require
const {publish} = require("@otris/jsdoc-tsd/src-out/publish");

module.exports = {
    publish(data, opts) {
        data({ undocumented: true }).remove();

        data({ inherited: true }).update(function() {
            if (this.tags && this.tags.find(({title}) => title === "chainable")) {
                const wouldReturn = this.inherits.substring(
                    this.inherits.indexOf(".") + 1,
                    this.inherits.length - this.name.length - 1
                );
                const shouldReturn = this.memberof.substring(
                    this.memberof.indexOf(".") + 1
                );
                this.returns.forEach(
                    value => value.type && value.type.names && (value.type.names = value.type.names.map(
                        name => name === wouldReturn ? shouldReturn : name
                    ))
                );
            }
        });

        return publish(data, opts);
    }
};
