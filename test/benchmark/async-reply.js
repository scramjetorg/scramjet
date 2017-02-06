module.exports = (ref) => new Promise((solve) => {
    require("freeport")((port) => {
        require("http").createServer((req, res) => {
            res.end(ref + ':' + req.uri);
        }).listen("127.6.6.6", port, solve.bind(null, port));
    });
});
