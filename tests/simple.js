const request = require("request");
const Transform = require("stream").Transform;

class SplitStreamBySeparator extends Transform {

    constructor(separator, ...args) {
        super(...args);
        this.buffer = "";
        this.separator = separator;
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString("utf-8");
        const newChunks = this.buffer.split(this.separator);
        while(newChunks.length > 1) {
            this.push(newChunks.shift());
        }
        this.buffer = newChunks[0];
        callback();
    }

    _flush(callback) {
        callback(null, this.buffer);
    }

}

request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(
        new SplitStreamBySeparator(/\r?\n/g)
    ).on("data",
        (data) => console.log("Dat: " + data)
    );
