Scramjet Plugins
==================

A Scramjet plugin is essentially a set of functions that extend scramjet functionallity by adding new methods to the
prototype.

A plugin is added to scramjet by calling the `scramjet.plugin` method.

The passed object should be an object with keys referring to the extended stream (f.e. DataStream) and values being
objects containing prototype extensions. One special extension is "constructor" property which should contain a function
that will be called in the stream constructor.

A quick example can be the [scramjet-fini](https://www.npmjs.com/package/scramjet-fini) module on npm.
