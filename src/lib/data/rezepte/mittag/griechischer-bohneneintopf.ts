import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, tm, vor } from '../../helpers.ts';

export default rezept({
	id: 'griechischer-bohneneintopf',
	name: 'Griechischer Bohneneintopf mit Dill und Feta',
	kategorie: 'mittag',
	beschreibung:
		'Weiße Bohnen in würziger Tomatensauce mit einem Hauch Zimt, frischem Dill und zerbröseltem Feta – wie Gigantes aus dem Ofen, nur viel schneller.',
	portionen: 2,
	zutaten: [
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(2, 'Dose', 'weiße Bohnen (Dose)'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		fix(1, 'Prise', 'Zimt (Ceylon)'),
		ing(0.5, 'Bund', 'Dill'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor(
			'Zwiebel fein würfeln, Knoblauch schälen. Bohnen in einem Sieb abspülen und abtropfen lassen.',
			2
		),
		pfanne(
			1,
			'Olivenöl in einem Topf erhitzen und die Zwiebel darin 3 Min. glasig dünsten. Währenddessen die Karotte schälen und grob dazuraspeln.',
			3,
			2
		),
		pfanne(
			2,
			'Knoblauch dazupressen und das Tomatenmark kurz mitrösten. Bohnen, Tomaten, Oregano, Zimt und 100 ml Wasser zugeben und zugedeckt 10 Min. sanft köcheln lassen.',
			10,
			1
		),
		nebenbei('Dill waschen, trocken schütteln und fein schneiden.', 1),
		pfanne(3, 'Dill und Zitronensaft unterrühren, mit Salz und Pfeffer abschmecken.', 0, 0.5),
		anrichten('Eintopf in Schalen oder Boxen füllen.', 0.5)
	],
	tmSchritte: [
		vor(
			'Zwiebel halbieren, Knoblauch schälen, Karotte schälen und in Stücke brechen. Bohnen in einem Sieb abspülen und abtropfen lassen.',
			2
		),
		tm(
			1,
			'Zwiebel, Knoblauch und Karotte in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			0.5
		),
		tm(2, 'Olivenöl und Tomatenmark zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			3,
			'Bohnen, Tomaten, Oregano, Zimt und 100 g Wasser zugeben und 14 Min./100 °C/Linkslauf/Stufe 1 garen.',
			14,
			1
		),
		nebenbei('Dill waschen, trocken schütteln und fein schneiden.', 1),
		tm(
			4,
			'Dill und Zitronensaft zugeben, 10 Sek./Linkslauf/Stufe 1 unterrühren und mit Salz und Pfeffer abschmecken.',
			0,
			0.5
		),
		anrichten('Eintopf in Schalen oder Boxen füllen.', 0.5)
	],
	slots: [
		one(
			'prot',
			'Eiweiß',
			'main',
			'feta',
			[
				{
					id: 'feta',
					label: 'Feta',
					items: [ing(100, 'g', 'Feta')],
					steps: [anrichten('Feta darüberbröseln.', 0.5)]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(250, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							1.5,
							'Hähnchen in 2 cm große Würfel schneiden, zur Zwiebel geben und 2 Min. rundum anbraten. Es gart danach im Eintopf weiter, bis es innen nicht mehr rosa ist.',
							2,
							2
						)
					],
					tmSteps: [
						tm(
							2.5,
							'Hähnchen in 2 cm große Würfel schneiden und in den Mixtopf geben. Es gart im nächsten Schritt die vollen 14 Min. mit, bis es innen nicht mehr rosa ist.',
							0,
							2
						)
					]
				}
			],
			'feta'
		)
	],
	kind: 'Eine Portion vor dem Nachwürzen abnehmen. Weiße Bohnen sind weich genug für Dreijährige, große Exemplare mit der Gabel leicht andrücken. Feta ist salzig: für das Kind nur ein paar Krümel.',
	mitnehmen:
		'Rasch abkühlen lassen und in einer Box in den Kühlschrank stellen. In der Arbeit 2–3 Min. in der Mikrowelle dampfend heiß erhitzen, einmal umrühren. Feta getrennt in einem Döschen mitnehmen und erst nach dem Aufwärmen darüberbröseln.',
	vorrat:
		'Schmeckt am zweiten Tag am besten und hält 2 Tage im Kühlschrank. Ohne Feta lässt sich der Eintopf portionsweise bis zu 3 Monate einfrieren.',
	gdm: 'Bohnen haben viele Ballaststoffe und bremsen den Blutzuckeranstieg. Brot dazu ist nicht nötig; wer mag, nimmt eine halbe Scheibe Vollkornbrot oder eine Handvoll Rohkost.',
	tags: ['suppe', 'vorkochen'],
	photoAlt:
		'Tiefer Teller mit weißen Bohnen in stückiger Tomatensauce, bestreut mit zerbröseltem Feta und frischem Dill, daneben eine Zitronenspalte'
});
