import { REZEPTE } from '../data/rezepte/index.ts';
import type {
	Art,
	Ingredient,
	Kategorie,
	Naehrstoff,
	Nutrition,
	Recipe,
	Selection,
	Tag,
	Unit
} from '../data/types.ts';
import { EIGEN_PREFIX, katalogName, type EigenesRezept } from './eigene.ts';
import {
	artOf,
	computeRecipe,
	NAEHRSTOFFE,
	nutritionOf,
	type Chosen,
	type Prefs,
	type StepGroup
} from './rezept.ts';

/**
 * Einheitliche Sicht auf mitgelieferte und eigene Rezepte – für Planer,
 * Einkaufsliste und Listen.
 */
export interface Gericht {
	/** Rezept-ID bzw. „eigen:<id>“. */
	id: string;
	name: string;
	beschreibung: string;
	kategorie: Kategorie;
	portionen: number;
	mitnehmen: boolean;
	eigen: boolean;
	tags: Tag[];
	recipe?: Recipe;
	eigenes?: EigenesRezept;
}

export interface GerichtItem {
	name: string;
	unit: Unit | null;
	amount: number | null;
	fixed?: boolean;
	note?: string;
}

export interface GerichtErgebnis {
	minutes: number;
	ofen: number;
	nutrition: Nutrition;
	baseKh: number;
	mikro: Record<Naehrstoff, number>;
	naehrstoffe: Naehrstoff[];
	art: Art;
	veg: boolean;
	/** Zutaten für `portionen` Portionen. */
	items: GerichtItem[];
	steps: StepGroup[];
	tm: boolean;
	tmVerfuegbar: boolean;
	chosen: Chosen[];
	/** Nährwerte geschätzt, aber nicht alle Zutaten bekannt (nur eigene Rezepte). */
	unvollstaendig: boolean;
}

export const gerichtAusRezept = (r: Recipe): Gericht => ({
	id: r.id,
	name: r.name,
	beschreibung: r.beschreibung,
	kategorie: r.kategorie,
	portionen: r.portionen,
	mitnehmen: !!r.mitnehmen,
	eigen: false,
	tags: r.tags,
	recipe: r
});

export const gerichtAusEigenem = (e: EigenesRezept): Gericht => ({
	id: EIGEN_PREFIX + e.id,
	name: e.titel || 'Ohne Titel',
	beschreibung: e.beschreibung,
	kategorie: e.kategorie,
	portionen: e.portionen,
	mitnehmen: !!e.mitnehmen.trim(),
	eigen: true,
	tags: e.ofen ? ['ofen'] : [],
	eigenes: e
});

export const MITGELIEFERT: Gericht[] = REZEPTE.map(gerichtAusRezept);

/** Zutaten eines eigenen Rezepts als Katalog-Zutaten (für Nährwerte und Einkauf). */
function eigeneItems(e: EigenesRezept): {
	items: GerichtItem[];
	known: Ingredient[];
	unbekannt: number;
} {
	const items: GerichtItem[] = [];
	const known: Ingredient[] = [];
	let unbekannt = 0;
	for (const z of e.zutaten) {
		const kat = katalogName(z.name);
		items.push({ name: kat ?? z.name, unit: z.einheit, amount: z.menge });
		if (kat && z.menge !== null && z.einheit)
			known.push({ name: kat, unit: z.einheit, amount: z.menge });
		else if (z.menge !== null) unbekannt++;
	}
	return { items, known, unbekannt };
}

const round = (n: Nutrition): Nutrition => ({
	kcal: Math.round(n.kcal / 10) * 10,
	protein: Math.round(n.protein),
	fett: Math.round(n.fett),
	kh: Math.round(n.kh),
	bst: Math.round(n.bst)
});

export function berechne(
	g: Gericht,
	auswahl: Selection | undefined,
	prefs: Prefs
): GerichtErgebnis {
	if (g.recipe) {
		const r = computeRecipe(g.recipe, auswahl, prefs);
		return {
			...r,
			items: r.items.map((it) => ({
				name: it.name,
				unit: it.unit,
				amount: it.amount,
				fixed: it.fixed,
				note: it.note
			})),
			unvollstaendig: false
		};
	}
	const e = g.eigenes!;
	const { items, known, unbekannt } = eigeneItems(e);
	const calc = nutritionOf(known);
	const p = Math.max(1, e.portionen);
	const nutrition = e.naehrwerte
		? round(e.naehrwerte)
		: round({
				kcal: calc.n.kcal / p,
				protein: calc.n.protein / p,
				fett: calc.n.fett / p,
				kh: calc.n.kh / p,
				bst: calc.n.bst / p
			});
	const mikro = Object.fromEntries(Object.entries(calc.m).map(([k, v]) => [k, v / p])) as Record<
		Naehrstoff,
		number
	>;
	const art = e.art ?? artOf(known);
	const tm = prefs.tm && e.tmSchritte.length > 0;
	return {
		minutes: e.minuten,
		ofen: e.ofen,
		nutrition,
		baseKh: 0,
		mikro,
		naehrstoffe: (Object.keys(NAEHRSTOFFE) as Naehrstoff[]).filter(
			(k) => mikro[k] >= NAEHRSTOFFE[k].schwelle
		),
		art,
		veg: art === 'veggie',
		items,
		// Eigene Rezepte: jeder Schritt eine eigene Nummer, ohne Abschnittstitel
		steps: (tm ? e.tmSchritte : e.schritte).map((l) => ({ title: '', lines: [l] })),
		tm,
		tmVerfuegbar: e.tmSchritte.length > 0,
		chosen: [],
		unvollstaendig: !e.naehrwerte && (unbekannt > 0 || known.length === 0)
	};
}
