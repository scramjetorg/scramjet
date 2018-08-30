# Scramjet 4.x

Scramjet 4 brings a stable interface, multi-threading, CSV parsing, asynchronous data augmentation and on...

## Scramjet 4.18.6 - do and from

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

* Fix readable only streams
* Fixes typescript definitions
* Minor documentation fixes

## Scramjet 4.15.0 - keep and rewind methods (DVR for node streams)

* Update dependencies
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

## Scramjet 4.12.2

* Fix of the `into` method in scramjet-core.
* Fix test runners so unfinished tests now fail.

## Scramjet 4.12.1

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

## Scramjet 4.10.0 - Nodejs v10 compatibility fix

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
