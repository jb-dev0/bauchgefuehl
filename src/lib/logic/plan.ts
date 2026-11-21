import type { Art, Selection } from '../data/types.ts';
import { addDays } from './datum.ts';
import {
	kategorieVon,
	MAHLZEITEN,
	portionenFuer,
	type Einstellungen,
	type Mahlzeit
} from './einstellungen.ts';
import { berechne, type Gericht } from './gericht.ts';
import { baseShare, selectionsFor } from './rezept.ts';

export interface PlanEintrag {
	datum: string;
	mahlzeit: Mahlzeit;
	/** Rezept-ID oder „eigen:<id>“; `null` = leer. */
	rezept: string | null;
	auswahl?: Selection;
	/**
	 * Abendessen: Portionen fürs Mittag am nächsten Tag mitkochen.
	 * Mittagessen: Das sind die Reste vom Vorabend (nichts einkaufen).
	 */
	reste?: boolean;
	/** Eigene Portionenzahl statt der aus den Einstellungen. */
	portionen?: number | null;
	geaendert: number;
}

export const planKey = (datum: string, mahlzeit: Mahlzeit) => `${datum}|${mahlzeit}`;

/** Portionen, für die eine Planzeile gekocht wird. */
export function eintragPortionen(e: PlanEintrag, s: Einstellungen): number {
	if (e.portionen) return e.portionen;
	const k = kategorieVon(e.mahlzeit);
	return portionenFuer(k, s, k === 'abend' && !!e.reste);
}

/** Werden abends Reste fürs Mittag mitgekocht, wenn das Gericht es erlaubt? */
export const resteAktiv = (s: Einstellungen) => s.mittag > 0 && s.mahlzeiten.mittag;

type Typ = 'fisch' | 'fleisch' | 'veggie';

interface Kandidat {
	g: Gericht;
	auswahl: Selection;
	gewicht: number;
}

function zufall<T>(
	liste: T[],
	rng: () => number,
	gewicht: (x: T) => number = () => 1
): T | undefined {
	const summe = liste.reduce((s, x) => s + gewicht(x), 0);
	if (!liste.length || summe <= 0) return undefined;
	let r = rng() * summe;
	for (const x of liste) {
		r -= gewicht(x);
		if (r <= 0) return x;
	}
	return liste[liste.length - 1];
}

function mischen<T>(liste: T[], rng: () => number): T[] {
	const a = [...liste];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** Reihenfolge der Tagesarten so, dass gleiche Fleisch-/Fischtage nicht direkt aufeinander folgen. */
function verteilen(typen: Typ[], rng: () => number): Typ[] {
	let best = typen;
	let bestScore = Infinity;
	for (let i = 0; i < 40; i++) {
		const t = mischen(typen, rng);
		let score = 0;
		for (let k = 1; k < t.length; k++) if (t[k] !== 'veggie' && t[k] === t[k - 1]) score++;
		if (score < bestScore) {
			best = t;
			bestScore = score;
			if (!score) break;
		}
	}
	return best;
}

export interface VorschlagParams {
	tage: string[];
	plan: Record<string, PlanEintrag>;
	s: Einstellungen;
	gerichte: Gericht[];
	/** Auch belegte Mahlzeiten neu vorschlagen. */
	ueberschreiben: boolean;
	rng?: () => number;
	jetzt?: number;
}

/**
 * Schlägt einen Plan für `tage` vor (typisch: 14 Tage ab Montag).
 * Liefert nur die neuen bzw. geänderten Einträge.
 */
export function vorschlagen(p: VorschlagParams): PlanEintrag[] {
	const { tage, s, gerichte, ueberschreiben } = p;
	const rng = p.rng ?? Math.random;
	const jetzt = p.jetzt ?? Date.now();
	const prefs = { veg: s.veg, tm: false };
	const neu = new Map<string, PlanEintrag>();
	const get = (datum: string, m: Mahlzeit) =>
		neu.get(planKey(datum, m)) ?? p.plan[planKey(datum, m)];
	const frei = (datum: string, m: Mahlzeit) =>
		s.mahlzeiten[m] && (ueberschreiben || !p.plan[planKey(datum, m)]?.rezept);
	const setze = (e: Omit<PlanEintrag, 'geaendert'>) =>
		neu.set(planKey(e.datum, e.mahlzeit), { ...e, geaendert: jetzt });

	const byId = new Map(gerichte.map((g) => [g.id, g]));
	const artVon = (e: PlanEintrag | undefined): Art | null => {
		const g = e?.rezept ? byId.get(e.rezept) : undefined;
		return g ? berechne(g, e!.auswahl, prefs).art : null;
	};
	const gdmOk = (g: Gericht, auswahl: Selection) =>
		!s.gdm || baseShare(berechne(g, auswahl, prefs), s.kh[g.kategorie]) !== null;

	// Schon belegte (und behaltene) Rezepte nicht noch einmal vorschlagen
	const benutzt = new Set<string>();
	for (const d of tage)
		for (const { id } of MAHLZEITEN) {
			const e = p.plan[planKey(d, id)];
			if (e?.rezept && !frei(d, id)) benutzt.add(e.rezept);
		}
	let rindBenutzt = tage.some((d) => !frei(d, 'abend') && artVon(get(d, 'abend')) === 'rind');

	const wochen: string[][] = [];
	for (let i = 0; i < tage.length; i += 7) wochen.push(tage.slice(i, i + 7));

	const abende = gerichte.filter((g) => g.kategorie === 'abend');
	const mitResten = resteAktiv(s);
	const cache = new Map<string, Selection[]>();
	const auswahlenFuer = (g: Gericht, art: Art): Selection[] => {
		const key = g.id + '|' + art;
		let hit = cache.get(key);
		if (!hit) {
			hit = g.recipe
				? selectionsFor(g.recipe, art, s.veg)
				: berechne(g, undefined, prefs).art === art
					? [{}]
					: [];
			cache.set(key, hit);
		}
		return hit;
	};

	/* ---------- Abendessen ---------- */
	for (const woche of wochen) {
		const offen = woche.filter((d) => frei(d, 'abend'));
		if (!offen.length) continue;
		let fisch = s.veg ? 0 : s.woche.fisch;
		let fleisch = s.veg ? 0 : s.woche.fleisch;
		for (const d of woche) {
			if (frei(d, 'abend')) continue;
			const a = artVon(get(d, 'abend'));
			if (a === 'fisch') fisch--;
			else if (a === 'gefluegel' || a === 'rind') fleisch--;
		}
		fisch = Math.max(0, Math.min(fisch, offen.length));
		fleisch = Math.max(0, Math.min(fleisch, offen.length - fisch));
		const typen = verteilen(
			[
				...Array<Typ>(fisch).fill('fisch'),
				...Array<Typ>(fleisch).fill('fleisch'),
				...Array<Typ>(offen.length - fisch - fleisch).fill('veggie')
			],
			rng
		);

		offen.forEach((datum, i) => {
			let typ = typen[i];
			let kandidaten: Kandidat[] = [];
			for (let versuch = 0; versuch < 2 && !kandidaten.length; versuch++) {
				const arten: Art[] =
					typ === 'fisch'
						? ['fisch']
						: typ === 'fleisch'
							? s.rind && !rindBenutzt && rng() < 0.3
								? ['rind', 'gefluegel']
								: ['gefluegel']
							: ['veggie'];
				for (const g of abende) {
					for (const art of arten) {
						for (const auswahl of auswahlenFuer(g, art)) {
							// Gerichte, die von Haus aus diese Art sind, bevorzugen
							const echt = Object.keys(auswahl).length === 0 ? 2 : 1;
							const rind = art === 'rind' ? 3 : 1;
							const mit = mitResten && g.mitnehmen ? 3 : 1;
							kandidaten.push({ g, auswahl, gewicht: echt * rind * mit });
						}
					}
				}
				if (!kandidaten.length) typ = 'veggie';
			}
			const ungenutzt = kandidaten.filter((k) => !benutzt.has(k.g.id));
			if (ungenutzt.length) kandidaten = ungenutzt;
			const passend = kandidaten.filter((k) => gdmOk(k.g, k.auswahl));
			if (passend.length) kandidaten = passend;
			const wahl = zufall(kandidaten, rng, (k) => k.gewicht);
			if (!wahl) return;
			benutzt.add(wahl.g.id);
			if (artVon({ rezept: wahl.g.id, auswahl: wahl.auswahl } as PlanEintrag) === 'rind')
				rindBenutzt = true;
			setze({
				datum,
				mahlzeit: 'abend',
				rezept: wahl.g.id,
				auswahl: wahl.auswahl,
				reste: mitResten && wahl.g.mitnehmen
			});
		});
	}

	/* ---------- Mittag, Frühstück, Snacks ---------- */
	const pool = (k: Gericht['kategorie']) =>
		gerichte.filter(
			(g) =>
				g.kategorie === k &&
				(s.rind || berechne(g, undefined, prefs).art !== 'rind') &&
				(!s.veg || berechne(g, undefined, prefs).veg)
		);
	const mittage = pool('mittag');
	const fruehstuecke = pool('fruehstueck');
	const snacks = pool('snack');

	for (const woche of wochen) {
		const wochenBenutzt = new Set<string>();
		for (const d of woche)
			for (const { id } of MAHLZEITEN) {
				const e = get(d, id);
				if (e?.rezept && !frei(d, id)) wochenBenutzt.add(e.rezept);
			}
		const nimm = (liste: Gericht[], tagBenutzt: Set<string>) => {
			let k = liste.filter((g) => !wochenBenutzt.has(g.id) && !tagBenutzt.has(g.id));
			if (!k.length) k = liste.filter((g) => !tagBenutzt.has(g.id));
			if (!k.length) k = liste;
			const passend = k.filter((g) => gdmOk(g, {}));
			const g = zufall(passend.length ? passend : k, rng);
			if (g) {
				wochenBenutzt.add(g.id);
				tagBenutzt.add(g.id);
			}
			return g;
		};

		for (const datum of woche) {
			const tag = new Set<string>();
			if (frei(datum, 'mittag')) {
				const vorabend = get(addDays(datum, -1), 'abend');
				if (vorabend?.rezept && vorabend.reste) {
					setze({
						datum,
						mahlzeit: 'mittag',
						rezept: vorabend.rezept,
						auswahl: vorabend.auswahl,
						reste: true
					});
				} else {
					const g = nimm(mittage, tag);
					if (g) setze({ datum, mahlzeit: 'mittag', rezept: g.id, auswahl: {}, reste: false });
				}
			}
			if (frei(datum, 'fruehstueck')) {
				const g = nimm(fruehstuecke, tag);
				if (g) setze({ datum, mahlzeit: 'fruehstueck', rezept: g.id, auswahl: {} });
			}
			for (const m of ['snack1', 'snack2'] as const) {
				if (!frei(datum, m)) continue;
				const g = nimm(snacks, tag);
				if (g) setze({ datum, mahlzeit: m, rezept: g.id, auswahl: {} });
			}
		}
	}

	return [...neu.values()];
}

/**
 * Nach einer Änderung am Abendessen: Mittag am nächsten Tag passend setzen.
 * Gibt den neuen Mittagseintrag zurück oder `null`, wenn nichts zu tun ist.
 */
export function mittagNachAbend(
	abend: PlanEintrag,
	plan: Record<string, PlanEintrag>,
	jetzt = Date.now()
): PlanEintrag | null {
	const datum = addDays(abend.datum, 1);
	const mittag = plan[planKey(datum, 'mittag')];
	if (abend.rezept && abend.reste) {
		// Nur leere Mittage oder frühere Reste überschreiben, nichts von Hand Gewähltes
		if (mittag?.rezept && !mittag.reste) return null;
		if (mittag?.rezept === abend.rezept && mittag.reste) return null;
		return {
			datum,
			mahlzeit: 'mittag',
			rezept: abend.rezept,
			auswahl: abend.auswahl,
			reste: true,
			geaendert: jetzt
		};
	}
	if (mittag?.reste && mittag.rezept)
		return { datum, mahlzeit: 'mittag', rezept: null, reste: false, geaendert: jetzt };
	return null;
}

/**
 * Ein anderes Rezept für eine Mahlzeit. Abendessen behalten ihre Art (Fisch bleibt Fisch),
 * `benutzt` sind Rezepte, die im sichtbaren Zeitraum schon vorkommen.
 */
export function wuerfeln(
	e: PlanEintrag,
	s: Einstellungen,
	gerichte: Gericht[],
	benutzt: Set<string>,
	rng: () => number = Math.random
): { rezept: string; auswahl: Selection } | null {
	const k = kategorieVon(e.mahlzeit);
	const prefs = { veg: s.veg, tm: false };
	const aktuell = e.rezept ? gerichte.find((g) => g.id === e.rezept) : undefined;
	const art: Art = aktuell ? berechne(aktuell, e.auswahl, prefs).art : 'veggie';
	let kandidaten: { g: Gericht; auswahl: Selection }[] = [];
	for (const g of gerichte) {
		if (g.kategorie !== k || g.id === e.rezept) continue;
		if (k === 'abend') {
			const auswahlen = g.recipe
				? selectionsFor(g.recipe, art, s.veg)
				: berechne(g, undefined, prefs).art === art
					? [{}]
					: [];
			if (auswahlen.length) kandidaten.push({ g, auswahl: auswahlen[0] });
		} else kandidaten.push({ g, auswahl: {} });
	}
	const frisch = kandidaten.filter((x) => !benutzt.has(x.g.id));
	if (frisch.length) kandidaten = frisch;
	if (s.gdm) {
		const ok = kandidaten.filter(
			(x) => baseShare(berechne(x.g, x.auswahl, prefs), s.kh[k]) !== null
		);
		if (ok.length) kandidaten = ok;
	}
	const wahl = zufall(kandidaten, rng);
	return wahl ? { rezept: wahl.g.id, auswahl: wahl.auswahl } : null;
}
