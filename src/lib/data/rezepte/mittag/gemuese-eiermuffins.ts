import { anrichten, fix, ing, nebenbei, NONE, ofen, one, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'gemuese-eiermuffins',
	name: 'Gemüse-Eier-Muffins mit Vollkornbrot',
	kategorie: 'mittag',
	beschreibung:
		'Saftige Eier-Muffins mit Paprika, Spinat und Feta aus dem Muffinblech – einmal backen, mehrere Tage Mittagessen. Dazu Vollkornbrot und Gurkensticks.',
	portionen: 2,
	zutaten: [
		ing(6, 'Stk', 'Ei'),
		ing(50, 'ml', 'Milch'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(2, 'Hv', 'Babyspinat'),
		ing(2, 'Stk', 'Frühlingszwiebel'),
		ing(1, 'TL', 'Rapsöl', 'für die Form'),
		ing(0.5, 'Stk', 'Salatgurke'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor(
			'Backofen auf 180 °C Ober-/Unterhitze (160 °C Umluft) vorheizen. 8 Mulden eines Muffinblechs mit Rapsöl einfetten oder Silikonförmchen nehmen.',
			1,
			{ order: 0 }
		),
		vor(
			'Paprika in kleine Würfel schneiden, Spinat gründlich waschen und grob hacken, Frühlingszwiebeln in feine Ringe schneiden. Gemüse auf die Mulden verteilen.',
			4.5
		),
		vor(
			'Eier mit Milch, Salz und Pfeffer verquirlen und über das Gemüse gießen, die Mulden zu drei Vierteln füllen.',
			1.5,
			{ order: 60 }
		),
		ofen(
			'Im Ofen 20–22 Min. backen, bis die Muffins aufgegangen und auch in der Mitte ganz fest sind. Mit einem Holzstäbchen prüfen: Es darf kein flüssiges Ei mehr daran kleben.',
			22,
			0.5
		),
		nebenbei('Gurke in Sticks schneiden.', 1),
		anrichten(
			'Muffins 5 Min. in der Form abkühlen lassen, mit einem Messer vom Rand lösen und mit {base} und Gurkensticks servieren.',
			1
		)
	],
	tmSchritte: [
		vor(
			'Backofen auf 180 °C Ober-/Unterhitze (160 °C Umluft) vorheizen. 8 Mulden eines Muffinblechs mit Rapsöl einfetten oder Silikonförmchen nehmen.',
			1,
			{ order: 0 }
		),
		vor(
			'Paprika in grobe Stücke schneiden, Frühlingszwiebeln dritteln, Spinat gründlich waschen.',
			1.5
		),
		vor(
			'Paprika und Frühlingszwiebeln in den Mixtopf geben und 4 Sek./Stufe 5 zerkleinern. Spinat zugeben, 3 Sek./Stufe 4 grob hacken und das Gemüse auf die Mulden verteilen.',
			1.5,
			{ order: 51 }
		),
		vor(
			'Eier, Milch, Salz und Pfeffer in den Mixtopf geben (Gemüsereste dürfen drinbleiben), 10 Sek./Stufe 4 verquirlen und über das Gemüse gießen, die Mulden zu drei Vierteln füllen.',
			1,
			{ order: 60 }
		),
		ofen(
			'Im Ofen 20–22 Min. backen, bis die Muffins aufgegangen und auch in der Mitte ganz fest sind. Mit einem Holzstäbchen prüfen: Es darf kein flüssiges Ei mehr daran kleben.',
			22,
			0.5
		),
		nebenbei('Gurke in Sticks schneiden.', 1),
		anrichten(
			'Muffins 5 Min. in der Form abkühlen lassen, mit einem Messer vom Rand lösen und mit {base} und Gurkensticks servieren.',
			1
		)
	],
	slots: [
		one('base', 'Brot', 'base', 'brot', [
			{
				id: 'brot',
				label: 'Vollkornbrot',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(6, 'Scheibe', 'Vollkorn-Knäckebrot')]
			},
			{
				id: 'broetchen',
				label: 'Vollkornbrötchen',
				items: [ing(2, 'Stk', 'Vollkornbrötchen')]
			}
		]),
		one('kaese', 'Käse', 'top', 'feta', [
			{
				id: 'feta',
				label: 'Feta',
				items: [ing(60, 'g', 'Feta')],
				steps: [
					vor('Feta zerbröseln und vor der Eimasse auf das Gemüse streuen.', 0.5, { order: 55 })
				]
			},
			{
				id: 'gouda',
				label: 'Gouda',
				items: [ing(50, 'g', 'Gouda')],
				steps: [vor('Gouda reiben und vor der Eimasse auf das Gemüse streuen.', 1, { order: 55 })],
				tmSteps: [
					vor(
						'Gouda in Stücken in den leeren Mixtopf geben, 5 Sek./Stufe 8 reiben und umfüllen.',
						0.5,
						{ order: 45 }
					),
					vor('Geriebenen Gouda vor der Eimasse auf das Gemüse streuen.', 0.5, { order: 55 })
				]
			},
			NONE
		])
	],
	kind: 'Ein Muffin ist genau richtig für Kinderhände – halbieren, etwas abkühlen lassen und mit einem Stück Brot und Gurkensticks servieren. Für das Kind ruhig die Variante mit mildem Gouda backen.',
	mitnehmen:
		'Abgekühlte Muffins in einer Box in den Kühlschrank stellen. In der Arbeit 1 Min. in der Mikrowelle dampfend heiß erhitzen (sie schmecken auch warm am besten), Brot und Gurke getrennt einpacken.',
	vorrat:
		'Meal-Prep für drei Tage: Muffins gleich nach dem Abkühlen einpacken. Was du an den nächsten beiden Tagen isst, kommt in den Kühlschrank; die Portion für den dritten Tag frierst du ein und lässt sie am Vorabend im Kühlschrank auftauen. Eingefroren halten sie 2 Monate.',
	gdm: 'Knäckebrot statt Brot spart Kohlenhydrate, oder nimm nur eine Scheibe Brot und dafür mehr Gemüsesticks. Die Eier halten den Blutzucker angenehm ruhig.',
	hinweis:
		'Eier-Muffins immer ganz durchbacken, bis kein flüssiges Ei mehr zu sehen ist, und vor dem Essen dampfend heiß erhitzen.',
	tags: ['ofen', 'brot', 'vorkochen'],
	photoAlt:
		'Goldgelbe Eier-Muffins mit sichtbaren Paprika- und Spinatstückchen auf einem Gitter, daneben Vollkornbrotscheiben und Gurkensticks'
});
