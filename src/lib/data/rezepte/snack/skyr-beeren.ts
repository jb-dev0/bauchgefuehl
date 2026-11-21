import { anrichten, fix, ing, one, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'skyr-beeren',
	name: 'Skyr mit Beeren und Mandeln',
	kategorie: 'snack',
	beschreibung:
		'Cremiger Skyr mit frischen Beeren und gemahlenen Mandeln: viel Eiweiß, wenig Kohlenhydrate, in drei Minuten fertig.',
	portionen: 1,
	zutaten: [
		ing(150, 'g', 'Skyr'),
		ing(1, 'EL', 'Mandeln (gemahlen)'),
		fix(1, 'Prise', 'Zimt (Ceylon)')
	],
	schritte: [
		anrichten('Skyr in eine Schale geben und glatt rühren, {beeren} darauf verteilen.', 0.5),
		anrichten('Mit gemahlenen Mandeln und Zimt bestreuen.', 0.5)
	],
	slots: [
		one('beeren', 'Beeren', 'top', 'heidelbeeren', [
			{
				id: 'heidelbeeren',
				label: 'Heidelbeeren',
				items: [ing(1, 'Hv', 'Heidelbeeren')],
				steps: [vor('Heidelbeeren kurz abbrausen und abtropfen lassen.', 0.5)]
			},
			{
				id: 'himbeeren',
				label: 'Himbeeren',
				items: [ing(1, 'Hv', 'Himbeeren')],
				steps: [vor('Himbeeren vorsichtig abbrausen und abtropfen lassen.', 0.5)]
			},
			{
				id: 'erdbeeren',
				label: 'Erdbeeren',
				items: [ing(1, 'Hv', 'Erdbeeren')],
				steps: [vor('Erdbeeren waschen, das Grün abzupfen und klein schneiden.', 1.5)]
			},
			{
				id: 'tk',
				label: 'TK-Beeren (aufgekocht)',
				short: 'die warmen Beeren',
				items: [ing(1, 'Hv', 'TK-Beerenmischung')],
				steps: [
					pfanne(
						1,
						'TK-Beeren mit 1 EL Wasser in einem kleinen Topf aufkochen, 1 Min. sprudelnd kochen und kurz abkühlen lassen.',
						3,
						0.5
					)
				]
			}
		])
	],
	ohneTm: 'Nur Rühren und Bestreuen, dafür brauchst du kein Gerät.',
	kind: 'Eine kleine Schale mit 2–3 EL Skyr und Beeren obendrauf. Große Heidelbeeren für das Kind halbieren oder leicht andrücken, Erdbeeren klein schneiden.',
	mitnehmen:
		'Skyr und Beeren in ein Schraubglas schichten, die Mandeln in einem Döschen extra und erst vor dem Essen darüberstreuen. Bis dahin in den Kühlschrank.',
	gdm: 'Beeren sind das Obst mit den wenigsten Kohlenhydraten, Himbeeren bringen dazu die meisten Ballaststoffe. Mit 1 TL Leinsamen oder Chiasamen obendrauf hält der Snack noch länger vor.',
	hinweis:
		'TK-Beeren in der Schwangerschaft immer erst aufkochen, frische Beeren gründlich abbrausen.',
	tags: ['kalt', 'suess'],
	photoAlt:
		'Weiße Schale mit cremigem Skyr, prallen frischen Heidelbeeren und einem Hauch gemahlener Mandeln und Zimt auf hellem Leinentuch'
});
