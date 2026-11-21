import { anrichten, fix, ing, rezept } from '../../helpers.ts';

export default rezept({
	id: 'apfel-erdnussmus',
	name: 'Apfelschnitze mit Erdnussmus',
	kategorie: 'snack',
	beschreibung:
		'Knackiger Apfel zum Dippen in Erdnussmus mit Zimt: Eiweiß und Fett bremsen den Fruchtzucker, und es schmeckt wie Nachtisch.',
	portionen: 1,
	zutaten: [
		ing(120, 'g', 'Apfel', 'klein'),
		ing(2, 'EL', 'Erdnussmus', '100 % Erdnüsse'),
		fix(1, 'Prise', 'Zimt (Ceylon)')
	],
	schritte: [
		anrichten('Apfel waschen, vierteln, entkernen und in dünne Schnitze schneiden.', 1.5),
		anrichten(
			'Erdnussmus in ein Schälchen geben, glatt rühren (ist es sehr fest, 1 TL warmes Wasser unterrühren) und mit Zimt bestäuben. Die Apfelschnitze zum Dippen dazulegen.',
			1
		)
	],
	ohneTm: 'Messer und Löffel reichen völlig.',
	kind: 'Apfel für Dreijährige in sehr dünne Schnitze schneiden oder grob raspeln. Erdnussmus nur hauchdünn aufstreichen, nie als dicken Klecks vom Löffel geben: Der klebt am Gaumen.',
	mitnehmen:
		'Apfelschnitze mit ein paar Tropfen Zitronensaft beträufeln, damit sie hell bleiben, und in einer Dose mitnehmen. Das Erdnussmus kommt in ein kleines Schraubglas.',
	gdm: 'Das Erdnussmus ist hier der Blutzucker-Bremser, also nicht daran sparen. Wenn du mehr Hunger hast, iss lieber ein paar Gouda-Würfel dazu statt eines zweiten Apfels.',
	tags: ['kalt', 'suess'],
	photoAlt:
		'Rote Apfelschnitze fächerförmig auf einem kleinen Holzbrett, daneben ein Schälchen cremiges Erdnussmus mit Zimt bestäubt'
});
