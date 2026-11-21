import {
	anrichten,
	fix,
	ing,
	nebenbei,
	NONE,
	one,
	pfanne,
	rezept,
	tm,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'linsen-kokos-eintopf',
	name: 'Linsen-Kokos-Eintopf mit Spinat',
	kategorie: 'mittag',
	beschreibung:
		'Sämiger Eintopf aus roten Linsen, Tomaten und leichter Kokosmilch mit frischem Spinat – schnell gekocht und am nächsten Tag noch besser.',
	portionen: 2,
	zutaten: [
		ing(1, 'EL', 'Rapsöl'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(1, 'TL', 'Currypulver (mild)'),
		ing(0.5, 'TL', 'Kurkuma'),
		ing(150, 'g', 'Rote Linsen'),
		ing(1, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(200, 'ml', 'Kokosmilch (light)'),
		ing(100, 'g', 'Babyspinat'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor('Zwiebel fein würfeln.', 1),
		pfanne(
			1,
			'Rapsöl in einem Topf erhitzen und die Zwiebel darin 3 Min. glasig dünsten. Währenddessen Knoblauch und Ingwer schälen und dazureiben, Curry und Kurkuma kurz mitrösten.',
			3,
			1.5
		),
		pfanne(
			2,
			'Linsen, Tomaten, Kokosmilch und 400 ml Wasser zugeben, aufkochen und offen 12 Min. köcheln lassen, bis die Linsen weich sind und zerfallen. Ab und zu umrühren.',
			12,
			1
		),
		nebenbei('Spinat gründlich waschen und abtropfen lassen.', 1),
		pfanne(
			4,
			'Spinat unterrühren und 1 Min. zusammenfallen lassen. Mit Zitronensaft, Salz und Pfeffer abschmecken.',
			1,
			1
		),
		anrichten('Eintopf in Schalen oder Boxen füllen.', 0.5)
	],
	tmSchritte: [
		vor('Zwiebel halbieren, Knoblauch und Ingwer schälen.', 1),
		tm(
			1,
			'Zwiebel, Knoblauch und Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			0.5
		),
		tm(2, 'Rapsöl, Curry und Kurkuma zugeben und 3 Min./120 °C/Stufe 1 dünsten.', 3, 0.5),
		tm(
			3,
			'Linsen, Tomaten, Kokosmilch und 400 g Wasser zugeben und 15 Min./100 °C/Linkslauf/Stufe 1 garen.',
			15,
			1
		),
		nebenbei('Spinat gründlich waschen und abtropfen lassen.', 1),
		tm(
			4,
			'Spinat zugeben und 1 Min./100 °C/Linkslauf/Stufe 1 garen. Mit Zitronensaft, Salz und Pfeffer abschmecken.',
			1,
			1
		),
		anrichten('Eintopf in Schalen oder Boxen füllen.', 0.5)
	],
	slots: [
		one('prot', 'Eiweiß dazu', 'main', 'skyr', [
			{
				id: 'skyr',
				label: 'Skyr-Klecks',
				short: 'Skyr',
				items: [ing(150, 'g', 'Skyr')],
				steps: [anrichten('Je einen großen Klecks Skyr daraufsetzen.', 0.5)]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenbrust',
				short: 'Hähnchen',
				items: [ing(250, 'g', 'Hähnchenbrustfilet')],
				steps: [
					pfanne(
						3,
						'Währenddessen Hähnchen in 2 cm große Würfel schneiden, nach 4 Min. Kochzeit zu den Linsen geben und die restlichen 8 Min. mitköcheln, bis es innen nicht mehr rosa ist.',
						0,
						2
					)
				],
				tmSteps: [
					tm(
						3.5,
						'Währenddessen Hähnchen in 2 cm große Würfel schneiden, nach 5 Min. Garzeit durch die Deckelöffnung zugeben und die restlichen 10 Min. mitgaren, bis es innen nicht mehr rosa ist.',
						0,
						2
					)
				]
			},
			NONE
		])
	],
	kind: 'Eine Portion vor dem Nachwürzen abnehmen und etwas abkühlen lassen. Der Eintopf ist mild und weich, Spinat stört kaum. Mit einem Klecks Skyr und einem Stück Vollkornbrot zum Tunken essen Dreijährige ihn gern.',
	mitnehmen:
		'Rasch abkühlen lassen, in eine dicht schließende Box füllen und in den Kühlschrank stellen. In der Arbeit mit 1–2 EL Wasser 3 Min. in der Mikrowelle dampfend heiß erhitzen, zwischendurch umrühren. Den Skyr getrennt kalt mitnehmen.',
	vorrat:
		'Ideal zum Vorkochen: hält im Kühlschrank 2 Tage und lässt sich portionsweise bis zu 3 Monate einfrieren. Die Linsen dicken nach, beim Aufwärmen einfach einen Schluck Wasser zugeben.',
	gdm: 'Rote Linsen bringen viel Eiweiß und Ballaststoffe und lassen den Blutzucker langsam steigen. Mit Skyr oder Hähnchen dazu bleibt es noch länger stabil; Brot dazu lieber weglassen oder klein halten.',
	tags: ['suppe', 'vorkochen'],
	photoAlt:
		'Schale mit orangefarbenem Linsen-Kokos-Eintopf, darin frischer Spinat, obenauf ein Klecks weißer Skyr, daneben ein Löffel und eine Meal-Prep-Box'
});
