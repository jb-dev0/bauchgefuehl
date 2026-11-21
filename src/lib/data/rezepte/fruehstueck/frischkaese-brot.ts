import { anrichten, fix, ing, nebenbei, one, rezept, start } from '../../helpers.ts';

export default rezept({
	id: 'frischkaese-brot',
	name: 'Vollkornbrot mit Schnittlauch-Frischkäse, Gurke und Ei',
	kategorie: 'fruehstueck',
	beschreibung:
		'Der Klassiker fürs Frühstücksbrett: kräftiges Vollkornbrot mit Schnittlauch-Frischkäse, knackiger Gurke und Scheiben vom hart gekochten Ei.',
	portionen: 2,
	zutaten: [
		ing(3, 'Stk', 'Ei'),
		ing(100, 'g', 'Frischkäse (leicht)'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(0.5, 'Bund', 'Schnittlauch'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Eier in kochendes Wasser legen und 10 Min. kochen, bis auch das Eigelb ganz fest ist. Kalt abschrecken.',
			10,
			1
		),
		nebenbei(
			'Schnittlauch gründlich waschen, trocken schütteln und in feine Röllchen schneiden. Die Hälfte unter den Frischkäse rühren.',
			2
		),
		nebenbei('Gurke waschen und in dünne Scheiben schneiden.', 1),
		anrichten('{brot} mit dem Schnittlauch-Frischkäse bestreichen und mit Gurke belegen.', 1.5),
		anrichten(
			'Eier pellen, in Scheiben schneiden, darauflegen und mit dem restlichen Schnittlauch und etwas Pfeffer bestreuen.',
			1.5
		)
	],
	slots: [
		one('brot', 'Brot', 'base', 'vollkornbrot', [
			{
				id: 'vollkornbrot',
				label: 'Vollkornbrot',
				items: [ing(3, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'broetchen',
				label: 'Vollkornbrötchen',
				short: 'Aufgeschnittene Brötchen',
				items: [ing(2, 'Stk', 'Vollkornbrötchen')]
			},
			{
				id: 'toast',
				label: 'Vollkorntoast',
				short: 'Toast',
				items: [ing(5, 'Scheibe', 'Vollkorntoast')],
				steps: [nebenbei('Toast goldbraun toasten.', 0.5)]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(6, 'Scheibe', 'Vollkorn-Knäckebrot')]
			}
		])
	],
	ohneTm: 'Eier kochen geht im Topf schneller, und belegt ist das Brot von Hand in zwei Minuten.',
	kind: 'Das Brot in kleine Häppchen schneiden und mit Eistückchen belegen, Schnittlauch nur sparsam. Die Gurke für das Kind lieber als Stifte zum Knabbern dazulegen.',
	mitnehmen:
		'Belegte Brote in einer Brotdose gekühlt mitnehmen und bis mittags essen. Die Gurke dann lieber extra einpacken, damit das Brot nicht durchweicht.',
	vorrat:
		'Eier am Wochenende auf Vorrat kochen: abgeschreckt und ungeschält halten sie im Kühlschrank 3–4 Tage. Der Schnittlauch-Frischkäse hält in einer Dose 3 Tage.',
	gdm: 'Leg ruhig mehr Gurke und ein zweites Ei auf und nimm dafür eine halbe Scheibe Brot weniger. Knäckebrot hat deutlich weniger Kohlenhydrate als Brötchen.',
	hinweis:
		'Eier in der Schwangerschaft immer hart kochen, das Eigelb muss ganz fest sein. Schnittlauch gründlich waschen.',
	tags: ['brot', 'kalt'],
	photoAlt:
		'Holzbrett mit Vollkornbrotscheiben, dick bestrichen mit Schnittlauch-Frischkäse, belegt mit dünnen Gurkenscheiben und Eischeiben mit festem Eigelb, bestreut mit frischen Schnittlauchröllchen'
});
