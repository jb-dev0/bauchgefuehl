import type { Kategorie } from '../data/types.ts';

export type Mahlzeit = 'fruehstueck' | 'snack1' | 'mittag' | 'snack2' | 'abend';

export const MAHLZEITEN: { id: Mahlzeit; label: string; kurz: string; kategorie: Kategorie }[] = [
	{ id: 'fruehstueck', label: 'Frühstück', kurz: 'Frühstück', kategorie: 'fruehstueck' },
	{ id: 'snack1', label: 'Snack am Vormittag', kurz: 'Snack', kategorie: 'snack' },
	{ id: 'mittag', label: 'Mittagessen', kurz: 'Mittag', kategorie: 'mittag' },
	{ id: 'snack2', label: 'Snack am Nachmittag', kurz: 'Snack', kategorie: 'snack' },
	{ id: 'abend', label: 'Abendessen', kurz: 'Abend', kategorie: 'abend' }
];

export const kategorieVon = (m: Mahlzeit): Kategorie =>
	MAHLZEITEN.find((x) => x.id === m)!.kategorie;

export interface Einstellungen {
	/** Erwachsene am Familientisch. */
	erwachsene: number;
	/** Kleinkinder (zählen als halbe Portion). */
	kinder: number;
	/** Portionen, die abends fürs Mittag am nächsten Tag mitgekocht werden (0 = keine). */
	mittag: number;
	/** Portionen pro Snack. */
	snacks: number;
	veg: boolean;
	tm: boolean;
	/** Schwangerschaftsdiabetes-Modus. */
	gdm: boolean;
	/** Obergrenzen für Kohlenhydrate pro Erwachsenen-Portion im Diabetes-Modus. */
	kh: Record<Kategorie, number>;
	/** Abendessen pro Woche mit Fisch bzw. Fleisch, der Rest ist vegetarisch. */
	woche: { fisch: number; fleisch: number };
	/** Rind ab und zu erlaubt (höchstens einmal in zwei Wochen). */
	rind: boolean;
	/** Welche Mahlzeiten der Planer füllt. */
	mahlzeiten: Record<Mahlzeit, boolean>;
}

export const KH_STANDARD: Record<Kategorie, number> = {
	fruehstueck: 30,
	mittag: 45,
	abend: 45,
	snack: 20
};

export const STANDARD: Einstellungen = {
	erwachsene: 2,
	kinder: 1,
	mittag: 1,
	snacks: 1,
	veg: false,
	tm: false,
	gdm: false,
	kh: { ...KH_STANDARD },
	woche: { fisch: 2, fleisch: 1 },
	rind: true,
	mahlzeiten: { fruehstueck: true, snack1: true, mittag: true, snack2: true, abend: true }
};

export const GRENZEN = {
	erwachsene: [1, 8],
	kinder: [0, 6],
	mittag: [0, 4],
	snacks: [1, 4],
	kh: [10, 90],
	woche: [0, 7]
} as const;

const isObj = (v: unknown): v is Record<string, unknown> =>
	typeof v === 'object' && v !== null && !Array.isArray(v);
const int = (v: unknown, [min, max]: readonly [number, number], d: number) =>
	Number.isInteger(v) && (v as number) >= min && (v as number) <= max ? (v as number) : d;
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);

/** Liest Einstellungen aus unbekannten Daten (Speicher, Server), ungültiges wird Standard. */
export function bereinigen(raw: unknown): Einstellungen {
	const s = isObj(raw) ? raw : {};
	const kh = isObj(s.kh) ? s.kh : {};
	const woche = isObj(s.woche) ? s.woche : {};
	const mz = isObj(s.mahlzeiten) ? s.mahlzeiten : {};
	const fisch = int(woche.fisch, GRENZEN.woche, STANDARD.woche.fisch);
	const fleisch = Math.min(int(woche.fleisch, GRENZEN.woche, STANDARD.woche.fleisch), 7 - fisch);
	return {
		erwachsene: int(s.erwachsene, GRENZEN.erwachsene, STANDARD.erwachsene),
		kinder: int(s.kinder, GRENZEN.kinder, STANDARD.kinder),
		mittag: int(s.mittag, GRENZEN.mittag, STANDARD.mittag),
		snacks: int(s.snacks, GRENZEN.snacks, STANDARD.snacks),
		veg: bool(s.veg, STANDARD.veg),
		tm: bool(s.tm, STANDARD.tm),
		gdm: bool(s.gdm, STANDARD.gdm),
		kh: {
			fruehstueck: int(kh.fruehstueck, GRENZEN.kh, KH_STANDARD.fruehstueck),
			mittag: int(kh.mittag, GRENZEN.kh, KH_STANDARD.mittag),
			abend: int(kh.abend, GRENZEN.kh, KH_STANDARD.abend),
			snack: int(kh.snack, GRENZEN.kh, KH_STANDARD.snack)
		},
		woche: { fisch, fleisch },
		rind: bool(s.rind, STANDARD.rind),
		mahlzeiten: {
			fruehstueck: bool(mz.fruehstueck, true),
			snack1: bool(mz.snack1, true),
			mittag: bool(mz.mittag, true),
			snack2: bool(mz.snack2, true),
			abend: bool(mz.abend, true)
		}
	};
}

/** Familienportionen: Erwachsene plus Kleinkinder als halbe Portion. */
export const familie = (s: Einstellungen) => s.erwachsene + s.kinder * 0.5;

/** Wie viele Erwachsenen-Portionen für eine Mahlzeit gekocht werden. */
export function portionenFuer(k: Kategorie, s: Einstellungen, mitMittag = false): number {
	switch (k) {
		case 'abend':
			return familie(s) + (mitMittag ? s.mittag : 0);
		case 'fruehstueck':
			return familie(s);
		case 'mittag':
			return Math.max(1, s.mittag);
		case 'snack':
			return s.snacks;
	}
}

/** „2 Erwachsene und 1 Kind“ */
export function familienText(s: Einstellungen): string {
	const e = `${s.erwachsene} ${s.erwachsene === 1 ? 'Erwachsene/r' : 'Erwachsene'}`;
	if (!s.kinder) return e;
	return `${e} und ${s.kinder} ${s.kinder === 1 ? 'Kind' : 'Kinder'}`;
}
