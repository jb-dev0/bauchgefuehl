import { anrichten, ing, pfanne, rezept } from '../../helpers.ts';

export default rezept({
	id: 'edamame-sesam',
	name: 'Warme Edamame mit Sesam',
	kategorie: 'snack',
	beschreibung:
		'Grüne Sojabohnen, kurz gekocht und in Sesamöl und Sesam geschwenkt: viel pflanzliches Eiweiß, kaum Kohlenhydrate.',
	portionen: 1,
	zutaten: [
		ing(100, 'g', 'TK-Edamame', 'geschält'),
		ing(0.5, 'TL', 'Sesamöl (geröstet)'),
		ing(1, 'TL', 'Sojasauce (salzreduziert)'),
		ing(1, 'TL', 'Sesam'),
		ing(1, 'Prise', 'Chiliflocken', 'nach Geschmack')
	],
	schritte: [
		pfanne(
			1,
			'Wasser im Wasserkocher aufkochen und in einen kleinen Topf gießen. Die gefrorenen Edamame darin 5 Min. sprudelnd kochen, bis sie durch und ganz heiß sind.',
			6,
			0.5
		),
		pfanne(2, 'Abgießen und im heißen Topf mit Sesamöl, Sojasauce und Sesam schwenken.', 0, 0.5),
		anrichten('In eine Schale geben und für Erwachsene mit Chiliflocken bestreuen.', 0.5)
	],
	ohneTm: 'Im Topf sind die Edamame in 5 Minuten heiß, der Varoma bräuchte länger.',
	kind: 'Die Kinderportion vor Sojasauce und Chili abnehmen. Die Bohnen sind rund und fest: Für Dreijährige leicht zerdrücken oder halbieren.',
	mitnehmen:
		'Abgekühlt in einer Dose in den Kühlschrank. Am nächsten Tag kalt knabbern oder 1 Min. in der Mikrowelle dampfend heiß erhitzen.',
	vorrat:
		'Du kannst gleich die ganze Packung kochen: Rasch abgekühlt halten die Edamame 2 Tage im Kühlschrank.',
	gdm: 'Mit rund 5 g Kohlenhydraten und viel Eiweiß einer der blutzuckerfreundlichsten Snacks überhaupt, auch gut als Spätmahlzeit.',
	hinweis: 'TK-Edamame in der Schwangerschaft immer durchkochen, nicht aufgetaut roh essen.',
	tags: ['pfanne'],
	photoAlt:
		'Dampfende hellgrüne Edamame-Bohnen in einer dunklen Keramikschale, glänzend vom Sesamöl und bestreut mit hellem Sesam und ein paar Chiliflocken'
});
