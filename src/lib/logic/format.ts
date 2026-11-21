import { zutat } from '../data/zutaten/index.ts';
import type { Ingredient } from '../data/types.ts';

const NBSP = ' ';
const FRACTIONS: Record<number, string> = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

/** Rundet auf `step` und schreibt Brüche als ¼, ½, ¾. */
export function fraction(value: number, step: number): string {
	let r = Math.round(value / step) * step;
	if (r <= 0) r = step;
	const whole = Math.floor(r + 1e-9);
	const rest = Math.round((r - whole) * 4) / 4;
	return (whole ? String(whole) : '') + (rest ? FRACTIONS[rest] : '');
}

/** Gramm sinnvoll runden: unter 10 auf 1, unter 100 auf 5, sonst auf 10. */
export function roundGrams(v: number): number {
	if (v < 10) return Math.max(1, Math.round(v));
	if (v < 100) return Math.round(v / 5) * 5;
	return Math.round(v / 10) * 10;
}

const half = (v: number) => Math.max(0.5, Math.round(v * 2) / 2);
const word = (n: number, one: string, many: string) => (n > 1 ? many : one);

/** Menge und Name einer Zutat für `factor`-fache Menge. */
export function formatIngredient(
	it: Ingredient,
	factor: number
): { amount: string; name: string; note?: string } {
	const v = it.amount * (it.fixed ? 1 : factor);
	const z = zutat(it.name);
	let name = it.name;
	let amount: string;
	switch (it.unit) {
		case 'g':
		case 'ml':
			amount = roundGrams(v) + NBSP + it.unit;
			if (z?.plural && it.unit === 'g') name = z.plural;
			break;
		case 'EL':
		case 'TL':
			amount = fraction(v, 0.25) + NBSP + it.unit;
			break;
		case 'Dose': {
			const n = half(v);
			amount = fraction(n, 0.5) + NBSP + word(n, 'Dose', 'Dosen');
			break;
		}
		case 'Hv':
			amount = fraction(v, 0.5) + NBSP + 'Handvoll';
			break;
		case 'Bund':
			amount = fraction(v, 0.5) + NBSP + 'Bund';
			break;
		case 'Prise': {
			const n = Math.max(1, Math.round(v));
			amount = n + NBSP + word(n, 'Prise', 'Prisen');
			break;
		}
		case 'Scheibe': {
			const n = half(v);
			amount = fraction(n, 0.5) + NBSP + word(n, 'Scheibe', 'Scheiben');
			break;
		}
		case 'Zehe': {
			const n = half(v);
			amount = fraction(n, 0.5) + NBSP + word(n, 'Zehe', 'Zehen');
			break;
		}
		default: {
			// Unter einem Stück in Vierteln (¼ Avocado), sonst in Halben
			const n = v < 0.9 ? Math.max(0.25, Math.round(v * 4) / 4) : half(v);
			amount = fraction(n, n < 1 ? 0.25 : 0.5);
			if (n > 1 && z?.plural) name = z.plural;
		}
	}
	return { amount, name, ...(it.note ? { note: it.note } : {}) };
}

export const portionen = (n: number) =>
	`${String(Math.round(n * 2) / 2).replace('.', ',')} ${n === 1 ? 'Portion' : 'Portionen'}`;

/** „a, b und c“ */
export function joinDe(arr: string[]): string {
	if (arr.length <= 1) return arr.join('');
	return arr.slice(0, -1).join(', ') + ' und ' + arr[arr.length - 1];
}

/** Zahl mit deutschem Komma und `digits` Nachkommastellen (ohne überflüssige Nullen). */
export function num(v: number, digits = 1): string {
	const f = 10 ** digits;
	return String(Math.round(v * f) / f).replace('.', ',');
}

/** Broteinheiten (1 BE = 12 g Kohlenhydrate), auf halbe gerundet. */
export const be = (kh: number) => num(Math.round((kh / 12) * 2) / 2);
