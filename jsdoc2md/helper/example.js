exports.linkvalue = function(link){

	if (Array.isArray(link))
		link = link[0];
	if (link && link.indexOf("{@link") >= 0)
		link = link.replace(/^.*\{@link ([^\}]+)\}.*$/gm, "$1");
	else
		return "";

	return link;
};

exports.hasExample = function(item) {
	return this.examples && this.examples.length ? item.fn(this) : item.inverse(this);
};
