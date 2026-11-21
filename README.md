# Bauchgefühl – der Essensplaner für Schwangerschaft und Familie

Schnelle Familienrezepte, die in der Schwangerschaft sicher sind, den Blutzucker ruhig halten und
einem dreijährigen Kind schmecken. Mit 2-Wochen-Planer, Einkaufsliste und gemeinsamer Nutzung auf
mehreren Handys, ohne Login. Als PWA installierbar und offline nutzbar.

**Stack:** SvelteKit 3 + Svelte 5 (Runes) als statische App · PocketBase 0.40 (liefert die App aus
und speichert den Haushalt) · ein Container.

---

## Funktionen

**Rezepte**

- Feste Sammlung: 28 Abendessen, 14 Mittagessen, 14 Snacks und 10 Frühstücke. Dazu kommen eigene Rezepte.
- Abend- und Mittagessen dauern höchstens 30 Minuten, meist 20. Passive Ofenzeit zählt nicht mit und wird extra angezeigt.
- Gemischter Aufbau:
  - Bowls und Pfannen als **Baukasten**: Beilage, Eiweiß, Gemüse, Sauce und Toppings sind tauschbar.
  - Klassiker als feste Rezepte mit tauschbarer Eiweißquelle.
  - Zeit, Zutaten, Schritte und Nährwerte rechnen sich bei jedem Tausch neu.
- Schalter für **Vegetarisch** und **Thermomix**. Die Thermomix-Angaben gelten für TM5, TM6 und TM7.
- **Portionen** nach Erwachsenen und Kindern (ein Kleinkind zählt als halbe Portion). Fürs Mittag am nächsten Tag lässt sich eine einstellbare Zahl Portionen mitkochen.
- **Nährwerte pro Portion** werden aus einem Zutatenkatalog berechnet: kcal, Eiweiß, Kohlenhydrate (auch in BE), Ballaststoffe und Fett. Dazu kommen Kennzeichen für **Folat, Eisen, Jod, Calcium und Omega-3**.
- **Schwangerschaftsdiabetes-Modus**: änderbare Obergrenzen für Kohlenhydrate pro Mahlzeit. Jedes Rezept zeigt, ob es passt und wie viel Beilage die Schwangere nehmen kann; die Familie isst normal mit.
- Jedes Rezept hat Tipps:
  - für den Kinderteller,
  - zum Mitnehmen und Aufwärmen,
  - zum Vorkochen,
  - für einen noch ruhigeren Blutzucker.
- **Eigene Rezepte**:
  - Zutaten eintippen, eine pro Zeile („200 g Hähnchenbrust“). Die App erkennt sie und schätzt daraus die Nährwerte.
  - Ein Foto lässt sich hochladen.
- PDF und Drucken für Rezept, Plan und Einkaufsliste.

**Planer**

- Zwei Wochen ab Montag, mit Frühstück, zwei Snacks, Mittag und Abendessen. Jede Mahlzeit lässt sich abschalten.
- **Vorschlag auf Knopfdruck**:
  - Fisch-, Fleisch- und Veggie-Tage pro Woche sind einstellbar (Standard: 2 Fisch, 1 Fleisch, 4 Veggie).
  - Fleisch ist meist Geflügel, Rind höchstens einmal in zwei Wochen. Es gibt kein Schwein.
  - In den zwei Wochen wiederholt sich kein Gericht. Gleiche Fleisch- oder Fischtage liegen nicht direkt hintereinander.
- **Reste fürs Mittag**: Lässt sich ein Abendessen gut mitnehmen, wird die Mittagsportion mitgekocht und am nächsten Tag als Mittag eingetragen.
- Einzelne Mahlzeiten lassen sich tauschen, würfeln (die Art bleibt gleich, Fisch bleibt Fisch) oder leeren.
- **Wochenüberblick**:
  - Fisch, Fleisch und Veggie im Vergleich zum Ziel,
  - Tagesdurchschnitt an Energie, Eiweiß, Kohlenhydraten und Ballaststoffen,
  - Folat, Eisen, Jod, Calcium und Omega-3 im Verhältnis zum Bedarf in der Schwangerschaft.

**Einkauf**

- Die Liste wird aus dem Plan zusammengerechnet, für diese Woche, die nächste, beide oder ab heute.
- Sie ist nach Supermarkt-Abteilungen sortiert und zeigt bei jedem Posten, für welche Gerichte er ist.
- Stück und Dosen werden aufgerundet, Gewürze stehen ohne Mini-Mengen da.
- Abhaken gleicht sich live auf allen Handys ab. Eigene Posten lassen sich ergänzen, die Liste lässt sich als Text teilen.

**Gemeinsam planen ohne Login**

- Beim ersten Start legt jedes Gerät einen **Haushalt** auf dem Server an.
- Unter _Familie → Link teilen_ bekommt das zweite Handy den Link (`/beitreten#<schlüssel>`). Danach sehen alle denselben Plan, dieselbe Einkaufsliste und dieselben eigenen Rezepte, Änderungen kommen live an.
- Alles liegt zusätzlich auf dem Gerät. Ohne Netz funktioniert die App weiter, Änderungen werden später abgeglichen. Bei Konflikten gewinnt die jüngere Änderung.

**Wissen**: Die Regeln hinter den Rezepten (Lebensmittelsicherheit, Blutzucker, Nährstoffe, Kleinkind, Reste) mit Quellen.

---

## Die Regeln für Rezepte

Die Tests in `src/lib/logic/rezepte.spec.ts` prüfen **jedes** Rezept in allen vier Kombinationen von Vegetarisch und Thermomix. Die Regeln stehen in `src/lib/data/rezepte/regeln.ts`:

- **Zeit** ohne passive Ofenzeit, höchstens:
  - Abend- und Mittagessen: 30 Minuten
  - Frühstück: 20 Minuten
  - Snack: 15 Minuten
- **Blutzucker-Richtwerte** pro Erwachsenen-Portion. Beim Abendessen zum Beispiel mindestens 20 g Eiweiß und 7 g Ballaststoffe, höchstens 65 g Kohlenhydrate.
- **Verbotsliste**:
  - Schwein
  - Rohmilch- und Weichkäse
  - roher, geräucherter oder gebeizter Fisch
  - Thunfisch und Raubfische
  - Leber
  - Alkohol, Koffein, Süßholz
  - Sprossen
  - rohe Eier
  - zugesetzter Zucker
- **Nüsse** nur gemahlen oder als Mus, wegen der Verschluckungsgefahr für Kleinkinder.
- Jede Zutat muss im **Zutatenkatalog** stehen (`src/lib/data/zutaten/`). Dort stehen Nährwerte, Gewichte pro Einheit und die Supermarkt-Abteilung.
- Jedes Rezept braucht eine vegetarische Variante und einen Tipp fürs Kind. Außerdem hat es entweder eine Thermomix-Fassung oder eine Begründung, warum nicht.

### Ein Rezept hinzufügen

1. `src/lib/data/rezepte/<kategorie>/<id>.ts` anlegen. Am einfachsten ein ähnliches Rezept kopieren:
   - Baukasten: `abend/teriyaki-pfanne.ts`
   - Ofengericht: `abend/ofengemuese-kichererbsen.ts`
   - Snack: `snack/knaecke-huettenkaese.ts`
2. Fehlende Zutaten im Katalog ergänzen (`src/lib/data/zutaten/*.ts`, Nährwerte pro 100 g).
3. `npm test` laufen lassen. Die Übersicht mit Zeit und Nährwerten aller Rezepte erzeugt `UEBERSICHT=/pfad/datei.txt npx vitest --run uebersicht`.
4. `npm run prompts` aktualisiert die Bildprompts.

Das Datenmodell ist in `src/lib/data/types.ts` erklärt:

- **Schritte** haben eine Phase (start, vorbereiten, tm, ofen, pfanne, nebenbei, sauce, anrichten). Daraus ergeben sich Reihenfolge und Zeit.
- **Platzhalter** wie `{prot}` werden durch die gewählten Bausteine ersetzt.

### Fotos

Die Prompts für alle Rezepte stehen in [BILDPROMPTS.md](BILDPROMPTS.md). Ein Bild als `src/lib/assets/photos/<id>.jpg` ablegen, fertig. Ohne Foto zeigt die App einen gezeichneten Teller in den Farben der Zutaten.

---

## Entwickeln

```sh
npm install
npm run pb:get     # PocketBase-Binary nach ./pocketbase/ laden (einmalig)
npm run pb         # PocketBase auf http://127.0.0.1:8090 (Migrationen laufen automatisch)
npm run dev        # App auf http://localhost:5173 – /api wird an PocketBase weitergereicht
npm test           # Rezeptregeln, Planer, Einkaufsliste (Vitest)
npm run check      # Typprüfung
npm run build      # statische App nach build/
```

Ohne laufendes PocketBase funktioniert die App auch, dann nur auf dem Gerät („Nur auf diesem Gerät“).

### Aufbau

```
src/
  lib/
    data/
      rezepte/<kategorie>/*.ts   eine Datei pro Rezept
      rezepte/regeln.ts          Zeit, Nährwert-Richtwerte, Verbotsliste
      zutaten/*.ts               Zutatenkatalog (Nährwerte, Gewichte, Abteilung)
      types.ts                   Datenmodell mit Erklärungen
    logic/
      rezept.ts                  Rezept durchrechnen: Zeit, Schritte, Nährwerte, Diabetes-Anteil
      plan.ts                    2-Wochen-Vorschlag, Reste fürs Mittag, Würfeln
      einkauf.ts                 Einkaufsliste
      eigene.ts                  eigene Rezepte, Zutaten-Erkennung
      statistik.ts               Wochenüberblick
    store.svelte.ts              Daten auf dem Gerät + Abgleich mit PocketBase
    pdf.ts, documents.ts         PDF-Export (jsPDF, wird erst beim Klick geladen)
  routes/                        /, /rezepte, /rezepte/[id], /eigene/[id], /einkauf,
                                 /einstellungen, /wissen, /beitreten
  service-worker/                Offline-Cache
pocketbase/pb_migrations/        Datenmodell und Zugriffsregeln
```

---

## Deployment (Forgejo + Coolify)

Wie die anderen Projekte:

1. GitHub gibt jeden Push auf `main` an das gleichnamige Repo auf `git.fux.earth` weiter (`.github/workflows/forgejo-weiterleitung.yml`).
2. Der Forgejo-Runner baut dort das Image und legt es in die Registry (`.forgejo/workflows/deploy.yml`, in jedem Projekt gleich).
3. Danach stößt er Coolify an.

**Einmalig einrichten:**

1. **GitHub**: Im Repo unter _Settings → Secrets and variables → Actions_ das Secret `FORGEJO_TOKEN` anlegen (Forgejo-Token mit _repository: Lesen und Schreiben_).
2. **Forgejo**: Das Repo `jb/bauchgefuehl` anlegen, falls es beim ersten Push nicht von selbst entsteht. Die Secrets `REGISTRY_TOKEN` und `COOLIFY_TOKEN` liegen schon in den Benutzer-Einstellungen. Nach dem Anlegen der Coolify-Ressource deren UUID als Repo-Variable `COOLIFY_UUID` eintragen (_Einstellungen → Actions → Variablen_). Alternativ in Coolify den Tag `bauchgefuehl` setzen.
3. **Coolify**: _New Resource_ → Build Pack **Docker Compose**, Docker Compose Location `/docker-compose.coolify.yml`. Beim Service `bauchgefuehl` die Domain mit Port **8090** eintragen, z. B. `https://essen.example.de:8090`. Deployen.
4. **Admin-Zugang** für PocketBase anlegen: den Installations-Link aus dem Container-Log öffnen, oder im Coolify-Terminal:
   ```bash
   /pb/pocketbase superuser upsert ADMIN-MAIL PASSWORT --dir /pb/pb_data
   ```
   Unter `/_/` erreichst du dann die PocketBase-Admin-Oberfläche.

Die Daten liegen im Volume `bauchgefuehl_daten` (im Container `/pb/pb_data`). Backups gehen unter _Settings → Backups_ in PocketBase.

Lokal testen: `cp docker-compose.override.example.yml docker-compose.override.yml && docker compose up --build`, dann http://localhost:8090.

### Sicherheit

- **Ohne Login heißt: Der Link ist der Schlüssel.**
  - Der Haushalt-Schlüssel hat 32 zufällige Zeichen (etwa 165 Bit). Erraten ist aussichtslos.
  - Wer den Link hat, kann Plan, Einkaufsliste und eigene Rezepte lesen und ändern. Darum den Link nur an Menschen geben, denen ihr vertraut.
  - Der Schlüssel steht im `#`-Teil der Adresse, landet also nicht in Server-Logs. Die App schickt ihn im Header `X-Haushalt` mit.
  - Ohne passenden Schlüssel liefert die API nichts, auch keine Liste der Haushalte. Live-Updates prüfen denselben Schlüssel.
- **Bremse gegen Missbrauch**: Die PocketBase-Rate-Limits schaltet eine Migration ein, zum Beispiel höchstens 10 neue Haushalte pro Stunde und Adresse. Anpassen lässt sich das unter _Settings → Rate limits_.
- **Echte Besucher-Adresse**: PocketBase nimmt den letzten Eintrag aus `X-Forwarded-For`. Voraussetzung: PocketBase ist nur über den Coolify-Proxy erreichbar. In der Compose-Datei steht deshalb `expose`, keine `ports`.
- Fotos eigener Rezepte sind über ihre (zufällige) Datei-Adresse abrufbar, wie bei PocketBase üblich.

---

## Hinweis

Bauchgefühl ersetzt keine ärztliche Beratung oder Ernährungsberatung. Die Nährwerte sind Schätzungen aus einer Nährwerttabelle. Grenzwerte bei Schwangerschaftsdiabetes bitte mit der Diabetesberatung abstimmen.
