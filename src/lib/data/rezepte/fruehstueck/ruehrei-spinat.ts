import { anrichten, fix, ing, nebenbei, NONE, one, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'ruehrei-spinat',
	name: 'Rührei mit Spinat auf Vollkornbrot',
	kategorie: 'fruehstueck',
	beschreibung:
		'Saftiges, ganz durchgegartes Rührei mit zartem Babyspinat auf Vollkornbrot – viel Eiweiß, Folat und Eisen für einen ruhigen Vormittag.',
	portionen: 2,
	zutaten: [
		ing(4, 'Stk', 'Ei'),
		ing(100, 'g', 'Babyspinat'),
		ing(40, 'ml', 'Milch'),
		ing(1, 'TL', 'Rapsöl'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor('Spinat gründlich waschen und gut abtropfen lassen, große Blätter grob zerzupfen.', 1),
		vor('Eier mit Milch, 1 Prise Salz und Pfeffer verquirlen.', 1),
		pfanne(
			1,
			'Öl in einer beschichteten Pfanne bei mittlerer Hitze erhitzen und den Spinat darin unter Wenden 1 Min. zusammenfallen lassen.',
			1.5,
			1
		),
		pfanne(
			2,
			'Eier dazugießen und bei mittlerer Hitze unter ständigem Schieben 3–4 Min. stocken lassen, bis das Ei ganz fest ist und nirgends mehr flüssig glänzt.',
			4,
			1
		),
		anrichten('Rührei mit {brot} auf Teller verteilen.', 0.5)
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
				short: 'aufgeschnittenen Brötchen',
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
		]),
		one('dazu', 'Dazu', 'side', 'tomaten', [
			{
				id: 'tomaten',
				label: 'Kirschtomaten',
				items: [ing(2, 'Hv', 'Kirschtomaten')],
				steps: [anrichten('Kirschtomaten waschen, halbieren und dazulegen.', 1, { order: 60 })]
			},
			{
				id: 'gurke',
				label: 'Gurke',
				items: [ing(0.5, 'Stk', 'Salatgurke')],
				steps: [anrichten('Gurke waschen, in Scheiben schneiden und dazulegen.', 1, { order: 60 })]
			},
			NONE
		])
	],
	ohneTm:
		'Rührei wird in der Pfanne lockerer und ist schneller fertig – der Thermomix bringt hier keinen Vorteil.',
	kind: 'Brot in Streifen schneiden und das Rührei als kleines Häufchen danebenlegen, so kann das Kind selbst essen. Der Spinat ist schön weich; Kirschtomaten für das Kind vierteln. Erwachsene salzen am Tisch nach.',
	vorrat:
		'Spinat am Vorabend waschen, gut trocken schleudern und mit einem Küchenpapier in einer Dose in den Kühlschrank legen – dann geht es morgens noch schneller.',
	gdm: 'Nimm eine Scheibe Brot weniger und dafür eine Handvoll Tomaten oder Gurke mehr. Wenn du sehr empfindlich reagierst, schmeckt das Rührei auch auf Vollkorn-Knäckebrot.',
	hinweis:
		'In der Schwangerschaft das Rührei immer ganz durchgaren, bis es nirgends mehr flüssig ist (Salmonellen).',
	tags: ['pfanne', 'brot'],
	photoAlt:
		'Goldgelbes Rührei mit sattgrünem Spinat auf zwei Scheiben kräftigem Vollkornbrot, daneben halbierte Kirschtomaten auf einem hellen Teller'
});
