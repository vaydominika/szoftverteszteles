const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the original exercise without modifying its implementation.
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "DiscountCalculator.js"), "utf8"), context);
const calculate = context.calculateDiscountedPrice;

// A null expected value means invalid input must throw an error.
const cases = [
    [[0, false], 0],
    [[9999, false], 9999],
    [[10000, false], 9500],
    [[10001, false], 9500.95],
    [[24999, false], 23749.05],
    [[25000, false], 22500],
    [[49999, false], 44999.1],
    [[50000, false], 42500],
    [[50001, false], 42500.85],
    [[1000, true], 950],
    [[10000, true], 9000],
    [[25000, true], 21250],
    [[50000, true], 40000],
    [[100000, true], 80000],
    [[-1, false], null],
    [[-1, true], null],
    [[0, true], 0]
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
