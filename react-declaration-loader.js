'use strict';

var esprima = require('esprima');
var traverse = require('./lib/traverse');
var escodegen = require('escodegen');
var scopeVisitor = require('./lib/scope-visitor');
var declarationVisitors = require('./lib/declaration-visitors');
var reactReferenceVisitor = require('./lib/react-reference-visitor');

module.exports = reactDeclarationLoader;

function reactDeclarationLoader(source) {
    this.cacheable && this.cacheable();
    var ast = esprima.parse(source, {tokens: true, range: true, comment: true });
    traverse(
        ast,
        scopeVisitor,
        declarationVisitors,
        reactReferenceVisitor,
        {
            ProgramLeave: ProgramLeave
        }
    );
    return source;

    function ProgramLeave(sateIgnored, program) {
        if (program._reactUnresolved) {
            var declarations = program
                ._declarations.React || [];
            declarations = declarations
                .filter(function(declaration) {
                    return declaration.type !== 'VariableDeclaration' ||
                        declaration.kind !== 'var';
                });
            if (declarations.length) {
                return;
            }
            var injectIndex = 0;
            var body = program.body;

            ast = escodegen.attachComments(ast, ast.comments, ast.tokens);

            while(injectIndex < body.length) {
                var childNode = body[injectIndex];
                if (!childNode.directive) {
                    break;
                }
                injectIndex = injectIndex + 1;
            }
            body.splice(injectIndex, 0, esprima.parse('var React = require(\'react\');'));
            source = escodegen.generate(ast);
        }
    }
}
