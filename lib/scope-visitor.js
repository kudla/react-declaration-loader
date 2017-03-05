'use strict';

var scopeWalker = {
    enter: function(stateIgnored, node, parent) {
        if (!node._scope && parent) {
            node._scope = parent._scope;
        }
        switch (node.type) {
            case 'Program': {
                node._scope = {closure: node, block: node};
                node._declarations = {};
                return;
            }
            case 'FunctionExpression':
            case 'FunctionDeclaration': {
                node._scope = extendScope(parent._scope, {
                    closure: node,
                    block: node
                });
                node._declarations = inheritDeclarations();
                if (node.id && node.type === 'FunctionDeclaration') {
                    node.id._scope = parent._scope;
                }
                break;
            }
            case 'BlockStatement': {
                node._scope = extendScope(parent._scope, {
                    block: node
                });
                node._declarations = inheritDeclarations();
            }

        }
        function inheritDeclarations() {
            return Object.create(parent._scope
                .block
                ._declarations
            );
        }
    },
    leave: function(stateIgnored, node, parent) {
        var type = node.type;
        if (['FunctionExpression', 'FunctionDeclaration'].indexOf(type) !== -1) {
            var reactUnresolved = node._reactUnresolved;
            var reactDeclared = node._declarations.React;
            if (reactUnresolved && !reactDeclared) {
                parent._reactUnresolved = true;
            }
        }
    }
};

module.exports = scopeWalker;

function extendScope(scope, extra) {
    return Object.assign(
        Object.create(scope),
        extra || {}
    );
}
