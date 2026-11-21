import {
	anrichten,
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
	id: 'teriyaki-pfanne',
	name: 'Teriyaki-Pfanne mit Brokkoli',
	kategorie: 'abend',
	beschreibung:
		'Glänzend glasierter Lachs mit Brokkoli aus einer Pfanne, dazu Vollkornreis oder Quinoa.',
	portionen: 4,
	zutaten: [
		ing(2, 'EL', 'Rapsöl'),
		ing(3, 'EL', 'Sojasauce (salzreduziert)'),
		ing(1, 'TL', 'Honig'),
		ing(1, 'EL', 'Reisessig'),
		ing(1, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'TL', 'Speisestärke')
	],
	schritte: [
		pfanne(1, 'Rapsöl in einer großen Pfanne erhitzen.', 1, 0.5),
		pfanne(
			4,
			'{prot} zurück in die Pfanne geben, die Sauce angießen und unter Rühren 1–2 Min. einkochen, bis alles glänzt.',
			2,
			1
		),
		sauce(
			'Sojasauce, Honig, Reisessig, Ingwer, gepressten Knoblauch und Stärke mit 100 ml Wasser glatt rühren.',
			2
		),
		anrichten('{base} auf Teller verteilen, Gemüse und {prot} darauf anrichten.'),
		anrichten('Mit {top} bestreuen.', 0.5, { wenn: 'top' })
	],
	slots: [
		one('base', 'Beilage', 'base', 'basmati', [
			{
				id: 'basmati',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(240, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 500 ml Wasser und 1 Prise Salz aufkochen und zugedeckt 20 Min. leise köcheln lassen.',
						22
					)
				],
				tmSteps: [
					tm(
						1,
						'1200 g Wasser und 1 TL Salz in den Mixtopf geben, Garkorb einhängen, Reis einwiegen und 22 Min./100 °C/Stufe 4 garen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(240, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 480 ml Wasser aufkochen und zugedeckt 15 Min. quellen lassen.',
						15
					)
				],
				tmSteps: [
					tm(
						1,
						'Quinoa im Garkorb abspülen, 1000 g Wasser in den Mixtopf geben, Garkorb einhängen und 16 Min./100 °C/Stufe 4 garen.',
						16
					)
				]
			},
			{
				id: 'nudeln',
				label: 'Vollkornspaghetti',
				short: 'Nudeln',
				items: [ing(280, 'g', 'Vollkornspaghetti')],
				steps: [
					start(
						'Spaghetti in reichlich kochendem Salzwasser nach Packungsangabe bissfest garen, abgießen.',
						12
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'lachs',
			[
				{
					id: 'lachs',
					label: 'Lachsfilet',
					short: 'Lachs',
					items: [ing(500, 'g', 'Lachsfilet', 'ohne Haut')],
					steps: [
						pfanne(
							2,
							'Lachs in große Würfel schneiden, 4–5 Min. rundum braten, bis er innen nicht mehr glasig ist, und vorsichtig herausnehmen.',
							5,
							2
						)
					]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(500, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							2,
							'Hähnchen in Streifen schneiden, 6 Min. rundum braten, bis es innen durch ist, und herausnehmen.',
							6,
							2
						)
					]
				},
				{
					id: 'tofu',
					label: 'Tofu',
					items: [ing(400, 'g', 'Tofu natur')],
					steps: [
						pfanne(
							2,
							'Tofu trocken tupfen, würfeln, 6 Min. rundum goldbraun braten und herausnehmen.',
							6,
							2
						)
					]
				}
			],
			'tofu'
		),
		one('gemuese', 'Gemüse', 'side', 'brokkoli', [
			{
				id: 'brokkoli',
				label: 'Brokkoli (TK)',
				items: [ing(600, 'g', 'TK-Brokkoli')],
				steps: [
					pfanne(
						3,
						'Brokkoli gefroren in die Pfanne geben, 3 EL Wasser dazu und zugedeckt 6 Min. garen, bis er durch ist.',
						6,
						0.5
					)
				]
			},
			{
				id: 'wok',
				label: 'Wokgemüse (TK)',
				items: [ing(600, 'g', 'TK-Wokgemüse')],
				steps: [
					pfanne(
						3,
						'Wokgemüse gefroren in die Pfanne geben und unter Rühren 6–7 Min. braten, bis es durch ist.',
						7,
						0.5
					)
				]
			},
			{
				id: 'paprika',
				label: 'Paprika & Karotte',
				items: [ing(2, 'Stk', 'rote Paprika'), ing(2, 'Stk', 'Karotte')],
				steps: [
					vor('Paprika und Karotten in feine Streifen schneiden.', 4),
					pfanne(3, 'Paprika und Karotten 5 Min. unter Rühren braten.', 5, 0.5)
				]
			}
		]),
		many(
			'top',
			'Toppings',
			'top',
			['sesam', 'fzw'],
			[
				{ id: 'sesam', label: 'Sesam', items: [ing(2, 'EL', 'Sesam')] },
				{
					id: 'fzw',
					label: 'Frühlingszwiebeln',
					items: [ing(3, 'Stk', 'Frühlingszwiebel')],
					steps: [nebenbei('Frühlingszwiebeln in feine Ringe schneiden.')]
				}
			]
		)
	],
	kind: 'Eine Kinderportion mit wenig Sauce abnehmen (Sojasauce ist salzig), Lachs auf Gräten prüfen und zerpflücken, Brokkoli in kleine Röschen teilen. Frühlingszwiebeln für das Kind weglassen.',
	mitnehmen:
		'Reis und Pfanne zusammen in eine Box füllen, rasch abkühlen lassen und in den Kühlschrank stellen. Am nächsten Tag 2–3 Min. in der Mikrowelle dampfend heiß erhitzen.',
	vorrat: 'Reis oder Quinoa lässt sich am Wochenende vorkochen und hält im Kühlschrank 2 Tage.',
	gdm: 'Quinoa statt Reis nehmen und die Gemüsemenge verdoppeln. Die Sauce kommt mit 1 TL Honig für 4 Portionen aus.',
	tags: ['pfanne', 'bowl'],
	photoAlt:
		'Teriyaki-Pfanne mit glasierten Lachswürfeln und Brokkoli auf Vollkornreis, bestreut mit Sesam und Frühlingszwiebeln'
});
