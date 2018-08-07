    module.exports = // or export default  if you use es6 modules
        function(filepath, def = "Could not read file") {
            // We open the file normally
            const _in = fs.createReadStream(filepath);
            // We'll need a list of targets later on
            let _piped = [];
            // Here's a handler that end's all piped outputs with the default value.
            const _handler = (e) => {
                if (!_piped.length) {
                    throw e;
                }

                _piped.forEach(
                    out => out.end(def)
                );
            };
            _in.once("error", _handler);

            // We keep the original `pipe` method in a variable
            const _orgPipe = _in.pipe;
            // And override it with our alternative version...
            _in.pipe = function(to, ...args) {
                const _out = _orgPipe.call(this, to, ...args);

                // ...which, apart from calling the original, also records the outputs
                _piped.push(_out);
                return _out;
            }
            // Optionally we could handle `unpipe` method here.

            // Here we remove the handler once data flow is started.
            _in.once("data", () => _in.removeListener("error", _handler));
            // And pause the stream again so that `data` listener doesn't consume the first chunk.
            _in.pause();

            // Finally we return the read stream
            return _in;
        };

