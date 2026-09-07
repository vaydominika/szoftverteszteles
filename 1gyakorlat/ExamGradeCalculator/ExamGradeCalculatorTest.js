const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the original exercise without modifying its implementation.
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "ExamGradeCalculator.js"), "utf8"), context);
const calculate = context.calculateGrade;

// A null expected value means invalid input must throw an error.
const cases = [
    [
        [
            29,
            40
        ],
        1
    ],
    [
        [
            60,
            19
        ],
        1
    ],
    [
        [
            30,
            30
        ],
        3
    ],
    [
        [
            40,
            30
        ],
        4
    ],
    [
        [
            45,
            40
        ],
        5
    ],
    [
        [
            -1,
            20
        ],
        null
    ],
    [
        [
            30,
            -1
        ],
        null
    ],
    [
        [
            61,
            20
        ],
        null
    ],
    [
        [
            30,
            41
        ],
        null
    ],
    [
        [
            30,
            20
        ],
        2
    ],
    [
        [
            29,
            19
        ],
        1
    ],
    [
        [
            39,
            20
        ],
        2
    ],
    [
        [
            39,
            30
        ],
        3
    ],
    [
        [
            44,
            40
        ],
        4
    ],
    [
        [
            60,
            40
        ],
        5
    ]
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
    const passed = expected === null ? threw : !threw && actual === expected;
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
