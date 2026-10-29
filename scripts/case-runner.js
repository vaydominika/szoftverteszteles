const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function runCases(testFile, functionName, cases) {
    const context = vm.createContext({});
    const sourceFile = testFile.replace(/Test\.js$/, '.js');
    vm.runInContext(fs.readFileSync(sourceFile, 'utf8'), context);
    const calculate = context[functionName];
    const results = cases.map(([input, expected], index) => {
        let actual;
        let threw = false;
        try { actual = calculate(...input); }
        catch (error) { threw = true; actual = 'error'; }
        const passed = expected === null ? threw : !threw && (typeof expected === 'number'
            ? typeof actual === 'number' && Math.abs(actual - expected) < 1e-7
            : actual === expected);
        return { id: `T${String(index + 1).padStart(2, '0')}`, input,
            expected: expected === null ? 'error' : expected, actual, passed };
    });
    if (process.argv.includes('--json')) console.log(JSON.stringify(results, null, 2));
    else {
        for (const result of results) console.log(`${result.id}: input=${JSON.stringify(result.input)}, expected=${result.expected}, actual=${result.actual}, ${result.passed ? 'passed' : 'FAILED'}`);
        const passed = results.filter(result => result.passed).length;
        console.log(`${path.basename(testFile)}: ${results.length} cases, ${passed} passed, ${results.length - passed} failed.`);
    }
    process.exitCode = results.every(result => result.passed) ? 0 : 1;
}
module.exports = { runCases };
