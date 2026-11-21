import {
	anrichten,
	fix,
	ing,
	nebenbei,
	NONE,
	one,
	pfanne,
	rezept,
	sauce,
	start,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'halloumi-couscous',
	name: 'Mediterrane Couscous-Pfanne mit Halloumi',
	kategorie: 'abend',
	beschreibung:
		'Vollkorn-Couscous mit gebratener Zucchini, Paprika, Kichererbsen und Kirschtomaten, obenauf goldbrauner Halloumi und ein kühler Minz-Joghurt.',
	portionen: 4,
	zutaten: [
		ing(1, 'Dose', 'Kichererbsen (Dose)'),
		ing(2, 'Stk', 'Zucchini'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(1, 'Stk', 'rote Zwiebel'),
		ing(250, 'g', 'Kirschtomaten'),
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		ing(1, 'Stk', 'Zitrone'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		vor(
			'Zwiebel in feine Streifen schneiden. Kichererbsen in einem Sieb abgießen und abspülen.',
			2
		),
		pfanne(2, 'Währenddessen Zucchini und Paprika in mundgerechte Würfel schneiden.', 0, 4),
		pfanne(
			3,
			'{prot} herausnehmen und warm stellen. Restliches Öl in die Pfanne geben und Zwiebel, Zucchini und Paprika darin bei starker Hitze 5 Min. braten.',
			5,
			0.5
		),
		pfanne(
			4,
			'Kichererbsen, Kirschtomaten, Paprikapulver, Kreuzkümmel, Oregano und ½ TL Salz dazugeben und 2 Min. mitbraten.',
			2,
			0.5
		),
		pfanne(
			5,
			'{base} unterheben, mit 2 EL Zitronensaft beträufeln und mit Pfeffer abschmecken.',
			1,
			0.5
		),
		nebenbei(
			'Kirschtomaten halbieren (für das Kind vierteln). Zitrone auspressen, Petersilie waschen und hacken.',
			2.5
		),
		anrichten(
			'Gemüse-Couscous auf Teller verteilen, {prot} darauflegen und mit Petersilie bestreuen.',
			1
		),
		anrichten('Mit {dip} servieren.', 0.5, { wenn: 'dip' })
	],
	slots: [
		one('base', 'Grundlage', 'base', 'couscous', [
			{
				id: 'couscous',
				label: 'Vollkorn-Couscous',
				short: 'Couscous',
				items: [ing(200, 'g', 'Vollkorn-Couscous')],
				steps: [
					start(
						'Couscous mit 1 Prise Salz in eine Schüssel geben, mit 300 ml kochendem Wasser aus dem Wasserkocher übergießen, zudecken und 5 Min. quellen lassen. Mit einer Gabel auflockern.',
						5
					)
				]
			},
			{
				id: 'bulgur',
				label: 'Bulgur',
				items: [ing(200, 'g', 'Bulgur')],
				steps: [
					start(
						'Bulgur mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 10 Min. quellen lassen.',
						12
					)
				]
			},
			{
				id: 'quinoa',
				label: 'Quinoa',
				items: [ing(200, 'g', 'Quinoa')],
				steps: [
					start(
						'Quinoa in einem Sieb heiß abspülen, mit 400 ml Wasser und 1 Prise Salz aufkochen und zugedeckt bei kleiner Hitze 15 Min. quellen lassen.',
						15
					)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'halloumi', [
			{
				id: 'halloumi',
				label: 'Halloumi',
				items: [ing(250, 'g', 'Halloumi')],
				steps: [
					pfanne(
						1,
						'Halloumi in 1 cm dicke Scheiben schneiden. 1 TL Öl in einer großen Pfanne erhitzen und den Halloumi darin bei mittlerer Hitze je Seite 2 Min. goldbraun braten.',
						4,
						1.5
					)
				]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenbrust',
				short: 'Hähnchen',
				items: [ing(400, 'g', 'Hähnchenbrustfilet')],
				steps: [
					pfanne(
						1,
						'Hähnchen in mundgerechte Würfel schneiden. 1 EL Öl in einer großen Pfanne erhitzen und das Hähnchen darin 6 Min. rundum braten, bis es innen nicht mehr rosa ist.',
						6,
						2.5
					)
				]
			},
			{
				id: 'lachs',
				label: 'Lachsfilet',
				short: 'Lachs',
				items: [ing(400, 'g', 'Lachsfilet', 'ohne Haut')],
				steps: [
					pfanne(
						1,
						'Lachs in 3 cm große Würfel schneiden. 1 EL Öl in einer großen Pfanne erhitzen und den Lachs darin 4–5 Min. rundum braten, bis er innen nicht mehr glasig ist.',
						5,
						2
					)
				]
			}
		]),
		one('dip', 'Dip', 'sauce', 'minze', [
			{
				id: 'minze',
				label: 'Minz-Joghurt',
				items: [ing(200, 'g', 'Skyr'), ing(3, 'EL', 'Minze', 'gehackt')],
				steps: [
					sauce(
						'Minze waschen und fein hacken. Skyr mit Minze, 1 EL Zitronensaft, 1 Prise Salz und 2–3 EL Wasser glatt rühren.',
						2
					)
				]
			},
			NONE
		])
	],
	ohneTm:
		'Gemüse und Halloumi sollen in der Pfanne Röstaromen bekommen, und der Couscous quillt mit Wasser aus dem Wasserkocher ganz von allein.',
	kind: 'Halloumi ist recht salzig: Für das Kind ein kleines Stück in Streifen schneiden und dafür mehr Couscous und Gemüse nehmen. Kichererbsen leicht zerdrücken, Kirschtomaten vierteln.',
	mitnehmen:
		'In eine Box füllen, rasch abkühlen lassen und in den Kühlschrank stellen. Am nächsten Tag 2–3 Min. in der Mikrowelle dampfend heiß machen, den Minz-Joghurt kalt dazu. Halloumi wird beim Aufwärmen etwas fester, schmeckt aber trotzdem.',
	vorrat:
		'Zucchini, Paprika und Zwiebel am Vorabend schneiden und in einer Dose kühl stellen. Die fertige Pfanne hält 2 Tage im Kühlschrank.',
	gdm: 'Den Couscous auf 120 g reduzieren und dafür eine dritte Zucchini mitbraten. Bulgur oder Quinoa lassen den Blutzucker etwas langsamer steigen als Couscous.',
	tags: ['pfanne'],
	photoAlt:
		'Große Pfanne mit Vollkorn-Couscous, gebratener Zucchini, Paprika, Kichererbsen und Kirschtomaten, obenauf goldbraun gebratene Halloumischeiben und frische Petersilie, daneben eine Schale Minz-Joghurt'
});
