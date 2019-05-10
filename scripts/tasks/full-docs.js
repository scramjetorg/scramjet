const Vinyl = require("vinyl");
const gulp = require("gulp");
const {DataStream} = require("../../");
const dmd = require("dmd");
const jsdoc = require("jsdoc-api");
const jsdocParse = require("jsdoc-parse");
const rename = require("gulp-rename");
const log = require("fancy-log");
const {promisify} = require("util");
const fs = require("fs");
const path = require("path");

module.exports = (source, corepath, options, jsdocOptions, dest) => {
    return async function makeDocs() {
        /// TODO: get all files first
        const sourcesStream = DataStream
            .from(gulp.src(source))
            .map(async (file) => {
                const files = [file.path];
                const corefile = path.resolve(corepath, path.basename(file.path));

                const isCoreExtension = await (promisify(fs.access)(corefile, fs.constants.R_OK).then(() => true, () => false));
                if (isCoreExtension)
                    files.unshift(corefile);

                const data = await jsdoc.explain({files, ...jsdocOptions});
                const parsed = await jsdocParse(data);

                return {file, files, data, parsed};
            })
            .keep()
            .resume();

        const classes = {};
        const modules = {};
        const target = item => {
            let src = "orphans.js";

            if (item.kind === "class") src = item.meta.filename;
            else if (item.kind === "module") src = "index.js";
            else if (item.memberof in classes) src = classes[item.memberof].meta.filename;
            else if (item.memberof in modules && item.scope === "inner") src = "definitions.js";
            else if (item.memberof in modules) src = modules[item.memberof].meta.filename;

            return src.replace(/\.[^.]+$/, ".md");
        };

        const index = await sourcesStream
            .rewind()
            .flatMap(({parsed}) => parsed)
            .filter(({ignore, undocumented}) => !ignore && !undocumented)
            .reduce((acc, item) => {
                if (item.kind === "module") {
                    modules[item.name] = modules[item.longname] = item;
                } else if (item.kind === "class") {
                    classes[item.name] = classes[item.longname] = item;
                    item.memberof = undefined;
                }

                item.target = target(item);

                acc[item.name] = item;
                acc[item.longname] = item;
                return acc;
            }, {})
        ;

        const contents = await sourcesStream
            .rewind()
            .setOptions({maxParallel: 32})
            .flatMap(async ({parsed}) => {
                parsed.fullIndex = index;
                parsed.forEach(item => {
                    item.target = target(item);
                });

                return parsed;
            })
            .filter(({target, ignore, undocumented}) => target && !ignore && !undocumented)
            .accumulate((files, item) => {
                (files[item.target] = files[item.target] || []).push(item);
            }, {});

        DataStream.from(Object.entries(contents))
            .map(async ([filename, contents]) => {
                if (filename === "orphans.md") {
                    contents.forEach(item => log.warn("Orphaned doclet", item.longname, item.meta && `${item.meta.filename}:${item.meta.lineno}`));
                    throw new Error("Orphaned documentation found");
                }
                if (filename === "definitions.md") {
                    contents.forEach(item => item.memberof = undefined);
                }
                contents.fullIndex = index;

                const output = await dmd.async(contents, {
                    ...options,
                    "member-index-format": "list"
                });

                return new Vinyl({
                    path: filename,
                    contents: Buffer.from(output)
                });
            })
            .catch((err) => {
                log.error("dmd failed", err.stack);
                return undefined;
            })
            .pipe(rename(function(path) {
                path.extname = ".md";
            }))
            .pipe(gulp.dest(dest))
        ;
    };
};
