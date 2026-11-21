# Bildprompts für Bauchgefühl

Jedes Rezept kann ein Foto bekommen. Solange es keins gibt, zeigt die App einen gezeichneten Teller in den Farben der Zutaten.

Diese Datei wird erzeugt: `npm run prompts` (nach neuen oder geänderten Rezepten).

## So wird ein Bild eingebunden

1. Bild generieren (Prompts unten).
2. Als `src/lib/assets/photos/<id>.jpg` speichern (auch `.png` oder `.webp`). Die `<id>` steht bei jedem Prompt.
3. Committen und pushen. Beim Build entstehen automatisch AVIF/WebP in mehreren Größen.

**Format:** quadratisch, mindestens 1200 × 1200 px. Große PNGs vorher als JPEG speichern:

```sh
magick bild.png -strip -resize '1600x1600>' -sampling-factor 4:2:0 -interlace JPEG -quality 86 src/lib/assets/photos/<id>.jpg
```

## Damit alle Bilder zusammenpassen

- Alle Bilder in einer Sitzung erzeugen und nach dem ersten guten Bild sagen: „Gleicher Stil, gleicher Teller, gleicher Hintergrund, gleiches Licht.“
- Noch besser: das erste gute Bild als Stil-Referenz mitgeben (ChatGPT/Gemini: Bild anhängen; Midjourney: `--sref <Bild-URL>`).
- Das Gericht mittig mit Rand: Die Liste schneidet das Bild rund zu.
- Der Stil-Block ist Englisch, das Motiv steht auf Deutsch – beides verstehen die gängigen Bildmodelle.

**Midjourney:** an jeden Prompt `--ar 1:1 --style raw` anhängen.

## Der gemeinsame Stil-Block

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
```

## Abendessen

### Blech-Fajitas mit Hähnchen und Paprika

Datei: `src/lib/assets/photos/blech-fajitas.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Backblech mit gerösteten roten und gelben Paprikastreifen, roten Zwiebelspalten und gebräunten Hähnchenstreifen, daneben warme Vollkorn-Tortillas, Avocadowürfel, Limettenspalten und eine Schale Skyr.
```

### Bunte Hähnchen-Wraps mit Bohnen-Dip

Datei: `src/lib/assets/photos/haehnchen-wraps.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei schräg aufgeschnittene Vollkorn-Wraps mit Hähnchenstreifen, roten Paprikastreifen, geraspelten Karotten, Gurke und Salat, daneben eine Schale cremiger weißer Bohnen-Dip auf einem Holzbrett.
```

### Burrito-Bowl mit schwarzen Bohnen

Datei: `src/lib/assets/photos/burrito-bowl.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Bunte Burrito-Bowl mit Quinoa, schwarzen Bohnen, Mais, gebratener Paprika und Hähnchenwürfeln, dazu Avocadowürfel, Tomaten, ein Klecks weißer Limetten-Dip und eine Limettenspalte.
```

### Cremige Lachs-Spinat-Pasta

Datei: `src/lib/assets/photos/lachs-spinat-pasta.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Teller mit Vollkorn-Penne in cremiger heller Zitronen-Frischkäse-Sauce mit zarten Lachsstücken, Spinatblättern und grünen Erbsen, frisch geriebener Parmesan und Zitronenzesten obenauf.
```

### Erdnuss-Nudelpfanne mit Edamame

Datei: `src/lib/assets/photos/erdnuss-nudelpfanne.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Wok mit Vollkornnudeln in glänzender Erdnusssauce, bunten Paprika- und Karottenstreifen, hellgrünen Edamame und Hähnchenstreifen, bestreut mit Frühlingszwiebelringen.
```

### Gebratener Vollkornreis mit Ei und Erbsen

Datei: `src/lib/assets/photos/gebratener-reis.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Große Pfanne mit gebratenem Vollkornreis, Rührei-Stückchen, grünen Erbsen, Karottenwürfeln, roter Paprika und goldbraunen Tofuwürfeln, bestreut mit Frühlingszwiebelringen und Sesam.
```

### Gefüllte Paprika mit Bulgur und Feta

Datei: `src/lib/assets/photos/gefuellte-paprika.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Auflaufform mit gefüllten roten Paprikahälften, Bulgur-Linsen-Füllung mit Tomate, goldbraun überbackenem Feta und frischer Petersilie.
```

### Hähnchen-Gyros-Bowl mit Tzatziki

Datei: `src/lib/assets/photos/gyros-bowl.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Bowl mit Bulgur, knusprig gebratenen Gyros-Hähnchenstreifen, Gurken-, Tomaten- und Paprikawürfeln und einem großen Klecks Tzatziki mit Dill, daneben eine Zitronenspalte.
```

### Hähnchen-Hackbällchen in Tomatensauce

Datei: `src/lib/assets/photos/haehnchen-hackbaellchen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Teller mit Vollkornspaghetti und goldbraunen Hähnchen-Hackbällchen in leuchtend roter Tomatensauce, bestreut mit geriebenem Parmesan.
```

### Herzhafte Vollkorn-Pfannkuchen mit Spinat-Feta-Füllung

Datei: `src/lib/assets/photos/herzhafte-pfannkuchen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Aufgerollte, goldbraune Vollkorn-Pfannkuchen, schräg angeschnitten, mit sattgrüner Spinat-Feta-Füllung auf einem Teller.
```

### Kabeljau in Tomaten-Oliven-Sauce mit Bulgur

Datei: `src/lib/assets/photos/kabeljau-tomate.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Weiße Kabeljaustücke in einer tiefen Pfanne mit stückiger Tomaten-Paprika-Sauce und schwarzen Olivenringen, bestreut mit Petersilie, daneben eine Schale lockerer Bulgur.
```

### Kürbis-Linsen-Suppe mit Kokos

Datei: `src/lib/assets/photos/kuerbis-linsen-suppe.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Tiefer Teller mit leuchtend oranger Kürbis-Linsen-Suppe, weißem Skyr-Klecks und gerösteten Kürbiskernen, daneben Scheiben Vollkornbrot.
```

### Linsen-Bolognese mit Vollkornspaghetti

Datei: `src/lib/assets/photos/linsen-bolognese.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Teller mit Vollkornspaghetti und dicker, stückiger Linsen-Bolognese, frisch geriebener Parmesan obenauf, daneben eine Schale mit weiteren Parmesanspänen.
```

### Mediterrane Couscous-Pfanne mit Halloumi

Datei: `src/lib/assets/photos/halloumi-couscous.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Große Pfanne mit Vollkorn-Couscous, gebratener Zucchini, Paprika, Kichererbsen und Kirschtomaten, obenauf goldbraun gebratene Halloumischeiben und frische Petersilie, daneben eine Schale Minz-Joghurt.
```

### Mildes Bohnen-Chili mit Süßkartoffel

Datei: `src/lib/assets/photos/chili-sin-carne.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schale mit dampfendem Bohnen-Chili mit Süßkartoffelwürfeln und Paprika, darauf ein Klecks Skyr, Avocadowürfel und ein paar Chiliflocken.
```

### Mildes Fisch-Curry mit Spinat

Datei: `src/lib/assets/photos/fisch-curry.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Mildes gelbes Kokos-Curry mit zarten Seelachsstücken, Spinat und Brokkoli in einer Schale, daneben Vollkorn-Basmati, ein Klecks Skyr und Limettenspalten.
```

### Mildes Hähnchen-Kichererbsen-Curry mit Spinat

Datei: `src/lib/assets/photos/haehnchen-curry.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Tiefer Teller mit goldgelbem Hähnchen-Kichererbsen-Curry mit Spinat neben Vollkorn-Basmati, darauf ein Klecks Joghurt, daneben ein Holzlöffel.
```

### Minestrone mit weißen Bohnen

Datei: `src/lib/assets/photos/minestrone.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Dampfende Minestrone mit Karotten, Zucchini, weißen Bohnen und kleinen Vollkornnudeln in einem tiefen Teller, mit frisch geriebenem Parmesan bestreut.
```

### Ofen-Feta-Pasta mit Tomaten, Spinat und Bohnen

Datei: `src/lib/assets/photos/ofen-feta-pasta.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Auflaufform mit zerdrücktem, cremigem Feta, geplatzten Kirschtomaten, weißen Bohnen und frischem Babyspinat, untergemischt mit Vollkornnudeln.
```

### Ofengemüse mit Kichererbsen und Feta

Datei: `src/lib/assets/photos/ofengemuese-kichererbsen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Backblech mit geröstetem Paprika, Zucchini, Süßkartoffelwürfeln und Kichererbsen, darauf goldene Fetawürfel, daneben eine Schale Skyr-Dip.
```

### Ofenlachs mit Kartoffelspalten und Brokkoli

Datei: `src/lib/assets/photos/ofenlachs-kartoffeln.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Backblech mit goldbraunen Kartoffelspalten, gerösteten Brokkoliröschen, geplatzten Kirschtomaten und vier Lachsfilets, daneben eine Schale Kräuter-Skyr mit Dill und Schnittlauch.
```

### Rote-Linsen-Dal mit Spinat und Joghurt

Datei: `src/lib/assets/photos/rote-linsen-dal.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schale mit leuchtend orangem Rote-Linsen-Dal mit Spinat, einem Klecks weißem Joghurt und gerösteten Kürbiskernen, daneben Vollkorn-Basmati und eine Zitronenspalte.
```

### Schnelle Wrap-Pizza mit Gemüse

Datei: `src/lib/assets/photos/wrap-pizza.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Knusprige Vollkorn-Tortilla-Pizzen mit Tomatensauce, geschmolzenem Mozzarella, roten Paprikastreifen, Champignonscheiben und Spinat auf Backpapier, in Stücke geschnitten.
```

### Shakshuka mit Kichererbsen und Feta

Datei: `src/lib/assets/photos/shakshuka.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Pfanne mit dampfender Tomaten-Paprika-Sauce, Kichererbsen und acht fest gestockten Eiern, bestreut mit zerbröseltem Feta und Petersilie, daneben Scheiben Vollkornbrot.
```

### Spinat-Feta-Frittata mit Tomatensalat

Datei: `src/lib/assets/photos/spinat-feta-frittata.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Goldene Spinat-Feta-Frittata in einer Pfanne, ein Stück herausgeschnitten, daneben eine Schale Tomatensalat mit Schnittlauch und Scheiben Vollkornbrot auf einem Holzbrett.
```

### Teriyaki-Pfanne mit Brokkoli

Datei: `src/lib/assets/photos/teriyaki-pfanne.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Teriyaki-Pfanne mit glasierten Lachswürfeln und Brokkoli auf Vollkornreis, bestreut mit Sesam und Frühlingszwiebeln.
```

### Tomatensuppe mit Bohnen und Käse-Toast

Datei: `src/lib/assets/photos/tomatensuppe-toast.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schale mit cremiger, leuchtend roter Tomatensuppe, daneben goldbraun überbackene Vollkorn-Käsetoasts, in Streifen geschnitten.
```

### Zitronen-Seelachs mit Erbsen-Kartoffel-Stampf

Datei: `src/lib/assets/photos/seelachs-erbsenstampf.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Goldbraun gebratenes Seelachsfilet mit Zitronenbutter und gehackter Petersilie auf einem hellgrünen Erbsen-Kartoffel-Stampf, daneben eine Zitronenspalte.
```

## Mittagessen

### Asiatischer Edamame-Nudelsalat mit Erdnuss-Dressing

Datei: `src/lib/assets/photos/edamame-nudelsalat.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Meal-Prep-Box mit Vollkornspaghetti in hellbraunem Erdnuss-Dressing, grünen Edamame, Karottenraspeln, roten Paprikastreifen, Hähnchenstreifen und Sesam.
```

### Belugalinsen-Salat mit Ofengemüse

Datei: `src/lib/assets/photos/belugalinsen-salat.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schüssel mit glänzend schwarzen Belugalinsen, geröstetem Paprika, Zucchini und Karotte, darüber zerbröselter Feta und gehackte Petersilie.
```

### Gemüse-Eier-Muffins mit Vollkornbrot

Datei: `src/lib/assets/photos/gemuese-eiermuffins.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Goldgelbe Eier-Muffins mit sichtbaren Paprika- und Spinatstückchen auf einem Gitter, daneben Vollkornbrotscheiben und Gurkensticks.
```

### Griechischer Bohneneintopf mit Dill und Feta

Datei: `src/lib/assets/photos/griechischer-bohneneintopf.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Tiefer Teller mit weißen Bohnen in stückiger Tomatensauce, bestreut mit zerbröseltem Feta und frischem Dill, daneben eine Zitronenspalte.
```

### Hähnchen-Bulgur-Box mit Hummus

Datei: `src/lib/assets/photos/haehnchen-bulgur-box.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Meal-Prep-Box mit Bulgur, gebratenen Hähnchenstreifen, Paprika- und Gurkenwürfeln, einem Klecks Hummus und gehackter Petersilie.
```

### Hähnchen-Gemüse-Suppe mit Vollkornnudeln

Datei: `src/lib/assets/photos/haehnchen-nudelsuppe.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Weiße Suppenschale mit klarer Brühe, Hähnchenwürfeln, Karottenscheiben, Lauchringen, grünen Erbsen und kleinen Vollkornnudeln, bestreut mit Petersilie.
```

### Kichererbsen-Couscous-Salat im Glas

Datei: `src/lib/assets/photos/kichererbsen-couscous-salat.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Schraubgläser mit geschichtetem Salat aus Kichererbsen, Gurke, halbierten Kirschtomaten, Couscous mit Kräutern und weißen Fetawürfeln.
```

### Kräuterquark-Box mit Ei, Knäckebrot und Rohkost

Datei: `src/lib/assets/photos/quark-dip-box.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Bento-Box mit einem Schälchen grünem Kräuterquark, halbierten hartgekochten Eiern, Karotten-, Paprika- und Gurkensticks und Vollkorn-Knäckebrot.
```

### Lachs-Reis-Bowl mit Edamame und Sesam

Datei: `src/lib/assets/photos/lachs-reis-bowl.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Bowl mit Vollkornreis, gebratenen Lachswürfeln, grünen Edamame, Gurkenscheiben und geraspelter Karotte, bestreut mit Sesam und Frühlingszwiebelringen.
```

### Linsen-Kokos-Eintopf mit Spinat

Datei: `src/lib/assets/photos/linsen-kokos-eintopf.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schale mit orangefarbenem Linsen-Kokos-Eintopf, darin frischer Spinat, obenauf ein Klecks weißer Skyr, daneben ein Löffel und eine Meal-Prep-Box.
```

### Mexikanischer Bohnen-Reis-Topf

Datei: `src/lib/assets/photos/bohnen-reis-topf.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schale mit Vollkornreis, roten Kidneybohnen, gelbem Mais und Paprika in Tomatensauce, darauf geschmolzener Käse und ein Klecks weißer Skyr.
```

### Süßkartoffel-Kichererbsen-Box mit Joghurt-Tahin-Sauce

Datei: `src/lib/assets/photos/suesskartoffel-kichererbsen-box.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Meal-Prep-Box mit gerösteten Süßkartoffelwürfeln, knusprigen Kichererbsen und Brokkoli auf Babyspinat, daneben ein Glas cremige Joghurt-Tahin-Sauce.
```

### Vollkorn-Wrap mit Hummus und Gemüse

Datei: `src/lib/assets/photos/hummus-wrap.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei schräg halbierte Vollkorn-Wraps mit Hummus, Romanasalat, Paprikastreifen, geraspelter Karotte und gebratenen Hähnchenstreifen, daneben ein Schälchen Skyr-Minz-Sauce.
```

### Vollkornnudelsalat mit Erbsen und Joghurt-Dressing

Datei: `src/lib/assets/photos/nudelsalat-erbsen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Glasschüssel mit Vollkorn-Fusilli, grünen Erbsen, Gurken- und Paprikawürfeln, Eivierteln und cremigem Joghurt-Schnittlauch-Dressing.
```

## Snacks

### Apfelschnitze mit Erdnussmus

Datei: `src/lib/assets/photos/apfel-erdnussmus.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Rote Apfelschnitze fächerförmig auf einem kleinen Holzbrett, daneben ein Schälchen cremiges Erdnussmus mit Zimt bestäubt.
```

### Ei auf Knäckebrot mit Gurke

Datei: `src/lib/assets/photos/ei-knaecke.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Vollkorn-Knäckebrote mit Frischkäse, Gurkenscheiben und Eischeiben mit leuchtend gelbem, festem Eigelb, bestreut mit Schnittlauch.
```

### Gemüsesticks mit Hummus

Datei: `src/lib/assets/photos/gemuesesticks-hummus.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schälchen mit cremigem Hummus, beträufelt mit Olivenöl und bestäubt mit Kreuzkümmel, daneben Gurken- und rote Paprikasticks auf einem Holzbrett.
```

### Geröstete Kichererbsen

Datei: `src/lib/assets/photos/geroestete-kichererbsen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Knusprig geröstete, paprikarote Kichererbsen in einer kleinen Keramikschale, daneben ein Backblech mit Backpapier und ein paar verstreuten Kichererbsen.
```

### Hafer-Erdnuss-Bällchen mit Kakao

Datei: `src/lib/assets/photos/hafer-erdnuss-baellchen.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Drei in Kakao gewälzte Hafer-Erdnuss-Bällchen auf einem kleinen hellen Teller, daneben eine halbe Banane und ein Löffel Erdnussmus.
```

### Hummus-Toast mit Tomate und Feta

Datei: `src/lib/assets/photos/hummus-toast.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Knusprige Scheibe Vollkorntoast mit cremigem Hummus, roten Tomatenscheiben und zerbröseltem Feta, bestreut mit Oregano, auf einem kleinen Teller.
```

### Kakao-Quark mit Himbeeren

Datei: `src/lib/assets/photos/kakao-quark.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Glas mit cremigem dunkelbraunem Kakao-Quark, obenauf frische Himbeeren und ein paar Leinsamen, daneben ein langer Löffel.
```

### Käse-Gemüse-Box mit Knäckebrot

Datei: `src/lib/assets/photos/kaese-gemuese-box.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Bunte Snackbox mit Gouda-Würfeln, roten Paprikastreifen, Gurkensticks und zwei Vollkorn-Knäckebroten auf einem Holztisch.
```

### Knäckebrot mit Hüttenkäse und Avocado

Datei: `src/lib/assets/photos/knaecke-huettenkaese.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Vollkorn-Knäckebrote mit Hüttenkäse, Avocadoscheiben und leuchtenden Granatapfelkernen auf einem Holzbrett.
```

### Knäckebrot mit Tomate und Mozzarella

Datei: `src/lib/assets/photos/tomate-mozzarella-knaecke.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Vollkorn-Knäckebrote mit roten Tomaten- und weißen Mozzarellascheiben, frischen Basilikumblättern und glänzenden Tropfen Olivenöl.
```

### Mini-Bananen-Pancakes mit Quark

Datei: `src/lib/assets/photos/bananen-pancakes.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Vier goldbraune Mini-Pancakes aus Banane und Hafer auf einem kleinen Teller, mit einem Klecks Quark und einem Hauch Zimt.
```

### Skyr mit Beeren und Mandeln

Datei: `src/lib/assets/photos/skyr-beeren.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Weiße Schale mit cremigem Skyr, prallen frischen Heidelbeeren und einem Hauch gemahlener Mandeln und Zimt auf hellem Leinentuch.
```

### Tzatziki mit Pita-Ecken

Datei: `src/lib/assets/photos/tzatziki-pita.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Schälchen mit cremigem Tzatziki, beträufelt mit Olivenöl und bestreut mit Dill, daneben goldbraune Vollkorn-Pita-Ecken und Gurkensticks.
```

### Warme Edamame mit Sesam

Datei: `src/lib/assets/photos/edamame-sesam.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Dampfende hellgrüne Edamame-Bohnen in einer dunklen Keramikschale, glänzend vom Sesamöl und bestreut mit hellem Sesam und ein paar Chiliflocken.
```

## Frühstück

### Bircher-Müsli mit Apfel und Haselnüssen

Datei: `src/lib/assets/photos/bircher-muesli.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Schalen cremiges Bircher-Müsli mit frisch geraspeltem rotem Apfel, bestreut mit gemahlenen Haselnüssen und Zimt, daneben ein halber Apfel.
```

### Chia-Joghurt-Bowl mit Beeren und Kernen

Datei: `src/lib/assets/photos/chia-joghurt-bowl.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Gläser mit Schichten aus Chia-Joghurt und weißem Skyr, obenauf frische Himbeeren und grüne Kürbiskerne, auf einem hellen Tisch.
```

### Hüttenkäse-Bowl mit Obst und Mandeln

Datei: `src/lib/assets/photos/huettenkaese-bowl.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Schalen mit körnigem Hüttenkäse, darauf saftige Birnenwürfel, gemahlene Mandeln und Haferflocken, bestäubt mit Zimt, auf einem hellen Holztisch.
```

### Overnight Oats mit Skyr, Beeren und Leinsamen

Datei: `src/lib/assets/photos/overnight-oats.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Gläser Overnight Oats mit cremiger Skyr-Hafer-Schicht, obenauf frische Heidelbeeren und eine Prise Zimt, auf einem hellen Holztisch im Morgenlicht.
```

### Paprika-Omelett mit Käse und Vollkornbrot

Datei: `src/lib/assets/photos/omelett-paprika.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Goldgelbes, zusammengeklapptes Omelett mit roten Paprikawürfeln und geschmolzenem Käse in einer Pfanne, daneben zwei Scheiben Vollkornbrot auf einem Holzbrett.
```

### Rührei mit Spinat auf Vollkornbrot

Datei: `src/lib/assets/photos/ruehrei-spinat.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Goldgelbes Rührei mit sattgrünem Spinat auf zwei Scheiben kräftigem Vollkornbrot, daneben halbierte Kirschtomaten auf einem hellen Teller.
```

### Vollkorn-Quark-Pancakes mit Beerenkompott

Datei: `src/lib/assets/photos/quark-pancakes.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Stapel kleiner goldbrauner Quark-Pancakes auf einem Teller, übergossen mit dunklem warmem Beerenkompott, daneben ein Schälchen Kompott und ein Löffel.
```

### Vollkornbrot mit Avocado und hart gekochtem Ei

Datei: `src/lib/assets/photos/ei-avocado-brot.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Zwei Scheiben Vollkornbrot dick bestrichen mit grob zerdrückter Avocado, belegt mit Scheiben vom hart gekochten Ei mit festem gelbem Eigelb, daneben halbierte Kirschtomaten.
```

### Vollkornbrot mit Schnittlauch-Frischkäse, Gurke und Ei

Datei: `src/lib/assets/photos/frischkaese-brot.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Holzbrett mit Vollkornbrotscheiben, dick bestrichen mit Schnittlauch-Frischkäse, belegt mit dünnen Gurkenscheiben und Eischeiben mit festem Eigelb, bestreut mit frischen Schnittlauchröllchen.
```

### Warmes Quark-Porridge mit Zimt und Beeren

Datei: `src/lib/assets/photos/protein-porridge.jpg`

```
Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.
Motiv: Dampfende Schale cremiges Haferporridge mit leuchtend roten heißen Beeren und gemahlenen Mandeln, daneben eine Zimtstange auf einem Leinentuch.
```
