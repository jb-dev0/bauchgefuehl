import type { Abteilung, Zutat } from '../types.ts';

/** Katalogeintrag. `n` = [kcal, Protein, Fett, Kohlenhydrate, Ballaststoffe] pro 100 g. */
export const z = (
	abteilung: Abteilung,
	n: Zutat['n'],
	extra: Omit<Zutat, 'abteilung' | 'n'> = {}
): Zutat => ({ abteilung, n, ...extra });
