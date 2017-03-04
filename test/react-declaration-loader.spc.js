'use strict';

const fs = require('fs');
const path = require('path');
const reactDeclarationLoader = require('../react-declaration-loader');
const expect = require('chai').expect;

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

    describe('cases', () => {
        const casesPath = path.join(__dirname, 'cases');
        getCases(casesPath);
        function getCases(dir) {

            let entries = fs.readdirSync(dir);

            entries.forEach(handleEntry);

            function handleEntry(entry) {
                let fullPath = path.join(dir, entry);
                let isCase = fs
                .lstatSync(fullPath)
                .isFile();

                if (isCase) {
                    testCase(entry);

                } else {
                    describe(entry, function() {
                        getCases(fullPath);
                    });
                }
            }

            function testCase(caseFile) {
                let testName = caseFile.replace(/\..*/, '');
                it (testName, function() {
                    let [source, expectation = source] = fs
                        .readFileSync(path.join(dir, caseFile))
                        .toString()
                        .split(/\/\/\-{12,}\n/m);
                    if (expectation === undefined) {
                        expectation = source;
                    }
                    source = loader.run(source).split('\n');
                    expectation = expectation.split('\n');
                    expect(source).deep.equal(expectation);
                });
            }
        }
    });



});
