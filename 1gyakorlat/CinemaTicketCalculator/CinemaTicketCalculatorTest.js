const { runCases } = require('../../scripts/case-runner.js');

runCases(__filename, 'calculateTicketPrice', [
    [[6, false, false], 2100],
    [[65, false, false], 1800],
    [[12, true, false], 2100],
    [[70, true, false], 1800],
    [[30, false, true], 3800],
    [[12, false, true], 2900],
    [[30, true, true], 3200],
    [[5, false, true], 800],
    [[-1, false, false], null],
    [[121, false, false], null],
    [[5, false, false], 0],
    [[17, false, false], 2100],
    [[18, false, false], 3000],
    [[30, true, false], 2400],
    [[120, false, false], 1800]
]);
