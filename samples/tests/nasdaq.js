const scramjet = require("../../");

const fs = require("fs");
const path = require("path");

fs.createReadStream(path.resolve(__dirname, "../data/in-nasdaq.lst"))
    .pipe(new scramjet.StringStream())
    .split(scramjet.StringStream.SPLIT_LINE)
    .filter(
        (line) => line.length > 10
    )
    .parse(
        (line) => {
            const parts = line.split("\t");
            return {
                symbol: parts[0],
                name: parts[1],
                price: +parts[2],
                change: +parts[3],
                changePct: +parts[4].substr(0, parts[4].length - 1)
            };
        }
    )
    .on("data", (ticker) => console.log("data", ticker))
    .toBufferStream(
        (ticker) => {
            const buf = new Buffer(13);
            buf.write(ticker.symbol + "     ", 0, 5, "ascii");
            buf.writeUInt32LE(ticker.price * 100, 5);
            buf.writeInt32LE(ticker.change * 100, 9);
            return buf;
        }
    )
    .on("error", (e) => console.log("Error", e && e.stack))
    .pipe(
        fs.createWriteStream(path.resolve(__dirname, "../data/in-nasdaq.bin"))
    );
