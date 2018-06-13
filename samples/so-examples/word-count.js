
    const {StringStream} = require('scramjet');
    const wordcount = require('wordcount');
    const fetch = require('node-fetch');
    const htmlToText = require('html-to-text');
    const {promisify} = require('util');

    StringStream.fromArray(["https://stackoverflow.com/", "https://caolan.github.io/async/docs.html#eachLimit"])
        .setOptions({maxParallel: 4})
        .parse(async url => ({
            url,
            response: await fetch(url)
        }))
        .map(async ({url, response}) => {
            const html = await response.text();
            const text = htmlToText.fromString(html);
            const count = wordcount(text);

            return {
                url,
                count
            };
        })
        .each(console.log)
    ;
