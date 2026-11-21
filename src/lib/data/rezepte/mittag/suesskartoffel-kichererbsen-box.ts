import {
	anrichten,
	fix,
	ing,
	nebenbei,
	NONE,
	ofen,
	one,
	rezept,
	sauce,
	variant,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'suesskartoffel-kichererbsen-box',
	name: 'Süßkartoffel-Kichererbsen-Box mit Joghurt-Tahin-Sauce',
	kategorie: 'mittag',
	beschreibung:
		'Geröstete Süßkartoffelwürfel, knusprige Kichererbsen und Brokkoli vom Blech auf Babyspinat, dazu eine cremige Joghurt-Tahin-Sauce mit Zitrone.',
	portionen: 2,
	zutaten: [
		ing(1, 'Dose', 'Kichererbsen (Dose)'),
		ing(250, 'g', 'Brokkoli'),
		ing(1, 'Stk', 'rote Zwiebel'),
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(0.5, 'TL', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer'),
		ing(2, 'Hv', 'Babyspinat'),
		ing(150, 'g', 'Skyr', 'oder griechischer Joghurt'),
		ing(1, 'EL', 'Tahin'),
		ing(1, 'EL', 'Zitronensaft')
	],
	schritte: [
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Kichererbsen abgießen, abspülen und gut abtropfen lassen. Zwiebel in Spalten schneiden.',
			2
		),
		vor(
			'Alles auf einem Backblech mit 1½ EL Olivenöl, Paprikapulver, Kreuzkümmel, Salz und Pfeffer mischen.',
			1.5,
			{ order: 60 }
		),
		ofen('Blech in den Ofen schieben und 25 Min. rösten, nach der Hälfte einmal wenden.', 25, 0.5),
		ofen(
			'Währenddessen Brokkoli in kleine Röschen teilen und waschen, nach 12 Min. mit dem restlichen Olivenöl aufs Blech geben und 13 Min. mitrösten.',
			0,
			2.5
		),
		sauce('Skyr, Tahin, Zitronensaft und 1 Prise Salz mit 2–3 EL Wasser cremig rühren.', 2),
		nebenbei('Spinat gründlich waschen und trocken schleudern.', 1),
		anrichten(
			'Spinat auf zwei Boxen verteilen, Ofengemüse und Kichererbsen daraufgeben und die Sauce in ein kleines Glas füllen.',
			1.5
		)
	],
	slots: [
		one('base', 'Beilage', 'base', 'suesskartoffel', [
			{
				id: 'suesskartoffel',
				label: 'Süßkartoffel',
				items: [ing(300, 'g', 'Süßkartoffel')],
				steps: [
					vor('Süßkartoffel gründlich waschen und ungeschält in 2 cm große Würfel schneiden.', 3, {
						order: 40
					})
				]
			},
			{
				id: 'kartoffel',
				label: 'Kartoffeln',
				items: [ing(350, 'g', 'Kartoffeln')],
				steps: [
					vor('Kartoffeln gründlich waschen und ungeschält in 2 cm große Würfel schneiden.', 3, {
						order: 40
					})
				]
			}
		]),
		one('prot', 'Extra-Eiweiß', 'main', 'none', [
			variant(NONE, { label: 'nur Kichererbsen' }),
			{
				id: 'feta',
				label: 'Feta',
				items: [ing(80, 'g', 'Feta')],
				steps: [ofen('Feta in Würfeln für die letzten 8 Min. auf das Blech legen.', 0, 0.5)]
			},
			{
				id: 'haehnchen',
				label: 'Hähnchenbrust',
				short: 'Hähnchen',
				items: [ing(250, 'g', 'Hähnchenbrustfilet')],
				steps: [
					vor(
						'Hähnchen in mundgerechte Stücke schneiden und mit auf das Blech geben – es gart die vollen 25 Min. mit, bis es innen nicht mehr rosa ist.',
						2,
						{ order: 50 }
					)
				]
			}
		])
	],
	ohneTm:
		'Hier macht der Ofen die Arbeit, und die Sauce ist mit dem Löffel schneller verrührt als im Mixtopf.',
	kind: 'Kichererbsen für das Kind mit der Gabel leicht zerdrücken, ganz können sie in den falschen Hals geraten. Süßkartoffel und Brokkoli in kleine Stücke schneiden – süß und weich mögen Dreijährige gern. Sauce zum Dippen daneben.',
	mitnehmen:
		'Ofengemüse rasch abkühlen lassen und in die Box füllen, Spinat und Sauce getrennt einpacken. In der Arbeit das Gemüse 2 Min. in der Mikrowelle dampfend heiß erhitzen, dann auf den Spinat geben und die kalte Sauce darüber.',
	vorrat:
		'Ofengemüse und Kichererbsen halten 2 Tage im Kühlschrank, die Sauce 3 Tage. Gut für Meal-Prep am Sonntag: ein großes Blech rösten und auf Boxen verteilen.',
	gdm: 'Süßkartoffel ist die Sättigungsbeilage: lieber eine etwas kleinere Menge nehmen und dafür mehr Brokkoli aufs Blech geben. Feta oder Hähnchen dazu machen die Box noch eiweißreicher.',
	tags: ['ofen', 'bowl', 'vorkochen'],
	photoAlt:
		'Meal-Prep-Box mit gerösteten Süßkartoffelwürfeln, knusprigen Kichererbsen und Brokkoli auf Babyspinat, daneben ein Glas cremige Joghurt-Tahin-Sauce'
});
