import { anrichten, fix, ing, nebenbei, rezept, start } from '../../helpers.ts';

export default rezept({
	id: 'hummus-toast',
	name: 'Hummus-Toast mit Tomate und Feta',
	kategorie: 'snack',
	beschreibung:
		'Knuspriger Vollkorntoast mit cremigem Hummus, saftiger Tomate und ein paar Feta-Krümeln: herzhaft, schnell und sättigend.',
	portionen: 1,
	zutaten: [
		ing(1, 'Scheibe', 'Vollkorntoast'),
		ing(2, 'EL', 'Hummus', 'gekauft oder selbst gemacht'),
		ing(0.5, 'Stk', 'Tomate'),
		ing(20, 'g', 'Feta'),
		fix(1, 'Prise', 'Oregano (getrocknet)'),
		fix(1, 'Prise', 'Pfeffer')
	],
	schritte: [
		start('Toast im Toaster goldbraun rösten.', 3, 0.5),
		nebenbei('Tomate waschen und in Scheiben schneiden.', 1),
		anrichten(
			'Toast mit Hummus bestreichen, mit Tomatenscheiben belegen, Feta darüberbröseln und mit Oregano und Pfeffer bestreuen.',
			1
		)
	],
	ohneTm:
		'Toaster und Messer reichen. Den Hummus kannst du nach dem Rezept „Gemüsesticks mit Hummus“ im Thermomix selbst machen.',
	kind: 'Toast in schmale Streifen schneiden und die Tomate klein würfeln. Feta ist salzig, das Kind bekommt nur ein paar Krümel.',
	mitnehmen:
		'Hummus, Tomate und Feta getrennt in kleinen Dosen mitnehmen und erst vor dem Essen aufs Brot geben, sonst weicht der Toast durch. Ungetoastet schmeckt es auch.',
	gdm: 'Bei einer Scheibe Toast bleiben und lieber mehr Tomate oder ein paar Gurkenscheiben dazu essen: Das macht satt, ohne Kohlenhydrate draufzupacken.',
	tags: ['brot'],
	photoAlt:
		'Knusprige Scheibe Vollkorntoast mit cremigem Hummus, roten Tomatenscheiben und zerbröseltem Feta, bestreut mit Oregano, auf einem kleinen Teller'
});
