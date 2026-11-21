import {
	anrichten,
	fix,
	ing,
	many,
	nebenbei,
	one,
	pfanne,
	rezept,
	sauce,
	start,
	tm,
	vor
} from '../../helpers.ts';

const wuerze = vor(
	'Für die Gyros-Würze Paprikapulver, Oregano, Kreuzkümmel, 1 gepresste Knoblauchzehe, Zitronensaft, ½ TL Salz und 1 EL Öl in einer Schüssel verrühren.',
	1.5
);

const servieren = [
	anrichten('Bowls mit {base} als Grundlage anrichten und {prot} daraufgeben.', 0.5, { order: 10 }),
	anrichten('{gemuese} daneben anrichten.', 0.5, { order: 20, wenn: 'gemuese' }),
	anrichten('Mit einem großen Klecks Tzatziki servieren.', 0.5, { order: 30 })
];

export default rezept({
	id: 'gyros-bowl',
	name: 'Hähnchen-Gyros-Bowl mit Tzatziki',
	kategorie: 'abend',
	beschreibung:
		'Würzig gebratene Gyros-Streifen auf Bulgur mit knackiger Gurke, Tomate und Paprika und einem cremigen Skyr-Tzatziki.',
	portionen: 4,
	zutaten: [
		ing(2, 'TL', 'Paprikapulver (edelsüß)'),
		ing(2, 'TL', 'Oregano (getrocknet)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(2, 'EL', 'Olivenöl'),
		ing(0.5, 'TL', 'Jodsalz'),
		ing(200, 'g', 'Skyr'),
		ing(150, 'g', 'Naturjoghurt'),
		ing(0.25, 'Stk', 'Salatgurke', 'für das Tzatziki'),
		ing(1, 'EL', 'Dill', 'gehackt, oder TK')
	],
	schritte: [
		wuerze,
		sauce(
			'Für das Tzatziki die Gurke grob raspeln und mit den Händen gut ausdrücken. Mit Skyr, Joghurt, der zweiten gepressten Knoblauchzehe, Dill, 1 EL Öl und 1 Prise Salz verrühren.',
			3
		),
		...servieren
	],
	tmSchritte: [
		wuerze,
		tm(
			1,
			'Für das Tzatziki die zweite Knoblauchzehe, die Gurke in Stücken und den Dill in den Mixtopf geben und 4 Sek./Stufe 5 zerkleinern. In ein Sieb geben und gut ausdrücken.',
			0.5,
			1.5
		),
		tm(
			2,
			'Gurke zurück in den Mixtopf geben, Skyr, Joghurt, 1 EL Öl und 1 Prise Salz zugeben und 10 Sek./Linkslauf/Stufe 3 verrühren. In eine Schale umfüllen.',
			0.5,
			0.5
		),
		...servieren
	],
	slots: [
		one('base', 'Grundlage', 'base', 'bulgur', [
			{
				id: 'bulgur',
				label: 'Bulgur',
				items: [ing(200, 'g', 'Bulgur')],
				steps: [
					start(
						'Bulgur mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 10 Min. quellen lassen.',
						12
					)
				]
			},
			{
				id: 'couscous',
				label: 'Vollkorn-Couscous',
				short: 'Couscous',
				items: [ing(200, 'g', 'Vollkorn-Couscous')],
				steps: [
					start(
						'Couscous mit 1 Prise Salz in eine Schüssel geben, mit 300 ml kochendem Wasser aus dem Wasserkocher übergießen und zugedeckt 5 Min. quellen lassen.',
						5
					)
				]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'Pitastreifen',
				items: [ing(4, 'Stk', 'Vollkorn-Pita')],
				steps: [
					nebenbei(
						'Pita im Toaster oder in einer trockenen Pfanne aufbacken und in Streifen schneiden.',
						1
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'haehnchen',
			[
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'das Hähnchen',
					items: [ing(500, 'g', 'Hähnchenbrustfilet')],
					steps: [
						vor('Hähnchen in dünne Streifen schneiden und in der Gyros-Würze wenden.', 3),
						pfanne(
							1,
							'Eine große Pfanne ohne weiteres Öl stark erhitzen und das Hähnchen darin 6–7 Min. braten, bis es gebräunt und innen nicht mehr rosa ist.',
							7,
							1
						)
					]
				},
				{
					id: 'kichererbsen',
					label: 'Gyros-Kichererbsen',
					short: 'die Kichererbsen',
					items: [ing(2, 'Dose', 'Kichererbsen (Dose)')],
					steps: [
						vor(
							'Kichererbsen abgießen, abspülen, mit Küchenpapier gut trocken tupfen und in der Gyros-Würze wenden.',
							2
						),
						pfanne(
							1,
							'Kichererbsen in einer großen Pfanne bei mittlerer bis starker Hitze 8 Min. rösten und dabei öfter schwenken, bis sie leicht knusprig sind.',
							8,
							1
						)
					]
				},
				{
					id: 'halloumi',
					label: 'Halloumi',
					short: 'den Halloumi',
					items: [ing(250, 'g', 'Halloumi')],
					steps: [
						vor(
							'Halloumi in 1 cm dicke Scheiben schneiden und mit der Gyros-Würze bestreichen.',
							1.5
						),
						pfanne(
							1,
							'Halloumi in einer großen Pfanne bei mittlerer Hitze je Seite 2 Min. goldbraun braten.',
							4,
							1
						)
					]
				}
			],
			'kichererbsen'
		),
		many(
			'gemuese',
			'Gemüse',
			'side',
			['gurke', 'tomate', 'paprika'],
			[
				{
					id: 'gurke',
					label: 'Gurke',
					items: [ing(0.5, 'Stk', 'Salatgurke')],
					steps: [nebenbei('Gurke würfeln.', 1)]
				},
				{
					id: 'tomate',
					label: 'Tomaten',
					items: [ing(3, 'Stk', 'Tomate')],
					steps: [nebenbei('Tomaten würfeln.', 1.5)]
				},
				{
					id: 'paprika',
					label: 'Paprika',
					items: [ing(1, 'Stk', 'rote Paprika')],
					steps: [nebenbei('Paprika würfeln.', 1.5)]
				},
				{
					id: 'zwiebel',
					label: 'rote Zwiebel (für Erwachsene)',
					short: 'Zwiebelringe',
					items: [ing(0.5, 'Stk', 'rote Zwiebel')],
					steps: [nebenbei('Zwiebel in sehr feine Ringe schneiden.', 1)]
				}
			]
		),
		many(
			'top',
			'Topping',
			'top',
			[],
			[
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					items: [fix(1, 'TL', 'Chiliflocken')],
					steps: [anrichten('Für Erwachsene mit Chiliflocken bestreuen.', 0.5, { order: 40 })]
				}
			]
		)
	],
	kind: 'Hähnchen oder Halloumi in kleine Stücke schneiden, Gyros-Kichererbsen leicht zerdrücken – ganz sind sie für Dreijährige zu riskant. Gemüse klein würfeln, rote Zwiebel und Chili weglassen. Das Tzatziki macht alles schön mild.',
	mitnehmen:
		'Grundlage und Gyros zusammen in eine Box, Gemüse und Tzatziki getrennt kalt in eine zweite Dose. Die warme Box 2–3 Min. in der Mikrowelle dampfend heiß machen, dann Gemüse und Tzatziki dazu.',
	vorrat:
		'Tzatziki und Bulgur halten 2 Tage im Kühlschrank. Das Hähnchen kannst du morgens schon in die Gyros-Würze legen (abgedeckt im Kühlschrank), dann zieht sie besser ein.',
	gdm: 'Den Bulgur halbieren und dafür mehr Gurke, Tomate und Paprika nehmen. Das Skyr-Tzatziki bringt viel Eiweiß und darf großzügig ausfallen.',
	tags: ['bowl', 'pfanne'],
	photoAlt:
		'Bowl mit Bulgur, knusprig gebratenen Gyros-Hähnchenstreifen, Gurken-, Tomaten- und Paprikawürfeln und einem großen Klecks Tzatziki mit Dill, daneben eine Zitronenspalte'
});
