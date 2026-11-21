import { anrichten, fix, ing, nebenbei, rezept, start } from '../../helpers.ts';

export default rezept({
	id: 'ei-knaecke',
	name: 'Ei auf Knäckebrot mit Gurke',
	kategorie: 'snack',
	beschreibung:
		'Hartgekochtes Ei auf Vollkorn-Knäckebrot mit Frischkäse, Gurke und Schnittlauch: ein Klassiker, der lange satt hält.',
	portionen: 1,
	zutaten: [
		ing(1, 'Stk', 'Ei'),
		ing(2, 'Scheibe', 'Vollkorn-Knäckebrot'),
		ing(1, 'EL', 'Frischkäse (leicht)'),
		ing(100, 'g', 'Salatgurke'),
		ing(1, 'EL', 'Schnittlauch'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Wasser im Wasserkocher aufkochen und in einen kleinen Topf gießen. Ei mit einem Löffel hineinlegen und 10 Min. kochen, bis auch das Eigelb ganz fest ist.',
			11,
			1
		),
		nebenbei(
			'Gurke waschen und in Scheiben schneiden, Schnittlauch waschen und in Röllchen schneiden.',
			1.5
		),
		anrichten('Ei kalt abschrecken, pellen und in Scheiben schneiden.', 1),
		anrichten(
			'Knäckebrot dünn mit Frischkäse bestreichen, mit Gurke und Ei belegen und mit Schnittlauch, wenig Salz und Pfeffer bestreuen. Die restliche Gurke dazu knabbern.',
			1
		)
	],
	ohneTm: 'Ein einzelnes Ei kochst du im Topf schneller, als der Varoma heiß ist.',
	kind: 'Ei in Achtel oder kleine Würfel schneiden, Gurke in Stifte, Knäckebrot in Stücke brechen. Das Kind bekommt seinen Teil vor dem Salzen.',
	mitnehmen:
		'Ei ungeschält, Knäckebrot und Gurke getrennt einpacken und erst vor dem Essen belegen, damit das Knäckebrot knusprig bleibt.',
	vorrat:
		'Koch gleich 4–6 Eier auf einmal (gleiche Kochzeit). Ungeschält halten sie im Kühlschrank 4 Tage, dann ist der Snack in 3 Minuten fertig.',
	gdm: 'Das Ei bringt Eiweiß und Fett und bremst den Anstieg durch das Knäckebrot. Bei großem Hunger lieber ein zweites Ei als eine dritte Scheibe Knäckebrot.',
	tags: ['brot', 'kalt'],
	photoAlt:
		'Zwei Vollkorn-Knäckebrote mit Frischkäse, Gurkenscheiben und Eischeiben mit leuchtend gelbem, festem Eigelb, bestreut mit Schnittlauch'
});
