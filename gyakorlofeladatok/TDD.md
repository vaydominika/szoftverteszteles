# Gyakorlófeladatok – TDD

13 szállításidíj- és 34 holdjáró-teszteset. Minden sor egy külön teszteset: előbb egy RED tesztcommit, utána egy GREEN megvalósítási commit.

Minden RED lépés tényleges tesztállításon bukott, és minden GREEN lépésben az adott feladat összes addigi tesztje sikeres volt. A dokumentáció a GREEN lépések része.

| Feladat | Teszt | RED | GREEN |
| --- | --- | --- | --- |
| ShippingCost | S01 | `01b9e39` | `a56f296` |
| ShippingCost | S02 | `127e8ad` | `3c2fb41` |
| ShippingCost | S03 | `a4c4195` | `9a8a2c7` |
| ShippingCost | S04 | `f968c01` | `24f9d2a` |
| ShippingCost | S05 | `4d40034` | `539c9c5` |
| ShippingCost | S06 | `19abbc3` | `12df3da` |
| ShippingCost | S07 | `326c89e` | `f2a0562` |
| ShippingCost | S08 | `6d03cc4` | `f9417cd` |
| ShippingCost | S09 | `d1a8510` | `af2f3ec` |
| ShippingCost | S10 | `c5f5c1a` | `f745427` |
| ShippingCost | S11 | `ae61525` | `ba8868a` |
| ShippingCost | S12 | `5729827` | `f319e76` |
| ShippingCost | S13 | `4497f1d` | `599767d` |
| Holdjaro | R01 | `30dfdd9` | `50399e9` |
| Holdjaro | R02 | `7d80da0` | `f56aa4a` |
| Holdjaro | R03 | `fc88e52` | `8125458` |
| Holdjaro | R04 | `d3fd98b` | `6a15b03` |
| Holdjaro | R05 | `55fcedf` | `684b69f` |
| Holdjaro | R06 | `9b56b18` | `b2b5eeb` |
| Holdjaro | R07 | `f8d40ff` | `f48f335` |
| Holdjaro | R08 | `950de3a` | `1e4c746` |
| Holdjaro | R09 | `e9318b1` | `7246d86` |
| Holdjaro | R10 | `4b342e5` | `92dafda` |
| Holdjaro | R11 | `63d46bd` | `3402126` |
| Holdjaro | R12 | `d779d4b` | `59ad0c3` |
| Holdjaro | R13 | `0e406a1` | `6704bfd` |
| Holdjaro | R14 | `75bed18` | `fc65fcb` |
| Holdjaro | R15 | `69530a1` | `9276e5c` |
| Holdjaro | R16 | `3606a80` | `b837963` |
| Holdjaro | R17 | `8032b23` | `1dd5fdc` |
| Holdjaro | R18 | `34cd348` | `3593777` |
| Holdjaro | R19 | `8e7cf77` | `b175e3b` |
| Holdjaro | R20 | `2832a5b` | `22dd4c6` |
| Holdjaro | R21 | `88141df` | `aac0a85` |
| Holdjaro | R22 | `4d11de5` | `eb27a73` |
| Holdjaro | R23 | `7e232d6` | `ff2af73` |
| Holdjaro | R24 | `f658f15` | `54de9b5` |
| Holdjaro | R25 | `fc06823` | `be3a0bf` |
| Holdjaro | R26 | `3d66dfc` | `d9f6e44` |
| Holdjaro | R27 | `a23e4f7` | `c3a5975` |
| Holdjaro | R28 | `6d0af9e` | `f056c98` |
| Holdjaro | R29 | `6ba87b9` | `a8d7377` |
| Holdjaro | R30 | `7d61c0e` | `23df092` |
| Holdjaro | R31 | `98cad31` | `5a90a68` |
| Holdjaro | R32 | `361dcef` | `e7a0439` |
| Holdjaro | R33 | `ce3ab20` | `52427c4` |
| Holdjaro | R34 | `515795c` | az ezt közvetlenül követő GREEN commit |

Futtatás: `npm run test:practice`. A teljes JavaScript-készlet: `npm test`.

A holdjáró R01–R34 tesztjei minden alapirány előre/hátra mozgását, a fordulást, a parancssorrendet, a széleket, a két pólust, a hátrameneti pólusátlépést, a megállást és jelentést, az akadályos póluslépés előtti állapot megőrzését, a méreteket és a bemeneti validációt is ellenőrzik.
