<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '#lib/components/Icon.svelte';
	import RecipePicture from '#lib/components/RecipePicture.svelte';
	import { KATEGORIEN } from '#lib/data/rezepte/index.ts';
	import type { Art, Kategorie } from '#lib/data/types.ts';
	import { berechne } from '#lib/logic/gericht.ts';
	import { NAEHRSTOFFE } from '#lib/logic/rezept.ts';
	import { ART, zeitText } from '#lib/logic/text.ts';
	import { store } from '#lib/store.svelte.ts';

	type Tab = Kategorie | 'eigene';
	const kurz: Record<Tab, string> = {
		abend: 'Abend',
		mittag: 'Mittag',
		snack: 'Snacks',
		fruehstueck: 'Frühstück',
		eigene: 'Eigene'
	};
	const tabs: { id: Tab; label: string }[] = [
		...KATEGORIEN.map((k) => ({ id: k.id as Tab, label: kurz[k.id] })),
		{ id: 'eigene', label: kurz.eigene }
	];
	const tab = $derived((page.url.searchParams.get('k') as Tab | null) ?? 'abend');

	let suche = $state('');
	let art = $state<Art | null>(null);
	let schnell = $state(false);
	let mitnehmen = $state(false);

	const s = $derived(store.einstellungen);
	const rows = $derived(
		store.gerichte
			.filter((g) => (tab === 'eigene' ? g.eigen : g.kategorie === tab))
			.map((g) => ({ g, r: berechne(g, store.auswahl[g.id], { veg: s.veg, tm: s.tm }) }))
			.filter(({ g, r }) => {
				if (suche && !(g.name + ' ' + g.beschreibung).toLowerCase().includes(suche.toLowerCase()))
					return false;
				if (art && r.art !== art) return false;
				if (schnell && r.minutes > 20) return false;
				if (mitnehmen && !g.mitnehmen) return false;
				return true;
			})
	);
	const arten: Art[] = $derived(s.veg ? [] : ['veggie', 'fisch', 'gefluegel']);
	const setTab = (t: Tab) => goto(`?k=${t}`, { replace: true, reset: false });
</script>

<svelte:head>
	<title>Rezepte – Bauchgefühl</title>
</svelte:head>

<header>
	<h1>Rezepte</h1>
	<p class="lede">
		Alles schwangerschaftstauglich, blutzuckerfreundlich und für Kinder geeignet. Abend- und
		Mittagessen in höchstens 30 Minuten, die Ofenzeit nicht mitgerechnet.
	</p>
</header>

<div class="tabs" role="tablist" aria-label="Kategorie">
	{#each tabs as t (t.id)}
		<button type="button" role="tab" aria-selected={tab === t.id} onclick={() => setTab(t.id)}
			>{t.label}</button
		>
	{/each}
</div>

<div class="filters">
	<label class="search">
		<Icon name="search" />
		<span class="visually-hidden">Suchen</span>
		<input class="input" type="search" placeholder="Rezept suchen …" bind:value={suche} />
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
		<button
			type="button"
			class="chip"
			aria-pressed={mitnehmen}
			onclick={() => (mitnehmen = !mitnehmen)}>Zum Mitnehmen</button
		>
	</div>
</div>

{#if tab === 'eigene'}
	<a class="btn" href={resolve('/eigene/[id]', { id: 'neu' })}
		><Icon name="plus" />Eigenes Rezept anlegen</a
	>
{/if}

<ul class="list">
	{#each rows as { g, r } (g.id)}
		<li>
			<a class="row" href={resolve('/rezepte/[id]', { id: g.id })}>
				<span class="thumb"><RecipePicture gericht={g} sizes="88px" /></span>
				<span>
					<span class="name">{g.name}</span>
					<span class="desc">{g.beschreibung}</span>
					<span class="meta">
						<span><Icon name="clock" />{zeitText(r)}</span>
						<span><Icon name={ART[r.art].icon} />{ART[r.art].label}</span>
						<span class:warn={s.gdm && r.nutrition.kh > s.kh[g.kategorie]}
							>{r.nutrition.kh} g KH</span
						>
						{#if g.mitnehmen}<span><Icon name="box" />Mitnehmen</span>{/if}
					</span>
					{#if r.naehrstoffe.length}
						<span class="stoffe">
							{#each r.naehrstoffe as k (k)}<span class="badge sage">{NAEHRSTOFFE[k].label}</span
								>{/each}
						</span>
					{/if}
				</span>
			</a>
		</li>
	{:else}
		<li class="empty muted">
			{tab === 'eigene' ? 'Noch keine eigenen Rezepte. Leg dein erstes an!' : 'Nichts gefunden.'}
		</li>
	{/each}
</ul>

<style>
	.tabs {
		display: flex;
		gap: 4px;
		margin: 22px 0 12px;
		padding: 4px;
		background: var(--surface-2);
		border-radius: 999px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.tabs button {
		flex: 1 0 auto;
		min-height: 40px;
		padding: 0 14px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		font-weight: 700;
		font-size: 15px;
		color: var(--muted);
	}
	.tabs button[aria-selected='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: var(--shadow);
	}
	.filters {
		display: grid;
		gap: 10px;
		margin-bottom: 16px;
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
	.list {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
	}
	.row {
		display: grid;
		grid-template-columns: 88px 1fr;
		gap: 16px;
		align-items: center;
		padding: 14px 0;
		border-top: 1px solid var(--line);
		color: inherit;
		text-decoration: none;
	}
	.thumb {
		width: 88px;
		height: 88px;
	}
	.name {
		display: block;
		font-family: var(--display);
		font-variation-settings: 'SOFT' 100;
		font-size: 20px;
		font-weight: 600;
		line-height: 1.2;
	}
	.row:hover .name {
		color: var(--terra-ink);
	}
	.desc {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: var(--muted);
		font-size: 15px;
		line-height: 1.4;
		margin-top: 2px;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 2px 12px;
		margin-top: 6px;
		font-size: 13px;
		font-weight: 700;
		color: var(--terra-ink);
	}
	.meta span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.meta :global(svg) {
		width: 14px;
		height: 14px;
	}
	.meta .warn {
		color: var(--warn);
	}
	.stoffe {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 6px;
	}
	.empty {
		padding: 24px 0;
	}
</style>
