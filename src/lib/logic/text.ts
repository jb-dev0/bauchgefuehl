import type { Art, Tag } from '../data/types.ts';
import type { IconName } from '../components/Icon.svelte';

export const ART: Record<Art, { label: string; icon: IconName }> = {
	veggie: { label: 'Veggie', icon: 'veggie' },
	fisch: { label: 'Fisch', icon: 'fish' },
	gefluegel: { label: 'Geflügel', icon: 'chicken' },
	rind: { label: 'Rind', icon: 'chicken' }
};

export const TAGS: Record<Tag, string> = {
	pfanne: 'Pfanne',
	ofen: 'Ofen',
	suppe: 'Suppe & Eintopf',
	pasta: 'Pasta',
	bowl: 'Bowl',
	salat: 'Salat',
	wrap: 'Wrap',
	brot: 'Brot',
	suess: 'Süß',
	vorkochen: 'Vorkochen',
	kalt: 'Kalt'
};

/** „20 Min.“ bzw. „15 Min. + 25 Min. Ofen“ */
export const zeitText = (r: { minutes: number; ofen: number }) =>
	`${r.minutes} Min.` + (r.ofen ? ` + ${r.ofen} Min. Ofen` : '');
