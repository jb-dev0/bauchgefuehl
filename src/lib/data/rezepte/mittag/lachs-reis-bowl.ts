import {
	anrichten,
	fix,
	ing,
	nebenbei,
	one,
	pfanne,
	rezept,
	sauce,
	start,
	tm
} from '../../helpers.ts';

export default rezept({
	id: 'lachs-reis-bowl',
	name: 'Lachs-Reis-Bowl mit Edamame und Sesam',
	kategorie: 'mittag',
	beschreibung:
		'Vollkornreis mit gebratenen Lachswürfeln, Edamame, Gurke und Karotte, beträufelt mit Soja-Ingwer-Dressing und Sesam – wie eine Poke-Bowl, nur komplett durchgegart.',
	portionen: 2,
	zutaten: [
		ing(150, 'g', 'TK-Edamame', 'geschält'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(1, 'Stk', 'Karotte'),
		ing(2, 'Stk', 'Frühlingszwiebel'),
		ing(1.5, 'EL', 'Sojasauce (salzreduziert)'),
		ing(1, 'EL', 'Reisessig'),
		ing(1, 'TL', 'Sesamöl (geröstet)'),
		ing(0.5, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(1, 'EL', 'Sesam')
	],
	schritte: [
		start(
			'Edamame in einem kleinen Topf in kochendem Wasser 4 Min. sprudelnd kochen, abgießen und kalt abschrecken.',
			5,
			1,
			{ order: 60 }
		),
		nebenbei(
			'Gurke in Scheiben schneiden, Karotte schälen und grob raspeln. Frühlingszwiebeln in feine Ringe schneiden.',
			4
		),
		sauce('Sojasauce, Reisessig, Sesamöl, Ingwer und 1 EL Wasser verrühren.', 1.5),
		anrichten(
			'{base} auf zwei Boxen verteilen, {prot}, Edamame, Gurke und Karotte nebeneinander daraufsetzen.',
			1.5
		),
		anrichten('Dressing darüberträufeln und mit Sesam und Frühlingszwiebeln bestreuen.', 0.5)
	],
	slots: [
		one('base', 'Beilage', 'base', 'reis', [
			{
				id: 'reis',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(120, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 250 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. leise köcheln lassen.',
						22
					)
				],
				tmSteps: [
					tm(
						1,
						'1000 g Wasser und 1 Prise Salz in den Mixtopf geben, Garkorb einhängen, Reis einwiegen und 22 Min./100 °C/Stufe 4 garen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(120, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 240 ml Wasser aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
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
					items: [ing(250, 'g', 'Lachsfilet', 'ohne Haut'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Lachs in 3 cm große Würfel schneiden und in Rapsöl bei mittlerer Hitze 5–6 Min. rundum braten, bis er innen nicht mehr glasig ist und sich leicht zerpflücken lässt.',
							6,
							2
						)
					]
				},
				{
					id: 'tofu',
					label: 'Tofu',
					items: [ing(200, 'g', 'Tofu natur'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Tofu trocken tupfen, würfeln und in Rapsöl 6–7 Min. rundum goldbraun braten.',
							7,
							2
						)
					]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(250, 'g', 'Hähnchenbrustfilet'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Hähnchen in Streifen schneiden und in Rapsöl 6–7 Min. rundum braten, bis es innen nicht mehr rosa ist.',
							7,
							2.5
						)
					]
				}
			],
			'tofu'
		)
	],
	kind: 'Lachs auf Gräten prüfen und zerpflücken, Edamame halbieren oder leicht zerdrücken, Karotte fein raspeln. Für das Kind das Dressing nur tröpfchenweise (Sojasauce ist salzig) und Frühlingszwiebeln weglassen.',
	mitnehmen:
		'Reis und Lachs rasch abkühlen lassen und in die Box füllen, Gemüse und Dressing getrennt. In der Arbeit Reis und Lachs 2 Min. in der Mikrowelle dampfend heiß erhitzen, dann Gemüse, Dressing und Sesam darauf.',
	vorrat:
		'Gekochter Reis hält nur bis zum nächsten Tag – für 2 Tage Meal-Prep lieber Quinoa nehmen, die hält 2 Tage im Kühlschrank. Edamame, Gemüse und Dressing lassen sich am Vorabend vorbereiten.',
	gdm: 'Quinoa statt Reis bringt mehr Eiweiß und weniger schnelle Kohlenhydrate. Edamame darfst du gern verdoppeln: viel Eiweiß, kaum Kohlenhydrate.',
	hinweis:
		'Lachs immer ganz durchgaren und am Folgetag dampfend heiß erhitzen. Gekochten Reis schnell abkühlen und höchstens 1 Tag im Kühlschrank aufbewahren.',
	tags: ['bowl', 'pfanne'],
	photoAlt:
		'Bowl mit Vollkornreis, gebratenen Lachswürfeln, grünen Edamame, Gurkenscheiben und geraspelter Karotte, bestreut mit Sesam und Frühlingszwiebelringen'
});
