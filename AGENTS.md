# Projektutasítások

- Call the user "My Lady".
- A gyakorlatokat az `1gyakorlat`, `2gyakorlat`, `3gyakorlat`, `4gyakorlat` elnevezési mintát követve rendezd.
- Új vagy módosított működéshez először írj tesztet és ellenőrizd a tényleges teszthibát (RED); külön commitban valósítsd meg és futtasd sikerre (GREEN).
- Fordítási, hálózati vagy függőséghiba nem fogadható el RED bizonyítékként.
- Refaktorálásnál maradjanak sikeresek az érintett tesztek.
- Conventional Commits üzeneteket használj, a prefix után kisbetűs szöveggel.
- Külső referenciarepó, beágyazott Git-repó, letöltött futtatókörnyezet, node_modules és target ne kerüljön commitba.
- Ellenőrzés: `npm test` és `mvn test`; a Mockito-modul külön futtatása: `mvn -pl 4gyakorlat -am test`.
