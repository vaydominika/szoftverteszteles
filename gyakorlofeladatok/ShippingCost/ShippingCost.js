function calculateShippingCost(orderValue, weight, country, express) {

    let fee = 1500;
    if (weight >= 5) fee = 2500;
    return fee;
}
if (typeof module !== 'undefined') module.exports = calculateShippingCost;
