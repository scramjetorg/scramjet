# Complex Object Interface

    interface Complex {

        key { get, set };

        DataStream use(Callback<DataEmitter> dataEmitter);
        Complex transform(Callback<Complex> transform);

        Complex carry(Callback<Accumulator, Complex> setter);

    }
