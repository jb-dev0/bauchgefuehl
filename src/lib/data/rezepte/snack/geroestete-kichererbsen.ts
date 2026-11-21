import { anrichten, ing, ofen, rezept, vor } from '../../helpers.ts';

export default rezept({
	id: 'geroestete-kichererbsen',
	name: 'Geröstete Kichererbsen',
	kategorie: 'snack',
	beschreibung:
		'Knusprige Kichererbsen mit Paprika und Kreuzkümmel aus dem Ofen: der herzhafte Knabber-Snack mit Eiweiß und vielen Ballaststoffen.',
	portionen: 1,
	zutaten: [
		ing(0.5, 'Dose', 'Kichererbsen (Dose)'),
		ing(1, 'TL', 'Olivenöl'),
		ing(1, 'Prise', 'Paprikapulver (edelsüß)'),
		ing(1, 'Prise', 'Kreuzkümmel'),
		ing(1, 'Prise', 'Jodsalz')
	],
	schritte: [
		vor('Backofen auf 220 °C Ober-/Unterhitze (200 °C Umluft) vorheizen.', 0.5, { order: 0 }),
		vor(
			'Kichererbsen in ein Sieb abgießen, abspülen und mit Küchenpapier sehr gründlich trocken tupfen, lose Häutchen dabei entfernen.',
			2
		),
		vor(
			'Mit Olivenöl, Paprikapulver, Kreuzkümmel und Salz mischen und auf einem Backblech mit Backpapier verteilen.',
			1,
			{ order: 60 }
		),
		ofen(
			'Im Ofen 25–30 Min. rösten, bis sie goldbraun und knusprig sind. Nach der Hälfte einmal am Blech rütteln.',
			28,
			0.5
		),
		anrichten('Auf dem Blech abkühlen lassen, dabei werden sie noch knuspriger.', 0.5)
	],
	ohneTm: 'Knusprig werden Kichererbsen nur im Ofen.',
	kind: 'Ganze geröstete Kichererbsen sind hart und rund, für Dreijährige zu riskant. Nimm vor dem Rösten ein paar Kichererbsen ab und gib sie dem Kind weich und zerdrückt, oder lass sie für das Kind ganz weg.',
	mitnehmen:
		'In einem kleinen Glas oder einer Dose: Der perfekte Snack für die Handtasche, ganz ohne Kühlung.',
	vorrat:
		'Stell 4 Portionen ein (2 Dosen) und röste ein ganzes Blech. Vollständig abgekühlt halten sie in einem Glas 3 Tage. Mit der Zeit werden sie weicher: 5 Min. bei 200 °C machen sie wieder knusprig.',
	gdm: 'Kichererbsen liefern Eiweiß und viele Ballaststoffe. Mit ein paar Gouda-Würfeln oder einem Naturjoghurt dazu wird ein besonders sättigender Snack daraus.',
	tags: ['ofen', 'vorkochen'],
	photoAlt:
		'Knusprig geröstete, paprikarote Kichererbsen in einer kleinen Keramikschale, daneben ein Backblech mit Backpapier und ein paar verstreuten Kichererbsen'
});
