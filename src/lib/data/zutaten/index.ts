import type { Abteilung, Zutat } from '../types.ts';

/**
 * Der Zutatenkatalog besteht aus mehreren Dateien in diesem Ordner
 * (basis.ts und beliebige weitere *.ts mit `export default { … }`).
 * Ein Name darf nur in einer Datei stehen.
 */
const teile = import.meta.glob<{ default: Record<string, Zutat> }>(
	['./*.ts', '!./index.ts', '!./z.ts', '!./*.spec.ts'],
	{ eager: true }
);

export const ZUTATEN: Record<string, Zutat> = {};
/** Name → Datei, nur für den Test auf doppelte Einträge. */
export const HERKUNFT: Record<string, string[]> = {};
for (const [datei, mod] of Object.entries(teile)) {
	for (const [name, zutat] of Object.entries(mod.default)) {
		ZUTATEN[name] = zutat;
		(HERKUNFT[name] ??= []).push(datei);
	}
}

export const zutat = (name: string): Zutat | undefined => ZUTATEN[name];

export const ABTEILUNGEN: { id: Abteilung; label: string }[] = [
	{ id: 'obst-gemuese', label: 'Obst & Gemüse' },
	{ id: 'kraeuter', label: 'Kräuter' },
	{ id: 'brot', label: 'Brot' },
	{ id: 'kuehl', label: 'Kühlregal' },
	{ id: 'fleisch-fisch', label: 'Fleisch & Fisch' },
	{ id: 'tk', label: 'Tiefkühl' },
	{ id: 'trocken', label: 'Nudeln, Getreide & Nüsse' },
	{ id: 'konserven', label: 'Konserven' },
	{ id: 'gewuerze', label: 'Öl, Gewürze & Saucen' },
	{ id: 'sonstiges', label: 'Sonstiges' }
];
