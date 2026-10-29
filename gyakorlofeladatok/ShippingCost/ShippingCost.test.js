var shippingForTest = typeof require === 'function' ? require('./ShippingCost.js') : calculateShippingCost;
QUnit.module('Szállítási díj');

QUnit.test('S01: domestic light parcel', assert => {
    assert.strictEqual(shippingForTest(10000, 1, "HU", false), 1500);
});

QUnit.test('S02: five kilogram boundary', assert => {
    assert.strictEqual(shippingForTest(10000, 5, "HU", false), 2500);
});

QUnit.test('S03: parcel above twenty kilograms', assert => {
    assert.strictEqual(shippingForTest(10000, 20.01, "HU", false), 5000);
});

QUnit.test('S04: free domestic order', assert => {
    assert.strictEqual(shippingForTest(20001, 1, "HU", false), 0);
});

QUnit.test('S05: international multiplier', assert => {
    assert.strictEqual(shippingForTest(10000, 1, "DE", false), 3000);
});

QUnit.test('S06: express surcharge', assert => {
    assert.strictEqual(shippingForTest(10000, 1, "HU", true), 2250);
});

QUnit.test('S07: negative order rejection', assert => {
    assert.throws(() => shippingForTest(-1, 1, "HU", false), RangeError);
});

QUnit.test('S08: negative weight rejection', assert => {
    assert.throws(() => shippingForTest(10000, -1, "HU", false), RangeError);
});

QUnit.test('S09: case insensitive country', assert => {
    assert.strictEqual(shippingForTest(20001, 1, "hu", false), 0);
});

QUnit.test('S10: malformed country rejection', assert => {
    assert.throws(() => shippingForTest(10000, 1, "", false), RangeError);
});

QUnit.test('S11: nonfinite order rejection', assert => {
    assert.throws(() => shippingForTest(NaN, 1, "HU", false), RangeError);
});
