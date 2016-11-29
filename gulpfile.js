const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
const rename = require("gulp-rename");
const nodeunit_runner = require("gulp-nodeunit-runner");
const jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
    gulp.src("test/*.js")
        .pipe(nodeunit_runner({reporter: "verbose"}))
    ;
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

gulp.task('default', ["docs", "test", "lint"]);
