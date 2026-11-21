import { anrichten, fix, ing, many, ofen, one, rezept, tm, vor } from '../../helpers.ts';

const vorheizen = vor(
	'Backofen auf 200 °C Umluft vorheizen, zwei Bleche mit Backpapier belegen.',
	0.5,
	{ order: 0 }
);
const backen = ofen(
	'{teig} auf die Bleche legen, dünn mit der Bohnen-Tomatensauce bestreichen, mit dem Gemüse belegen und mit Mozzarella bestreuen. 8–10 Min. backen, bis der Käse goldbraun ist und die Ränder knusprig sind.',
	10,
	3,
	{ order: 50 }
);
const schneiden = anrichten('Wrap-Pizzen mit einem Pizzaschneider in Stücke schneiden.', 1);

export default rezept({
	id: 'wrap-pizza',
	name: 'Schnelle Wrap-Pizza mit Gemüse',
	kategorie: 'abend',
	beschreibung:
		'Knusprige Pizza aus Vollkorn-Tortillas in 10 Minuten aus dem Ofen – mit einer Tomatensauce, in der sich weiße Bohnen verstecken, Mozzarella und buntem Gemüse.',
	portionen: 4,
	zutaten: [
		ing(1, 'Dose', 'weiße Bohnen (Dose)'),
		ing(200, 'g', 'passierte Tomaten'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		fix(1, 'Prise', 'Jodsalz'),
		ing(250, 'g', 'Mozzarella', 'gerieben')
	],
	schritte: [
		vorheizen,
		vor(
			'Bohnen abspülen und abtropfen lassen. Mit passierten Tomaten, Tomatenmark, Oregano und 1 Prise Salz mit dem Stabmixer zu einer glatten Sauce pürieren.',
			2.5,
			{ order: 10 }
		),
		backen,
		schneiden
	],
	tmSchritte: [
		vorheizen,
		vor('Bohnen abspülen und abtropfen lassen.', 0.5, { order: 10 }),
		tm(
			1,
			'Bohnen, passierte Tomaten, Tomatenmark, Oregano und 1 Prise Salz in den Mixtopf geben und 15 Sek./Stufe 7 glatt pürieren.',
			0,
			1
		),
		backen,
		schneiden
	],
	slots: [
		one('teig', 'Boden', 'base', 'tortilla', [
			{
				id: 'tortilla',
				label: 'Vollkorn-Tortillas',
				short: 'Tortillas',
				items: [ing(4, 'Stk', 'Vollkorn-Tortilla')]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pitas',
				short: 'Pitas',
				items: [ing(4, 'Stk', 'Vollkorn-Pita')]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'veggie', [
			{ id: 'veggie', label: 'Bohnen & Mozzarella', items: [] },
			{
				id: 'haehnchen',
				label: 'Mit Hähnchen',
				short: 'Hähnchen',
				items: [ing(300, 'g', 'Hähnchenbrustfilet'), ing(1, 'TL', 'Olivenöl')],
				steps: [
					vor('Hähnchen in dünne Streifen schneiden.', 2, { order: 20 }),
					ofen(
						'Hähnchenstreifen mit Olivenöl in einer kleinen Auflaufform 8 Min. vorgaren und dann mit auf das Gemüse verteilen. Sie garen auf der Pizza weiter und müssen am Ende innen weiß und nicht mehr rosa sein.',
						8,
						1,
						{ order: 10 }
					)
				]
			}
		]),
		many(
			'gemuese',
			'Gemüse',
			'side',
			['paprika', 'champignons', 'spinat'],
			[
				{
					id: 'paprika',
					label: 'Paprika',
					items: [ing(1, 'Stk', 'rote Paprika')],
					steps: [vor('Paprika entkernen und in dünne Streifen schneiden.', 2, { order: 30 })]
				},
				{
					id: 'champignons',
					label: 'Champignons',
					items: [ing(200, 'g', 'Champignons')],
					steps: [vor('Champignons putzen und in dünne Scheiben schneiden.', 2, { order: 30 })]
				},
				{
					id: 'spinat',
					label: 'Spinat',
					items: [ing(2, 'Hv', 'Babyspinat')],
					steps: [vor('Babyspinat gründlich waschen und trocken schleudern.', 1, { order: 30 })]
				},
				{
					id: 'mais',
					label: 'Mais',
					items: [ing(0.5, 'Dose', 'Mais (Dose)')],
					steps: [vor('Mais abtropfen lassen.', 0.5, { order: 30 })]
				},
				{
					id: 'zucchini',
					label: 'Zucchini',
					items: [ing(0.5, 'Stk', 'Zucchini')],
					steps: [vor('Zucchini in dünne Scheiben hobeln.', 1.5, { order: 30 })]
				},
				{
					id: 'tomaten',
					label: 'Kirschtomaten',
					items: [ing(2, 'Hv', 'Kirschtomaten')],
					steps: [vor('Kirschtomaten waschen und halbieren.', 1.5, { order: 30 })]
				}
			]
		)
	],
	kind: 'Die Pizza in Streifen oder kleine Dreiecke schneiden und kurz abkühlen lassen, der Käse ist sehr heiß. Kirschtomaten für das Kind vierteln. Die Bohnen sind unsichtbar in der Sauce versteckt.',
	mitnehmen:
		'Reste in einer Box im Kühlschrank aufbewahren und innerhalb von 1–2 Tagen essen. In der Mikrowelle 1–2 Min. dampfend heiß erhitzen; knuspriger wird sie in einer heißen Pfanne.',
	vorrat:
		'Die Bohnen-Tomatensauce hält 3 Tage im Kühlschrank. Gleich doppelt machen, dann steht die Pizza beim nächsten Mal in 10 Minuten auf dem Tisch.',
	gdm: 'Die Bohnen-Sauce ruhig dick auftragen und reichlich Gemüse darauf verteilen, dazu passt ein großer Salat. Tortillas haben weniger Kohlenhydrate als Pitas.',
	tags: ['ofen', 'wrap'],
	photoAlt:
		'Knusprige Vollkorn-Tortilla-Pizzen mit Tomatensauce, geschmolzenem Mozzarella, roten Paprikastreifen, Champignonscheiben und Spinat auf Backpapier, in Stücke geschnitten'
});
