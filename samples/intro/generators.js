const fetch = require("node-fetch");
const { StringStream } = require("scramjet");

StringStream
    .from(
        async function* () {                       // construct a stream from an async generator
            yield "houses\n";                      // yield - push a stream chunk
                                                   // yield - push a whole stream
            yield* (await fetch("https://example.org/categories")).body;
        },
        {maxParallel: 4}                           // set your options
    )
    .lines()                                       // split the stream by line
    .flatMap(async function* (category) {
        const req = await fetch(`https://example.org/posts/${category}/`);
        yield* await req.json();                   // yield - push a whole array
    })
    .catch(err => `! Error occured ${err.uri}`)
    .toStringStream()
    .append("\n")
    .pipe(process.stdout)   // pipe to any output
;
