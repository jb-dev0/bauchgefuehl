import {
	anrichten,
	fix,
	ing,
	many,
	one,
	pfanne,
	rezept,
	start,
	tm,
	vor
} from '../../helpers.ts';

export default rezept({
	id: 'gebratener-reis',
	name: 'Gebratener Vollkornreis mit Ei und Erbsen',
	kategorie: 'abend',
	beschreibung:
		'Die beste Resteverwertung: Naturreis vom Vortag, in der Pfanne mit Ei, Erbsen und buntem Gemüse knusprig gebraten.',
	portionen: 4,
	zutaten: [
		ing(6, 'Stk', 'Ei'),
		ing(250, 'g', 'TK-Erbsen'),
		ing(2, 'Stk', 'Karotte'),
		ing(1, 'Stk', 'rote Paprika'),
		ing(4, 'Stk', 'Frühlingszwiebel'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'TL', 'Ingwer', 'frisch gerieben'),
		ing(2, 'EL', 'Rapsöl'),
		ing(3, 'EL', 'Sojasauce (salzreduziert)'),
		ing(1, 'TL', 'Sesamöl (geröstet)')
	],
	schritte: [
		vor(
			'Frühlingszwiebeln in Ringe schneiden, dabei Weiß und Grün getrennt halten. Knoblauch fein hacken, Ingwer reiben.',
			2
		),
		pfanne(
			2,
			'Inzwischen Karotten schälen und klein würfeln, Paprika ebenfalls klein würfeln. Mit dem Weißen der Frühlingszwiebeln, Knoblauch und Ingwer in die Pfanne geben und 3 Min. braten.',
			3,
			4
		),
		pfanne(
			3,
			'{base} und die gefrorenen Erbsen dazugeben und unter Rühren 5 Min. braten, bis der Reis leicht knusprig und alles dampfend heiß ist. Währenddessen die Eier verquirlen.',
			5,
			1.5
		),
		pfanne(
			4,
			'Alles an den Rand schieben, die Eier in die freie Mitte gießen und unter Rühren 2 Min. zu festem Rührei braten, bis nichts Flüssiges mehr glänzt. Dann untermischen.',
			2,
			1
		),
		pfanne(
			6,
			'Sojasauce und Sesamöl unterrühren. Die Kinderportion abnehmen, bevor Erwachsene nachwürzen.',
			1,
			0.5
		),
		anrichten('Auf Teller verteilen und mit dem Grün der Frühlingszwiebeln bestreuen.', 0.5),
		anrichten('Mit {top} bestreuen.', 0.5, { wenn: 'top' })
	],
	slots: [
		one('base', 'Reis', 'base', 'reis', [
			{
				id: 'reis',
				label: 'Naturreis vom Vortag',
				short: 'Reis',
				items: [ing(600, 'g', 'gekochter Naturreis', 'vom Vortag, gut gekühlt')]
			},
			{
				id: 'blumenkohl',
				label: 'Halb Reis, halb Blumenkohl',
				short: 'Reis mit Blumenkohl',
				items: [
					ing(350, 'g', 'gekochter Naturreis', 'vom Vortag, gut gekühlt'),
					ing(350, 'g', 'Blumenkohl')
				],
				steps: [
					vor(
						'Blumenkohl in Röschen teilen und mit einem großen Messer so fein hacken, dass er wie Reis aussieht.',
						3
					)
				],
				tmSteps: [
					vor('Blumenkohl in Röschen teilen.', 1),
					tm(1, 'Blumenkohl in den Mixtopf geben und 4 Sek./Stufe 5 zu „Reis“ zerkleinern.', 0.5, 0.5)
				]
			}
		]),
		one('prot', 'Eiweiß', 'main', 'tofu', [
			{
				id: 'tofu',
				label: 'Tofu',
				items: [ing(300, 'g', 'Tofu natur')],
				steps: [
					pfanne(
						1,
						'Öl in einer großen Pfanne oder einem Wok erhitzen. Tofu trocken tupfen, in 1 cm große Würfel schneiden und darin 4 Min. rundum goldbraun braten.',
						4,
						2
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
						'Öl in einer großen Pfanne oder einem Wok erhitzen. Hähnchen in kleine Würfel schneiden und darin 5 Min. rundum braten, bis es innen nicht mehr rosa ist.',
						5,
						2.5
					)
				]
			},
			{
				id: 'garnelen',
				label: 'Garnelen (TK)',
				short: 'Garnelen',
				items: [ing(400, 'g', 'TK-Garnelen', 'roh, geschält')],
				steps: [
					start(
						'Garnelen in einer Schüssel mit kaltem Wasser 10 Min. antauen lassen, dann abgießen und trocken tupfen.',
						10,
						1
					),
					pfanne(
						1,
						'Öl in einer großen Pfanne oder einem Wok erhitzen. Garnelen darin 3–4 Min. braten, bis sie rundum rosa und innen nicht mehr glasig sind. Herausnehmen.',
						4,
						1
					),
					pfanne(5, 'Garnelen zurück in die Pfanne geben und 1 Min. mit erhitzen.', 1, 0.5)
				]
			}
		]),
		many(
			'top',
			'Toppings',
			'top',
			['sesam'],
			[
				{ id: 'sesam', label: 'Sesam', items: [ing(1, 'EL', 'Sesam')] },
				{
					id: 'chili',
					label: 'Chiliflocken (für Erwachsene)',
					short: 'Chiliflocken für die Erwachsenen',
					items: [fix(1, 'TL', 'Chiliflocken')]
				}
			]
		)
	],
	ohneTm:
		'Gebratener Reis braucht eine heiße Pfanne, im Mixtopf würde er matschig. Nur den Blumenkohl kannst du im Mixtopf zerkleinern.',
	kind: 'Die Kinderportion vor dem Nachwürzen abnehmen, Sojasauce ist sehr salzig. Garnelen und Hähnchen klein schneiden, Chili nur für die Großen. Mit einem Löffel lassen sich Reis und Erbsen gut selbst essen.',
	vorrat:
		'Am Vortag einfach die doppelte Menge Naturreis kochen und die Hälfte wie im Hinweis beschrieben kühlen. Das Gemüse kannst du morgens schneiden, es hält in einer Dose im Kühlschrank bis zum Abend.',
	gdm: '„Halb Reis, halb Blumenkohl“ wählen: schmeckt fast gleich und spart viele Kohlenhydrate. Abgekühlter und wieder erhitzter Reis lässt den Blutzucker außerdem etwas langsamer steigen als frisch gekochter.',
	hinweis:
		'Reis sicher lagern: Den Reis am Vortag kochen, flach ausgebreitet rasch abkühlen lassen (spätestens nach 1 Std.) und abgedeckt in den Kühlschrank stellen. Gekochten Reis höchstens 1 Tag aufbewahren und beim Braten dampfend heiß werden lassen. Weil der Reis schon einen Tag alt ist, Reste nicht noch einmal aufheben.',
	tags: ['pfanne'],
	photoAlt:
		'Große Pfanne mit gebratenem Vollkornreis, Rührei-Stückchen, grünen Erbsen, Karottenwürfeln, roter Paprika und goldbraunen Tofuwürfeln, bestreut mit Frühlingszwiebelringen und Sesam'
});
