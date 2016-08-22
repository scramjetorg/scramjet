const Writeable = require("stream").Writable;

class Accumulator extends Writeable {

    constructor(into, flowCtl, options) {
        super(Object.assign({
            objectMode: true
        }, options));
        this.into = into;
        this.flowCtl = flowCtl;
    }

    // key { get, set };
    //
    // DataStream use(Callback<DataEmitter> dataEmitter);
    // Complex transform(Callback<Complex> transform);
    //
    // Complex carry(Callback<Accumulator, Complex> setter);

}

module.exports = Accumulator;
