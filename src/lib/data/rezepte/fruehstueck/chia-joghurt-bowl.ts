import { anrichten, ing, NONE, one, rezept, start, vor } from '../../helpers.ts';

export default rezept({
	id: 'chia-joghurt-bowl',
	name: 'Chia-Joghurt-Bowl mit Beeren und Kernen',
	kategorie: 'fruehstueck',
	beschreibung:
		'Über Nacht gequollener Chia-Joghurt, geschichtet mit Skyr, frischen Beeren und knusprigen Kernen – kaum Kohlenhydrate, viele Ballaststoffe.',
	portionen: 2,
	zutaten: [
		ing(30, 'g', 'Chiasamen'),
		ing(100, 'ml', 'Milch'),
		ing(250, 'g', 'Naturjoghurt'),
		ing(200, 'g', 'Skyr')
	],
	schritte: [
		vor(
			'Am Vorabend Chiasamen mit Milch und Joghurt verrühren, nach 5 Min. noch einmal kräftig durchrühren, damit nichts verklumpt, und abgedeckt über Nacht in den Kühlschrank stellen.',
			2
		),
		anrichten(
			'Morgens den Chia-Joghurt durchrühren und abwechselnd mit dem Skyr in Schalen oder Gläser schichten.',
			1.5,
			{ order: 10 }
		),
		anrichten('{obst} darauf verteilen.', 0.5, { order: 30 }),
		anrichten('Die Bowls der Erwachsenen mit {kerne} bestreuen.', 0.5, {
			order: 40,
			wenn: 'kerne'
		})
	],
	slots: [
		one('obst', 'Beeren', 'top', 'himbeeren', [
			{
				id: 'himbeeren',
				label: 'Himbeeren',
				items: [ing(150, 'g', 'Himbeeren')],
				steps: [anrichten('Himbeeren vorsichtig waschen und abtropfen lassen.', 0.5, { order: 20 })]
			},
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren',
				items: [ing(150, 'g', 'Heidelbeeren')],
				steps: [anrichten('Heidelbeeren waschen und abtropfen lassen.', 0.5, { order: 20 })]
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
		]),
		one('kerne', 'Kerne', 'top', 'kuerbis', [
			{
				id: 'kuerbis',
				label: 'Kürbiskerne',
				short: 'Kürbiskernen',
				items: [ing(2, 'EL', 'Kürbiskerne')]
			},
			{
				id: 'sonnenblume',
				label: 'Sonnenblumenkerne',
				short: 'Sonnenblumenkernen',
				items: [ing(2, 'EL', 'Sonnenblumenkerne')]
			},
			NONE
		])
	],
	ohneTm: 'Hier wird nur verrührt und geschichtet – dafür brauchst du keinen Mixtopf.',
	kind: 'Das Kind bekommt seine Bowl ohne Kerne, an ganzen Kernen kann es sich verschlucken. Der Chia-Joghurt muss richtig gequollen sein, trockene Chiasamen sind für Kleinkinder nicht geeignet. Große Beeren halbieren.',
	mitnehmen:
		'Im Schraubglas geschichtet gekühlt mitnehmen, Kerne in einem kleinen Döschen extra, damit sie knusprig bleiben.',
	vorrat:
		'Der angerührte Chia-Joghurt hält abgedeckt 2 Tage im Kühlschrank – du kannst also gleich für zwei Morgen vorbereiten.',
	gdm: 'Mit nur wenig Kohlenhydraten ist das eines der blutzuckerfreundlichsten Frühstücke. Bleib bei Beeren statt Banane oder Mango, und die Kerne liefern zusätzlich Fett und Eiweiß.',
	hinweis:
		'Mehr als 15 g Chiasamen pro Person und Tag (gut 1 EL) werden nicht empfohlen. Tiefgekühlte Beeren immer aufkochen, nie roh essen.',
	tags: ['bowl', 'kalt', 'suess', 'vorkochen'],
	photoAlt:
		'Zwei Gläser mit Schichten aus Chia-Joghurt und weißem Skyr, obenauf frische Himbeeren und grüne Kürbiskerne, auf einem hellen Tisch'
});
