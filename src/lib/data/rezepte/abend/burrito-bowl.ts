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

export default rezept({
	id: 'burrito-bowl',
	name: 'Burrito-Bowl mit schwarzen Bohnen',
	kategorie: 'abend',
	beschreibung:
		'Mild gewürzte Bohnenpfanne mit Mais und Paprika auf Quinoa, dazu Avocado, Tomaten und ein frischer Skyr-Limetten-Dip.',
	portionen: 4,
	zutaten: [
		ing(1, 'Dose', 'schwarze Bohnen (Dose)'),
		ing(150, 'g', 'Mais (Dose)', 'abgetropft'),
		ing(2, 'Stk', 'rote Paprika'),
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(0.5, 'TL', 'Jodsalz'),
		ing(250, 'g', 'Skyr'),
		ing(1, 'Stk', 'Limette')
	],
	schritte: [
		vor('Paprika in kleine Würfel schneiden.', 2),
		vor('Bohnen und Mais in einem Sieb abgießen, abspülen und abtropfen lassen.', 1),
		pfanne(1, 'Öl in einer großen Pfanne erhitzen.', 1, 0.5),
		pfanne(3, 'Paprika dazugeben und 3 Min. braten.', 3, 0.5),
		pfanne(
			4,
			'Bohnen, Mais, Paprikapulver, Kreuzkümmel und ½ TL Salz dazugeben und unter Rühren 3 Min. braten, bis alles heiß ist.',
			3,
			0.5
		),
		sauce(
			'Limettenschale fein abreiben und den Saft auspressen. Skyr mit der Hälfte des Limettensafts, der Schale, 1 Prise Salz und 2–3 EL Wasser glatt rühren.',
			2
		),
		anrichten(
			'Bowls mit {base} als Grundlage anrichten, die Bohnenpfanne daraufgeben und mit einem großen Klecks Limetten-Dip servieren.',
			1,
			{ order: 10 }
		),
		anrichten('{top} dazugeben.', 0.5, { order: 20, wenn: 'top' })
	],
	slots: [
		one('base', 'Grundlage', 'base', 'quinoa', [
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(180, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 360 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
					)
				],
				tmSteps: [
					tm(
						1,
						'Quinoa im Garkorb abspülen. 1000 g Wasser und 1 TL Salz in den Mixtopf füllen, Garkorb einhängen und 16 Min./100 °C/Stufe 4 garen.',
						16
					)
				]
			},
			{
				id: 'reis',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(180, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. quellen lassen.',
						22
					)
				],
				tmSteps: [
					tm(
						1,
						'1200 g Wasser und 1 TL Salz in den Mixtopf füllen, Garkorb einhängen, Reis einwiegen und 22 Min./100 °C/Stufe 4 garen.',
						22
					)
				]
			},
			{
				id: 'tortilla',
				label: 'Vollkorn-Tortillas',
				short: 'warmen Tortillas',
				items: [ing(4, 'Stk', 'Vollkorn-Tortilla')],
				steps: [
					nebenbei('Tortillas in einer trockenen Pfanne je Seite 20 Sek. erwärmen.', 1.5)
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
					items: [ing(400, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							2,
							'Hähnchen in kleine Würfel schneiden und im heißen Öl 6 Min. rundum braten, bis es innen nicht mehr rosa ist.',
							6,
							2.5
						)
					]
				},
				{
					id: 'bohnen',
					label: 'Extra-Bohnen & Feta',
					short: 'Feta',
					items: [ing(1, 'Dose', 'schwarze Bohnen (Dose)'), ing(150, 'g', 'Feta')],
					steps: [anrichten('Feta über die Bowls bröseln.', 0.5, { order: 15 })]
				},
				{
					id: 'hack',
					label: 'Rinderhack',
					items: [ing(400, 'g', 'Rinderhack')],
					steps: [
						pfanne(
							2,
							'Rinderhack im heißen Öl 5–6 Min. krümelig braten, bis nichts Rosa mehr zu sehen ist.',
							6,
							1
						)
					]
				}
			],
			'bohnen'
		),
		many(
			'top',
			'Toppings',
			'top',
			['avocado', 'tomaten'],
			[
				{
					id: 'avocado',
					label: 'Avocado',
					short: 'Avocadowürfel',
					items: [ing(1, 'Stk', 'Avocado')],
					steps: [
						nebenbei(
							'Avocado halbieren, entkernen, würfeln und mit dem restlichen Limettensaft beträufeln.',
							1.5
						)
					]
				},
				{
					id: 'tomaten',
					label: 'Tomaten',
					short: 'Tomatenwürfel',
					items: [ing(2, 'Stk', 'Tomate')],
					steps: [nebenbei('Tomaten würfeln.', 1)]
				},
				{
					id: 'salat',
					label: 'Romanasalat',
					short: 'Salatstreifen',
					items: [ing(0.5, 'Stk', 'Romanasalat')],
					steps: [
						nebenbei(
							'Salat gründlich waschen, trocken schleudern und in feine Streifen schneiden.',
							2
						)
					]
				},
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					short: 'Chiliflocken für die Erwachsenen',
					items: [fix(1, 'TL', 'Chiliflocken')]
				}
			]
		)
	],
	kind: 'Bohnen und Mais für das Kind mit der Gabel leicht andrücken, Hähnchen und Avocado klein schneiden. Dip und Avocado machen die Bowl schön mild; Chili gibt es nur für die Großen.',
	mitnehmen:
		'Grundlage und Bohnenpfanne zusammen in eine Box, Dip und Tomaten getrennt in ein kleines Glas. Die warme Box 2–3 Min. in der Mikrowelle dampfend heiß machen, dann den kalten Dip daraufgeben. Avocado lieber frisch aufschneiden.',
	vorrat:
		'Quinoa und Bohnenpfanne halten 2 Tage im Kühlschrank, der Dip ebenfalls. Quinoa lässt sich gut am Wochenende vorkochen.',
	gdm: 'Die Quinoa halbieren und dafür Salatstreifen und eine Extraportion Paprika nehmen. Der Skyr-Dip bringt viel Eiweiß, also ruhig einen großen Klecks.',
	tags: ['bowl', 'pfanne'],
	photoAlt:
		'Bunte Burrito-Bowl mit Quinoa, schwarzen Bohnen, Mais, gebratener Paprika und Hähnchenwürfeln, dazu Avocadowürfel, Tomaten, ein Klecks weißer Limetten-Dip und eine Limettenspalte'
});
