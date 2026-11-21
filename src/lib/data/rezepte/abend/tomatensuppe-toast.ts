import { anrichten, fix, ing, ofen, one, pfanne, rezept, start, tm, vor } from '../../helpers.ts';

const bruehe = start(
	'400 ml Gemüsebrühe erhitzen (z. B. Wasser im Wasserkocher aufkochen und Brühpulver einrühren).',
	3,
	0.5
);
const grill = vor('Backofengrill vorheizen.', 0.5, { order: 0 });
const bohnen = vor('Bohnen in einem Sieb abspülen und abtropfen lassen.', 0.5, { order: 30 });
const toast = ofen(
	'{toast} auf ein Backblech legen, mit dem Gouda bestreuen und unter dem Grill 4–5 Min. überbacken, bis der Käse schmilzt und die Ränder knusprig sind. Das geht gut, während die Suppe köchelt.',
	5,
	2.5
);
const teller = anrichten(
	'Suppe in Teller füllen, den Käse-Toast in Streifen schneiden und zum Eintunken dazu reichen.',
	1
);

export default rezept({
	id: 'tomatensuppe-toast',
	name: 'Tomatensuppe mit Bohnen und Käse-Toast',
	kategorie: 'abend',
	beschreibung:
		'Cremige Tomatensuppe, die dank pürierter weißer Bohnen richtig satt macht, dazu knuspriger Käse-Toast aus Vollkorntoast zum Eintunken.',
	portionen: 4,
	zutaten: [
		ing(1, 'Stk', 'Zwiebel'),
		ing(1, 'Stk', 'Karotte'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(1, 'EL', 'Olivenöl'),
		ing(2, 'EL', 'Tomatenmark'),
		ing(1, 'TL', 'Paprikapulver (edelsüß)'),
		ing(2, 'Dose', 'gehackte Tomaten (Dose)'),
		ing(2, 'Dose', 'weiße Bohnen (Dose)'),
		ing(400, 'ml', 'Gemüsebrühe'),
		ing(1, 'TL', 'Oregano (getrocknet)'),
		fix(2, 'Prise', 'Pfeffer'),
		ing(120, 'g', 'Gouda', 'gerieben')
	],
	schritte: [
		bruehe,
		grill,
		vor('Zwiebel und Knoblauch würfeln, Karotte schälen und in dünne Scheiben schneiden.', 3),
		bohnen,
		pfanne(
			1,
			'Olivenöl in einem großen Topf erhitzen, Zwiebel, Karotte und Knoblauch 3 Min. andünsten. Tomatenmark und Paprikapulver 1 Min. mitrösten.',
			4,
			1
		),
		pfanne(
			2,
			'Tomaten, Bohnen, heiße Brühe und Oregano dazugeben, aufkochen und zugedeckt 8 Min. köcheln lassen, bis die Karotte weich ist.',
			9,
			0.5
		),
		pfanne(3, 'Suppe mit dem Stabmixer fein pürieren und mit Pfeffer abschmecken.', 1, 1.5),
		toast,
		teller
	],
	tmSchritte: [
		bruehe,
		grill,
		bohnen,
		tm(
			1,
			'Zwiebel halbieren, Karotte schälen und in Stücke brechen. Beides mit Knoblauch in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und nach unten schieben.',
			0,
			1.5
		),
		tm(
			2,
			'Olivenöl, Tomatenmark und Paprikapulver zugeben und 3 Min./120 °C/Stufe 1 dünsten.',
			3,
			0.5
		),
		tm(
			3,
			'Tomaten, Bohnen, heiße Brühe und Oregano zugeben und 12 Min./100 °C/Stufe 1 garen.',
			12,
			0.5
		),
		tm(
			4,
			'Messbecher einsetzen, 1 Min./Stufe 5–10 schrittweise ansteigend pürieren und mit Pfeffer abschmecken.',
			1,
			0.5
		),
		toast,
		teller
	],
	slots: [
		one('toast', 'Beilage', 'base', 'toast', [
			{
				id: 'toast',
				label: 'Vollkorntoast',
				short: 'Toastscheiben',
				items: [ing(8, 'Scheibe', 'Vollkorntoast')]
			},
			{
				id: 'brot',
				label: 'Vollkornbrot',
				short: 'Brotscheiben',
				items: [ing(4, 'Scheibe', 'Vollkornbrot')]
			}
		])
	],
	kind: 'Die Suppe etwas abkühlen lassen und den Käse-Toast in schmale Streifen zum Eintunken schneiden, das lieben Kinder. Die Bohnen sind unsichtbar mitpüriert. Kinderportion vor dem Nachwürzen abnehmen.',
	mitnehmen:
		'Suppe in ein gut schließendes Glas füllen (hält 2 Tage im Kühlschrank) und 3 Min. in der Mikrowelle dampfend heiß erhitzen. Dazu eine Scheibe Vollkornbrot mit Käse einpacken.',
	vorrat: 'Die Suppe lässt sich gut verdoppeln und portionsweise einfrieren, bis 3 Monate.',
	gdm: 'Nur eine Scheibe Toast nehmen und dafür einen Klecks Skyr in die Suppe rühren. Die Bohnen machen die Suppe sättigend und lassen den Blutzucker langsam steigen.',
	tags: ['suppe', 'brot', 'vorkochen'],
	photoAlt:
		'Schale mit cremiger, leuchtend roter Tomatensuppe, daneben goldbraun überbackene Vollkorn-Käsetoasts, in Streifen geschnitten'
});
