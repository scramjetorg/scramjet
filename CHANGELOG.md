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
