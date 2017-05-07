    const {DataStream} = require("../../");
    const assert = require('assert');

    class Stream extends DataStream {
        constructor() {
            super({highWaterMark: 1});
            this.counter = 0;
        }

        _read() {
            console.log("read", this.counter);
            this.counter += 1;
            if (this.counter >= 30) {
                this.push(null);
            } else {
                this.push(this.counter);
            }
        }
    }

    const stream = new Stream().batch(3);

    stream.each(console.log).whenRead()
        .then(
            (res) => {
                console.log("run", res);
                //assert.deepEqual(res, [1, 2, 3]);
                return stream.whenRead();
            }
        )
        .then(
            (res) => {
                console.log("run", res);
                assert.deepEqual(res, [1, 2, 3]);
            }
        )
        .then(
            () => console.log("yay!")
        )
        .catch(
            (e) => console.log(e)
        );
