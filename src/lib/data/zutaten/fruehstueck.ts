import type { Zutat } from '../types.ts';
import { z } from './z.ts';

/** Zusätzliche Zutaten für die Frühstücksrezepte. */
const TEIL: Record<string, Zutat> = {
	Kiwi: z('obst-gemuese', [55, 1, 0.6, 10, 2.5], {
		plural: 'Kiwis',
		g: { Stk: 75 },
		farbe: '#7BA428'
	})
};

export default TEIL;
