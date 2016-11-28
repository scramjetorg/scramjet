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

## Version 1.3.1

* Simplified stream transformations.
* Improved docs

## Version 1.4.0

Interface changes:
* ```DataStream::reduceNow``` introduced to allow reducing into an object
  returned instantly.
* ```StringStream::pop``` implemented
* ```StringStream::separate``` and ```StringStream::slice``` prosposed

Added proper tests for ```DataStream``` and ```StringStream``` and travis.ci.

## Version 1.4.2

* Improve tee and pop methods overriding
* Fix ```stream.end``` handling in ```reduce```

## Version 1.5.0

* Change MultiStream methods to work asynchronously (return Promise instead of
    the streams)
* Document MultiStream add/remove methods
* Enforce stricter jshint
