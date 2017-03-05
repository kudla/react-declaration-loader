'use strict';

const fs = require('fs');
const path = require('path');

module.exports = runCases;

function runCases(dir, testCase) {

    let entries = fs.readdirSync(dir);

    entries.forEach(handleEntry);

    function handleEntry(entry) {
        let fullPath = path.join(dir, entry);
        let isCase = fs
            .lstatSync(fullPath)
            .isFile();

        if (isCase) {
            runCase(entry);
        } else {
            describe(entry, () => {
                runCases(fullPath, testCase);
            });
        }
    }

    function runCase(caseFile) {
        let name = caseFile.replace(/\..*/, '');

        testCase(name, getSource);

        function getSource() {
            return fs
            .readFileSync(path.join(dir, caseFile))
            .toString();
        }
    }
}
