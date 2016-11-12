const request = require("request");
const StringStream = require("../../").StringStream;

const hourglass = "-\\|/-";
let i = 0;

let columns = null;

const res = request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    // .on("data", () => console.log("K", i++))
    .parse((line) => line.split(";"))
    .filter((data) => columns === null ? (columns = data, false) : true)
    .map((data) => columns.reduce(
        (acc, id, i) => (acc[id] = data[i], acc),
        {}
    ))
    // .tee(
    //     (stream) => stream
            // .on("data", (d) => process.stderr.write("\r" + hourglass.charAt(i++ % hourglass.length) + " " + i))
    // )
    .on("error", (err) => console.error(err && err.stack))
    .on("end", () => console.log("\n\nEnd", res, i))
    .map((data) => JSON.stringify(data))
    .reduce((acc, item) => {
        console.log("Z", i++);
        acc[item.Nazwa] = acc[item.Nazwa] || 0;
        acc[item.Nazwa]++;
        return acc;
    }, {})
    // .pipe(process.stdout)

;
