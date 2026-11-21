import { describe, expect, it } from 'vitest';
import { nachKategorie } from '../data/rezepte/index.ts';
import { selectionsFor } from './rezept.ts';

/** Genug Auswahl für zwei Wochen ohne Wiederholung. */
describe('Rezeptbestand', () => {
	it('hat genug Rezepte je Mahlzeit', () => {
		expect(nachKategorie('abend').length).toBeGreaterThanOrEqual(28);
		expect(nachKategorie('mittag').length).toBeGreaterThanOrEqual(14);
		expect(nachKategorie('snack').length).toBeGreaterThanOrEqual(14);
		expect(nachKategorie('fruehstueck').length).toBeGreaterThanOrEqual(10);
	});

	it('kann jede Woche Fisch-, Geflügel- und Veggie-Tage füllen', () => {
		const abend = nachKategorie('abend');
		const kann = (art: 'fisch' | 'gefluegel' | 'veggie') =>
			abend.filter((r) => selectionsFor(r, art, false).length > 0).length;
		expect(kann('fisch')).toBeGreaterThanOrEqual(6);
		expect(kann('gefluegel')).toBeGreaterThanOrEqual(6);
		expect(kann('veggie')).toBe(abend.length);
	});

	it('hat fast nur Abend- und Mittagessen zum Mitnehmen', () => {
		for (const k of ['abend', 'mittag'] as const) {
			const alle = nachKategorie(k);
			const mit = alle.filter((r) => r.mitnehmen).length;
			expect(mit / alle.length).toBeGreaterThanOrEqual(0.8);
		}
	});
});
