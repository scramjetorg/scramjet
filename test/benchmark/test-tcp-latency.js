const net = require("net");
const {BufferStream} = require("../../")

const hrtime = (last) => {
    const cur = process.hrtime();
    return (cur[0] - last[0]) * 1e6 + (cur[1] - last[1]) / 1e3;
};

let send = null;
net.createServer(async conn => {
    console.log("conneced srv");
    conn.setNoDelay(true);
    conn.on("data", x => {
        console.log(hrtime(send));
        conn.write(x);
        conn.end();
    });
})
    .listen("/home/michal/test.sock")
    .unref()
    .on('listening', () => {
        console.log("connecting");
        const conn = net.connect("/home/michal/test.sock", async () => {
            console.log("conneced conn");
            conn.setNoDelay(true);
            conn.once("data", () => conn.end());
            await new Promise(res => setTimeout(res, 500))
            conn.write("A");
            send = process.hrtime();
        });
    })
    ;

