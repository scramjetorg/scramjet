const IP = "127.6.6.6";
const crypto = require('crypto');
const md5 = (string) => {
    return crypto.createHash("md5").update(string).digest("hex");
};

module.exports = (ref) => {
    return new Promise((solve) => {
        require("freeport")((err, port) => {
            require("http").createServer((req, res) => {
                // console.log("X", ref, req.url);
                res.end(md5(ref + ':' + req.url));
            }).listen(port, IP, () => solve(IP + ':' + port));
        });
    });
};
