import { describe, expect, it } from 'vitest';
import { DATEIEN, REZEPTE } from '../data/rezepte/index.ts';
import { NAEHRWERT_REGELN, NUSS, NUSS_OK, VERBOTEN, ZEIT } from '../data/rezepte/regeln.ts';
import { HERKUNFT, ZUTATEN } from '../data/zutaten/index.ts';
import type { Ingredient, Recipe } from '../data/types.ts';
import { computeRecipe, grams, isVegOption } from './rezept.ts';

const MODES = [
	{ veg: false, tm: false },
	{ veg: true, tm: false },
	{ veg: false, tm: true },
	{ veg: true, tm: true }
];

/** Alle Zutaten eines Rezepts, über alle Optionen. */
const allItems = (r: Recipe): Ingredient[] => [
	...r.zutaten,
	...r.slots.flatMap((s) => s.options.flatMap((o) => o.items))
];
const allTexts = (r: Recipe): string[] => [
	r.name,
	...[...r.schritte, ...(r.tmSchritte ?? [])].map((s) => s.text),
	...r.slots.flatMap((s) =>
		s.options.flatMap((o) => [
			o.label,
			...[...(o.steps ?? []), ...(o.tmSteps ?? [])].map((x) => x.text)
		])
	)
];

describe('Zutatenkatalog', () => {
	it('hat keine doppelten Namen', () => {
		const doppelt = Object.entries(HERKUNFT).filter(([, d]) => d.length > 1);
		expect(doppelt).toEqual([]);
	});
	it('hat plausible Nährwerte', () => {
		for (const [name, z] of Object.entries(ZUTATEN)) {
			const [kcal, p, f, kh, bst] = z.n;
			expect(kcal, name).toBeGreaterThanOrEqual(0);
			expect(kcal, name).toBeLessThanOrEqual(900);
			expect(p + f + kh + bst, name).toBeLessThanOrEqual(101);
			// Energie aus den Makros passt grob zu kcal (Ballaststoffe ca. 2 kcal/g)
			const calc = p * 4 + f * 9 + kh * 4 + bst * 2;
			if (kcal > 50) expect(Math.abs(calc - kcal) / kcal, name).toBeLessThan(0.3);
		}
	});
});

describe.each(REZEPTE.map((r) => [r.id, r] as const))('%s', (_id, r) => {
	it('Datei, ID und Kategorie passen', () => {
		const pfad = Object.entries(DATEIEN).find(([, x]) => x === r)![0];
		expect(pfad).toBe(`./${r.kategorie}/${r.id}.ts`);
		expect(REZEPTE.filter((x) => x.id === r.id)).toHaveLength(1);
	});

	it('hat alle Pflichtangaben', () => {
		expect(r.name.length).toBeGreaterThan(3);
		expect(r.beschreibung.length).toBeGreaterThan(20);
		expect(r.kind.length).toBeGreaterThan(20);
		expect(r.photoAlt.length).toBeGreaterThan(20);
		expect(r.tags.length).toBeGreaterThan(0);
		expect(r.portionen).toBeGreaterThan(0);
	});

	it('kennt alle Zutaten im Katalog, mit Gewicht für die Einheit', () => {
		for (const it of allItems(r)) {
			expect(ZUTATEN[it.name], `${it.name} fehlt im Zutatenkatalog`).toBeDefined();
			expect(grams(it), `${it.name}: kein Gewicht für ${it.unit}`).not.toBeNull();
			expect(it.amount, it.name).toBeGreaterThan(0);
		}
	});

	it('enthält nichts Verbotenes', () => {
		for (const t of [...allItems(r).map((i) => i.name + ' ' + (i.note ?? '')), ...allTexts(r)]) {
			for (const v of VERBOTEN) expect(v.muster.test(t), `${v.grund}: „${t}“`).toBe(false);
		}
		for (const it of allItems(r)) {
			if (NUSS.test(it.name)) expect(NUSS_OK.test(it.name), `ganze Nüsse: ${it.name}`).toBe(true);
		}
	});

	it('hat gültige Slots', () => {
		expect(Array.isArray(r.slots)).toBe(true);
		const ids = new Set<string>();
		for (const s of r.slots) {
			expect(ids.has(s.id), `Slot ${s.id} doppelt`).toBe(false);
			ids.add(s.id);
			const opts = new Set(s.options.map((o) => o.id));
			expect(opts.size, `Optionen in ${s.id} doppelt`).toBe(s.options.length);
			if (!s.multi) {
				expect(opts.has(s.default), `${s.id}: Standard ${s.default}`).toBe(true);
				if (s.vegDefault) {
					expect(opts.has(s.vegDefault)).toBe(true);
					expect(isVegOption(s.options.find((o) => o.id === s.vegDefault)!)).toBe(true);
				}
			} else for (const d of s.default) expect(opts.has(d), `${s.id}: ${d}`).toBe(true);
		}
	});

	it('hat eine Thermomix-Fassung oder sagt, warum nicht', () => {
		const tm = !!r.tmSchritte || r.slots.some((s) => s.options.some((o) => o.tmSteps));
		expect(tm || !!r.ohneTm).toBe(true);
	});

	it.each(MODES)('passt (vegetarisch $veg, Thermomix $tm)', (prefs) => {
		const res = computeRecipe(r, undefined, prefs);
		const zeit = ZEIT[r.kategorie];
		expect(res.minutes, 'Zubereitungszeit').toBeLessThanOrEqual(zeit.max);
		expect(res.unbekannt).toEqual([]);
		if (prefs.veg) expect(res.veg, 'vegetarisch').toBe(true);
		const regel = NAEHRWERT_REGELN[r.kategorie];
		const n = res.nutrition;
		expect(n.protein, 'Protein').toBeGreaterThanOrEqual(regel.proteinMin);
		expect(n.bst, 'Ballaststoffe').toBeGreaterThanOrEqual(regel.bstMin);
		expect(n.kh, 'Kohlenhydrate').toBeLessThanOrEqual(regel.khMax);
		expect(n.kcal, 'kcal').toBeGreaterThanOrEqual(regel.kcal[0]);
		expect(n.kcal, 'kcal').toBeLessThanOrEqual(regel.kcal[1]);
		for (const g of res.steps)
			for (const l of g.lines) expect(l, 'unaufgelöster Platzhalter').not.toMatch(/[{}]/);
	});
});
