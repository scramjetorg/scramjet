Multi Threading and distributed parallel processing in JavaScript
===================================================================

Scramjet is aimed to provide fully automatic parallel processing on multiple processor cores as well as multiple remote
servers.

Multi-threaded processing
===========================

Scramjet version 4.2.0 introduces parallel processing on multiple cores via the following methods:

* [MultiStream.cluster(clusterFunc, options)](multi-stream.md#module_ScramjetCore..MultiStream+cluster) ↩︎
* [DataStream.distribute(affinity, clusterFunc, options)](data-stream.md#module_ScramjetCore..DataStream+distribute) ↩︎

### Example 1 - multi-threaded prime numbers filter

Let's create our thread.js file:

```javascript
module.exports = (stream) =>
    stream.filter(num => {
        if (num < 2) return false;
        if (num == 2) return true;
        for(var i = 2; i < num/2; i++) {
          if (num % i === 0) return false;
        }
    })
;
```

And now let's give it couple thousands of numbers to crunch around 2^48:

```javascript
function* gen() {
    for (let z = 0; z < 4e3; z++)
        yield z+2^48;
};

DataStream.fromIterator(gen)
    .distribute(i => i % 16, "./thread.js")
    .pipe(process.stdout);
```

And you get a stream of prime numbers only. :)

### Example 2 - multi-threaded node.js PI number calculation:

```javascript

const countPI = (chunk) => {
    let {terms} = chunk;
    let pi = 0
    let k=1
    while (terms != 0) {
        terms--
        pi = pi / 4
        pi = pi + (1 / (   ((2*k)-1) *  (-1)*(Math.pow(-1,k))   ))
        pi = pi * 4
        k++
    }
    return {terms: chunk.terms, pid: process.pid, pi};
};

const test = DataStream.fromIterator((function* () {
        for (i = 0; i < 64; i++) {
            yield {terms: i + 1e7};
        }
    }))                                                     // generator of the data stream
    .distribute(
        item => item.terms % 8,                             // affinity function explains which thread should the app go to
        (stream) => stream.map(countPI),                    // stream tranform to perform in threads
        {threads: 4}                                        // threads to spawn
    );

```
