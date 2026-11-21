import type { Abteilung, Ingredient, Unit } from '../data/types.ts';
import { ABTEILUNGEN, zutat } from '../data/zutaten/index.ts';
import type { Einstellungen } from './einstellungen.ts';
import { formatIngredient } from './format.ts';
import { berechne, type Gericht } from './gericht.ts';
import { eintragPortionen, type PlanEintrag } from './plan.ts';
import { grams } from './rezept.ts';

export interface Posten {
	/** Stabiler Schlüssel zum Abhaken (Zutatenname). */
	key: string;
	name: string;
	menge: string;
	abteilung: Abteilung;
	/** Für welche Gerichte. */
	fuer: string[];
}

export interface Gruppe {
	abteilung: Abteilung;
	label: string;
	posten: Posten[];
}

interface Teil {
	unit: Unit | null;
	amount: number | null;
}

const GANZ: Unit[] = ['Stk', 'Dose', 'Bund', 'Scheibe', 'Zehe', 'Hv'];
const LOEFFEL: Unit[] = ['EL', 'TL', 'Prise'];

/**
 * Fasst Mengen einer Zutat zusammen und macht sie einkaufbar: Stück und Dosen
 * aufgerundet, Löffelmengen in Gramm, Gewürzmengen ohne Zahl (hat man da).
 */
function zusammenfassen(name: string, teile: Teil[]): { menge: string; plural: boolean } {
	const mit = teile.filter(
		(t): t is { unit: Unit; amount: number } => t.unit !== null && t.amount !== null
	);
	if (!mit.length) return { menge: '', plural: false };
	const z = zutat(name);
	const fmt = (amount: number, unit: Unit) => formatIngredient({ amount, unit, name }, 1).amount;
	const gramm = (t: { unit: Unit; amount: number }) =>
		grams({ name, unit: t.unit, amount: t.amount });
	const units = new Set(mit.map((t) => t.unit));
	const unit = mit[0].unit;
	if (units.size === 1 && !LOEFFEL.includes(unit)) {
		let summe = mit.reduce((s, t) => s + t.amount, 0);
		if (GANZ.includes(unit)) summe = Math.max(1, Math.ceil(summe - 0.05));
		return { menge: fmt(summe, unit), plural: unit === 'g' || summe > 1 };
	}
	const g = mit.map(gramm);
	if (g.every((x) => x !== null)) {
		const summe = (g as number[]).reduce((s, x) => s + x, 0);
		const stk = z?.g?.Stk;
		if (units.has('Stk') && stk) {
			const n = Math.max(1, Math.ceil(summe / stk - 0.05));
			return { menge: fmt(n, 'Stk'), plural: n > 1 };
		}
		// Gewürze, Öl & Co. in kleinen Mengen: nur der Name
		if (z?.abteilung === 'gewuerze' && summe < 60) return { menge: '', plural: false };
		return {
			menge: (units.size === 1 && LOEFFEL.includes(unit) ? 'ca. ' : '') + fmt(summe, 'g'),
			plural: true
		};
	}
	return { menge: mit.map((t) => fmt(t.amount, t.unit)).join(' + '), plural: false };
}

/**
 * Einkaufsliste für Planeinträge. Mittagessen aus Resten zählen nicht (die
 * Portionen werden am Vorabend mitgekocht).
 */
export function einkaufsliste(
	eintraege: PlanEintrag[],
	s: Einstellungen,
	gericht: (id: string) => Gericht | undefined
): Gruppe[] {
	const map = new Map<string, { teile: Teil[]; fuer: Set<string> }>();
	for (const e of eintraege) {
		if (!e.rezept || (e.mahlzeit === 'mittag' && e.reste)) continue;
		const g = gericht(e.rezept);
		if (!g) continue;
		const res = berechne(g, e.auswahl, { veg: s.veg, tm: s.tm });
		const f = eintragPortionen(e, s) / g.portionen;
		for (const it of res.items) {
			let hit = map.get(it.name);
			if (!hit) map.set(it.name, (hit = { teile: [], fuer: new Set() }));
			hit.teile.push({
				unit: it.unit,
				amount: it.amount === null ? null : it.amount * (it.fixed ? 1 : f)
			});
			hit.fuer.add(g.name);
		}
	}
	const collator = new Intl.Collator('de');
	const gruppen = new Map<Abteilung, Posten[]>();
	for (const [name, { teile, fuer }] of map) {
		const z = zutat(name);
		const abteilung = z?.abteilung ?? 'sonstiges';
		const { menge, plural } = zusammenfassen(name, teile);
		const posten: Posten = {
			key: name,
			name: z?.plural && plural ? z.plural : name,
			menge,
			abteilung,
			fuer: [...fuer]
		};
		if (!gruppen.has(abteilung)) gruppen.set(abteilung, []);
		gruppen.get(abteilung)!.push(posten);
	}
	return ABTEILUNGEN.filter((a) => gruppen.has(a.id)).map((a) => ({
		abteilung: a.id,
		label: a.label,
		posten: gruppen.get(a.id)!.sort((x, y) => collator.compare(x.name, y.name))
	}));
}
