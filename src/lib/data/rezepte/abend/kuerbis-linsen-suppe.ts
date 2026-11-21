import {
	anrichten,
	fix,
	ing,
	many,
	nebenbei,
	one,
	pfanne,
	rezept,
	start,
	tm,
	vor
} from '../../helpers.ts';

const bruehe = start(
	'600 ml Gemüsebrühe erhitzen (z. B. Wasser im Wasserkocher aufkochen und Brühpulver einrühren).',
	3,
	0.5
);
const teller = anrichten('Suppe in tiefe Teller füllen.', 0.5, { order: 10 });
const brot = anrichten('{brot} dazu reichen.', 0.5, { order: 40 });

export default rezept({
	id: 'kuerbis-linsen-suppe',
	name: 'Kürbis-Linsen-Suppe mit Kokos',
	kategorie: 'abend',
	beschreibung:
		'Samtige Hokkaido-Suppe mit roten Linsen, mildem Curry und leichter Kokosmilch, dazu ein Klecks Skyr und Vollkornbrot.',
	portionen: 4,
	zutaten: [
		ing(500, 'g', 'Hokkaido-Kürbis'),
		ing(120, 'g', 'Rote Linsen'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(2, 'TL', 'Ingwer', 'frisch'),
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'TL', 'Currypulver (mild)'),
		ing(600, 'ml', 'Gemüsebrühe'),
		ing(1, 'Dose', 'Kokosmilch (light)'),
		ing(1, 'EL', 'Zitronensaft'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		bruehe,
		vor(
			'Kürbis waschen, halbieren, entkernen und mit Schale in 1,5 cm große Würfel schneiden.',
			3.5
		),
		vor('Zwiebel würfeln, Knoblauch und Ingwer fein reiben.', 2),
		pfanne(
			1,
			'Rapsöl in einem großen Topf erhitzen, Zwiebel, Knoblauch und Ingwer 2 Min. andünsten, Currypulver 30 Sek. mitrösten.',
			2.5,
			0.5
		),
		pfanne(
			2,
			'Kürbis, Linsen und heiße Brühe dazugeben, aufkochen und zugedeckt 12 Min. köcheln lassen, bis Kürbis und Linsen weich sind.',
			13,
			0.5
		),
		pfanne(
			3,
			'Kokosmilch einrühren und alles mit dem Stabmixer fein pürieren. Mit Zitronensaft und Pfeffer abschmecken.',
			1,
			2
		),
		teller,
		brot
	],
	tmSchritte: [
		bruehe,
		vor('Kürbis waschen, halbieren, entkernen und mit Schale grob würfeln.', 2.5),
		tm(
			1,
			'Zwiebel halbieren, mit Knoblauch und geschältem Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Rapsöl und Currypulver zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(3, 'Kürbis zugeben und 5 Sek./Stufe 5 zerkleinern.', 0, 0.5),
		tm(4, 'Linsen und heiße Brühe zugeben und 13 Min./100 °C/Stufe 1 garen.', 13, 0.5),
		tm(
			5,
			'Kokosmilch und Zitronensaft zugeben, Messbecher einsetzen und 1 Min./Stufe 5–10 schrittweise ansteigend pürieren. Mit Pfeffer abschmecken.',
			1,
			0.5
		),
		teller,
		brot
	],
	slots: [
		one('brot', 'Beilage', 'base', 'vollkornbrot', [
			{
				id: 'vollkornbrot',
				label: 'Vollkornbrot',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(8, 'Scheibe', 'Vollkorn-Knäckebrot')]
			}
		]),
		many(
			'top',
			'Toppings',
			'top',
			['skyr', 'kerne'],
			[
				{
					id: 'skyr',
					label: 'Skyr',
					items: [ing(250, 'g', 'Skyr')],
					steps: [
						anrichten('Je einen großen Klecks Skyr daraufsetzen und leicht durchziehen.', 0.5, {
							order: 20
						})
					]
				},
				{
					id: 'kerne',
					label: 'Kürbiskerne',
					items: [ing(3, 'EL', 'Kürbiskerne')],
					steps: [
						nebenbei(
							'Kürbiskerne in einer kleinen Pfanne ohne Fett 2–3 Min. rösten, bis sie duften.',
							1
						),
						anrichten('Kürbiskerne über die Erwachsenen-Teller streuen.', 0.5, { order: 30 })
					]
				},
				{
					id: 'chili',
					label: 'Chiliflocken',
					items: [ing(1, 'TL', 'Chiliflocken')],
					steps: [anrichten('Chiliflocken für die Erwachsenen dazustellen.', 0, { order: 30 })]
				}
			]
		)
	],
	kind: 'Die Suppe ist mild und cremig, perfekt zum Löffeln und Brot-Eintunken. Die Kinderportion vor dem Nachwürzen abnehmen und etwas abkühlen lassen. Ein Skyr-Klecks darf drauf, Kürbiskerne bekommt das Kind nicht (Verschluckungsgefahr).',
	mitnehmen:
		'Suppe rasch abkühlen und in ein gut schließendes Glas füllen, sie hält 2 Tage im Kühlschrank. In der Mikrowelle 3 Min. dampfend heiß erhitzen und einmal umrühren. Skyr und Kerne getrennt mitnehmen.',
	vorrat:
		'Die Suppe (ohne Skyr) lässt sich gut verdoppeln und portionsweise einfrieren, bis 3 Monate. Im Kühlschrank hält sie 2 Tage.',
	gdm: 'Knäckebrot statt Vollkornbrot nehmen oder nur eine halbe Scheibe Brot. Linsen, Skyr und Kürbiskerne liefern Eiweiß, das den Kürbis gut ausgleicht.',
	tags: ['suppe', 'vorkochen'],
	photoAlt:
		'Tiefer Teller mit leuchtend oranger Kürbis-Linsen-Suppe, weißem Skyr-Klecks und gerösteten Kürbiskernen, daneben Scheiben Vollkornbrot'
});
