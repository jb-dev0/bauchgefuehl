import { anrichten, fix, ing, many, nebenbei, one, pfanne, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'shakshuka',
	name: 'Shakshuka mit Kichererbsen und Feta',
	kategorie: 'abend',
	beschreibung:
		'Würzige Tomaten-Paprika-Sauce mit Kichererbsen, darin zugedeckt fest gestockte Eier, obenauf Feta und Petersilie – dazu Vollkornbrot zum Tunken.',
	portionen: 4,
	zutaten: [
		ing(2, 'EL', 'Olivenöl'),
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(2, 'Zehe', 'Knoblauch'),
		ing(1, 'TL', 'Kreuzkümmel'),
		ing(2, 'TL', 'Paprikapulver (edelsüß)'),
		ing(1, 'EL', 'Tomatenmark'),
		ing(2, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(1, 'Dose', 'Kichererbsen (Dose)'),
		ing(8, 'Stk', 'Ei'),
		ing(100, 'g', 'Feta'),
		ing(0.5, 'Bund', 'Petersilie'),
		ing(0.5, 'TL', 'Jodsalz')
	],
	schritte: [
		vor(
			'Zwiebel fein würfeln, Knoblauch fein hacken. Kichererbsen in einem Sieb abgießen und abspülen.',
			2.5
		),
		pfanne(
			1,
			'Öl in einer großen, tiefen Pfanne mit Deckel erhitzen und die Zwiebel darin 2 Min. andünsten. Währenddessen die Paprika klein würfeln.',
			2,
			2
		),
		pfanne(
			2,
			'Paprika, Knoblauch, Kreuzkümmel, Paprikapulver und Tomatenmark dazugeben und 2 Min. unter Rühren braten.',
			2,
			0.5
		),
		pfanne(
			3,
			'Tomaten, Kichererbsen und ½ TL Salz dazugeben und in etwa 2 Min. aufkochen lassen.',
			2,
			0.5
		),
		pfanne(
			4,
			'Mit einem Löffel 8 Mulden in die Sauce drücken und je ein Ei hineinschlagen. Deckel auflegen und bei kleiner bis mittlerer Hitze 10 Min. stocken lassen, bis Eiweiß und Eigelb ganz fest sind – in der Schwangerschaft kein flüssiges Eigelb. Sonst noch 2 Min. weitergaren.',
			10,
			1.5
		),
		nebenbei('Petersilie waschen und hacken, Feta zerbröseln.', 1.5),
		anrichten(
			'Feta und Petersilie über die Shakshuka streuen und direkt aus der Pfanne mit {base} servieren.',
			1
		)
	],
	slots: [
		one('base', 'Brot', 'base', 'brot', [
			{
				id: 'brot',
				label: 'Vollkornbrot',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')]
			},
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'warmer Pita',
				items: [ing(4, 'Stk', 'Vollkorn-Pita')],
				steps: [nebenbei('Pita im Toaster aufbacken und in Streifen schneiden.', 1)]
			}
		]),
		many(
			'top',
			'Topping',
			'top',
			[],
			[
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					items: [fix(1, 'TL', 'Chiliflocken')],
					steps: [anrichten('Für Erwachsene am Tisch Chiliflocken darüberstreuen.', 0.5)]
				}
			]
		)
	],
	ohneTm:
		'Die Eier müssen zugedeckt in der Sauce stocken, das geht nur in der Pfanne. Die paar Schnitte sind von Hand schneller erledigt.',
	kind: 'Ein Ei mit etwas Sauce und Kichererbsen auf den Kinderteller geben, Ei klein schneiden und Kichererbsen leicht zerdrücken. Brot in Streifen zum Tunken. Feta sparsam, er ist salzig; Chili gibt es nur für die Großen.',
	mitnehmen:
		'Sauce mit Eiern in eine Box füllen, rasch abkühlen lassen, kühl stellen und innerhalb von 1 Tag essen. Die Eier vor dem Aufwärmen halbieren (sonst können sie in der Mikrowelle platzen) und alles abgedeckt 2–3 Min. dampfend heiß machen.',
	vorrat:
		'Die Tomaten-Kichererbsen-Sauce lässt sich gut verdoppeln: Sie hält 2 Tage im Kühlschrank oder 3 Monate im Gefrierfach. Dann nur noch erhitzen und die Eier frisch darin stocken lassen.',
	gdm: 'Nur eine halbe Scheibe Brot pro Person nehmen: Kichererbsen und Eier machen auch so satt. Ein Klecks Skyr obendrauf bringt noch mehr Eiweiß.',
	tags: ['pfanne', 'brot'],
	photoAlt:
		'Pfanne mit dampfender Tomaten-Paprika-Sauce, Kichererbsen und acht fest gestockten Eiern, bestreut mit zerbröseltem Feta und Petersilie, daneben Scheiben Vollkornbrot'
});
