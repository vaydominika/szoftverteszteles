const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the original exercise without modifying its implementation.
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "ParkingFeeCalculator.js"), "utf8"), context);
const calculate = context.calculateParkingFee;

// A null expected value means invalid input must throw an error.
const cases = [
    [[0, false, false], 0],
    [[14, false, true], 0],
    [[15, false, false], 0],
    [[15, false, true], 0],
    [[16, false, false], 600],
    [[59, false, false], 600],
    [[60, false, false], 600],
    [[61, false, false], 1200],
    [[120, false, false], 1200],
    [[60, true, false], 300],
    [[60, false, true], 480],
    [[60, true, true], 240],
    [[600, false, false], 5000],
    [[600, true, false], 2500],
    [[600, false, true], 4000],
    [[600, true, true], 2000],
    [[-1, false, false], null],
    [[-1, true, true], null]
];
const results = cases.map(([input, expected], index) => {
    let actual;
    let threw = false;
    try {
        actual = calculate(...input);
    } catch (error) {
        threw = true;
        actual = "error";
    }
    const passed = expected === null ? threw : !threw && typeof actual === "number" && Math.abs(actual - expected) < 1e-7;
    return { id: `T${String(index + 1).padStart(2, "0")}`, input,
        expected: expected === null ? "error" : expected, actual, passed };
});
if (process.argv.includes("--json")) {
    console.log(JSON.stringify(results, null, 2));
} else {
    for (const test of results) {
        console.log(`${test.id}: input=${JSON.stringify(test.input)}, expected=${test.expected}, actual=${test.actual}, ${test.passed ? "passed" : "FAILED"}`);
    }
    const passed = results.filter(test => test.passed).length;
    console.log(`${results.length} cases, ${passed} passed, ${results.length - passed} failed.`);
}
process.exitCode = results.every(test => test.passed) ? 0 : 1;
