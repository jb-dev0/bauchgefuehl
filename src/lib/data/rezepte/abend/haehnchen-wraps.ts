import { anrichten, fix, ing, many, nebenbei, one, pfanne, rezept, sauce, tm, vor } from '../../helpers.ts';

const fuellen = [
	anrichten('{base} mit Bohnen-Dip bestreichen und mit {prot} belegen.', 1, { order: 10 }),
	anrichten('{gemuese} daraufgeben.', 0.5, { order: 20, wenn: 'gemuese' }),
	anrichten('Einrollen oder zuklappen und den restlichen Dip zum Dippen dazu reichen.', 0.5, {
		order: 30
	})
];

export default rezept({
	id: 'haehnchen-wraps',
	name: 'Bunte Hähnchen-Wraps mit Bohnen-Dip',
	kategorie: 'abend',
	beschreibung:
		'Vollkorn-Tortillas mit cremigem weißen Bohnen-Dip, gebratenem Hähnchen und knackigem bunten Gemüse – jeder rollt sich seinen Wrap selbst.',
	portionen: 4,
	zutaten: [
		ing(1, 'Dose', 'weiße Bohnen (Dose)'),
		ing(200, 'g', 'Skyr'),
		ing(2, 'EL', 'Zitronensaft'),
		ing(1, 'EL', 'Olivenöl'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(0.5, 'TL', 'Kreuzkümmel'),
		fix(1, 'Prise', 'Jodsalz')
	],
	schritte: [
		sauce(
			'Bohnen abgießen und abspülen. Mit Skyr, Zitronensaft, Olivenöl, Knoblauch, Kreuzkümmel und 1 Prise Salz mit dem Stabmixer fein pürieren.',
			3
		),
		...fuellen
	],
	tmSchritte: [
		tm(
			1,
			'Für den Dip Knoblauch in den Mixtopf geben und 3 Sek./Stufe 7 zerkleinern. Bohnen abgießen und abspülen, mit Skyr, Zitronensaft, Olivenöl, Kreuzkümmel und 1 Prise Salz zugeben und 20 Sek./Stufe 6 fein pürieren, dabei einmal mit dem Spatel nach unten schieben. Umfüllen.',
			0.5,
			2
		),
		...fuellen
	],
	slots: [
		one('base', 'Hülle', 'base', 'tortilla', [
			{
				id: 'tortilla',
				label: 'Vollkorn-Tortillas',
				short: 'Tortillas',
				items: [ing(4, 'Stk', 'Vollkorn-Tortilla', 'groß')],
				steps: [
					pfanne(
						5,
						'Tortillas nacheinander in der heißen Pfanne je Seite 20 Sek. erwärmen und in ein sauberes Küchentuch wickeln.',
						2,
						1
					)
				]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'Pitataschen',
				items: [ing(4, 'Stk', 'Vollkorn-Pita')],
				steps: [
					pfanne(
						5,
						'Pitas in der heißen Pfanne je Seite 1 Min. aufbacken und oben aufschneiden.',
						2,
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
					short: 'Hähnchen',
					items: [
						ing(400, 'g', 'Hähnchenbrustfilet'),
						ing(1, 'EL', 'Rapsöl'),
						ing(1, 'TL', 'Paprikapulver (edelsüß)')
					],
					steps: [
						vor(
							'Hähnchen in dünne Streifen schneiden und mit Öl, Paprikapulver und 1 Prise Salz mischen.',
							3
						),
						pfanne(
							1,
							'Hähnchen in einer großen Pfanne bei starker Hitze 6 Min. rundum braten, bis es gebräunt und innen nicht mehr rosa ist. Herausnehmen.',
							6,
							1
						)
					]
				},
				{
					id: 'falafel',
					label: 'Falafel',
					items: [ing(12, 'Stk', 'Falafel (fertig)'), ing(1, 'EL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Falafel halbieren und in Öl in einer großen Pfanne bei mittlerer Hitze 5–6 Min. rundum braten, bis sie auch innen dampfend heiß sind. Herausnehmen.',
							6,
							1.5
						)
					]
				},
				{
					id: 'halloumi',
					label: 'Halloumi',
					items: [ing(250, 'g', 'Halloumi')],
					steps: [
						pfanne(
							1,
							'Halloumi in 1 cm dicke Streifen schneiden und in einer großen Pfanne ohne Öl je Seite 2 Min. goldbraun braten. Herausnehmen.',
							4,
							1.5
						)
					]
				}
			],
			'falafel'
		),
		many(
			'gemuese',
			'Gemüse',
			'side',
			['paprika', 'karotte', 'gurke', 'salat'],
			[
				{
					id: 'paprika',
					label: 'Paprika',
					short: 'Paprikastreifen',
					items: [ing(1, 'Stk', 'rote Paprika')],
					steps: [nebenbei('Paprika in feine Streifen schneiden.', 1.5)]
				},
				{
					id: 'karotte',
					label: 'Karotten',
					short: 'Karotten',
					items: [ing(2, 'Stk', 'Karotte')],
					steps: [nebenbei('Karotten schälen und grob raspeln.', 1.5)]
				},
				{
					id: 'gurke',
					label: 'Gurke',
					short: 'Gurkenstifte',
					items: [ing(0.5, 'Stk', 'Salatgurke')],
					steps: [nebenbei('Gurke in Stifte schneiden.', 1)]
				},
				{
					id: 'salat',
					label: 'Romanasalat',
					short: 'Salat',
					items: [ing(0.5, 'Stk', 'Romanasalat')],
					steps: [
						nebenbei('Salat gründlich waschen, trocken schleudern und in Streifen schneiden.', 2)
					]
				}
			]
		)
	],
	kind: 'Für das Kind einen kleinen Wrap füllen und in Scheiben schneiden oder alles einzeln als Fingerfood mit Dip anbieten. Hähnchen klein schneiden, Falafel zerdrücken; die Karotten sind geraspelt, weil harte Rohkoststifte für Dreijährige zu riskant sind.',
	mitnehmen:
		'Wraps am besten erst vor dem Essen rollen: Das gebratene Eiweiß in eine Box, Gemüse und Dip getrennt kalt einpacken. Das Eiweiß 1–2 Min. in der Mikrowelle dampfend heiß machen, dann mit Gemüse und Dip in die Tortilla rollen.',
	vorrat:
		'Der Bohnen-Dip hält 3 Tage im Kühlschrank. Gemüse kannst du morgens schneiden; in einer Dose mit feuchtem Küchenpapier bleibt es bis zum Abend knackig.',
	gdm: 'Eine Tortilla pro Person reicht: lieber mehr Gemüse und Dip hinein. Mit Hähnchen oder Halloumi bleibt der Blutzucker ruhiger als mit Falafel.',
	tags: ['wrap'],
	photoAlt:
		'Zwei schräg aufgeschnittene Vollkorn-Wraps mit Hähnchenstreifen, roten Paprikastreifen, geraspelten Karotten, Gurke und Salat, daneben eine Schale cremiger weißer Bohnen-Dip auf einem Holzbrett'
});
