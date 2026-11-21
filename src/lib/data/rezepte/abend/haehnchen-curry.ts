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

export default rezept({
	id: 'haehnchen-curry',
	name: 'Mildes Hähnchen-Kichererbsen-Curry mit Spinat',
	kategorie: 'abend',
	beschreibung:
		'Cremiges, mildes Curry mit leichter Kokosmilch, Kichererbsen und viel Spinat, das auch Kindern schmeckt und am nächsten Tag fast noch besser ist.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Ingwer', 'frisch'),
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'TL', 'Currypulver (mild)'),
		ing(1, 'TL', 'Garam Masala'),
		ing(0.5, 'TL', 'Kurkuma'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(1, 'Dose', 'Kokosmilch (light)'),
		ing(1, 'Dose', 'Kichererbsen (Dose)'),
		ing(250, 'g', 'TK-Blattspinat'),
		ing(0.5, 'TL', 'Jodsalz')
	],
	schritte: [
		vor('Zwiebel fein würfeln, Knoblauch und Ingwer schälen und fein reiben.', 2.5),
		vor('Kichererbsen in einem Sieb abgießen und abspülen.', 0.5),
		pfanne(
			1,
			'Öl in einer großen, tiefen Pfanne erhitzen und die Zwiebel darin bei mittlerer Hitze 2 Min. andünsten.',
			2,
			0.5
		),
		pfanne(
			3,
			'Knoblauch, Ingwer, Currypulver, Garam Masala, Kurkuma und Tomatenmark dazugeben und 1 Min. unter Rühren anrösten.',
			1,
			0.5
		),
		pfanne(
			4,
			'Tomaten, Kokosmilch, Kichererbsen und den gefrorenen Spinat dazugeben, aufkochen und zugedeckt bei mittlerer Hitze 8 Min. köcheln lassen. Zwischendurch umrühren, bis der Spinat ganz aufgetaut und alles heiß ist.',
			8,
			1
		),
		pfanne(
			6,
			'Mit ½ TL Salz abschmecken, die Kinderportion abnehmen und für Erwachsene nach Belieben nachwürzen.',
			0,
			0.5
		),
		anrichten('Curry mit {base} servieren.', 0.5),
		anrichten('Mit {top} anrichten.', 0.5, { wenn: 'top' })
	],
	tmSchritte: [
		vor(
			'Zwiebel halbieren, Knoblauch und Ingwer schälen. Kichererbsen in einem Sieb abgießen und abspülen.',
			1.5
		),
		tm(
			1,
			'Zwiebel, Knoblauch und Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0.5,
			0.5
		),
		tm(2, 'Öl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			3,
			'Currypulver, Garam Masala, Kurkuma und Tomatenmark zugeben und 1 Min./100 °C/Stufe 1 anschwitzen.',
			1,
			0.5
		),
		tm(
			5,
			'Tomaten, Kokosmilch, Kichererbsen und den gefrorenen Spinat zugeben und 15 Min./100 °C/Linkslauf/Stufe 1 garen. Den Garkorb als Spritzschutz auf den Deckel stellen.',
			15,
			1
		),
		tm(
			7,
			'Mit ½ TL Salz abschmecken, die Kinderportion abnehmen und für Erwachsene nach Belieben nachwürzen.',
			0,
			0.5
		),
		anrichten('Curry mit {base} servieren.', 0.5),
		anrichten('Mit {top} anrichten.', 0.5, { wenn: 'top' })
	],
	slots: [
		one('base', 'Beilage', 'base', 'basmati', [
			{
				id: 'basmati',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(200, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 450 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. quellen lassen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(200, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
					)
				]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'warmer Pita',
				items: [ing(4, 'Stk', 'Vollkorn-Pita')],
				steps: [
					nebenbei('Pita im Toaster oder in einer trockenen Pfanne aufbacken und in Streifen schneiden.', 1)
				]
			}
		]),
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
					items: [ing(500, 'g', 'Hähnchenbrustfilet')],
					steps: [
						pfanne(
							2,
							'Währenddessen Hähnchen in 2 cm große Würfel schneiden, zur Zwiebel geben und 4 Min. rundum anbraten.',
							4,
							2.5
						),
						pfanne(
							5,
							'Ein großes Stück Hähnchen aufschneiden: Es muss innen durchgehend weiß sein, sonst noch 2 Min. weiterköcheln.',
							0,
							0.5
						)
					],
					tmSteps: [
						tm(
							4,
							'Hähnchen in 2 cm große Würfel schneiden (geht, während die Zwiebel dünstet) und in den Mixtopf geben.',
							0,
							2.5
						),
						tm(
							6,
							'Ein großes Stück Hähnchen aufschneiden: Es muss innen durchgehend weiß sein, sonst noch 3 Min./100 °C/Linkslauf/Stufe 1 weitergaren.',
							0,
							0.5
						)
					]
				},
				{
					id: 'tofu',
					label: 'Tofu',
					items: [ing(400, 'g', 'Tofu natur')],
					steps: [
						pfanne(
							2,
							'Währenddessen Tofu trocken tupfen, in 2 cm große Würfel schneiden, zur Zwiebel geben und 4 Min. mitbraten.',
							4,
							2
						)
					],
					tmSteps: [
						tm(
							4,
							'Tofu trocken tupfen, in 2 cm große Würfel schneiden (geht, während die Zwiebel dünstet) und in den Mixtopf geben.',
							0,
							2
						)
					]
				}
			],
			'tofu'
		),
		many(
			'top',
			'Topping',
			'top',
			['joghurt'],
			[
				{
					id: 'joghurt',
					label: 'Joghurt',
					short: 'einem Klecks Joghurt',
					items: [ing(150, 'g', 'Naturjoghurt')]
				},
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					short: 'Chiliflocken für die Erwachsenen',
					items: [fix(1, 'TL', 'Chiliflocken')]
				}
			]
		)
	],
	kind: 'Die Kinderportion vor dem Nachwürzen abnehmen und mit einem Löffel Joghurt mild und lauwarm rühren. Kichererbsen leicht zerdrücken und Hähnchen in kleine Stücke schneiden. Chili gibt es nur für die Großen.',
	mitnehmen:
		'Curry und Beilage in eine Box füllen, rasch abkühlen lassen und in den Kühlschrank stellen. Am nächsten Mittag 3 Min. in der Mikrowelle erhitzen, umrühren und noch 1 Min. weiter, bis alles dampfend heiß ist. Joghurt kalt dazu.',
	vorrat:
		'Das Curry hält 2 Tage im Kühlschrank und lässt sich portionsweise einfrieren (3 Monate). Gekochten Reis höchstens 1 Tag aufheben.',
	gdm: 'Die Beilage auf die Hälfte reduzieren und dafür eine Handvoll Spinat mehr nehmen. Quinoa bringt mehr Eiweiß als Reis, und der Joghurt-Klecks bremst den Blutzucker zusätzlich.',
	tags: ['pfanne', 'vorkochen'],
	photoAlt:
		'Tiefer Teller mit goldgelbem Hähnchen-Kichererbsen-Curry mit Spinat neben Vollkorn-Basmati, darauf ein Klecks Joghurt, daneben ein Holzlöffel'
});
