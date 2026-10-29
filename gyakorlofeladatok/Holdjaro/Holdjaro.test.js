var RoverForTest = typeof require === 'function' ? require('./Holdjaro.js') : Holdjaro;
QUnit.module('Holdjáró a gömb alakú bolygón');

QUnit.test('R01: configured starting position', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'E'});
    assert.deepEqual(rover.getPosition(), {x: 3, y: 4, direction: 'E'});
});
