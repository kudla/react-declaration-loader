'use strict';

const path = require('path');
const reactDeclarationLoader = require('../react-declaration-loader');
const expect = require('chai').expect;

const runCases = require('./helpers/run-cases');

const INTEGRATIONAL_CASES_PATH = path.join(__dirname, 'cases/integrational');
const REACT_INJECTION = /\/\*\s*(global|inject)\s+React\s*\*\/\s*(?=$)/m;
const REACT_DECLARATION = 'var React = require(\'react\');';
const EMPTY_LINES = /\n[\s\n]*(?=(\n|$))/g;

describe('react-declaration-loader', function() {

    let loader;

    beforeEach(function() {
        loader = {
            run: reactDeclarationLoader
        };
    });

    it('should prduce loading if no cacheing is available', () => {
        loader.run('');
    });

    it('should use chache if posible', () => {
        Object.assign(
            loader,
            {
                cached: 0,
                cacheable: function () {
                    this.cached = this.cached + 1;
                }
            }
        );

        loader.run('');
        expect(loader.cached).to.equal(1);
    });

    describe('integrational cases', () => {

        runCases(INTEGRATIONAL_CASES_PATH, testCase);

        function testCase(name, getSource) {
            it (name, () => {

                let source = getSource()
                    .replace(EMPTY_LINES, '');

                let expectation = source
                    .replace(REACT_INJECTION, REACT_DECLARATION);

                source = source.replace(REACT_INJECTION, '');

                // apply loader to source
                source = loader.run(source)
                    .replace(EMPTY_LINES, '');

                // split source and expectation
                // to produce line by line comaration
                source = source.split('\n');
                expectation = expectation.split('\n');

                expect(source).deep.equal(expectation);
            });
        }
    });



});
