import {
	anrichten,
	fix,
	ing,
	nebenbei,
	ofen,
	one,
	rezept,
	sauce,
	start,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'belugalinsen-salat',
	name: 'Belugalinsen-Salat mit Ofengemüse',
	kategorie: 'mittag',
	beschreibung:
		'Schwarze Belugalinsen in Senf-Vinaigrette mit geröstetem Paprika, Zucchini und Karotte, dazu Feta oder Hüttenkäse – warm wie kalt ein sättigendes Mittagessen.',
	portionen: 2,
	zutaten: [
		ing(120, 'g', 'Belugalinsen'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(1, 'Stk', 'Zucchini'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'Stk', 'rote Zwiebel'),
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'italienische Kräuter (getrocknet)'),
		ing(1, 'EL', 'Apfelessig'),
		ing(1, 'TL', 'Senf'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Belugalinsen in einem Sieb abspülen, mit 500 ml Wasser ohne Salz aufkochen und 20 Min. bissfest köcheln lassen. Abgießen.',
			20
		),
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Paprika und Zucchini in 2 cm große Stücke schneiden, Karotte schälen und in dünne Scheiben, Zwiebel in Spalten schneiden.',
			5
		),
		vor(
			'Gemüse auf einem Backblech mit 1 EL Olivenöl, Kräutern, der Hälfte des Salzes und Pfeffer mischen.',
			1,
			{ order: 60 }
		),
		ofen('Blech in den Ofen schieben und 20 Min. rösten, bis das Gemüse Röstspuren hat.', 20, 0.5),
		sauce(
			'Apfelessig, Senf, 1 EL Olivenöl, restliches Salz und Pfeffer in einer großen Schüssel verrühren.',
			1
		),
		nebenbei('Petersilie waschen, trocken schütteln und hacken.', 1),
		anrichten(
			'Linsen noch warm mit dem Dressing mischen, Ofengemüse und Petersilie unterheben und auf zwei Boxen verteilen.',
			1.5
		)
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
					id: 'huettenkaese',
					label: 'Hüttenkäse',
					items: [ing(200, 'g', 'Hüttenkäse')],
					steps: [anrichten('Hüttenkäse in Klecksen daraufsetzen.', 0.5)]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'Hähnchen',
					items: [ing(250, 'g', 'Hähnchenbrustfilet')],
					steps: [
						vor(
							'Hähnchen in mundgerechte Stücke schneiden und mit auf das Blech geben – es gart die vollen 20 Min. mit, bis es innen nicht mehr rosa ist.',
							2,
							{ order: 50 }
						)
					]
				},
				{
					id: 'lachs',
					label: 'Lachsfilet',
					short: 'Lachs',
					items: [ing(250, 'g', 'Lachsfilet', 'ohne Haut')],
					steps: [
						ofen(
							'Lachs in 2 Stücke teilen, nach 8 Min. auf das Blech legen und 12 Min. mitgaren, bis er innen nicht mehr glasig ist. In grobe Stücke zupfen.',
							0,
							1
						)
					]
				}
			],
			'feta'
		)
	],
	ohneTm:
		'Das Gemüse röstet im Ofen und die Linsen köcheln nebenher im Topf – der Thermomix würde hier nichts beschleunigen.',
	kind: 'Gemüse in kleine Stücke schneiden und eine Portion abnehmen, bevor Senf-Dressing darankommt; etwas Olivenöl reicht. Belugalinsen bleiben bissfest, für das Kind etwas zerdrücken oder mit Hüttenkäse vermischen.',
	mitnehmen:
		'Schmeckt kalt oder zimmerwarm: gekühlt transportieren und in der Arbeit in den Kühlschrank stellen. Mit Hähnchen oder Lachs die Box 2 Min. in der Mikrowelle dampfend heiß erhitzen und den Käse erst danach daraufgeben.',
	vorrat:
		'Linsen und Ofengemüse halten zusammen 2 Tage im Kühlschrank und ziehen gut durch. Feta oder Hüttenkäse getrennt aufbewahren und erst beim Essen dazugeben.',
	gdm: 'Belugalinsen gehören zu den ballaststoffreichsten Hülsenfrüchten und lassen den Blutzucker sehr langsam steigen. Eine Handvoll gewaschener Rucola oder Babyspinat macht die Box noch voller, ohne Kohlenhydrate.',
	tags: ['salat', 'ofen', 'vorkochen', 'kalt'],
	photoAlt:
		'Schüssel mit glänzend schwarzen Belugalinsen, geröstetem Paprika, Zucchini und Karotte, darüber zerbröselter Feta und gehackte Petersilie'
});
