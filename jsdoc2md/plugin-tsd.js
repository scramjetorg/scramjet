const isChainable = (doclet) => doclet && doclet.comment.indexOf('chainable') >= 0;
const isClassMember = (doclet) => !doclet.memberof.match(/[^\w_]/);

exports.handlers = {
    newDoclet({doclet}) {
        if (isChainable(doclet) && !doclet.returns && isClassMember(doclet))
            doclet.returns = [{type: {names: [doclet.memberof]}}];
    }
};

