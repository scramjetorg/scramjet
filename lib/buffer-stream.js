const {StringStream} = require("./index");

module.exports = {
    /**
     * Executes a given subprocess with arguments and pipes the current stream into it while returning the output as another DataStream.
     *
     * Pipes the current stream into the subprocesses stdin.
     * The data is serialized and deserialized as JSON lines by default. You
     * can provide your own alternative methods in the ExecOptions object.
     *
     * Note: if you're piping both stderr and stdout (options.stream=3) keep in mind that chunks may get mixed up!
     *
     * @see {StringStream#exec}
     * @param {String} cmd command to execute
     * @memberof BufferStream#
     * @param {ExecOptions} options options to be passed to `spawn` and defining serialization.
     * @param {String} args addtional arguments (will overwrite to SpawnOptions args even if not given)
     *
     * @test test/methods/buffer-stream-exec.js
     */
    exec: StringStream.exec
};
