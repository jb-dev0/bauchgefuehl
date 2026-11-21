import { anrichten, fix, ing, NONE, ofen, one, rezept, sauce, vor } from '../../helpers.ts';

export default rezept({
	id: 'ofengemuese-kichererbsen',
	name: 'Ofengemüse mit Kichererbsen und Feta',
	kategorie: 'abend',
	beschreibung:
		'Ein Blech, wenig Arbeit: geröstetes Gemüse und Kichererbsen mit Feta und kühlem Skyr-Dip.',
	portionen: 4,
	zutaten: [
		ing(2, 'Dose', 'Kichererbsen (Dose)'),
		ing(2, 'Stk', 'rote Paprika'),
		ing(1, 'Stk', 'Zucchini'),
		ing(1, 'Stk', 'rote Zwiebel'),
		ing(3, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(1, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Paprika und Zucchini in grobe Stücke, Zwiebel in Spalten schneiden. Kichererbsen abgießen, abspülen und gut abtropfen lassen.',
			5
		),
		vor(
			'Alles auf einem Backblech mit Olivenöl, Paprikapulver, Kreuzkümmel, Oregano, Salz und Pfeffer mischen.',
			2,
			{ order: 60 }
		),
		ofen('Blech in den Ofen schieben und 25 Min. rösten, nach der Hälfte einmal wenden.', 25, 0.5),
		anrichten('Ofengemüse mit {prot} auf Teller verteilen.'),
		anrichten('{dip} dazu reichen.', 0.5, { wenn: 'dip' })
	],
	slots: [
		one('base', 'Beilage', 'base', 'suesskartoffel', [
			{
				id: 'suesskartoffel',
				label: 'Süßkartoffel',
				items: [ing(400, 'g', 'Süßkartoffel')],
				steps: [
					vor('Süßkartoffel gründlich waschen und ungeschält in 2 cm große Würfel schneiden.', 3, {
						order: 40
					})
				]
			},
			{
				id: 'kartoffel',
				label: 'Kartoffeln',
				items: [ing(500, 'g', 'Kartoffeln')],
				steps: [
					vor('Kartoffeln gründlich waschen und ungeschält in 2 cm große Würfel schneiden.', 3, {
						order: 40
					})
				]
			},
			{
				id: 'brot',
				label: 'Vollkornbrot',
				short: 'Brot',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')],
				steps: [anrichten('Vollkornbrot dazu reichen.', 0.5)]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'feta',
			[
				{
					id: 'feta',
					label: 'Feta',
					items: [ing(200, 'g', 'Feta')],
					steps: [ofen('Feta in Würfeln für die letzten 8 Min. auf das Gemüse legen.', 0, 0.5)]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(400, 'g', 'Hähnchenbrustfilet')],
					steps: [
						vor(
							'Hähnchen in mundgerechte Stücke schneiden und mit auf das Blech geben (es gart die vollen 25 Min. mit).',
							2,
							{ order: 50 }
						)
					]
				},
				{
					id: 'lachs',
					label: 'Lachsfilet',
					short: 'Lachs',
					items: [ing(400, 'g', 'Lachsfilet')],
					steps: [
						ofen(
							'Lachs in 4 Stücke teilen, nach 13 Min. auf das Blech legen und 12 Min. mitgaren, bis er innen nicht mehr glasig ist.',
							0,
							1
						)
					]
				}
			],
			'feta'
		),
		one('dip', 'Dip', 'sauce', 'skyr', [
			{
				id: 'skyr',
				label: 'Skyr-Zitronen-Dip',
				short: 'Den Skyr-Dip',
				items: [
					ing(250, 'g', 'Skyr'),
					ing(1, 'EL', 'Zitronensaft'),
					ing(1, 'Zehe', 'Knoblauch')
				],
				steps: [
					sauce(
						'Skyr mit Zitronensaft, gepresstem Knoblauch, 1 Prise Salz und 2–3 EL Wasser cremig rühren.',
						2
					)
				]
			},
			NONE
		])
	],
	ohneTm:
		'Das Gemüse soll im Ofen rösten, dafür bringt der Thermomix nichts. Den Dip kannst du im Mixtopf verrühren.',
	kind: 'Gemüse und Süßkartoffel in kleine Stücke schneiden. Kichererbsen für das Kind leicht zerdrücken, ganz können sie bei Dreijährigen in den falschen Hals geraten. Den Dip vor dem Knoblauch abzweigen.',
	mitnehmen:
		'Hält 2 Tage im Kühlschrank. In der Box 2–3 Min. in der Mikrowelle dampfend heiß erhitzen, den Dip getrennt kalt mitnehmen.',
	gdm: 'Kartoffeln über Nacht kühlen und am nächsten Tag erhitzen, das macht ihre Stärke langsamer verfügbar. Oder die Beilage halbieren und mehr Gemüse aufs Blech geben.',
	tags: ['ofen'],
	photoAlt:
		'Backblech mit geröstetem Paprika, Zucchini, Süßkartoffelwürfeln und Kichererbsen, darauf goldene Fetawürfel, daneben eine Schale Skyr-Dip'
});
