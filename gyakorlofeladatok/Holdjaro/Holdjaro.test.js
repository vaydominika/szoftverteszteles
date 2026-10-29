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

QUnit.test('R04: forward east', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'E'});
    assert.deepEqual(rover.execute('f'), {position: {x: 4, y: 4, direction: 'E'}, obstacle: null});
});

QUnit.test('R05: backward east', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'E'});
    assert.deepEqual(rover.execute('b'), {position: {x: 2, y: 4, direction: 'E'}, obstacle: null});
});

QUnit.test('R06: forward south', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'S'});
    assert.deepEqual(rover.execute('f'), {position: {x: 3, y: 5, direction: 'S'}, obstacle: null});
});

QUnit.test('R07: backward south', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'S'});
    assert.deepEqual(rover.execute('b'), {position: {x: 3, y: 3, direction: 'S'}, obstacle: null});
});

QUnit.test('R08: forward west', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'W'});
    assert.deepEqual(rover.execute('f'), {position: {x: 2, y: 4, direction: 'W'}, obstacle: null});
});

QUnit.test('R09: backward west', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'W'});
    assert.deepEqual(rover.execute('b'), {position: {x: 4, y: 4, direction: 'W'}, obstacle: null});
});

QUnit.test('R10: right turn across compass boundary', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'W'});
    assert.deepEqual(rover.execute('r'), {position: {x: 3, y: 4, direction: 'N'}, obstacle: null});
});

QUnit.test('R11: left turn across compass boundary', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'N'});
    assert.deepEqual(rover.execute('l'), {position: {x: 3, y: 4, direction: 'W'}, obstacle: null});
});

QUnit.test('R12: ordered command sequence', assert => {
    const rover = new RoverForTest({x: 3, y: 4, direction: 'N'});
    assert.deepEqual(rover.execute('ffrfflb'), {position: {x: 5, y: 3, direction: 'N'}, obstacle: null});
});

QUnit.test('R13: east longitude seam', assert => {
    const rover = new RoverForTest({x: 8, y: 4, direction: 'E'});
    assert.deepEqual(rover.execute('f'), {position: {x: 1, y: 4, direction: 'E'}, obstacle: null});
});

QUnit.test('R14: west longitude seam', assert => {
    const rover = new RoverForTest({x: 1, y: 4, direction: 'W'});
    assert.deepEqual(rover.execute('f'), {position: {x: 8, y: 4, direction: 'W'}, obstacle: null});
});

QUnit.test('R15: north pole crossing', assert => {
    const rover = new RoverForTest({x: 1, y: 1, direction: 'N'});
    assert.deepEqual(rover.execute('f'), {position: {x: 5, y: 1, direction: 'S'}, obstacle: null});
});

QUnit.test('R16: south pole crossing', assert => {
    const rover = new RoverForTest({x: 3, y: 8, direction: 'S'});
    assert.deepEqual(rover.execute('f'), {position: {x: 7, y: 8, direction: 'N'}, obstacle: null});
});

QUnit.test('R17: backward north pole crossing', assert => {
    const rover = new RoverForTest({x: 8, y: 1, direction: 'S'});
    assert.deepEqual(rover.execute('b'), {position: {x: 4, y: 1, direction: 'N'}, obstacle: null});
});
