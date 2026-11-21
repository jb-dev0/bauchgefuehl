import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const petersilie = nebenbei('Petersilie waschen, trocken schütteln und fein hacken.', 1);
const teller = anrichten(
	'{base} auf Teller verteilen und {prot} mit der Tomaten-Oliven-Sauce darauf anrichten. Mit Petersilie bestreuen und mit etwas Zitronensaft beträufeln.',
	1.5,
	{ order: 10 }
);

/** Fisch: in der Pfanne gar ziehen lassen, im Thermomix im Varoma dämpfen. */
const fisch = (id: string, label: string, name: string, kurz: string) => ({
	id,
	label,
	short: kurz,
	items: [ing(600, 'g', name, '4 Stücke')],
	steps: [
		vor(`${kurz} trocken tupfen und leicht salzen.`, 1, { order: 60 }),
		pfanne(
			3,
			`${kurz} in die Sauce legen, mit etwas Sauce bedecken und zugedeckt bei kleiner Hitze 8–10 Min. gar ziehen lassen, bis er innen nicht mehr glasig ist und sich in Lamellen teilen lässt.`,
			9,
			0.5
		)
	],
	tmSteps: [
		vor(
			`${kurz} trocken tupfen, leicht salzen und auf ein Stück Backpapier in den Varoma-Behälter legen (einige Schlitze frei lassen).`,
			1.5,
			{ order: 60 }
		),
		tm(4, 'Varoma verschließen und aufsetzen.', 0, 0.5),
		tm(
			6,
			`Prüfen, ob der ${kurz} innen nicht mehr glasig ist (sonst 2–3 Min./Varoma weiterdämpfen), dann vorsichtig in die Sauce legen.`,
			0,
			1
		)
	]
});

export default rezept({
	id: 'kabeljau-tomate',
	name: 'Kabeljau in Tomaten-Oliven-Sauce mit Bulgur',
	kategorie: 'abend',
	beschreibung:
		'Zarter Kabeljau gart direkt in einer mediterranen Sauce aus Tomaten, Paprika und Oliven, dazu lockerer Bulgur.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(2, 'EL', 'Olivenöl'),
		ing(2, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(60, 'g', 'schwarze Oliven', 'entsteint, in Ringen'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(1, 'EL', 'Zitronensaft')
	],
	schritte: [
		vor('Zwiebel und Knoblauch fein würfeln, Paprika entkernen und klein würfeln.', 4),
		pfanne(
			1,
			'Olivenöl in einer großen, tiefen Pfanne erhitzen, Zwiebel, Knoblauch und Paprika 3 Min. andünsten.',
			3,
			0.5
		),
		pfanne(
			2,
			'Tomaten, Oliven, Oregano, Salz und Pfeffer dazugeben und aufkochen lassen.',
			2,
			0.5
		),
		petersilie,
		teller
	],
	tmSchritte: [
		vor('Paprika entkernen und grob würfeln.', 1.5),
		tm(
			1,
			'Zwiebel halbieren, mit Knoblauch und Paprika in den Mixtopf geben, 4 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Olivenöl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(3, 'Tomaten, Oliven, Oregano, Salz und Pfeffer zugeben.', 0, 0.5),
		tm(5, '15 Min./Varoma/Linkslauf/Stufe 1 garen.', 15, 0.5),
		petersilie,
		teller
	],
	slots: [
		one('base', 'Beilage', 'base', 'bulgur', [
			{
				id: 'bulgur',
				label: 'Bulgur',
				items: [ing(160, 'g', 'Bulgur')],
				steps: [
					start(
						'Bulgur mit 320 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleinster Hitze 10 Min. quellen lassen.',
						12
					)
				]
			},
			{
				id: 'couscous',
				label: 'Vollkorn-Couscous',
				short: 'Couscous',
				items: [ing(160, 'g', 'Vollkorn-Couscous')],
				steps: [
					start(
						'Couscous mit 320 ml kochendem Wasser und 1 Prise Salz übergießen und zugedeckt 5 Min. quellen lassen, dann auflockern.',
						6
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'kabeljau',
			[
				fisch('kabeljau', 'Kabeljaufilet', 'Kabeljaufilet', 'Kabeljau'),
				fisch('seelachs', 'Seelachsfilet', 'Seelachsfilet', 'Seelachs'),
				{
					id: 'kichererbsen',
					label: 'Kichererbsen & Feta',
					short: 'Kichererbsen',
					items: [ing(2, 'Dose', 'Kichererbsen (Dose)'), ing(150, 'g', 'Feta')],
					steps: [
						vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 60 }),
						pfanne(3, 'Kichererbsen in die Sauce rühren und zugedeckt 8 Min. köcheln lassen.', 8, 0.5),
						anrichten('Feta darüberbröseln.', 0.5, { order: 20 })
					],
					tmSteps: [
						vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 60 }),
						tm(4, 'Kichererbsen zugeben.', 0, 0.5),
						anrichten('Feta darüberbröseln.', 0.5, { order: 20 })
					]
				}
			],
			'kichererbsen'
		)
	],
	kind: 'Fisch sorgfältig auf Gräten prüfen, zerpflücken und mit Sauce und Bulgur vermischen. Oliven für das Kind sehr fein hacken oder weglassen (salzig und rutschig). Kichererbsen leicht zerdrücken, Feta nur sparsam.',
	mitnehmen:
		'Rasch abkühlen, in eine Box füllen und innerhalb von 1–2 Tagen essen. Den Fisch vorher zerteilen und alles in der Mikrowelle 2–3 Min. dampfend heiß erhitzen.',
	vorrat:
		'Die Tomaten-Oliven-Sauce lässt sich verdoppeln: Die zweite Hälfte hält 3 Tage im Kühlschrank oder lässt sich einfrieren. Beim nächsten Mal nur noch Fisch darin garen.',
	gdm: 'Den Bulgur etwas reduzieren und dafür mehr Gemüse in die Sauce geben (z. B. eine Zucchini). Fisch und Olivenöl liefern Eiweiß und gutes Fett, die den Blutzucker stabil halten.',
	tags: ['pfanne'],
	photoAlt:
		'Weiße Kabeljaustücke in einer tiefen Pfanne mit stückiger Tomaten-Paprika-Sauce und schwarzen Olivenringen, bestreut mit Petersilie, daneben eine Schale lockerer Bulgur'
});
