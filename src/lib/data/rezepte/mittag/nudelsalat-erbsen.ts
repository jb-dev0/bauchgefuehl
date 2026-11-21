import { anrichten, fix, ing, nebenbei, one, pfanne, rezept, sauce, start } from '../../helpers.ts';

export default rezept({
	id: 'nudelsalat-erbsen',
	name: 'Vollkornnudelsalat mit Erbsen und Joghurt-Dressing',
	kategorie: 'mittag',
	beschreibung:
		'Leichter Nudelsalat ohne Mayo: Vollkornnudeln, Erbsen, Gurke und Paprika in einem frischen Joghurt-Schnittlauch-Dressing, dazu Ei oder Hähnchen.',
	portionen: 2,
	zutaten: [
		ing(150, 'g', 'TK-Erbsen'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(150, 'g', 'Naturjoghurt'),
		ing(1, 'TL', 'Senf'),
		ing(1, 'EL', 'Zitronensaft'),
		ing(1, 'EL', 'Olivenöl'),
		ing(0.5, 'Bund', 'Schnittlauch'),
		ing(0.25, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		nebenbei(
			'Erbsen 3 Min. vor Ende der Garzeit zu den Nudeln geben und sprudelnd mitkochen. Alles abgießen, kalt abschrecken und gut abtropfen lassen.',
			1
		),
		sauce(
			'Joghurt mit Senf, Zitronensaft, Olivenöl, Salz und Pfeffer verrühren. Schnittlauch waschen, in feine Röllchen schneiden und unterrühren.',
			2.5
		),
		nebenbei('Gurke und Paprika in kleine Würfel schneiden.', 3),
		anrichten(
			'Nudeln, Erbsen, Gemüse und {prot} mit dem Dressing mischen und auf zwei Boxen verteilen.',
			1
		)
	],
	slots: [
		one('base', 'Nudeln', 'base', 'vollkorn', [
			{
				id: 'vollkorn',
				label: 'Vollkornnudeln',
				short: 'Nudeln',
				items: [ing(100, 'g', 'Vollkornnudeln', 'z. B. Fusilli')],
				steps: [
					start(
						'Nudeln in reichlich kochendem, leicht gesalzenem Wasser nach Packungsangabe bissfest garen (etwa 10 Min.).',
						12
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Linsennudeln',
				items: [ing(100, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Linsennudeln in reichlich kochendem, leicht gesalzenem Wasser nach Packungsangabe garen (etwa 7 Min.).',
						9
					)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'ei', [
			{
				id: 'ei',
				label: 'Hartgekochte Eier',
				short: 'Eier',
				items: [ing(4, 'Stk', 'Ei')],
				steps: [
					start(
						'Eier anpieksen, in kochendes Wasser legen und 10 Min. hart kochen, bis das Eigelb ganz fest ist. Kalt abschrecken.',
						11
					),
					nebenbei('Eier pellen und in Stücke schneiden.', 2)
				]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenbrust',
				short: 'Hähnchen',
				items: [ing(250, 'g', 'Hähnchenbrustfilet'), ing(1, 'TL', 'Rapsöl')],
				steps: [
					pfanne(
						1,
						'Hähnchen in kleine Würfel schneiden und in Rapsöl 6–7 Min. rundum braten, bis es innen nicht mehr rosa ist. Abkühlen lassen.',
						7,
						2.5
					)
				]
			}
		])
	],
	ohneTm: 'Nudeln und Eier garen am schnellsten im Topf, das Dressing ist mit dem Löffel verrührt.',
	kind: 'Eine Portion vor dem Nachwürzen abnehmen. Eier klein hacken, Erbsen kann das Kind mit der Gabel aufpicken. Nudelsalat ist bei Dreijährigen ein sicherer Favorit, gern mit weniger Dressing.',
	mitnehmen:
		'Ein Salat zum Kaltessen: in einer gut schließenden Box mit Kühlakku transportieren und in der Arbeit bis zum Mittag in den Kühlschrank stellen. Etwas Dressing getrennt mitnehmen, die Nudeln ziehen es über Nacht auf.',
	vorrat:
		'Am Vorabend zubereitet hält der Salat im Kühlschrank bis zum nächsten Mittag, insgesamt höchstens 2 Tage. Nudeln, Erbsen und Eier lassen sich auch am Wochenende vorkochen und getrennt lagern.',
	gdm: 'Rote-Linsen-Nudeln statt Vollkornnudeln senken die Kohlenhydrate deutlich und bringen mehr Eiweiß. Den Gemüseanteil darfst du gern verdoppeln.',
	hinweis:
		'Nur selbst gemachter, frisch zubereiteter Nudelsalat: durchgehend gekühlt lagern und innerhalb von 1–2 Tagen essen.',
	tags: ['salat', 'pasta', 'kalt', 'vorkochen'],
	photoAlt:
		'Glasschüssel mit Vollkorn-Fusilli, grünen Erbsen, Gurken- und Paprikawürfeln, Eivierteln und cremigem Joghurt-Schnittlauch-Dressing'
});
