'use strict';

var scopeWalker = {
    enter: function(state, node, parent) {
        if (!node._scope && parent) {
            node._scope = parent._scope;
        }
        switch (node.type) {
            case 'Program': {
                node._scope = {_closure: node, _block: node};
                return;
            }
            case 'FunctionExpression':
            case 'FunctionDeclaration': {
                node._scope = extendScope(parent._scope, {
                    _closure: node,
                    _parent: parent._scope,
                    _block: node
                });
                if (node.id && node.type === 'FunctionDeclaration') {
                    node.id._scope = parent._scope;
                }
                break;
            }
            case 'BlockStatement': {
                node._scope = extendScope(parent._scope, {
                    _parent: parent._scope,
                    _block: node
                });
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
