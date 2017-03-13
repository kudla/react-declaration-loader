'use strict';

module.exports = {
    ImportDeclarationEnter: ImportDeclarationEnter
};

function ImportDeclarationEnter(node) {

    var specifiers = node.specifiers || [];
    specifiers = specifiers.filter(function(specifier) {
        var local = specifier.local;
        return local && local.name === 'React';
    });

    if (specifiers.length) {
        var declarations = node._context.closure._declarations;
        if (declarations.React) {
            var reactDeclarations = declarations.React;
            reactDeclarations.push.apply(reactDeclarations, specifiers);
        } else {
            declarations.React = specifiers;
        }
    }
}
