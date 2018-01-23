const sj = require('../');
const vm = require('vm');
const net = require('net');

const server = net.createServer(
    {allowHalfOpen: true},
    (stream) => {
        const output = new sj.DataStream();

        output.JSONStringify().pipe(stream);

        const input = stream.pipe(new sj.StringStream())
            .JSONParse()
            .shift(1, async ([msg]) => {
                server.unref();

                try {
                    const transforms = msg.transforms.map((func) => {
                        if (typeof func === 'string') {
                            return vm.runInThisContext(func);
                        }

                        return require(func[1])[func[2]];
                    });

                    if (msg.plugins)
                        for (let plugin of msg.plugins) {
                            sj.plugin(require(plugin));
                        }

                    let current = input.pipe(
                        new sj[msg.streamClass]()
                    );
                    for (let transform of transforms) {
                        current = await transform(
                            current
                        );
                    }

                    current
                        .on('error', ({message, stack}) => output.end({ error: {message, stack} }))
                        .pipe(output);
                } catch(e) {
                    const {message, stack} = e;
                    return output.whenWrote({ error: {message, stack} })
                        .then(output.end());
                }
            });
    }
);

server.listen(0, process.argv[2], () => {
    const port = server.address().port;
    process.send({port});
});

process.on("error", e => process.send(e));
process.on("unhandledRejection", e => process.send(e));
