import { anrichten, fix, ing, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'kakao-quark',
	name: 'Kakao-Quark mit Himbeeren',
	kategorie: 'snack',
	beschreibung:
		'Schokoladiger Quark, nur mit einer halben Banane gesüßt, mit frischen Himbeeren: wie Dessert, aber mit viel Eiweiß.',
	portionen: 1,
	zutaten: [
		ing(120, 'g', 'Magerquark'),
		ing(0.5, 'Stk', 'Banane', 'reif'),
		ing(1, 'TL', 'Kakao (ungesüßt)'),
		fix(1, 'Prise', 'Zimt (Ceylon)'),
		ing(1, 'Hv', 'Himbeeren'),
		ing(1, 'TL', 'Leinsamen (geschrotet)')
	],
	schritte: [
		vor(
			'Banane in einer Schale mit einer Gabel fein zerdrücken. Quark, Kakao, Zimt und 1–2 EL Wasser dazugeben und cremig rühren.',
			2
		),
		anrichten(
			'Himbeeren vorsichtig abbrausen, abtropfen lassen und auf den Quark geben. Mit Leinsamen bestreuen.',
			1
		)
	],
	ohneTm: 'Für eine Schale ist die Gabel schneller als der Mixtopf.',
	kind: 'Ein paar Löffel Kakao-Quark in eine kleine Schale, Himbeeren obendrauf (die sind weich und können ganz bleiben). Die Leinsamen kann das Kind mitessen.',
	mitnehmen:
		'Im Schraubglas mit den Himbeeren obenauf, gekühlt bis zum Nachmittag. Die Banane färbt den Quark nach ein paar Stunden etwas dunkler, das schadet nicht.',
	gdm: 'Die halbe Banane ist die einzige Süße. Eine eher feste, nicht braun gefleckte Banane lässt den Blutzucker langsamer steigen. Mit 1 EL gemahlenen Mandeln obendrauf hält der Quark noch länger vor.',
	hinweis:
		'Statt frischer Himbeeren gehen auch TK-Himbeeren, die aber in der Schwangerschaft kurz aufkochen und abkühlen lassen.',
	tags: ['kalt', 'suess'],
	photoAlt:
		'Glas mit cremigem dunkelbraunem Kakao-Quark, obenauf frische Himbeeren und ein paar Leinsamen, daneben ein langer Löffel'
});
