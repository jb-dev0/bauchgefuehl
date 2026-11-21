/**
 * Datenmodell für Rezepte. Mengen gelten immer für `Recipe.portionen` Portionen
 * (Erwachsenen-Portionen; ein Kleinkind isst etwa eine halbe).
 *
 * Nährwerte stehen NICHT im Rezept: Sie werden aus dem Zutatenkatalog
 * (src/lib/data/zutaten/) berechnet. Jeder Zutatenname muss dort vorkommen.
 */

/** Einheiten, wie sie in Zutatenlisten erscheinen. `Hv` = Handvoll. */
export type Unit =
	'g' | 'ml' | 'EL' | 'TL' | 'Stk' | 'Dose' | 'Hv' | 'Bund' | 'Prise' | 'Scheibe' | 'Zehe';

export interface Ingredient {
	amount: number;
	unit: Unit;
	/** Genau der Name aus dem Zutatenkatalog. */
	name: string;
	/** Zusatz in der Zutatenliste, z. B. „gewürfelt“ oder „zum Bestreuen“. */
	note?: string;
	/** Menge skaliert nicht mit den Portionen (z. B. 1 Prise). */
	fixed?: boolean;
}

/** Nährwerte (absolut, nicht pro 100 g). `kh` = Kohlenhydrate, `bst` = Ballaststoffe. */
export interface Nutrition {
	kcal: number;
	protein: number;
	fett: number;
	kh: number;
	bst: number;
}

/** Nährstoffe, die in der Schwangerschaft besonders zählen. */
export type Naehrstoff = 'folat' | 'eisen' | 'jod' | 'calcium' | 'omega3';

/** Eiweißquelle eines Gerichts, bestimmt die Fleisch-/Fisch-/Veggie-Tage im Planer. */
export type Art = 'veggie' | 'fisch' | 'gefluegel' | 'rind';

/**
 * Wo und wann ein Schritt stattfindet. Daraus ergeben sich die Abschnitte der
 * Anleitung (in dieser Reihenfolge) und die Zeit:
 * - `start`: Wasserkocher oder Topf aufsetzen, gart passiv und parallel (z. B. Nudeln)
 * - `vorbereiten`: Schnippeln, BEVOR Pfanne/Mixtopf/Ofen loslegen können
 * - `tm`: Thermomix-Mixtopf, nacheinander nach `order`
 * - `ofen`: Backofen. `cook` = Ofenzeit, zählt NICHT zur Zubereitungszeit
 * - `pfanne`: Pfanne bzw. Topf am Herd, nacheinander nach `order`
 * - `nebenbei`: Schnippeln/Anrühren, während etwas gart
 * - `sauce`: Sauce oder Dip anrühren
 * - `anrichten`: zum Schluss
 */
export type Phase =
	'start' | 'vorbereiten' | 'ofen' | 'tm' | 'pfanne' | 'nebenbei' | 'sauce' | 'anrichten';

export interface Step {
	phase: Phase;
	/**
	 * Text. Platzhalter: `{slotId}` wird durch die gewählten Optionen dieses Slots
	 * ersetzt (Kurzname, mehrere mit „und“), z. B. „{prot} 5 Min. rundum braten.“
	 */
	text: string;
	/** Passive Garzeit in Minuten (Herd, Mixtopf, Ofen). */
	cook?: number;
	/** Aktive Arbeitszeit in Minuten. Standard 1. */
	active?: number;
	/** Reihenfolge innerhalb der Phase (Pfanne, Mixtopf, Anrichten). Standard 50. */
	order?: number;
	/**
	 * Nur anzeigen, wenn ein Slot etwas enthält: `"slotId"` (irgendeine Option außer „ohne“)
	 * oder `"slotId:optionId"` (genau diese Option).
	 */
	wenn?: string;
}

export interface Option {
	id: string;
	/** Name auf dem Auswahl-Chip. */
	label: string;
	/** Kurzname im Fließtext („Hähnchen 5 Min. braten“). Standard: label. */
	short?: string;
	items: Ingredient[];
	steps?: Step[];
	/** Ersatz-Schritte im Thermomix-Modus. */
	tmSteps?: Step[];
}

/**
 * Rolle eines Bausteins:
 * - `base`: Sättigungsbeilage (Reis, Nudeln, Brot …) – wird im Diabetes-Modus angepasst
 * - `main`: Eiweißquelle (Hähnchen, Lachs, Tofu …) – bestimmt die Art des Gerichts
 * - `side`: Gemüse
 * - `sauce`, `top`: Sauce, Toppings
 */
export type Role = 'base' | 'main' | 'side' | 'sauce' | 'top';

interface SlotBase {
	id: string;
	label: string;
	role: Role;
	options: Option[];
}
export interface SingleSlot extends SlotBase {
	multi: false;
	default: string;
	/** Vorauswahl im vegetarischen Modus (wenn `default` nicht vegetarisch ist). */
	vegDefault?: string;
}
export interface MultiSlot extends SlotBase {
	multi: true;
	default: string[];
}
export type Slot = SingleSlot | MultiSlot;

export type Kategorie = 'abend' | 'mittag' | 'snack' | 'fruehstueck';

export type Tag =
	| 'pfanne'
	| 'ofen'
	| 'suppe'
	| 'pasta'
	| 'bowl'
	| 'salat'
	| 'wrap'
	| 'brot'
	| 'suess'
	| 'vorkochen'
	| 'kalt';

export interface Recipe {
	id: string;
	name: string;
	kategorie: Kategorie;
	/** Ein Satz, was das Gericht ausmacht. */
	beschreibung: string;
	/** Für so viele Erwachsenen-Portionen gelten alle Mengen. */
	portionen: number;
	/** Zutaten, die immer dabei sind. */
	zutaten: Ingredient[];
	/** Schritte, die immer dabei sind (Bausteine bringen ggf. eigene mit). */
	schritte: Step[];
	/** Ersatz für `schritte` im Thermomix-Modus. */
	tmSchritte?: Step[];
	/** Warum es keine Thermomix-Fassung gibt (wenn weder Rezept noch Bausteine eine haben). */
	ohneTm?: string;
	/** Tauschbare Bausteine. Feste Rezepte haben meist nur einen (Eiweiß). */
	slots: Slot[];
	/** Tipp für den Teller des Kleinkinds (3 Jahre). Pflicht. */
	kind: string;
	/** Wie es sich am nächsten Tag mitnehmen und aufwärmen lässt. Fehlt = nicht gut mitzunehmen. */
	mitnehmen?: string;
	/** Meal-Prep-Hinweis: Was sich vorbereiten lässt und wie lange es hält. */
	vorrat?: string;
	/** Zusatztipp bei Schwangerschaftsdiabetes. */
	gdm?: string;
	/** Weitere Hinweise (z. B. Lebensmittelsicherheit). */
	hinweis?: string;
	tags: Tag[];
	/** Motivbeschreibung für das Foto, siehe BILDPROMPTS.md. */
	photoAlt: string;
}

/** Gewählte Optionen eines Rezepts: Slot-ID → Option-ID(s). */
export type Selection = Record<string, string | string[]>;

/* ---------- Zutatenkatalog ---------- */

/** Abteilungen im Supermarkt, in dieser Reihenfolge auf dem Einkaufszettel. */
export type Abteilung =
	| 'obst-gemuese'
	| 'kraeuter'
	| 'brot'
	| 'kuehl'
	| 'fleisch-fisch'
	| 'tk'
	| 'trocken'
	| 'konserven'
	| 'gewuerze'
	| 'sonstiges';

export interface Zutat {
	abteilung: Abteilung;
	/** Pluralform für Stückangaben, z. B. „Zwiebeln“. */
	plural?: string;
	/** Nährwerte pro 100 g: [kcal, Protein, Fett, Kohlenhydrate, Ballaststoffe]. */
	n: [number, number, number, number, number];
	/**
	 * Gewicht in g für andere Einheiten als g/ml (ml zählt wie g, außer `ml` ist angegeben).
	 * Beispiel Ei: { Stk: 60 }, Olivenöl: { EL: 10, TL: 4 }.
	 */
	g?: Partial<Record<Unit, number>>;
	/** Mikronährstoffe pro 100 g (nur wenn nennenswert): Folat µg, Eisen mg, Jod µg, Calcium mg, Omega-3 (EPA+DHA) mg. */
	m?: Partial<Record<Naehrstoff, number>>;
	/** Eiweißquelle, wenn nicht vegetarisch. */
	art?: Exclude<Art, 'veggie'>;
	/** Farbe für die gezeichnete Ersatzgrafik (nur für prägende Zutaten). */
	farbe?: string;
}
