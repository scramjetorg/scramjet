/* global StringStream, fs, gzip */
StringStream
    .pipeline(                              // process a number of streams
        fs.createReadStream("./log.txt.gz"),
        gzip.unzip()                        // all errors here will get forwarded
    )
    .lines()                                // split the stream by line
    .use("./your-file")                     // use some transforms from another file
;
