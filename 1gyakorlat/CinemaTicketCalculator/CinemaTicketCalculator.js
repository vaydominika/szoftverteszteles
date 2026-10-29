function calculateTicketPrice(age, isStudent, is3D) {
    if (!Number.isFinite(age) || age < 0 || age > 120) throw new RangeError('Invalid age');
    const ageDiscount = age < 6 ? 1 : age < 18 ? 0.3 : age >= 65 ? 0.4 : 0;
    const discount = Math.max(ageDiscount, isStudent ? 0.2 : 0);
    return 3000 * (1 - discount) + (is3D ? 800 : 0);
}
