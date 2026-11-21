<script lang="ts">
	import type { Art, Naehrstoff } from '../data/types.ts';
	import { MAHLZEITEN } from '../logic/einstellungen.ts';
	import { num } from '../logic/format.ts';
	import { NAEHRSTOFFE } from '../logic/rezept.ts';
	import { anteil, wochenblick } from '../logic/statistik.ts';
	import { ART } from '../logic/text.ts';
	import { store } from '../store.svelte.ts';
	import Icon from './Icon.svelte';

	let { tage }: { tage: string[] } = $props();

	const s = $derived(store.einstellungen);
	const eintraege = $derived(
		tage.flatMap((d) =>
			MAHLZEITEN.filter((m) => s.mahlzeiten[m.id])
				.map((m) => store.eintrag(d, m.id))
				.filter((e) => !!e?.rezept)
		)
	);
	const w = $derived(
		wochenblick(eintraege as NonNullable<(typeof eintraege)[number]>[], s, (id) =>
			store.gericht(id)
		)
	);
	const arten: Art[] = ['fisch', 'gefluegel', 'rind', 'veggie'];
	const stoffe = Object.keys(NAEHRSTOFFE) as Naehrstoff[];
</script>

{#if w.tage}
	<div class="summary card">
		<div class="arten">
			{#each arten as a (a)}
				{#if w.arten[a] || a !== 'rind'}
					<span class="art"><Icon name={ART[a].icon} /><b>{w.arten[a]}×</b> {ART[a].label}</span>
				{/if}
			{/each}
			<span class="ziel muted small">Ziel: {s.woche.fisch}× Fisch, {s.woche.fleisch}× Fleisch</span>
		</div>
		<details>
			<summary>Nährstoffe dieser Woche</summary>
			<p class="muted small">
				Durchschnitt pro Tag, wenn du von jeder geplanten Mahlzeit eine Portion isst – eine grobe
				Schätzung.
			</p>
			<dl class="makros">
				<div>
					<dt>Energie</dt>
					<dd>{w.proTag.kcal} kcal</dd>
				</div>
				<div>
					<dt>Eiweiß</dt>
					<dd>{w.proTag.protein} g</dd>
				</div>
				<div>
					<dt>Kohlenhydrate</dt>
					<dd>{w.proTag.kh} g</dd>
				</div>
				<div>
					<dt>Ballaststoffe</dt>
					<dd>{w.proTag.bst} g</dd>
				</div>
			</dl>
			<ul class="bars">
				{#each stoffe as k (k)}
					{@const p = anteil(k, w.mikroProTag[k])}
					<li>
						<span class="k">{NAEHRSTOFFE[k].label}</span>
						<span class="bar" style:--p="{Math.min(100, p)}%" class:low={p < 60}></span>
						<span class="v">{num(w.mikroProTag[k], 0)} {NAEHRSTOFFE[k].einheit} · {p} %</span>
					</li>
				{/each}
			</ul>
			<p class="muted small">
				Prozent vom Tagesbedarf in der Schwangerschaft. Folsäure und Jod nimmst du zusätzlich als
				Tablette, wenn deine Ärztin oder Hebamme es empfiehlt – die sind hier nicht eingerechnet.
				{#if s.gdm && w.ueberGrenze}<br /><b>{w.ueberGrenze} Mahlzeiten</b> liegen über deiner KH-Grenze;
					im Rezept steht, wie viel Beilage für dich passt.{/if}
			</p>
		</details>
	</div>
{/if}

<style>
	.summary {
		padding: 12px 14px;
		margin-bottom: 12px;
	}
	.arten {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 14px;
	}
	.art {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 15px;
	}
	.art :global(svg) {
		width: 18px;
		height: 18px;
		color: var(--sage-ink);
	}
	.ziel {
		margin-left: auto;
	}
	details {
		margin-top: 8px;
	}
	summary {
		cursor: pointer;
		font-weight: 800;
		color: var(--terra-ink);
		font-size: 15px;
		padding: 4px 0;
	}
	.makros {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 8px;
		margin: 8px 0 14px;
	}
	.makros div {
		background: var(--surface-2);
		border-radius: 12px;
		padding: 8px 10px;
	}
	dt {
		font-size: 12px;
		color: var(--muted);
		font-weight: 700;
	}
	dd {
		margin: 0;
		font-weight: 800;
		font-size: 17px;
	}
	.bars {
		list-style: none;
		margin: 0 0 12px;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.bars li {
		display: grid;
		grid-template-columns: 76px 1fr;
		gap: 2px 10px;
		align-items: center;
		font-size: 14px;
	}
	.k {
		font-weight: 700;
	}
	.bar {
		height: 10px;
		border-radius: 5px;
		background: linear-gradient(to right, var(--sage) var(--p), var(--surface-2) var(--p));
	}
	.bar.low {
		background: linear-gradient(to right, var(--warn) var(--p), var(--surface-2) var(--p));
	}
	.v {
		grid-column: 2;
		color: var(--muted);
		font-size: 13px;
	}
</style>
