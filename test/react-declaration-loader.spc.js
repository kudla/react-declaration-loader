'use strict';


const path = require('path');
const reactDeclarationLoader = require('../react-declaration-loader');
const expect = require('chai').expect;

const runCases = require('./helpers/run-cases');

const INTEGRATIONAL_CASES_PATH = path.join(__dirname, 'cases/integrational');

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

    it('should use chache if posiible', () => {
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
                let [source, expectation] = getSource()
                    .split(/\/\/\-{12,}\n/m);

                if (expectation === undefined) {
                    expectation = source;
                }

                source = loader.run(source).split('\n');
                expectation = expectation.split('\n');
                expect(source).deep.equal(expectation);
            });
        }
    });



});
