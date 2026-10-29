var shippingForTest = typeof require === 'function' ? require('./ShippingCost.js') : calculateShippingCost;
QUnit.module('Szállítási díj');

QUnit.test('S01: domestic light parcel', assert => {
    assert.strictEqual(shippingForTest(10000, 1, "HU", false), 1500);
});

QUnit.test('S02: five kilogram boundary', assert => {
    assert.strictEqual(shippingForTest(10000, 5, "HU", false), 2500);
});
