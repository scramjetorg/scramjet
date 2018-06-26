const asyncServer = require("./async-reply");
const benchmark = require("./benchmark");
const MaxParallel = 16;

const srv1 = asyncServer("test_salt_1");
const srv2 = asyncServer("test_salt_2");
const srv3 = asyncServer("test_salt_3");
const srv4 = asyncServer("test_salt_4");

if (process.argv.indexOf("-n") + process.argv.indexOf("--no-bench") === -2) {
    const source = process.argv.indexOf("-") >=0 ? process.stdin : new (require("./genstream"))(10e3);
    Promise.all([srv1, srv2, srv3, srv4]).then(
        (ports) => benchmark(source, MaxParallel, ...ports)
    ).catch(
        (e) => console.error("ERROR", e && e.stack)
    );
} else {
    Promise.all([srv1, srv2, srv3, srv4]).then(
        (ports) => console.log(ports.join(","))
    );
}
