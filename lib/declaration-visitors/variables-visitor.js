'uses strict';

module.exports = {
    VariableDeclarationEnter: function(node) {
        var kind = node.kind;
        var context = node._context;
        var declarationScope = kind === 'var' ? context.closure : context.block;
        var uniqueDeclaration = kind !== 'var';
        node._context = Object.assign(
            Object.create(context),
            {
                declarations: declarationScope._declarations,
                declarationNode: node,
                uniqueDeclaration
            }
        );
    },
    VariableDeclaratorEnter: function (node) {
        var id = node.id;
        var name = id.name;
        var type = id.type;
        if (type === 'Identifier' && name === 'React') {
            var context = node._context;
            var declarations = context.declarations[name];
            node._uniqueDeclaration = context.uniqueDeclaration;
            if (!declarations) {
                declarations = [node];
            } else {
                declarations = declarations.concat(node);
            }
            context.declarations[name] = declarations;
        }
    }
};
