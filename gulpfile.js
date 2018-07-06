/* eslint-disable node/no-unpublished-require */
const gulp = require("gulp");
const path = require("path");
const shell = require("gulp-shell");

const {lint, test_legacy, readme, scm_clean} = require("scramjet-core/scripts/tasks");
const {full_docs, tsd} = require("./scripts/tasks");

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

gulp.task("lint", lint());

process.env.SCRAMJET_TEST_HOME = __dirname;
gulp.task("test", test_legacy([path.resolve(corepath, "../test/v1/*.js"), "test/v1/*.js"]));

gulp.task("scm_clean", scm_clean());

gulp.task("test_samples", shell.task("node test/samples/test-samples"));

gulp.task("readme", readme({
    files: FILES.slice(),
    plugin: ["scramjet-core/jsdoc2md/plugin.js", "jsdoc2md/plugin.js",]
}, path.join(__dirname, "README.md")));

gulp.task("tsd", tsd(FILES.slice(), {
    plugins: ["jsdoc2md/plugin-tsd.js"],
    opts: {
        "tags": {
            "allowUnknownTags": true,
            "dictionaries": ["jsdoc","closure"]
        },
        template: "@otris/jsdoc-tsd/src-out/core",
        destination: ".d.ts/scramjet.d.ts"
    }
}));

gulp.task("copy_docs", function() {
    return gulp.src(path.resolve(corepath, "../docs/*"))
        .pipe(gulp.dest("docs/"));
});

gulp.task("make_docs", full_docs(["lib/*.js"], corepath, {
    plugin: ["scramjet-core/jsdoc2md/plugin-docs.js"]}, "docs/"));

gulp.task("docs", gulp.series("tsd", "readme", "copy_docs", "make_docs"));
gulp.task("fulltest", gulp.series("lint", "test", "test_samples"));
gulp.task("test", gulp.series("test", "test_samples"));
gulp.task("default", gulp.series("readme", "docs", "test", "test_samples", "lint"));
gulp.task("prerelease", gulp.series("default", "scm_clean"));
