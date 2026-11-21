import { anrichten, ing, rezept } from '../../helpers.ts';

export default rezept({
	id: 'kaese-gemuese-box',
	name: 'Käse-Gemüse-Box mit Knäckebrot',
	kategorie: 'snack',
	beschreibung:
		'Gouda-Würfel, bunte Paprika- und Gurkensticks und Vollkorn-Knäckebrot: die schnellste Brotdose, die lange satt macht.',
	portionen: 1,
	zutaten: [
		ing(30, 'g', 'Gouda'),
		ing(0.5, 'Stk', 'rote Paprika'),
		ing(100, 'g', 'Salatgurke'),
		ing(2, 'Scheibe', 'Vollkorn-Knäckebrot')
	],
	schritte: [
		anrichten('Paprika und Gurke waschen und in Sticks schneiden.', 2),
		anrichten('Gouda in Würfel schneiden.', 0.5),
		anrichten('Alles mit dem Knäckebrot in eine Box oder auf einen Teller legen.', 0.5)
	],
	ohneTm: 'Hier wird nur geschnitten, das geht mit dem Messer am schnellsten.',
	kind: 'Gouda für das Kind in dünne Stifte statt Würfel schneiden (feste Würfel können im Hals stecken bleiben), Paprika und Gurke in schmale Streifen.',
	mitnehmen:
		'Die perfekte Brotdose: Alles kommt kalt und roh in eine Box mit Fächern. Bis zum Essen in den Kühlschrank oder mit Kühlakku.',
	vorrat:
		'Gemüsesticks lassen sich am Vorabend schneiden: In einer Dose mit einem feuchten Küchentuch bleiben sie bis zum nächsten Tag knackig.',
	gdm: 'Erst Gemüse und Käse essen, dann das Knäckebrot: In dieser Reihenfolge steigt der Blutzucker langsamer.',
	hinweis:
		'Gouda aus pasteurisierter Milch ist in der Schwangerschaft unbedenklich, das ist bei Supermarkt-Gouda Standard.',
	tags: ['kalt', 'brot'],
	photoAlt:
		'Bunte Snackbox mit Gouda-Würfeln, roten Paprikastreifen, Gurkensticks und zwei Vollkorn-Knäckebroten auf einem Holztisch'
});
