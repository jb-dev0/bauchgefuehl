// Erzeugt die PNG-App-Icons aus static/icons/icon.svg: node scripts/make-icons.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const dir = new URL('../static/icons/', import.meta.url);
const icon = readFileSync(new URL('icon.svg', dir), 'utf8');
// Maskable: volle Fläche, Motiv in der sicheren Zone (80 %)
const inner = icon
	.replace(/<svg[^>]*>/, '')
	.replace('</svg>', '')
	.replace(/<rect[^>]*\/>/, '');
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#F6EFE4"/><g transform="translate(64 64) scale(0.75)">${inner}</g></svg>`;

const targets = [
	['icons/icon-192.png', icon, 192],
	['icons/icon-512.png', icon, 512],
	['icons/maskable-512.png', maskable, 512],
	['apple-touch-icon.png', maskable, 180]
];
for (const [name, svg, size] of targets) {
	const out = new URL('../static/' + name, import.meta.url);
	await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out.pathname);
	console.log('Icon erzeugt:', name);
}
