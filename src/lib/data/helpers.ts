import type {
	Ingredient,
	MultiSlot,
	Option,
	Phase,
	Recipe,
	Role,
	SingleSlot,
	Step,
	Unit
} from './types.ts';

/** Zutat. `name` muss im Zutatenkatalog stehen. */
export const ing = (amount: number, unit: Unit, name: string, note?: string): Ingredient => ({
	amount,
	unit,
	name,
	...(note ? { note } : {})
});

/** Zutat, deren Menge nicht mit den Portionen wächst (z. B. „1 Prise Salz“). */
export const fix = (amount: number, unit: Unit, name: string, note?: string): Ingredient => ({
	...ing(amount, unit, name, note),
	fixed: true
});

type Extra = { order?: number; wenn?: string };
const step = (phase: Phase, text: string, cook: number, active: number, extra: Extra): Step => ({
	phase,
	text,
	...(cook ? { cook } : {}),
	active,
	...extra
});

/** Wasserkocher/Topf aufsetzen: gart passiv und parallel (z. B. Nudeln, Reis, Kartoffeln). */
export const start = (text: string, cook: number, active = 1, extra: Extra = {}) =>
	step('start', text, cook, active, extra);
/** Schnippeln, bevor Pfanne, Mixtopf oder Ofen loslegen. */
export const vor = (text: string, active = 1, extra: Extra = {}) =>
	step('vorbereiten', text, 0, active, extra);
/** Backofen. `cook` = Ofenzeit, zählt nicht zur Zubereitungszeit. */
export const ofen = (text: string, cook: number, active = 1, extra: Extra = {}) =>
	step('ofen', text, cook, active, extra);
/** Thermomix-Mixtopf, nacheinander nach `order`. */
export const tm = (order: number, text: string, cook: number, active = 1, extra: Extra = {}) =>
	step('tm', text, cook, active, { order, ...extra });
/** Pfanne/Topf am Herd, nacheinander nach `order`. */
export const pfanne = (order: number, text: string, cook: number, active = 1, extra: Extra = {}) =>
	step('pfanne', text, cook, active, { order, ...extra });
/** Nebenbei, während etwas gart. */
export const nebenbei = (text: string, active = 1, extra: Extra = {}) =>
	step('nebenbei', text, 0, active, extra);
/** Sauce oder Dip anrühren. */
export const sauce = (text: string, active = 1, extra: Extra = {}) =>
	step('sauce', text, 0, active, extra);
/** Zum Schluss. */
export const anrichten = (text: string, active = 1, extra: Extra = {}) =>
	step('anrichten', text, 0, active, extra);

/** Auswahl „ohne“ für optionale Slots. */
export const NONE: Option = { id: 'none', label: 'ohne', items: [] };

/** Slot mit genau einer Auswahl. */
export const one = (
	id: string,
	label: string,
	role: Role,
	def: string,
	options: Option[],
	vegDefault?: string
): SingleSlot => ({
	id,
	label,
	role,
	multi: false,
	default: def,
	options,
	...(vegDefault ? { vegDefault } : {})
});

/** Slot mit Mehrfachauswahl. */
export const many = (
	id: string,
	label: string,
	role: Role,
	def: string[],
	options: Option[]
): MultiSlot => ({ id, label, role, multi: true, default: def, options });

/** Kopie einer Option mit eigenen Feldern. */
export const variant = (o: Option, patch: Partial<Option>): Option => ({ ...o, ...patch });

type RecipeInput = Omit<Recipe, 'zutaten' | 'schritte' | 'slots' | 'tags'> &
	Partial<Pick<Recipe, 'zutaten' | 'schritte' | 'slots' | 'tags'>>;

/** Rezept mit Standardwerten für leere Listen. */
export const rezept = (r: RecipeInput): Recipe => ({
	zutaten: [],
	schritte: [],
	slots: [],
	tags: [],
	...r
});
