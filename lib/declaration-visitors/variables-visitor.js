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
        var id = node.id;
        addDeclaration(id, node);
    },
    enter: function(node) {
        switch(node.type) {
            case 'FunctionDeclaration':
            case 'FunctionExpression':
                var context = node._context;
                node.params.forEach(function(param) {
                    param._parameterDeclaration = true;
                });
                node._context = Object.assign(
                    Object.create(context),
                    {
                        declarations: context.block._declarations
                    }
                );
                return;
        }
        if (node._parameterDeclaration) {
            addDeclaration(node, node);
        }
    }
};

function addDeclaration(id, declaratorNode) {
    var context = declaratorNode._context;
    var declarations = context.declarations[name];
    var name;
    switch (id.type) {
        case 'Identifier':
            name = id.name;
            break;
    }
    if (name === 'React') {
        declaratorNode._uniqueDeclaration = context.uniqueDeclaration;
        if (!declarations) {
            declarations = [declaratorNode];
        } else {
            declarations = declarations.concat(declaratorNode);
        }
        context.declarations[name] = declarations;
    }
}
