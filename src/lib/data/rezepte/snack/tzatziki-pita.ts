import { anrichten, fix, ing, one, rezept, sauce, start, tm } from '../../helpers.ts';

const sticks = anrichten('Restliche Gurke in Sticks schneiden.', 1, { order: 40 });
const servieren = anrichten(
	'Tzatziki in ein Schälchen füllen und mit {brot} und Gurkensticks servieren.',
	0.5,
	{ order: 60 }
);

export default rezept({
	id: 'tzatziki-pita',
	name: 'Tzatziki mit Pita-Ecken',
	kategorie: 'snack',
	beschreibung:
		'Frisches Tzatziki aus Skyr, Gurke und Dill mit knusprigen Vollkorn-Pita-Ecken: viel Eiweiß und ein bisschen Urlaubsgefühl.',
	portionen: 1,
	zutaten: [
		ing(100, 'g', 'Skyr'),
		ing(150, 'g', 'Salatgurke'),
		ing(0.5, 'Zehe', 'Knoblauch'),
		ing(1, 'TL', 'Olivenöl'),
		ing(1, 'EL', 'Dill'),
		fix(1, 'Prise', 'Jodsalz'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		sauce(
			'Gurke waschen, gut die Hälfte davon grob raspeln und mit den Händen kräftig ausdrücken.',
			2
		),
		sauce(
			'Knoblauch fein reiben (pro Portion reicht eine halbe Zehe), Dill waschen und hacken. Beides mit Gurke, Skyr, Olivenöl, Salz und Pfeffer verrühren.',
			1.5
		),
		sticks,
		servieren
	],
	tmSchritte: [
		tm(
			1,
			'Knoblauch (pro Portion reicht eine halbe Zehe) in den Mixtopf geben, 3 Sek./Stufe 8 zerkleinern und mit dem Spatel nach unten schieben.',
			0,
			0.5
		),
		tm(
			2,
			'Gurke waschen, gut die Hälfte davon in Stücken dazugeben und 4 Sek./Stufe 5 zerkleinern. In ein Sieb geben und gut ausdrücken.',
			0,
			1.5
		),
		tm(
			3,
			'Gurke zurück in den Mixtopf geben, Skyr, Olivenöl, gewaschenen Dill, Salz und Pfeffer dazugeben und 10 Sek./Linkslauf/Stufe 3 verrühren.',
			0,
			0.5
		),
		sticks,
		servieren
	],
	slots: [
		one('brot', 'Dazu', 'base', 'pita', [
			{
				id: 'pita',
				label: 'Vollkorn-Pita',
				short: 'Pita-Ecken',
				items: [ing(0.5, 'Stk', 'Vollkorn-Pita')],
				steps: [
					start('Pita im Toaster 2–3 Min. knusprig rösten.', 3, 0.5),
					anrichten('Pita in kleine Ecken schneiden.', 0.5, { order: 45 })
				]
			},
			{
				id: 'knaecke',
				label: 'Vollkorn-Knäckebrot',
				short: 'Knäckebrot',
				items: [ing(2, 'Scheibe', 'Vollkorn-Knäckebrot')],
				steps: [anrichten('Knäckebrot in Stücke brechen.', 0.5, { order: 45 })]
			}
		])
	],
	kind: 'Einen Löffel Tzatziki für das Kind abnehmen, bevor der Knoblauch hineinkommt. Pita in kleine, weiche Streifen schneiden (nicht toasten), Gurke in schmale Stifte.',
	mitnehmen:
		'Tzatziki im Schraubglas, Pita und Gurkensticks in einer Dose. Bis zum Essen in den Kühlschrank.',
	vorrat:
		'Tzatziki hält im Kühlschrank 2 Tage, rühr es vor dem Essen einmal durch. Vollkorn-Pita lässt sich gut einfrieren und gefroren toasten.',
	gdm: 'Die Pita ist die Kohlenhydrat-Quelle: Im Zweifel nur ein Viertel nehmen und dafür mehr Gurkensticks dippen. Knäckebrot hat etwas weniger Kohlenhydrate.',
	tags: ['kalt', 'brot'],
	photoAlt:
		'Schälchen mit cremigem Tzatziki, beträufelt mit Olivenöl und bestreut mit Dill, daneben goldbraune Vollkorn-Pita-Ecken und Gurkensticks'
});
