import { anrichten, fix, ing, one, pfanne, rezept, start, vor } from '../../helpers.ts';

export default rezept({
	id: 'lachs-spinat-pasta',
	name: 'Cremige Lachs-Spinat-Pasta',
	kategorie: 'abend',
	beschreibung:
		'Vollkornnudeln in einer cremigen Frischkäse-Zitronen-Sauce mit zartem Lachs, Babyspinat und Erbsen – in einer guten Viertelstunde auf dem Tisch.',
	portionen: 4,
	zutaten: [
		ing(200, 'g', 'Frischkäse (leicht)'),
		ing(200, 'ml', 'Milch'),
		ing(200, 'g', 'Babyspinat'),
		ing(200, 'g', 'TK-Erbsen'),
		ing(1, 'Stk', 'Zitrone', 'unbehandelt'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(30, 'g', 'Parmesan', 'frisch gerieben'),
		ing(1, 'EL', 'Olivenöl'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Die Erbsen für die letzten 3 Min. mit in den Nudeltopf geben. Vor dem Abgießen eine Tasse Nudelwasser abschöpfen.',
			0,
			0.5,
			{ order: 60 }
		),
		vor(
			'Knoblauch schälen. Zitrone heiß waschen, die Schale fein abreiben und den Saft auspressen. Spinat gründlich waschen und abtropfen lassen.',
			3
		),
		pfanne(
			2,
			'Das restliche Öl in der Pfanne bei mittlerer Hitze erwärmen, den Knoblauch hineinpressen und 30 Sek. andünsten. Milch und Frischkäse dazugeben, glatt rühren und 2 Min. leise köcheln lassen.',
			2.5,
			1
		),
		pfanne(
			3,
			'Spinat in die Sauce geben und 1–2 Min. zusammenfallen lassen. Zitronenschale, 2 EL Zitronensaft, Parmesan und ½ TL Salz unterrühren.',
			2,
			1
		),
		pfanne(
			5,
			'{base}, Erbsen und {prot} unterheben und mit etwas Nudelwasser 1 Min. cremig schwenken, bis alles heiß ist.',
			1,
			1
		),
		anrichten(
			'Auf Teller verteilen, die Kinderportion zuerst, und für Erwachsene mit Pfeffer bestreuen.',
			0.5
		)
	],
	slots: [
		one('base', 'Nudeln', 'base', 'vollkorn', [
			{
				id: 'vollkorn',
				label: 'Vollkornnudeln',
				short: 'Nudeln',
				items: [ing(250, 'g', 'Vollkornnudeln', 'z. B. Penne oder Fusilli')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Nudeln darin nach Packungsangabe 10–12 Min. bissfest garen, dann abgießen.',
						12
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Nudeln',
				items: [ing(250, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Nudeln darin nach Packungsangabe 7–8 Min. bissfest garen, dann abgießen.',
						9
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'lachs',
			[
				{
					id: 'lachs',
					label: 'Lachsfilet',
					short: 'Lachs',
					items: [ing(400, 'g', 'Lachsfilet', 'ohne Haut')],
					steps: [
						pfanne(
							1,
							'Die Hälfte des Öls in einer großen Pfanne erhitzen. Lachs in 2–3 cm große Würfel schneiden und darin 4–5 Min. rundum braten, bis er innen nicht mehr glasig ist. Vorsichtig herausnehmen.',
							5,
							2
						)
					]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(400, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							1,
							'Die Hälfte des Öls in einer großen Pfanne erhitzen. Hähnchen in dünne Streifen schneiden und darin 6 Min. rundum braten, bis es innen nicht mehr rosa ist. Herausnehmen.',
							6,
							2.5
						)
					]
				},
				{
					id: 'bohnen',
					label: 'Weiße Bohnen',
					short: 'Bohnen',
					items: [ing(1, 'Dose', 'weiße Bohnen (Dose)')],
					steps: [vor('Bohnen in einem Sieb abgießen und abspülen.', 0.5)]
				}
			],
			'bohnen'
		)
	],
	ohneTm:
		'Nudeln, Lachs und Sauce sind am Herd in rund einer Viertelstunde fertig; im Mixtopf dauert es länger und der Lachs würde zerfallen.',
	kind: 'Lachs mit den Fingern auf Gräten prüfen und zerpflücken, Nudeln bei Bedarf kleiner schneiden. Die Sauce ist mild und cremig; Pfeffer gibt es nur für die Großen.',
	mitnehmen:
		'In einer Box rasch abkühlen lassen und kühl stellen, mit Lachs innerhalb von 1 Tag essen. Vor dem Aufwärmen 2 EL Milch oder Wasser unterrühren, damit die Sauce wieder cremig wird, und 2–3 Min. in der Mikrowelle dampfend heiß machen.',
	vorrat:
		'Am besten frisch kochen. Spinat kannst du am Vorabend waschen und trocken geschleudert in einer Dose kühl stellen.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornnudeln nehmen oder die Nudelmenge um ein Drittel verringern und dafür mehr Spinat und Erbsen nehmen.',
	tags: ['pasta', 'pfanne'],
	photoAlt:
		'Teller mit Vollkorn-Penne in cremiger heller Zitronen-Frischkäse-Sauce mit zarten Lachsstücken, Spinatblättern und grünen Erbsen, frisch geriebener Parmesan und Zitronenzesten obenauf'
});
