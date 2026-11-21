import { plateSvg, farben } from './logic/art.ts';
import { kurz } from './logic/datum.ts';
import { MAHLZEITEN, type Einstellungen } from './logic/einstellungen.ts';
import type { Gruppe } from './logic/einkauf.ts';
import { be, formatIngredient, portionen } from './logic/format.ts';
import type { Gericht, GerichtErgebnis } from './logic/gericht.ts';
import { NAEHRSTOFFE } from './logic/rezept.ts';
import { ART, zeitText } from './logic/text.ts';
import type { PdfBlock, PdfSpec } from './pdf.ts';
import type { PlanEintrag } from './logic/plan.ts';

export const TM_HINWEIS =
	'Thermomix-Angaben sind Richtwerte für TM5, TM6 und TM7. Was knusprig werden soll, bleibt in der Pfanne.';

export function zutatenZeilen(r: GerichtErgebnis, faktor: number) {
	return r.items.map((it) =>
		it.amount === null || !it.unit
			? { amount: '', name: it.name }
			: (() => {
					const f = formatIngredient(
						{ name: it.name, unit: it.unit, amount: it.amount, fixed: it.fixed },
						faktor
					);
					return { amount: f.amount, name: it.note ? `${f.name}, ${it.note}` : f.name };
				})()
	);
}

export function recipeDocument(
	g: Gericht,
	r: GerichtErgebnis,
	p: { portionen: number; s: Einstellungen; gdmText?: string }
): PdfSpec {
	const meta = [portionen(p.portionen), zeitText(r), ART[r.art].label];
	if (r.tm) meta.push('mit Thermomix');
	const n = r.nutrition;
	const notes: string[] = [];
	const rec = g.recipe;
	const kind = rec?.kind ?? g.eigenes?.kind;
	const mitnehmen = rec?.mitnehmen ?? g.eigenes?.mitnehmen;
	if (kind) notes.push('Für das Kind: ' + kind);
	if (mitnehmen) notes.push('Mitnehmen: ' + mitnehmen);
	if (rec?.vorrat) notes.push('Vorbereiten: ' + rec.vorrat);
	if (p.gdmText) notes.push('Blutzucker: ' + p.gdmText);
	if (rec?.hinweis) notes.push(rec.hinweis);
	if (r.tm) notes.push(TM_HINWEIS);
	const blocks: PdfBlock[] = [
		{
			type: 'items',
			title: `Zutaten für ${portionen(p.portionen)}`,
			items: zutatenZeilen(r, p.portionen / g.portionen)
		},
		{ type: 'steps', title: 'Zubereitung', steps: r.steps.filter((x) => x.lines.length) }
	];
	if (notes.length) blocks.push({ type: 'notes', title: 'Gut zu wissen', lines: notes });
	return {
		title: g.name,
		subtitle: g.beschreibung,
		meta: meta.join(' · '),
		art: plateSvg(g.id, farben(r.items)),
		facts: [
			{
				k: 'Pro Portion',
				v: `${n.kcal} kcal, ${n.protein} g Eiweiß, ${n.kh} g Kohlenhydrate (${be(n.kh)} BE), ${n.bst} g Ballaststoffe, ${n.fett} g Fett (geschätzt)`
			},
			...(r.naehrstoffe.length
				? [{ k: 'Gute Quelle', v: r.naehrstoffe.map((k) => NAEHRSTOFFE[k].label).join(', ') }]
				: []),
			...(r.chosen.length
				? [{ k: 'Auswahl', v: r.chosen.map((c) => c.option.label).join(', ') }]
				: [])
		],
		blocks,
		filename: `Bauchgefühl ${g.name}.pdf`
	};
}

export function shoppingDocument(
	titel: string,
	gruppen: Gruppe[],
	extras: { posten: string; menge: string }[],
	erledigt: (key: string) => boolean
): PdfSpec {
	const blocks: PdfBlock[] = [];
	for (const gr of gruppen) {
		const offen = gr.posten.filter((p) => !erledigt(p.key));
		if (offen.length)
			blocks.push({
				type: 'items',
				check: true,
				title: gr.label,
				items: offen.map((p) => ({ amount: '', name: p.menge ? `${p.menge} ${p.name}` : p.name }))
			});
	}
	const extraOffen = extras.filter((e) => !erledigt('extra:' + e.posten));
	if (extraOffen.length)
		blocks.push({
			type: 'items',
			check: true,
			title: 'Außerdem',
			items: extraOffen.map((e) => ({
				amount: '',
				name: e.menge ? `${e.menge} ${e.posten}` : e.posten
			}))
		});
	if (!blocks.length)
		blocks.push({ type: 'notes', title: 'Alles erledigt', lines: ['Nichts mehr offen.'] });
	return {
		title: 'Einkaufsliste',
		subtitle: titel,
		blocks,
		filename: `Bauchgefühl Einkauf ${titel}.pdf`
	};
}

export function planDocument(
	tage: string[],
	store: {
		eintrag: (d: string, m: PlanEintrag['mahlzeit']) => PlanEintrag | undefined;
		gericht: (id: string) => Gericht | undefined;
	},
	s: Einstellungen
): PdfSpec {
	const blocks: PdfBlock[] = tage.map((d) => ({
		type: 'items',
		title: kurz(d),
		items: MAHLZEITEN.filter((m) => s.mahlzeiten[m.id]).map((m) => {
			const e = store.eintrag(d, m.id);
			const g = e?.rezept ? store.gericht(e.rezept) : undefined;
			let name = g?.name ?? '–';
			if (g && m.id === 'mittag' && e?.reste) name += ' (Reste)';
			if (g && m.id === 'abend' && e?.reste) name += ' (+ Mittag)';
			return { amount: m.kurz, name };
		})
	}));
	return {
		title: 'Essensplan',
		subtitle: `${kurz(tage[0])} bis ${kurz(tage[tage.length - 1])}`,
		blocks,
		filename: `Bauchgefühl Plan ${tage[0]}.pdf`
	};
}
