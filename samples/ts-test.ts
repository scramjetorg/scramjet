import {
    DataStream,
} from "scramjet";


DataStream.from(function*() {
    yield 1;
    yield 2;
    yield 3;
})
    .separate(x => "1", {})
    .mux()
    .stringify(x => x + 2)
    .toArray()
;
