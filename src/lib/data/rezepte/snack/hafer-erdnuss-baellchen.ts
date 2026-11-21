import { anrichten, ing, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'hafer-erdnuss-baellchen',
	name: 'Hafer-Erdnuss-Bällchen mit Kakao',
	kategorie: 'snack',
	beschreibung:
		'Weiche Energiebällchen aus Haferflocken, Erdnussmus, Mandeln und Banane mit Kakao: süß nur durch die Frucht, ideal als Vorrat für unterwegs.',
	portionen: 1,
	zutaten: [
		ing(30, 'g', 'Banane', 'reif'),
		ing(1, 'EL', 'Erdnussmus', '100 % Erdnüsse'),
		ing(15, 'g', 'Haferflocken', 'zart'),
		ing(10, 'g', 'Mandeln (gemahlen)'),
		ing(1.5, 'TL', 'Kakao (ungesüßt)')
	],
	schritte: [
		vor('Banane in einer Schale mit einer Gabel fein zerdrücken.', 1),
		vor(
			'Erdnussmus, Haferflocken, gemahlene Mandeln und den Kakao (bis auf ½ TL je Portion zum Wälzen) gründlich unterrühren, bis eine formbare Masse entsteht. Ist sie zu weich, 5 Min. quellen lassen.',
			1.5
		),
		anrichten(
			'Mit angefeuchteten Händen walnussgroße Bällchen formen (3 je Portion) und im restlichen Kakao wälzen.',
			2
		),
		anrichten(
			'Am besten 15 Min. kalt stellen, dann werden sie fester. Sie schmecken aber auch sofort.',
			0.5
		)
	],
	ohneTm:
		'Mit der Gabel ist eine Portion schneller verrührt. Für einen großen Vorrat kannst du alles im Mixtopf 20 Sek./Linkslauf/Stufe 4 vermengen.',
	kind: 'Für das Kind kleinere Bällchen formen und weich geben, nicht direkt aus dem Gefrierfach. Erdnussmus ist als Mus für Dreijährige geeignet, sofern keine Allergie bekannt ist.',
	mitnehmen:
		'In einer kleinen Dose mitnehmen. Ein paar Stunden ohne Kühlung sind kein Problem, sonst in den Kühlschrank.',
	vorrat:
		'Stell 4 Portionen ein (das ist 1 Banane) und roll 12 Bällchen. In einer Dose halten sie im Kühlschrank 3 Tage, eingefroren 1 Monat.',
	gdm: 'Die Banane ist die einzige Süße. Ein Glas Milch oder ein paar Löffel Skyr dazu bringen zusätzliches Eiweiß und machen den Snack noch blutzuckerfreundlicher.',
	tags: ['suess', 'vorkochen', 'kalt'],
	photoAlt:
		'Drei in Kakao gewälzte Hafer-Erdnuss-Bällchen auf einem kleinen hellen Teller, daneben eine halbe Banane und ein Löffel Erdnussmus'
});
