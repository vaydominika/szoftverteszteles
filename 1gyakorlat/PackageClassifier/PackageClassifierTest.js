const { runCases } = require('../../scripts/case-runner.js');

runCases(__filename, 'classifyPackage', [
    [[2, 20, 20, 20], "SMALL"],
    [[1, 30, 20, 20], "SMALL"],
    [[1, 20, 30, 20], "SMALL"],
    [[1, 20, 20, 30], "SMALL"],
    [[5, 61, 50, 50], "LARGE"],
    [[5, 50, 61, 50], "LARGE"],
    [[5, 50, 50, 61], "LARGE"],
    [[5, 121, 50, 50], "OVERSIZE"],
    [[0, 20, 20, 20], "INVALID"],
    [[-1, 20, 20, 20], "INVALID"],
    [[1, 0, 20, 20], "INVALID"],
    [[1, -1, 20, 20], "INVALID"],
    [[1, 20, 0, 20], "INVALID"],
    [[1, 20, -1, 20], "INVALID"],
    [[1, 20, 20, 0], "INVALID"],
    [[1, 20, 20, -1], "INVALID"],
    [[1, 20, 20, 20], "SMALL"],
    [[10, 60, 60, 60], "MEDIUM"],
    [[30, 120, 120, 120], "LARGE"],
    [[31, 120, 120, 120], "OVERSIZE"]
]);
