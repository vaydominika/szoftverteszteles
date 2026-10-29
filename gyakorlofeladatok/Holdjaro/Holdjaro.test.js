var RoverForTest = typeof require === 'function' ? require('./Holdjaro.js') : Holdjaro;
QUnit.module('Holdjáró a gömb alakú bolygón');

QUnit.test('R01: configured starting position', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'E'});
    assert.deepEqual(rover.getPosition(), {x: 3, y: 4, direction: 'E'});
});

QUnit.test('R02: forward north', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'N'});
    assert.deepEqual(rover.execute('f'), {position: {x: 3, y: 3, direction: 'N'}, obstacle: null});
});

QUnit.test('R03: backward north', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'N'});
    assert.deepEqual(rover.execute('b'), {position: {x: 3, y: 5, direction: 'N'}, obstacle: null});
});
