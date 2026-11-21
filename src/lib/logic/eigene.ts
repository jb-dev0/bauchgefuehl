import type { Art, Kategorie, Nutrition, Unit } from '../data/types.ts';
import { ZUTATEN } from '../data/zutaten/index.ts';

/** Eine Zutat in einem eigenen Rezept. Ohne Menge z. B. „Salz“. */
export interface EigeneZutat {
	menge: number | null;
	einheit: Unit | null;
	name: string;
}

/** Ein eigenes Rezept, gespeichert im Haushalt (PocketBase) bzw. auf dem Gerät. */
export interface EigenesRezept {
	id: string;
	titel: string;
	kategorie: Kategorie;
	beschreibung: string;
	portionen: number;
	/** Zubereitungszeit ohne Ofen. */
	minuten: number;
	/** Passive Ofenzeit. */
	ofen: number;
	zutaten: EigeneZutat[];
	schritte: string[];
	/** Optional: Schritte für den Thermomix. */
	tmSchritte: string[];
	/** `null` = aus den Zutaten bestimmen. */
	art: Art | null;
	mitnehmen: string;
	kind: string;
	notiz: string;
	/** Nährwerte pro Portion, wenn von Hand eingetragen; sonst aus den Zutaten geschätzt. */
	naehrwerte: Nutrition | null;
	/** Dateiname des Fotos auf dem Server. */
	foto: string;
	geaendert: number;
}

export const EIGEN_PREFIX = 'eigen:';
export const istEigen = (id: string) => id.startsWith(EIGEN_PREFIX);
export const eigenId = (id: string) => id.slice(EIGEN_PREFIX.length);

export function neuesRezept(id: string, kategorie: Kategorie = 'abend'): EigenesRezept {
	return {
		id,
		titel: '',
		kategorie,
		beschreibung: '',
		portionen: kategorie === 'abend' ? 4 : kategorie === 'snack' ? 1 : 2,
		minuten: 20,
		ofen: 0,
		zutaten: [],
		schritte: [],
		tmSchritte: [],
		art: null,
		mitnehmen: '',
		kind: '',
		notiz: '',
		naehrwerte: null,
		foto: '',
		geaendert: Date.now()
	};
}

const EINHEITEN: [RegExp, Unit, number][] = [
	[/^(kg|kilo)$/i, 'g', 1000],
	[/^(g|gr|gramm)$/i, 'g', 1],
	[/^(l|liter)$/i, 'ml', 1000],
	[/^(ml|milliliter)$/i, 'ml', 1],
	[/^(el|essl(ö|oe)ffel)$/i, 'EL', 1],
	[/^(tl|teel(ö|oe)ffel)$/i, 'TL', 1],
	[/^(stk|st(ü|ue)ck)\.?$/i, 'Stk', 1],
	[/^(dose|dosen)$/i, 'Dose', 1],
	[/^(handvoll|hv)$/i, 'Hv', 1],
	[/^bund$/i, 'Bund', 1],
	[/^(prise|prisen)$/i, 'Prise', 1],
	[/^(scheibe|scheiben)$/i, 'Scheibe', 1],
	[/^(zehe|zehen)$/i, 'Zehe', 1]
];

const BRUECHE: Record<string, number> = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 };

function zahl(s: string): number | null {
	const t = s.trim();
	if (!t) return null;
	let m = t.match(/^(\d+)?\s*([½¼¾⅓⅔])$/);
	if (m) return (m[1] ? Number(m[1]) : 0) + BRUECHE[m[2]];
	m = t.match(/^(\d+)\/(\d+)$/);
	if (m) return Number(m[1]) / Number(m[2]);
	m = t.match(/^(\d+)\s+(\d+)\/(\d+)$/);
	if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
	const n = Number(t.replace(',', '.'));
	return Number.isFinite(n) ? n : null;
}

const norm = (s: string) =>
	s
		.toLowerCase()
		.replace(/ä/g, 'ae')
		.replace(/ö/g, 'oe')
		.replace(/ü/g, 'ue')
		.replace(/ß/g, 'ss')
		.replace(/[^a-z0-9]/g, '');

const INDEX: Map<string, string> = (() => {
	const m = new Map<string, string>();
	for (const [name, z] of Object.entries(ZUTATEN)) {
		m.set(norm(name), name);
		if (z.plural) m.set(norm(z.plural), name);
	}
	return m;
})();

/** Alltagsnamen, die anders im Katalog stehen. */
const ALIAS: Record<string, string> = {
	salz: 'Jodsalz',
	meersalz: 'Jodsalz',
	oel: 'Rapsöl',
	speiseoel: 'Rapsöl',
	sonnenblumenoel: 'Rapsöl',
	knoblauchzehe: 'Knoblauch',
	knoblauchzehen: 'Knoblauch',
	paprika: 'rote Paprika',
	paprikaschote: 'rote Paprika',
	gurke: 'Salatgurke',
	spinat: 'Babyspinat',
	joghurt: 'Naturjoghurt',
	quark: 'Magerquark',
	sahne: 'Kochsahne (15 %)',
	hackfleisch: 'Rinderhack',
	haehnchen: 'Hähnchenbrustfilet',
	haehnchenbrust: 'Hähnchenbrustfilet',
	lachs: 'Lachsfilet',
	nudeln: 'Vollkornnudeln',
	spaghetti: 'Vollkornspaghetti',
	tomatenausderdose: 'gehackte Tomaten (Dose)',
	dosentomaten: 'gehackte Tomaten (Dose)',
	kichererbsen: 'Kichererbsen (Dose)',
	mehl: 'Vollkornmehl',
	eier: 'Ei',
	brot: 'Vollkornbrot',
	tofu: 'Tofu natur',
	bruehe: 'Gemüsebrühe',
	gemuesebruehe: 'Gemüsebrühe'
};

/** Katalogname zu einer frei eingegebenen Zutat, sonst `null`. */
export function katalogName(name: string): string | null {
	const n = norm(name);
	if (!n) return null;
	const exact = INDEX.get(n) ?? ALIAS[n];
	if (exact) return exact;
	// „frische Petersilie“, „Hähnchenbrustfilets“: der längste Katalogname, der im Text steckt
	let best: string | null = null;
	let bestLen = 0;
	for (const [k, v] of INDEX) {
		if (k.length < 4) continue;
		const passt = n.includes(k) || (n.length >= 5 && k.startsWith(n));
		if (passt && k.length > bestLen) {
			best = v;
			bestLen = k.length;
		}
	}
	if (best) return best;
	for (const [k, v] of Object.entries(ALIAS)) if (n.endsWith(k) && k.length >= 4) return v;
	return null;
}

/** „200 g Hähnchenbrust“, „2 EL Olivenöl“, „1 Zwiebel“, „Salz“ → EigeneZutat. */
export function parseZutat(zeile: string): EigeneZutat | null {
	const t = zeile
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/^[-–•*]\s*/, '');
	if (!t) return null;
	const m = t.match(/^((?:\d+\s+)?\d+(?:[.,]\d+)?(?:\/\d+)?|\d*\s*[½¼¾⅓⅔])\s*(.*)$/);
	if (!m) return { menge: null, einheit: null, name: t };
	let menge = zahl(m[1]);
	let rest = m[2];
	let einheit: Unit | null = null;
	const [wort, ...rest2] = rest.split(' ');
	const e = EINHEITEN.find(([re]) => re.test(wort.replace(/\.$/, '')));
	// „500g Mehl“ ohne Leerzeichen
	const klebt = wort.match(/^(kg|g|ml|l)$/i) ? null : wort.match(/^(\d+)?(kg|g|ml|l)$/i);
	if (e) {
		einheit = e[1];
		if (menge !== null) menge *= e[2];
		rest = rest2.join(' ');
	} else if (klebt) {
		einheit = /l$/i.test(klebt[2]) ? 'ml' : 'g';
		rest = rest2.join(' ');
	} else einheit = 'Stk';
	return { menge, einheit, name: rest.trim() || t };
}

export const zutatText = (z: EigeneZutat) =>
	[
		z.menge !== null ? String(z.menge).replace('.', ',') : '',
		z.einheit && z.einheit !== 'Stk' ? z.einheit : '',
		z.name
	]
		.filter(Boolean)
		.join(' ');

/** Prüft und vervollständigt ein Rezept aus unbekannten Daten (Speicher, Server). */
export function bereinigeEigenes(raw: unknown): EigenesRezept | null {
	if (typeof raw !== 'object' || raw === null) return null;
	const r = raw as Record<string, unknown>;
	if (typeof r.id !== 'string' || !r.id) return null;
	const basis = neuesRezept(r.id);
	const kat = ['abend', 'mittag', 'snack', 'fruehstueck'].includes(r.kategorie as string)
		? (r.kategorie as Kategorie)
		: 'abend';
	const str = (v: unknown) => (typeof v === 'string' ? v : '');
	const num = (v: unknown, d: number) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
	const strs = (v: unknown) =>
		Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
	const zutaten = Array.isArray(r.zutaten)
		? r.zutaten
				.filter((z): z is Record<string, unknown> => typeof z === 'object' && z !== null)
				.map((z) => ({
					menge: typeof z.menge === 'number' ? z.menge : null,
					einheit: typeof z.einheit === 'string' ? (z.einheit as Unit) : null,
					name: str(z.name)
				}))
				.filter((z) => z.name)
		: [];
	const nw = r.naehrwerte as Record<string, unknown> | null;
	const naehrwerte =
		nw && typeof nw === 'object'
			? {
					kcal: num(nw.kcal, 0),
					protein: num(nw.protein, 0),
					fett: num(nw.fett, 0),
					kh: num(nw.kh, 0),
					bst: num(nw.bst, 0)
				}
			: null;
	const arten = ['veggie', 'fisch', 'gefluegel', 'rind'];
	return {
		...basis,
		titel: str(r.titel),
		kategorie: kat,
		beschreibung: str(r.beschreibung),
		portionen: Math.max(1, num(r.portionen, basis.portionen)),
		minuten: Math.max(0, num(r.minuten, basis.minuten)),
		ofen: Math.max(0, num(r.ofen, 0)),
		zutaten,
		schritte: strs(r.schritte),
		tmSchritte: strs(r.tmSchritte),
		art: arten.includes(r.art as string) ? (r.art as Art) : null,
		mitnehmen: str(r.mitnehmen),
		kind: str(r.kind),
		notiz: str(r.notiz),
		naehrwerte,
		foto: str(r.foto),
		geaendert: num(r.geaendert, 0)
	};
}
