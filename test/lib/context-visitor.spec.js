'use strict';

const expect = require('chai').expect;

const contextVisitor = require('../../lib/context-visitor');
const leave = contextVisitor.leave;

describe('lib/context-visitor', function() {

    describe('react resolved decision for context', () => {

        let node;
        let parent;
        let state = {};

        describe('if react was not resolved in closure', () => {
            let closure = {};
            beforeEach(() => {
                node = {
                    _reactUnresolved: [closure],
                    _declarations: {},
                    _context: {
                        closure: {}
                    }
                };
                parent = {};
                parent._context = {closure: parent};
            });

            describe('and closure has no react later declaration either', () => {

                it('should mark parent closure as "unresolved" for closure nodes', () => {
                    node._context.closure = node;
                    leave(state, node, parent);
                    expect(parent._reactUnresolved).deep.equal([node]);
                });

                it('should extend parent closure "unresolved" for closure nodes', () => {
                    let parentUnresolvedClosure = {};
                    parent._reactUnresolved = [parentUnresolvedClosure];
                    node._context.closure = node;
                    leave(state, node, parent);
                    expect(parent._reactUnresolved).deep.equal([parentUnresolvedClosure, node]);
                });

                it('should not care for any other node type', () => {
                    leave(state, node, parent);
                    expect(parent).to.not.have.property('_reactUnresolved');
                });
            });

            describe('but closure has react declaration later', () => {

                beforeEach(() => {
                    node._declarations = {React: [{}]};
                });

                it ('should not care for closure nodes', () => {
                    node._context.closure = node;
                    leave(state, node, parent);
                    expect(parent).to.not.have.property('_reactUnresolved');
                });

                it ('should not care for nonclosure nodes', () => {
                    leave(state, node, parent);
                    expect(parent).to.not.have.property('_reactUnresolved');
                });
            });
        });

    });
});
