<script lang="ts">
	import type { Art, Kategorie } from '../data/types.ts';
	import { berechne, type Gericht } from '../logic/gericht.ts';
	import { ART, zeitText } from '../logic/text.ts';
	import { store } from '../store.svelte.ts';
	import Icon from './Icon.svelte';
	import RecipePicture from './RecipePicture.svelte';

	let {
		kategorie,
		aktuell,
		onpick
	}: { kategorie: Kategorie; aktuell?: string | null; onpick: (g: Gericht) => void } = $props();

	let suche = $state('');
	let art = $state<Art | null>(null);
	let schnell = $state(false);

	const s = $derived(store.einstellungen);
	const rows = $derived(
		store.gerichte
			.filter((g) => g.kategorie === kategorie)
			.map((g) => ({ g, r: berechne(g, store.auswahl[g.id], { veg: s.veg, tm: s.tm }) }))
	);
	const gefiltert = $derived(
		rows.filter(({ g, r }) => {
			if (suche && !g.name.toLowerCase().includes(suche.toLowerCase())) return false;
			if (art && r.art !== art && !(g.recipe && art !== 'veggie' && kannArt(g, art))) return false;
			if (schnell && r.minutes > 20) return false;
			return true;
		})
	);

	function kannArt(g: Gericht, a: Art) {
		return g.recipe!.slots.some(
			(sl) =>
				sl.role === 'main' &&
				sl.options.some((o) => berechne(g, { [sl.id]: o.id }, { veg: false, tm: false }).art === a)
		);
	}
	const arten: Art[] = $derived(s.veg ? ['veggie'] : ['veggie', 'fisch', 'gefluegel']);
</script>

<div class="filters">
	<label class="search">
		<Icon name="search" />
		<span class="visually-hidden">Suchen</span>
		<input class="input" type="search" placeholder="Suchen …" bind:value={suche} />
	</label>
	<div class="chips">
		{#each arten as a (a)}
			<button
				type="button"
				class="chip"
				aria-pressed={art === a}
				onclick={() => (art = art === a ? null : a)}>{ART[a].label}</button
			>
		{/each}
		<button type="button" class="chip" aria-pressed={schnell} onclick={() => (schnell = !schnell)}
			>≤ 20 Min.</button
		>
	</div>
</div>

<ul>
	{#each gefiltert as { g, r } (g.id)}
		<li>
			<button type="button" class="row" class:current={g.id === aktuell} onclick={() => onpick(g)}>
				<span class="thumb"><RecipePicture gericht={g} sizes="56px" /></span>
				<span class="text">
					<span class="name">{g.name}</span>
					<span class="meta">
						{zeitText(r)} · {ART[r.art].label}{g.mitnehmen ? ' · zum Mitnehmen' : ''}{g.eigen
							? ' · eigenes'
							: ''}
					</span>
				</span>
			</button>
		</li>
	{:else}
		<li class="empty muted">Nichts gefunden.</li>
	{/each}
</ul>

<style>
	.filters {
		display: grid;
		gap: 10px;
		margin-bottom: 8px;
	}
	.search {
		position: relative;
	}
	.search :global(svg) {
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		color: var(--muted);
	}
	.search input {
		padding-left: 42px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.row {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 12px;
		align-items: center;
		width: 100%;
		padding: 10px 6px;
		border: 0;
		border-bottom: 1px solid var(--line);
		background: none;
		text-align: left;
		border-radius: 12px;
	}
	.row:hover,
	.row.current {
		background: var(--surface-2);
	}
	.thumb {
		width: 56px;
		height: 56px;
	}
	.name {
		display: block;
		font-weight: 800;
		line-height: 1.25;
	}
	.meta {
		display: block;
		color: var(--muted);
		font-size: 14px;
	}
	.empty {
		padding: 20px 0;
	}
</style>
