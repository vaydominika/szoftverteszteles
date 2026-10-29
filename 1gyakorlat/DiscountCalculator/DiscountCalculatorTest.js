const { runCases } = require('../../scripts/case-runner.js');

runCases(__filename, 'calculateDiscountedPrice', [
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
]);
