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
            .shift(1, ([msg]) => {
                try {
                    const transform = vm.runInThisContext(msg.transform);

                    if (msg.plugins)
                        for (let plugin of msg.plugins) {
                            sj.plugin(require(plugin));
                        }

                    transform(
                            input.pipe(
                                new sj[msg.streamClass]()
                            )
                        )
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
