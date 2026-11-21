import { anrichten, fix, ing, rezept } from '../../helpers.ts';

export default rezept({
	id: 'tomate-mozzarella-knaecke',
	name: 'Knäckebrot mit Tomate und Mozzarella',
	kategorie: 'snack',
	beschreibung:
		'Caprese auf Knäckebrot: Tomate, Mozzarella und frisches Basilikum auf Vollkorn-Knäcke, mit einem Hauch Olivenöl.',
	portionen: 1,
	zutaten: [
		ing(2, 'Scheibe', 'Vollkorn-Knäckebrot'),
		ing(1, 'Stk', 'Tomate'),
		ing(60, 'g', 'Mozzarella'),
		ing(0.5, 'Hv', 'Basilikum', 'ein paar Blätter'),
		ing(0.5, 'TL', 'Olivenöl'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		anrichten(
			'Tomate waschen und in Scheiben schneiden. Mozzarella abtropfen lassen und in Scheiben schneiden.',
			1.5
		),
		anrichten('Basilikum gründlich waschen und trocken tupfen.', 0.5),
		anrichten(
			'Knäckebrot abwechselnd mit Tomate und Mozzarella belegen, Basilikum darauflegen, mit Olivenöl beträufeln und pfeffern.',
			1
		)
	],
	ohneTm: 'Hier wird nur geschnitten und belegt, dafür brauchst du kein Gerät.',
	kind: 'Tomate und Mozzarella in kleine Würfel schneiden und als „Mini-Caprese“ neben ein Stück Knäckebrot legen.',
	mitnehmen:
		'Tomate, Mozzarella und Basilikum in einer Dose, das Knäckebrot getrennt. Erst kurz vor dem Essen belegen, sonst wird es weich.',
	gdm: 'Mozzarella und Olivenöl liefern Eiweiß und Fett, das bremst den Anstieg. Bei großem Hunger lieber mehr Tomate als mehr Knäckebrot.',
	hinweis:
		'Mozzarella aus pasteurisierter Milch ist in der Schwangerschaft unbedenklich, das ist bei Supermarkt-Mozzarella Standard.',
	tags: ['brot', 'kalt'],
	photoAlt:
		'Zwei Vollkorn-Knäckebrote mit roten Tomaten- und weißen Mozzarellascheiben, frischen Basilikumblättern und glänzenden Tropfen Olivenöl'
});
