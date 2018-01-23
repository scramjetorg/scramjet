/* eslint-disable node/no-missing-require */

var express = require('express');
var sizeOf = require('image-size');
const sql = require('mssql');
var app = express();
var port = process.env.PORT || 3000;
const hostname = 'localhost';
const {DataStream} = require('scramjet');
const fetch = require('node-fetch');
const JSONStream = require('JSONStream');

var config1 = {
    user: '*********',
    password: '*********',
    server: '*********',
    database: '*******',
    port: 1433,
    debug: true,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

app.get('/', function(req, res, next){

    // you should consider not doing these two lines on each request,
    // but I don't want to mess you code...
    sql.close();
    sql.connect(config1, function (err) {
        if (err) next(err);

        res.writeHead(200, { 'Content-Type': 'application/json' });

        const request = new sql.Request();
        var myQuery = `select imagename from media`;

        request.stream = true;
        request.query(myQuery);

        const stream = new DataStream();
        request.on('row', row => stream.write(row));

        stream.filter(
                row => row.ImageUrl !== ''
            )
            .map(
                async row => {
                    if (row.ImageUrl.indexOf('http') !== 0) // url must start with http.
                        row.ImageUrl = "http:" + row.ImageUrl;

                    const response = await fetch(row.ImageUrl);
                    let size = {width:0, height:0};

                    if (response.status === 200) {
                        const buffer = await response.buffer();
                        size = sizeOf(buffer);
                    }

                    return {
                        MaskUrl: row.MaskUrl,
                        ImageUrl: row.ImageUrl,
                        Height: size.height,
                        Width: size.width,
                        statusCode: response.status
                    };

                }
            )
            .pipe(
                JSONStream.stringify()
            ).pipe(
                res
            );


        request.on('error', () => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            stream.end("{error:true}");
        });

        request.on('done', () => stream.end());

    });
});

app.listen(port, hostname, function(){
    console.log('ImageSize running on PORT: ' + port);
});
