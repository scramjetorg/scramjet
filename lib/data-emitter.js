const DataStream = require("../data-stream");

class DataEmitter extends DataStream {

    constructor(pull, out_of, flowCtl, options) {
        super(Object.assign({
            objectMode: true
        }, options));
        this.flowCtl = flowCtl;
        this.pull = pull;
        this.out_of = out_of;
    }

    _read(count) {
        this.pull(out_of);
    }

    // key { get, set };
    //
    // DataStream use(Callback<DataEmitter> dataEmitter);
    // Complex transform(Callback<Complex> transform);
    //
    // Complex carry(Callback<Accumulator, Complex> setter);

}

module.exports = DataEmitter;
