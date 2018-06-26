const gulp = require("gulp");
const jsdoc3 = require("gulp-jsdoc3");

module.exports = function(files, config) {
    return (cb) => {
        gulp.src(files, { read: false })
            .pipe(jsdoc3(config, cb));
    };
};
