exports.cutcr = function(string) {
	return ( string || '' ).split( /\r|\r?\n/ ).shift();
};
