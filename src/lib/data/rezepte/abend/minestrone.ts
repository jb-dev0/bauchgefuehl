import { anrichten, fix, ing, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const bruehe = start(
	'750 ml Gemüsebrühe erhitzen (z. B. Wasser im Wasserkocher aufkochen und Brühpulver einrühren).',
	3,
	0.5
);
const parmesan = anrichten('Mit frisch geriebenem Parmesan und Pfeffer bestreuen.', 1, {
	order: 20
});

export default rezept({
	id: 'minestrone',
	name: 'Minestrone mit weißen Bohnen',
	kategorie: 'abend',
	beschreibung:
		'Italienische Gemüsesuppe mit Karotten, Zucchini, Tomaten und weißen Bohnen, dazu Vollkornnudeln und Parmesan.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(2, 'Stk', 'Karotte'),
		ing(200, 'g', 'Zucchini'),
		ing(1, 'EL', 'Olivenöl'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(750, 'ml', 'Gemüsebrühe'),
		ing(2, 'TL', 'italienische Kräuter (getrocknet)'),
		ing(80, 'g', 'Parmesan', 'zum Bestreuen'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		bruehe,
		vor(
			'Zwiebel und Knoblauch fein würfeln, Karotten schälen und klein würfeln, Zucchini in kleine Würfel schneiden.',
			6
		),
		pfanne(
			1,
			'Olivenöl in einem großen Topf erhitzen, Zwiebel, Knoblauch und Karotten 3 Min. andünsten. Tomatenmark 1 Min. mitrösten.',
			4,
			1
		),
		pfanne(3, 'Zucchini, Tomaten, heiße Brühe und Kräuter dazugeben.', 0, 0.5),
		pfanne(
			5,
			'Aufkochen und zugedeckt 10 Min. leise köcheln lassen, bis das Gemüse weich ist.',
			11,
			0.5
		),
		parmesan
	],
	tmSchritte: [
		bruehe,
		vor('Karotten schälen und in Stücke brechen, Zucchini grob würfeln.', 2),
		tm(
			1,
			'Zwiebel halbieren, mit Knoblauch in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Olivenöl und Tomatenmark zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(3, 'Karotten und Zucchini zugeben und 4 Sek./Stufe 4 grob zerkleinern.', 0, 0.5),
		tm(4, 'Tomaten, heiße Brühe und Kräuter zugeben.', 0, 0.5),
		tm(6, '12 Min./100 °C/Linkslauf/Stufe 1 garen.', 12, 0.5),
		parmesan
	],
	slots: [
		one('base', 'Beilage', 'base', 'nudeln', [
			{
				id: 'nudeln',
				label: 'Vollkornnudeln',
				short: 'Nudeln',
				items: [ing(140, 'g', 'Vollkornnudeln', 'kleine Sorte, z. B. Hörnchen')],
				steps: [
					start(
						'Nudeln in reichlich Salzwasser nach Packungsangabe bissfest kochen (ca. 10 Min.) und abgießen.',
						11
					),
					anrichten(
						'Nudeln auf tiefe Teller verteilen und die Minestrone darüberschöpfen.',
						0.5,
						{ order: 10 }
					)
				]
			},
			{
				id: 'brot',
				label: 'Vollkornbrot',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')],
				steps: [
					anrichten('Minestrone in tiefe Teller füllen, Vollkornbrot dazu reichen.', 0.5, {
						order: 10
					})
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'bohnen', [
			{
				id: 'bohnen',
				label: 'Weiße Bohnen',
				short: 'Bohnen',
				items: [ing(2, 'Dose', 'weiße Bohnen (Dose)')],
				steps: [
					vor('Bohnen in einem Sieb abspülen und abtropfen lassen.', 1),
					pfanne(4, 'Bohnen dazugeben.', 0, 0.5)
				],
				tmSteps: [
					vor('Bohnen in einem Sieb abspülen und abtropfen lassen.', 1),
					tm(5, 'Bohnen zugeben.', 0, 0.5)
				]
			},
			{
				id: 'kichererbsen',
				label: 'Kichererbsen',
				items: [ing(2, 'Dose', 'Kichererbsen (Dose)')],
				steps: [
					vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1),
					pfanne(4, 'Kichererbsen dazugeben.', 0, 0.5)
				],
				tmSteps: [
					vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1),
					tm(5, 'Kichererbsen zugeben.', 0, 0.5)
				]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchen & Bohnen',
				short: 'Hähnchen',
				items: [ing(300, 'g', 'Hähnchenbrustfilet'), ing(1, 'Dose', 'weiße Bohnen (Dose)')],
				steps: [
					vor(
						'Hähnchen in kleine Würfel schneiden. Bohnen in einem Sieb abspülen und abtropfen lassen.',
						3
					),
					pfanne(4, 'Hähnchenwürfel und Bohnen dazugeben.', 0, 0.5),
					pfanne(
						6,
						'Ein Hähnchenstück aufschneiden: Es muss innen weiß und nicht mehr rosa sein, sonst noch 2–3 Min. weiterköcheln.',
						0,
						0.5
					)
				],
				tmSteps: [
					vor(
						'Hähnchen in kleine Würfel schneiden. Bohnen in einem Sieb abspülen und abtropfen lassen.',
						3
					),
					tm(5, 'Hähnchenwürfel und Bohnen zugeben.', 0, 0.5),
					tm(
						7,
						'Ein Hähnchenstück aufschneiden: Es muss innen weiß und nicht mehr rosa sein, sonst noch 3 Min./100 °C/Linkslauf/Stufe 1 weitergaren.',
						0,
						0.5
					)
				]
			}
		])
	],
	kind: 'Das Gemüse ist klein und weich, ideal zum Löffeln. Die Kinderportion vor dem Nachwürzen abnehmen, etwas abkühlen lassen und nur wenig Parmesan darüber (salzig). Bohnen oder Kichererbsen für das Kind leicht zerdrücken.',
	mitnehmen:
		'Suppe und Nudeln getrennt in Boxen füllen, rasch abkühlen und innerhalb von 1–2 Tagen essen. Zusammen in der Mikrowelle 3 Min. dampfend heiß erhitzen, Parmesan erst danach darüber.',
	vorrat:
		'Die Suppe ohne Nudeln hält 2 Tage im Kühlschrank und lässt sich gut einfrieren. Nudeln getrennt aufbewahren, sonst saugen sie die Brühe auf.',
	gdm: 'Die Nudelmenge halbieren und dafür mehr Bohnen in die Suppe geben – Hülsenfrüchte lassen den Blutzucker deutlich langsamer steigen als Nudeln.',
	tags: ['suppe', 'vorkochen'],
	photoAlt:
		'Dampfende Minestrone mit Karotten, Zucchini, weißen Bohnen und kleinen Vollkornnudeln in einem tiefen Teller, mit frisch geriebenem Parmesan bestreut'
});
