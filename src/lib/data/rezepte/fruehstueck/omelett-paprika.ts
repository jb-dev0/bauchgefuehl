import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'omelett-paprika',
	name: 'Paprika-Omelett mit Käse und Vollkornbrot',
	kategorie: 'fruehstueck',
	beschreibung:
		'Ein großes, ganz durchgegartes Omelett mit süßlicher Paprika und geschmolzenem Käse, geteilt und mit Vollkornbrot serviert.',
	portionen: 2,
	zutaten: [
		ing(4, 'Stk', 'Ei'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(40, 'ml', 'Milch'),
		ing(2, 'TL', 'Rapsöl'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor('Paprika waschen, entkernen und in kleine Würfel schneiden.', 2),
		pfanne(
			1,
			'Öl in einer beschichteten Pfanne (ca. 26 cm) bei mittlerer Hitze erhitzen und die Paprika darin 2–3 Min. andünsten.',
			2.5,
			0.5
		),
		pfanne(2, 'Währenddessen Eier mit Milch, 1 Prise Salz und Pfeffer verquirlen.', 0, 1),
		pfanne(
			3,
			'Eier über die Paprika gießen und zugedeckt bei kleiner bis mittlerer Hitze 4 Min. stocken lassen.',
			4,
			0.5
		),
		pfanne(
			5,
			'{kaese} auf einer Hälfte verteilen, Omelett zusammenklappen und zugedeckt noch 2 Min. garen, bis das Ei auch innen ganz fest ist.',
			2,
			0.5
		),
		anrichten('Omelett halbieren und mit {brot} servieren.', 0.5)
	],
	slots: [
		one('kaese', 'Käse', 'main', 'gouda', [
			{
				id: 'gouda',
				label: 'Gouda',
				short: 'Den geriebenen Gouda',
				items: [ing(40, 'g', 'Gouda')],
				steps: [pfanne(4, 'Währenddessen den Gouda reiben.', 0, 1)]
			},
			{
				id: 'bergkaese',
				label: 'Bergkäse',
				short: 'Den geriebenen Bergkäse',
				items: [ing(40, 'g', 'Bergkäse')],
				steps: [pfanne(4, 'Währenddessen den Bergkäse reiben.', 0, 1)]
			},
			{
				id: 'feta',
				label: 'Feta',
				short: 'Den zerbröselten Feta',
				items: [ing(50, 'g', 'Feta')],
				steps: [pfanne(4, 'Währenddessen den Feta zerbröseln.', 0, 0.5)]
			},
			{
				id: 'mozzarella',
				label: 'Mozzarella',
				short: 'Den Mozzarella',
				items: [ing(60, 'g', 'Mozzarella')],
				steps: [pfanne(4, 'Währenddessen den Mozzarella abtropfen lassen und klein zupfen.', 0, 1)]
			}
		]),
		one('brot', 'Brot', 'base', 'vollkornbrot', [
			{
				id: 'vollkornbrot',
				label: 'Vollkornbrot',
				items: [ing(2, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'toast',
				label: 'Vollkorntoast',
				short: 'Toast',
				items: [ing(3, 'Scheibe', 'Vollkorntoast')],
				steps: [nebenbei('Toast goldbraun toasten.', 0.5)]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(4, 'Scheibe', 'Vollkorn-Knäckebrot')]
			}
		])
	],
	ohneTm: 'Ein Omelett braucht die Pfanne – der Thermomix bringt hier keinen Vorteil.',
	kind: 'Ein Stück Omelett in kleine Streifen schneiden, die Paprikawürfel sind schön weich. Das Brot in Streifen dazu. Erwachsene salzen am Tisch nach.',
	mitnehmen:
		'Abgekühltes Omelett in Streifen zwischen zwei Scheiben Brot legen, gekühlt transportieren und bis mittags essen. Kalt schmeckt es gut, in der Mikrowelle 1 Min. erwärmen geht auch.',
	vorrat:
		'Paprika kannst du am Vorabend würfeln, in einer Dose hält sie 2 Tage im Kühlschrank. Geriebenen Käse gleich für mehrere Tage vorbereiten.',
	gdm: 'Mit nur einer Scheibe Brot pro Person und viel Ei ist das Omelett sehr blutzuckerfreundlich. Für noch mehr Gemüse eine Handvoll Babyspinat mit der Paprika andünsten.',
	hinweis:
		'Das Omelett in der Schwangerschaft immer ganz durchgaren, innen darf nichts mehr flüssig sein (Salmonellen).',
	tags: ['pfanne', 'brot'],
	photoAlt:
		'Goldgelbes, zusammengeklapptes Omelett mit roten Paprikawürfeln und geschmolzenem Käse in einer Pfanne, daneben zwei Scheiben Vollkornbrot auf einem Holzbrett'
});
