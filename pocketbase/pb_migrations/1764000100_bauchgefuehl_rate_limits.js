/// <reference path="../pb_data/types.d.ts" />

// Bremse gegen Missbrauch (PocketBase hat sie eingebaut, standardmäßig aus).
//
// Echte Besucher-Adresse: PocketBase läuft hinter dem Coolify-Proxy und sähe sonst alle
// Besucher als eine Adresse. Genommen wird der LETZTE Eintrag in X-Forwarded-For – den hängt
// der Proxy selbst an. Voraussetzung: PocketBase ist nur über den Proxy erreichbar
// (in der docker-compose.yml „expose“, keine „ports“).
//
// Bereits von Hand gesetzte Einstellungen werden nicht überschrieben.
migrate(
	(app) => {
		const settings = app.settings();

		if (!settings.trustedProxy.headers || settings.trustedProxy.headers.length === 0) {
			settings.trustedProxy.headers = ['X-Forwarded-For'];
			settings.trustedProxy.useLeftmostIP = false;
		}

		if (!settings.rateLimits.enabled) {
			settings.rateLimits.rules = [
				// Admin-Login: 5 Versuche pro Minute
				{ label: '*:authWithPassword', audience: '', duration: 60, maxRequests: 5 },
				// neue Haushalte
				{ label: 'haushalte:create', audience: '', duration: 3600, maxRequests: 10 },
				// Haushalte suchen (Schlüssel raten ist aussichtslos, aber trotzdem bremsen)
				{ label: 'haushalte:list', audience: '', duration: 60, maxRequests: 60 },
				// Ein vorgeschlagener Zwei-Wochen-Plan sind auf einen Schlag bis zu 70 neue Einträge
				{ label: '*:create', audience: '', duration: 60, maxRequests: 1000 },
				{ label: '/api/batch', audience: '', duration: 10, maxRequests: 60 },
				{ label: '/api/', audience: '', duration: 10, maxRequests: 400 }
			];
			settings.rateLimits.enabled = true;
		}

		// Batch-Anfragen erlauben (die App gleicht viele Planzeilen auf einmal ab)
		settings.batch.enabled = true;
		settings.batch.maxRequests = 100;

		app.save(settings);
	},
	(app) => {
		const settings = app.settings();
		settings.rateLimits.enabled = false;
		app.save(settings);
	}
);
