/* global StringStream, fs */
StringStream
    .from(fs.createReadStream("./log.txt"))     // get from any readable stream
    .lines()                                 // split the stream by line
    .use("./your-file")                      // use some trasforms from another file
;
