import { anrichten, fix, ing, ofen, one, rezept, start, tm, vor } from '../../helpers.ts';

const vorheizen = vor(
	'Backofen auf 200 °C Ober-/Unterhitze (180 °C Umluft) vorheizen, ein Blech mit Backpapier belegen.',
	0.5,
	{ order: 0 }
);
const formen = vor(
	'Mit nassen Händen etwa 20 walnussgroße Bällchen formen und auf das Blech setzen.',
	6,
	{ order: 30 }
);
const backen = ofen(
	'Bällchen 15 Min. backen, bis sie leicht gebräunt und innen ganz durchgegart sind.',
	15,
	0.5
);
const schwenken = anrichten('Die Bällchen in die Sauce geben und vorsichtig durchschwenken.', 0.5, {
	order: 10
});
const teller = anrichten(
	'{base} mit Sauce und Bällchen auf Teller verteilen und mit dem restlichen Parmesan bestreuen.',
	1,
	{ order: 20 }
);

/** Hack-Bällchen: Masse anrühren und Garprobe. */
const hack = (id: string, name: string) => ({
	id,
	label: name,
	items: [ing(500, 'g', name)],
	steps: [
		vor(
			`${name} mit Ei, Haferflocken, 30 g Parmesan, Kräutern, Salz und Pfeffer gut verkneten.`,
			2,
			{ order: 20 }
		),
		ofen('Zur Probe ein Bällchen aufschneiden: Innen darf nichts mehr rosa sein.', 0, 0.5)
	]
});

export default rezept({
	id: 'haehnchen-hackbaellchen',
	name: 'Hähnchen-Hackbällchen in Tomatensauce',
	kategorie: 'abend',
	beschreibung:
		'Saftige Hackbällchen aus dem Ofen in milder Tomatensauce mit versteckter Karotte, dazu Vollkornspaghetti – ein Familienklassiker.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Ei'),
		ing(3, 'EL', 'Haferflocken', 'zarte'),
		ing(50, 'g', 'Parmesan', 'fein gerieben'),
		ing(1, 'TL', 'italienische Kräuter (getrocknet)'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(1, 'Stk', 'Zwiebel', 'klein'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Olivenöl'),
		ing(700, 'g', 'passierte Tomaten'),
		ing(1, 'TL', 'Oregano (getrocknet)')
	],
	schritte: [
		start(
			'Für die Sauce Zwiebel, Karotte und Knoblauch schälen und fein reiben. Mit Olivenöl, passierten Tomaten, Oregano und 1 Prise Salz in einem Topf aufkochen und halb zugedeckt bei kleiner Hitze 15 Min. köcheln lassen, gelegentlich umrühren.',
			17,
			3.5
		),
		vorheizen,
		formen,
		backen,
		schwenken,
		teller
	],
	tmSchritte: [
		vorheizen,
		vor('Zwiebel halbieren, Karotte in Stücke brechen.', 0.5, { order: 40 }),
		formen,
		tm(
			1,
			'Zwiebel, Karotte und Knoblauch in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Olivenöl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			3,
			'Passierte Tomaten, Oregano und 1 Prise Salz zugeben und 10 Min./100 °C/Stufe 1 garen, Messbecher dabei schräg auflegen.',
			10,
			0.5
		),
		backen,
		anrichten('Sauce in einen Topf oder eine große Schüssel umfüllen.', 0.5, { order: 5 }),
		schwenken,
		teller
	],
	slots: [
		one('base', 'Nudeln', 'base', 'spaghetti', [
			{
				id: 'spaghetti',
				label: 'Vollkornspaghetti',
				short: 'Spaghetti',
				items: [ing(240, 'g', 'Vollkornspaghetti')],
				steps: [
					start(
						'Nudelwasser aufsetzen. Sobald die Bällchen im Ofen sind, die Spaghetti darin nach Packungsangabe bissfest kochen (ca. 10 Min.) und abgießen.',
						11
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Nudeln',
				items: [ing(240, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Nudelwasser aufsetzen. Sobald die Bällchen im Ofen sind, die Nudeln darin nach Packungsangabe bissfest kochen (ca. 7 Min.) und abgießen.',
						8
					)
				]
			}
		]),
		one(
			'prot',
			'Bällchen',
			'main',
			'haehnchen',
			[
				hack('haehnchen', 'Hähnchenhack'),
				hack('rind', 'Rinderhack'),
				{
					id: 'tofu',
					label: 'Tofu',
					items: [ing(400, 'g', 'Tofu natur')],
					steps: [
						vor(
							'Tofu trocken tupfen und mit den Händen sehr fein zerkrümeln. Mit Ei, Haferflocken, 30 g Parmesan, Kräutern, Salz und Pfeffer verkneten, bis die Masse gut zusammenhält (sonst 1 EL Haferflocken mehr).',
							3,
							{ order: 20 }
						)
					]
				}
			],
			'tofu'
		)
	],
	kind: 'Bällchen halbieren oder vierteln und die Spaghetti etwas kürzer schneiden, dann wird daraus Fingerfood. Die Sauce ist mild und durch die Karotte leicht süßlich. Wenig Parmesan auf den Kinderteller, er ist salzig.',
	mitnehmen:
		'Bällchen mit Sauce und Nudeln in eine Box füllen, rasch abkühlen und innerhalb von 1–2 Tagen essen. In der Mikrowelle 2–3 Min. erhitzen, bis auch die Bällchen innen dampfend heiß sind (einmal halbieren).',
	vorrat:
		'Die Bällchen lassen sich verdoppeln und gebacken einfrieren (bis 3 Monate). Gefroren 10 Min. in der köchelnden Sauce erhitzen, bis sie innen heiß sind.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornspaghetti nehmen oder die Nudelmenge halbieren und mit Zucchini-Streifen strecken. Die Bällchen selbst sind dank Hack, Ei und Parmesan sehr eiweißreich.',
	tags: ['pasta', 'ofen', 'vorkochen'],
	photoAlt:
		'Teller mit Vollkornspaghetti und goldbraunen Hähnchen-Hackbällchen in leuchtend roter Tomatensauce, bestreut mit geriebenem Parmesan'
});
