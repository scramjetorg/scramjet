const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
const rename = require("gulp-rename");
const nodeunit_runner = require("gulp-nodeunit-runner");
const jshint = require('gulp-jshint');
const exec = require('gulp-exec');

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

gulp.task("test_samples", ['docs'], function() {
    return gulp.src("test/samples/*.js")
        .pipe(exec("node <%= file.path %>"))
        .pipe(exec.reporter());
});

gulp.task("docs", function() {
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
gulp.task('default', ["docs", "test_legacy", "test_samples", "lint"]);
