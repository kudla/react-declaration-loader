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
    var visitors = flatten(slice.call(arguments, 1));
    var state = {};

    estraverse.traverse(ast, {
        enter: function(node) {
            var type = node.type;
            var methodName = type + 'Enter';
            visitorsCall('enter', this, arguments);
            visitorsCall(methodName, this, arguments);
        },
        leave: function(node) {
            var type = node.type;
            var methodName = type + 'Leave';
            visitorsCall('leave', this, arguments);
            visitorsCall(methodName, this, arguments);
        }
    });

    return state;

    function visitorsCall(methodName, context, args) {
        var callArgs = [state].concat(slice.call(args));
        var callBreak;
        var visitorContext = Object.assign(
            Object.create(context),
            {
                skip: function() {
                    callBreak = true;
                    context.skip();
                },
                break: function() {
                    callBreak = true;
                    context.break();
                }
            }
        );
        visitors.some(function(visitor) {
            var method = visitor[methodName];
            if (method) {
                method.apply(visitorContext, callArgs);
            }
            return callBreak;
        });
    }
}

function flatten(array) {
    return array.reduce(function(flat, item) {
        if (item instanceof Array) {
            item = flatten(item);
        }
        return flat.concat(item);
    }, []);
}
