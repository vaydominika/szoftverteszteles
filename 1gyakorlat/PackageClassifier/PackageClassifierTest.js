const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the original exercise without modifying its implementation.
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "PackageClassifier.js"), "utf8"), context);
const calculate = context.classifyPackage;

// A null expected value means invalid input must throw an error.
const cases = [
    [
        [
            2,
            20,
            20,
            20
        ],
        "SMALL"
    ],
    [
        [
            1,
            30,
            20,
            20
        ],
        "SMALL"
    ],
    [
        [
            1,
            20,
            30,
            20
        ],
        "SMALL"
    ],
    [
        [
            1,
            20,
            20,
            30
        ],
        "SMALL"
    ],
    [
        [
            5,
            61,
            50,
            50
        ],
        "LARGE"
    ],
    [
        [
            5,
            50,
            61,
            50
        ],
        "LARGE"
    ],
    [
        [
            5,
            50,
            50,
            61
        ],
        "LARGE"
    ],
    [
        [
            5,
            121,
            50,
            50
        ],
        "OVERSIZE"
    ],
    [
        [
            0,
            20,
            20,
            20
        ],
        "INVALID"
    ],
    [
        [
            -1,
            20,
            20,
            20
        ],
        "INVALID"
    ],
    [
        [
            1,
            0,
            20,
            20
        ],
        "INVALID"
    ],
    [
        [
            1,
            -1,
            20,
            20
        ],
        "INVALID"
    ],
    [
        [
            1,
            20,
            0,
            20
        ],
        "INVALID"
    ],
    [
        [
            1,
            20,
            -1,
            20
        ],
        "INVALID"
    ],
    [
        [
            1,
            20,
            20,
            0
        ],
        "INVALID"
    ],
    [
        [
            1,
            20,
            20,
            -1
        ],
        "INVALID"
    ],
    [
        [
            1,
            20,
            20,
            20
        ],
        "SMALL"
    ],
    [
        [
            10,
            60,
            60,
            60
        ],
        "MEDIUM"
    ],
    [
        [
            30,
            120,
            120,
            120
        ],
        "LARGE"
    ],
    [
        [
            31,
            120,
            120,
            120
        ],
        "OVERSIZE"
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
