const IP = "127.6.6.6";
const crypto = require("crypto");
const md5 = (string) => {
    return crypto.createHash("md5").update(string).digest("hex");
};

module.exports = (ref) => {
    return new Promise((solve) => {
        const server = require("http").createServer((req, res) => {
            res.end(md5(ref + ":" + req.url));
        });
        server.listen(0, IP, () => solve(IP + ":" + server.address().port));
    });
};
