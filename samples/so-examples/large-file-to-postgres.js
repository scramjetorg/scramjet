    const {Pool} = require("pg");
    const {StringStream} = require("scramjet");
    const fs = require("fs");

    const pool = new Pool(options);
    const max = 11784251;
    const INSERT_ENTRY = 'INSERT INTO geonames.rawdata (geonameid, name, asciiname, alternatenames, latitude, longitude, fclass, fcode, country, cc2, admin1, admin2, admin3, admin4, population, elevation, gtopo30, timezone, moddate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);';

    StringStream
        .from(fs.createReadStream('allCountries.txt'))
        .lines()
        .parse(line => {
            // Each line need to be properly formated
            const entry = line.split("\t"); //TAB split

            // The following fields need formating
            entry[0] = parseInt(entry[0]);
            entry[4] = parseFloat(entry[4]);
            entry[5] = parseFloat(entry[5]);
            entry[14] = parseInt(entry[14]);
            entry[15] = entry[15] == '' ? 0 : entry[15];
            entry[16] = parseInt(entry[16]);

            return entry;
        })
        .setOptions({maxParallel: 32})
        .each(async entry => {
            try {
                await pool.query(INSERT_ENTRY, entry)
            } catch(err) {
                console.log('Error while adding line...', err);
                // some more logic could be here?
            }
        })
        .each(() => !(lineNr++ % 1000) && console.log("Line added ", lineNr, (lineNr / max * 100) + "%"))
        .run()
        .then(
            () => console.log('Read entire file.'),
            e => console.log('Error while handling file.', err)
        );
