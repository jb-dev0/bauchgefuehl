import {
	anrichten,
	fix,
	ing,
	nebenbei,
	one,
	pfanne,
	rezept,
	start,
	tm,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'haehnchen-nudelsuppe',
	name: 'Hähnchen-Gemüse-Suppe mit Vollkornnudeln',
	kategorie: 'mittag',
	beschreibung:
		'Klare Suppe mit zarten Hähnchenwürfeln, Karotten, Lauch, Erbsen und Vollkornnudeln – wärmt von innen und lässt sich wunderbar vorkochen.',
	portionen: 2,
	zutaten: [
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'Stk', 'Karotte'),
		ing(0.5, 'Stk', 'Lauch'),
		ing(800, 'ml', 'Gemüsebrühe'),
		ing(70, 'g', 'Vollkornnudeln', 'kleine Sorte, z. B. Hörnchen'),
		ing(100, 'g', 'TK-Erbsen'),
		ing(0.5, 'Bund', 'Petersilie'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'800 ml Wasser im Wasserkocher aufkochen und mit Brühpulver zu Gemüsebrühe anrühren (für das Kind lieber schwach dosieren).',
			3,
			0.5
		),
		vor(
			'Karotten schälen und in dünne Scheiben schneiden. Lauch putzen, in feine Ringe schneiden und gründlich waschen.',
			3.5
		),
		pfanne(
			1,
			'Rapsöl in einem großen Topf erhitzen, Karotten und Lauch darin 2 Min. andünsten.',
			2,
			0.5
		),
		pfanne(
			2,
			'Brühe angießen, aufkochen lassen, Nudeln und {prot} hineingeben und offen 10 Min. leise köcheln lassen. Die Erbsen für die letzten 3 Min. dazugeben.',
			11,
			1
		),
		nebenbei('Petersilie waschen, trocken schütteln und hacken.', 1),
		pfanne(3, 'Petersilie unterrühren und mit Pfeffer abschmecken.', 0, 0.5),
		anrichten('Suppe in Schalen oder Thermobehälter füllen.', 0.5)
	],
	tmSchritte: [
		start('800 ml Wasser im Wasserkocher aufkochen.', 3, 0.5),
		vor(
			'Karotten schälen und in Stücke brechen. Lauch putzen, in grobe Stücke schneiden und gründlich waschen.',
			2.5
		),
		tm(1, 'Karotten und Lauch in den Mixtopf geben und 3 Sek./Stufe 4 zerkleinern.', 0, 0.5),
		tm(2, 'Rapsöl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			3,
			'Heißes Wasser und Brühpulver (für das Kind schwach dosiert) zugeben, Nudeln und {prot} hineingeben und 12 Min./100 °C/Linkslauf/Stufe 1 garen. Die Erbsen nach 8 Min. durch die Deckelöffnung zugeben.',
			12,
			1
		),
		nebenbei('Petersilie waschen, trocken schütteln und hacken.', 1),
		tm(
			4,
			'Petersilie zugeben, 10 Sek./Linkslauf/Stufe 1 unterrühren und mit Pfeffer abschmecken.',
			0,
			0.5
		),
		anrichten('Suppe in Schalen oder Thermobehälter füllen.', 0.5)
	],
	slots: [
		one(
			'prot',
			'Eiweiß',
			'main',
			'haehnchen',
			[
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(300, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(1.5, 'Währenddessen Hähnchen in 1–2 cm große Würfel schneiden.', 0, 2),
						pfanne(
							2.5,
							'Ein Hähnchenstück aufschneiden: Es muss innen weiß und nicht mehr rosa sein, sonst noch 2 Min. weiterköcheln.',
							0,
							0.5
						)
					],
					tmSteps: [
						tm(2.5, 'Währenddessen Hähnchen in 1–2 cm große Würfel schneiden.', 0, 2),
						tm(
							3.5,
							'Ein Hähnchenstück aufschneiden: Es muss innen weiß und nicht mehr rosa sein, sonst noch 2 Min./100 °C/Linkslauf/Stufe 1 weitergaren.',
							0,
							0.5
						)
					]
				},
				{
					id: 'bohnen',
					label: 'Weiße Bohnen & Parmesan',
					short: 'Bohnen',
					items: [ing(1, 'Dose', 'weiße Bohnen (Dose)'), ing(30, 'g', 'Parmesan')],
					steps: [
						pfanne(
							1.5,
							'Währenddessen Bohnen in einem Sieb abspülen und abtropfen lassen.',
							0,
							0.5
						),
						anrichten('Mit frisch geriebenem Parmesan bestreuen.', 0.5)
					],
					tmSteps: [
						tm(2.5, 'Währenddessen Bohnen in einem Sieb abspülen und abtropfen lassen.', 0, 0.5),
						anrichten('Mit frisch geriebenem Parmesan bestreuen.', 0.5)
					]
				}
			],
			'bohnen'
		)
	],
	kind: 'Suppe für das Kind etwas abkühlen lassen und mit der Schere Hähnchen und Nudeln klein schneiden. Brühe schwach dosieren und erst nach dem Abnehmen der Kinderportion nachwürzen. Bohnen leicht zerdrücken.',
	mitnehmen:
		'Rasch abkühlen lassen und in ein dicht schließendes Glas oder eine Box füllen. In der Arbeit 3 Min. in der Mikrowelle dampfend heiß erhitzen, zwischendurch umrühren. Oder morgens heiß in einen vorgewärmten Thermobehälter füllen.',
	vorrat:
		'Hält im Kühlschrank 2 Tage. Die Nudeln saugen Brühe auf: Für mehrere Tage die Nudeln lieber getrennt kochen und erst beim Aufwärmen dazugeben. Ohne Nudeln lässt sich die Suppe bis zu 3 Monate einfrieren.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornnudeln senken die Kohlenhydrate und bringen mehr Eiweiß. Oder die Nudelmenge halbieren und dafür mehr Gemüse nehmen.',
	tags: ['suppe', 'pasta', 'vorkochen'],
	photoAlt:
		'Weiße Suppenschale mit klarer Brühe, Hähnchenwürfeln, Karottenscheiben, Lauchringen, grünen Erbsen und kleinen Vollkornnudeln, bestreut mit Petersilie'
});
