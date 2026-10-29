function calculateDiscountedPrice(orderValue, isVip) {
    if (!Number.isFinite(orderValue) || orderValue < 0) throw new RangeError('Invalid order value');
    let discount = orderValue >= 50000 ? 0.15 : orderValue >= 25000 ? 0.10 : orderValue >= 10000 ? 0.05 : 0;
    if (isVip) discount += 0.05;
    return orderValue * (1 - Math.min(discount, 0.20));
}
