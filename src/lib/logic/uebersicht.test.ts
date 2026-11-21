// Nur zum Anschauen: npx vitest --run uebersicht  (zeigt Zeit und Nährwerte aller Rezepte)
import { writeFileSync } from 'node:fs';
import { it, expect } from 'vitest';
import { REZEPTE } from '../data/rezepte/index.ts';
import { computeRecipe } from './rezept.ts';

it.skipIf(!process.env.UEBERSICHT)('Übersicht', () => {
	const rows = REZEPTE.map((r) => {
		const a = computeRecipe(r, undefined, { veg: false, tm: false });
		const v = computeRecipe(r, undefined, { veg: true, tm: false });
		const t = computeRecipe(r, undefined, { veg: false, tm: true });
		const n = a.nutrition;
		return `${r.kategorie.padEnd(11)} ${r.id.padEnd(32)} ${String(a.minutes).padStart(2)}/${String(t.minutes).padStart(2)}${a.ofen ? '+' + a.ofen + 'O' : '    '} ${a.art.padEnd(9)} kcal ${String(n.kcal).padStart(3)} P ${String(n.protein).padStart(2)} F ${String(n.fett).padStart(2)} KH ${String(n.kh).padStart(2)} (Basis ${String(a.baseKh).padStart(2)}) Bst ${String(n.bst).padStart(2)} | veg P ${v.nutrition.protein} KH ${v.nutrition.kh} | ${a.naehrstoffe.join(',')}`;
	});
	writeFileSync(process.env.UEBERSICHT!, rows.join('\n') + '\n');
	expect(rows.length).toBeGreaterThan(0);
});
