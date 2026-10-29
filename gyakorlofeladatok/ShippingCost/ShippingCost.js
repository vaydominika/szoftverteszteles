function calculateShippingCost(orderValue, weight, country, express) {
    if (orderValue < 0) throw new RangeError('Invalid order value');
    if (weight < 0) throw new RangeError('Invalid weight');
    country = country.toUpperCase();
    if (country === 'HU' && orderValue > 20000) return 0;
    let fee = 1500;
    if (weight >= 5) fee = 2500;
    if (weight > 20) fee = 5000;
    if (country !== 'HU') fee *= 2;
    if (express) fee *= 1.5;
    return fee;
}
if (typeof module !== 'undefined') module.exports = calculateShippingCost;
