function fizzBuzz(n) {
    if (!Number.isSafeInteger(n) || n <= 0) throw new RangeError('Positive integer required');
    const digits = String(n);
    const fizz = n % 3 === 0 || digits.includes('3');
    const buzz = n % 5 === 0 || digits.includes('5');
    return (fizz ? 'Fizz' : '') + (buzz ? 'Buzz' : '') || n;
}
if (typeof module !== 'undefined') module.exports = fizzBuzz;
