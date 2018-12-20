const {DataStream} = require("./");
const {spawn} = require("child_process");

module.exports = {

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @chainable
     * @memberof StringStream#
     * @param  {String} [eol=/\r?\n/] End of line string
     *
     * @test test/methods/string-stream-split.js
     */
    lines(eol = /\r?\n/) {
        return this.split(eol);
    },

    /**
     * Parses each entry as JSON.
     * Ignores empty lines
     *
     * @chainable
     * @memberof StringStream#
     * @param {Boolean} perLine instructs to split per line
     * @return {DataStream}  stream of parsed items
     */
    JSONParse(perLine = true) {
        let str = this;
        if (perLine) {
            str = str.lines();
        }

        return str.filter(a => a !== "").parse(JSON.parse);
    },

    /**
     * Parses CSV to DataString using 'papaparse' module.
     *
     * @chainable
     * @memberof StringStream#
     * @param options options for the papaparse.parse method.
     * @return {DataStream}  stream of parsed items
     * @test test/methods/data-stream-separate.js
     */
    CSVParse(options = {}) {
        const out = new DataStream();
        require("papaparse").parse(this, Object.assign(options, {
            chunk: async ({data, errors}, parser) => {
                if (errors.length) {
                    return out.raise(Object.assign(new Error(), errors[0]));
                }

                if (!out.write(data)) {
                    parser.pause();
                    await out.whenDrained();
                    parser.resume();
                }
            },
            complete: () => {
                out.end();
            },
            error: (e) => {
                out.emit("error", e);
            }
        }));

        return out.flatten();
    },

    /**
     * Appends given argument to all the items.
     *
     * @chainable
     * @memberof StringStream#
     * @param {Function|String} arg the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     *
     * @test test/methods/string-stream-append.js
     */
    append(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => item + result)) : this.map(item => item + arg);
    },

    /**
     * Prepends given argument to all the items.
     *
     * @chainable
     * @memberof StringStream#
     * @param {Function|String} arg the argument to prepend. If function passed then it will be called and resolved
     *                              and the resolution will be prepended.
     *
     * @test test/methods/string-stream-prepend.js
     */
    prepend(arg) {
        return typeof arg === "function" ? this.map(item => Promise.resolve(item).then(arg).then((result) => result + item)) : this.map(item => arg + item);
    },

    /**
     * @typedef ExecOptions
     * @property {number} [stream=1] (bitwise) the output stdio number to push out (defaults to stdout = 1)
     * @extends child_process.SpawnOptions
     */

    /**
     * Executes a given subprocess with arguments and pipes the current stream into it while returning the output as another DataStream.
     *
     * Pipes the current stream into the subprocesses stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     *
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     *
     * @param {String} cmd command to execute
     * @param {ExecOptions} options options to be passed to `spawn` and defining serialization.
     * @param {String} args addtional arguments (will overwrite to SpawnOptions args even if not given)
     */
    exec(cmd, options, ...args) {
        const { stream = 1 } = (options || {});

        const out = this._selfInstance({referrer: this});

        const spawnOptions = Object.assign({}, options);
        spawnOptions.args = args;
        spawnOptions.stdio = ["pipe", "pipe", "ignore"];

        const proc = spawn(cmd, spawnOptions);
        this.catch(e => proc.kill(e.signal));
        proc.on("error", e => this.raise(e));
        proc.on("exit", code => code && out.raise(new Error(`Non-zero exitcode (${code}) returned from command "${cmd}"`)));

        this.tap().pipe(proc.stdin);
        if (stream & 1) proc.stdout.pipe(out);
        if (stream & 2) proc.stderr.pipe(out);

        return out;

    }

};
