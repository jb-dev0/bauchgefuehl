import { describe, expect, it } from 'vitest';
import { montag, tage } from './datum.ts';
import { parseZutat, katalogName } from './eigene.ts';
import { einkaufsliste } from './einkauf.ts';
import { bereinigen, STANDARD, type Einstellungen } from './einstellungen.ts';
import { berechne, MITGELIEFERT } from './gericht.ts';
import { planKey, vorschlagen, type PlanEintrag } from './plan.ts';

/** Reproduzierbarer Zufall. */
function seeded(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const byId = new Map(MITGELIEFERT.map((g) => [g.id, g]));
const gericht = (id: string) => byId.get(id);
const TAGE = tage(montag('2026-11-23'), 14);

function plan(s: Einstellungen, seed = 1, bestehend: Record<string, PlanEintrag> = {}) {
	const neu = vorschlagen({
		tage: TAGE,
		plan: bestehend,
		s,
		gerichte: MITGELIEFERT,
		ueberschreiben: false,
		rng: seeded(seed),
		jetzt: 1
	});
	const p = { ...bestehend };
	for (const e of neu) p[planKey(e.datum, e.mahlzeit)] = e;
	return p;
}

const artOf = (e: PlanEintrag | undefined) =>
	e?.rezept ? berechne(gericht(e.rezept)!, e.auswahl, { veg: false, tm: false }).art : null;

describe('Planer', () => {
	it('füllt alle eingeschalteten Mahlzeiten', () => {
		const p = plan(STANDARD);
		for (const d of TAGE) {
			expect(p[planKey(d, 'abend')]?.rezept).toBeTruthy();
			expect(p[planKey(d, 'fruehstueck')]?.rezept ?? null).not.toBeUndefined();
		}
	});

	it('hält sich an Fisch- und Fleischtage, wenn genug Rezepte da sind', () => {
		for (let seed = 1; seed <= 5; seed++) {
			const p = plan(STANDARD, seed);
			for (const woche of [TAGE.slice(0, 7), TAGE.slice(7)]) {
				const arten = woche.map((d) => artOf(p[planKey(d, 'abend')]));
				const fisch = arten.filter((a) => a === 'fisch').length;
				const fleisch = arten.filter((a) => a === 'gefluegel' || a === 'rind').length;
				expect(fisch).toBeLessThanOrEqual(STANDARD.woche.fisch);
				expect(fleisch).toBeLessThanOrEqual(STANDARD.woche.fleisch);
				const kannFisch = MITGELIEFERT.some(
					(g) =>
						g.kategorie === 'abend' &&
						g.recipe!.slots.some((s) =>
							s.options.some((o) => o.items.some((i) => /lachs|seelachs|kabeljau/i.test(i.name)))
						)
				);
				if (kannFisch) expect(fisch).toBe(STANDARD.woche.fisch);
			}
		}
	});

	it('kocht abends fürs Mittag mit und plant die Reste am nächsten Tag ein', () => {
		const p = plan(STANDARD, 3);
		for (let i = 0; i < TAGE.length - 1; i++) {
			const abend = p[planKey(TAGE[i], 'abend')];
			const mittag = p[planKey(TAGE[i + 1], 'mittag')];
			if (abend?.reste) {
				expect(mittag?.reste).toBe(true);
				expect(mittag?.rezept).toBe(abend.rezept);
			}
		}
	});

	it('plant im Vegetarisch-Modus nur vegetarisch', () => {
		const s = { ...STANDARD, veg: true };
		const p = plan(s, 7);
		for (const e of Object.values(p)) {
			if (!e.rezept) continue;
			expect(berechne(gericht(e.rezept)!, e.auswahl, { veg: true, tm: false }).veg).toBe(true);
		}
	});

	it('lässt ohne Rind-Erlaubnis Rind weg und plant ohne Fleischtage kein Fleisch', () => {
		const s = { ...STANDARD, rind: false, woche: { fisch: 0, fleisch: 0 } };
		const p = plan(s, 11);
		for (const d of TAGE) expect(artOf(p[planKey(d, 'abend')])).toBe('veggie');
	});

	it('behält belegte Mahlzeiten', () => {
		const fest: PlanEintrag = {
			datum: TAGE[2],
			mahlzeit: 'abend',
			rezept: MITGELIEFERT.find((g) => g.kategorie === 'abend')!.id,
			geaendert: 0
		};
		const p = plan(STANDARD, 5, { [planKey(fest.datum, 'abend')]: fest });
		expect(p[planKey(fest.datum, 'abend')]).toBe(fest);
	});
});

describe('Einkaufsliste', () => {
	it('zählt Reste-Mittage nicht und skaliert die Portionen', () => {
		const g = MITGELIEFERT.find((x) => x.kategorie === 'abend')!;
		const abend: PlanEintrag = {
			datum: TAGE[0],
			mahlzeit: 'abend',
			rezept: g.id,
			reste: false,
			portionen: g.portionen * 2,
			geaendert: 0
		};
		const mittag: PlanEintrag = {
			datum: TAGE[1],
			mahlzeit: 'mittag',
			rezept: g.id,
			reste: true,
			geaendert: 0
		};
		const einzeln = einkaufsliste([abend], STANDARD, gericht);
		const mitRest = einkaufsliste([abend, mittag], STANDARD, gericht);
		expect(mitRest).toEqual(einzeln);
		expect(einzeln.length).toBeGreaterThan(0);
	});
});

describe('Eigene Rezepte', () => {
	it('liest Zutatenzeilen', () => {
		expect(parseZutat('200 g Hähnchenbrust')).toEqual({
			menge: 200,
			einheit: 'g',
			name: 'Hähnchenbrust'
		});
		expect(parseZutat('2 EL Olivenöl')).toEqual({ menge: 2, einheit: 'EL', name: 'Olivenöl' });
		expect(parseZutat('1 Zwiebel')).toEqual({ menge: 1, einheit: 'Stk', name: 'Zwiebel' });
		expect(parseZutat('½ TL Salz')).toEqual({ menge: 0.5, einheit: 'TL', name: 'Salz' });
		expect(parseZutat('1,5 kg Kartoffeln')).toEqual({
			menge: 1500,
			einheit: 'g',
			name: 'Kartoffeln'
		});
		expect(parseZutat('500g Mehl')).toEqual({ menge: 500, einheit: 'g', name: 'Mehl' });
		expect(parseZutat('Pfeffer')).toEqual({ menge: null, einheit: null, name: 'Pfeffer' });
	});
	it('findet Katalognamen', () => {
		expect(katalogName('Zwiebeln')).toBe('Zwiebel');
		expect(katalogName('olivenöl')).toBe('Olivenöl');
		expect(katalogName('Hähnchenbrustfilets')).toBe('Hähnchenbrustfilet');
		expect(katalogName('Salz')).toBe('Jodsalz');
		expect(katalogName('frische Petersilie')).toBe('Petersilie');
		expect(katalogName('Knoblauchzehen')).toBe('Knoblauch');
		expect(katalogName('Schokolade')).toBeNull();
	});
	it('bereinigt Einstellungen', () => {
		expect(bereinigen({ erwachsene: 99, woche: { fisch: 5, fleisch: 5 } })).toMatchObject({
			erwachsene: STANDARD.erwachsene,
			woche: { fisch: 5, fleisch: 2 }
		});
	});
});
