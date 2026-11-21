import type {
	Art,
	Ingredient,
	Naehrstoff,
	Nutrition,
	Option,
	Phase,
	Recipe,
	Selection,
	Slot,
	Step
} from '../data/types.ts';
import { zutat } from '../data/zutaten/index.ts';
import { joinDe } from './format.ts';

export interface Prefs {
	veg: boolean;
	tm: boolean;
}

export interface Chosen {
	slot: Slot;
	option: Option;
}

export interface StepGroup {
	title: string;
	lines: string[];
}

export interface ListItem extends Ingredient {
	key: string;
}

export interface RecipeResult {
	/** Zubereitungszeit in Minuten, ohne passive Ofenzeit. */
	minutes: number;
	/** Passive Ofenzeit in Minuten (0 = kein Ofen). */
	ofen: number;
	/** Nährwerte pro Erwachsenen-Portion. */
	nutrition: Nutrition;
	/** Davon Kohlenhydrate aus der Sättigungsbeilage (pro Portion). */
	baseKh: number;
	/** Mikronährstoffe pro Portion. */
	mikro: Record<Naehrstoff, number>;
	/** Nährstoffe, für die eine Portion eine gute Quelle ist. */
	naehrstoffe: Naehrstoff[];
	/** Zutaten für `recipe.portionen` Portionen. */
	items: ListItem[];
	steps: StepGroup[];
	art: Art;
	veg: boolean;
	/** Es werden Thermomix-Schritte verwendet. */
	tm: boolean;
	/** Das Rezept hat eine Thermomix-Fassung. */
	tmVerfuegbar: boolean;
	chosen: Chosen[];
	/** Zutaten ohne Katalogeintrag oder ohne Gewicht für die Einheit. */
	unbekannt: string[];
}

/** Tagesbedarf in der Schwangerschaft (gerundet, DGE) und Schwelle für „gute Quelle“ pro Portion. */
export const NAEHRSTOFFE: Record<
	Naehrstoff,
	{ label: string; einheit: string; bedarf: number; schwelle: number; warum: string }
> = {
	folat: {
		label: 'Folat',
		einheit: 'µg',
		bedarf: 550,
		schwelle: 110,
		warum: 'für die Entwicklung von Rückenmark und Nervensystem'
	},
	eisen: {
		label: 'Eisen',
		einheit: 'mg',
		bedarf: 30,
		schwelle: 4.5,
		warum: 'für die Blutbildung, der Bedarf steigt deutlich'
	},
	jod: {
		label: 'Jod',
		einheit: 'µg',
		bedarf: 230,
		schwelle: 50,
		warum: 'für die Schilddrüse von Mutter und Kind'
	},
	calcium: {
		label: 'Calcium',
		einheit: 'mg',
		bedarf: 1000,
		schwelle: 250,
		warum: 'für Knochen und Zähne'
	},
	omega3: {
		label: 'Omega-3',
		einheit: 'mg',
		bedarf: 450,
		schwelle: 250,
		warum: 'DHA aus Fisch für Gehirn und Augen'
	}
};

export const isVegOption = (o: Option) => o.items.every((it) => !zutat(it.name)?.art);
const optionOf = (slot: Slot, id: string) => slot.options.find((o) => o.id === id);
const nameOf = (o: Option) => o.short ?? o.label;

/** Gespeicherte Auswahl eines Slots, ungültige IDs fallen auf den Standard zurück. */
export function storedSelection(slot: Slot, stored: Selection | undefined): string | string[] {
	const s = stored?.[slot.id];
	if (!slot.multi) return typeof s === 'string' && optionOf(slot, s) ? s : slot.default;
	return Array.isArray(s) ? s.filter((id) => optionOf(slot, id)) : [...slot.default];
}

/** Wirksame Auswahl: im vegetarischen Modus fliegen Fleisch und Fisch raus. */
export function effectiveSelection(
	slot: Slot,
	stored: Selection | undefined,
	veg: boolean
): string[] {
	const s = storedSelection(slot, stored);
	if (!slot.multi) {
		const id = s as string;
		if (!veg || isVegOption(optionOf(slot, id)!)) return [id];
		return [slot.vegDefault ?? slot.options.find(isVegOption)?.id ?? 'none'];
	}
	const ids = s as string[];
	return veg ? ids.filter((id) => isVegOption(optionOf(slot, id)!)) : ids;
}

/** Alle gewählten Optionen in Slot-Reihenfolge, ohne „ohne“. */
export function chosenOptions(r: Recipe, stored: Selection | undefined, veg: boolean): Chosen[] {
	const out: Chosen[] = [];
	for (const slot of r.slots) {
		const ids = effectiveSelection(slot, stored, veg);
		for (const option of slot.options) {
			if (option.id !== 'none' && ids.includes(option.id)) out.push({ slot, option });
		}
	}
	return out;
}

export function mergeItems(raw: Ingredient[]): ListItem[] {
	const map = new Map<string, ListItem>();
	for (const it of raw) {
		const key = it.name + '|' + it.unit + '|' + (it.fixed ? 'f' : '');
		const hit = map.get(key);
		if (hit) {
			hit.amount += it.amount;
			if (it.note && hit.note !== it.note) hit.note = hit.note ? hit.note : it.note;
		} else map.set(key, { ...it, key });
	}
	return [...map.values()];
}

/** Gewicht einer Zutat in Gramm, `null` wenn unbekannt. */
export function grams(it: Ingredient): number | null {
	const z = zutat(it.name);
	if (!z) return null;
	if (it.unit === 'g') return it.amount;
	if (it.unit === 'ml') return it.amount * (z.g?.ml ?? 1);
	const w = z.g?.[it.unit];
	return w === undefined ? null : it.amount * w;
}

/** Nährwerte und Mikronährstoffe einer Zutatenliste (absolut). */
export function nutritionOf(items: Ingredient[]): {
	n: Nutrition;
	m: Record<Naehrstoff, number>;
	unbekannt: string[];
} {
	const n: Nutrition = { kcal: 0, protein: 0, fett: 0, kh: 0, bst: 0 };
	const m: Record<Naehrstoff, number> = { folat: 0, eisen: 0, jod: 0, calcium: 0, omega3: 0 };
	const unbekannt: string[] = [];
	for (const it of items) {
		const g = grams(it);
		const z = zutat(it.name);
		if (g === null || !z) {
			unbekannt.push(it.name);
			continue;
		}
		const f = g / 100;
		n.kcal += z.n[0] * f;
		n.protein += z.n[1] * f;
		n.fett += z.n[2] * f;
		n.kh += z.n[3] * f;
		n.bst += z.n[4] * f;
		for (const [k, v] of Object.entries(z.m ?? {})) m[k as Naehrstoff] += (v ?? 0) * f;
	}
	return { n, m, unbekannt };
}

/** Art eines Gerichts aus seinen Zutaten: Fisch vor Rind vor Geflügel. */
export function artOf(items: Ingredient[]): Art {
	const arten = new Set(items.map((it) => zutat(it.name)?.art).filter(Boolean));
	if (arten.has('fisch')) return 'fisch';
	if (arten.has('rind')) return 'rind';
	if (arten.has('gefluegel')) return 'gefluegel';
	return 'veggie';
}

const PHASES: { phase: Phase; title: string }[] = [
	{ phase: 'start', title: 'Aufsetzen' },
	{ phase: 'vorbereiten', title: 'Vorbereiten' },
	{ phase: 'tm', title: 'Thermomix' },
	{ phase: 'ofen', title: 'Ofen' },
	{ phase: 'pfanne', title: 'Am Herd' },
	{ phase: 'nebenbei', title: 'Währenddessen' },
	{ phase: 'sauce', title: 'Sauce' },
	{ phase: 'anrichten', title: 'Anrichten' }
];

/** Zeit aus Schritten: Aufgesetztes läuft parallel, Pfanne und Mixtopf nacheinander, Ofenzeit zählt nicht. */
export function timeOf(steps: Step[]): { minutes: number; ofen: number } {
	let active = 0;
	let startMax = 0;
	let vorbereiten = 0;
	let pan = 0;
	let tm = 0;
	let ofen = 0;
	for (const s of steps) {
		const a = s.active ?? 1;
		active += a;
		const c = s.cook ?? 0;
		// Aufgesetztes gart erst, nachdem es vorbereitet ist (z. B. Kartoffeln würfeln)
		if (s.phase === 'start') startMax = Math.max(startMax, c + a);
		else if (s.phase === 'vorbereiten') vorbereiten += a;
		else if (s.phase === 'pfanne') pan += c;
		else if (s.phase === 'tm') tm += c;
		else if (s.phase === 'ofen') ofen = Math.max(ofen, c);
	}
	const chain = Math.max(startMax, vorbereiten + Math.max(pan, tm));
	const minutes = Math.ceil(Math.max(active, chain ? chain + 1 : 0) + 2);
	return { minutes, ofen };
}

/** Gilt ein Schritt für diese Auswahl? */
function applies(s: Step, chosen: Chosen[]): boolean {
	if (!s.wenn) return true;
	const [slotId, optionId] = s.wenn.split(':');
	return chosen.some((c) => c.slot.id === slotId && (!optionId || c.option.id === optionId));
}

/** Ersetzt {slotId} durch die gewählten Optionen. */
function fill(text: string, chosen: Chosen[]): string {
	return text.replace(/\{([a-z0-9-]+)\}/gi, (whole, id: string) => {
		const names = chosen.filter((c) => c.slot.id === id).map((c) => nameOf(c.option));
		return names.length ? joinDe(names) : whole;
	});
}

/**
 * Rechnet ein Rezept durch: Zutaten (für `recipe.portionen`), Schritte in sinnvoller
 * Reihenfolge, Zeit und Nährwerte pro Erwachsenen-Portion.
 */
export function computeRecipe(
	r: Recipe,
	stored: Selection | undefined,
	prefs: Prefs
): RecipeResult {
	const chosen = chosenOptions(r, stored, prefs.veg);
	const tmVerfuegbar = !!r.tmSchritte || chosen.some((c) => c.option.tmSteps);
	const useTm = prefs.tm && tmVerfuegbar;

	const raw: Step[] = [
		...(useTm && r.tmSchritte ? r.tmSchritte : r.schritte),
		...chosen.flatMap(({ option }) =>
			useTm && option.tmSteps ? option.tmSteps : (option.steps ?? [])
		)
	].filter((s) => applies(s, chosen));
	const { minutes, ofen } = timeOf(raw);

	const steps: StepGroup[] = [];
	for (const { phase, title } of PHASES) {
		const list = raw
			.map((s, i) => ({ s, i }))
			.filter(({ s }) => s.phase === phase)
			.sort((p, q) => (p.s.order ?? 50) - (q.s.order ?? 50) || p.i - q.i);
		if (list.length) steps.push({ title, lines: list.map(({ s }) => fill(s.text, chosen)) });
	}

	const all: Ingredient[] = [...r.zutaten, ...chosen.flatMap((c) => c.option.items)];
	const items = mergeItems(all);
	const { n, m, unbekannt } = nutritionOf(all);
	const p = r.portionen;
	const nutrition: Nutrition = {
		kcal: Math.round(n.kcal / p / 10) * 10,
		protein: Math.round(n.protein / p),
		fett: Math.round(n.fett / p),
		kh: Math.round(n.kh / p),
		bst: Math.round(n.bst / p)
	};
	const base = nutritionOf(
		chosen.filter((c) => c.slot.role === 'base').flatMap((c) => c.option.items)
	);
	const mikro = Object.fromEntries(Object.entries(m).map(([k, v]) => [k, v / p])) as Record<
		Naehrstoff,
		number
	>;
	const naehrstoffe = (Object.keys(NAEHRSTOFFE) as Naehrstoff[]).filter(
		(k) => mikro[k] >= NAEHRSTOFFE[k].schwelle
	);
	const art = artOf(all);

	return {
		minutes,
		ofen,
		nutrition,
		baseKh: Math.round(base.n.kh / p),
		mikro,
		naehrstoffe,
		items,
		steps,
		art,
		veg: art === 'veggie',
		tm: useTm,
		tmVerfuegbar,
		chosen,
		unbekannt: [...new Set(unbekannt)]
	};
}

/** Nächste Auswahl nach einem Klick auf einen Chip. */
export function toggleOption(
	r: Recipe,
	stored: Selection | undefined,
	slotId: string,
	optionId: string
): Selection {
	const slot = r.slots.find((s) => s.id === slotId);
	const next: Selection = { ...(stored ?? {}) };
	if (!slot) return next;
	if (!slot.multi) next[slot.id] = optionId;
	else {
		const cur = storedSelection(slot, stored) as string[];
		next[slot.id] = cur.includes(optionId)
			? cur.filter((id) => id !== optionId)
			: [...cur, optionId];
	}
	return next;
}

/**
 * Auswahlen, mit denen das Rezept eine bestimmte Art bekommt (z. B. Fisch-Tag):
 * probiert die Optionen des Eiweiß-Slots durch.
 */
export function selectionsFor(r: Recipe, art: Art, veg: boolean): Selection[] {
	const out: Selection[] = [];
	const mains = r.slots.filter((s) => s.role === 'main' && !s.multi);
	const baseArt = computeRecipe(r, undefined, { veg, tm: false }).art;
	if (baseArt === art) out.push({});
	for (const slot of mains) {
		for (const o of slot.options) {
			if (o.id === storedSelection(slot, undefined)) continue;
			const sel: Selection = { [slot.id]: o.id };
			if (computeRecipe(r, sel, { veg, tm: false }).art === art) out.push(sel);
		}
	}
	return out;
}

/**
 * Diabetes-Modus: Welcher Anteil der Sättigungsbeilage passt in die Grenze?
 * 1 = alles, kleiner 1 = weniger nehmen, `null` = Beilage allein reicht nicht.
 */
export function baseShare(
	res: { nutrition: Nutrition; baseKh: number },
	limit: number
): number | null {
	const kh = res.nutrition.kh;
	if (kh <= limit) return 1;
	if (!res.baseKh) return null;
	const share = (limit - (kh - res.baseKh)) / res.baseKh;
	if (share < 0.3) return null;
	return Math.floor(share * 20) / 20;
}
