import { anrichten, fix, ing, many, nebenbei, one, rezept, start } from '../../helpers.ts';

export default rezept({
	id: 'ei-avocado-brot',
	name: 'Vollkornbrot mit Avocado und hart gekochtem Ei',
	kategorie: 'fruehstueck',
	beschreibung:
		'Cremige Avocado mit Zitrone auf kräftigem Vollkornbrot, dazu Scheiben vom hart gekochten Ei: gutes Fett, viel Eiweiß und Folat.',
	portionen: 2,
	zutaten: [
		ing(4, 'Stk', 'Ei'),
		ing(1, 'Stk', 'Avocado', 'reif'),
		ing(1, 'TL', 'Zitronensaft'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Eier in kochendes Wasser legen und 10 Min. kochen, bis auch das Eigelb ganz fest ist. Kalt abschrecken.',
			10,
			1
		),
		nebenbei(
			'Avocado halbieren, Kern entfernen, Fruchtfleisch herauslöffeln und mit Zitronensaft, 1 Prise Salz und Pfeffer mit einer Gabel grob zerdrücken.',
			2
		),
		anrichten('{brot} dick mit der Avocadocreme bestreichen.', 1),
		anrichten('Eier pellen, in Scheiben schneiden und darauflegen.', 1.5)
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
		]),
		many(
			'top',
			'Extras',
			'top',
			['tomaten'],
			[
				{
					id: 'tomaten',
					label: 'Kirschtomaten',
					items: [ing(1, 'Hv', 'Kirschtomaten')],
					steps: [anrichten('Kirschtomaten waschen, halbieren und dazulegen.', 1)]
				},
				{
					id: 'chili',
					label: 'Chiliflocken (Erwachsene)',
					items: [fix(1, 'Prise', 'Chiliflocken')],
					steps: [anrichten('Die Brote der Erwachsenen mit Chiliflocken bestreuen.', 0.5)]
				}
			]
		)
	],
	ohneTm:
		'Eier kochen geht im Topf schneller, und die Avocado ist mit der Gabel in einer Minute zerdrückt.',
	kind: 'Avocado ohne Chili aufs Brot streichen, das Ei klein schneiden und das Brot in Streifen oder Würfel teilen. Kirschtomaten für das Kind vierteln.',
	mitnehmen:
		'Avocadocreme mit etwas mehr Zitronensaft in einer kleinen Dose, Ei und Brot getrennt einpacken, gekühlt transportieren und erst vor dem Essen belegen.',
	vorrat:
		'Eier am Wochenende auf Vorrat kochen: abgeschreckt und ungeschält halten sie im Kühlschrank 3–4 Tage. Dann ist das Brot morgens in 5 Minuten fertig.',
	gdm: 'Das Fett der Avocado und das Ei bremsen den Anstieg schon gut. Ist dein Wert nach dem Frühstück trotzdem hoch, nimm Knäckebrot oder eine Scheibe weniger und leg dafür ein zweites Ei auf.',
	hinweis:
		'Eier in der Schwangerschaft immer hart kochen, das Eigelb muss ganz fest sein (Salmonellen).',
	tags: ['brot'],
	photoAlt:
		'Zwei Scheiben Vollkornbrot dick bestrichen mit grob zerdrückter Avocado, belegt mit Scheiben vom hart gekochten Ei mit festem gelbem Eigelb, daneben halbierte Kirschtomaten'
});
