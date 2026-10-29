function convertToRoman(n) {
    if (n == null || (Number.isInteger(n) && n <= 0)) return '';
    if (!Number.isInteger(n) || n > 3999) throw new RangeError('Integer from 1 to 3999 required');
    const symbols = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
        [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let result = '';
    for (const [value, symbol] of symbols) {
        while (n >= value) { result += symbol; n -= value; }
    }
    return result;
}
if (typeof module !== 'undefined') module.exports = convertToRoman;
