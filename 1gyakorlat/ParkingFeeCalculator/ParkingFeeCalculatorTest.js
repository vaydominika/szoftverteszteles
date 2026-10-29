const { runCases } = require('../../scripts/case-runner.js');

runCases(__filename, 'calculateParkingFee', [
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
]);
