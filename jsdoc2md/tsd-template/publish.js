

const shelljs = require("shelljs");
const Configuration = require("@otris/jsdoc-tsd/src-out/Configuration");
const Parser = require("@otris/jsdoc-tsd/src-out/jsdoc-tsd-parser");
const path = require("path");
const fs = require("fs");
const helper = require("jsdoc/lib/jsdoc/util/templateHelper");

/**
 * Entry-Point of jsdoc. Gets called by the jsdoc-module to generate the docs.
 * @param {TAFFY} data - The TaffyDB containing the data that jsdoc parsed.
 * @param {*} opts - Options passed into jsdoc.
 */
function publish(data, opts) {
    data({ undocumented: true }).remove();
    data({ ignore: true }).remove();
    data({ longname: "module:scramjet" }).remove();

    data().update(function () {
        if (this.memberof && this.memberof === "module:scramjet") {
            this.memberof = "";
        } else if (this.memberof && this.memberof.startsWith("module:scramjet")) {
            this.memberof = this.memberof.substr(16);
            if (!this.memberof) this.memberof = "";
        }
        if (this.longname && this.longname.startsWith("module:scramjet")) {
            this.longname = this.longname.substr(16);
        }
        if (this.longname === "StringStream") {
            console.log("aaaa", this);
        }
        return this;
    });

    let prepend = "";
    if (opts.prepend) {
        try {
            prepend = fs.readFileSync(path.resolve(opts.prepend), { encoding: "utf-8" });
        } catch (err) {
            throw new Error("Can't read prepend file '" + opts.prepend + "': " + err);
        }
    }

    // remove members that will not be included in the output
    data = helper.prune(data);
    // get the jsdoc results
    var jsdocResults = data().get();
    var parser;
    if (opts.configure) {
        var config = new Configuration.Configuration(opts.configure);
        parser = new Parser.JSDocTsdParser(config);
    }
    else {
        parser = new Parser.JSDocTsdParser();
    }
    // parse the results
    parser.parse(jsdocResults);
    // Write the output
    var outputDir, outputFilePath;
    if (opts.destination.endsWith(".d.ts")) {
        outputFilePath = opts.destination;
        outputDir = path.dirname(outputFilePath);
    }
    else {
        outputDir = opts.destination;
        outputFilePath = path.join(outputDir, "jsdoc-results.d.ts");
    }
    if (!fs.existsSync(outputDir)) {
        try {
            shelljs.mkdir("-p", outputDir);
        }
        catch (err) {
            throw new Error("Can't create output directory '" + outputDir + "': " + err);
        }
    }

    const typedefs = parser.generateTypeDefinition()
        .replace(/\.</g, "<")
        .replace("declare class DataStream {", "declare class DataStream extends PromiseTransform {");

    try {
        fs.writeFileSync(
            outputFilePath,
            prepend + typedefs
        );
    }
    catch (err) {
        throw new Error("Can't write results to file '" + outputFilePath + "': " + err.stack);
    }
}

module.exports.publish = publish;

