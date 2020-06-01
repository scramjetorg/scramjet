

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

    data({ inherited: true }).update(function () {
        if (this.tags && this.tags.find(({ title }) => title === "chainable")) {
            const wouldReturn = this.inherits.substring(
                this.inherits.indexOf(".") + 1,
                this.inherits.length - this.name.length - 1
            );
            const shouldReturn = this.memberof.substring(
                this.memberof.indexOf(".") + 1
            );
            this.returns.forEach(
                value => value.type && value.type.names && (value.type.names = value.type.names.map(
                    name => name === wouldReturn ? shouldReturn : name
                ))
            );
        }
    });

    let prepend = "";
    if (opts.prepend) {
        try {
            prepend = fs.readFileSync(path.resolve(opts.prepend), {encoding: "utf-8"});
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

    const typedefs = parser.generateTypeDefinition().replace(/\.</g, "<");

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

