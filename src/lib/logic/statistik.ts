import type { Art, Naehrstoff, Nutrition } from '../data/types.ts';
import { kategorieVon, type Einstellungen } from './einstellungen.ts';
import { berechne, type Gericht } from './gericht.ts';
import type { PlanEintrag } from './plan.ts';
import { NAEHRSTOFFE } from './rezept.ts';

export interface Wochenblick {
	/** Anzahl Abendessen je Art. */
	arten: Record<Art, number>;
	/** Geplante Tage (mit mindestens einer Mahlzeit). */
	tage: number;
	/** Durchschnitt pro Tag für eine Erwachsenen-Portion jeder geplanten Mahlzeit. */
	proTag: Nutrition;
	mikroProTag: Record<Naehrstoff, number>;
	/** Mahlzeiten über der KH-Grenze (Diabetes-Modus). */
	ueberGrenze: number;
}

/**
 * Überblick über eine Woche aus Sicht der Schwangeren: Sie isst von jeder geplanten
 * Mahlzeit eine Erwachsenen-Portion (Snacks eine Portion).
 */
export function wochenblick(
	eintraege: PlanEintrag[],
	s: Einstellungen,
	gericht: (id: string) => Gericht | undefined
): Wochenblick {
	const arten: Record<Art, number> = { veggie: 0, fisch: 0, gefluegel: 0, rind: 0 };
	const summe: Nutrition = { kcal: 0, protein: 0, fett: 0, kh: 0, bst: 0 };
	const mikro: Record<Naehrstoff, number> = { folat: 0, eisen: 0, jod: 0, calcium: 0, omega3: 0 };
	const tage = new Set<string>();
	let ueberGrenze = 0;
	for (const e of eintraege) {
		if (!e.rezept) continue;
		const g = gericht(e.rezept);
		if (!g) continue;
		const r = berechne(g, e.auswahl, { veg: s.veg, tm: false });
		tage.add(e.datum);
		if (e.mahlzeit === 'abend') arten[r.art]++;
		for (const k of Object.keys(summe) as (keyof Nutrition)[]) summe[k] += r.nutrition[k];
		for (const k of Object.keys(mikro) as Naehrstoff[]) mikro[k] += r.mikro[k];
		if (r.nutrition.kh > s.kh[kategorieVon(e.mahlzeit)]) ueberGrenze++;
	}
	const n = Math.max(1, tage.size);
	return {
		arten,
		tage: tage.size,
		proTag: {
			kcal: Math.round(summe.kcal / n / 10) * 10,
			protein: Math.round(summe.protein / n),
			fett: Math.round(summe.fett / n),
			kh: Math.round(summe.kh / n),
			bst: Math.round(summe.bst / n)
		},
		mikroProTag: Object.fromEntries(
			(Object.keys(mikro) as Naehrstoff[]).map((k) => [k, mikro[k] / n])
		) as Record<Naehrstoff, number>,
		ueberGrenze
	};
}

/** Anteil am Tagesbedarf in Prozent (gerundet, höchstens 200). */
export const anteil = (k: Naehrstoff, wert: number) =>
	Math.min(200, Math.round((wert / NAEHRSTOFFE[k].bedarf) * 100));
