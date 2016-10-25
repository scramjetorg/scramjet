#!/usr/bin/env node

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cpu = require("windows-cpu");
var browserifiedScramjet = require('browserify')([__dirname + "/../../lib/index"], {standalone: "scramjet"});

app.use(express.static(__dirname + "/browser"));

app.get("/scramjet.js", (req, res) => {
    res.writeHead(200, {"content-type": "text/javascript; charset=utf-8"});
    browserifiedScramjet.bundle().pipe(res);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(30035, function() {
  console.log('listening on *:30035');
});

const cpuPromise = () => Promise.all([
    new Promise((solve, ject) => cpu.totalLoad( (e, r) => e ? ject(e) : solve({totalLoad: r}) )),
    new Promise((solve, ject) => cpu.nodeLoad( (e, r) => e ? ject(e) : solve({nodeLoad: r}) )),
    new Promise((solve, ject) => cpu.processLoad( (e, r) => e ? ject(e) : solve({processLoad: r}) )),
    new Promise((solve, ject) => cpu.cpuInfo( (e, r) => e ? ject(e) : solve({cpuInfo: r}) )),
    new Promise((solve, ject) => cpu.totalMemoryUsage( (e, r) => e ? ject(e) : solve({totalMemoryUsage: r}) )),
]);

let z = 0;
const run = () => setTimeout(() => cpuPromise().then(
        (arr) => Object.assign({}, ...arr)
    ).then(
        (obj) => (console.log("obj"), ((++z%7) ? io.emit("cpu", obj) : Promise.reject(new Error("Phew!"))))
    ).catch(
        (err) => (console.log("err"), io.emit("err", {
            error: true,
            type: err.toString().replace(/\:.*$/, ''),
            message: err.message,
            name: err.name,
        	stack: err.stack,
        	code: err.code,
        	errno: err.errno,
        	syscall: err.syscall,
        }))
    ).then(
        () => run()
    ), 1e3);

run();
