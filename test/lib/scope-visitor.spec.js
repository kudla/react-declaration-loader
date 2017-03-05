'use strict';

const _ = require('lodash');
const path = require('path');
const expect = require('chai').expect;
const esprima = require('esprima');
const traverse = require('../../lib/traverse');
const runCases = require('../helpers/run-cases');
const scopeVisitor = require('../../lib/scope-visitor');

const INTEGRATIONAL_CASES_PATH = path.join(__dirname, '../cases/scope-visitor');

describe.only('lib/scope-visitor', function() {
    runCases(INTEGRATIONAL_CASES_PATH, testCase);
    function testCase(name, getSource) {
        it (name, function() {

            let [source, expectations] = getSource()
                .split(/\/\/\-{12,}\n/m);
            expectations = JSON.parse(expectations);

            let ast = esprima.parse(source, {comment: true});
            let counter = {};
            traverse(ast, scopeVisitor, {
                enter(state, node) {
                    if (!node._countId) {
                        let _countId = (counter[node.type] + 1) || 0;
                        node._countId = _countId;
                        counter[node.type] = _countId;
                    }
                },
                IdentifierEnter(state, node) {
                    checkNode(node);
                }
            });
            function checkNode(node) {
                if(node._checked) {
                    return;
                }
                let {name, _countId, type} = node;
                let id = name || _countId;
                let {_closure, _block} = node._scope;
                let expectClosure = _.get(expectations, [type, id, 'closure'], {});
                let expectBlock = _.get(expectations, [type, id, 'block'], {});
                expect(_closure.type).to.equal(expectClosure.type, `${type} "${id}" closure type`);
                expect(_closure._countId).to.equal(expectClosure.id, `${type} "${id}" closure id`);
                expect(_block.type).to.equal(expectBlock.type, `${type} "${id}" block type`);
                expect(_block._countId).to.equal(expectBlock.id, `${type} "${id}" block id`);
                node._checked = true;
                checkNode(_block);
                checkNode(_closure);
            }
        });
    }

});
