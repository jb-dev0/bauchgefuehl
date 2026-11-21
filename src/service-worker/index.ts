/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
// Offline-Cache: App-Shell, gebaute Dateien und Schriften (nur Latin).
// Fotos werden erst beim Anschauen gespeichert, Anfragen an /api (PocketBase) nie –
// den Abgleich ohne Netz übernimmt die App selbst.
import { version } from '$app/env';
import { assets, immutable } from '$app/manifest';

const sw = self as unknown as ServiceWorkerGlobalScope;
const CACHE = `bauchgefuehl-${version}`;

/** Pfade aus dem Manifest sind relativ zur App-Basis; hier als absolute Pfade. */
const toPath = (p: string) => new URL(p.replace(/^\//, ''), sw.registration.scope).pathname;

const isPhoto = (p: string) => /\/_app\/immutable\/assets\/.+\.(avif|webp|jpe?g|png)$/.test(p);
const isFont = (p: string) => /\.woff2$/.test(p);
const latinFont = (p: string) => /-latin(-ext)?-[a-z]+-normal\.[^/]*\.woff2$/.test(p);

const IMMUTABLE = new Set([...immutable, ...assets].map((f) => toPath(f.path)));
const PRECACHE = [
	'/',
	...[...IMMUTABLE].filter((p) => !isPhoto(p) && (!isFont(p) || latinFont(p)))
];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	const req = event.request;
	if (req.method !== 'GET') return;
	const url = new URL(req.url);
	if (url.origin !== location.origin) return;
	if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_/')) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);
			if (IMMUTABLE.has(url.pathname)) {
				const hit = await cache.match(url.pathname);
				if (hit) return hit;
			}
			try {
				const res = await fetch(req);
				if (
					res.ok &&
					res.type === 'basic' &&
					(IMMUTABLE.has(url.pathname) || isPhoto(url.pathname))
				)
					cache.put(req, res.clone());
				return res;
			} catch (err) {
				const hit = await cache.match(req);
				if (hit) return hit;
				// Seitenaufrufe offline: die App-Shell, das Routing passiert im Browser
				if (req.mode === 'navigate') {
					const shell = await cache.match('/');
					if (shell) return shell;
				}
				throw err;
			}
		})()
	);
});
