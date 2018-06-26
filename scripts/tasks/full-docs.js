const gulp = require("gulp");
const {DataStream} = require("../../");
const {jsdoc2md} = require("scramjet-core/scripts/lib/util");
const rename = require("gulp-rename");
const log = require("fancy-log");
const {promisify} = require("util");
const fs = require("fs");
const path = require("path");

module.exports = (source, corepath, jd2mdConfig, dest) => {
    return function makeDocs() {
        return DataStream.from(gulp.src(source))
            .map(async (file) => {
                const files = [file.path];
                const corefile = path.resolve(corepath, path.basename(file.path));

                const isCoreExtension = await (promisify(fs.access)(corefile, fs.constants.R_OK).then(() => true, () => false));
                if (isCoreExtension)
                    files.unshift(corefile);

                const output = await jsdoc2md(Object.assign(jd2mdConfig, {files}));
                file.contents = Buffer.from(output);

                return file;
            })
            .on("error", function(err) {
                log.error("jsdoc2md failed", err.stack);
            })
            .pipe(rename(function(path) {
                path.extname = ".md";
            }))
            .pipe(gulp.dest(dest));
    };
};
