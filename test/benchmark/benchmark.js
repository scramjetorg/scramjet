const scramjet = require("../..");
const rp = require("request-promise-native");

let seq = 0;

module.exports = (source, maxParallel, addr1, addr2, addr3, addr4) => {
    return source.pipe(
        new scramjet.StringStream()
    ).split(
        /\r?\n/
    ).map(
        (i) => i.trim()
    ).filter(
        (i) => {
            return i.length > 0;
        }
    ).parse(
        (i) => {
            const ret = JSON.parse(i);
            ret.id = "abc" + ret.value + seq++;
            return ret;
        }
    ).filter(
        (item) => item.value % 4 === 0
    ).on(
        "error", (e) => console.log("Error", e && e.stack)
    ).assign(
        (item) => rp.get("http://" + addr1 + "/" + item.id)
            .then((res) => Object.assign({}, item, {hash: res}))
    ).assign(
        (item) => rp.get("http://" + addr2 + "/" + item.hash + "/" + item.id)
            .then((res) => Object.assign({}, item, {hash: res}))
    ).assign(
        (item) => rp.get("http://" + addr3 + "/" + item.hash + "/" + item.id)
            .then((res) => Object.assign({}, item, {hash: res}))
    ).assign(
        (item) => rp.get("http://" + addr4 + "/" + item.hash + "/" + item.id)
            .then((res) => Object.assign({}, item, {hash: res}))
    ).accumulate(
        (acc, res) => acc[res.hash.substr(0,2)] = (acc[res.hash.substr(0,2)] || 0) + 1,
        {}
    ).then(
        (out) => console.log(JSON.stringify(out))
    ).catch(
        (e) => (console.error(e && e.stack), Promise.resolve(1))
    ).then(
        (exit) => process.exit(exit || 0)
    )
    ;

};
