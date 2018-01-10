const {DataStream, StringStream} = require('../');
const ref = {};
const {fork} = require('child_process');
const os = require("os");

const net = require('net');

let workerSeq = 0;
const workers = [];

module.exports = class StreamWorker {

    constructor(def) {
        if (def !== ref) {
            throw new Error("Private constructor");
        }

        this._refcount = 0;

        this.timeout = 1e3;
        this.child = null;
        this.resolving = null;
        this.ip = `127.190.${process.pid % 256}.${process.pid >> 8}`;
        this.port = 0;
    }

    async spawn() {
        return this.resolving || (this.resolving = new Promise((res, rej) => {

            this._child = fork(__dirname + '/stream-child', [this.ip]);

            let resolved = false;
            let rejected = false;

            this._child.once('message', ({port}) => (this.port = +port, resolved = true, res(this)));
            this._child.once('error', (e) => (rejected = true, rej(e)));

            setTimeout(() => resolved || rejected || (rejected = true) && rej(new Error("StreamWorker child timeout!")), 1e3);
        }));
    }

    delegate(input, delegateFunc, plugins = []) {

        const sock = new net.Socket({allowHalfOpen: true});

        const _in =
            new DataStream();

        const _out =
            _in.JSONStringify()
            .pipe(sock.connect(this.port, this.ip))
            .pipe(new StringStream)
            .JSONParse()
            .filter(
                ({error}) => {
                    if (error) {
                        const err = new Error(error.message);
                        err.stack = "[child]" + error.stack;
                    }
                    return true;
                }
            )
        ;

        _in.unshift({
            type: 0, // 0 - start, 1 - end
            plugins,
            streamClass: input.constructor.name,
            transform: delegateFunc.toString()
        });

        input.pipe(_in);

        return _out;
    }

    static async fork(count = os.cpus().length) {

        for (let i = workers.length; i < count; i++)
            workers.push(new StreamWorker(ref));

        return Promise.all(new Array(count).fill(1).map(() => this._getWorker()));
    }

    static async _getWorker() {
        return workers[workerSeq = ++workerSeq % workers.length].spawn();
    }

};
