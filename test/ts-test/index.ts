import { StringStream } from 'scramjet'

StringStream
    .fromString('hello world', 'utf-8')
    .lines(' ')
    .toArray()
    .then((t) => console.log(t.join(' ')))
;