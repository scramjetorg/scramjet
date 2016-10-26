const request = require("request");
const StringStream = require("../../").StringStream;

const hourglass = "-\\|/-";
let i = 0;

let columns = null;

console.log();

const res = request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    .parse((line) => line.split(";"))
    .filter((data) => columns === null ? (columns = data, false) : true)
    .map((data) => columns.reduce(
        (acc, id, i) => (acc[id] = data[i], acc),
        {}
    ))
    .tee(
        (stream) => stream
            .on("data", (d) => process.stderr.write("\r" + hourglass.charAt(i++ % hourglass.length) + " " + i))
            .on("end", () => console.log("\n\nEnd", res, i))
    )
    .on("error", (err) => console.error(err && err.stack))
    .reduce((acc, item) => {
        acc[item.Nazwa] = acc[item.Nazwa] || 0;
        acc[item.Nazwa]++;
        return acc;
    }, {})
;
