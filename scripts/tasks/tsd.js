const gulp = require("gulp");
const jsdoc3 = require("gulp-jsdoc3");
const replace = require("replace-in-file");

module.exports = function(files, config) {
    return (cb) => {
        gulp.src(files, { read: false })
            .pipe(jsdoc3(config, async () => {
                await replace({
                    files: config.opts.destination,
                    from: [
                        "class StringStream {",
                        "class BufferStream {",
                        "class WindowStream {",
                        "class NumberStream {",
                    ],
                    to: [
                        "class StringStream extends DataStream {",
                        "class BufferStream extends DataStream {",
                        "class WindowStream extends NumberStream {",
                        "class NumberStream extends DataStream {",
                    ]
                });

                cb();
            }));
    };
};
