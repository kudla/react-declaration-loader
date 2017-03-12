'use strict';

var variablesVisitor = require('./variables-visitor');
var functionNameVisitor = require('./function-name-visitor');

module.exports = [variablesVisitor, functionNameVisitor];
