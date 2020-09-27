const fetch = require("node-fetch");
const get = async (url, options = {}) => (await fetch(url, options)).json;
const { StringStream } = require("scramjet");

StringStream.from(                                 // fetch your API to a scramjet stream
    () => get("https://api.example.org/v1/shows/list")
)
    .setOptions({maxParallel: 4})                  // set your options
    .lines()                                       // split the stream by line
    .parse(line => {                               // parse strings to data
        const [id, title, url] = line.split(",");
        return { id, title, url };
    })
    .map(async myShow => get({                      // use asynchronous mapping (for example send requests)
        uri: `http://api.local/set/${myShow.id}`,
        body: JSON.stringify(myShow)
    }))
    .stringify(resp => `+ Updated "${resp}"`)
    .catch(err => `! Error occured ${err.uri}`)    // handle errors
    .append("\n")
    .pipe(process.stdout)                          // use any stream
;
