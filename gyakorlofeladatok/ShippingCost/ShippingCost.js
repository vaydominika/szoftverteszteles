function calculateShippingCost(orderValue, weight, country, express) {
    if (orderValue < 0) throw new RangeError('Invalid order value');
    if (weight < 0) throw new RangeError('Invalid weight');
    if (!Number.isFinite(orderValue)) throw new RangeError('Invalid order value');
    if (!Number.isFinite(weight)) throw new RangeError('Invalid weight');
    if (typeof country !== 'string') throw new RangeError('Invalid country code');
    country = country.toUpperCase();
    if (!/^[A-Z]{2}$/.test(country)) throw new RangeError('Invalid country code');
    if (country === 'HU' && orderValue > 20000) return 0;
    let fee = 1500;
    if (weight >= 5) fee = 2500;
    if (weight > 20) fee = 5000;
    if (country !== 'HU') fee *= 2;
    if (express) fee *= 1.5;
    return fee;
}
if (typeof module !== 'undefined') module.exports = calculateShippingCost;
