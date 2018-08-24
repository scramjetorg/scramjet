    var fs = require("fs");
    var csv = require("fast-csv");
    var stream1 = fs.createReadStream("files/testCsvFile.csv");
    var {DataStream} = require("scramjet");

    DataStream
        // the following line will convert any stream to scramjet.DataStream
        .from(csv.fromStream(stream2, { headers: true }))
        // the next lines controls how many simultaneous operations are made
        // I assumed 1, but if you're fine with 40 - go for it.
        .setOptions({maxParallel: 1})
        // the next line will call your async function and wait until it's completed
        // and control the back-pressure of the stream
        .do(async (data) => {
            const query = await queryBuilder({
              schema,
              routine,
              parameters,
              request
            }); //here we prepare query for calling the SP with parameters from data

            winston.info(query + JSON.stringify(data));
            await session.raw(query); //here the query gets executed
            return data; // push each row - for testing only)
        })
        // next line will run the stream until end and return a promise
        .toArray()
        .then(fileRows => {
            console.log(fileRows);
            fs.unlinkSync(form.FileName); // remove temp file
            //process "fileRows" and respond
            res.end(JSON.stringify(fileRows)); // - for testing
        })
        .catch(e => {
            res.writeHead(500); // some error handling
            res.end(e.message);
        })
        ;
        // you may want to put an await statement before this, or call then to check
        // for errors, which I assume is your use case.
    ;
