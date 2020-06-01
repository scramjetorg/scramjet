const {DataStream, StringStream} = require("../");
const ref = {};
const {fork} = require("child_process");
const os = require("os");

const net = require("net");

let workerSeq = 0;
const workers = [];

/**
 * StreamWorker class - intended for internal use
 *
 * This class provides control over the subprocesses, including:
 *  - spawning
 *  - communicating
 *  - delivering streams
 *
 * @internal
 * @memberof module:scramjet
 */
class StreamWorker {

    /**
     * Private constructor
     */
    constructor(def) {
        if (def !== ref) {
            throw new Error("Private constructor");
        }

        this._refcount = 0;

        this.timeout = 1e3;
        this.child = null;
        this.resolving = null;

        this.ip = "localhost";
        this.port = 0;
    }

    /**
     * Spawns the worker if necessary and provides the port information to it.
     *
     * @async
     * @return {StreamWorker}
     */
    async spawn() {
        return this.resolving || (this.resolving = new Promise((res, rej) => {
            this._child = fork(__dirname + "/stream-child", [this.ip, this.timeout]);

            let resolved = false;
            let rejected = false;

            this._child.once("message", ({port}) => (this.port = +port, resolved = true, res(this)));
            this._child.once("error", (e) => (rejected = true, rej(e)));
            this._child.once("exit", (code) => {
                if (!code) // no error, child exited, clear the promise so that it respawns when needed
                    this.resolving = null;
                else
                    this.resolving = Promise.reject(new Error("Child exited with non-zero status code: " + code));
            });

            setTimeout(() => resolved || rejected || (rejected = true) && rej(new Error("StreamWorker child timeout!")), this.timeout);
        }));
    }

    /**
     * Delegates a stream to the child using tcp socket.
     *
     * The stream gets serialized using JSON and passed on to the sub-process.
     * The sub-process then performs transforms on the stream and pushes them back to the main process.
     * The stream gets deserialized and outputted to the returned DataStream.
     *
     * @param  {DataStream} input stream to be delegated
     * @param  {TeeCallback[]|Array} delegateFunc Array of transforms or arrays describing ['module', 'method']
     * @param  {any[]} [plugins=[]] List of plugins to load in the child
     * @return {DataStream} stream after transforms and back to the main process.
     */
    delegate(input, delegateFunc, plugins = []) {

        const sock = new net.Socket().setNoDelay(true);

        const _in = new DataStream();

        const _out = _in
            .JSONStringify()
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
            transforms: delegateFunc.map(
                func => typeof func === "function" ? func.toString() : (Array.isArray(func) ? func : [func])
            )
        });

        input.pipe(_in);

        return _out;
    }

    /**
     * Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.
     *
     * @async
     * @param  {number}  [count=os.cpus().length] Number of processes to spawn. If other subprocesses are active only the missing ones will be spawned.
     * @return {Array<StreamWorker>}  list of StreamWorkers
     */
    static async fork(count = os.cpus().length) {

        for (let i = workers.length; i < count; i++)
            workers.push(new StreamWorker(ref));

        return Promise.all(new Array(count).fill(1).map(() => this._getWorker()));
    }

    /**
     * Picks next worker (not necessarily free one!)
     *
     * @async
     * @return {StreamWorker}
     */
    static async _getWorker() {
        // TODO: Use free / not fully utilized workers first.

        return workers[workerSeq = ++workerSeq % workers.length].spawn();
    }

}

module.exports = StreamWorker;
