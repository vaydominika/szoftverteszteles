const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const fixedShipping = require('./ShippingCost.js');

const root = path.resolve(__dirname, '../..');
const original = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, '1gyakorlat/eredeti/ShippingCost.js'), 'utf8'), original);
const javaCases = fs.readFileSync(path.join(root, '1gyakorlat/ShippingCostTest.java'), 'utf8');
const cases = [...javaCases.matchAll(/^\s*"([^"\n]+)"[,]?\r?$/gm)].map((match, index) => {
    const [order, weight, country, express, expected] = match[1].split(',').map(value => value.trim());
    return {
        id: `T${String(index + 1).padStart(2, '0')}`,
        input: [Number(order), Number(weight), country === "''" ? '' : country, express === 'true'],
        expected: expected === 'error' ? null : Number(expected)
    };
});

function invoke(calculate, input) {
    try { return {value: calculate(...input)}; }
    catch (error) { return {error: error.name}; }
}

function matches(expected, result) {
    return expected === null ? Boolean(result.error)
        : !result.error && Math.abs(expected - result.value) < 1e-7;
}

function display(result) {
    return result.error || String(result.value);
}

const lines = [
    '# Szállítási díj – közvetlen függvényhívások', '',
    'Az alábbi táblázat a meglévő Java-teszt 27 bemenetét és elvárt eredményét használja. Mindegyik bemenettel közvetlenül meghívjuk az eredeti JavaScript-függvényt és a javított JavaScript-megoldást.', '',
    'Újrafuttatás: `node gyakorlofeladatok/ShippingCost/ellenorzes.js`; a dokumentum frissítése: ugyanaz a parancs `--write` kapcsolóval.', '',
    '| ID | Bemenet: rendelés, kg, ország, expressz | Elvárt | Eredeti JS | Javított JS | Javítás eredménye |',
    '| --- | --- | --- | --- | --- | --- |'
];
let originalFailures = 0;
let fixedFailures = 0;
for (const test of cases) {
    const before = invoke(original.calculateShippingCost, test.input);
    const after = invoke(fixedShipping, test.input);
    if (!matches(test.expected, before)) originalFailures++;
    const passed = matches(test.expected, after);
    if (!passed) fixedFailures++;
    lines.push(`| ${test.id} | \`${JSON.stringify(test.input)}\` | ${test.expected === null ? 'hibajelzés' : test.expected} | ${display(before)} | ${display(after)} | ${passed ? 'megfelelt' : 'HIBÁS'} |`);
}
lines.push('', `Eredmény: ${cases.length} függvényhívás; az eredeti kódban ${originalFailures} eltérés, a javítottban ${fixedFailures} eltérés.`, '',
    '## Hibák és reprodukáló esetek', '',
    '| Hiba | Reprodukció | Ok |', '| --- | --- | --- |',
    '| H1: 5 kg rossz díjsávba kerül | T03 | A `weight > 5` kizárja az 5 kg-ot. |',
    '| H2: 20 kg rossz díjsávba kerül | T06 | A `weight < 20` kizárja a 20 kg-ot. |',
    '| H3: 20000 Ft-nál már ingyenes | T09 | A `>= 20000` helyett szigorúan `> 20000` szükséges. |',
    '| H4: expressz esetben 50 Ft a felár | T14, T15 | `+ 50` helyett `* 1.5` szükséges. |',
    '| H5: kis- és nagybetűérzékeny országkód | T16–T18 | Az összehasonlítás előtt normalizálni kell a kódot. |',
    '| H6: negatív rendelési érték elfogadása | T20 | Hiányzik a validáció. |',
    '| H7: negatív tömeg elfogadása | T21, T22 | A validáció az ingyenesség előtt is szükséges. |',
    '| H8: hibás országkód elfogadása | T25–T27 | Nincs kétbetűs formai ellenőrzés. |', '',
    'Az ingyenes belföldi szállítás expressz esetben is ingyenes (T11). A nulla tömeg elfogadott (T01), mert a specifikáció csak a negatív tömeget tiltja.', '',
    'Az országkód formai ellenőrzést kap (két ASCII betű, kis- és nagybetűtől függetlenül); a hívó érvényes ISO-országkódot ad át. Teljes ISO-országjegyzéket a feladat nem tartalmaz.', '',
    'A külön QUnit-tesztek S01–S13 azonosítóval szerepelnek; a nem véges értékeket és a nem szöveges országkódot is ellenőrzik.');

const report = lines.join('\n') + '\n';
if (process.argv.includes('--write')) fs.writeFileSync(path.join(__dirname, 'ellenorzes.md'), report, 'utf8');
else console.log(report);
process.exitCode = cases.length === 27 && fixedFailures === 0 ? 0 : 1;
