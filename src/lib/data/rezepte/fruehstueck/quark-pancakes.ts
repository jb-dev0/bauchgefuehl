import { anrichten, fix, ing, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const backen = [
	pfanne(
		1,
		'Etwas Öl in einer großen beschichteten Pfanne bei mittlerer Hitze erhitzen. Je 1 gehäuften EL Teig hineingeben, leicht flach streichen und 2–3 Min. backen, bis die Unterseite goldbraun ist. Wenden und 2–3 Min. weiterbacken, bis die Pancakes innen durchgebacken und nicht mehr feucht sind.',
		6,
		2
	),
	pfanne(
		2,
		'Den restlichen Teig ebenso backen, dabei jeweils etwas Öl nachgeben. Fertige Pancakes unter einem umgedrehten Teller warm halten.',
		6,
		2
	),
	anrichten('Pancakes mit {kompott} servieren.', 0.5)
];

export default rezept({
	id: 'quark-pancakes',
	name: 'Vollkorn-Quark-Pancakes mit Beerenkompott',
	kategorie: 'fruehstueck',
	beschreibung:
		'Fluffige Pancakes fürs Wochenende aus Quark, Vollkornmehl und Mandeln, dazu warmes Beerenkompott, das ganz ohne Zuckerzusatz auskommt.',
	portionen: 2,
	zutaten: [
		ing(250, 'g', 'Magerquark'),
		ing(2, 'Stk', 'Ei'),
		ing(50, 'g', 'Vollkornmehl'),
		ing(25, 'g', 'Mandeln (gemahlen)'),
		ing(1, 'TL', 'Backpulver'),
		ing(0.5, 'TL', 'Zimt (Ceylon)'),
		ing(2, 'TL', 'Rapsöl', 'zum Backen')
	],
	schritte: [
		vor(
			'Quark und Eier glatt rühren. Mehl, Mandeln, Backpulver und Zimt mischen und kurz unterrühren, bis ein dicker Teig entsteht.',
			3
		),
		...backen
	],
	tmSchritte: [
		tm(
			1,
			'Quark, Eier, Mehl, Mandeln, Backpulver und Zimt in den Mixtopf geben und 20 Sek./Stufe 4 verrühren. Teig mit dem Spatel nach unten schieben und noch 5 Sek./Stufe 4 mischen.',
			0.5,
			1
		),
		...backen
	],
	slots: [
		one('kompott', 'Kompott', 'sauce', 'beeren', [
			{
				id: 'beeren',
				label: 'Beeren (TK)',
				short: 'dem warmen Beerenkompott',
				items: [ing(180, 'g', 'TK-Beerenmischung')],
				steps: [
					start(
						'TK-Beeren mit 2 EL Wasser in einem kleinen Topf aufkochen und offen 4–5 Min. sprudelnd köcheln lassen, bis sie heiß und leicht eingedickt sind.',
						5,
						0.5
					)
				]
			},
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren (frisch)',
				short: 'dem Heidelbeerkompott',
				items: [ing(180, 'g', 'Heidelbeeren')],
				steps: [
					start(
						'Heidelbeeren waschen und mit 2 EL Wasser in einem kleinen Topf 3–4 Min. köcheln lassen, bis die ersten platzen.',
						4,
						1
					)
				]
			},
			{
				id: 'apfel',
				label: 'Apfel-Zimt',
				short: 'dem Apfelkompott',
				items: [ing(1, 'Stk', 'Apfel'), fix(1, 'Prise', 'Zimt (Ceylon)')],
				steps: [
					start(
						'Apfel waschen, entkernen, klein würfeln und mit 3 EL Wasser und 1 Prise Zimt in einem kleinen Topf zugedeckt 5 Min. weich dünsten, dann grob zerdrücken.',
						6,
						2
					)
				]
			}
		])
	],
	kind: 'Pancakes in Streifen schneiden und zum Dippen ins abgekühlte Kompott geben – das lieben Dreijährige. Prüf vorher, dass das Kompott nicht mehr heiß ist.',
	mitnehmen:
		'Übrige Pancakes schmecken auch kalt. In einer Box gekühlt mitnehmen, Kompott in einem Schraubglas extra; nach Wunsch 30 Sek. in der Mikrowelle erwärmen.',
	vorrat:
		'Pancakes halten gekühlt 2 Tage oder eingefroren 2 Monate – im Toaster oder in der Pfanne aufbacken. Das Kompott hält im Schraubglas 3 Tage im Kühlschrank.',
	gdm: 'Die Pancakes bestehen zum großen Teil aus Quark und Ei, deshalb lassen sie den Blutzucker kaum steigen. Iss das Kompott in Maßen und nimm einen Klecks Skyr oder Joghurt dazu, das bremst zusätzlich.',
	hinweis:
		'Die Pancakes enthalten Ei: so lange backen, bis sie innen nicht mehr feucht sind. TK-Beeren immer sprudelnd aufkochen.',
	tags: ['pfanne', 'suess'],
	photoAlt:
		'Stapel kleiner goldbrauner Quark-Pancakes auf einem Teller, übergossen mit dunklem warmem Beerenkompott, daneben ein Schälchen Kompott und ein Löffel'
});
