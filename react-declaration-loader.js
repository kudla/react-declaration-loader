'use strict';

var esprima = require('esprima');
var traverse = require('./lib/traverse');
var astring = require('astring');
var contextVisitor = require('./lib/context-visitor');
var declarationVisitors = require('./lib/declaration-visitors');
var reactReferenceVisitor = require('./lib/react-reference-visitor');

module.exports = reactDeclarationLoader;

function reactDeclarationLoader(source) {
    this.cacheable && this.cacheable();
    var ast = esprima.parse(source, {
        tokens: true,
        range: true,
        comment: true,
        sourceType: 'module'
    });
    traverse(
        ast,
        contextVisitor,
        declarationVisitors,
        reactReferenceVisitor,
        {
            ProgramLeave: ProgramLeave
        }
    );
    return source;

    function ProgramLeave(program) {
        var injectReact = false;
        if (program._reactUnresolved) {
            var declarations = program
                ._declarations.React || [];
            var unresolvedInThisClosure = program._unresolvedInThisClosure;

            if (unresolvedInThisClosure){
                var conflicts = declarations
                    .filter(function(node){
                        return node._uniqueDeclaration;
                    }).length;
                injectReact = !conflicts;
            } else if (!declarations.length) {
                injectReact = true;
            }
        }
        if (injectReact) {
            injectDeclaration();
        }
        function injectDeclaration() {
            var injectIndex = 0;
            var body = program.body;

            while(injectIndex < body.length) {
                var childNode = body[injectIndex];
                if (!childNode.directive) {
                    break;
                }
                injectIndex = injectIndex + 1;
            }
            body.splice(injectIndex, 0, esprima.parse('var React = require(\'react\');'));
            source = astring(ast, {
                comment: true,
                indent: '    '
            });
        }
    }
}
