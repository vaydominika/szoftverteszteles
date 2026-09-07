const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the original exercise without modifying its implementation.
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "CinemaTicketCalculator.js"), "utf8"), context);
const calculate = context.calculateTicketPrice;

// A null expected value means invalid input must throw an error.
const cases = [
    [
        [
            6,
            false,
            false
        ],
        2100
    ],
    [
        [
            65,
            false,
            false
        ],
        1800
    ],
    [
        [
            12,
            true,
            false
        ],
        2100
    ],
    [
        [
            70,
            true,
            false
        ],
        1800
    ],
    [
        [
            30,
            false,
            true
        ],
        3800
    ],
    [
        [
            12,
            false,
            true
        ],
        2900
    ],
    [
        [
            30,
            true,
            true
        ],
        3200
    ],
    [
        [
            5,
            false,
            true
        ],
        800
    ],
    [
        [
            -1,
            false,
            false
        ],
        null
    ],
    [
        [
            121,
            false,
            false
        ],
        null
    ],
    [
        [
            5,
            false,
            false
        ],
        0
    ],
    [
        [
            17,
            false,
            false
        ],
        2100
    ],
    [
        [
            18,
            false,
            false
        ],
        3000
    ],
    [
        [
            30,
            true,
            false
        ],
        2400
    ],
    [
        [
            120,
            false,
            false
        ],
        1800
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
