const {MultiStream, DataStream, StringStream} = require('../');
const ref = {};
const fini = require('infinite-sequence-generator');
const {fork} = require('child_process');
const os = require("os");

let workerSeq = 0;
const workers = [];

module.exports = class StreamWorker {

    constructor(def) {
        if (def !== ref) {
            throw new Error("Private constructor");
        }
        this.timeout = 1e3;
        this.child = null;
        this.resolving = null;
        this._seq = fini();

        this._mux_in = new MultiStream();
        this._input = this._mux_in.mux().JSONStringify();

        this._output = new StringStream();
        this._mux_out = {};

        this._output.JSONParse().separateInto(
            this._mux_out,
            ({streamId}) => streamId
        );

    }

    async spawn() {
        return this.resolving || (this.resolving = new Promise((res, rej) => {

            this._child = fork(__dirname + '/stream-child', {
                stdio: [0, 1, 2, 'ipc', 'pipe', 'pipe']
            });

            this._input.pipe(this._child.stdio[4]);
            this._child.stdio[5].pipe(this._output);

            let resolved = false;
            let rejected = false;

            this._child.on('message',
                (data) => (data === 'I' ?
                    resolved = true && res(this) :
                    rejected || (rejected = true) && rej(new Error("StreamWorker child failed to register!"))
                )
            );
            this._child.on('error',
                (err) => resolved ? rejected || (rejected = true) && rej(err) : this._output.emit("error", err)
            );

            setTimeout(() => resolved || rejected || (rejected = true) && rej(new Error("StreamWorker child timeout!")), 1e3);
        }));
    }

    delegate(input, delegateFunc, plugins = []) {
        input.tap();

        const streamId = this._seq.next().value;

        this._child.send({
            type: 0, // 0 - start, 1 - end
            streamId,
            plugins,
            streamClass: input.constructor.name,
            transform: delegateFunc.toString()
        });

        const output = new DataStream();
        this._mux_out[streamId] = output;

        this._mux_in.add(input.pipe(new DataStream({
            parallelTransform(item) {
                return {item, streamId};
            },
            flushPromise() {
                return [{end:1,streamId}];
            }
        })));

        return output.map(({item}) => item);
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
