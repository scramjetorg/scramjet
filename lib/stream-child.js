const sj = require("../");
const vm = require("vm");
const net = require("net");

const server = net.createServer(
    { allowHalfOpen: true },
    (stream) => {
        const output = new sj.DataStream();

        output.JSONStringify().pipe(stream);
        const input = stream.pipe(new sj.StringStream())
            .JSONParse()
            .shift(1, async ([msg]) => {
                server.unref();

                try {
                    const transforms = msg.transforms.map((func) => {
                        if (typeof func === "string") {
                            return vm.runInThisContext(func);
                        } else if (!Array.isArray(func)) {
                            throw new Error("Transforms must come as functions or Array's");
                        }

                        let ret = require(func[0]);
                        if (func[1]) {
                            ret = func[1]
                                .split(".")
                                .reduce(
                                    (acc, key) => acc[key],
                                    ret
                                );
                        }

                        return ret.bind(...func.slice(2));
                    });

                    if (msg.plugins)
                        for (let plugin of msg.plugins) {
                            sj.plugin(require(plugin));
                        }

                    let current = input.pipe(
                        new sj[msg.streamClass]()
                    );

                    for (let transform of transforms) {
                        current = await transform(current);
                    }

                    current
                        // this requires a better protocol with error resolution down stream
                        .catch(({ message, stack }) => output.end({ error: { message, stack } }))
                        .pipe(output);
                } catch (e) {
                    const { message, stack } = e;
                    return output.whenWrote({ error: { message, stack } })
                        .then(output.end());
                }
            });
    }
);

server.listen(0, process.argv[2], () => {
    const port = server.address().port;
    process.send({ port });
});

if (+process.argv[3]) setTimeout(() => server.unref(), +process.argv[3]);
process.on("error", e => process.send({ error: { message: e.message, stack: e.stack } }));
process.on("unhandledRejection", e => process.send({ error: { message: e.message, stack: e.stack } }));
