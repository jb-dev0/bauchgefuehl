import { anrichten, fix, ing, nebenbei, ofen, one, rezept, start, vor } from '../../helpers.ts';

export default rezept({
	id: 'ofen-feta-pasta',
	name: 'Ofen-Feta-Pasta mit Tomaten, Spinat und Bohnen',
	kategorie: 'abend',
	beschreibung:
		'Der Ofen macht die Sauce: Feta und Kirschtomaten schmelzen zu einer cremigen Sauce, weiße Bohnen und Spinat machen daraus eine sättigende Mahlzeit.',
	portionen: 4,
	zutaten: [
		ing(200, 'g', 'Feta', 'am Stück'),
		ing(500, 'g', 'Kirschtomaten'),
		ing(2, 'Dose', 'weiße Bohnen (Dose)'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(150, 'g', 'Babyspinat')
	],
	schritte: [
		vor('Backofen auf 200 °C Ober-/Unterhitze (180 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Kirschtomaten waschen, Bohnen abspülen und abtropfen lassen. Beides mit Olivenöl, angedrücktem Knoblauch, Oregano und Pfeffer in einer großen Auflaufform mischen, den Feta als Block in die Mitte legen.',
			3,
			{ order: 60 }
		),
		ofen(
			'Form in den Ofen schieben und 25 Min. backen, bis die Tomaten aufplatzen und der Feta weich ist.',
			25,
			0.5
		),
		nebenbei('Babyspinat gründlich waschen und trocken schleudern.', 1.5),
		anrichten(
			'Feta und Tomaten in der Form mit einer Gabel zerdrücken und zu einer cremigen Sauce verrühren. Spinat unterheben, bis er zusammenfällt.',
			1.5,
			{ order: 10 }
		),
		anrichten('{base} und etwas Nudelwasser untermischen, bis alles sämig ist.', 1, { order: 20 })
	],
	slots: [
		one('base', 'Nudeln', 'base', 'vollkorn', [
			{
				id: 'vollkorn',
				label: 'Vollkornnudeln',
				short: 'Nudeln',
				items: [ing(200, 'g', 'Vollkornnudeln')],
				steps: [
					start(
						'Nudeln in reichlich Salzwasser nach Packungsangabe bissfest kochen (ca. 10 Min.). Vor dem Abgießen eine Tasse Nudelwasser abschöpfen.',
						11
					)
				]
			},
			{
				id: 'linsen',
				label: 'Rote-Linsen-Nudeln',
				short: 'Nudeln',
				items: [ing(200, 'g', 'Rote-Linsen-Nudeln')],
				steps: [
					start(
						'Nudeln in reichlich Salzwasser nach Packungsangabe bissfest kochen (ca. 7 Min.). Vor dem Abgießen eine Tasse Nudelwasser abschöpfen.',
						8
					)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'feta', [
			{ id: 'feta', label: 'Feta & Bohnen', items: [] },
			{
				id: 'haehnchen',
				label: 'Mit Hähnchen',
				short: 'Hähnchen',
				items: [ing(400, 'g', 'Hähnchenbrustfilet')],
				steps: [
					vor(
						'Hähnchen in 2 cm große Würfel schneiden, leicht salzen und rund um den Feta in die Form legen.',
						2.5,
						{ order: 70 }
					),
					ofen(
						'Das Hähnchen gart die vollen 25 Min. mit. Ein Stück aufschneiden: Es muss innen weiß und nicht mehr rosa sein.',
						0,
						0.5
					)
				]
			}
		])
	],
	ohneTm:
		'Die Sauce entsteht im Ofen und die Nudeln kochen nebenher im Topf, der Thermomix würde hier nur Zeit kosten.',
	kind: 'Die Tomaten zerfallen beim Zerdrücken; übrig gebliebene ganze Tomaten für das Kind vierteln. Bohnen leicht zerdrücken, Spinat klein schneiden. Feta ist salzig, darum nicht nachsalzen und die Kinderportion vor dem Pfeffern abnehmen.',
	mitnehmen:
		'Hält gut 2 Tage im Kühlschrank. In der Box mit 1–2 EL Wasser 2–3 Min. in der Mikrowelle dampfend heiß erhitzen, zwischendurch umrühren.',
	vorrat:
		'Die Form kannst du morgens fertig belegen und abgedeckt in den Kühlschrank stellen; abends nur noch backen und Nudeln kochen.',
	gdm: 'Rote-Linsen-Nudeln nehmen: Sie haben doppelt so viel Eiweiß und deutlich weniger Kohlenhydrate. Oder die Nudelmenge halbieren und eine Extraportion Spinat unterheben.',
	tags: ['ofen', 'pasta'],
	photoAlt:
		'Auflaufform mit zerdrücktem, cremigem Feta, geplatzten Kirschtomaten, weißen Bohnen und frischem Babyspinat, untergemischt mit Vollkornnudeln'
});
