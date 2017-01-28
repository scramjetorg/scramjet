const scramjetWithAssign = require('../../')
    .plugin('assign', class AssginedStream extends this.DataStream {
        constructor(conv) {
            super({
                parallelTransform: (obj) => Promise.resolve(obj)
                    .then(conv)
                    .then((res) => Object.assign({}, obj, res))
            });
        }
    })
    .plugin({
        StringStream: (base) => class extends base {
            replace() {
                return this;
            }
        }
    });


const fs = require('fs');

fs.createReadStream('aaa.txt')
    .pipe(new scramjetWithAssign.StringStream())
    .split("\n")
    .parse((line) => ({
        line: line,
        length: line.lenth
    }))
    // .assign(
    //     (item) => ({
    //         match: item.line.match("Z")
    //     })
    // )
    .toStringStream(
        (item) => JSON.stringify(item) + "\n"
    )
    .pipe(
        process.stdout
    )
;
