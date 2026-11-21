import type { Picture } from '@sveltejs/enhanced-img';

/**
 * Fotos liegen in src/lib/assets/photos/ und heißen wie die Rezept-ID,
 * z. B. `teriyaki-pfanne.jpg`. Beim Build entstehen daraus AVIF/WebP in
 * mehreren Breiten. Fehlt ein Foto, zeigt die App den gezeichneten Teller.
 * Prompts für alle Fotos: BILDPROMPTS.md
 */
const modules = import.meta.glob<{ default: Picture }>(
	'./assets/photos/*.{avif,heif,jpeg,jpg,png,tiff,webp}',
	{ eager: true, query: { enhanced: true, w: '1200;800;480;240' } }
);

const photos: Record<string, Picture> = {};
for (const [path, mod] of Object.entries(modules)) {
	const id = path
		.split('/')
		.pop()!
		.replace(/\.[^.]+$/, '');
	photos[id] = mod.default;
}

export const photoFor = (id: string): Picture | undefined => photos[id];
