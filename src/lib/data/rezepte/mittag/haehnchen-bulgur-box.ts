import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, sauce, start } from '../../helpers.ts';

export default rezept({
	id: 'haehnchen-bulgur-box',
	name: 'Hähnchen-Bulgur-Box mit Hummus',
	kategorie: 'mittag',
	beschreibung:
		'Zitroniger Bulgur mit knackiger Paprika und Gurke, dazu gebratenes Hähnchen und ein großer Klecks Hummus – die klassische Mittagsbox zum Mitnehmen.',
	portionen: 2,
	zutaten: [
		ing(1, 'Stk', 'rote Paprika'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(2, 'EL', 'Zitronensaft'),
		ing(1, 'EL', 'Olivenöl'),
		ing(4, 'EL', 'Hummus'),
		ing(0.25, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		nebenbei(
			'Paprika und Gurke in kleine Würfel schneiden. Petersilie waschen, trocken schütteln und hacken.',
			4
		),
		anrichten(
			'{base} mit einer Gabel auflockern und mit Zitronensaft, Olivenöl, Salz, Pfeffer, Gemüse und Petersilie mischen.',
			1.5
		),
		anrichten(
			'Auf zwei Boxen verteilen, {prot} daraufsetzen und je 2 EL Hummus in eine Ecke geben.',
			1
		)
	],
	slots: [
		one('base', 'Beilage', 'base', 'bulgur', [
			{
				id: 'bulgur',
				label: 'Bulgur',
				items: [ing(100, 'g', 'Bulgur')],
				steps: [
					start(
						'Bulgur mit 200 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 10 Min. quellen lassen.',
						12
					)
				]
			},
			{
				id: 'couscous',
				label: 'Vollkorn-Couscous',
				short: 'Couscous',
				items: [ing(100, 'g', 'Vollkorn-Couscous')],
				steps: [
					start(
						'Couscous in einer Schüssel mit 200 ml kochendem Wasser übergießen, zudecken und 5 Min. quellen lassen.',
						6
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(100, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 200 ml Wasser aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
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
						ing(300, 'g', 'Hähnchenbrustfilet'),
						ing(1, 'TL', 'Rapsöl'),
						ing(1, 'TL', 'Paprikapulver (edelsüß)')
					],
					steps: [
						pfanne(
							1,
							'Hähnchen in Streifen schneiden, mit Paprikapulver und 1 Prise Salz würzen und in Rapsöl 6–7 Min. rundum braten, bis es innen nicht mehr rosa ist.',
							7,
							2.5
						)
					]
				},
				{
					id: 'halloumi',
					label: 'Halloumi',
					items: [ing(200, 'g', 'Halloumi')],
					steps: [
						pfanne(
							1,
							'Halloumi in 1 cm dicke Scheiben schneiden und in einer Pfanne ohne Öl 2–3 Min. pro Seite goldbraun braten.',
							5,
							1
						)
					]
				},
				{
					id: 'falafel',
					label: 'Falafel mit Skyr-Dip',
					short: 'Falafel',
					items: [ing(6, 'Stk', 'Falafel (fertig)'), ing(1, 'TL', 'Rapsöl'), ing(150, 'g', 'Skyr')],
					steps: [
						pfanne(
							1,
							'Falafel in einer Pfanne mit Rapsöl 4–5 Min. rundum knusprig und heiß braten.',
							5,
							1
						),
						sauce(
							'Skyr mit 1 Prise Salz, 1 EL gehackter Petersilie und 1–2 EL Wasser glatt rühren und als Dip dazupacken.',
							1.5
						)
					]
				}
			],
			'halloumi'
		)
	],
	ohneTm:
		'Bulgur quillt im Topf von allein, und Hähnchen oder Halloumi sollen in der Pfanne Farbe bekommen – der Thermomix spart hier nichts.',
	kind: 'Hähnchen oder Halloumi in kleine Stücke schneiden und Bulgur, Gemüse und Hummus getrennt nebeneinander legen – so kann das Kind selbst dippen. Vor dem Salzen eine Portion Bulgur abnehmen.',
	mitnehmen:
		'Am besten kalt: Gemüse-Bulgur mit Eiweiß und Hummus in eine Box mit Fächern füllen, gekühlt transportieren und in der Arbeit in den Kühlschrank stellen. Wer es warm mag, packt Bulgur und Hähnchen getrennt ein und erhitzt sie 1–2 Min. in der Mikrowelle dampfend heiß.',
	vorrat:
		'Bulgur, Hähnchen und geschnittenes Gemüse halten getrennt in Boxen 2 Tage im Kühlschrank. Hummus erst am Morgen dazugeben. Für die ganze Woche: Bulgur am Wochenende doppelt kochen.',
	gdm: 'Mit Hähnchen oder Halloumi bleibt der Blutzucker am ruhigsten; Falafel bringen selbst Kohlenhydrate mit, dann den Bulgur etwas kleiner halten. Gurke und Paprika darfst du großzügig aufstocken.',
	hinweis:
		'Gebratenes Hähnchen nach dem Braten rasch abkühlen lassen und bis zum Essen kühlen; innerhalb von 1–2 Tagen essen.',
	tags: ['bowl', 'vorkochen'],
	photoAlt:
		'Meal-Prep-Box mit Bulgur, gebratenen Hähnchenstreifen, Paprika- und Gurkenwürfeln, einem Klecks Hummus und gehackter Petersilie'
});
