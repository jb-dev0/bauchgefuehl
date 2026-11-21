import { anrichten, fix, ing, ofen, one, rezept, sauce, vor } from '../../helpers.ts';

export default rezept({
	id: 'ofenlachs-kartoffeln',
	name: 'Ofenlachs mit Kartoffelspalten und Brokkoli',
	kategorie: 'abend',
	beschreibung:
		'Alles von einem Blech: knusprige Kartoffelspalten, gerösteter Brokkoli und saftiger Lachs, dazu ein frischer Kräuter-Skyr.',
	portionen: 4,
	zutaten: [
		ing(600, 'g', 'Brokkoli'),
		ing(250, 'g', 'Kirschtomaten'),
		ing(3, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(250, 'g', 'Skyr', 'für den Kräuter-Skyr'),
		ing(0.5, 'Bund', 'Schnittlauch'),
		ing(0.5, 'Bund', 'Dill'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(1, 'Zehe', 'Knoblauch')
	],
	schritte: [
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Brokkoli in kleine Röschen teilen, den Strunk schälen und in Scheiben schneiden. Kirschtomaten waschen. Beides in einer Schüssel mit 1 EL Olivenöl und 1 Prise Salz mischen.',
			3.5,
			{ order: 60 }
		),
		ofen('{base} auf dem Blech 15 Min. vorbacken.', 30, 0.5),
		ofen(
			'Spalten wenden, Brokkoli, Kirschtomaten und {prot} mit auf das Blech legen und alles weitere 12–15 Min. backen.',
			0,
			1
		),
		sauce(
			'Schnittlauch und Dill waschen, trocken schütteln und fein schneiden. Mit Skyr, Zitronensaft, gepresstem Knoblauch, 1 Prise Salz, Pfeffer und 2–3 EL Wasser cremig rühren.',
			3
		),
		anrichten('{base}, Brokkoli und {prot} auf Teller verteilen, den Kräuter-Skyr dazu reichen.')
	],
	slots: [
		one('base', 'Beilage', 'base', 'kartoffeln', [
			{
				id: 'kartoffeln',
				label: 'Kartoffeln',
				short: 'Kartoffelspalten',
				items: [ing(750, 'g', 'Kartoffeln')],
				steps: [
					vor(
						'Kartoffeln gründlich waschen, ungeschält in Spalten schneiden und auf einem Backblech mit 2 EL Olivenöl, Paprikapulver und Salz mischen.',
						4,
						{ order: 40 }
					)
				]
			},
			{
				id: 'suesskartoffel',
				label: 'Süßkartoffeln',
				short: 'Süßkartoffelspalten',
				items: [ing(700, 'g', 'Süßkartoffel')],
				steps: [
					vor(
						'Süßkartoffeln gründlich waschen, ungeschält in Spalten schneiden und auf einem Backblech mit 2 EL Olivenöl, Paprikapulver und Salz mischen.',
						4,
						{ order: 40 }
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'lachs',
			[
				{
					id: 'lachs',
					label: 'Lachsfilet',
					short: 'Lachs',
					items: [ing(500, 'g', 'Lachsfilet', '4 Stücke')],
					steps: [
						vor('Lachs trocken tupfen und leicht salzen.', 0.5, { order: 70 }),
						ofen(
							'Lachs am Ende prüfen: Er ist gar, wenn er innen nicht mehr glasig ist und sich leicht zerpflücken lässt.',
							0,
							0.5
						)
					]
				},
				{
					id: 'kabeljau',
					label: 'Kabeljaufilet',
					short: 'Kabeljau',
					items: [ing(600, 'g', 'Kabeljaufilet', '4 Stücke')],
					steps: [
						vor('Kabeljau trocken tupfen, mit 1 TL Olivenöl bestreichen und leicht salzen.', 0.5, {
							order: 70
						}),
						ofen(
							'Kabeljau am Ende prüfen: Er ist gar, wenn er innen weiß und nicht mehr glasig ist und in Lamellen zerfällt.',
							0,
							0.5
						)
					]
				},
				{
					id: 'halloumi',
					label: 'Halloumi',
					items: [ing(250, 'g', 'Halloumi')],
					steps: [vor('Halloumi in 8 Scheiben schneiden.', 1, { order: 70 })]
				}
			],
			'halloumi'
		)
	],
	ohneTm:
		'Kartoffeln, Gemüse und Fisch garen zusammen auf dem Blech, da hilft der Thermomix nicht. Den Kräuter-Skyr kannst du im Mixtopf rühren: Kräuter 3 Sek./Stufe 8, dann übrige Zutaten 10 Sek./Stufe 3.',
	kind: 'Kartoffelspalten und Brokkoli klein schneiden, Kirschtomaten vierteln. Fisch sorgfältig auf Gräten prüfen und zerpflücken. Einen Löffel Skyr vor dem Knoblauch für das Kind abnehmen, als Dip zum Eintunken. Halloumi ist salzig, davon nur ein Stück.',
	mitnehmen:
		'Reste rasch abkühlen, in eine Box füllen und innerhalb von 1–2 Tagen essen. Den Fisch vorher zerpflücken und alles in der Mikrowelle 2–3 Min. dampfend heiß erhitzen. Den Kräuter-Skyr kalt dazu mitnehmen.',
	vorrat: 'Den Kräuter-Skyr kannst du am Vortag anrühren, er hält abgedeckt 2 Tage im Kühlschrank.',
	gdm: 'Die Kartoffelmenge etwas kleiner halten und dafür mehr Brokkoli aufs Blech legen. Mit Fisch und Kräuter-Skyr anfangen: Eiweiß zuerst lässt den Blutzucker langsamer steigen.',
	tags: ['ofen'],
	photoAlt:
		'Backblech mit goldbraunen Kartoffelspalten, gerösteten Brokkoliröschen, geplatzten Kirschtomaten und vier Lachsfilets, daneben eine Schale Kräuter-Skyr mit Dill und Schnittlauch'
});
