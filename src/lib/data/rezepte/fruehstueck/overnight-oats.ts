import { anrichten, fix, ing, one, rezept, start, vor } from '../../helpers.ts';

export default rezept({
	id: 'overnight-oats',
	name: 'Overnight Oats mit Skyr, Beeren und Leinsamen',
	kategorie: 'fruehstueck',
	beschreibung:
		'Am Vorabend in zwei Minuten angerührt, morgens fertig: cremige Haferflocken mit viel Skyr, geschrotetem Leinsamen und Beeren.',
	portionen: 2,
	zutaten: [
		ing(50, 'g', 'Haferflocken', 'zart'),
		ing(300, 'g', 'Skyr'),
		ing(100, 'ml', 'Milch'),
		ing(2, 'EL', 'Leinsamen (geschrotet)'),
		fix(1, 'Prise', 'Zimt (Ceylon)')
	],
	schritte: [
		vor(
			'Am Vorabend Haferflocken, Skyr, Milch, Leinsamen und Zimt in Gläsern oder einer Schüssel glatt verrühren, abdecken und über Nacht in den Kühlschrank stellen.',
			2
		),
		anrichten(
			'Morgens einmal durchrühren und bei Bedarf 1–2 EL Wasser oder Milch unterrühren, bis es schön cremig ist.',
			0.5,
			{ order: 10 }
		),
		anrichten('{obst} darauf verteilen.', 0.5, { order: 60 })
	],
	slots: [
		one('obst', 'Beeren', 'top', 'heidelbeeren', [
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren',
				items: [ing(150, 'g', 'Heidelbeeren')],
				steps: [anrichten('Heidelbeeren waschen und abtropfen lassen.', 0.5, { order: 20 })]
			},
			{
				id: 'himbeeren',
				label: 'Himbeeren',
				items: [ing(150, 'g', 'Himbeeren')],
				steps: [anrichten('Himbeeren vorsichtig waschen und abtropfen lassen.', 0.5, { order: 20 })]
			},
			{
				id: 'erdbeeren',
				label: 'Erdbeeren',
				items: [ing(150, 'g', 'Erdbeeren')],
				steps: [
					anrichten('Erdbeeren waschen, Grün entfernen und klein schneiden.', 1.5, { order: 20 })
				]
			},
			{
				id: 'tk',
				label: 'Beeren (TK)',
				short: 'Die aufgekochten Beeren',
				items: [ing(150, 'g', 'TK-Beerenmischung')],
				steps: [
					start(
						'Am Vorabend TK-Beeren mit 1 EL Wasser in einem kleinen Topf aufkochen, 2 Min. sprudelnd köcheln lassen, abkühlen lassen und abgedeckt in den Kühlschrank stellen.',
						4,
						1
					)
				]
			}
		])
	],
	ohneTm: 'Hier wird nur verrührt – das geht in der Schüssel schneller als im Mixtopf.',
	kind: 'Eine kleine Schale abfüllen und Heidelbeeren halbieren oder leicht zerdrücken, damit sie nicht in den falschen Hals rutschen. Ist der Skyr zu säuerlich, ein paar Beeren mehr unterrühren – das macht die Oats auch schön bunt.',
	mitnehmen:
		'Im Schraubglas gekühlt mitnehmen und bis zum Essen in den Kühlschrank stellen. Die Beeren in einer kleinen Dose getrennt einpacken und erst kurz vorher darauf geben.',
	vorrat:
		'Die angerührten Oats halten abgedeckt 2 Tage im Kühlschrank – rühr gleich die doppelte Menge an, dann ist auch übermorgen das Frühstück fertig. Beeren immer erst morgens dazu.',
	gdm: 'Beeren sind das blutzuckerfreundlichste Obst, bleib bei einer kleinen Handvoll pro Portion. Ist dein Nüchternwert morgens oft hoch, nimm 20 statt 25 g Haferflocken pro Portion und rühr 1 EL gemahlene Mandeln ein.',
	hinweis:
		'Tiefgekühlte Beeren nie roh essen, sondern immer kurz sprudelnd aufkochen. Frische Beeren gründlich waschen.',
	tags: ['bowl', 'kalt', 'suess', 'vorkochen'],
	photoAlt:
		'Zwei Gläser Overnight Oats mit cremiger Skyr-Hafer-Schicht, obenauf frische Heidelbeeren und eine Prise Zimt, auf einem hellen Holztisch im Morgenlicht'
});
