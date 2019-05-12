Using Scramjet Modules
========================

A Scramjet module is a simple module that exposes a single function that performs some operations with the stream. The API is designed so that these modules can be easily used on any stream you like without needing to use scramjet.

For a quick example please see the [signicode/scramjet-module](https://github.com/signicode/scramjet-module) repository.


Using scramjet modules
------------------------

Using a scramjet module is fairly simple, first install it as a dependency:

```shell
$ npm i -s scramjet-module
```

Next simply use it in your code:

```javascript
    DataStream.from('scramjet-module/hello-read') // Loads and sources the stream from the `hello-read`
                                                  // scramjet module of `scramjet-module` package
        .use('scramjet-module/hello-transform')   // This loads and uses `hello-transform` from the same package.
```

Scramjet modules are resolved automatically in relation to the calling file, just like node.js `require` method.

Incidentally scramjet is not needed as a peer to use a scramjet module. The API is thought in a way so it will be
fully interoperable with any stream you like, so you can simply use them with another stream and they always
return a standard Node.js readable stream. This means you can use it with any stream - maybe gulp?

```javascript
import {helloRead} from 'scramjet-module';

helloRead(gulp.src(somePath))
    .pipe(gulp.target(targetPath));
```

Another option

Writing a sample read module
------------------------------

Here's how a minimal read module may look like:

```javascript
import {StringStream, createReadModule} from "scramjet";

export default const ndjsonStream = createReadModule(
    (file) => StringStream
        .from(fs.createReadStream(file))
        .split(/\r?\n/)
        .parse(x => JSON.parse(x))
);
```

Or in commonjs:

```javascript
const {StringStream, createReadModule} = require("scramjet");

module.exports = createReadModule(
    (file) => StringStream
        .from(fs.createReadStream(file))
        .split(/\r?\n/)
        .parse(x => JSON.parse(x))
);
```

Here's how it would be used:

```javascript
import readFile from "scramjet-read-ndjson";

readFile("./data.ndjson")
    .each(x => console.log(x.id))
;
```

Or even easier with `DataStream.from`:

```javascript
DataStream.from("scramjet-read-ndjson")
    .each(x => console.log(x.id));
```

Usage with CLI
----------------

Scramjet provides a simple CLI mechanism that allows chaining number of modules one after another
without writing any code.

```shell
$ npm i -g scramjet-cli
$ scramjet -i 'scramjet-hello/read' 'scramjet-hello/transform1' [...] -o './file'
```

You can see more information in [scramjet-cli repo](https://www.npmjs.com/package/scramjet-cli).

A sample transform module
---------------------------

Here's how a minimal transform module may look like:

```javascript
import {StringStream, createTransformModule} from "scramjet";

export default const ndjsonStream = createTransformModule(
    (stream, hello = "Hello, {}!") => stream
        .stringify(name => hello.replace('{}', name.toString()))
);
```

Or in commonjs:

```javascript
const {StringStream, createTransformModule} = require("scramjet");

module.exports = createTransformModule(
    (stream, hello = "Hello, {}!") => stream
        .stringify(name => hello.replace('{}', name.toString()))
);
```

Publishing scramjet modules
-----------------------------

In general scramjet modules can be [published as standard npmjs packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

If your package contains multiple modules, you may want to set meaningful names so that
when your users require the package they'll know what they are referring to:

```javascript
import commonlogTransform from "scramjet-common-log/transform";
import svgRead from "scramjet-csv/read";
```


