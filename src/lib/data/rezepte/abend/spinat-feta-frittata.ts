import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'spinat-feta-frittata',
	name: 'Spinat-Feta-Frittata mit Tomatensalat',
	kategorie: 'abend',
	beschreibung:
		'Saftige Frittata aus der Pfanne mit Babyspinat und Feta, ganz durchgegart, dazu Vollkornbrot und ein frischer Tomatensalat.',
	portionen: 4,
	zutaten: [
		ing(8, 'Stk', 'Ei'),
		ing(150, 'g', 'Feta'),
		ing(200, 'g', 'Babyspinat'),
		ing(3, 'Stk', 'Frühlingszwiebel'),
		ing(50, 'ml', 'Milch'),
		ing(2, 'EL', 'Olivenöl'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(6, 'Stk', 'Tomate'),
		ing(1, 'EL', 'Apfelessig'),
		ing(0.5, 'Bund', 'Schnittlauch')
	],
	schritte: [
		vor(
			'Spinat gründlich waschen, abtropfen lassen und grob hacken. Frühlingszwiebeln in feine Ringe schneiden.',
			2.5
		),
		pfanne(
			1,
			'1 EL Öl in einer beschichteten Pfanne (ca. 26 cm, mit Deckel) erhitzen. Frühlingszwiebeln 1 Min. andünsten, dann den Spinat dazugeben und 2 Min. zusammenfallen lassen. Währenddessen die Eier mit Milch, 1 Prise Salz und Pfeffer verquirlen.',
			3,
			2
		),
		pfanne(
			2,
			'Eier über den Spinat gießen, Feta darüberbröseln. Deckel auflegen und bei kleiner bis mittlerer Hitze 10 Min. stocken lassen, bis die Frittata auch in der Mitte ganz fest ist: Beim Einstechen mit einem Messer darf nichts Flüssiges mehr austreten, sonst noch 2 Min. weitergaren.',
			10,
			1
		),
		nebenbei(
			'Tomaten in Scheiben schneiden. Schnittlauch in Röllchen schneiden. Tomaten mit 1 EL Öl, Essig, 1 Prise Salz und Schnittlauch anmachen.',
			3.5
		),
		anrichten('Frittata in 8 Stücke schneiden und mit Tomatensalat und {base} servieren.', 1)
	],
	slots: [
		one('base', 'Brot', 'base', 'brot', [
			{
				id: 'brot',
				label: 'Vollkornbrot',
				items: [ing(6, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'broetchen',
				label: 'Vollkornbrötchen',
				items: [ing(4, 'Stk', 'Vollkornbrötchen')],
				steps: [nebenbei('Brötchen kurz auf dem Toaster aufbacken.', 0.5)]
			}
		])
	],
	ohneTm:
		'Eine Frittata stockt in der Pfanne mit Deckel; im Mixtopf geht das nicht, und die Eier sind mit der Gabel schneller verquirlt.',
	kind: 'Ein Stück Frittata in Streifen oder Häppchen schneiden, der Feta macht sie schon würzig genug. Tomaten für das Kind klein schneiden und das Brot in Fingerstreifen zum Dippen.',
	mitnehmen:
		'Frittata-Stücke und Tomatensalat getrennt in Boxen, das Brot extra einpacken. Die Frittata rasch abkühlen, kühl stellen und am nächsten Tag 1–2 Min. in der Mikrowelle erhitzen, bis sie durch und durch heiß ist.',
	vorrat:
		'Spinat am Vorabend waschen und gut trocken schleudern. Die gebackene Frittata hält abgedeckt 2 Tage im Kühlschrank.',
	gdm: 'Nur eine Scheibe Brot pro Person nehmen und dafür mehr Tomatensalat. Die Frittata selbst hat kaum Kohlenhydrate und hält den Blutzucker ruhig.',
	hinweis:
		'In der Schwangerschaft die Frittata immer ganz durchgaren: In der Mitte darf nichts Flüssiges mehr austreten (Salmonellen).',
	tags: ['pfanne', 'brot'],
	photoAlt:
		'Goldene Spinat-Feta-Frittata in einer Pfanne, ein Stück herausgeschnitten, daneben eine Schale Tomatensalat mit Schnittlauch und Scheiben Vollkornbrot auf einem Holzbrett'
});
