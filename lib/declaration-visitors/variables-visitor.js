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
                uniqueDeclaration
            }
        );
    },
    VariableDeclaratorEnter: function (node) {
        node.id._declarator = true;
    },
    enter: function(node) {
        switch(node.type) {
            case 'FunctionDeclaration':
            case 'FunctionExpression':
                var context = node._context;
                node.params.forEach(function(param) {
                    param._declarator = true;
                });
                node._context = Object.assign(
                    Object.create(context),
                    {
                        declarations: context.block._declarations
                    }
                );
                return;
        }
        if (node._declarator) {
            switch (node.type) {
                case 'Identifier':
                    addDeclaration(node);
                    return;
                case 'ObjectPattern':
                    node.properties.forEach(function(property) {
                        property.key._declarator = true;
                        property.value._declarator = true;
                    });
                    break;
                case 'ArrayPattern':
                    node.elements.forEach(function(element) {
                        element._declarator = true;
                    });
                    break;
                case 'RestElement': {
                    node.argument._declarator = true;
                    break;
                }
            }
        }
    }
};

function addDeclaration(id) {
    var name = id.name;
    var context = id._context;
    var declarations = context.declarations[name];

    if (name === 'React') {
        id._uniqueDeclaration = context.uniqueDeclaration;
        if (!declarations) {
            declarations = [id];
        } else {
            declarations = declarations.concat(id);
        }
        context.declarations[name] = declarations;
    }
}
