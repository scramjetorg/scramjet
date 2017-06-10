const gulp = require("gulp");
const path = require("path");
const gutil = require("gulp-util");
const gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
const rename = require("gulp-rename");
const nodeunit_runner = require("gulp-nodeunit-runner");
const jshint = require('gulp-jshint');
const exec = require('gulp-exec');
const execp = require('child_process').exec;

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task("test_legacy", function () {
    return gulp.src("test/v1/*.js")
        .pipe(nodeunit_runner({reporter: "verbose"}))
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

gulp.task("test_samples", ['docs'], function() {
    return gulp.src("test/samples/test-*.js")
        .pipe(exec("node <%= file.path %>"))
        .pipe(exec.reporter());
});

gulp.task("readme", function() {
    const fs = require('fs-then-native');
    const jsdoc2md = require('jsdoc-to-markdown');

    return jsdoc2md.render({
            files: [
                "node_modules/scramjet-core/lib/data-stream.js",
                "node_modules/scramjet-core/lib/string-stream.js",
                "node_modules/scramjet-core/lib/buffer-stream.js",
                "node_modules/scramjet-core/lib/multi-stream.js",
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

gulp.task("docs", ["readme"], function() {
  return gulp.src("lib/*.js")
        .pipe(gulpJsdoc2md({}))
        .on("error", function(err) {
            gutil.log(gutil.colors.red("jsdoc2md failed"), err.message);
        })
        .pipe(rename(function(path) {
            path.extname = ".md";
        }))
        .pipe(gulp.dest("docs/"));
});

gulp.task("test", ["test_legacy", "test_samples"]);
gulp.task("default", ["readme", "docs", "test_legacy", "test_samples", "lint"]);
gulp.task("prerelease", ["default", "scm_clean"]);
