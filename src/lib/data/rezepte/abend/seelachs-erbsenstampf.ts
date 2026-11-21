import {
	anrichten,
	fix,
	ing,
	nebenbei,
	one,
	pfanne,
	rezept,
	start,
	tm,
	vor
} from '../../helpers.ts';

const zitroneKraeuter = nebenbei(
	'Zitrone heiß waschen, die Schale fein abreiben und den Saft auspressen. Petersilie waschen und fein hacken.',
	2
);

const fischPfanne = (name: string) =>
	pfanne(
		1,
		`Öl in einer beschichteten Pfanne erhitzen und den ${name} bei mittlerer Hitze je Seite 3–4 Min. braten, bis er innen nicht mehr glasig ist und sich leicht zerpflücken lässt.`,
		7,
		1
	);

const fischVaroma = tm(
	2,
	'Den Varoma-Einlegeboden mit angefeuchtetem Backpapier auslegen, den Fisch darauflegen, leicht salzen und mit etwas Zitronenschale bestreuen. Nach 4 Min. Garzeit den Einlegeboden in den Varoma einsetzen und die restlichen 14 Min. mitgaren, bis der Fisch innen nicht mehr glasig ist und sich leicht zerpflücken lässt.',
	0,
	1.5
);

export default rezept({
	id: 'seelachs-erbsenstampf',
	name: 'Zitronen-Seelachs mit Erbsen-Kartoffel-Stampf',
	kategorie: 'abend',
	beschreibung:
		'Zart gebratener Seelachs mit Zitronenbutter auf einem leuchtend grünen, cremigen Stampf aus Kartoffeln und Erbsen – mild, jodreich und schnell.',
	portionen: 4,
	zutaten: [
		ing(400, 'g', 'TK-Erbsen'),
		ing(100, 'ml', 'Milch'),
		ing(1, 'EL', 'Butter'),
		ing(1, 'EL', 'Rapsöl'),
		ing(1, 'Stk', 'Zitrone', 'unbehandelt'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(1, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		start('Die Erbsen für die letzten 4 Min. mit in den Topf geben.', 0, 0.5, { order: 60 }),
		zitroneKraeuter,
		pfanne(
			3,
			'Hitze ausschalten, 1 TL Butter, Zitronensaft und die Hälfte der Petersilie in die Pfanne geben und kurz aufschäumen lassen.',
			1,
			0.5
		),
		anrichten(
			'Alles abgießen, zurück in den Topf geben und mit Milch, restlicher Butter, der Zitronenschale und 1 Prise Salz mit dem Kartoffelstampfer grob zerstampfen.',
			2,
			{ order: 10 }
		),
		anrichten(
			'Stampf mit {prot} auf Teller verteilen, die Zitronenbutter aus der Pfanne darüberträufeln, mit restlicher Petersilie bestreuen und für Erwachsene pfeffern.',
			1,
			{ order: 20 }
		)
	],
	tmSchritte: [
		start('1 l Wasser im Wasserkocher aufkochen.', 3, 0.5),
		zitroneKraeuter,
		tm(
			1,
			'1000 g heißes Wasser und ½ TL Salz in den Mixtopf füllen, Garkorb einhängen und die Kartoffeln einwiegen. Erbsen in den Varoma-Behälter geben, Varoma aufsetzen und 18 Min./Varoma/Stufe 1 garen.',
			18,
			1
		),
		tm(
			3,
			'Varoma abnehmen und geschlossen beiseitestellen. Garkorb mit dem Spatel herausheben, Wasser abgießen. Inhalt des Garkorbs und die Erbsen mit Milch, Butter, Zitronenschale und 1 Prise Salz in den Mixtopf geben, Rühraufsatz einsetzen und 20 Sek./Stufe 3 grob stampfen.',
			0.5,
			2
		),
		anrichten(
			'Stampf mit {prot} auf Teller verteilen, mit Zitronensaft beträufeln, mit Petersilie bestreuen und für Erwachsene pfeffern.',
			1,
			{ order: 20 }
		)
	],
	slots: [
		one('base', 'Stampf', 'base', 'kartoffeln', [
			{
				id: 'kartoffeln',
				label: 'Kartoffeln',
				items: [ing(700, 'g', 'Kartoffeln', 'festkochend oder vorwiegend festkochend')],
				steps: [
					start(
						'Kartoffeln gründlich waschen, ungeschält in 2 cm große Würfel schneiden, knapp mit Wasser bedecken, ½ TL Salz dazugeben, aufkochen und 12 Min. kochen.',
						15,
						3
					)
				],
				tmSteps: [
					vor('Kartoffeln gründlich waschen und ungeschält in 2 cm große Würfel schneiden.', 3)
				]
			},
			{
				id: 'blumenkohl',
				label: 'Halb Kartoffeln, halb Blumenkohl',
				items: [
					ing(400, 'g', 'Kartoffeln', 'festkochend oder vorwiegend festkochend'),
					ing(400, 'g', 'Blumenkohl')
				],
				steps: [
					start(
						'Kartoffeln gründlich waschen, ungeschält in 2 cm große Würfel schneiden, Blumenkohl in kleine Röschen teilen. Beides knapp mit Wasser bedecken, ½ TL Salz dazugeben, aufkochen und 12 Min. kochen.',
						15,
						4
					)
				],
				tmSteps: [
					vor(
						'Kartoffeln gründlich waschen und ungeschält in 2 cm große Würfel schneiden, Blumenkohl in kleine Röschen teilen (kommt mit in den Garkorb).',
						4
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'seelachs',
			[
				{
					id: 'seelachs',
					label: 'Seelachs',
					items: [ing(600, 'g', 'Seelachsfilet')],
					steps: [
						vor('Seelachs trocken tupfen, in 4 Stücke teilen und leicht salzen.', 1),
						fischPfanne('Seelachs')
					],
					tmSteps: [fischVaroma]
				},
				{
					id: 'kabeljau',
					label: 'Kabeljau',
					items: [ing(600, 'g', 'Kabeljaufilet')],
					steps: [
						vor('Kabeljau trocken tupfen, in 4 Stücke teilen und leicht salzen.', 1),
						fischPfanne('Kabeljau')
					],
					tmSteps: [fischVaroma]
				},
				{
					id: 'tofu',
					label: 'Räuchertofu',
					items: [ing(400, 'g', 'Räuchertofu')],
					steps: [
						pfanne(
							1,
							'Räuchertofu in 8 Scheiben schneiden und in heißem Öl in einer beschichteten Pfanne je Seite 2–3 Min. knusprig braten.',
							5,
							1.5
						)
					]
				},
				{
					id: 'ei',
					label: 'Spiegelei (beidseitig fest)',
					short: 'Spiegeleiern',
					items: [ing(8, 'Stk', 'Ei')],
					steps: [
						pfanne(
							1,
							'Öl in einer großen beschichteten Pfanne erhitzen und die Eier in 2 Portionen braten: je 2 Min. braten, wenden und weitere 2–3 Min. braten, bis Eiweiß und Eigelb ganz fest sind. Die erste Portion warm halten.',
							10,
							1.5
						)
					]
				}
			],
			'tofu'
		)
	],
	kind: 'Fisch vor dem Servieren mit den Fingern auf Gräten prüfen und zerpflücken. Der grüne Stampf ist mild und weich – perfekt für Kinder. Die Kinderportion vor dem Pfeffern abnehmen.',
	mitnehmen:
		'Stampf und Fisch zusammen in eine Box, rasch abkühlen lassen und in den Kühlschrank stellen; Fisch innerhalb von 1 Tag essen. Mit einem Schuss Wasser abgedeckt 2–3 Min. in der Mikrowelle dampfend heiß machen.',
	vorrat:
		'Der Stampf hält 2 Tage im Kühlschrank. TK-Fisch über Nacht im Kühlschrank auftauen lassen und am besten frisch zubereiten.',
	gdm: '„Halb Kartoffeln, halb Blumenkohl“ wählen: Der Stampf bleibt cremig, hat aber deutlich weniger Kohlenhydrate. Die Kartoffelschale liefert zusätzliche Ballaststoffe.',
	tags: ['pfanne'],
	photoAlt:
		'Goldbraun gebratenes Seelachsfilet mit Zitronenbutter und gehackter Petersilie auf einem hellgrünen Erbsen-Kartoffel-Stampf, daneben eine Zitronenspalte'
});
