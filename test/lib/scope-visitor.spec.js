'use strict';

const expect = require('chai').expect;

const scopeVisitor = require('../../lib/scope-visitor');
const leave = scopeVisitor.leave;

describe('lib/scope-visitor', function() {

    describe('react resolved decision for scope', () => {

        let node;
        let parent;
        let state = {};

        describe('if react was not resolved in closure', () => {

            beforeEach(() => {
                node = {
                    _reactUnresolved: true,
                    _declarations: {}
                };
                parent = {};
            });

            describe('and closure has no react later declaration either', () => {

                describe('should mark parent closure as "unresolved"', () => {

                    it('for FunctionDeclaration', () => {
                        node.type = 'FunctionDeclaration';
                        leave(state, node, parent);
                        expect(parent._reactUnresolved).to.equal(true);
                    });

                    it('for FunctionExpression', () => {
                        node.type = 'FunctionExpression';
                        leave(state, node, parent);
                        expect(parent._reactUnresolved).to.equal(true);
                    });

                });

                it('should not care for any other node type', () => {
                    node.type = 'OtherNodeType';
                    leave(state, node, parent);
                    expect(parent).to.not.have.property('_reactUnresolved');
                });
            });

            describe('but closure has react declaration later', () => {
                it ('should not care', () => {
                    [
                        'FunctionDeclaration',
                        'FunctionExpression',
                        'OtherNodeType'
                    ].forEach(nodeType => {
                        node.type = nodeType;
                        leave(state, node, parent);
                        expect(parent).to.not.have.property('_reactUnresolved', `for ${nodeType}`);
                    });
                });
            });
        });

    });
});
