#!/usr/bin/env node

const path = require('path');
const runner = require("scramjet-core/test/tape-runner");
const {DataStream} = require('../../');
const file = path.resolve(process.cwd(), process.argv[2]);

const {unhandledRejectionHandler} = require("./handlers");

process.on("unhandledRejection", unhandledRejectionHandler);

DataStream.fromArray([{
        path: file
    }])
    .pipe(runner({}))
    .catch(
        (err) => {
            console.error(err);
            process.exit(127);
        }
    );
