'uses strict';

module.exports = {
    VariableDeclarationEnter: function(stateIgnored, node) {
        var kind = node.kind;
        var scope = node._scope;
        var varScope = kind === 'var' ? scope.closure : scope.block;
        node._scope = Object.assign(
            Object.create(node._scope),
            {
                declarations: varScope._declarations
            }
        );
    },
    VariableDeclaratorEnter: function (stateIgnored, node) {
        var id = node.id;
        if (id.type === 'Identifier') {
            var scope = node._scope;
            scope.declarations[id.name] = true;
        }
    }
};
