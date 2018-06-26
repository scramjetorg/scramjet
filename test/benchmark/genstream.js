const Readable = require("stream").Readable;
const path = require("path");

const Generator = function* (max) {
    let next = 0;
    while (next++ < max) {
        yield next;
    }
};

const max = process.argv[2];

class GeneratedStream extends Readable {

    constructor(max, options) {
        super(options);
        this.gen = Generator(max);
    }

    _read() {
        const next = this.gen.next();

        if (next.done) {
            this.push(null);
        } else {
            this.push(JSON.stringify({value: next.value}) + "\n");
        }
    }
}
module.exports = GeneratedStream;

if (!(path.relative(path.resolve(process.cwd(), process.argv[1]), path.resolve(__filename))))
    new GeneratedStream(max || 10)
        .pipe(process.stdout);
