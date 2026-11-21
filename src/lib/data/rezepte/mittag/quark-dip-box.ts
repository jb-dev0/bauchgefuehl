import {
	anrichten,
	fix,
	ing,
	many,
	nebenbei,
	one,
	rezept,
	sauce,
	start,
	tm
} from '../../helpers.ts';

export default rezept({
	id: 'quark-dip-box',
	name: 'Kräuterquark-Box mit Ei, Knäckebrot und Rohkost',
	kategorie: 'mittag',
	beschreibung:
		'Eine große Snackbox als Mittagessen: cremiger Kräuterquark zum Dippen, hartgekochte Eier, bunte Gemüsesticks und knuspriges Vollkorn-Knäckebrot.',
	portionen: 2,
	zutaten: [
		ing(250, 'g', 'Magerquark'),
		ing(3, 'EL', 'Naturjoghurt'),
		ing(1, 'EL', 'Rapsöl'),
		ing(0.5, 'Bund', 'Schnittlauch'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(0.25, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer'),
		ing(4, 'Stk', 'Ei')
	],
	schritte: [
		start(
			'Eier anpieksen, in kochendes Wasser legen und 10 Min. hart kochen, bis das Eigelb ganz fest ist. Kalt abschrecken.',
			11
		),
		sauce('Schnittlauch und Petersilie gründlich waschen, trocken schütteln und fein hacken.', 2),
		sauce(
			'Quark mit Joghurt, Rapsöl, Salz und Pfeffer glatt rühren und die Kräuter unterheben.',
			1.5
		),
		anrichten('Eier pellen und halbieren.', 1.5),
		anrichten('Kräuterquark in zwei Dosen füllen, Eier, Rohkost und {base} getrennt dazupacken.', 1)
	],
	tmSchritte: [
		start(
			'Eier anpieksen, in kochendes Wasser legen und 10 Min. hart kochen, bis das Eigelb ganz fest ist. Kalt abschrecken.',
			11
		),
		tm(
			1,
			'Schnittlauch und Petersilie gründlich waschen, trocken schütteln, in den Mixtopf geben und 3 Sek./Stufe 8 zerkleinern.',
			0,
			1.5
		),
		tm(
			2,
			'Quark, Joghurt, Rapsöl, Salz und Pfeffer zugeben und 20 Sek./Stufe 3 verrühren.',
			0,
			0.5
		),
		anrichten('Eier pellen und halbieren.', 1.5),
		anrichten('Kräuterquark in zwei Dosen füllen, Eier, Rohkost und {base} getrennt dazupacken.', 1)
	],
	slots: [
		one('base', 'Brot', 'base', 'knaecke', [
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(6, 'Scheibe', 'Vollkorn-Knäckebrot')]
			},
			{
				id: 'brot',
				label: 'Vollkornbrot',
				items: [ing(3, 'Scheibe', 'Vollkornbrot')]
			}
		]),
		many(
			'rohkost',
			'Rohkost',
			'side',
			['karotte', 'paprika', 'gurke'],
			[
				{
					id: 'karotte',
					label: 'Karotten',
					items: [ing(2, 'Stk', 'Karotte')],
					steps: [nebenbei('Karotten schälen und in Sticks schneiden.', 2)]
				},
				{
					id: 'paprika',
					label: 'Paprika',
					items: [ing(1, 'Stk', 'rote Paprika')],
					steps: [nebenbei('Paprika in Streifen schneiden.', 1.5)]
				},
				{
					id: 'gurke',
					label: 'Gurke',
					items: [ing(0.5, 'Stk', 'Salatgurke')],
					steps: [nebenbei('Gurke in Sticks schneiden.', 1)]
				},
				{
					id: 'radieschen',
					label: 'Radieschen',
					items: [ing(0.5, 'Bund', 'Radieschen')],
					steps: [nebenbei('Radieschen putzen, waschen und halbieren.', 1.5)]
				},
				{
					id: 'tomaten',
					label: 'Kirschtomaten',
					items: [ing(150, 'g', 'Kirschtomaten')],
					steps: [nebenbei('Kirschtomaten waschen.', 0.5)]
				}
			]
		)
	],
	kind: 'Die perfekte Kinderbox: Gemüsesticks zum Dippen, ein halbes Ei und ein Stück Knäckebrot. Kirschtomaten für das Kind vierteln, Radieschen lieber weglassen (zu scharf) und Karotten in dünne Sticks schneiden oder kurz dämpfen, damit sie nicht zu hart sind.',
	mitnehmen:
		'Quark und Eier in einer gut schließenden Dose kühl transportieren und in der Arbeit in den Kühlschrank stellen. Knäckebrot getrennt einpacken, damit es knusprig bleibt. Wird kalt gegessen.',
	vorrat:
		'Hartgekochte Eier halten ungepellt 3 Tage im Kühlschrank, Kräuterquark 2 Tage, geschnittene Rohkost in einer Dose mit feuchtem Küchenpapier 2 Tage. So steht die Box jeden Morgen in 2 Minuten.',
	gdm: 'Knäckebrot ist schon die sparsame Wahl. Wer noch weniger Kohlenhydrate möchte, nimmt nur 2 Scheiben pro Person und dafür mehr Gemüse oder ein drittes Ei.',
	tags: ['brot', 'kalt'],
	photoAlt:
		'Bento-Box mit einem Schälchen grünem Kräuterquark, halbierten hartgekochten Eiern, Karotten-, Paprika- und Gurkensticks und Vollkorn-Knäckebrot'
});
