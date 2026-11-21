import {
	anrichten,
	fix,
	ing,
	many,
	nebenbei,
	ofen,
	one,
	rezept,
	sauce,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'blech-fajitas',
	name: 'Blech-Fajitas mit Hähnchen und Paprika',
	kategorie: 'abend',
	beschreibung:
		'Würzige Paprika, Zwiebeln und Hähnchen rösten zusammen auf einem Blech, gerollt in Vollkorn-Tortillas mit Limetten-Skyr statt Sour Cream.',
	portionen: 4,
	zutaten: [
		ing(2, 'Stk', 'rote Paprika'),
		ing(1, 'Stk', 'gelbe Paprika'),
		ing(2, 'Stk', 'rote Zwiebel'),
		ing(2, 'EL', 'Olivenöl'),
		ing(2, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(250, 'g', 'Skyr', 'für den Dip'),
		ing(1, 'Stk', 'Limette', 'unbehandelt')
	],
	schritte: [
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor('Paprika entkernen und in Streifen schneiden, Zwiebeln in schmale Spalten schneiden.', 6.5, {
			order: 10
		}),
		vor(
			'Alles auf einem Backblech mit Olivenöl, Paprikapulver, Kreuzkümmel, Oregano, Salz und Pfeffer gut mischen und flach verteilen.',
			1.5,
			{ order: 60 }
		),
		ofen('Blech in den Ofen schieben und 20 Min. rösten, nach 10 Min. einmal wenden.', 20, 0.5),
		sauce(
			'Die Hälfte der Limettenschale fein abreiben, mit Skyr, 1 EL Limettensaft und 1 Prise Salz glatt rühren. Restliche Limette in Spalten schneiden.',
			2
		),
		anrichten(
			'Die {wrap} mit Blechgemüse und {prot} füllen, Limetten-Skyr und Limettenspalten dazu reichen.'
		)
	],
	slots: [
		one('wrap', 'Beilage', 'base', 'tortilla', [
			{
				id: 'tortilla',
				label: 'Vollkorn-Tortillas',
				short: 'Tortillas',
				items: [ing(6, 'Stk', 'Vollkorn-Tortilla')],
				steps: [
					ofen(
						'Tortillas in Alufolie wickeln und für die letzten 5 Min. mit in den Ofen legen.',
						0,
						0.5
					)
				]
			},
			{
				id: 'salat',
				label: 'Salatblätter',
				items: [ing(1, 'Stk', 'Romanasalat')],
				steps: [
					nebenbei(
						'Romanasalat in einzelne Blätter teilen, gründlich waschen und trocken schütteln.',
						2
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
					items: [ing(500, 'g', 'Hähnchenbrustfilet')],
					steps: [
						vor('Hähnchen in dünne Streifen schneiden und mit aufs Blech geben.', 3, { order: 50 }),
						ofen(
							'Das Hähnchen ist gar, wenn es innen weiß und nicht mehr rosa ist – im Zweifel ein dickes Stück aufschneiden.',
							0,
							0.5
						)
					]
				},
				{
					id: 'bohnen',
					label: 'Schwarze Bohnen & Feta',
					short: 'Bohnen',
					items: [ing(1, 'Dose', 'schwarze Bohnen (Dose)'), ing(200, 'g', 'Feta')],
					steps: [
						vor('Bohnen in einem Sieb abspülen und gut abtropfen lassen.', 1, { order: 50 }),
						ofen('Bohnen nach 10 Min. mit auf das Blech geben und mitrösten.', 0, 0.5),
						anrichten('Feta über die Füllung bröseln.', 0.5)
					]
				},
				{
					id: 'halloumi',
					label: 'Halloumi',
					items: [ing(250, 'g', 'Halloumi')],
					steps: [
						vor('Halloumi in Streifen schneiden.', 1, { order: 50 }),
						ofen('Halloumi nach 10 Min. mit auf das Blech legen und goldbraun rösten.', 0, 0.5)
					]
				}
			],
			'halloumi'
		),
		many(
			'top',
			'Toppings',
			'top',
			['avocado'],
			[
				{
					id: 'avocado',
					label: 'Avocado',
					items: [ing(1, 'Stk', 'Avocado')],
					steps: [
						nebenbei(
							'Avocado halbieren, entkernen, das Fruchtfleisch würfeln und mit etwas Limettensaft beträufeln.',
							1.5
						)
					]
				},
				{
					id: 'chili',
					label: 'Chiliflocken',
					items: [ing(1, 'TL', 'Chiliflocken')],
					steps: [anrichten('Chiliflocken für die Erwachsenen auf den Tisch stellen.', 0)]
				}
			]
		)
	],
	ohneTm:
		'Gemüse und Hähnchen rösten auf dem Blech, das kann der Thermomix nicht. Den Limetten-Skyr rührst du von Hand schneller.',
	kind: 'Hähnchen und Paprika klein schneiden und mit einem Klecks Skyr in eine halbe Tortilla rollen, oder alles als Fingerfood servieren. Avocado ist ideal für Kinderhände. Bohnen leicht zerdrücken, Halloumi und Feta nur sparsam (salzig). Chiliflocken nur für die Erwachsenen.',
	mitnehmen:
		'Füllung in eine Box füllen, Tortillas und Skyr getrennt einpacken. Die Füllung in der Mikrowelle 2 Min. dampfend heiß erhitzen und erst dann einrollen. Innerhalb von 1–2 Tagen essen.',
	vorrat:
		'Paprika und Zwiebeln kannst du am Vorabend schneiden, sie halten in einer Dose 1 Tag im Kühlschrank.',
	gdm: 'Eine Tortilla weniger nehmen und die restliche Füllung in Salatblätter wickeln. Avocado und Skyr dazu lassen den Blutzucker langsamer steigen.',
	tags: ['ofen', 'wrap'],
	photoAlt:
		'Backblech mit gerösteten roten und gelben Paprikastreifen, roten Zwiebelspalten und gebräunten Hähnchenstreifen, daneben warme Vollkorn-Tortillas, Avocadowürfel, Limettenspalten und eine Schale Skyr'
});
