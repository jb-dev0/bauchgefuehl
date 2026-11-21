import type { Kategorie } from '../types.ts';

/**
 * Inhaltliche Regeln für alle Rezepte. Die Tests in rezepte.spec.ts prüfen sie
 * für jede Kombination aus Vegetarisch- und Thermomix-Modus.
 */

/** Höchstzeit in Minuten (ohne passive Ofenzeit) und Zielzeit. */
export const ZEIT: Record<Kategorie, { max: number; ziel: number }> = {
	abend: { max: 30, ziel: 20 },
	mittag: { max: 30, ziel: 20 },
	fruehstueck: { max: 20, ziel: 10 },
	snack: { max: 15, ziel: 5 }
};

/** Richtwerte pro Erwachsenen-Portion für einen stabilen Blutzucker. */
export const NAEHRWERT_REGELN: Record<
	Kategorie,
	{ proteinMin: number; bstMin: number; khMax: number; kcal: [number, number] }
> = {
	abend: { proteinMin: 20, bstMin: 7, khMax: 65, kcal: [350, 850] },
	mittag: { proteinMin: 20, bstMin: 7, khMax: 65, kcal: [350, 850] },
	fruehstueck: { proteinMin: 14, bstMin: 5, khMax: 45, kcal: [250, 600] },
	snack: { proteinMin: 6, bstMin: 2, khMax: 25, kcal: [80, 320] }
};

/**
 * Was in keinem Rezept vorkommen darf: kein Schwein, nichts, was in der
 * Schwangerschaft gemieden werden sollte (Listerien, Toxoplasmen, Salmonellen,
 * Quecksilber, Alkohol, Koffein, Lakritz), und nichts, woran ein Dreijähriges
 * sich leicht verschluckt (ganze Nüsse).
 */
export const VERBOTEN: { muster: RegExp; grund: string }[] = [
	{
		muster:
			/schwein|speck|schinken|salami|chorizo|mett\b|leberwurst|kassler|bacon|pancetta|lardo|wiener|bockwurst|frikadelle/i,
		grund: 'kein Schweinefleisch'
	},
	{ muster: /leber/i, grund: 'Leber (zu viel Vitamin A)' },
	{
		muster:
			/rohmilch|\bbrie\b|camembert|gorgonzola|roquefort|blauschimmel|weichkäse|harzer|limburger/i,
		grund: 'Listerien-Risiko (Rohmilch-/Weichkäse)'
	},
	{
		muster:
			/räucher(lachs|fisch|forelle|makrele)|graved|gebeizt|sushi|ceviche|tatar|carpaccio|matjes|bismarck|rollmops/i,
		grund: 'roher oder geräucherter Fisch'
	},
	{
		muster:
			/thunfisch|schwertfisch|haifisch|\bhai\b|marlin|\baal\b|hecht|heilbutt|makrele|königsmakrele/i,
		grund: 'Quecksilber-Risiko'
	},
	{ muster: /muschel|auster/i, grund: 'Meeresfrüchte mit Infektionsrisiko' },
	{ muster: /sprossen|keimling|kresse/i, grund: 'Keim-Risiko' },
	{ muster: /mayonnaise|aioli|tiramisu|rohes ei/i, grund: 'rohe Eier' },
	{
		muster: /\bwein\b|weißwein|rotwein|\bbier\b|\brum\b|likör|alkohol|sherry|marsala|portwein/i,
		grund: 'Alkohol'
	},
	{ muster: /kaffee|espresso|matcha|grüner tee|schwarzer tee|energy|cola/i, grund: 'Koffein' },
	{ muster: /lakritz|süßholz/i, grund: 'Süßholz' },
	{
		muster:
			/(?<!ohne )(?<!ohne zugesetzten )(?<!blut)zucker(?!schote|zusatz)|sirup|agave|dattel|nutella|schokocreme|marmelade|konfitüre/i,
		grund: 'zugesetzter Zucker'
	},
	{
		muster: /vorgeschnittene|abgepackter salat|salatmischung/i,
		grund: 'Listerien-Risiko (vorgeschnittener Salat)'
	}
];

/** Nüsse nur gemahlen oder als Mus (ganze Nüsse: Verschluckungsgefahr für Kleinkinder). */
export const NUSS = /(?<!muskat)nuss|nüsse|mandel|cashew|pistazie|macadamia|pinienkern|pekan/i;
export const NUSS_OK = /gemahlen|mus\b|mus$/i;
