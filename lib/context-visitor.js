'use strict';

var contextWalker = {
    enter: function(stateIgnored, node, parent) {
        var context;

        if (node._context) {
            return;
        }
        
        if (parent) {
            node._context = parent._context;
        }
        switch (node.type) {
            case 'Program': {
                context = {closure: node, block: node};
                node._context = context;
                node._declarations = {};
                node.body._context = context;
                return;
            }
            case 'FunctionExpression':
            case 'FunctionDeclaration': {
                context = extendContext(parent._context, {
                    closure: node,
                    block: node
                });
                node._context = context;
                node._declarations = inheritDeclarations();
                if (node.id && node.type === 'FunctionDeclaration') {
                    node.id._context = parent._context;
                }
                node.body._context = context;
                break;
            }
            case 'BlockStatement': {
                node._context = extendContext(parent._context, {
                    block: node
                });
                if (!node._declarations) {
                    node._declarations = inheritDeclarations();
                }
            }

        }
        function inheritDeclarations() {
            return Object.create(
                parent._context
                    .block
                    ._declarations
            );
        }
    },
    leave: function(stateIgnored, node, parent) {
        if (node._context.closure === node) {
            var reactUnresolved = node._reactUnresolved;
            if (reactUnresolved) {
                var declarations = node
                    ._declarations.React || [];
                var unresolvedInThisClosure = reactUnresolved
                    .filter(function(closure) {
                        return closure === node;
                    }).length;
                if (unresolvedInThisClosure || !declarations.length) {
                    if (parent) {
                        var parentClosure = parent._context.closure;
                        var parentReactUnresolved = parentClosure._reactUnresolved || [];
                        parentClosure._reactUnresolved = parentReactUnresolved.concat(node);
                    } else {
                        node._unresolvedInThisClosure = unresolvedInThisClosure;
                    }

                } else {
                    delete node._reactUnresolved;
                }
            }
        }
    }
};

module.exports = contextWalker;

function extendContext(context, extra) {
    return Object.assign(
        Object.create(context),
        extra || {}
    );
}
