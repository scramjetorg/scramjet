const fs = require("fs");
const path = require("path");

module.exports.inject = function(file) {
    const data = fs.readFileSync(
        path.join(path.resolve(__dirname, "../.."), file.replace(/^[./]+/, "")),
        {encoding: "UTF-8"}
    );
    return data;
};
