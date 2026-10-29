# Gyakorló feladatok

| Sorszám | Feladat | Állapot és helye |
| --- | --- | --- |
| 1. | Git-repozitórium és alapműveletek | A saját repó már létezik; [Git-útmutató](Git.md). |
| 2. | Szállítási díj JavaScript + QUnit | [Megoldás](ShippingCost/ShippingCost.js), [13 teszt](ShippingCost/ShippingCost.test.js), [27 közvetlen függvényhívás és hibajegyzék](ShippingCost/ellenorzes.md). |
| 3. | Arab–római konverter TDD | Már elkészült: [RomanConverter](../2gyakorlat/RomanConverter/RomanConverter.js) és [tesztek](../2gyakorlat/RomanConverter/RomanConverter.test.js). |
| 4. | BankAccount | Már elkészült: [osztály](../3gyakorlat/src/main/java/hu/example/BankAccount.java) és [tesztek](../3gyakorlat/src/test/java/hu/example/BankAccountTest.java). A felsorolt tíz esetet lefedik. |
| 5. | Gömb alakú bolygó holdjárója | [Megoldás](Holdjaro/Holdjaro.js), [34 teszt](Holdjaro/Holdjaro.test.js), [a kapott ábra és a koordinátaszabályok](Holdjaro/README.md). |

Futtatás: a repó gyökerében `npm ci`, majd `npm run test:practice`.
Böngészőben ugyanazok a QUnit-tesztek az `index.html` megnyitásával futnak.

Minden új teszteset külön RED és GREEN commitpárban szerepel, összesen 47 párban. A hibára futó teszteket és a sikeres megvalósításokat ténylegesen lefuttattuk; [commitjegyzék](TDD.md).
A dokumentáció az adott GREEN lépéshez tartozik. A már meglévő római szám konvertert és BankAccount osztályt a fenti hivatkozásokon használjuk tovább.
