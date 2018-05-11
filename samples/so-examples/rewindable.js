
const {StringStream} = require('scramjet');
const {ReReadable} = require("rereadable-stream");

// I will use a single middleware, since express does not allow to pass an altered request object to next()
app.use('/cfs', (req, res, next) => {
    const buffered = req.pipe(new ReReadable());        // rewind file to 
    let file = '';                                                  
    buffered.pipe(new StringStream)                     // pipe to a StringStream
        .lines('\n')                                    // split request by line
        .filter(x => x.startsWith('Content-Disposition: form-data;'))
                                                        // find form-data lines
        .parse(x => x.split(/;\s*/).reduce((a, y) => {  // split values
            const z = y.split(/:\s*/);                  // split value name from value
            a[z[0]] = JSON.parse(z[1]);                 // assign to accumulator (values are quoted)
            return a;
        }, {}))
        .until(x => x.name === 'fee' && (file = x.filename, 1))
                                                        // run the stream until filename is found
        .run()
        .then(() => uploadFileToProxy(file, buffered.rewind(), res, next))
                                                        // upload the file using your method
        
});
