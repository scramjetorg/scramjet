/* eslint-disable node/no-unpublished-require */
const gulp = require("gulp");
const env = require("gulp-env");
const path = require("path");
const rename = require("gulp-rename");
const eslint = require("gulp-eslint");
const shell = require("gulp-shell");
const jsdoc3 = require("gulp-jsdoc3");
const log = require("fancy-log");
const execp = require("child_process").exec;
const jsdoc = require("jsdoc-api");
const jsdocParse = require("jsdoc-parse");
const dmd = require("dmd");
const {promisify} = require("util");
const fs = require("fs");

const {DataStream} = require("./");

const corepath = path.dirname(require.resolve("scramjet-core"));
const FILES = [
    path.dirname(require.resolve("scramjet-core")) + "/index.js",
    path.dirname(require.resolve("scramjet-core")) + "/data-stream.js",
    path.dirname(require.resolve("scramjet-core")) + "/string-stream.js",
    path.dirname(require.resolve("scramjet-core")) + "/buffer-stream.js",
    path.dirname(require.resolve("scramjet-core")) + "/multi-stream.js",
    "lib/index.js",
    "lib/data-stream.js",
    "lib/string-stream.js",
    "lib/buffer-stream.js",
    "lib/number-stream.js",
    "lib/window-stream.js",
    "lib/multi-stream.js"
];

gulp.task("lint", () => {
    return gulp.src(["**/*.js","!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test_legacy", function () {

    return gulp.src([
        path.resolve(corepath, "../test/v1/*.js"),
        "test/v1/*.js"
    ])
        .pipe(env({
            vars: {
                SCRAMJET_TEST_HOME: __dirname
            }
        }))
        .pipe(new DataStream())
        .use("nodeunit-tape-compat", {timeout: 5000})
        .run()
    ;
});

gulp.task("scm_clean", function(cb){
    execp("git status --porcelain", (err, stdout) => {
        if (err) {
            cb(err);
        } else if (stdout.trim()) {
            cb(new Error("Workdir not clean!"));
        } else {
            cb();
        }
    });
});

gulp.task("test_samples", shell.task("node test/samples/test-samples"));

const jsdoc2md = async ({files, plugin}) => {

    const data = await jsdoc.explain({files});
    const parsed = await jsdocParse(data);
    const output = await dmd.async(parsed, {plugin});

    return output;
};

gulp.task("readme", async () => {
    return promisify(fs.writeFile)(
        path.join(__dirname, "README.md"),
        await jsdoc2md({
            files: FILES.slice(),
            plugin: [
                "scramjet-core/jsdoc2md/plugin.js",
                "jsdoc2md/plugin.js",
            ]
        })
    );
});

gulp.task("tsd", (cb) => {
    gulp.src(FILES.slice(), { read: false })
        .pipe(jsdoc3({
            plugins: ["jsdoc2md/plugin-tsd.js"],
            opts: {
                "tags": {
                    "allowUnknownTags": true,
                    "dictionaries": ["jsdoc","closure"]
                },
                template: "@otris/jsdoc-tsd/src-out/core",
                destination: ".d.ts/scramjet.d.ts"
            }
        }, cb));
});

gulp.task("copy_docs", function() {
    return gulp.src(path.resolve(corepath, "../docs/*"))
        .pipe(gulp.dest("docs/"));
});

gulp.task("make_docs", () => gulp.src(["lib/*.js"])
    .pipe(new DataStream())
    .map(async (file) => {
        const files = [file.path];
        const corefile = path.resolve(corepath, path.basename(file.path));

        const isCoreExtension = await (promisify(fs.access)(corefile, fs.constants.R_OK).then(() => true, () => false));
        if (isCoreExtension)
            files.unshift(corefile);

        const output = await jsdoc2md({
            files,
            plugin: "scramjet-core/jsdoc2md/plugin-docs.js"
        });
        file.contents = Buffer.from(output);

        return file;
    })
    .on("error", function(err) {
        log.error("jsdoc2md failed", err.stack);
    })
    .pipe(rename(function(path) {
        path.extname = ".md";
    }))
    .pipe(
        gulp.dest("docs/")
    )
);

gulp.task("docs", gulp.series("tsd", "readme", "copy_docs", "make_docs"));
gulp.task("fulltest", gulp.series("lint", "test_legacy", "test_samples"));
gulp.task("test", gulp.series("test_legacy", "test_samples"));
gulp.task("default", gulp.series("readme", "docs", "test_legacy", "test_samples", "lint"));
gulp.task("prerelease", gulp.series("default", "scm_clean"));
