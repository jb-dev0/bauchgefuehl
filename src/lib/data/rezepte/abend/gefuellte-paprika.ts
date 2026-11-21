import { anrichten, ing, ofen, one, pfanne, rezept, tm, vor } from '../../helpers.ts';

const backen = ofen(
	'Füllung in die Paprikahälften häufen, übrige Füllung um die Paprika herum in die Form geben. Restlichen Feta darüberbröseln und 25 Min. backen, bis die Paprika weich ist.',
	25,
	2
);
const petersilie = anrichten(
	'Petersilie waschen, trocken schütteln, fein hacken und darüberstreuen.',
	1
);

export default rezept({
	id: 'gefuellte-paprika',
	name: 'Gefüllte Paprika mit Bulgur und Feta',
	kategorie: 'abend',
	beschreibung:
		'Ofenpaprika mit einer würzigen Füllung aus Bulgur, Tomate und Linsen, überbacken mit Feta – lässt sich wunderbar vorbereiten.',
	portionen: 4,
	zutaten: [
		ing(4, 'Stk', 'rote Paprika', 'große'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Olivenöl'),
		ing(120, 'g', 'Bulgur'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(0.5, 'TL', 'Jodsalz'),
		ing(200, 'g', 'Feta'),
		ing(0.5, 'Bund', 'Petersilie')
	],
	schritte: [
		vor('Backofen auf 200 °C Ober-/Unterhitze (180 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Paprika längs halbieren, Kerne und weiße Häutchen entfernen und die Hälften mit der Öffnung nach oben in eine große Auflaufform setzen.',
			3,
			{ order: 10 }
		),
		vor('Zwiebel und Knoblauch fein würfeln.', 2, { order: 20 }),
		pfanne(
			1,
			'Olivenöl in einer großen Pfanne erhitzen, Zwiebel und Knoblauch darin 2 Min. andünsten.',
			2,
			0.5
		),
		pfanne(
			3,
			'Bulgur, Tomaten, Tomatenmark, Paprikapulver, Oregano, Salz und 200 ml Wasser dazugeben, aufkochen und zugedeckt bei kleiner Hitze 8 Min. quellen lassen.',
			9,
			1
		),
		pfanne(5, 'Pfanne vom Herd nehmen, die Hälfte des Fetas hineinbröseln und unterheben.', 0, 0.5),
		backen,
		petersilie
	],
	tmSchritte: [
		vor('Backofen auf 200 °C Ober-/Unterhitze (180 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Paprika längs halbieren, Kerne und weiße Häutchen entfernen und die Hälften mit der Öffnung nach oben in eine große Auflaufform setzen.',
			3,
			{ order: 10 }
		),
		tm(
			1,
			'Zwiebel halbieren, mit Knoblauch in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Olivenöl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			4,
			'Bulgur, Tomaten, Tomatenmark, Paprikapulver, Oregano, Salz und 200 g Wasser zugeben und 10 Min./100 °C/Linkslauf/Stufe 1 garen.',
			10,
			1
		),
		tm(6, 'Die Hälfte des Fetas hineinbröseln und 5 Sek./Linkslauf/Stufe 2 unterheben.', 0, 0.5),
		backen,
		petersilie
	],
	slots: [
		one('prot', 'Eiweiß', 'main', 'linsen', [
			{
				id: 'linsen',
				label: 'Linsen',
				items: [ing(2, 'Dose', 'Linsen (Dose)')],
				steps: [
					vor('Linsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 30 }),
					pfanne(4, 'Linsen unter die Füllung rühren.', 0, 0.5)
				],
				tmSteps: [
					vor('Linsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 30 }),
					tm(5, 'Linsen zugeben und 10 Sek./Linkslauf/Stufe 2 unterrühren.', 0, 0.5)
				]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenhack',
				items: [ing(400, 'g', 'Hähnchenhack')],
				steps: [
					pfanne(
						2,
						'Hähnchenhack dazugeben und 5 Min. krümelig braten, bis nichts mehr rosa ist.',
						5,
						1
					)
				],
				tmSteps: [
					tm(
						3,
						'Hähnchenhack zugeben und 6 Min./120 °C/Linkslauf/Stufe 1 garen, bis nichts mehr rosa ist.',
						6,
						1
					)
				]
			},
			{
				id: 'rind',
				label: 'Rinderhack',
				items: [ing(400, 'g', 'Rinderhack')],
				steps: [
					pfanne(
						2,
						'Rinderhack dazugeben und 5 Min. krümelig braten, bis nichts mehr rosa ist.',
						5,
						1
					)
				],
				tmSteps: [
					tm(
						3,
						'Rinderhack zugeben und 6 Min./120 °C/Linkslauf/Stufe 1 garen, bis nichts mehr rosa ist.',
						6,
						1
					)
				]
			}
		])
	],
	kind: 'Eine halbe Paprika mit Füllung klein schneiden; die weiche Ofenhaut lässt sich leicht abziehen, falls das Kind sie nicht mag. Feta ist salzig, darum auf der Kinderportion nur wenig davon und nichts nachsalzen.',
	mitnehmen:
		'Hält im Kühlschrank 1–2 Tage. In einer Box mit Deckel 3 Min. in der Mikrowelle dampfend heiß erhitzen, die Paprika vorher einmal durchschneiden, damit die Füllung innen heiß wird.',
	vorrat:
		'Die Füllung kannst du am Vortag kochen, sie hält 2 Tage im Kühlschrank. Abends nur noch füllen und backen – dann ist das Essen in 10 Minuten im Ofen.',
	gdm: 'Etwas weniger Bulgur und dafür mehr Linsen in die Füllung geben. Ein Klecks Skyr oder Joghurt dazu bringt zusätzliches Eiweiß.',
	tags: ['ofen', 'vorkochen'],
	photoAlt:
		'Auflaufform mit gefüllten roten Paprikahälften, Bulgur-Linsen-Füllung mit Tomate, goldbraun überbackenem Feta und frischer Petersilie'
});
