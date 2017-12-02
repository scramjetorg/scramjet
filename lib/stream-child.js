const sj = require('../');
const vm = require('vm');
const fs = require('fs');

const inputs = {};
const outputs = {};

const processOutputs = new sj.MultiStream();

processOutputs.mux()
    .JSONStringify()
    .pipe(fs.createWriteStream(null, {fd:5}))
;

process.on('message', (msg) => {
    const {streamClass, plugins, transform, streamId} = msg;

    if (plugins)
        for (let plugin of plugins) {
            sj.plugin(require(plugin));
        }

    processOutputs.add(
        outputs[streamId] = new sj.DataStream({
            parallelTransform(item) {
                return {streamId, item};
            },
            flushPromise() {
                return [{streamId, end: 1}];
            }
        })
    );

    inputs[streamId] = new sj[streamClass]({
        parallelTransform({end, item}) {
            if (end) {
                return null;
            } else {
                return item;
            }
        }
    });

    try {
        const ret = vm.runInThisContext(transform)(inputs[streamId]);
        ret.pipe(outputs[streamId]);
    } catch (error) {
        outputs[streamId].whenWrote({ streamId, error })
            .then(outputs[streamId].end());
    }

});

fs.createReadStream(null, {fd: 4})
    .pipe(new sj.StringStream())
    .JSONParse()
    .separateInto(inputs, ({streamId}) => streamId);

process.send("I");
