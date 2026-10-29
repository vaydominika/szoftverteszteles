function calculateShippingCost(orderValue, weight, country, express) {

    if (country === 'HU' && orderValue > 20000) return 0;
    let fee = 1500;
    if (weight >= 5) fee = 2500;
    if (weight > 20) fee = 5000;
    return fee;
}
if (typeof module !== 'undefined') module.exports = calculateShippingCost;
