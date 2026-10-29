# Szállítási díj – közvetlen függvényhívások

Az alábbi táblázat a meglévő Java-teszt 27 bemenetét és elvárt eredményét használja. Mindegyik bemenettel közvetlenül meghívjuk az eredeti JavaScript-függvényt és a javított JavaScript-megoldást.

Újrafuttatás: `node gyakorlofeladatok/ShippingCost/ellenorzes.js`; a dokumentum frissítése: ugyanaz a parancs `--write` kapcsolóval.

| ID | Bemenet: rendelés, kg, ország, expressz | Elvárt | Eredeti JS | Javított JS | Javítás eredménye |
| --- | --- | --- | --- | --- | --- |
| T01 | `[10000,0,"HU",false]` | 1500 | 1500 | 1500 | megfelelt |
| T02 | `[10000,4.99,"HU",false]` | 1500 | 1500 | 1500 | megfelelt |
| T03 | `[10000,5,"HU",false]` | 2500 | 5000 | 2500 | megfelelt |
| T04 | `[10000,5.01,"HU",false]` | 2500 | 2500 | 2500 | megfelelt |
| T05 | `[10000,19.99,"HU",false]` | 2500 | 2500 | 2500 | megfelelt |
| T06 | `[10000,20,"HU",false]` | 2500 | 5000 | 2500 | megfelelt |
| T07 | `[10000,20.01,"HU",false]` | 5000 | 5000 | 5000 | megfelelt |
| T08 | `[19999,1,"HU",false]` | 1500 | 1500 | 1500 | megfelelt |
| T09 | `[20000,1,"HU",false]` | 1500 | 0 | 1500 | megfelelt |
| T10 | `[20001,1,"HU",false]` | 0 | 0 | 0 | megfelelt |
| T11 | `[20001,1,"HU",true]` | 0 | 0 | 0 | megfelelt |
| T12 | `[10000,1,"DE",false]` | 3000 | 3000 | 3000 | megfelelt |
| T13 | `[20001,1,"DE",false]` | 3000 | 3000 | 3000 | megfelelt |
| T14 | `[10000,1,"HU",true]` | 2250 | 1550 | 2250 | megfelelt |
| T15 | `[10000,10,"DE",true]` | 7500 | 5050 | 7500 | megfelelt |
| T16 | `[10000,1,"hu",false]` | 1500 | 3000 | 1500 | megfelelt |
| T17 | `[20001,1,"hu",false]` | 0 | 3000 | 0 | megfelelt |
| T18 | `[10000,1,"Hu",false]` | 1500 | 3000 | 1500 | megfelelt |
| T19 | `[10000,1,"de",false]` | 3000 | 3000 | 3000 | megfelelt |
| T20 | `[-1,1,"HU",false]` | hibajelzés | 1500 | RangeError | megfelelt |
| T21 | `[10000,-1,"HU",false]` | hibajelzés | 1500 | RangeError | megfelelt |
| T22 | `[20001,-1,"HU",false]` | hibajelzés | 0 | RangeError | megfelelt |
| T23 | `[0,1,"HU",false]` | 1500 | 1500 | 1500 | megfelelt |
| T24 | `[10000,21,"DE",false]` | 10000 | 10000 | 10000 | megfelelt |
| T25 | `[10000,1,"",false]` | hibajelzés | 3000 | RangeError | megfelelt |
| T26 | `[10000,1,"HUN",false]` | hibajelzés | 3000 | RangeError | megfelelt |
| T27 | `[10000,1,"12",false]` | hibajelzés | 3000 | RangeError | megfelelt |

Eredmény: 27 függvényhívás; az eredeti kódban 14 eltérés, a javítottban 0 eltérés.

## Hibák és reprodukáló esetek

| Hiba | Reprodukció | Ok |
| --- | --- | --- |
| H1: 5 kg rossz díjsávba kerül | T03 | A `weight > 5` kizárja az 5 kg-ot. |
| H2: 20 kg rossz díjsávba kerül | T06 | A `weight < 20` kizárja a 20 kg-ot. |
| H3: 20000 Ft-nál már ingyenes | T09 | A `>= 20000` helyett szigorúan `> 20000` szükséges. |
| H4: expressz esetben 50 Ft a felár | T14, T15 | `+ 50` helyett `* 1.5` szükséges. |
| H5: kis- és nagybetűérzékeny országkód | T16–T18 | Az összehasonlítás előtt normalizálni kell a kódot. |
| H6: negatív rendelési érték elfogadása | T20 | Hiányzik a validáció. |
| H7: negatív tömeg elfogadása | T21, T22 | A validáció az ingyenesség előtt is szükséges. |
| H8: hibás országkód elfogadása | T25–T27 | Nincs kétbetűs formai ellenőrzés. |

Az ingyenes belföldi szállítás expressz esetben is ingyenes (T11). A nulla tömeg elfogadott (T01), mert a specifikáció csak a negatív tömeget tiltja.

Az országkód formai ellenőrzést kap (két ASCII betű, kis- és nagybetűtől függetlenül); a hívó érvényes ISO-országkódot ad át. Teljes ISO-országjegyzéket a feladat nem tartalmaz.

A külön QUnit-tesztek S01–S13 azonosítóval szerepelnek; a nem véges értékeket és a nem szöveges országkódot is ellenőrzik.
