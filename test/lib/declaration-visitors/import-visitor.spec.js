'use strict';

const expect = require('chai').expect;
const {ImportDeclarationEnter} = require('../../../lib/declaration-visitors/import-visitor');

describe('lib/declaration-visitors/import-visitor', () => {
    let declarations;
    let globalScope;
    let importDeclarationSpecifiers;
    let importDeclarationNode;
    beforeEach(() => {
        declarations = {};
        globalScope = {_declarations: declarations};
        importDeclarationSpecifiers = [];
        importDeclarationNode = {
            specifiers: importDeclarationSpecifiers,
            _context: {
                closure: globalScope,
                block: globalScope
            }
        };
    });

    it('should not create declaration if there was no React specifier', () => {
        importDeclarationSpecifiers.push({local: {name: 'NonReact'}});

        ImportDeclarationEnter(importDeclarationNode);

        expect(declarations).to.be.empty;
    });

    it('should create declaration for any specifier with local name React', () => {
        let specifier = {local: {name: 'React'}};

        importDeclarationSpecifiers.push(specifier);

        ImportDeclarationEnter(importDeclarationNode);

        expect(declarations).to.have.property('React');
        expect(declarations.React).to.deep.equal([specifier]);
        expect(declarations.React[0]).to.equal(specifier);
    });

    it('should extend declarations for any specifier with local name React', () => {

        let initialSpecifier = {local: {name: 'React'}};
        let initialDeclarations = [initialSpecifier];
        let specifier = {local: {name: 'React'}};

        declarations.React = initialDeclarations;
        importDeclarationSpecifiers.push(specifier);

        ImportDeclarationEnter(importDeclarationNode);

        expect(declarations).to.have.property('React');
        expect(declarations.React).to.equal(initialDeclarations);
        expect(declarations.React).to.deep.equal([initialSpecifier, specifier]);
        expect(declarations.React[0]).to.equal(initialSpecifier);
        expect(declarations.React[1]).to.equal(specifier);
    });
});
