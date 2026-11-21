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
	id: 'bohnen-reis-topf',
	name: 'Mexikanischer Bohnen-Reis-Topf',
	kategorie: 'mittag',
	beschreibung:
		'Kidneybohnen, Mais und Paprika in würziger Tomatensauce mit Kreuzkümmel, mit Vollkornreis vermischt und mit Käse und einem Klecks Skyr gekrönt.',
	portionen: 2,
	zutaten: [
		ing(1, 'EL', 'Rapsöl'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'Dose', 'Kidneybohnen (Dose)'),
		ing(70, 'g', 'Mais (Dose)', 'abgetropft'),
		ing(0.5, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(0.5, 'TL', 'Oregano (getrocknet)'),
		ing(0.5, 'Stk', 'Limette', 'Saft'),
		ing(0.25, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor('Zwiebel fein würfeln, Paprika in kleine Würfel schneiden.', 3),
		pfanne(
			1,
			'Rapsöl in einem großen Topf erhitzen, Zwiebel und Paprika darin 3 Min. andünsten. Knoblauch dazupressen, Kreuzkümmel und Paprikapulver kurz mitrösten.',
			3,
			1
		),
		pfanne(
			2,
			'Bohnen und Mais in einem Sieb abspülen und mit Tomaten, Oregano und 100 ml Wasser in den Topf geben. Offen 8 Min. köcheln lassen, bis die Sauce leicht eingedickt ist.',
			8,
			1.5
		),
		pfanne(3, '{base} unterheben und mit Limettensaft, Salz und Pfeffer abschmecken.', 0, 0.5),
		anrichten('In zwei Boxen oder tiefe Teller füllen.', 0.5, { order: 10 }),
		anrichten('Mit {top} servieren.', 0.5, { wenn: 'top', order: 90 })
	],
	tmSchritte: [
		vor('Zwiebel halbieren, Paprika entkernen und vierteln, Knoblauch schälen.', 1),
		tm(
			1,
			'Zwiebel, Paprika und Knoblauch in den Mixtopf geben, 4 Sek./Stufe 4 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			0.5
		),
		tm(
			2,
			'Rapsöl, Kreuzkümmel und Paprikapulver zugeben und 3 Min./120 °C/Stufe 1 dünsten.',
			3,
			0.5
		),
		tm(
			3,
			'Bohnen und Mais in einem Sieb abspülen und mit Tomaten, Oregano und 50 g Wasser in den Mixtopf geben. 12 Min./100 °C/Linkslauf/Stufe 1 garen.',
			12,
			1.5
		),
		tm(
			4,
			'In eine Schüssel umfüllen, {base} unterheben und mit Limettensaft, Salz und Pfeffer abschmecken.',
			0,
			1
		),
		anrichten('In zwei Boxen oder tiefe Teller füllen.', 0.5, { order: 10 }),
		anrichten('Mit {top} servieren.', 0.5, { wenn: 'top', order: 90 })
	],
	slots: [
		one('base', 'Beilage', 'base', 'reis', [
			{
				id: 'reis',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(60, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 130 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. leise köcheln lassen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(60, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 120 ml Wasser aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
					)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'kaese', [
			{
				id: 'kaese',
				label: 'Gouda',
				items: [ing(60, 'g', 'Gouda')],
				steps: [anrichten('Gouda darüberreiben, er schmilzt beim Aufwärmen.', 1, { order: 20 })]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenbrust',
				short: 'Hähnchen',
				items: [ing(250, 'g', 'Hähnchenbrustfilet')],
				steps: [
					pfanne(
						1.5,
						'Währenddessen Hähnchen in kleine Würfel schneiden, nach dem Gemüse in den Topf geben und 3 Min. rundum anbraten. Es gart danach in der Sauce weiter, bis es innen nicht mehr rosa ist.',
						3,
						2
					)
				],
				tmSteps: [
					tm(
						2.5,
						'Hähnchen in kleine Würfel schneiden und in den Mixtopf geben. Es gart im nächsten Schritt die vollen 12 Min. mit, bis es innen nicht mehr rosa ist.',
						0,
						2
					)
				]
			}
		]),
		many(
			'top',
			'Toppings',
			'top',
			['skyr'],
			[
				{
					id: 'skyr',
					label: 'Skyr-Klecks',
					short: 'einem Klecks Skyr',
					items: [ing(100, 'g', 'Skyr')]
				},
				{
					id: 'avocado',
					label: 'Avocado',
					short: 'Avocadowürfeln',
					items: [ing(0.5, 'Stk', 'Avocado')],
					steps: [nebenbei('Avocado würfeln und mit etwas Limettensaft beträufeln.', 1.5)]
				},
				{
					id: 'chili',
					label: 'Chiliflocken (nur Erwachsene)',
					short: 'Chiliflocken für die Erwachsenen',
					items: [fix(1, 'Prise', 'Chiliflocken')]
				}
			]
		)
	],
	kind: 'Eine Portion vor dem Salzen und ohne Chili abnehmen. Kidneybohnen mit der Gabel leicht zerdrücken, das macht sie für Dreijährige sicherer und cremiger. Mit Käse und Skyr obendrauf ist es mild genug.',
	mitnehmen:
		'Rasch abkühlen lassen und mit dem Käse obendrauf in eine Box füllen, Skyr getrennt einpacken. In der Arbeit 2–3 Min. in der Mikrowelle dampfend heiß erhitzen, dann den Skyr daraufsetzen.',
	vorrat:
		'Mit Reis nur bis zum nächsten Tag aufbewahren (gekochter Reis höchstens 1 Tag). Mit Quinoa hält der Topf 2 Tage im Kühlschrank; die Bohnen-Gemüse-Sauce ohne Reis lässt sich auch einfrieren.',
	gdm: 'Der Reisanteil ist bewusst klein, die Bohnen machen satt. Quinoa statt Reis nehmen oder die Beilage ganz weglassen und dafür mehr Paprika – und mit Hähnchen bleibt der Blutzucker noch ruhiger.',
	hinweis: 'Gekochten Reis schnell abkühlen und höchstens 1 Tag im Kühlschrank aufbewahren.',
	tags: ['pfanne', 'vorkochen'],
	photoAlt:
		'Schale mit Vollkornreis, roten Kidneybohnen, gelbem Mais und Paprika in Tomatensauce, darauf geschmolzener Käse und ein Klecks weißer Skyr'
});
