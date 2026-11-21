import { anrichten, ing, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const teller = anrichten(
	'Curry mit Limettensaft abschmecken und mit {base} anrichten. Je einen Klecks Skyr daraufsetzen.',
	1.5
);

export default rezept({
	id: 'fisch-curry',
	name: 'Mildes Fisch-Curry mit Spinat',
	kategorie: 'abend',
	beschreibung:
		'Zarter Seelachs in milder Kokos-Tomaten-Currysauce mit Spinat und Brokkoli, dazu Vollkorn-Basmati – cremig, aber nicht scharf.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Ingwer', 'frisch'),
		ing(1, 'EL', 'Rapsöl'),
		ing(1, 'EL', 'Currypulver (mild)'),
		ing(0.5, 'TL', 'Kurkuma'),
		ing(1, 'Dose', 'Kokosmilch (light)'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(450, 'g', 'TK-Blattspinat'),
		ing(300, 'g', 'TK-Brokkoli'),
		ing(0.5, 'TL', 'Jodsalz'),
		ing(1, 'Stk', 'Limette'),
		ing(200, 'g', 'Skyr', 'zum Servieren')
	],
	schritte: [
		vor('Zwiebel und Knoblauch fein würfeln, Ingwer schälen und fein reiben.', 3, { order: 10 }),
		pfanne(
			1,
			'Rapsöl in einem großen Topf oder einer tiefen Pfanne erhitzen, Zwiebel, Knoblauch und Ingwer 3 Min. andünsten. Currypulver und Kurkuma 30 Sek. mitrösten.',
			3.5,
			0.5
		),
		pfanne(
			2,
			'Kokosmilch, Tomaten, gefrorenen Spinat und Brokkoli sowie Salz dazugeben, aufkochen und zugedeckt 5 Min. köcheln lassen, bis das Gemüse aufgetaut und heiß ist.',
			6,
			1
		),
		teller
	],
	tmSchritte: [
		vor('Zwiebel halbieren, Ingwer schälen.', 0.5, { order: 10 }),
		tm(
			1,
			'Zwiebel, Knoblauch und Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			1
		),
		tm(2, 'Rapsöl, Currypulver und Kurkuma zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(3, 'Kokosmilch, Tomaten, gefrorenen Spinat und Brokkoli sowie Salz zugeben.', 0, 0.5),
		tm(5, '18 Min./Varoma/Linkslauf/Stufe 1 garen.', 18, 0.5),
		teller
	],
	slots: [
		one('base', 'Beilage', 'base', 'basmati', [
			{
				id: 'basmati',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(160, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. quellen lassen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(160, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 320 ml Wasser aufkochen und zugedeckt 15 Min. quellen lassen.',
						15
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'seelachs',
			[
				{
					id: 'seelachs',
					label: 'Seelachsfilet',
					short: 'Seelachs',
					items: [ing(600, 'g', 'Seelachsfilet')],
					steps: [
						vor('Seelachs trocken tupfen und in 4 cm große Stücke schneiden.', 1.5, { order: 20 }),
						pfanne(
							3,
							'Seelachs in die Sauce legen und zugedeckt bei kleiner Hitze 6–8 Min. gar ziehen lassen, bis er innen nicht mehr glasig ist und leicht zerfällt. Nur noch vorsichtig umrühren.',
							7,
							0.5
						)
					],
					tmSteps: [
						vor(
							'Seelachs trocken tupfen, in 4 cm große Stücke schneiden und in den Varoma-Behälter legen.',
							1.5,
							{ order: 20 }
						),
						tm(4, 'Varoma verschließen und aufsetzen.', 0, 0.5),
						tm(
							6,
							'Prüfen, ob der Fisch innen nicht mehr glasig ist (sonst 2–3 Min./Varoma weiterdämpfen), dann vorsichtig unter das Curry heben.',
							0,
							1
						)
					]
				},
				{
					id: 'garnelen',
					label: 'TK-Garnelen',
					short: 'Garnelen',
					items: [ing(400, 'g', 'TK-Garnelen')],
					steps: [
						vor('Garnelen in einem Sieb unter kaltem Wasser antauen lassen.', 1, { order: 20 }),
						pfanne(
							3,
							'Garnelen in die Sauce geben und 5 Min. köcheln lassen, bis sie rundum rosa und innen nicht mehr glasig sind.',
							5,
							0.5
						)
					],
					tmSteps: [
						vor('Garnelen gefroren in den Varoma-Behälter geben.', 0.5, { order: 20 }),
						tm(4, 'Varoma verschließen und aufsetzen.', 0, 0.5),
						tm(
							6,
							'Prüfen, ob die Garnelen rundum rosa und innen nicht mehr glasig sind (sonst 2–3 Min./Varoma weiterdämpfen), dann unter das Curry heben.',
							0,
							1
						)
					]
				},
				{
					id: 'kichererbsen',
					label: 'Kichererbsen',
					items: [ing(2, 'Dose', 'Kichererbsen (Dose)')],
					steps: [
						vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 20 }),
						pfanne(3, 'Kichererbsen dazugeben und 5 Min. mitköcheln.', 5, 0.5)
					],
					tmSteps: [
						vor('Kichererbsen in einem Sieb abspülen und abtropfen lassen.', 1, { order: 20 }),
						tm(4, 'Kichererbsen in den Mixtopf geben.', 0, 0.5)
					]
				}
			],
			'kichererbsen'
		)
	],
	kind: 'Das Curry ist mild, Kokos und Currypulver schmecken eher süßlich als scharf. Fisch auf Gräten prüfen und zerpflücken, Brokkoli klein schneiden und alles mit Reis vermischen. Garnelen klein schneiden, Kichererbsen leicht zerdrücken.',
	mitnehmen:
		'Curry und Reis getrennt in Boxen füllen und rasch abkühlen. Gekochten Reis spätestens am nächsten Tag essen. Alles zusammen in der Mikrowelle 3 Min. dampfend heiß erhitzen, Skyr kalt dazu.',
	vorrat:
		'Die Currysauce ohne Fisch kannst du am Vortag kochen, sie hält 2 Tage. Abends aufkochen und den Fisch frisch darin garen.',
	gdm: 'Quinoa statt Reis nehmen oder die Reismenge halbieren und mehr Brokkoli dazugeben. Den Skyr-Klecks nicht vergessen, das Eiweiß bremst den Blutzucker.',
	tags: ['pfanne'],
	photoAlt:
		'Mildes gelbes Kokos-Curry mit zarten Seelachsstücken, Spinat und Brokkoli in einer Schale, daneben Vollkorn-Basmati, ein Klecks Skyr und Limettenspalten'
});
