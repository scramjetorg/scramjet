const request = require("request");
const rp = require("request-promise-native");
const { StringStream } = require("scramjet");

StringStream.from(                                 // fetch your API to a scramjet stream
    request("https://api.example.org/v1/shows/list")
)
    .setOptions({maxParallel: 4})                  // set your options
    .lines()                                       // split the stream by line
    .parse(theirShow => {                          // parse strings to data
        return {
            id: theirShow.id,
            title: theirShow.name,
            url: theirShow.url
        };
    })
    .map(async myShow => rp({                      // use asynchronous mapping (for example send requests)
        method: "POST",
        simple: true,
        uri: `http://api.local/set/${myShow.id}`,
        body: JSON.stringify(myShow)
    }))
    .stringify(resp => `+ Updated "${resp}"`)
    .catch(err => `! Error occured ${err.uri}`)    // handle errors
    .append("\n")
    .pipe(process.stdout)                          // use any stream
;
