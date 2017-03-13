'uses strict';

module.exports = {
    enter: function(node, parent) {
        var declarationContext;
        switch(node.type) {
            case 'FunctionDeclaration':
                declarationContext = parent._context;
                break;
            case 'FunctionExpression':
                declarationContext = node._context;
                break;
            default:
                return;
        }
        var id = node.id || {};
        var name = id.name;
        var type = id.type;
        if (type === 'Identifier' && name === 'React') {
            var declarationNode = declarationContext.closure;
            var declarations = declarationNode._declarations[name];
            if (!declarations) {
                declarations = [node];
            } else {
                declarations = declarations.concat(node);
            }
            declarationNode._declarations[name] = declarations;
        }
    }
};
