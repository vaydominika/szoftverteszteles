# Tesztelési eredmények

Ellenőrzés: 2026. október 29.

| Tesztcsoport | Sikeres | Hibás | Kihagyott |
| --- | ---: | ---: | ---: |
| 1. gyakorlat – JavaScript-esetek | 85 | 0 | 0 |
| 2. gyakorlat – QUnit-tesztek | 8 | 0 | 0 |
| Gyakorlófeladatok – szállítási díj QUnit-tesztek | 13 | 0 | 0 |
| Gyakorlófeladatok – holdjáró QUnit-tesztek | 34 | 0 | 0 |
| 1gyakorlat – Java/Mockito-tesztek | 28 | 0 | 0 |
| 3gyakorlat – Java/Mockito-tesztek | 63 | 0 | 0 |
| 4gyakorlat – Java/Mockito-tesztek | 13 | 0 | 0 |

Futtatás a projekt gyökerében: `npm test`, majd `mvn test`.

A 17 RED/GREEN pár külön munkamappában is ellenőrizve lett. A RED lépésekben tényleges tesztállítások buktak, a GREEN lépésekben ugyanazok a tesztek sikeresek voltak. Fordítási vagy függőséghiba nem számít RED eredménynek.

| Feladat | RED commit | GREEN commit |
| --- | --- | --- |
| cover red cases for discountcalculator | `6471621` | `7de70be` |
| cover red cases for parkingfeecalculator | `60b9a43` | `2aada3a` |
| cover red cases for cinematicketcalculator | `6f34b4c` | `6ef9c6a` |
| cover red cases for examgradecalculator | `2535151` | `89b5ae9` |
| cover red cases for packageclassifier | `04fe684` | `15f0174` |
| cover shipping boundaries and invalid input | `60147e5` | `a16b5f4` |
| cover square with positive negative and zero inputs | `2d29094` | `90c3695` |
| cover fizzbuzz divisibility and digit combinations | `72e4c21` | `45bf9f6` |
| cover roman numeral symbols boundaries and invalid input | `a113140` | `2bacac1` |
| cover calculator operations fractions and powers | `77b2cc7` | `c47b116` |
| cover bank account transactions and rejected amounts | `6bb65f6` | `4547529` |
| cover table dimensions height seating and stability | `925c7f2` | `90b4bbc` |
| cover triangle construction types area and large sides | `52c1739` | `2c0b5dd` |
| cover user login counter logout and password changes | `f653e52` | `47cf15d` |
| cover deposit notifications with manual and injected mocks | `314b761` | `c1f8e50` |
| define expected exchange rate mock behavior | `9b48b81` | `74cc264` |
| cover user database delegation and failure handling | `be50f62` | `b21df8d` |

A közös első heti tesztfuttató refaktorálása (`73cacce`) után mind a 85 eset sikeres maradt.

A korábbi szándékosan hibás bemenetekhez tartozó első heti hibajegyzékek történeti hibakeresési eredmények; az aktuális javított kódok állapotát a fenti futtatás mutatja.

## Gyakorlófeladatok

Az új feladatlista alapján a JS/QUnit ShippingCost és a holdjáró megoldása került a `gyakorlofeladatok` mappába. A római szám konverter és a BankAccount már megvolt.
Minden új teszteset külön RED commitban, a megvalósítása a következő GREEN commitban szerepel: összesen 47 pár, 94 új commit. A [TDD-jegyzék](gyakorlofeladatok/TDD.md) a teszteseteket és commitokat is felsorolja.
Mind a 47 RED futtatásban az új teszteset bukott; mind a 47 GREEN futtatás sikeres. A végső közös `npm test` futtatás is sikeres.
A szállítási díj [közvetlen JS-ellenőrzése](gyakorlofeladatok/ShippingCost/ellenorzes.md) 27 bemenetet vizsgál: az eredeti kód 14 eltérését dokumentálja, a javított kódnál nincs eltérés.
A holdjáró 34 esete a kapott gömbábrát követi, beleértve a pólusokat és az ottani akadályokat; az akadályellenőrzés a célmező elfoglalása előtt történik.
