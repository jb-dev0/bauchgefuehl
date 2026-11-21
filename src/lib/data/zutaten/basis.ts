import type { Zutat } from '../types.ts';
import { z } from './z.ts';

/**
 * Grundkatalog. Nährwerte pro 100 g (roh bzw. wie gekauft, Dosenware abgetropft),
 * gerundete Werte aus gängigen Nährwerttabellen – grobe Schätzungen.
 * Reihenfolge n: [kcal, Protein, Fett, Kohlenhydrate, Ballaststoffe].
 */
const KATALOG: Record<string, Zutat> = {
	/* ---------- Obst & Gemüse ---------- */
	Zwiebel: z('obst-gemuese', [40, 1.2, 0.2, 7.6, 1.8], { plural: 'Zwiebeln', g: { Stk: 80 } }),
	'rote Zwiebel': z('obst-gemuese', [40, 1.2, 0.1, 7.6, 1.8], {
		plural: 'rote Zwiebeln',
		g: { Stk: 80 },
		farbe: '#8E3B5E'
	}),
	Knoblauch: z('obst-gemuese', [140, 6, 0.1, 28, 2], { g: { Zehe: 4, Stk: 40 } }),
	Ingwer: z('obst-gemuese', [80, 1.8, 0.8, 15, 2], { g: { TL: 5, EL: 12 } }),
	Karotte: z('obst-gemuese', [36, 1, 0.2, 6.6, 3.6], {
		plural: 'Karotten',
		g: { Stk: 100 },
		farbe: '#E8833A'
	}),
	'rote Paprika': z('obst-gemuese', [37, 1, 0.4, 6.4, 3.6], {
		plural: 'rote Paprika',
		g: { Stk: 160 },
		m: { folat: 45 },
		farbe: '#D9412E'
	}),
	'gelbe Paprika': z('obst-gemuese', [37, 1, 0.3, 6.4, 3.6], {
		plural: 'gelbe Paprika',
		g: { Stk: 160 },
		m: { folat: 30 },
		farbe: '#F2C230'
	}),
	Zucchini: z('obst-gemuese', [19, 1.6, 0.4, 2.2, 1.1], {
		plural: 'Zucchini',
		g: { Stk: 250 },
		farbe: '#6E9E4A'
	}),
	Aubergine: z('obst-gemuese', [17, 1.2, 0.2, 2.5, 2.8], {
		plural: 'Auberginen',
		g: { Stk: 300 },
		farbe: '#5B3A5E'
	}),
	Brokkoli: z('obst-gemuese', [35, 3.8, 0.2, 2.7, 3], {
		m: { folat: 110, calcium: 58, eisen: 0.8 },
		farbe: '#3F7D3A'
	}),
	Blumenkohl: z('obst-gemuese', [23, 2.5, 0.3, 2.3, 2.9], { m: { folat: 88 }, farbe: '#EDE6D2' }),
	Babyspinat: z('obst-gemuese', [21, 2.5, 0.4, 0.6, 2.6], {
		g: { Hv: 30 },
		m: { folat: 145, eisen: 3.4, calcium: 120 },
		farbe: '#2F6B32'
	}),
	Tomate: z('obst-gemuese', [18, 1, 0.2, 2.6, 1.2], {
		plural: 'Tomaten',
		g: { Stk: 100 },
		farbe: '#E04B2F'
	}),
	Kirschtomaten: z('obst-gemuese', [20, 1, 0.2, 3, 1.3], { g: { Hv: 80 }, farbe: '#E04B2F' }),
	Salatgurke: z('obst-gemuese', [12, 0.6, 0.2, 1.8, 0.5], {
		plural: 'Salatgurken',
		g: { Stk: 400 },
		farbe: '#8DBF6A'
	}),
	Avocado: z('obst-gemuese', [160, 2, 15, 2, 6.3], {
		plural: 'Avocados',
		g: { Stk: 150 },
		m: { folat: 80 },
		farbe: '#9BB84E'
	}),
	Kartoffeln: z('obst-gemuese', [72, 2, 0.1, 15, 1.5], { g: { Stk: 100 }, farbe: '#E2C27A' }),
	Süßkartoffel: z('obst-gemuese', [86, 1.6, 0.1, 18, 3], {
		plural: 'Süßkartoffeln',
		g: { Stk: 300 },
		farbe: '#E07A3A'
	}),
	'Hokkaido-Kürbis': z('obst-gemuese', [63, 1.7, 0.6, 12.6, 2.5], {
		g: { Stk: 1000 },
		farbe: '#E8892B'
	}),
	Lauch: z('obst-gemuese', [25, 2, 0.3, 3.3, 2.3], { g: { Stk: 200 }, m: { folat: 60 } }),
	Frühlingszwiebel: z('obst-gemuese', [30, 1.8, 0.3, 4.7, 2.6], {
		plural: 'Frühlingszwiebeln',
		g: { Stk: 15 },
		farbe: '#7FB24A'
	}),
	Champignons: z('obst-gemuese', [22, 3.1, 0.3, 0.6, 2], { farbe: '#C9B79C' }),
	Rucola: z('obst-gemuese', [25, 2.6, 0.7, 2.1, 1.6], {
		g: { Hv: 20 },
		m: { folat: 97, calcium: 160 },
		farbe: '#4E7A35'
	}),
	Feldsalat: z('obst-gemuese', [14, 1.8, 0.4, 0.7, 1.5], {
		g: { Hv: 20 },
		m: { folat: 145, eisen: 2 }
	}),
	Romanasalat: z('obst-gemuese', [16, 1.2, 0.3, 1.7, 1.3], {
		g: { Stk: 300 },
		m: { folat: 136 }
	}),
	Radieschen: z('obst-gemuese', [15, 1, 0.1, 2.1, 1.6], { g: { Stk: 15, Bund: 150 } }),
	Apfel: z('obst-gemuese', [54, 0.3, 0.2, 12, 2.4], {
		plural: 'Äpfel',
		g: { Stk: 150 },
		farbe: '#C5463A'
	}),
	Birne: z('obst-gemuese', [55, 0.5, 0.3, 12.4, 3.3], { plural: 'Birnen', g: { Stk: 160 } }),
	Banane: z('obst-gemuese', [93, 1.2, 0.2, 20, 2], {
		plural: 'Bananen',
		g: { Stk: 120 },
		farbe: '#F3D36B'
	}),
	Orange: z('obst-gemuese', [47, 1, 0.2, 9, 2.2], {
		plural: 'Orangen',
		g: { Stk: 180 },
		m: { folat: 30 }
	}),
	Heidelbeeren: z('obst-gemuese', [42, 0.6, 0.6, 7.4, 4.9], { g: { Hv: 60 }, farbe: '#3E4A8C' }),
	Himbeeren: z('obst-gemuese', [36, 1.3, 0.3, 4.8, 4.7], { g: { Hv: 60 }, farbe: '#C8324E' }),
	Erdbeeren: z('obst-gemuese', [32, 0.8, 0.4, 5.5, 2], {
		g: { Hv: 80 },
		m: { folat: 65 },
		farbe: '#D9333F'
	}),
	Granatapfelkerne: z('obst-gemuese', [80, 1.7, 1.2, 16, 4], { g: { EL: 12 }, farbe: '#B3203A' }),
	Zitrone: z('obst-gemuese', [36, 0.7, 0.6, 3.2, 0.5], { plural: 'Zitronen', g: { Stk: 100 } }),
	Limette: z('obst-gemuese', [35, 0.5, 0.2, 1.9, 0.3], { plural: 'Limetten', g: { Stk: 60 } }),

	/* ---------- Kräuter ---------- */
	Petersilie: z('kraeuter', [50, 4.4, 0.4, 7.4, 4.3], {
		g: { Bund: 30, Hv: 10, EL: 4 },
		m: { folat: 150, eisen: 5.5, calcium: 145 },
		farbe: '#3D7A34'
	}),
	Schnittlauch: z('kraeuter', [27, 3.6, 0.7, 1.6, 6], { g: { Bund: 25, EL: 4 } }),
	Basilikum: z('kraeuter', [40, 3.1, 0.8, 5, 3], { g: { Bund: 20, Hv: 10 } }),
	Dill: z('kraeuter', [43, 3.5, 1, 6, 2], { g: { Bund: 20, EL: 3 } }),
	Minze: z('kraeuter', [44, 3.8, 0.7, 5, 8], { g: { Bund: 20, EL: 3 } }),

	/* ---------- Brot ---------- */
	Vollkornbrot: z('brot', [215, 7, 1.2, 40, 8], { g: { Scheibe: 50 }, farbe: '#8A5A35' }),
	Vollkorntoast: z('brot', [240, 9, 4, 40, 6], { g: { Scheibe: 30 }, farbe: '#C8935A' }),
	'Vollkorn-Knäckebrot': z('brot', [340, 9.5, 1.5, 63, 16], { g: { Scheibe: 10, Stk: 10 } }),
	'Vollkorn-Tortilla': z('brot', [290, 9, 7, 46, 7], {
		plural: 'Vollkorn-Tortillas',
		g: { Stk: 60 },
		farbe: '#D9B27A'
	}),
	'Vollkorn-Pita': z('brot', [260, 10, 2, 48, 7], {
		plural: 'Vollkorn-Pitas',
		g: { Stk: 70 }
	}),
	Vollkornbrötchen: z('brot', [240, 9, 2.5, 42, 7], {
		plural: 'Vollkornbrötchen',
		g: { Stk: 70 }
	}),

	/* ---------- Kühlregal ---------- */
	Milch: z('kuehl', [47, 3.4, 1.5, 4.8, 0], { m: { calcium: 120, jod: 10 } }),
	Naturjoghurt: z('kuehl', [62, 3.5, 3.5, 4.5, 0], {
		g: { EL: 15 },
		m: { calcium: 120, jod: 10 },
		farbe: '#F7F4EC'
	}),
	Skyr: z('kuehl', [63, 11, 0.2, 4, 0], { g: { EL: 15 }, m: { calcium: 150, jod: 10 } }),
	Magerquark: z('kuehl', [67, 12, 0.3, 4, 0], { g: { EL: 15 }, m: { calcium: 90, jod: 5 } }),
	Hüttenkäse: z('kuehl', [98, 12, 4.3, 2.6, 0], { g: { EL: 15 }, m: { calcium: 80 } }),
	'Frischkäse (leicht)': z('kuehl', [118, 8.6, 6.5, 4.5, 0], { g: { EL: 15, TL: 6 } }),
	Feta: z('kuehl', [264, 14, 21, 0.5, 0], { m: { calcium: 400 }, farbe: '#F3EFE2' }),
	Halloumi: z('kuehl', [320, 21, 25, 2, 0], { m: { calcium: 700 }, farbe: '#E9D8A6' }),
	Mozzarella: z('kuehl', [250, 18, 19, 1, 0], { m: { calcium: 400 }, farbe: '#F5F1E6' }),
	Gouda: z('kuehl', [356, 25, 27, 0, 0], { g: { Scheibe: 20 }, m: { calcium: 800, jod: 30 } }),
	Bergkäse: z('kuehl', [400, 29, 32, 0, 0], { g: { Scheibe: 20 }, m: { calcium: 1000 } }),
	Parmesan: z('kuehl', [392, 36, 26, 0, 0], { g: { EL: 6 }, m: { calcium: 1180 } }),
	Ricotta: z('kuehl', [140, 9, 10, 3, 0], { g: { EL: 15 }, m: { calcium: 200 } }),
	'Kochsahne (15 %)': z('kuehl', [160, 3, 15, 4, 0], { g: { EL: 15 } }),
	Butter: z('kuehl', [741, 0.7, 83, 0.6, 0], { g: { EL: 12, TL: 5 } }),
	Ei: z('kuehl', [137, 12, 9.3, 0.7, 0], {
		plural: 'Eier',
		g: { Stk: 60 },
		m: { jod: 10, folat: 65, eisen: 1.8 },
		farbe: '#F6C744'
	}),
	'Tofu natur': z('kuehl', [119, 13, 7, 1.5, 0.3], {
		m: { calcium: 350, eisen: 2.5 },
		farbe: '#E8DFC8'
	}),
	Räuchertofu: z('kuehl', [168, 16.5, 10, 2, 1], { m: { calcium: 250, eisen: 2.5 } }),
	Hummus: z('kuehl', [280, 7, 22, 11, 5], { g: { EL: 20 }, farbe: '#D9BE8C' }),
	'Falafel (fertig)': z('kuehl', [250, 8, 13, 22, 7], { g: { Stk: 20 }, farbe: '#9C6B3A' }),
	'Pesto (Basilikum)': z('kuehl', [450, 5, 45, 5, 2], { g: { EL: 15, TL: 5 } }),

	/* ---------- Fleisch & Fisch ---------- */
	Hähnchenbrustfilet: z('fleisch-fisch', [105, 23, 1.2, 0, 0], {
		m: { eisen: 0.7 },
		art: 'gefluegel',
		farbe: '#D9A066'
	}),
	Hähnchenhack: z('fleisch-fisch', [143, 17.4, 8, 0, 0], {
		m: { eisen: 0.8 },
		art: 'gefluegel',
		farbe: '#C99268'
	}),
	Putenbrust: z('fleisch-fisch', [105, 24, 1, 0, 0], {
		m: { eisen: 0.8 },
		art: 'gefluegel',
		farbe: '#D9A88A'
	}),
	Rinderhack: z('fleisch-fisch', [180, 21, 10, 0, 0], {
		m: { eisen: 2.3 },
		art: 'rind',
		farbe: '#8E4A35'
	}),
	Rinderhüftsteak: z('fleisch-fisch', [120, 22, 3.5, 0, 0], {
		m: { eisen: 2.6 },
		art: 'rind',
		farbe: '#8E4A35'
	}),
	Lachsfilet: z('fleisch-fisch', [200, 20, 13, 0, 0], {
		m: { omega3: 2200, jod: 30 },
		art: 'fisch',
		farbe: '#F08C6B'
	}),
	Seelachsfilet: z('fleisch-fisch', [80, 18, 0.9, 0, 0], {
		m: { jod: 200, omega3: 400 },
		art: 'fisch',
		farbe: '#EFE7DA'
	}),
	Kabeljaufilet: z('fleisch-fisch', [80, 18, 0.6, 0, 0], {
		m: { jod: 170, omega3: 250 },
		art: 'fisch',
		farbe: '#F2ECE0'
	}),

	/* ---------- Tiefkühl ---------- */
	'TK-Erbsen': z('tk', [80, 5.4, 0.4, 10, 5], { m: { folat: 60 }, farbe: '#6BAA3D' }),
	'TK-Brokkoli': z('tk', [30, 3, 0.2, 2.5, 3], { m: { folat: 90, calcium: 50 }, farbe: '#3F7D3A' }),
	'TK-Blattspinat': z('tk', [20, 2.5, 0.3, 0.6, 2.3], {
		m: { folat: 120, eisen: 2.5, calcium: 110 },
		farbe: '#2F6B32'
	}),
	'TK-Wokgemüse': z('tk', [30, 1.6, 0.3, 4, 2.5], { farbe: '#7AA44D' }),
	'TK-Edamame': z('tk', [120, 11, 5, 4, 5], {
		m: { folat: 300, eisen: 2.3, calcium: 60 },
		farbe: '#7DB35B'
	}),
	'TK-Prinzessbohnen': z('tk', [30, 2, 0.2, 4, 3], { m: { folat: 40 }, farbe: '#5E9440' }),
	'TK-Beerenmischung': z('tk', [45, 0.9, 0.3, 8, 4], { g: { Hv: 70 }, farbe: '#7B2D4F' }),
	'TK-Garnelen': z('tk', [70, 16, 1, 0, 0], {
		m: { jod: 130, omega3: 300 },
		art: 'fisch',
		farbe: '#F2A28A'
	}),
	'TK-Kräuter': z('tk', [40, 3, 0.7, 5, 4], { g: { EL: 5 } }),

	/* ---------- Trockenes ---------- */
	Vollkornspaghetti: z('trocken', [348, 13, 2.5, 64, 8.5], { farbe: '#C9A06A' }),
	Vollkornnudeln: z('trocken', [348, 13, 2.5, 64, 8.5], { farbe: '#C9A06A' }),
	'Rote-Linsen-Nudeln': z('trocken', [335, 25, 2, 48, 9], {
		m: { folat: 150, eisen: 6 },
		farbe: '#E59A5B'
	}),
	'Parboiled-Reis': z('trocken', [350, 7, 0.6, 77, 1.4], { farbe: '#F4F0E4' }),
	'Vollkorn-Basmati': z('trocken', [350, 7.5, 2.5, 72, 3.5], { farbe: '#D8C49A' }),
	'gekochter Naturreis': z('kuehl', [111, 2.6, 0.9, 22, 1.6], { farbe: '#D8C49A' }),
	Quinoa: z('trocken', [368, 14, 6, 64, 7], { m: { folat: 184, eisen: 4.6 }, farbe: '#D9C08E' }),
	Bulgur: z('trocken', [350, 12, 1.5, 64, 9], { farbe: '#C9A46A' }),
	'Vollkorn-Couscous': z('trocken', [355, 12, 1.7, 66, 9], { farbe: '#E3C98C' }),
	Haferflocken: z('trocken', [370, 13.5, 7, 58.7, 10], {
		g: { EL: 10 },
		m: { eisen: 4.2 },
		farbe: '#D7C29A'
	}),
	'Rote Linsen': z('trocken', [340, 24, 1.5, 50, 11], {
		g: { EL: 15 },
		m: { folat: 200, eisen: 7.5 },
		farbe: '#E58A3B'
	}),
	Belugalinsen: z('trocken', [330, 26, 1.5, 47, 17], {
		m: { folat: 200, eisen: 8 },
		farbe: '#2E2A2E'
	}),
	Vollkornmehl: z('trocken', [320, 12, 2, 60, 10], { g: { EL: 10, TL: 3 } }),
	Speisestärke: z('trocken', [350, 0.3, 0, 86, 0], { g: { EL: 8, TL: 3 } }),
	Chiasamen: z('trocken', [490, 17, 31, 8, 34], {
		g: { EL: 12, TL: 4 },
		m: { calcium: 630, eisen: 7.7 }
	}),
	'Leinsamen (geschrotet)': z('trocken', [490, 20, 37, 2, 27], { g: { EL: 10, TL: 3 } }),
	'Mandeln (gemahlen)': z('trocken', [600, 22, 53, 6, 12], {
		g: { EL: 7, TL: 2.5 },
		m: { calcium: 250 }
	}),
	'Haselnüsse (gemahlen)': z('trocken', [650, 15, 61, 10, 8], { g: { EL: 7, TL: 2.5 } }),
	Sesam: z('trocken', [580, 18, 50, 10, 12], {
		g: { EL: 8, TL: 3 },
		m: { calcium: 780, eisen: 10 },
		farbe: '#E9DCBC'
	}),
	Kürbiskerne: z('trocken', [560, 30, 49, 5, 6], { g: { EL: 10, TL: 3 }, m: { eisen: 8.8 } }),
	Sonnenblumenkerne: z('trocken', [580, 21, 49, 12, 9], {
		g: { EL: 10, TL: 3 },
		m: { folat: 227, eisen: 5 }
	}),
	Erdnussmus: z('trocken', [600, 25, 50, 12, 7], { g: { EL: 15, TL: 6 }, farbe: '#B9824A' }),
	Mandelmus: z('trocken', [620, 21, 55, 6, 12], { g: { EL: 15, TL: 6 }, m: { calcium: 260 } }),
	Tahin: z('trocken', [600, 17, 54, 10, 9], { g: { EL: 15, TL: 6 }, m: { calcium: 420 } }),
	'Kakao (ungesüßt)': z('trocken', [356, 20, 21, 11, 30], { g: { TL: 3, EL: 7 } }),
	Backpulver: z('trocken', [100, 0, 0, 25, 0], { g: { TL: 4 } }),

	/* ---------- Konserven ---------- */
	'Kichererbsen (Dose)': z('konserven', [120, 7, 2.6, 15, 6], {
		g: { Dose: 240 },
		m: { folat: 60, eisen: 1.5 },
		farbe: '#D8B26A'
	}),
	'weiße Bohnen (Dose)': z('konserven', [95, 6.6, 0.4, 13, 6], {
		g: { Dose: 250 },
		m: { folat: 50, eisen: 2 },
		farbe: '#EDE3CF'
	}),
	'Kidneybohnen (Dose)': z('konserven', [100, 8, 0.5, 13, 7], {
		g: { Dose: 250 },
		m: { folat: 40, eisen: 2.2 },
		farbe: '#8E2D2A'
	}),
	'schwarze Bohnen (Dose)': z('konserven', [95, 7, 0.5, 12, 7], {
		g: { Dose: 250 },
		m: { folat: 70, eisen: 2 },
		farbe: '#2E2A2E'
	}),
	'Linsen (Dose)': z('konserven', [90, 7, 0.5, 12, 4.5], {
		g: { Dose: 265 },
		m: { folat: 100, eisen: 2.5 },
		farbe: '#7A5A3A'
	}),
	'Mais (Dose)': z('konserven', [80, 2.9, 1.2, 13.6, 2.7], { g: { Dose: 285 }, farbe: '#F2C94C' }),
	'gehackte Tomaten (Dose)': z('konserven', [21, 1.1, 0.1, 3.3, 1.2], {
		g: { Dose: 400 },
		farbe: '#C93A28'
	}),
	'passierte Tomaten': z('konserven', [30, 1.3, 0.2, 5, 1.2], { g: { EL: 15 }, farbe: '#C93A28' }),
	Tomatenmark: z('konserven', [80, 4.3, 0.5, 13, 4], { g: { EL: 15, TL: 5 } }),
	'Kokosmilch (light)': z('konserven', [75, 0.7, 7.5, 1.5, 0], { g: { Dose: 400, EL: 15 } }),
	'schwarze Oliven': z('konserven', [150, 1, 15, 1, 3], { g: { Stk: 4, EL: 10 } }),

	/* ---------- Gewürze, Öl & Saucen ---------- */
	Olivenöl: z('gewuerze', [884, 0, 100, 0, 0], { g: { EL: 10, TL: 4 } }),
	Rapsöl: z('gewuerze', [884, 0, 100, 0, 0], { g: { EL: 10, TL: 4 } }),
	'Sesamöl (geröstet)': z('gewuerze', [884, 0, 100, 0, 0], { g: { EL: 10, TL: 4 } }),
	'Sojasauce (salzreduziert)': z('gewuerze', [60, 8, 0, 6, 0], { g: { EL: 16, TL: 5 } }),
	Reisessig: z('gewuerze', [20, 0, 0, 2, 0], { g: { EL: 15, TL: 5 } }),
	Apfelessig: z('gewuerze', [20, 0, 0, 1, 0], { g: { EL: 15, TL: 5 } }),
	'Aceto balsamico': z('gewuerze', [90, 0.5, 0, 17, 0], { g: { EL: 15, TL: 5 } }),
	Senf: z('gewuerze', [90, 6, 5, 5, 3], { g: { TL: 5, EL: 15 } }),
	Honig: z('gewuerze', [304, 0.3, 0, 80, 0], { g: { TL: 7, EL: 20 } }),
	Zitronensaft: z('gewuerze', [22, 0.4, 0.2, 2.4, 0.3], { g: { EL: 10, TL: 5 } }),
	Gemüsebrühe: z('gewuerze', [4, 0.2, 0.2, 0.4, 0], {}),
	Jodsalz: z('gewuerze', [0, 0, 0, 0, 0], { g: { Prise: 0.4, TL: 6 }, m: { jod: 2000 } }),
	Pfeffer: z('gewuerze', [0, 0, 0, 0, 0], { g: { Prise: 0.2, TL: 2 } }),
	'Paprikapulver (edelsüß)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2.5, Prise: 0.3 } }),
	'Paprikapulver (geräuchert)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2.5, Prise: 0.3 } }),
	Kreuzkümmel: z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2, Prise: 0.3 } }),
	'Currypulver (mild)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2.5, EL: 7 } }),
	Kurkuma: z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 3, Prise: 0.3 } }),
	'Garam Masala': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2.5 } }),
	'Zimt (Ceylon)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 2.5, Prise: 0.3 } }),
	'Oregano (getrocknet)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 1, Prise: 0.2 } }),
	'italienische Kräuter (getrocknet)': z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 1, EL: 3 } }),
	Chiliflocken: z('gewuerze', [0, 0, 0, 0, 0], { g: { TL: 1, Prise: 0.2 } }),
	Muskatnuss: z('gewuerze', [0, 0, 0, 0, 0], { g: { Prise: 0.2 } }),
	Lorbeerblatt: z('gewuerze', [0, 0, 0, 0, 0], { plural: 'Lorbeerblätter', g: { Stk: 0.2 } })
};

export default KATALOG;
