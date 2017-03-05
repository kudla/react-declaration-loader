'uses strict';

module.exports = {
    VariableDeclarationEnter: function(stateIgnored, node) {
        var kind = node.kind;
        var scope = node._scope;
        var varScope = kind === 'var' ? scope.closure : scope.block;
        node._scope = Object.assign(
            Object.create(node._scope),
            {
                declarations: varScope._declarations,
                declarationNode: node
            }
        );
    },
    VariableDeclaratorEnter: function (stateIgnored, node) {
        var id = node.id;
        var name = id.name;
        var type = id.type;
        if (type === 'Identifier' && name === 'React') {
            var scope = node._scope;
            var declarationNode = scope.declarationNode;
            var declarations = scope.declarations[name];
            if (!declarations) {
                declarations = [declarationNode];
            } else {
                declarations = declarations.concat(declarationNode);
            }
            scope.declarations[name] = declarations;
        }
    }
};
