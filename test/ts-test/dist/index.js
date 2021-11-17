"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scramjet_1 = require("scramjet");
scramjet_1.StringStream
    .fromString('hello world', 'utf-8')
    .lines(' ')
    .toArray()
    .then((t) => console.log(t.join(' ')));
