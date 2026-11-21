import { anrichten, fix, ing, rezept } from '../../helpers.ts';

export default rezept({
	id: 'knaecke-huettenkaese',
	name: 'Knäckebrot mit Hüttenkäse und Avocado',
	kategorie: 'snack',
	beschreibung:
		'Knusprig, cremig und mit viel Eiweiß: hält bis zur nächsten Mahlzeit satt, ohne den Blutzucker hochzutreiben.',
	portionen: 1,
	zutaten: [
		ing(2, 'Scheibe', 'Vollkorn-Knäckebrot'),
		ing(100, 'g', 'Hüttenkäse'),
		ing(0.25, 'Stk', 'Avocado'),
		ing(1, 'EL', 'Granatapfelkerne'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		anrichten('Knäckebrot mit Hüttenkäse bestreichen.', 0.5),
		anrichten(
			'Avocado in dünne Scheiben schneiden und darauflegen, mit Granatapfelkernen und Pfeffer bestreuen.',
			1.5
		)
	],
	ohneTm: 'Geht ohne Gerät schneller.',
	kind: 'Als „Knusperbrot“ mit Hüttenkäse und zerdrückter Avocado. Granatapfelkerne einzeln obendrauf picken lassen.',
	mitnehmen:
		'Hüttenkäse und Avocado (mit etwas Zitronensaft) in einer kleinen Dose, Knäckebrot getrennt einpacken und erst vor dem Essen belegen.',
	tags: ['kalt', 'brot'],
	photoAlt:
		'Zwei Vollkorn-Knäckebrote mit Hüttenkäse, Avocadoscheiben und leuchtenden Granatapfelkernen auf einem Holzbrett'
});
