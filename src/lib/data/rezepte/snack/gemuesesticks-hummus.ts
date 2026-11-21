import { anrichten, ing, rezept, sauce, tm, vor } from '../../helpers.ts';

const abgiessen = vor(
	'Kichererbsen in ein Sieb abgießen, kalt abspülen und gut abtropfen lassen.',
	0.5
);
const sticks = anrichten('Gurke und Paprika waschen und in fingerdicke Sticks schneiden.', 2);
const servieren = anrichten(
	'Hummus in ein Schälchen füllen, mit ein paar Tropfen Wasser glatt streichen und mit den Gemüsesticks servieren.',
	0.5
);

export default rezept({
	id: 'gemuesesticks-hummus',
	name: 'Gemüsesticks mit Hummus',
	kategorie: 'snack',
	beschreibung:
		'Selbstgemachter Hummus aus Kichererbsen und Tahin, dazu knackige Gurken- und Paprikasticks: sättigt lange und bringt viele Ballaststoffe.',
	portionen: 1,
	zutaten: [
		ing(60, 'g', 'Kichererbsen (Dose)', 'abgetropft'),
		ing(2, 'TL', 'Tahin'),
		ing(1, 'TL', 'Zitronensaft'),
		ing(1, 'TL', 'Olivenöl'),
		ing(1, 'Prise', 'Kreuzkümmel'),
		ing(1, 'Prise', 'Jodsalz'),
		ing(0.5, 'Stk', 'Salatgurke'),
		ing(0.5, 'Stk', 'rote Paprika')
	],
	schritte: [
		abgiessen,
		sauce(
			'Kichererbsen mit Tahin, Zitronensaft, Olivenöl, Kreuzkümmel, Salz und 2 EL kaltem Wasser je Portion in einen hohen Becher geben und mit dem Pürierstab 1–2 Min. sehr cremig pürieren. Ist der Hummus zu fest, noch 1 EL Wasser dazugeben.',
			2
		),
		sticks,
		servieren
	],
	tmSchritte: [
		abgiessen,
		tm(
			1,
			'Kichererbsen, Tahin, Zitronensaft, Olivenöl, Kreuzkümmel, Salz und 2 EL kaltes Wasser je Portion in den Mixtopf geben und 30 Sek./Stufe 8 pürieren.',
			0.5,
			0.5
		),
		tm(
			2,
			'Mit dem Spatel nach unten schieben und weitere 30 Sek./Stufe 8 cremig pürieren, bei Bedarf 1 EL Wasser zugeben.',
			0.5,
			0.5
		),
		sticks,
		servieren
	],
	kind: 'Hummus als Dip mit schmalen Gurken- und Paprikastreifen. Rohe Karottensticks sind für Dreijährige zu hart, Gurke und Paprika sind die sichere Wahl.',
	mitnehmen:
		'Hummus in ein kleines Schraubglas, die Sticks in eine Dose. Bis zum Essen in den Kühlschrank.',
	vorrat:
		'Hummus lohnt sich auf Vorrat: Stell 4 Portionen ein, dann passt genau 1 Dose Kichererbsen, und im Thermomix klappt die größere Menge ohnehin besser. Wer mag, gibt 1 Zehe Knoblauch dazu. Im Kühlschrank hält er 3 Tage.',
	gdm: 'Gemüse statt Brot zum Dippen spart Kohlenhydrate. Für mehr Eiweiß 1 EL Skyr unter den Hummus rühren.',
	tags: ['kalt', 'vorkochen'],
	photoAlt:
		'Schälchen mit cremigem Hummus, beträufelt mit Olivenöl und bestäubt mit Kreuzkümmel, daneben Gurken- und rote Paprikasticks auf einem Holzbrett'
});
