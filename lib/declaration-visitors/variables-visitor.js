'uses strict';

module.exports = {
    VariableDeclarationEnter: function(stateIgnored, node) {
        var kind = node.kind;
        var context = node._context;
        var varScope = kind === 'var' ? context.closure : context.block;
        node._context = Object.assign(
            Object.create(context),
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
            var context = node._context;
            var declarationNode = context.declarationNode;
            var declarations = context.declarations[name];
            if (!declarations) {
                declarations = [declarationNode];
            } else {
                declarations = declarations.concat(declarationNode);
            }
            context.declarations[name] = declarations;
        }
    }
};
