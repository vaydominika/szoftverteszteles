if (typeof require === 'function') globalThis.convertToRoman = require('./RomanConverter.js');
QUnit.module('Római számok');
QUnit.test('Alapjelek, kivonásos és összetett alakok', assert => {
    const cases = [[1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV'], [5, 'V'], [7, 'VII'], [8, 'VIII'], [9, 'IX'], [10, 'X'],
        [40, 'XL'], [50, 'L'], [90, 'XC'], [100, 'C'], [400, 'CD'], [500, 'D'], [900, 'CM'], [1000, 'M'],
        [1066, 'MLXVI'], [1776, 'MDCCLXXVI'], [1918, 'MCMXVIII'], [1954, 'MCMLIV'], [1984, 'MCMLXXXIV'],
        [1999, 'MCMXCIX'], [2000, 'MM'], [2001, 'MMI'], [2004, 'MMIV'], [2023, 'MMXXIII'], [2024, 'MMXXIV'], [3999, 'MMMCMXCIX']];
    for (const [input, expected] of cases) assert.strictEqual(convertToRoman(input), expected, String(input));
});
QUnit.test('Üres, nulla és negatív érték', assert => {
    for (const input of [undefined, null, 0, -1, -5]) assert.strictEqual(convertToRoman(input), '');
});
QUnit.test('Nem ábrázolható bemenet', assert => {
    for (const input of [4000, 1.5, NaN, Infinity, -Infinity, '12']) assert.throws(() => convertToRoman(input), RangeError);
});
