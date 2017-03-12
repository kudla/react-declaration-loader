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
            let {name, modifier} = resolveEntry(entry);
            let describer = modifier ? describe[modifier] : describe;

            describer(name, () => {
                runCases(fullPath, testCase);
            });
        }
    }

    function runCase(caseFile) {
        let {name, modifier} = resolveEntry(caseFile);

        testCase(name, getSource, modifier);

        function getSource() {
            return fs
            .readFileSync(path.join(dir, caseFile))
            .toString();
        }
    }

    function resolveEntry(entry) {
        let [name, modifier] = entry.split('.');
        if (['skip', 'only'].indexOf(modifier) === -1) {
            modifier = undefined;
        }
        return {name, modifier};
    }
}
