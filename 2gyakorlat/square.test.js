if (typeof require === "function") globalThis.square = require("./square.js");

QUnit.module("square függvény tesztelése");

QUnit.test("Pozitív szám négyzete", function (assert) {
    assert.strictEqual(square(5), 25);
});

QUnit.test("Negatív szám négyzete", function (assert) {
    assert.strictEqual(square(-4), 16);
});

QUnit.test("Nulla négyzete", function (assert) {
    assert.strictEqual(square(0), 0);
});
