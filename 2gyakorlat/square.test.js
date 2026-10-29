if (typeof require === "function") globalThis.square = require("./square.js");

QUnit.module("square fÃ¼ggvÃ©ny tesztelÃ©se");

QUnit.test("PozitÃ­v szÃ¡m nÃ©gyzete", function (assert) {
    assert.strictEqual(square(5), 25);
});

QUnit.test("NegatÃ­v szÃ¡m nÃ©gyzete", function (assert) {
    assert.strictEqual(square(-4), 16);
});

QUnit.test("Nulla nÃ©gyzete", function (assert) {
    assert.strictEqual(square(0), 0);
});
