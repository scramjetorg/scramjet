# Scramjet 4.x

Scramjet 4 brings a stable interface, multi-threading, CSV parsing, asynchronous data augmentation and on...

## Scramjet 4.35.0: Definition fixes on optional parameters

* ce9d3ad - Lots of definition fixes on optional parameters
* 8638e70 - Depencencies update

## Scramjet 4.34.7: Fix circular depencency issue

* f08c98e - Dependencies update.
* 984f814 - Move unneeded dependency to dev
* 54db2cd - Dependencies update.
* 299b76f - Remove circular dependency

## Scramjet 4.34.4: Dependencies update & ts checking

* 9bff421 - Dependencies update.
* 02c6b21 - Add ts checks

## Scramjet 4.34.0: TS Compat: remove pipe from docs and definitions

* 6c3d516 - Fix docs
* 8451990 - TS Compat: Remove pipe from docs and ts.d

## Scramjet 4.33.5: Fix npmignore, package and depdendencies update

* a18b2c5 - Fix npmignore
* 04a40d5 - Dependencies update
* 8d6c64d - Fix package.json

## Scramjet 4.33.0: Typescript definitions rewrite

* 2f3602b - Fix package.json

## Scramjet 4.32.0: Typescript definitions rewrite

* d2d4fb4 - Fix docs, remove console.log
* 8fff4b0 - Dependencies update.
* 5217af7 - Fix typescript definitions
* 80b067a - Fix unneeded declaration
* 5086518 - Massive typings fix
* 5e515ae - Update deps, fix ts definitions?

## Scramjet 4.29.1: Dependencies update

* 9ec97bb - Add readme
* d570dbb - Dependencies update.
* b9bf120 - Dependencies update.
* 20a8b9a - Scramjet is now a startup!
* d3cabdb - Dependencies update.
* 340b8f6 - New copy method
* d5fcff8 - Dependencies update.

## Scramjet 4.28.7: Dependency update

* 87349e9 - Dependencies update.

## Scramjet 4.28.1: Cleanup and npmignore

* 3438855 - Remove github pages config
* 05a5720 - chore: add .npmignore

## Scramjet 4.28.0: Fix optional arguments, allow custom workers

* 5d61614 - Allow using custom stream workers
* 30ed5ba - Fix documentation of optional arguments

## Scramjet 4.27.7: Dependencies update

* aab3d3c - Dependencies update.
* c65af5c - fix(package): update yargs to version 15.0.1

## Scramjet 4.27.0: New method: stack

* 985b405 - Fix eslint
* 287ea94 - Update documentation
* 7fcd996 - The stack method

## Scramjet 4.26.2: Dependencies update, tsdoc fixes

* 1ecd473 - Issues in tsd
* 3789cbe - Dependencies update.
* 6656865 - Better documentation

## Scramjet 4.26.0: MultiStream.from, security fixes, docs updates

* 635bbf6 - Add new test case for batch, update deps, update docs
* e6f6dd9 - fix(package): update yargs to version 14.0.0

## Scramjet 4.25.8: Dependencies update

* 84ad438 - Fix mode
* a21b3b6 - Dependencies update.
* 1af30e5 - TypeScript documentation fixes
* 57cc9a9 - Change mode for docs/data-stream.md
* aef60c3 - Bump lodash.template from 4.4.0 to 4.5.0
* cf7441a - Eslint fixes
* 5d21bc1 - Fix eslint config
* 7ac5584 - Some benchmarks

## Scramjet 4.25.0: More generators and TypeScript definitions

* fa75fc6 - Dependencies update.
* 3664723 - Consume test
* 05b481a - Lots of fixes
* 7431862 - Update definition and docs generation for better TypeScript completion
* 41a1cf6 - Fix ts.d return types and extends declaration
* bf23ca6 - Add tests for no serializer in `stringify`
* a75bfa1 - Documentation update - remove unnecessary samples
* 290d7e2 - Fix for node.js v8.x
* 930cbf7 - Add generators support in flatMap, flatten and join

## Scramjet 4.24.0: More generators and async generators

* `DataStream..strinfigy` now works without arguments.
* Adds better support for `async? function*` (generators) for: `flatMap` and `join`
* Dependencies update.

## Scramjet 4.23.0: Fix optional arguments definition for TypeScript

* Fix TypeScript definitions
* Dependencies update

## Scramjet 4.22.0: All and Race

* Adds `DataStream..all` and `DataStream..race` methods allowing running multiple parallel async functions on each chunk
* Dependencies update
* Uses scramjet's eslint config.

## Scramjet 4.21.0: Exec and rate

* Adds `DataStream..rate` method allowing to limit the flow rate to specified objects per second (or another timeframe).
* Adds `StringStream..exec` allowing executing shell commands, binaries and scripts written in any language
* Adds `DataStream..exec` facilitation class
* Brings lots of spelling fixes in docs and methods.

## Scramjet 4.20.5 - 4.20.5: Fix whenRead/ing past end.

* c6091d7 - Dependencies update, fixes #33.

## Scramjet 4.20.4 - 4.20.4: Fix dataStream.slice

* 99e57da - Dependencies update.
* 80800a0 - Fix deepscan reported error.
* ca9fa98 - Fix `dataStream.slice` to work correctly when start=0.
* ff68b1b - Fix tests not to base on result of other tests.
* dcb364a - Parallelize test results, not tests
* b547d91 - Fix cache clear on tests, unparallel
* 34b14ff - Remove unnecessary files
* 57fe9ca - Remove console.logs in tests
* 0591a9c - test(#30) cases showing the bug reported in #30
* 1994a66 - Fix sample to fit needs
* c8fa338 - Sample from StackOverflow

## Scramjet 4.20.3 - 4.20.3: Fix module helper functions

* 6df17a1 - Dependencies update: fix operation of `scramjet.createTransformModule` and `scramjet.createReadModule`
* ccd131d - Changelog update
* d87c51c - Update issue templates

## Scramjet 4.20.2 - 4.20.2: use and pipeline fixes.

* fix wording in documentation
* core - fix `use` modules resolution on
* core - fix `pipeline` operation
* 4ee6a02 - Move use test to core

## Scramjet 4.20.1 - 4.20.1: Dependencies and multithreading fixes

* 4e9dd80 - Dependencies update: new papaparse version.
* dac0b7e - Fix multithreading routines. Unused workers now silently exit within a set timeout.

## Scramjet 4.20.0 - 4.20.0: Unorder and pull with generators

* 7839576 - Dependencies update, introduce generators in `pull`, introduce `unorder`.
* 9cc8521 - Better tests on pull, allow

## Scramjet 4.19.1 - 4.19.1: Bugfix and documentation fixes

* dd7e938 - Dependencies update: Fixes errors on wrong push value
* 65b507e - Documentation update
* fe7506a - Eslint fix
* 233b937 - Proposal for #27, initial implementation to be tested.

## Scramjet 4.19.0 - 4.19.0: Add pipeline method to all streams.

* a3512ac - Adds `pipeline` method to all streams. Allow async functions in `use`.
* 24876a5 - Dependencies update.
* 9543217 - Add scramjet-core@4.17
* 283ac76 - Move tests to better placed directory
* 64a5be1 - Change license from GPL to MIT in a sample.

## Scramjet 4.18.18 - 4.18.18: Dependencies update

* cab2965 - Dependencies update.
* ab25dd0 - Fix fossa badge location
* d56b270 - Add license scan report and status

## Scramjet 4.18.17 - 4.18.17: Fix iterator error handling

* 637c177 - Dependencies update.
* f71c98d - Rewording in readme
* ffca114 - Add a sample from stackoverflow
* 7bf257a - Remove problematic packages

## Scramjet 4.18.16 - 4.18.16: Fix from

* f9dcfbc - Docs update
* c9b240a - Changelog update
* 24876a5 - Dependencies update.
* 9543217 - Add scramjet-core@4.16.16
* 283ac76 - Move tests to better placed directory
* 64a5be1 - Change license from GPL to MIT in a sample.

## Scramjet 4.18.15 - 4.18.15: Fix ts.d exports

* cd18dec - Fix build message levels
* ba7410b - Dependencies update.
* 5f7cb48 - new Stackoverflow example
* 7caf5cd - Fix typescript definitions
* 66e8b62 - Create CODE_OF_CONDUCT.md

## Scramjet 4.18.14 - fix dependencies

* b59db1e - Fix dependencies breaking empty

## Scramjet 4.18.13 - empty and batch fixes.

* 5f9509d - Fix empty operation
* d642be1 - Fix test for unshift
* 68bce0c - Temporarily remove test for DataStream..empty
* f32e97a - New batch test

## Scramjet 4.18.12 - do and from

* Fix travis CI errors in tests.
* Fix operation of `distribute` on MacOS and BSD systems.
* Fix execution of flushPromise on read only streams.
* Fix operation of `empty` method when errors occur.
* Fix order of chunks vs flush promise.
* Fix order of chunks resolved within `catch` logic.
* Improved docs generation.
* Better splitter in `StringStream.lines`, accepting dos and unix line endings by default.
* Fix order of chunks resolved within `catch` logic.
* `BufferStream.from` and `StringStream.from` have now correct types.
* Errors in a function passed to `DataStream.from` now do not result in uncaught promise.
* Fix warnings on multiple uses of `DataStream.tail`.
* Fix async iterator and generator behavior in `DataStream.from`.
* Fix error handling so it doesn't need to return an array to work.
* Errors now carry `cause` field carrying the original error object.
* Add new options to pass to the `from` method - now anything sensible may be used to create a stream.
* New `do` method allows to operate on stream objects without affecting the stream
* Dependencies update.
* Fix `DataStream.from` operation in derived classes, now return the same class of stream as context of the call.
* Fix some chaining methods that returned stream of wrong class.

This is the last feature release in 4.x series - new features and changes to the API, cleaner code and new features will appear in v5.

Series 4.x will still be supported at least until mid-2019.

More announcements to come in a few weeks.

## Scramjet 4.17.0 - tee to stream

* Allow tee'ing to streams directly, not only functions
* Dependencies update.
* More test coverage tests

## Scramjet 4.16.1 - expose scripts

* Update dependencies
* Remove some gulp dev dependencies
* Expose gulp tasks for submodules

## Scramjet 4.15.2 - fix TypeScript definitions

* Update dependencies
* Fix readable only streams
* Fixes typescript definitions
* Minor documentation fixes
* Error handling fix
* `DataStream..keep` added - keeps a buffer of chunks to be replayed later on
* `DataStream..rewind` added - replays the chunks from the given place
* Add TypeScript declaration generation

## Scramjet 4.14.1 - Readable and Writable only streams possible

* Readable and Writable only streams possible
* Update package dependencies
* Fix for `empty` method
* New documentation

## Scramjet 4.13.0 - Introduce `from` and `pull` methods.

* Cleaner documentation
* Introduction of the static `from` method
* Introduction of the `pull` method
* Add Greenkeeper

## Scramjet 4.12.3 - Fix test for timeBatch

* Fix timebatch test
* Fix of the `into` method in scramjet-core.
* Fix test runners so unfinished tests now fail.
* New NumberStream class
* Better docs generation
* Allow pushing more than one argument to `whenWrote`

## Scramjet 4.11.0 - Method improvements and addition of into.

* Allow `separate` to send a single chunk into multiple output streams.
* Update scramjet-core, introduction of `into` method.
* Documentation fixes and a new example in main readme.

## Scramjet 4.10.1 - Remove nodeunit dependency in favor of tap

* Dependency update to remove vunerablity
* Removal of nodeunit in favor of tape
* Scramjet-core 4.9.1
* Node.js v10 compatibility
* Node.js v9 tests

## Scramjet 4.9.0

* Adds `whenError` method to all stream
* Fixes `consume` method
* Update `scramjet-core`

## Scramjet 4.6.0

* Major fixes in multiple methods, fixed tests, better coverage
* Reorganization of methods, many additions:
  * `DataStream::slice` method added for getting data from in between streams
  * `DataStream::endWith` method added to push something onto the end of the stream
  * `DataStream::concat` method added to append streams one after another
  * `DataStream::join` method added to add chunk inbetween items
  * `DataStream::toJSONArray` method added to output streamed JSON array
  * `DataStream::toJSONObject` method added to output streamed JSON object

## Scramjet 4.5.0

* New `peek` and `empty` methods on DataStream
* Update `scramjet-core`
* Allow loading modules just by passing their paths, increase default threads
* Dependency removal
* Affinity callback optional on `distribute`

## Scramjet 4.4.0

* improved multi-threading

## Scramjet 4.3.0

* Using `papaparse` for CSV parse/serialization
* Dependency updates

## Scramjet 4.2.0

* Fully functional multi-threading

## Scramjet 4.0.0

* Node.js v6 no longer supported
* Initial multi-threading support
* New docs and changelogs
* New linting
* Dependent on `scramjet-core 4.x`

# Scramjet 3.x

The intreface is still the same as previous 2.x version, but now Scramjet is plugin based.

The core features have been moved to [scramjet-core](https://www.npmjs.com/package/scramjet-core) module. This is a base
for plugin development.

Scramjet itself now consitst of most common plugins and extends core.

## Scramjet 3.1.0

Added new methods (with the dependecy to `scramjet-core v3.2.0`):

* `while` - ends the stream as soon as the condition returns a falsy value (no more items will be processed)
* `until` - works the other way around

Test now also checks if files lint properly.

## Scramjet 3.0.0

Initial release of Scramjet 3.

# Scramjet 2.x

* The interface for the following classes is now considered stable:
  - ```DataStream```
  - ```StringStream```
  - ```BufferStream```
  - ```MultiStream```
* This means that no already existing method will change the interface and
  essentially the current protocol will be backwards compatible.
* Relicensed to the MIT License

## Scramjet 2.12.0

* Added possibility to assign an object
* Fixed assign not to mutate the object passed in callback
* Added tests for assign
* Fixed Node v8.0.0 compatibility (by filtering undefined chunks)

## Scramjet 2.11.1

* Fixed default encoding of StringStream to "utf8"
* DataStream.fromIterator now allows asynchronous operations (by returning a promise)
* The promised plugins doc is here. :)

## Scramjet 2.11.0

* Added whenRead and whenWrote methods docs (meaning that as of 2.11 they're fully supported).
* Renamed group to separate, an alias still exists though...
* Promised plugins will be documented in more detail in 2.11.1

## Scramjet 2.10.0

scramjet.plugin interface added for plugins. More docs to come in 2.10.1.

## Scramjet 2.9.0

DataStream.fromIterator static method added, cluster method hinted.

## Scramjet 2.8.0

Implemented DataStream::timeBatch, minor docs fix

## Scramjet 2.7.0

Implemented DataStream::group.

## Scramjet 2.6.1

Fix regression on StringStream::match.

## Scramjet 2.6.0

New methods!

* StringStream.fromString - static, works like DataStream:fromArray
* StringStream::append - appends anything to every chunk
* StringStream::prepend - prepends anything to every chunk
* DataStream::unshift - writes some chunks at call time
* DataStream::flatten - a shorthand for flattening chunks which are arrays
* DataStream::batch - batch aggregation of chunks by length

Examples yet to come.

## Scramjet 2.5.2

* Dev dependencies update (nodeunit, jsdoc-to-markdown)

## Scramjet 2.5.0

* Added `use` method.

## Scramjet 2.4.2

* Removed dependency on mergesort-stream and almost 30% performance improvement on muxing streams

## Scramjet 2.4.1

* flatMap method introduced on DataStream

## Scramjet 2.3.0

* Asynchronous tranforms on multiple streams are merged into one.
* New .tap() method introduced to be able to revert to previous behavior
* Benchmark added (but is also released separately)
* Misleading pop() name changed to shift(), but old one still kept for
  compatibility

## Scramjet 2.2.1

* Asynchronous transforms now run in parallel, exact documentation on how to
  control it to follow
* Fixed a bug causing not raising exceptions properly

## Scramjet 2.1.1

* better docs and autogenerated readme

## Scramjet 2.1.0

* pop method now working consistently in Buffer and String Streams (pops a
  number of bytes instead of buffers/strings)
* breakup method introduced in BufferStream - breaks stream up into set length
  chunks.
* DataStream fromArray and toArray shorthand methods added.
* toBufferStream/toStringStream methods added on StringStream and BufferStream
* DataStream remap function added
* DataStream pop now operates on a copy of the original array.

## Scramjet 2.0.0

Initial release of the MIT licensed and stable version.

# Scramjet 1.x

With the release of 2.x the 1.x branch will no longer get support. The last
version in code is identical to 2.0.0 and future releases in the next major
will still be backwards compatible.

## Version 1.5.0

* Change MultiStream methods to work asynchronously (return Promise instead of
    the streams)
* Document MultiStream add/remove methods
* Enforce stricter jshint

## Version 1.4.2

* Improve tee and pop methods overriding
* Fix ```stream.end``` handling in ```reduce```

## Version 1.4.0

Interface changes:
* ```DataStream::reduceNow``` introduced to allow reducing into an object
  returned instantly.
* ```StringStream::pop``` implemented
* ```StringStream::separate``` and ```StringStream::slice``` prosposed

Added proper tests for ```DataStream``` and ```StringStream``` and travis.ci.

## Version 1.3.1

* Simplified stream transformations.
* Improved docs

## Version 1.3.0

Interface changes:
* ```DataStream::reduce``` now returns a Promise instead of the first object
  passed. The promise is resolved on end of input stream.
* ```StringStream::match``` added, returns a stream of matches in the passed
  regexp.
  * Added Gulp
    * Added Gulp task for docs creation (called docs).

Bugfixes:
* Fixed error in MultiStream.mux
* Fixed error in the flush method in split/match.
