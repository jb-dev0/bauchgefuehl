import { zutat } from '../data/zutaten/index.ts';
import { grams } from './rezept.ts';
import type { GerichtItem } from './gericht.ts';

/**
 * Gezeichnete Ersatzgrafik, solange es kein Foto gibt: ein Teller von oben mit
 * farbigen Häufchen der prägenden Zutaten (nach Menge), Lage aus der Rezept-ID.
 */

export interface Blob {
	x: number;
	y: number;
	r: number;
	color: string;
	rot: number;
}

function seeded(text: string) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
	return () => {
		h = Math.imul(h ^ (h >>> 15), 2246822507);
		h = Math.imul(h ^ (h >>> 13), 3266489909);
		return ((h ^= h >>> 16) >>> 0) / 4294967296;
	};
}

/** Bis zu 6 Farben der Zutaten mit dem größten Gewicht. */
export function farben(items: GerichtItem[]): string[] {
	const map = new Map<string, number>();
	for (const it of items) {
		const z = zutat(it.name);
		if (!z?.farbe || it.amount === null || !it.unit) continue;
		const g = grams({ name: it.name, unit: it.unit, amount: it.amount }) ?? 0;
		map.set(z.farbe, (map.get(z.farbe) ?? 0) + g);
	}
	return [...map.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 6)
		.map(([c]) => c);
}

export function blobs(id: string, colors: string[]): Blob[] {
	const rnd = seeded(id);
	const list = colors.length ? colors : ['#C9A46A', '#6F8B69', '#B85C38'];
	const out: Blob[] = [];
	const n = list.length;
	const start = rnd() * Math.PI * 2;
	list.forEach((color, i) => {
		const a = start + (i / n) * Math.PI * 2 + (rnd() - 0.5) * 0.5;
		const d = i === 0 ? 0 : 17 + rnd() * 7;
		out.push({
			x: 50 + (i === 0 ? 0 : Math.cos(a) * d),
			y: 50 + (i === 0 ? 0 : Math.sin(a) * d),
			r: i === 0 ? 17 : 10 + rnd() * 4,
			color,
			rot: rnd() * 360
		});
	});
	return out;
}

/** Weiche, unregelmäßige Form um (0,0) mit Radius r. */
export function blobPath(r: number, rot: number): string {
	const pts = 7;
	const rnd = seeded(String(r) + rot);
	const p: [number, number][] = [];
	for (let i = 0; i < pts; i++) {
		const a = (i / pts) * Math.PI * 2 + (rot * Math.PI) / 180;
		const rr = r * (0.82 + rnd() * 0.3);
		p.push([Math.cos(a) * rr, Math.sin(a) * rr]);
	}
	let d = '';
	for (let i = 0; i < pts; i++) {
		const [x0, y0] = p[i];
		const [x1, y1] = p[(i + 1) % pts];
		const mx = (x0 + x1) / 2;
		const my = (y0 + y1) / 2;
		d += i === 0 ? `M${mx.toFixed(1)},${my.toFixed(1)}` : '';
		const [x2, y2] = p[(i + 2) % pts];
		d += ` Q${x1.toFixed(1)},${y1.toFixed(1)} ${((x1 + x2) / 2).toFixed(1)},${((y1 + y2) / 2).toFixed(1)}`;
	}
	return d + 'Z';
}

/** Teller als SVG-String mit festen Farben (für das PDF). */
export function plateSvg(id: string, colors: string[]): string {
	const b = blobs(id, colors)
		.map(
			(x) =>
				`<path transform="translate(${x.x.toFixed(1)} ${x.y.toFixed(1)})" d="${blobPath(x.r, x.rot)}" fill="${x.color}"/>`
		)
		.join('');
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#EFE4D3"/><circle cx="50" cy="50" r="41" fill="#FFFAF3" stroke="#E3D4C0" stroke-width="1"/>${b}</svg>`;
}
