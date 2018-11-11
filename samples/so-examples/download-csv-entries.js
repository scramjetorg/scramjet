    const {StringStream} = require("scramjet");
    const sleep = require("sleep-promise");
    const Downloader = require('mt-files-downloader');

    const downloader = new Downloader();

    // First we create a StringStream class from your csv stream
    StringStream.from(csvStream)
        // we parse it as CSV without columns
        .CSVParse({header: false})
        // we set the limit of parallel operations, it will get propagated.
        .setOptions({maxParallel: 16})
        // now we extract the first column as `recording` and create a
        // download request.
        .map(([recording]) => {
            // here's the first part of your code
            const filename = rec.replace(/\//g, '');
            const filePath = './recordings/'+filename;
            const downloadPath = path.resolve(filePath)
            const fileUrl = 'http:' + rec;

            // at this point we return the dl object so we can keep these
            // parts separate.
            // see that the download hasn't been started yet
            return downloader.download(fileUrl, downloadPath);
        })
        // what we get is a stream of not started download objects
        // so we run this asynchronous function. If this returns a Promise
        // it will wait
        .map(
            async (dl) => new Promise((res, rej) => {
                // let's assume a couple retries we allow
                let retries = 10;

                dl.on('error', async (dl) => {
                    try {
                        // here we reject if the download fails too many times.
                        if (retries-- === 0) throw new Error(`Download of ${dl.url} failed too many times`);

                        var dlUrl = dl.url;
                        console.log('error downloading = > '+dl.url+' restarting download....');

                        if(!dlUrl.endsWith('.wav') && !dlUrl.endsWith('Recording')){
                            console.log('resuming file download => '+dlUrl);
                            // lets wait half a second before retrying
                            await sleep(500);
                            dl.resume();
                        }
                    } catch(e) {
                        rej(e);
                    }
                });
                dl.on('end', () => res());
            })
        )
        // we log some message and ignore the result in case of an error
        .catch(e => {
            console.error('An error occured:', e.message);
            return;
        })
        // Every steram must have some sink to flow to, the `run` method runs
        // every operation above.
        .run();
