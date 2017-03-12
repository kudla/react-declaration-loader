'use strict';

const _ = require('lodash');
const path = require('path');
const expect = require('chai').expect;
const esprima = require('esprima');
const traverse = require('../../lib/traverse');
const runCases = require('../helpers/run-cases');
const contextVisitor = require('../../lib/context-visitor');

const INTEGRATIONAL_CASES_PATH = path.join(__dirname, '../cases/context-visitor');
const EXPECTATION_DELIMETER = /\/\/.*\scontext\s.*-{7,}\n/m;

describe('lib/context-visitor-integrational', function() {

    runCases(INTEGRATIONAL_CASES_PATH, testCase);

    function testCase(name, getSource, modifier) {
        let itFunction = modifier ? it[modifier] : it;
        itFunction (name, function() {

            let [source, expectations] = getSource()
                .split(EXPECTATION_DELIMETER);
            expectations = JSON.parse(expectations);

            let ast = esprima.parse(source, {comment: true});
            let counter = {};
            traverse(ast, contextVisitor, {
                enter(stateIgnored, node) {
                    if (!node._countId) {
                        let _countId = (counter[node.type] + 1) || 0;
                        node._countId = _countId;
                        counter[node.type] = _countId;
                    }
                },
                IdentifierEnter(stateIgnored, node) {
                    checkNode(node);
                }
            });
            function checkNode(node) {
                if(node._checked) {
                    return;
                }
                let {name, _countId, type} = node;
                let id = name || _countId;
                let {closure, block} = node._context;
                let expectClosure = _.get(expectations, [type, id, 'closure'], {});
                let expectBlock = _.get(expectations, [type, id, 'block'], {});
                expect(closure.type).to.equal(expectClosure.type, `${type} "${id}" closure type`);
                expect(closure._countId).to.equal(expectClosure.id, `${type} "${id}" closure id`);
                expect(block.type).to.equal(expectBlock.type, `${type} "${id}" block type`);
                expect(block._countId).to.equal(expectBlock.id, `${type} "${id}" block id`);
                node._checked = true;
                checkNode(block);
                checkNode(closure);
            }
        });
    }

});
