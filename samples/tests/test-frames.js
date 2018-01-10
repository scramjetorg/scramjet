process.stdin
    .pipe(new (require("../../").StringStream)())
    .split("frame")
    .separate(str => str[1])
    .each(stream => stream.CSVParse({relax_column_count: true}).reduce((prev, cur) => {
        if (prev) {
            console.log('dif', cur.map((ent, i) => ent.match(/^[\.0-9\-]+$/) ? +ent - +prev[i] : ent.replace(/^\s*|\s*$/, '')).join('\t'));
        } else {
            console.log('org', cur.length)
        }

        return cur;
    }, null).catch(e => console.error(e.stack)))
