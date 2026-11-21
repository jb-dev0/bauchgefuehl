/** Datumsangaben als „JJJJ-MM-TT“ in lokaler Zeit. */

const pad = (n: number) => String(n).padStart(2, '0');

export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parse = (s: string) => {
	const [y, m, d] = s.split('-').map(Number);
	return new Date(y, m - 1, d, 12);
};

export const heute = () => iso(new Date());

export const addDays = (s: string, n: number) => {
	const d = parse(s);
	d.setDate(d.getDate() + n);
	return iso(d);
};

/** Montag der Woche, in der `s` liegt. */
export const montag = (s: string) => {
	const d = parse(s);
	const wd = (d.getDay() + 6) % 7;
	d.setDate(d.getDate() - wd);
	return iso(d);
};

/** `n` aufeinanderfolgende Tage ab `start`. */
export const tage = (start: string, n: number) =>
	Array.from({ length: n }, (_, i) => addDays(start, i));

const WOCHENTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const WOCHENTAGE_LANG = [
	'Sonntag',
	'Montag',
	'Dienstag',
	'Mittwoch',
	'Donnerstag',
	'Freitag',
	'Samstag'
];

export const wochentag = (s: string, lang = false) =>
	(lang ? WOCHENTAGE_LANG : WOCHENTAGE)[parse(s).getDay()];

/** „Mo, 24.11.“ */
export const kurz = (s: string) => {
	const d = parse(s);
	return `${wochentag(s)}, ${d.getDate()}.${d.getMonth() + 1}.`;
};

/** „24.11.“ */
export const tagMonat = (s: string) => {
	const d = parse(s);
	return `${d.getDate()}.${d.getMonth() + 1}.`;
};

/** Kalenderwoche nach ISO 8601. */
export function kw(s: string): number {
	const d = parse(s);
	const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	const day = t.getUTCDay() || 7;
	t.setUTCDate(t.getUTCDate() + 4 - day);
	const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
	return Math.ceil(((t.getTime() - y0.getTime()) / 86400000 + 1) / 7);
}
