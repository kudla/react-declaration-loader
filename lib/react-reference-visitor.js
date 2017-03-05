'use strict';

module.exports = {
    MemberExpressionEnter: function(stateIgnored, node) {
        var type = node.object.type;
        var name = node.object.name;
        if (type === 'Identifier' && name === 'React') {
            var scope = node._scope;
            if (!('React' in scope.block._declarations)) {
                scope.closure._reactUnresolved = true;
            }
        }
    }
};
