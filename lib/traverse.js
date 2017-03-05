'use strict';

var estraverse = require('estraverse');
var slice = Array.prototype.slice;

module.exports = traverse;

/**
 * traverse - AST traverse helper
 *
 * @param  {AST} ast
 * @param  {Object} ...visitors     hash of visitor functions
 */
function traverse(ast) {
    var visitors = slice.call(arguments, 1);
    var state = {};
    estraverse.traverse(ast, {
        enter: function(node) {
            var type = node.type;
            var methodName = type + 'Enter';
            visitorsCall('enter', this, arguments);
            visitorsCall(methodName, this, arguments);
        }
    });
    function visitorsCall(methodName, context, args) {
        var callArgs = [state].concat(slice.call(args));
        visitors.forEach(function(visitor) {
            var method = visitor[methodName];
            if (method) {
                method.apply(context, callArgs);
            }
        });
    }
    return state;
}
