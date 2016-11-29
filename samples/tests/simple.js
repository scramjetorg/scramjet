const request = require("request");
const StringStream = require("../../").StringStream;

const hourglass = "-\\|/-";
let i = 0;

let columns = null;

const res = request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    .parse((line) => line.split(";"))
    .pop(1, (data) => {
        columns = data.pop();
        console.log("cols", columns);
    })
    .map((data) => columns.reduce(
        (acc, id, i) => {
            acc[id] = data[i];
            return acc;
        },
        {}
    ))
    //.on("data", (d) => console.log("K", d, i++))
    .on("error", (err) => console.error(err && err.stack))
    .on("end", () => console.log("\n\nEnd", res, i))
    .map((data) => JSON.stringify(data))
    .reduce((acc, item) => {
        console.log("Z", i++);
        acc[item.Nazwa] = acc[item.Nazwa] || 0;
        acc[item.Nazwa]++;
        return acc;
    }, {})
    .then(
        (acc) => console.log("AZ", acc)
    )
    // .pipe(process.stdout)

;
