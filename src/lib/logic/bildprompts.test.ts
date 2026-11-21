// Erzeugt BILDPROMPTS.md aus den Rezepten: npm run prompts
import { writeFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { KATEGORIEN, nachKategorie } from '../data/rezepte/index.ts';

const STIL =
	'Realistic home-style food photograph, shot from 45 degrees above, soft natural window light from the left, ' +
	'warm earthy palette (terracotta, sage green, cream), food served on a handmade cream-colored stoneware plate ' +
	'or bowl with a speckled rim, on a light oak table with a crumpled cream linen napkin, a few fresh herbs as ' +
	'garnish, gentle shadows, shallow depth of field. Generous, appetizing family portion, not overly styled. ' +
	'Dish centered with a clear margin around it. No people, no hands, no text, no logos. Square 1:1.';

it.skipIf(!process.env.BILDPROMPTS)('BILDPROMPTS.md schreiben', () => {
	const teile: string[] = [
		'# Bildprompts für Bauchgefühl',
		'',
		'Jedes Rezept kann ein Foto bekommen. Solange es keins gibt, zeigt die App einen gezeichneten Teller in den Farben der Zutaten.',
		'',
		'Diese Datei wird erzeugt: `npm run prompts` (nach neuen oder geänderten Rezepten).',
		'',
		'## So wird ein Bild eingebunden',
		'',
		'1. Bild generieren (Prompts unten).',
		'2. Als `src/lib/assets/photos/<id>.jpg` speichern (auch `.png` oder `.webp`). Die `<id>` steht bei jedem Prompt.',
		'3. Committen und pushen. Beim Build entstehen automatisch AVIF/WebP in mehreren Größen.',
		'',
		'**Format:** quadratisch, mindestens 1200 × 1200 px. Große PNGs vorher als JPEG speichern:',
		'',
		'```sh',
		"magick bild.png -strip -resize '1600x1600>' -sampling-factor 4:2:0 -interlace JPEG -quality 86 src/lib/assets/photos/<id>.jpg",
		'```',
		'',
		'## Damit alle Bilder zusammenpassen',
		'',
		'- Alle Bilder in einer Sitzung erzeugen und nach dem ersten guten Bild sagen: „Gleicher Stil, gleicher Teller, gleicher Hintergrund, gleiches Licht.“',
		'- Noch besser: das erste gute Bild als Stil-Referenz mitgeben (ChatGPT/Gemini: Bild anhängen; Midjourney: `--sref <Bild-URL>`).',
		'- Das Gericht mittig mit Rand: Die Liste schneidet das Bild rund zu.',
		'- Der Stil-Block ist Englisch, das Motiv steht auf Deutsch – beides verstehen die gängigen Bildmodelle.',
		'',
		'**Midjourney:** an jeden Prompt `--ar 1:1 --style raw` anhängen.',
		'',
		'## Der gemeinsame Stil-Block',
		'',
		'```',
		STIL,
		'```',
		''
	];
	for (const k of KATEGORIEN) {
		teile.push(`## ${k.plural}`, '');
		for (const r of nachKategorie(k.id)) {
			teile.push(
				`### ${r.name}`,
				'',
				`Datei: \`src/lib/assets/photos/${r.id}.jpg\``,
				'',
				'```',
				`${STIL}\nMotiv: ${r.photoAlt}.`,
				'```',
				''
			);
		}
	}
	writeFileSync(new URL('../../../BILDPROMPTS.md', import.meta.url), teile.join('\n'));
	expect(teile.length).toBeGreaterThan(10);
});
