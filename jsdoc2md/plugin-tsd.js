const isChainable = (doclet) => doclet && doclet.comment.indexOf('chainable') >= 0;
const isClassMember = ({kind}) => (kind === 'member' || kind === 'function');
const injected = (doclet) => (doclet.tags || []).filter(({title}) => title === "inject").map(({value}) => value.trim());

// const has = (doclet, tag) => doclet.comment.indexOf('@' + tag) >= 0

let tagLookup = {};
const matchLookup = (tag) => Object.keys(tagLookup)
    .sort(
        (a, b) => b.length - a.length
    )
    .filter(
        (lookup) => tag.indexOf(lookup) === 0
    );

const getLookupType = (type) => {
    return Object.entries(tagLookup)
        .reduce(
            (current, [_to, {longname: _from}]) => {
                return current.replace(_from, _to)
            },
            type
        );
};

exports.handlers = {
    parseBegin() {
        tagLookup = {};
    },
    newDoclet({doclet}) {

        if (doclet.memberof === 'module:scramjet') {
            injected(doclet)
                .reduce(
                    (acc, symbol) => tagLookup[symbol] = doclet,
                    null
                ) && (doclet.undocumented = true);
        }

        if (tagLookup[doclet.longname]) {
            doclet.name = tagLookup[doclet.longname].name;
            doclet.memberof = tagLookup[doclet.longname].memberof;
            doclet.longname = tagLookup[doclet.longname].longname;
        }

        if (doclet.augments) {
            let replaced = 0;
            const oldAugments = doclet.augments;
            doclet.augments = doclet.augments.map(
                augmented => matchLookup(augmented).map(
                    lookup => (replaced++, augmented.replace(lookup, tagLookup[lookup].longname))
                )
            );
            if (replaced && doclet.kind === 'class') {
                doclet.name += ' extends ' + oldAugments[0]
            }
        }

        if (doclet.memberof) {
            matchLookup(doclet.memberof)
                .forEach(
                    (lookup) => {
                        doclet.longname = doclet.longname.replace(lookup, tagLookup[lookup].longname)
                        doclet.memberof = doclet.memberof.replace(lookup, tagLookup[lookup].longname)
                    }
                );
        }
        if (!doclet.returns && isClassMember(doclet)) {
            if (doclet.async) {
                doclet.returns = [{type: {names: ["Promise"]}}];
            } else if (isChainable(doclet)) {
                doclet.returns = [{type: {names: [getLookupType(doclet.memberof)]}}];
            }
        }
    }
};

