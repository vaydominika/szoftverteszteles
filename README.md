# Szoftvertesztelés

## Gyakorlatok

| Mappa | Feladatok |
| --- | --- |
| `1gyakorlat` | ShippingCost, DiscountCalculator, ParkingFeeCalculator, CinemaTicketCalculator, ExamGradeCalculator, PackageClassifier; specifikációk, tesztek és eredeti hibajegyzékek |
| `2gyakorlat` | QUnit: square, FizzBuzz, RomanConverter |
| `3gyakorlat` | JUnit: Calculator (hatványozással és törtosztással), BankAccount, Table, Triangle, User; életciklus- és paraméterezési példák |
| `4gyakorlat` | Mockito: BankService, NotificationService, ExchangeRateService, User és UserDatabase; kézi mock, `@Mock`, `@InjectMocks`, stubbing és hívásellenőrzés |
| `gyakorlofeladatok` | A külön feladatlista áttekintése; JS/QUnit szállítási díj és gömb alakú bolygón mozgó holdjáró; [részletek](gyakorlofeladatok/README.md) |

A Java-osztályok csomagja a meglévő `hu.example` nevet követi; a Mockito-példák `hu.example.mocking` alatt találhatók.
A 4. gyakorlat a 3. gyakorlat BankAccount osztályát használja.

## Futtatás

Előfeltételek: Node.js 18+, JDK 21 és Maven 3.9+ (`JAVA_HOME` beállítva).
A projekt gyökerében:

```sh
npm ci
npm test
mvn test
```

Az `npm test` az első gyakorlat 85 JavaScript-esetét, a második gyakorlat 8 QUnit-tesztjét, valamint a gyakorlófeladatok 47 QUnit-tesztjét futtatja (13 szállítási díj és 34 holdjáró).
A Maven a Java- és Mockito-modulokat együtt teszteli, a ShippingCost feladattal együtt.
Az első `npm ci` és Maven-futtatás internetkapcsolatot igényel.

Külön futtatás:

```sh
npm run test:first
npm run test:qunit
npm run test:practice
mvn -pl 1gyakorlat test
mvn -pl 3gyakorlat test
mvn -pl 4gyakorlat -am test
```

QUnit böngészőben: `npm ci` után nyisd meg a `2gyakorlat/index.html` fájlt.
A böngésző ugyanazokat a helyi QUnit-fájlokat és teszteket használja, mint a parancssori futtatás.
Egy első heti teszt JSON-eredménye például: `node 1gyakorlat/DiscountCalculator/DiscountCalculatorTest.js --json`.
A gyakorlófeladatok böngészős tesztlapja: `gyakorlofeladatok/index.html`.
A szállítási díj eredeti és javított JavaScript-kódjának 27 közvetlen összehasonlító hívása: `node gyakorlofeladatok/ShippingCost/ellenorzes.js`.

## Szabályok és döntések

- **FizzBuzz:** a 3-mal való oszthatóság VAGY a 3-as számjegy Fizz; az 5-tel való oszthatóság VAGY az 5-ös számjegy Buzz. A két feltétel együtt FizzBuzz, így 51 és 53 is FizzBuzz. Csak pozitív, biztonságos egész szám fogadható el.
- **Római számok:** 1–3999 között a szokásos kivonásos jelölés; hiányzó, nulla és negatív egész bemenetnél üres szöveg; tört, nem véges, szöveges és 3999 feletti bemenetnél RangeError.
- **Table:** a férőhely oldalanként számolt egész ülőhelyek összege, 60 cm/fő: `2 * (width / 60 + length / 60)` egész osztással. A sarkoknál maradó helyeket nem vonjuk össze. A magasság 0–200 cm, a méretek és a lábszám pozitívak.
- **Triangle:** az egyenlő oldalú háromszög egyenlő szárú is; a 10,8,8 oldalak egyenlő szárúak. A kerület és a négyzetek számítása long típust használ az int túlcsordulás elkerülésére.
- **User:** minden login hívás növeli a számlálót, a logout nem csökkenti. Jelszóváltáshoz tényleges bejelentkezés és nem üres jelszó szükséges; a 3. gyakorlat kétparaméteres metódusa az engedélyező jelzőt is ellenőrzi. A korábbi helykitöltő jelszóváltás helyett kész működés szerepel.
- **Mockito User:** az adatbázis írását sikeres visszatérés után követi a helyi jelszó módosítása; hiba esetén a régi jelszó marad meg. A UserDatabase interfész, így a feladat nem igényel valódi adatbázist.
- **BankService:** a sikeres befizetés után küld értesítést; hibás összegnél nem küld. Ha az értesítés hibát dob, a befizetés már megtörtént.
- **ShippingCost:** a korábbi JavaScript-tartalmú `.java` helyett valódi Java-osztály és arra hivatkozó JUnit-teszt szerepel. A kétbetűs országkód formai ellenőrzést kap; nem tartalmaz teljes ISO-országlistát.

Az első gyakorlat szándékosan hibás kódjai az `1gyakorlat/eredeti` mappában maradtak meg.
A `*Test.txt` és `1feladathibak.txt` dokumentumok az eredeti hibás kódok hibakeresési eredményei; a javított kódok aktuális eredményét a tesztfuttatás mutatja.

## TDD

A viselkedésváltozások külön RED teszt- és GREEN megvalósítási commitban szerepelnek.
A RED lépés a specifikációt sértő viselkedés miatt bukik, a GREEN lépés ugyanazokkal a tesztekkel sikeres.
A közös tesztfuttató kiemelése külön refaktorálás, a működő tesztek megőrzésével.
Új feladatnál előbb készüljön el és fusson hibára a teszt, utána a minimális megvalósítás; a refaktorálást újabb sikeres futtatás kövesse.
A gyakorlófeladatok mind a 47 új tesztesete saját RED és GREEN commitpárt kapott; a [TDD-jegyzék](gyakorlofeladatok/TDD.md) felsorolja őket.
