import {
	anrichten,
	fix,
	ing,
	many,
	nebenbei,
	one,
	pfanne,
	rezept,
	sauce,
	start,
	tm,
	vor
} from '../../helpers.ts';

const spinatWaschen = nebenbei('Spinat gründlich waschen und abtropfen lassen.', 1);
const servieren = [
	sauce('Skyr mit 2–3 EL Wasser und 1 Prise Salz cremig rühren.', 0.5),
	anrichten('Dal mit {base} servieren und je einen großen Klecks Skyr daraufgeben.', 1),
	anrichten('Mit {top} bestreuen.', 0.5, { wenn: 'top' })
];

export default rezept({
	id: 'rote-linsen-dal',
	name: 'Rote-Linsen-Dal mit Spinat und Joghurt',
	kategorie: 'abend',
	beschreibung:
		'Sämiges, mild gewürztes Dal aus roten Linsen mit Tomaten, leichter Kokosmilch und Spinat, dazu ein kühler Klecks Skyr-Joghurt.',
	portionen: 4,
	zutaten: [
		ing(200, 'g', 'Rote Linsen'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Ingwer', 'frisch'),
		ing(1, 'EL', 'Rapsöl'),
		ing(2, 'TL', 'Currypulver (mild)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(1, 'TL', 'Kurkuma'),
		ing(1, 'TL', 'Garam Masala'),
		ing(200, 'g', 'gehackte Tomaten (Dose)', '½ Dose'),
		ing(200, 'ml', 'Kokosmilch (light)', '½ Dose'),
		ing(200, 'g', 'Babyspinat'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(0.5, 'TL', 'Jodsalz'),
		ing(250, 'g', 'Skyr', 'zum Servieren')
	],
	schritte: [
		vor('Zwiebel fein würfeln. Linsen in einem Sieb abspülen, bis das Wasser klar abläuft.', 2.5),
		pfanne(
			1,
			'Öl in einem Topf erhitzen und die Zwiebel darin 3 Min. glasig dünsten. Währenddessen Knoblauch und Ingwer schälen und fein reiben.',
			3,
			1.5
		),
		pfanne(
			2,
			'Knoblauch, Ingwer, Currypulver, Kreuzkümmel, Kurkuma und Garam Masala dazugeben und 1 Min. unter Rühren anrösten.',
			1,
			0.5
		),
		pfanne(
			3,
			'Linsen, Tomaten, Kokosmilch und 500 ml Wasser dazugeben, aufkochen und halb zugedeckt bei mittlerer Hitze 12 Min. köcheln lassen, bis die Linsen zerfallen. Gelegentlich umrühren, bei Bedarf etwas Wasser nachgießen.',
			12,
			1
		),
		spinatWaschen,
		pfanne(
			4,
			'Spinat unterrühren und 1–2 Min. zusammenfallen lassen. Mit Zitronensaft und ½ TL Salz abschmecken und die Kinderportion abnehmen.',
			2,
			0.5
		),
		...servieren
	],
	tmSchritte: [
		vor('Zwiebel halbieren, Knoblauch und Ingwer schälen. Linsen in einem Sieb abspülen.', 1.5),
		tm(
			1,
			'Zwiebel, Knoblauch und Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0.5,
			0.5
		),
		tm(
			2,
			'Öl, Currypulver, Kreuzkümmel, Kurkuma und Garam Masala zugeben und 3 Min./120 °C/Stufe 1 dünsten.',
			3,
			0.5
		),
		tm(
			3,
			'Linsen, Tomaten, Kokosmilch, 450 g Wasser und ½ TL Salz zugeben und 13 Min./100 °C/Linkslauf/Stufe 1 garen. Den Garkorb als Spritzschutz auf den Deckel stellen.',
			13,
			1
		),
		spinatWaschen,
		tm(
			4,
			'Spinat und Zitronensaft zugeben, 2 Min./100 °C/Linkslauf/Stufe 1 garen und die Kinderportion abnehmen.',
			2,
			0.5
		),
		...servieren
	],
	slots: [
		one('base', 'Beilage', 'base', 'basmati', [
			{
				id: 'basmati',
				label: 'Vollkorn-Basmati',
				short: 'Reis',
				items: [ing(150, 'g', 'Vollkorn-Basmati')],
				steps: [
					start(
						'Reis mit 350 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 20 Min. quellen lassen.',
						22
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(150, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 300 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
					)
				]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'warmer Pita',
				items: [ing(3, 'Stk', 'Vollkorn-Pita')],
				steps: [
					nebenbei(
						'Pita im Toaster oder in einer trockenen Pfanne aufbacken und in Streifen schneiden.',
						1
					)
				]
			}
		]),
		many(
			'top',
			'Toppings',
			'top',
			['kerne'],
			[
				{
					id: 'kerne',
					label: 'Kürbiskerne (für Erwachsene)',
					short: 'Kürbiskernen',
					items: [ing(2, 'EL', 'Kürbiskerne')],
					steps: [
						nebenbei('Kürbiskerne in einer trockenen Pfanne 2–3 Min. rösten, bis sie duften.', 1)
					]
				},
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					short: 'Chiliflocken',
					items: [fix(1, 'TL', 'Chiliflocken')]
				}
			]
		)
	],
	kind: 'Dal ist von sich aus weich und mild: Die Kinderportion vor dem Nachwürzen abnehmen und mit einem Klecks Skyr verrühren. Kürbiskerne bekommt das Kind nicht (Verschluckungsgefahr), Chili gibt es nur für die Großen.',
	mitnehmen:
		'Dal in eine Box füllen, rasch abkühlen lassen und kühl stellen. Es dickt nach, darum vor dem Aufwärmen 2–3 EL Wasser einrühren, 3 Min. in der Mikrowelle erhitzen, umrühren und noch 1 Min. weiter, bis es dampfend heiß ist. Skyr kalt dazu.',
	vorrat:
		'Dal hält 2 Tage im Kühlschrank und lässt sich portionsweise einfrieren (3 Monate). Gekochten Reis höchstens 1 Tag aufheben.',
	gdm: 'Die Beilage halbieren: Linsen und Skyr machen auch so lange satt. Quinoa statt Reis bringt mehr Eiweiß und lässt den Blutzucker langsamer steigen.',
	tags: ['vorkochen'],
	photoAlt:
		'Schale mit leuchtend orangem Rote-Linsen-Dal mit Spinat, einem Klecks weißem Joghurt und gerösteten Kürbiskernen, daneben Vollkorn-Basmati und eine Zitronenspalte'
});
