import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, start, tm } from '../../helpers.ts';

const anrichtenSchritt = anrichten(
	'Porridge in Schalen füllen, {obst} darauf verteilen und mit gemahlenen Mandeln bestreuen.',
	1
);

export default rezept({
	id: 'protein-porridge',
	name: 'Warmes Quark-Porridge mit Zimt und Beeren',
	kategorie: 'fruehstueck',
	beschreibung:
		'Cremiges Haferporridge mit Zimt, in das zum Schluss Magerquark gerührt wird – das macht es lange satt und hält den Blutzucker ruhig.',
	portionen: 2,
	zutaten: [
		ing(50, 'g', 'Haferflocken', 'zart'),
		ing(150, 'ml', 'Milch'),
		ing(1, 'EL', 'Leinsamen (geschrotet)'),
		ing(0.5, 'TL', 'Zimt (Ceylon)'),
		ing(200, 'g', 'Magerquark'),
		ing(2, 'EL', 'Mandeln (gemahlen)')
	],
	schritte: [
		pfanne(
			1,
			'Haferflocken, Milch, 150 ml Wasser, Leinsamen und Zimt in einem Topf unter Rühren aufkochen und bei kleiner Hitze 3–4 Min. sämig köcheln lassen.',
			6,
			1
		),
		pfanne(2, 'Topf vom Herd nehmen und den Quark glatt unterrühren.', 0, 0.5),
		anrichtenSchritt
	],
	tmSchritte: [
		tm(
			1,
			'Haferflocken, Milch, 150 g Wasser, Leinsamen und Zimt in den Mixtopf geben und 7 Min./90 °C/Linkslauf/Stufe 1 garen.',
			7,
			0.5
		),
		tm(2, 'Quark zugeben und 15 Sek./Linkslauf/Stufe 2 unterrühren.', 0.5, 0.5),
		anrichtenSchritt
	],
	slots: [
		one('obst', 'Obst', 'top', 'tk', [
			{
				id: 'tk',
				label: 'Beeren (TK)',
				short: 'die heißen Beeren',
				items: [ing(150, 'g', 'TK-Beerenmischung')],
				steps: [
					start(
						'TK-Beeren mit 1 EL Wasser in einem kleinen Topf aufkochen und 3 Min. sprudelnd köcheln lassen, bis sie durch und heiß sind.',
						4,
						0.5
					)
				]
			},
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren (frisch)',
				short: 'Heidelbeeren',
				items: [ing(150, 'g', 'Heidelbeeren')],
				steps: [nebenbei('Heidelbeeren waschen und abtropfen lassen.', 0.5)]
			},
			{
				id: 'apfel',
				label: 'Apfel',
				short: 'den geraspelten Apfel',
				items: [ing(1, 'Stk', 'Apfel')],
				steps: [nebenbei('Apfel waschen, entkernen und mit Schale grob raspeln.', 1.5)]
			}
		])
	],
	kind: 'Die Kinderportion zuerst abfüllen und ein paar Minuten abkühlen lassen, Porridge hält die Hitze lange. Heidelbeeren halbieren oder leicht zerdrücken.',
	mitnehmen:
		'Porridge in einer Box gekühlt mitnehmen, mit einem Schluck Milch 1–2 Min. in der Mikrowelle dampfend heiß erhitzen und erst dann das Obst darauf geben.',
	vorrat:
		'Haferflocken, Leinsamen und Zimt für die ganze Woche portionsweise in Gläser füllen, dann musst du morgens nur noch Milch und Quark dazugeben. Fertiges Porridge hält 2 Tage im Kühlschrank.',
	gdm: 'Der Quark macht das Porridge eiweißreich und bremst den Anstieg. Zarte Haferflocken nicht länger als nötig kochen – je breiiger, desto schneller gehen sie ins Blut. Kernige Flocken mit 2 Min. mehr Kochzeit sind noch etwas günstiger.',
	hinweis: 'Tiefgekühlte Beeren nie roh essen, sondern immer sprudelnd aufkochen.',
	tags: ['bowl', 'suess'],
	photoAlt:
		'Dampfende Schale cremiges Haferporridge mit leuchtend roten heißen Beeren und gemahlenen Mandeln, daneben eine Zimtstange auf einem Leinentuch'
});
