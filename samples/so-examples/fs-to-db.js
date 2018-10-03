
    const { Pool, Client } = require('pg')
    const { StringStream } = require("scramjet");

    const client = new Client({
        user: '*****',
        host: '****',
        database: '*****',
        password: '******#',
        port: 5432,
    })

    client.connect()
        .then(async () => {
            console.log("Connected, processing file");


            return StringStream
                // this creates a "scramjet" stream from input.
                .from(fs.createReadStream("input.txt"))
                // this splits fs line by line
                .lines()
                // the next line is just to show when the file is fully read
                .use(stream => stream.whenEnd.then(() => console.log("done reading file.")))
                // this splits the words like the first "for" loop in your code
                .map(line => line.toLowerCase().replace(/[^0-9a-z ]+/g, '').split(" "))
                // this one gets rid of empty lines (i.e. no words)
                .filter(line => line.length > 0)
                // this splits the words like the first "for" loop in your code
                .map(async words => {
                    for (var i = 0; i < words.length; i++) {
                        const callResult = await isKeyPhrase(words.slice(i, i + 3).join(" "));
                        if (callResult) return callResult;
                    }
                })
                // this runs the above list of operations to the end and returns a promise.
                .run();
        })
        .then(() => {
            console.log("done processing file.");
            client.end();
        })
        .catch((e) => {
            console.error(e.stack);
        });


    async function isKeyPhrase(keyPhraseText) {

        const query = {
            name: 'get-name',
            text: 'select KP.EntryID from KeyPhrase KP where (KP.KeyPhraseText = $1) and (Active = true)',
            values: [keyPhraseText],
            rowMode: 'array'
        };

        const result = await client.query(query);

        if (result.rowCount > 0) {
            console.log(`Key phrase '${keyPhraseText}' found in table with Phase ID = ${result.rows}`);
            return true;
        }

        return false;
    }
