const {DataStream} = require("./");
const {spawn} = require("child_process");
const path = require("path");

const platform = require("os").platform();

/** @ignore */
const getCalleeDirname = require("scramjet-core/lib/util/utils").getCalleeDirname;

module.exports = {

    /**
     * Splits the string stream by the specified regexp or string
     *
     * @chainable
     * @memberof module:scramjet.StringStream#
     * @param  {string|RegExp} [eol=/\r?\n/] End of line string or regex
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
     * @memberof module:scramjet.StringStream#
     * @param {Boolean} [perLine=true] instructs to split per line
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
     * @memberof module:scramjet.StringStream#
     * @param {object} [options={}] options for the papaparse.parse method.
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
     * @memberof module:scramjet.StringStream#
     * @param {ThenFunction|string} param the argument to append. If function passed then it will be called and resolved and the resolution will be appended.
     *
     * @test test/methods/string-stream-append.js
     */
    append(param) {
        return typeof param === "function" ? this.map(item => Promise.resolve(item).then(param).then((result) => item + result)) : this.map(item => item + param);
    },

    /**
     * Prepends given argument to all the items.
     *
     * @chainable
     * @memberof module:scramjet.StringStream#
     * @param {ThenFunction|string} param the argument to prepend. If function passed then it will be called and resolved
     *                              and the resolution will be prepended.
     *
     * @test test/methods/string-stream-prepend.js
     */
    prepend(param) {
        return typeof param === "function" ? this.map(item => Promise.resolve(item).then(param).then((result) => result + item)) : this.map(item => param + item);
    },

    /**
     * @typedef {object} ExecOptions
     * @memberof module:scramjet~
     * @property {number} [stream=1] (bitwise) the output stdio number to push out (defaults to stdout = 1)
     * @property {string[]} [interpreter=[]] defaults to nothing, except on windows where "cmd.exe /c" will be spawned by default
     * @extends child_process.SpawnOptions
     */

    /**
     * Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
     *
     * Pipes the current stream into the sub-processes stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     *
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     *
     * @param {string} command command to execute
     * @memberof module:scramjet.StringStream#
     * @param {ExecOptions|any} [options={}] options to be passed to `spawn` and defining serialization.
     * @param {string[]} ...args additional arguments (will overwrite to SpawnOptions args even if not given)
     *
     * @test test/methods/string-stream-exec.js
     */
    exec(command, options, ...args) {
        const shell = process.env.SHELL ? [process.env.SHELL] : platform === "win32" ? ["cmd.exe","/c"] : [];
        const { stream = 1, interpreter = shell } = (options || {});

        const out = this.tap()._selfInstance({referrer: this});

        const spawnOptions = Object.assign({}, options);
        spawnOptions.stdio = ["pipe", "pipe", "pipe"];

        const resolvedCommand = path.resolve(getCalleeDirname(1), command);

        const actualArgs = interpreter && interpreter.length ? [...interpreter.slice(1), resolvedCommand, ...args] : args;
        const actualCmd = interpreter && interpreter.length ? interpreter[0] : resolvedCommand;

        let end = 1;
        const ended = () => end-- || out.end();

        const proc = spawn(actualCmd, actualArgs, spawnOptions);
        this.catch(e => proc.kill(e.signal));
        proc.on("error", e => {
            ended();
            return out.raise(e);
        });
        proc.on("exit", async exitCode => {
            if (exitCode > 0) {
                const error = Object.assign(new Error(`Non-zero exitcode (${exitCode}) returned from command "${resolvedCommand}"`), {exitCode});
                await out.raise(error);
            }

            ended();
        });

        this.pipe(proc.stdin);
        proc.stdin.on("error", async e => {
            if (!(e.code === "EPIPE")) {
                await out.raise(e);
            }
            // ignore EPIPE after end
        });
        if (stream & 1) proc.stdout.on("end", () => ended()).pipe(out, {end: false});
        if (stream & 2) proc.stderr.on("end", () => ended()).pipe(out, {end: false});

        return out;

    }

};
