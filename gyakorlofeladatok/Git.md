# Git-gyakorlat

A saját GitHub-repozitórium: https://github.com/vaydominika/szoftverteszteles
A feladatok a `codex/tdd-exercises` helyi ágon készülnek. A GitHub `master` ágára a korábban beállított háromlépcsős feltöltés juttatja el őket.

Az alapműveletek menete egy saját projektben:

```sh
git init
git status
git diff
git add megoldas.js megoldas.test.js
git diff --cached
git commit -m "test: cover the next required behavior"
git log --oneline
git pull --ff-only origin master
git push origin sajat-ag
```

Az `init` új projekt létrehozására való. A `status`, `diff`, `add`, `commit` és `log` a tényleges munkafolyamat részei.
A `pull --ff-only` kizárólag közös történetű, távoli ágat követő ágon használandó; az átírt helyi TDD-ágba az eredeti mastert nem kell behúzni.
A push elküldi a helyi commitokat; a feladatokon minden teszt először RED commitban, a működés külön GREEN commitban jelenik meg.

A megosztás ellenőrzése: nyisd meg a fenti GitHub-linket kijelentkezett böngészőben. Privát repónál a meghívott felhasználó hozzáférését kell ellenőrizni.
A távoli ág pontos állapota: `git ls-remote origin refs/heads/master`.
Az első, 13 commitból álló csomag feltöltése már ellenőrizve; a további feladatok az időzített következő csomagokban jelennek meg.
