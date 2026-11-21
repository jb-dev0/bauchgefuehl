import type { Kategorie, Recipe } from '../types.ts';

/**
 * Alle Rezepte: eine Datei pro Rezept in abend/, mittag/, snack/, fruehstueck/,
 * jeweils mit `export default rezept({ … })`. Dateiname = Rezept-ID.
 */
const module = import.meta.glob<{ default: Recipe }>('./*/*.ts', { eager: true });

/** Datei → Rezept, für Tests (ID = Dateiname, Kategorie = Ordner). */
export const DATEIEN: Record<string, Recipe> = Object.fromEntries(
	Object.entries(module).map(([pfad, mod]) => [pfad, mod.default])
);

const collator = new Intl.Collator('de');
export const REZEPTE: Recipe[] = Object.values(DATEIEN).sort((a, b) =>
	collator.compare(a.name, b.name)
);

const byId = new Map(REZEPTE.map((r) => [r.id, r]));
export const rezeptById = (id: string): Recipe | undefined => byId.get(id);

export const KATEGORIEN: { id: Kategorie; label: string; plural: string }[] = [
	{ id: 'abend', label: 'Abendessen', plural: 'Abendessen' },
	{ id: 'mittag', label: 'Mittagessen', plural: 'Mittagessen' },
	{ id: 'snack', label: 'Snack', plural: 'Snacks' },
	{ id: 'fruehstueck', label: 'Frühstück', plural: 'Frühstück' }
];

export const nachKategorie = (k: Kategorie) => REZEPTE.filter((r) => r.kategorie === k);
