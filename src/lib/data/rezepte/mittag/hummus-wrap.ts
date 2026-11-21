import { anrichten, ing, nebenbei, NONE, one, pfanne, rezept, sauce } from '../../helpers.ts';

export default rezept({
	id: 'hummus-wrap',
	name: 'Vollkorn-Wrap mit Hummus und Gemüse',
	kategorie: 'mittag',
	beschreibung:
		'Großer Vollkorn-Wrap, dick mit Hummus bestrichen, gefüllt mit knackigem Gemüse, gewürztem Hähnchen oder Falafel und einer frischen Skyr-Minz-Sauce.',
	portionen: 2,
	zutaten: [
		ing(2, 'Stk', 'Vollkorn-Tortilla'),
		ing(4, 'EL', 'Hummus'),
		ing(60, 'g', 'Romanasalat', 'einige Blätter'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(1, 'Stk', 'Karotte'),
		ing(100, 'g', 'Salatgurke')
	],
	schritte: [
		nebenbei(
			'Paprika und Gurke in dünne Streifen schneiden, Karotte schälen und grob raspeln. Salatblätter gründlich waschen und trocken schütteln.',
			5
		),
		anrichten(
			'Tortillas in einer trockenen Pfanne oder 10 Sek. in der Mikrowelle anwärmen, damit sie beim Rollen nicht reißen.',
			1
		),
		anrichten(
			'Tortillas mit Hummus bestreichen, Salat, Gemüse und {prot} auf das untere Drittel legen.',
			1.5
		),
		anrichten('{sauce} darüberträufeln.', 0.5, { wenn: 'sauce' }),
		anrichten('Seiten einschlagen, von unten fest aufrollen und schräg halbieren.', 1)
	],
	slots: [
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
						ing(250, 'g', 'Hähnchenbrustfilet'),
						ing(1, 'TL', 'Rapsöl'),
						ing(1, 'TL', 'Paprikapulver (edelsüß)'),
						ing(0.5, 'TL', 'Kreuzkümmel')
					],
					steps: [
						pfanne(
							1,
							'Hähnchen in dünne Streifen schneiden, mit Paprikapulver, Kreuzkümmel und 1 Prise Salz würzen und in Rapsöl 6–7 Min. rundum braten, bis es innen nicht mehr rosa ist.',
							7,
							2.5
						)
					]
				},
				{
					id: 'falafel',
					label: 'Falafel',
					items: [ing(6, 'Stk', 'Falafel (fertig)'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Falafel halbieren und in einer Pfanne mit Rapsöl 4–5 Min. rundum knusprig und heiß braten.',
							5,
							1
						)
					]
				}
			],
			'falafel'
		),
		one('sauce', 'Sauce', 'sauce', 'skyr', [
			{
				id: 'skyr',
				label: 'Skyr-Minz-Sauce',
				short: 'Die Skyr-Sauce',
				items: [ing(150, 'g', 'Skyr'), ing(1, 'EL', 'Minze'), ing(1, 'TL', 'Zitronensaft')],
				steps: [
					sauce(
						'Minze waschen und fein hacken, mit Skyr, Zitronensaft, 1 Prise Salz und 1–2 EL Wasser glatt rühren.',
						2
					)
				]
			},
			NONE
		])
	],
	ohneTm:
		'Hummus kommt fertig aus dem Kühlregal, der Rest ist Schnippeln und Rollen – das geht ohne Gerät am schnellsten.',
	kind: 'Für das Kind einen kleinen Wrap mit Hummus, Hähnchen- oder Falafelstücken und geraspelter Karotte rollen und in Scheiben schneiden. Paprika und Gurke gibt es als Sticks zum Knabbern daneben.',
	mitnehmen:
		'Am besten erst morgens rollen (3 Min.) oder die Füllung getrennt mitnehmen: Hähnchen oder Falafel in der Arbeit 1 Min. in der Mikrowelle dampfend heiß machen und dann einrollen. Fertig gerollt fest in Butterbrotpapier wickeln und gekühlt transportieren.',
	vorrat:
		'Hähnchen oder Falafel, geschnittenes Gemüse und Sauce in Dosen halten 2 Tage im Kühlschrank – dann ist der Wrap jeden Morgen in wenigen Minuten gerollt.',
	gdm: 'Ein Wrap pro Person ist genug, lieber mehr Gemüse hineinpacken. Mit Hähnchen bleibt der Blutzucker ruhiger als mit Falafel, die selbst Kohlenhydrate mitbringen.',
	hinweis:
		'Gebratenes Hähnchen rasch abkühlen lassen, durchgehend kühlen und innerhalb von 1–2 Tagen essen. Salat gründlich waschen, keine fertigen Salatmischungen aus der Tüte.',
	tags: ['wrap', 'kalt'],
	photoAlt:
		'Zwei schräg halbierte Vollkorn-Wraps mit Hummus, Romanasalat, Paprikastreifen, geraspelter Karotte und gebratenen Hähnchenstreifen, daneben ein Schälchen Skyr-Minz-Sauce'
});
