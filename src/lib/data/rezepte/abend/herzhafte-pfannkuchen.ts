import {
	anrichten,
	fix,
	ing,
	nebenbei,
	one,
	pfanne,
	rezept,
	start,
	tm,
	vor
} from '../../helpers.ts';

const backen = pfanne(
	2,
	'Eine große beschichtete Pfanne mit etwas Rapsöl auspinseln, je eine kleine Kelle Teig hineingeben und durch Schwenken dünn verteilen. Bei mittlerer Hitze 1 Min. backen, wenden und 1 Min. weiterbacken, bis der Teig ganz durchgebacken ist. So nacheinander 8 Pfannkuchen backen und auf einem Teller zugedeckt warm halten.',
	16,
	6
);
const fuellen = anrichten(
	'Pfannkuchen mit der Spinat-Feta-Füllung bestreichen, aufrollen und schräg halbieren.',
	2
);

/** Eiweiß-Extra: vor den Pfannkuchen in derselben Pfanne braten. */
const extra = (
	id: string,
	label: string,
	name: string,
	menge: number,
	text: string,
	cook: number
) => ({
	id,
	label,
	items: [ing(menge, 'g', name)],
	steps: [vor(`${label} in kleine Würfel schneiden.`, 2, { order: 20 }), pfanne(1, text, cook, 1)]
});

export default rezept({
	id: 'herzhafte-pfannkuchen',
	name: 'Herzhafte Vollkorn-Pfannkuchen mit Spinat-Feta-Füllung',
	kategorie: 'abend',
	beschreibung:
		'Dünne Vollkorn-Pfannkuchen mit Leinsamen, gefüllt mit cremigem Spinat und Feta – Familienessen zum Aufrollen.',
	portionen: 4,
	zutaten: [
		ing(150, 'g', 'Vollkornmehl', 'z. B. Dinkel'),
		ing(2, 'EL', 'Leinsamen (geschrotet)'),
		ing(4, 'Stk', 'Ei'),
		ing(350, 'ml', 'Milch'),
		fix(1, 'Prise', 'Jodsalz'),
		ing(2, 'EL', 'Rapsöl', 'zum Ausbacken'),
		ing(450, 'g', 'TK-Blattspinat'),
		ing(1, 'Zehe', 'Knoblauch'),
		ing(150, 'g', 'Feta'),
		ing(100, 'g', 'Frischkäse (leicht)'),
		fix(2, 'Prise', 'Pfeffer')
	],
	schritte: [
		start(
			'Spinat gefroren mit 3 EL Wasser und gepresstem Knoblauch in einen Topf geben und zugedeckt bei mittlerer Hitze 8–10 Min. auftauen und erhitzen, gelegentlich umrühren.',
			10,
			1.5
		),
		vor(
			'Mehl, Leinsamen und Salz in einer Schüssel mischen. Eier und Milch dazugeben und mit dem Schneebesen zu einem glatten Teig verrühren.',
			2,
			{ order: 10 }
		),
		backen,
		nebenbei(
			'Überschüssige Flüssigkeit vom Spinat abgießen. Feta hineinbröseln, Frischkäse unterrühren und mit Pfeffer würzen.',
			2
		),
		fuellen
	],
	tmSchritte: [
		tm(
			1,
			'Mehl, Leinsamen, Salz, Eier und Milch in den Mixtopf geben, 20 Sek./Stufe 5 zu einem glatten Teig mixen und in eine Schüssel umfüllen. Mixtopf kurz ausspülen.',
			0,
			1.5
		),
		tm(2, 'Knoblauch in den Mixtopf geben und 3 Sek./Stufe 7 zerkleinern.', 0, 0.5),
		tm(
			3,
			'Spinat gefroren und 3 EL Wasser zugeben und 10 Min./100 °C/Linkslauf/Stufe 1 garen. Überschüssige Flüssigkeit abgießen.',
			10,
			0.5
		),
		tm(
			4,
			'Feta und Frischkäse zugeben, 10 Sek./Linkslauf/Stufe 3 verrühren und mit Pfeffer würzen.',
			0,
			0.5
		),
		backen,
		fuellen
	],
	slots: [
		one('prot', 'Eiweiß', 'main', 'veggie', [
			{ id: 'veggie', label: 'Spinat & Feta', items: [] },
			extra(
				'haehnchen',
				'Hähnchen',
				'Hähnchenbrustfilet',
				300,
				'1 TL Rapsöl in der Pfanne erhitzen, Hähnchenwürfel 5 Min. rundum braten, bis sie innen nicht mehr rosa sind. Herausnehmen und unter den Spinat mischen.',
				5
			),
			extra(
				'tofu',
				'Räuchertofu',
				'Räuchertofu',
				200,
				'1 TL Rapsöl in der Pfanne erhitzen, Tofuwürfel 4 Min. knusprig braten. Herausnehmen und unter den Spinat mischen.',
				4
			)
		])
	],
	kind: 'Den Pfannkuchen für das Kind nur dünn mit Füllung bestreichen (Feta ist salzig), aufrollen und in Schnecken oder Streifen schneiden – perfektes Fingerfood. Hähnchen oder Tofu sehr klein würfeln.',
	mitnehmen:
		'Gefüllte Pfannkuchen in einer Box rasch abkühlen, kalt stellen und innerhalb von 1–2 Tagen essen. In der Mikrowelle 1–2 Min. dampfend heiß erhitzen.',
	vorrat:
		'Ungefüllte Pfannkuchen halten mit Backpapier dazwischen 2 Tage im Kühlschrank und lassen sich gut einfrieren. Die Füllung hält ebenfalls 2 Tage.',
	gdm: 'Dank Eiern, Leinsamen und Feta sind die Pfannkuchen schon sehr blutzuckerfreundlich. Für noch mehr Eiweiß Hähnchen oder Räuchertofu wählen und einen großen Rohkostsalat dazu essen.',
	tags: ['pfanne'],
	photoAlt:
		'Aufgerollte, goldbraune Vollkorn-Pfannkuchen, schräg angeschnitten, mit sattgrüner Spinat-Feta-Füllung auf einem Teller'
});
