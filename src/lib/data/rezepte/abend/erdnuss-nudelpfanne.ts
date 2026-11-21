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
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'erdnuss-nudelpfanne',
	name: 'Erdnuss-Nudelpfanne mit Edamame',
	kategorie: 'abend',
	beschreibung:
		'Vollkornnudeln, knackiges Gemüse und Edamame in einer cremigen, milden Erdnusssauce – schnell gemacht und richtig sättigend.',
	portionen: 4,
	zutaten: [
		ing(200, 'g', 'TK-Edamame', 'ohne Schote'),
		ing(1, 'EL', 'Rapsöl'),
		ing(4, 'EL', 'Erdnussmus', 'ungesüßt'),
		ing(2, 'EL', 'Sojasauce (salzreduziert)'),
		ing(1, 'Stk', 'Limette'),
		ing(1, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(1, 'Zehe', 'Knoblauch')
	],
	schritte: [
		start(
			'Die Edamame für die letzten 4 Min. mit in den Nudeltopf geben. Vor dem Abgießen eine Tasse Nudelwasser abschöpfen.',
			0,
			0.5,
			{ order: 60 }
		),
		pfanne(
			3,
			'{gemuese} in die Pfanne geben und 4 Min. unter Rühren bissfest braten.',
			4,
			0.5,
			{ wenn: 'gemuese' }
		),
		pfanne(
			4,
			'{base}, Edamame, {prot} und die Sauce dazugeben und 1–2 Min. durchschwenken, bis alles heiß und rundum von Sauce überzogen ist. Ist sie zu dick, etwas Nudelwasser dazugeben.',
			2,
			1
		),
		sauce(
			'Limette auspressen. Erdnussmus, Sojasauce, Limettensaft, Ingwer und gepressten Knoblauch mit 5–6 EL heißem Wasser glatt rühren.',
			2
		),
		anrichten('Auf Teller verteilen.', 0.5),
		anrichten('Mit {top} bestreuen.', 0.5, { wenn: 'top' })
	],
	slots: [
		one('base', 'Nudeln', 'base', 'vollkorn', [
			{
				id: 'vollkorn',
				label: 'Vollkornnudeln',
				short: 'Nudeln',
				items: [ing(250, 'g', 'Vollkornnudeln')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Nudeln darin nach Packungsangabe 10–12 Min. bissfest garen, dann abgießen.',
						12
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Nudeln',
				items: [ing(250, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Nudeln darin nach Packungsangabe 7–8 Min. bissfest garen, dann abgießen.',
						9
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
					items: [ing(400, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							1,
							'Öl in einer großen Pfanne oder einem Wok erhitzen. Hähnchen in dünne Streifen schneiden und darin 5–6 Min. rundum braten, bis es innen nicht mehr rosa ist. Herausnehmen.',
							6,
							2.5
						)
					]
				},
				{
					id: 'tofu',
					label: 'Tofu',
					items: [ing(400, 'g', 'Tofu natur')],
					steps: [
						pfanne(
							1,
							'Öl in einer großen Pfanne oder einem Wok erhitzen. Tofu trocken tupfen, in 1,5 cm große Würfel schneiden und darin 6 Min. rundum goldbraun braten. Herausnehmen.',
							6,
							2
						)
					]
				},
				{
					id: 'ei',
					label: 'Ei (Rührei)',
					short: 'Rührei',
					items: [ing(6, 'Stk', 'Ei')],
					steps: [
						pfanne(
							1,
							'Öl in einer großen Pfanne oder einem Wok erhitzen. Eier verquirlen, hineingießen und unter Rühren 3–4 Min. zu festem Rührei braten, bis nichts Flüssiges mehr glänzt. Herausnehmen.',
							4,
							1.5
						)
					]
				}
			],
			'tofu'
		),
		many(
			'gemuese',
			'Gemüse',
			'side',
			['paprika', 'karotte'],
			[
				{
					id: 'paprika',
					label: 'Paprika',
					items: [ing(2, 'Stk', 'rote Paprika')],
					steps: [vor('Paprika in feine Streifen schneiden.', 2)]
				},
				{
					id: 'karotte',
					label: 'Karotten',
					items: [ing(2, 'Stk', 'Karotte')],
					steps: [vor('Karotten schälen und in dünne Stifte schneiden oder grob raspeln.', 2)]
				},
				{
					id: 'brokkoli',
					label: 'Brokkoli',
					items: [ing(300, 'g', 'Brokkoli')],
					steps: [vor('Brokkoli in kleine Röschen teilen, den Strunk schälen und in dünne Scheiben schneiden.', 2.5)]
				}
			]
		),
		many(
			'top',
			'Toppings',
			'top',
			['fzw'],
			[
				{
					id: 'fzw',
					label: 'Frühlingszwiebeln',
					items: [ing(3, 'Stk', 'Frühlingszwiebel')],
					steps: [nebenbei('Frühlingszwiebeln in feine Ringe schneiden.')]
				},
				{ id: 'sesam', label: 'Sesam', items: [ing(2, 'EL', 'Sesam')] },
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					short: 'Chiliflocken für die Erwachsenen',
					items: [fix(1, 'TL', 'Chiliflocken')]
				}
			]
		)
	],
	ohneTm:
		'Nudeln, Gemüse und Eiweiß gehören in die heiße Pfanne, und die Sauce ist in einer Schüssel schneller verrührt als im Mixtopf.',
	kind: 'Nudeln für das Kind kürzer schneiden und die Edamame leicht zerdrücken. Frühlingszwiebeln und Chili weglassen. Die Erdnusssauce ist mild; wenn dein Kind Erdnuss noch nicht kennt, lieber zuerst mittags ausprobieren.',
	mitnehmen:
		'In einer Box rasch abkühlen lassen und in den Kühlschrank stellen. Vor dem Aufwärmen 1–2 EL Wasser darüberträufeln (die Sauce zieht ein) und 2–3 Min. in der Mikrowelle dampfend heiß machen.',
	vorrat:
		'Die Erdnusssauce hält im Schraubglas 3 Tage im Kühlschrank. Gemüse kannst du am Vorabend schneiden und in einer Dose kühl stellen.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornnudeln nehmen: fast doppelt so viel Eiweiß und weniger Kohlenhydrate. Oder die Nudelmenge halbieren und dafür Brokkoli als drittes Gemüse dazu.',
	tags: ['pfanne', 'pasta'],
	photoAlt:
		'Wok mit Vollkornnudeln in glänzender Erdnusssauce, bunten Paprika- und Karottenstreifen, hellgrünen Edamame und Hähnchenstreifen, bestreut mit Frühlingszwiebelringen'
});
