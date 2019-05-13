Scramjet Plugins
==================

A Scramjet plugin is essentially a set of functions that extend scramjet functionality by adding new methods to the
prototype.

A plugin is added to scramjet by calling the `scramjet.plugin` method.

The passed object should be an object with keys referring to the extended stream (f.e. DataStream) and values being
objects containing prototype extensions. One special extension is "constructor" property which should contain a function
that will be called in the stream constructor.

A quick example can be the [scramjet-fini](https://www.npmjs.com/package/scramjet-fini) module on npm.

A sample plugin
-----------------

Here's how a minimal plugin looks like:

```javascript
module.exports = {
    DataStream = {
        constructor(options) {
            if (options.someValue) {
                this.someData = true;
            }
        },
        addId(func, prefix) {
            const fin = fini(prefix || defaultPrefix.next().value);
            return this.pipe(new this.constructor({
                parallelTransform: (chunk) => func(chunk, fin.next().value)
            }));
        }
    }
};
```

All methods, getters/setters are copied upon scramjet stream prototype of the same name. The `constructor` method is
called at the end of the constructor.

If a scramjet stream of a specific name does not exist, it will be added as a new class.

Testing plugins
-----------------

You can test your plugins as you like but it would be wise to check if your plugin doesn't break any scramjet-core
features. In order to do that set `SCRAMJET_TEST_HOME` to your designated plugin location and include
`path.resolve(require.resolve("scramjet-core"), "../test/v1/*.js")` from this dependency to your plugin as nodeunit.

This is until we come up with a better solution.
