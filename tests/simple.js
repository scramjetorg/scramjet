const request = require("request");
const StringStream = require("../lib/string-stream");

let columns = null;
request.get("http://www.wroclaw.pl/open-data/opendata/its/parkingi/parkingi.csv")
    .pipe(new StringStream())
    .split("\n")
    .parse((line) => line.split(";"))
    .filter((data) => columns === null ? (columns = data, false) : true) // some kind of a "pop function maybe?"
    .map((data) => columns.reduce(
        (acc, id, i) => (acc[id] = data[i], acc),
        {}
    ))
    .on("data", console.log.bind(console))
;
