import { anrichten, fix, ing, NONE, one, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'huettenkaese-bowl',
	name: 'Hüttenkäse-Bowl mit Obst und Mandeln',
	kategorie: 'fruehstueck',
	beschreibung:
		'In fünf Minuten fertig: körniger Hüttenkäse mit frischem Obst, gemahlenen Mandeln, Leinsamen und etwas Hafer – viel Eiweiß, wenig Kohlenhydrate.',
	portionen: 2,
	zutaten: [
		ing(300, 'g', 'Hüttenkäse'),
		ing(3, 'EL', 'Mandeln (gemahlen)'),
		ing(1, 'EL', 'Leinsamen (geschrotet)'),
		fix(1, 'Prise', 'Zimt (Ceylon)')
	],
	schritte: [
		anrichten('Hüttenkäse auf Schalen verteilen und {obst} darauf geben.', 1),
		anrichten('Mit Mandeln, Leinsamen und Zimt bestreuen.', 0.5, { order: 60 })
	],
	slots: [
		one('obst', 'Obst', 'top', 'birne', [
			{
				id: 'birne',
				label: 'Birne',
				short: 'die Birnenwürfel',
				items: [ing(1, 'Stk', 'Birne')],
				steps: [vor('Birne waschen, vierteln, entkernen und klein würfeln.', 1.5)]
			},
			{
				id: 'kiwi',
				label: 'Kiwi',
				short: 'die Kiwiwürfel',
				items: [ing(2, 'Stk', 'Kiwi')],
				steps: [vor('Kiwis schälen und klein würfeln.', 1.5)]
			},
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren',
				short: 'die Heidelbeeren',
				items: [ing(150, 'g', 'Heidelbeeren')],
				steps: [vor('Heidelbeeren waschen und abtropfen lassen.', 0.5)]
			},
			{
				id: 'apfel',
				label: 'Apfel',
				short: 'die Apfelwürfel',
				items: [ing(1, 'Stk', 'Apfel')],
				steps: [vor('Apfel waschen, vierteln, entkernen und klein würfeln.', 1.5)]
			}
		]),
		one('knusper', 'Knusper', 'base', 'hafer', [
			{
				id: 'hafer',
				label: 'Haferflocken',
				items: [ing(30, 'g', 'Haferflocken', 'kernig')],
				steps: [anrichten('Haferflocken darüberstreuen.', 0.5, { order: 70 })]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(3, 'Scheibe', 'Vollkorn-Knäckebrot')],
				steps: [anrichten('Knäckebrot grob darüberbröseln.', 0.5, { order: 70 })]
			},
			NONE
		])
	],
	ohneTm: 'Nur schnippeln und anrichten – dafür brauchst du kein Gerät.',
	kind: 'Obst in kleine Würfel schneiden und Heidelbeeren halbieren oder leicht zerdrücken. Hüttenkäse ist etwas salziger als Joghurt, die Kinderportion darf deshalb kleiner ausfallen und mehr Obst haben.',
	mitnehmen:
		'Hüttenkäse in einer Box gekühlt mitnehmen, Obst und Mandel-Hafer-Mischung getrennt einpacken und erst vor dem Essen darübergeben.',
	vorrat:
		'Mandeln, Leinsamen, Haferflocken und Zimt als Mischung auf Vorrat in ein Glas füllen – dann reicht morgens ein Löffel davon.',
	gdm: 'Mit sehr viel Eiweiß und wenig Kohlenhydraten ist die Bowl ideal für empfindliche Morgenwerte. Beeren, Birne oder Kiwi sind günstiger als Banane oder Trauben.',
	tags: ['bowl', 'kalt', 'suess'],
	photoAlt:
		'Zwei Schalen mit körnigem Hüttenkäse, darauf saftige Birnenwürfel, gemahlene Mandeln und Haferflocken, bestäubt mit Zimt, auf einem hellen Holztisch'
});
