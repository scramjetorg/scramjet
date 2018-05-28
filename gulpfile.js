/* eslint-disable */
const gulp = require("gulp");
const env = require('gulp-env');
const path = require("path");
const rename = require("gulp-rename");
const tape_nodeunit_runner = require("scramjet-core/test/tape-runner");
const eslint = require('gulp-eslint');
const exec = require('gulp-exec');
const execp = require('child_process').exec;
const jsdoc = require('jsdoc-api');
const jsdocParse = require('jsdoc-parse');
const dmd = require('dmd');
const {promisify} = require('util');
const fs = require('fs');

const {DataStream} = require("./");

const corepath = path.dirname(require.resolve("scramjet-core"));

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test_legacy", function () {

    return gulp.src([
            path.resolve(corepath, "../test/v1/*.js"),
            'test/v1/*.js'
        ])
        .pipe(env({
            vars: {
                SCRAMJET_TEST_HOME: __dirname
            }
        }))
        .pipe(tape_nodeunit_runner({timeout: 5000}))
    ;
});

gulp.task("scm_clean", ["default"], function(cb){
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

gulp.task("test_samples", ['docs'], function() {
    return gulp.src("test/samples/test-*.js")
        .pipe(exec("node <%= file.path %>"))
        .pipe(exec.reporter())
        ;
});

const jsdoc2md = async ({files, plugin}) => {

    const data = await jsdoc.explain({files});
    const parsed = await jsdocParse(data);
    const output = await dmd.async(parsed, {plugin});

    return output;
};

gulp.task("readme", async () => {
    return promisify(fs.writeFile)(
        path.join(__dirname, 'README.md'),
        await jsdoc2md({
            files: [
                path.dirname(require.resolve("scramjet-core")) + "/data-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/string-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/buffer-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/multi-stream.js",
                "lib/data-stream.js",
                "lib/string-stream.js",
                "lib/buffer-stream.js",
                "lib/number-stream.js",
                "lib/window-stream.js",
                "lib/multi-stream.js"
            ],
            plugin: [
                "scramjet-core/jsdoc2md/plugin.js",
                "jsdoc2md/plugin.js",
            ]
        })
    );
});

gulp.task("copy_docs", function() {
    return gulp.src(path.resolve(corepath, "../docs/*"))
        .pipe(gulp.dest("docs/"));
});

gulp.task("docs", ["copy_docs", "readme"],
    () => gulp.src(["lib/*.js"])
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

gulp.task("fulltest", ["lint", "test_legacy", "test_samples"]);
gulp.task("test", ["test_legacy", "test_samples"]);
gulp.task("default", ["readme", "docs", "test_legacy", "test_samples", "lint"]);
gulp.task("prerelease", ["scm_clean"]);
