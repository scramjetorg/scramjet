"use strict";

var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var nodeunit_runner = require("gulp-nodeunit-runner");


gulp.task('test', function () {
    gulp.src("test/*.js")
        .pipe(nodeunit_runner({reporter: "verbose"}));
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

gulp.task('default', ["docs", "test"]);
