const request = require("request");
const rp = require("request-promise-native");
const { StringStream } = require("scramjet");

StringStream.from(                                 // fetch your API to a scramjet stream
    request("https://api.example.org/v1/shows/list")
)
    .setOptions({maxParallel: 4})                  // set your options
    .lines()                                       // split the stream by line
    .parse(theirShow => {                          // parse to your requirement
        return {
            id: theirShow.id,
            title: theirShow.name,
            url: theirShow.url
        };
    })
    .map(myShow => rp({                            // parse to your requirement
        method: "POST",
        simple: true,
        uri: `http://api.local/set/${myShow.id}`,
        body: JSON.stringify(myShow)
    }))
    .map(resp => `+ Update succeeded "${resp}"`)  // make your logs
    .catch(err => `! Error occured ${err.uri}`)
    .toStringStream()
    .append("\n")
    .pipe(process.stdout)   // pipe to any output
;
