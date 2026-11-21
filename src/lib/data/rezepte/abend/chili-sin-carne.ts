import { anrichten, ing, many, nebenbei, one, pfanne, rezept, tm, vor } from '../../helpers.ts';

const bohnenAbspuelen = vor('Bohnen in einem Sieb abspülen und abtropfen lassen.', 1, {
	order: 30
});
const schalen = anrichten('Chili in Schalen füllen.', 0.5, { order: 10 });

/** Hack-Variante: zusammen mit Zwiebel und Paprika krümelig braten. */
const hack = (id: string, name: string) => ({
	id,
	label: name,
	items: [ing(400, 'g', name)],
	steps: [
		pfanne(
			1,
			`Rapsöl in einem großen Topf erhitzen, ${name} mit Zwiebel, Knoblauch und Paprika 5 Min. krümelig braten, bis das Hack nicht mehr rosa ist.`,
			5,
			1.5
		)
	],
	tmSteps: [
		tm(
			2,
			`Rapsöl und ${name} zugeben und 5 Min./120 °C/Linkslauf/Stufe 1 garen, bis das Hack nicht mehr rosa ist.`,
			5,
			1
		)
	]
});

export default rezept({
	id: 'chili-sin-carne',
	name: 'Mildes Bohnen-Chili mit Süßkartoffel',
	kategorie: 'abend',
	beschreibung:
		'Ein mildes, rauchig gewürztes Chili aus drei Dosen Bohnen und Süßkartoffel – die Schärfe kommt nur als Topping auf die Erwachsenen-Teller.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(300, 'g', 'Süßkartoffel'),
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'TL', 'Kreuzkümmel'),
		ing(2, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Paprikapulver (geräuchert)'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(2, 'EL', 'Tomatenmark'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(1, 'Dose', 'Kidneybohnen (Dose)'),
		ing(1, 'Dose', 'schwarze Bohnen (Dose)'),
		ing(0.5, 'TL', 'Jodsalz')
	],
	schritte: [
		vor('Zwiebel und Knoblauch fein würfeln, Paprika entkernen und klein würfeln.', 4, {
			order: 10
		}),
		vor('Süßkartoffel schälen und in 1 cm kleine Würfel schneiden.', 3, { order: 20 }),
		bohnenAbspuelen,
		pfanne(
			2,
			'Kreuzkümmel, beide Paprikapulver, Oregano und Tomatenmark 30 Sek. mitrösten. Süßkartoffel, Tomaten, Bohnen, 300 ml Wasser und Salz dazugeben, aufkochen und zugedeckt 10 Min. köcheln lassen, bis die Süßkartoffel weich ist.',
			12,
			1
		),
		schalen
	],
	tmSchritte: [
		vor(
			'Süßkartoffel schälen und in grobe Stücke schneiden, Paprika entkernen und vierteln, Zwiebel halbieren.',
			3,
			{ order: 10 }
		),
		bohnenAbspuelen,
		tm(
			1,
			'Zwiebel, Knoblauch, Paprika und Süßkartoffel in den Mixtopf geben, 4 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(
			3,
			'Kreuzkümmel, beide Paprikapulver, Oregano, Tomatenmark, Tomaten, Bohnen, 200 g Wasser und Salz zugeben und 15 Min./100 °C/Linkslauf/Stufe 1 garen, bis die Süßkartoffel weich ist.',
			15,
			0.5
		),
		schalen
	],
	slots: [
		one('prot', 'Eiweiß', 'main', 'bohnen', [
			{
				id: 'bohnen',
				label: 'Nur Bohnen',
				short: 'Bohnen',
				items: [ing(1, 'Dose', 'Kidneybohnen (Dose)')],
				steps: [
					pfanne(
						1,
						'Rapsöl in einem großen Topf erhitzen, Zwiebel, Knoblauch und Paprika darin 3 Min. andünsten.',
						3,
						0.5
					)
				],
				tmSteps: [tm(2, 'Rapsöl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5)]
			},
			hack('haehnchen', 'Hähnchenhack'),
			hack('rind', 'Rinderhack')
		]),
		many(
			'top',
			'Toppings',
			'top',
			['skyr', 'avocado', 'chili'],
			[
				{
					id: 'skyr',
					label: 'Skyr',
					items: [ing(200, 'g', 'Skyr')],
					steps: [anrichten('Je einen Klecks Skyr daraufsetzen.', 0.5, { order: 20 })]
				},
				{
					id: 'avocado',
					label: 'Avocado',
					items: [ing(1, 'Stk', 'Avocado')],
					steps: [
						nebenbei('Avocado halbieren, entkernen und das Fruchtfleisch würfeln.', 1.5),
						anrichten('Avocadowürfel darüberstreuen.', 0.5, { order: 20 })
					]
				},
				{
					id: 'fzw',
					label: 'Frühlingszwiebeln',
					items: [ing(3, 'Stk', 'Frühlingszwiebel')],
					steps: [
						nebenbei('Frühlingszwiebeln in feine Ringe schneiden.', 1),
						anrichten('Mit Frühlingszwiebeln bestreuen.', 0.5, { order: 20 })
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
	kind: 'Das Chili ist ohne Schärfe gekocht, die Chiliflocken kommen nur auf die Erwachsenen-Teller. Mit Skyr und Avocado wird es extra mild. Bohnen für das Kind leicht zerdrücken, Frühlingszwiebeln weglassen.',
	mitnehmen:
		'Chili schmeckt am nächsten Tag noch besser. Rasch abkühlen, in eine Box füllen und innerhalb von 2 Tagen essen. In der Mikrowelle 3 Min. dampfend heiß erhitzen, einmal umrühren. Skyr und Avocado frisch dazu.',
	vorrat: 'Das Chili lässt sich gut verdoppeln und portionsweise einfrieren, bis 3 Monate.',
	gdm: 'Keine extra Beilage nötig – Bohnen und Süßkartoffel sättigen lange. Wer mag, nimmt Hähnchenhack statt der dritten Dose Bohnen; Skyr und Avocado bremsen den Blutzuckeranstieg zusätzlich.',
	tags: ['suppe', 'vorkochen'],
	photoAlt:
		'Schale mit dampfendem Bohnen-Chili mit Süßkartoffelwürfeln und Paprika, darauf ein Klecks Skyr, Avocadowürfel und ein paar Chiliflocken'
});
