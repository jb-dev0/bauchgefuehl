import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, sauce, start } from '../../helpers.ts';

export default rezept({
	id: 'kichererbsen-couscous-salat',
	name: 'Kichererbsen-Couscous-Salat im Glas',
	kategorie: 'mittag',
	beschreibung:
		'Geschichteter Salat im Schraubglas: Zitronen-Dressing unten, dann Kichererbsen, Gurke, Tomaten, Kräuter-Couscous und Feta – bleibt bis mittags knackig.',
	portionen: 2,
	zutaten: [
		ing(1, 'Dose', 'Kichererbsen (Dose)'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(200, 'g', 'Kirschtomaten'),
		ing(0.5, 'Bund', 'Minze'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(2, 'EL', 'Zitronensaft'),
		ing(2, 'EL', 'Olivenöl'),
		ing(0.5, 'TL', 'Kreuzkümmel'),
		ing(0.25, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		sauce(
			'Zitronensaft, Olivenöl, Kreuzkümmel, Salz und Pfeffer in einer kleinen Schüssel verrühren.',
			1
		),
		nebenbei(
			'Kichererbsen abspülen und abtropfen lassen. Gurke würfeln, Kirschtomaten vierteln. Minze und Petersilie waschen, trocken schütteln und fein hacken.',
			6
		),
		anrichten('{base} mit einer Gabel auflockern und die Hälfte der Kräuter untermischen.', 0.5),
		anrichten(
			'Das Dressing auf zwei große Schraubgläser verteilen. Darauf schichten: Kichererbsen, Gurke, Tomaten, {base} und obenauf {prot} und die restlichen Kräuter. Gläser verschließen.',
			2
		)
	],
	slots: [
		one('base', 'Getreide', 'base', 'couscous', [
			{
				id: 'couscous',
				label: 'Vollkorn-Couscous',
				short: 'Couscous',
				items: [ing(80, 'g', 'Vollkorn-Couscous')],
				steps: [
					start(
						'Couscous in einer Schüssel mit 100 ml kochendem Wasser übergießen, zudecken und 5 Min. quellen lassen.',
						6
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(80, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 160 ml Wasser aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen. Abkühlen lassen.',
						15
					)
				]
			}
		]),
		one(
			'prot',
			'Eiweiß',
			'main',
			'feta',
			[
				{
					id: 'feta',
					label: 'Feta',
					short: 'Fetawürfel',
					items: [ing(120, 'g', 'Feta')],
					steps: [nebenbei('Feta in kleine Würfel schneiden.', 0.5)]
				},
				{
					id: 'haehnchen',
					label: 'Hähnchenbrust',
					short: 'das Hähnchen',
					items: [ing(200, 'g', 'Hähnchenbrustfilet'), ing(1, 'TL', 'Rapsöl')],
					steps: [
						pfanne(
							1,
							'Hähnchen in kleine Würfel schneiden und in Rapsöl 6 Min. rundum braten, bis es innen nicht mehr rosa ist. Abkühlen lassen.',
							6,
							2.5
						)
					]
				}
			],
			'feta'
		)
	],
	ohneTm:
		'Der Couscous quillt mit Wasser aus dem Wasserkocher, der Rest ist Schnippelarbeit – dafür braucht es keinen Thermomix.',
	kind: 'Kirschtomaten für das Kind vierteln und die Kichererbsen leicht mit der Gabel zerdrücken, ganz können sie in den falschen Hals geraten. Minze nur sparsam, Feta in kleinen Krümeln.',
	mitnehmen:
		'Das Glas aufrecht und gekühlt transportieren, in der Arbeit in den Kühlschrank stellen. Kurz vor dem Essen kräftig schütteln oder in eine Schüssel stürzen und durchmischen. Kalt am besten.',
	vorrat:
		'Die Gläser lassen sich am Vorabend für den nächsten Tag schichten und halten im Kühlschrank bis zu 2 Tage, weil das Dressing unten bleibt. Couscous und Kichererbsen kannst du am Wochenende vorbereiten.',
	gdm: 'Quinoa statt Couscous bringt mehr Eiweiß und Ballaststoffe. Für noch weniger Kohlenhydrate den Couscous halbieren und dafür mehr Gurke nehmen.',
	hinweis:
		'Mit Hähnchen: nach dem Braten rasch abkühlen lassen, durchgehend kühlen und innerhalb von 1–2 Tagen essen.',
	tags: ['salat', 'kalt', 'vorkochen'],
	photoAlt:
		'Zwei Schraubgläser mit geschichtetem Salat aus Kichererbsen, Gurke, halbierten Kirschtomaten, Couscous mit Kräutern und weißen Fetawürfeln'
});
