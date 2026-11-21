/// <reference path="../pb_data/types.d.ts" />

// Bauchgefühl – Datenmodell ohne Login.
//
// Ein Haushalt hat einen langen, zufälligen Schlüssel. Wer ihn kennt (er steckt im
// Teilen-Link), darf die Daten des Haushalts lesen und ändern. Die App schickt ihn bei
// jeder Anfrage im Header „X-Haushalt“ mit. Ohne passenden Schlüssel sieht man nichts –
// auch keine Liste der Haushalte.

migrate(
	(app) => {
		const KEY = '@request.headers.x_haushalt';
		const timestamps = [
			{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
			{ name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
		];

		// --------------------------------------------------------------- haushalte
		const own = `${KEY} != "" && schluessel = ${KEY}`;
		const haushalte = new Collection({
			type: 'base',
			name: 'haushalte',
			listRule: own,
			viewRule: own,
			// Jeder darf einen neuen Haushalt anlegen (gebremst über die Rate-Limits)
			createRule: '',
			updateRule: `${own} && @request.body.schluessel:isset = false`,
			deleteRule: null,
			fields: [
				{
					name: 'schluessel',
					type: 'text',
					required: true,
					min: 24,
					max: 64,
					pattern: '^[a-z0-9]+$'
				},
				{ name: 'name', type: 'text', max: 80 },
				{ name: 'einstellungen', type: 'json', maxSize: 20000 },
				{ name: 'geaendert', type: 'number' },
				...timestamps
			],
			indexes: ['CREATE UNIQUE INDEX idx_haushalte_schluessel ON haushalte (schluessel)']
		});
		app.save(haushalte);

		const haushalt = {
			name: 'haushalt',
			type: 'relation',
			required: true,
			collectionId: haushalte.id,
			maxSelect: 1,
			cascadeDelete: true
		};
		const im = `${KEY} != "" && haushalt.schluessel = ${KEY}`;
		const rules = {
			listRule: im,
			viewRule: im,
			createRule: im,
			updateRule: `${im} && (@request.body.haushalt:isset = false || @request.body.haushalt = haushalt)`,
			deleteRule: im
		};

		// -------------------------------------------------------------------- plan
		// Eine Zeile pro Tag und Mahlzeit.
		const plan = new Collection({
			type: 'base',
			name: 'plan',
			...rules,
			fields: [
				haushalt,
				{ name: 'datum', type: 'text', required: true, pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
				{
					name: 'mahlzeit',
					type: 'select',
					required: true,
					maxSelect: 1,
					values: ['fruehstueck', 'snack1', 'mittag', 'snack2', 'abend']
				},
				{ name: 'rezept', type: 'text', max: 80 },
				{ name: 'auswahl', type: 'json', maxSize: 4000 },
				{ name: 'reste', type: 'bool' },
				{ name: 'portionen', type: 'number' },
				{ name: 'geaendert', type: 'number' },
				...timestamps
			],
			indexes: [
				'CREATE UNIQUE INDEX idx_plan_tag ON plan (haushalt, datum, mahlzeit)',
				'CREATE INDEX idx_plan_datum ON plan (haushalt, datum)'
			]
		});
		app.save(plan);

		// ----------------------------------------------------------------- einkauf
		// Abgehakte Posten und eigene Ergänzungen einer Einkaufsliste.
		const einkauf = new Collection({
			type: 'base',
			name: 'einkauf',
			...rules,
			fields: [
				haushalt,
				{ name: 'liste', type: 'text', required: true, max: 40 },
				{ name: 'posten', type: 'text', required: true, max: 200 },
				{ name: 'menge', type: 'text', max: 80 },
				{ name: 'extra', type: 'bool' },
				{ name: 'erledigt', type: 'bool' },
				{ name: 'geloescht', type: 'bool' },
				{ name: 'geaendert', type: 'number' },
				...timestamps
			],
			indexes: ['CREATE UNIQUE INDEX idx_einkauf_posten ON einkauf (haushalt, liste, posten)']
		});
		app.save(einkauf);

		// ----------------------------------------------------------------- rezepte
		// Eigene Rezepte. Der Inhalt steckt als JSON in „daten“, das Foto ist eine Datei.
		const rezepte = new Collection({
			type: 'base',
			name: 'rezepte',
			...rules,
			fields: [
				haushalt,
				{ name: 'daten', type: 'json', maxSize: 200000 },
				{
					name: 'foto',
					type: 'file',
					maxSelect: 1,
					maxSize: 8 * 1024 * 1024,
					mimeTypes: [
						'image/jpeg',
						'image/png',
						'image/webp',
						'image/avif',
						'image/heic',
						'image/heif'
					],
					thumbs: ['480x480', '160x160']
				},
				{ name: 'geloescht', type: 'bool' },
				{ name: 'geaendert', type: 'number' },
				...timestamps
			],
			indexes: ['CREATE INDEX idx_rezepte_haushalt ON rezepte (haushalt)']
		});
		app.save(rezepte);
	},
	(app) => {
		for (const name of ['rezepte', 'einkauf', 'plan', 'haushalte']) {
			try {
				app.delete(app.findCollectionByNameOrId(name));
			} catch {
				// schon weg
			}
		}
	}
);
