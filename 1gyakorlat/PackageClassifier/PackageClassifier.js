function classifyPackage(weight, length, width, height) {
    if (![weight, length, width, height].every(value => Number.isFinite(value) && value > 0)) return 'INVALID';
    const largestSide = Math.max(length, width, height);
    if (weight <= 2 && largestSide <= 30) return 'SMALL';
    if (weight <= 10 && largestSide <= 60) return 'MEDIUM';
    if (weight <= 30 && largestSide <= 120) return 'LARGE';
    return 'OVERSIZE';
}
