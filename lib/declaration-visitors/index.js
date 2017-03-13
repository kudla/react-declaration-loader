'use strict';

var variablesVisitor = require('./variables-visitor');
var functionNameVisitor = require('./function-name-visitor');
var importVisitor = require('./import-visitor');

module.exports = [
    variablesVisitor,
    functionNameVisitor,
    importVisitor
];
