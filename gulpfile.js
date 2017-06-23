const gulp = require("gulp");
const env = require('gulp-env');
const path = require("path");
const gutil = require("gulp-util");
const rename = require("gulp-rename");
const nodeunit_runner = require("gulp-nodeunit-runner");
const jshint = require('gulp-jshint');
const exec = require('gulp-exec');
const execp = require('child_process').exec;
const cache = require('gulp-cached');
const remember = require('gulp-remember');

const {Transform} = require('stream');
const corepath = path.dirname(require.resolve("scramjet-core"));

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(cache('lint')) // only pass through changed files
    .pipe(jshint())
    .pipe(remember('lint')) // add back all files to the stream
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    ;
});

gulp.task("test_legacy", function () {

    return gulp.src(path.resolve(corepath, "../test/v1/*.js"))
        .pipe(env({
            vars: {
                SCRAMJET_TEST_HOME: __dirname
            }
        }))
        .pipe(nodeunit_runner({reporter: "verbose"}))
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

gulp.task("readme", function() {
    const fs = require('fs-then-native');
    const jsdoc2md = require('jsdoc-to-markdown');

    return jsdoc2md.render({
            files: [
                path.dirname(require.resolve("scramjet-core")) + "/data-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/string-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/buffer-stream.js",
                path.dirname(require.resolve("scramjet-core")) + "/multi-stream.js",
                "lib/data-stream.js",
                "lib/string-stream.js",
                "lib/buffer-stream.js",
                "lib/multi-stream.js"
            ],
            plugin: "jsdoc2md/plugin.js"
        })
        .then(
            (output) => fs.writeFile(path.join(__dirname, 'README.md'), output)
        );
});

gulp.task("copy_docs", function() {
    return gulp.src(path.resolve(corepath, "../docs/*"))
        .pipe(gulp.dest("docs/"));
});

gulp.task("docs", ["copy_docs", "readme"], function() {
    const jsdoc2md = require('jsdoc-to-markdown');

    return gulp.src(["lib/*.js"])
        .pipe(new Transform({
            objectMode: true,
            transform(file, encoding, callback) {
                jsdoc2md.render({
                        files: [
                            path.resolve(corepath, path.basename(file.path)),
                            file.path
                        ]
                    })
                    .then(
                        (contents) => {
                            const newFile = file.clone();
                            newFile.contents = Buffer.from(contents);
                            return newFile;
                        }
                    )
                    .then(
                        (file) => callback(null, file)
                    );
            }
        }))
        .on("error", function(err) {
            gutil.log(gutil.colors.red("jsdoc2md failed"), err.message);
        })
        .pipe(rename(function(path) {
            path.extname = ".md";
        }))
        .pipe(
            gulp.dest("docs/")
        );
});

gulp.task("test", ["lint", "test_legacy", "test_samples"]);
gulp.task("default", ["readme", "docs", "test_legacy", "test_samples", "lint"]);
gulp.task("prerelease", ["scm_clean"]);
