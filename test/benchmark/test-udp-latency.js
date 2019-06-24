const dgram = require("dgram");
const {BufferStream} = require("../../")

const hrtime = (last) => {
    const cur = process.hrtime();
    return (cur[0] - last[0]) * 1e6 + (cur[1] - last[1]) / 1e3;
};


let send = null;
const sock = dgram.createSocket('udp4');

const srv = dgram.createSocket('udp4')
    .on('message', (msg, rinfo) => {
        console.log(hrtime(send));
        sock.unref().disconnect();
        srv.close();
    })
    .unref()
    .bind(6789, "localhost")
    .on('listening', () => {
        console.log("send");
        sock.connect(6789, "localhost", () => {
            new Promise(res => setTimeout(() => {
                sock.send("A");
                send = process.hrtime();
            }, 500))
        });
    })
    ;

