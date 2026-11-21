import { anrichten, ing, nebenbei, one, pfanne, rezept, sauce, start } from '../../helpers.ts';

export default rezept({
	id: 'edamame-nudelsalat',
	name: 'Asiatischer Edamame-Nudelsalat mit Erdnuss-Dressing',
	kategorie: 'mittag',
	beschreibung:
		'Vollkornspaghetti mit Edamame, Karotte, Paprika und Frühlingszwiebeln in cremigem Erdnuss-Limetten-Dressing – kalt aus der Box ein Genuss.',
	portionen: 2,
	zutaten: [
		ing(150, 'g', 'TK-Edamame', 'geschält'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(2, 'Stk', 'Frühlingszwiebel'),
		ing(2, 'EL', 'Erdnussmus', 'ungesüßt'),
		ing(1.5, 'EL', 'Sojasauce (salzreduziert)'),
		ing(1, 'Stk', 'Limette', 'Saft'),
		ing(1, 'EL', 'Reisessig'),
		ing(1, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(1, 'TL', 'Sesamöl (geröstet)'),
		ing(1, 'EL', 'Sesam')
	],
	schritte: [
		nebenbei(
			'Edamame 4 Min. vor Ende der Garzeit zu den Nudeln geben und sprudelnd mitkochen. Alles abgießen, kalt abschrecken und gut abtropfen lassen.',
			1
		),
		sauce(
			'Erdnussmus, Sojasauce, Limettensaft, Reisessig, Ingwer und Sesamöl mit 3–4 EL warmem Wasser glatt rühren.',
			2.5
		),
		nebenbei(
			'Karotte schälen und raspeln, Paprika in dünne Streifen schneiden, Frühlingszwiebeln in feine Ringe schneiden.',
			4
		),
		anrichten(
			'{base}, Edamame, Gemüse und {prot} mit dem Dressing mischen, auf zwei Boxen verteilen und mit Sesam bestreuen.',
			1.5
		)
	],
	slots: [
		one('base', 'Nudeln', 'base', 'spaghetti', [
			{
				id: 'spaghetti',
				label: 'Vollkornspaghetti',
				short: 'Nudeln',
				items: [ing(100, 'g', 'Vollkornspaghetti')],
				steps: [
					start(
						'Spaghetti in reichlich kochendem, leicht gesalzenem Wasser nach Packungsangabe bissfest garen (etwa 10 Min.).',
						12
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Linsennudeln',
				items: [ing(100, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Linsennudeln in reichlich kochendem, leicht gesalzenem Wasser nach Packungsangabe garen (etwa 7 Min.).',
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
					items: [ing(250, 'g', 'Hähnchenbrustfilet'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Hähnchen in dünne Streifen schneiden und in Rapsöl 6–7 Min. rundum braten, bis es innen nicht mehr rosa ist. Abkühlen lassen.',
							7,
							2.5
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
							'Tofu trocken tupfen, in kleine Würfel schneiden und in Rapsöl 6–7 Min. rundum goldbraun braten.',
							7,
							2
						)
					]
				}
			],
			'tofu'
		)
	],
	ohneTm:
		'Nudeln und Edamame garen zusammen in einem Topf, das Dressing ist mit dem Löffel verrührt – der Thermomix spart hier nichts.',
	kind: 'Nudeln mit der Küchenschere kürzer schneiden, Edamame leicht zerdrücken und Frühlingszwiebeln weglassen. Erdnussmus nur, wenn dein Kind Erdnüsse schon verträgt – sonst die Kinderportion mit etwas Sesamöl und Sojasauce anmachen.',
	mitnehmen:
		'Schmeckt kalt am besten: in einer gut schließenden Box mit Kühlakku transportieren und in der Arbeit in den Kühlschrank stellen. Ein paar Löffel Dressing getrennt mitnehmen, die Nudeln ziehen es über Nacht auf.',
	vorrat:
		'Am Vorabend gemacht hält der Salat bis zum nächsten Mittag, insgesamt höchstens 2 Tage im Kühlschrank. Das Dressing hält im Schraubglas 4 Tage.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornspaghetti machen daraus fast ein Eiweißgericht. Gemüse und Edamame darfst du großzügig aufstocken.',
	hinweis:
		'Gebratenes Hähnchen rasch abkühlen lassen, durchgehend kühlen und innerhalb von 1–2 Tagen essen.',
	tags: ['salat', 'pasta', 'kalt', 'vorkochen'],
	photoAlt:
		'Meal-Prep-Box mit Vollkornspaghetti in hellbraunem Erdnuss-Dressing, grünen Edamame, Karottenraspeln, roten Paprikastreifen, Hähnchenstreifen und Sesam'
});
