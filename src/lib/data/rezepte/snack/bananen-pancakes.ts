import { anrichten, ing, nebenbei, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'bananen-pancakes',
	name: 'Mini-Bananen-Pancakes mit Quark',
	kategorie: 'snack',
	beschreibung:
		'Vier kleine Pancakes aus Banane, Ei und Haferflocken, mit einem Klecks Quark: süß nur durch die Frucht und eine kleine Portion, die den Blutzucker im Rahmen hält.',
	portionen: 1,
	zutaten: [
		ing(0.5, 'Stk', 'Banane', 'reif'),
		ing(1, 'Stk', 'Ei'),
		ing(1, 'EL', 'Haferflocken', 'zart'),
		ing(1, 'TL', 'Leinsamen (geschrotet)'),
		ing(2, 'Prise', 'Zimt (Ceylon)'),
		ing(1, 'TL', 'Rapsöl'),
		ing(50, 'g', 'Magerquark')
	],
	schritte: [
		vor(
			'Banane in einer Schale mit einer Gabel zu Mus zerdrücken. Ei, Haferflocken, Leinsamen und die Hälfte vom Zimt gründlich unterrühren.',
			2
		),
		pfanne(
			1,
			'Öl in einer beschichteten Pfanne bei mittlerer Hitze erhitzen. Je 1 gehäuften EL Teig hineingeben (ergibt etwa 4 Mini-Pancakes je Portion) und 2–3 Min. backen, bis die Unterseite goldbraun ist.',
			4,
			1
		),
		pfanne(
			2,
			'Wenden und weitere 2 Min. backen, bis die Pancakes innen ganz durchgegart und nicht mehr feucht sind.',
			2,
			0.5
		),
		nebenbei('Quark mit etwas Wasser glatt rühren.', 0.5),
		anrichten('Pancakes mit dem Quark anrichten und mit dem restlichen Zimt bestäuben.', 0.5)
	],
	ohneTm: 'Pancakes brauchen die Pfanne, und den Teig rührst du mit der Gabel schneller an.',
	kind: 'Ein bis zwei Pancakes in Streifen schneiden und den Quark als Dip daneben stellen. Ohne Salz und schön weich, genau richtig für kleine Hände.',
	mitnehmen:
		'Pancakes abkühlen lassen und in einer Dose mitnehmen, den Quark im Glas. Sie schmecken kalt oder 20–30 Sek. in der Mikrowelle erwärmt.',
	vorrat:
		'Gleich die doppelte Menge backen: Abgekühlt halten die Pancakes im Kühlschrank 2 Tage, eingefroren 1 Monat (im Toaster oder in der Mikrowelle durcherhitzen).',
	gdm: 'Den Quark nicht weglassen, er liefert das meiste Eiweiß. Eine eher feste Banane lässt den Blutzucker langsamer steigen als eine sehr reife.',
	tags: ['pfanne', 'suess'],
	photoAlt:
		'Vier goldbraune Mini-Pancakes aus Banane und Hafer auf einem kleinen Teller, mit einem Klecks Quark und einem Hauch Zimt'
});
