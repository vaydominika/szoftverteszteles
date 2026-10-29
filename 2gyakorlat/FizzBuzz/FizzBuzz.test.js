if (typeof require === 'function') globalThis.fizzBuzz = require('./FizzBuzz.js');
QUnit.module('FizzBuzz');
QUnit.test('Osztók, számjegyek és kombinációik', assert => {
    const cases = [[1, 1], [2, 2], [4, 4], [7, 7], [3, 'Fizz'], [6, 'Fizz'], [9, 'Fizz'],
        [13, 'Fizz'], [23, 'Fizz'], [31, 'Fizz'], [5, 'Buzz'], [10, 'Buzz'], [20, 'Buzz'], [52, 'Buzz'],
        [25, 'Buzz'], [15, 'FizzBuzz'], [30, 'FizzBuzz'], [35, 'FizzBuzz'], [51, 'FizzBuzz'], [53, 'FizzBuzz']];
    for (const [input, expected] of cases) assert.strictEqual(fizzBuzz(input), expected, String(input));
});
QUnit.test('Csak pozitív egész szám fogadható el', assert => {
    for (const value of [0, -1, 1.5, NaN, Infinity, '3', null, undefined]) {
        assert.throws(() => fizzBuzz(value), RangeError);
    }
});
