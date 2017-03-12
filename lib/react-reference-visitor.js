'use strict';

module.exports = {
    MemberExpressionEnter: function(node) {
        var type = node.object.type;
        var name = node.object.name;
        if (type === 'Identifier' && name === 'React') {
            var context = node._context;
            if (!('React' in context.block._declarations)) {
                var closure = context.closure;
                var reactUnresolved = closure._reactUnresolved || [];
                closure._reactUnresolved = reactUnresolved.concat(closure);
            }
        }
    }
};
