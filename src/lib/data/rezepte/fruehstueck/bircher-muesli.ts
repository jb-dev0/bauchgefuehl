import { anrichten, fix, ing, one, rezept, tm, vor } from '../../helpers.ts';

const einweichen = vor(
	'Am Vorabend Haferflocken mit Joghurt, Skyr, Leinsamen und 4 EL Wasser verrühren, abdecken und über Nacht in den Kühlschrank stellen.',
	1.5
);

export default rezept({
	id: 'bircher-muesli',
	name: 'Bircher-Müsli mit Apfel und Haselnüssen',
	kategorie: 'fruehstueck',
	beschreibung:
		'Wie das Original aus der Schweiz: viel frisch geraspelter Apfel, über Nacht eingeweichte Haferflocken, Joghurt und Skyr, obendrauf gemahlene Haselnüsse.',
	portionen: 2,
	zutaten: [
		ing(40, 'g', 'Haferflocken', 'zart'),
		ing(150, 'g', 'Naturjoghurt'),
		ing(200, 'g', 'Skyr'),
		ing(1, 'EL', 'Leinsamen (geschrotet)'),
		ing(1, 'TL', 'Zitronensaft'),
		ing(3, 'EL', 'Haselnüsse (gemahlen)'),
		fix(1, 'Prise', 'Zimt (Ceylon)')
	],
	schritte: [
		einweichen,
		anrichten(
			'Morgens {obst} waschen, entkernen und mit Schale grob raspeln, sofort mit dem Zitronensaft mischen.',
			2,
			{ order: 10 }
		),
		anrichten(
			'Das geraspelte Obst unter die Flocken rühren, in Schalen füllen und mit Haselnüssen und Zimt bestreuen.',
			1,
			{ order: 20 }
		)
	],
	tmSchritte: [
		einweichen,
		tm(
			1,
			'Morgens {obst} vierteln, entkernen, mit dem Zitronensaft in den Mixtopf geben und 4 Sek./Stufe 5 zerkleinern.',
			0.5,
			1
		),
		tm(2, 'Eingeweichte Flocken zugeben und 15 Sek./Linkslauf/Stufe 2 untermischen.', 0.5, 0.5),
		anrichten('In Schalen füllen und mit Haselnüssen und Zimt bestreuen.', 0.5)
	],
	slots: [
		one('obst', 'Obst', 'side', 'apfel', [
			{ id: 'apfel', label: 'Apfel', short: 'den Apfel', items: [ing(1, 'Stk', 'Apfel')] },
			{ id: 'birne', label: 'Birne', short: 'die Birne', items: [ing(1, 'Stk', 'Birne')] }
		])
	],
	kind: 'Kinder mögen Bircher-Müsli oft mit etwas mehr Apfel – einfach einen Löffel extra auf seine Portion geben. Die gemahlenen Haselnüsse sind unbedenklich, ganze Nüsse bitte nicht.',
	mitnehmen:
		'Im Schraubglas gekühlt mitnehmen. Den Apfel dann schon morgens untermischen – mit Zitronensaft bleibt er bis mittags hell.',
	vorrat:
		'Die eingeweichten Flocken halten abgedeckt 2 Tage im Kühlschrank. Den Apfel immer frisch raspeln. Spontan geht es auch ohne Vorabend: Flocken dann 15 Min. quellen lassen.',
	gdm: 'Der Apfel mit Schale bringt Ballaststoffe, die Haselnüsse Fett – beides bremst den Anstieg. Wenn du sehr empfindlich bist, die Haferflocken auf 15 g pro Portion reduzieren und 1 EL Haselnüsse mehr nehmen.',
	tags: ['bowl', 'kalt', 'suess', 'vorkochen'],
	photoAlt:
		'Zwei Schalen cremiges Bircher-Müsli mit frisch geraspeltem rotem Apfel, bestreut mit gemahlenen Haselnüssen und Zimt, daneben ein halber Apfel'
});
