    const { join } = require('path');
    const { spawn } = require('child_process');
    const { createWriteStream } = require('fs');
    const { StringStream } = require('scramjet');

    function start() {

        const outStream = new PassThrough();
        const lookupStream = new StringStream();
        const logFile = createWriteStream(join(LOG_DIR, 'es.log'), 'w');
        const errorFile = createWriteStream(join(LOG_DIR, 'es.error.log'), 'w');

        outStream.pipe(logFile);
        outStream.pipe(lookupStream);

        child = spawn(
            ES_BAT_PATH,
            [],
            { cwd: process.cwd(), stdio: ['ignore', outStream, errorFile] }
        );
        
        return lookupStream
            .split('\n')                                    // split line by line
            .filter(x => x.includes('started'))             // check if line contains "started"
            .until(x => outStream.unpipe(lookupStream))     // end stream on first occurence
            .run();                                         // run and resolve on stream end
    }
