const Writeable = require("stream").Writeable;

class Accumulator extends Writeable {

    constructor(write, writev) {
        super({
            objectMode: true,
            _write: write,
            _writev: writev
        });
    }

    use(func) {

    }

    // key { get, set };
    //
    // DataStream use(Callback<DataEmitter> dataEmitter);
    // Complex transform(Callback<Complex> transform);
    //
    // Complex carry(Callback<Accumulator, Complex> setter);

}

module.exports = Accumulator;
