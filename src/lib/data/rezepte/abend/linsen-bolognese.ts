import { anrichten, fix, ing, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const anrichtenSchritte = [
	anrichten('{base} mit der Sauce auf Teller verteilen und mit Parmesan bestreuen.', 1)
];

export default rezept({
	id: 'linsen-bolognese',
	name: 'Linsen-Bolognese mit Vollkornspaghetti',
	kategorie: 'abend',
	beschreibung:
		'Dicke, fruchtige Tomatensauce mit roten Linsen und fein geraspeltem Gemüse – schmeckt wie Bolognese, macht lange satt und ist im Nu gekocht.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'Stk', 'Zucchini'),
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(2, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(2, 'TL', 'italienische Kräuter (getrocknet)'),
		ing(1, 'Stk', 'Lorbeerblatt'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(40, 'g', 'Parmesan', 'frisch gerieben')
	],
	schritte: [
		vor('Zwiebel fein würfeln und Knoblauch fein hacken.', 2),
		pfanne(
			1,
			'Öl in einem großen Topf erhitzen und die Zwiebel darin 2 Min. andünsten. Währenddessen Karotte schälen und Zucchini waschen.',
			2,
			1.5
		),
		pfanne(2, 'Karotte und Zucchini direkt in den Topf raspeln und 2 Min. mitdünsten.', 2, 2),
		pfanne(4, 'Knoblauch und Tomatenmark dazugeben und 1 Min. anrösten.', 1, 0.5),
		pfanne(
			5,
			'Linsen in einem Sieb kurz abspülen. Mit Tomaten, 300 ml Wasser, Kräutern, Lorbeerblatt und ½ TL Salz in den Topf geben, aufkochen und zugedeckt bei kleiner Hitze 10 Min. köcheln lassen, bis die Linsen weich sind. Zwischendurch umrühren.',
			10,
			1.5
		),
		pfanne(
			6,
			'Lorbeerblatt entfernen, die Kinderportion abnehmen und die Sauce für Erwachsene mit Pfeffer nachwürzen.',
			0,
			0.5
		),
		...anrichtenSchritte
	],
	tmSchritte: [
		vor(
			'Zwiebel halbieren, Knoblauch schälen. Karotte schälen und in Stücke schneiden, Zucchini waschen und grob zerteilen.',
			2
		),
		tm(
			1,
			'Zwiebel, Knoblauch, Karotte und Zucchini in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0.5,
			0.5
		),
		tm(2, 'Öl zugeben und 4 Min./120 °C/Stufe 1 dünsten.', 4, 0.5),
		tm(
			4,
			'Linsen in einem Sieb kurz abspülen. Mit Tomatenmark, Tomaten, 250 g Wasser, Kräutern, Lorbeerblatt und ½ TL Salz in den Mixtopf geben und 12 Min./100 °C/Linkslauf/Stufe 1 garen, bis die Linsen weich sind. Den Garkorb als Spritzschutz auf den Deckel stellen.',
			12,
			1.5
		),
		tm(
			5,
			'Lorbeerblatt entfernen, die Kinderportion abnehmen und die Sauce für Erwachsene mit Pfeffer nachwürzen.',
			0,
			0.5
		),
		...anrichtenSchritte
	],
	slots: [
		one('base', 'Nudeln', 'base', 'spaghetti', [
			{
				id: 'spaghetti',
				label: 'Vollkornspaghetti',
				short: 'Spaghetti',
				items: [ing(180, 'g', 'Vollkornspaghetti')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Spaghetti darin nach Packungsangabe 10–12 Min. bissfest garen, dann abgießen.',
						12
					)
				]
			},
			{
				id: 'linsennudeln',
				label: 'Rote-Linsen-Nudeln',
				short: 'Nudeln',
				items: [ing(180, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Reichlich Wasser aufkochen (am schnellsten mit dem Wasserkocher) und die Nudeln darin nach Packungsangabe 7–8 Min. bissfest garen, dann abgießen.',
						9
					)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'linsen', [
			{
				id: 'linsen',
				label: 'Nur rote Linsen',
				short: 'Linsen',
				items: [ing(150, 'g', 'Rote Linsen')]
			},
			{
				id: 'hack',
				label: 'Halb Linsen, halb Rinderhack',
				short: 'Linsen und Rinderhack',
				items: [ing(75, 'g', 'Rote Linsen'), ing(250, 'g', 'Rinderhack')],
				steps: [
					pfanne(
						3,
						'Rinderhack dazugeben und 4–5 Min. krümelig braten, bis nichts Rosa mehr zu sehen ist.',
						5,
						1
					)
				],
				tmSteps: [
					tm(
						3,
						'Rinderhack zugeben und 5 Min./120 °C/Linkslauf/Stufe 1 garen, dabei einmal mit dem Spatel lockern. Es darf nichts Rosa mehr zu sehen sein.',
						5,
						1
					)
				]
			}
		])
	],
	kind: 'Die Kinderportion vor dem Pfeffern abnehmen. Die Linsen zerfallen in der Sauce und das Gemüse ist fein geraspelt, da merkt kaum ein Kind etwas. Spaghetti für Kleine kürzer schneiden.',
	mitnehmen:
		'Sauce und Nudeln zusammen in eine Box füllen, rasch abkühlen lassen und kühl stellen. Mit 1–2 EL Wasser 3 Min. in der Mikrowelle erhitzen, umrühren und dampfend heiß essen.',
	vorrat:
		'Die Sauce hält 2 Tage im Kühlschrank und lässt sich gut einfrieren (3 Monate). Die doppelte Menge zu kochen lohnt sich.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornspaghetti nehmen: mehr Eiweiß, weniger Kohlenhydrate. Oder die Nudelmenge halbieren und dafür mehr Sauce essen.',
	tags: ['pasta', 'vorkochen'],
	photoAlt:
		'Teller mit Vollkornspaghetti und dicker, stückiger Linsen-Bolognese, frisch geriebener Parmesan obenauf, daneben eine Schale mit weiteren Parmesanspänen'
});
