import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

/**
 * Die App ist eine statische Single-Page-App. Im Container liefert PocketBase sie aus
 * (build/ → pb_public) und stellt daneben die Datenbank-API unter /api bereit.
 */
export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Unbekannte Pfade bekommen index.html, das Routing passiert im Browser.
			adapter: adapter({ fallback: 'index.html', strict: false }),
			// Absolute Pfade, damit die offline gespeicherte App-Shell unter jeder Adresse lädt.
			paths: { relative: false }
		})
	],
	server: {
		// Im Dev-Modus PocketBase unter derselben Adresse erreichbar machen.
		// '/_/' mit Schrägstrich, sonst landet auch '/_app/…' bei PocketBase.
		proxy: {
			'/api': { target: 'http://127.0.0.1:8090', ws: false },
			'/_/': 'http://127.0.0.1:8090'
		}
	},
	test: {
		expect: { requireAssertions: true },
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
