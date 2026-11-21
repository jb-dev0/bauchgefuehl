<script lang="ts">
	import { resolve } from '$app/paths';
	import ExportActions from '#lib/components/ExportActions.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import SyncStatus from '#lib/components/SyncStatus.svelte';
	import { shoppingDocument } from '#lib/documents.ts';
	import { addDays, heute, montag, tagMonat, tage as tageAb } from '#lib/logic/datum.ts';
	import { einkaufsliste } from '#lib/logic/einkauf.ts';
	import { MAHLZEITEN } from '#lib/logic/einstellungen.ts';
	import type { PlanEintrag } from '#lib/logic/plan.ts';
	import { store } from '#lib/store.svelte.ts';

	const BEREICHE = [
		{ id: 'diese', label: 'Diese Woche', start: 0, tage: 7 },
		{ id: 'naechste', label: 'Nächste Woche', start: 7, tage: 7 },
		{ id: 'beide', label: 'Beide Wochen', start: 0, tage: 14 },
		{ id: 'rest', label: 'Ab heute', start: -1, tage: 7 }
	] as const;
	let bereich = $state<(typeof BEREICHE)[number]['id']>('diese');
	let ausblenden = $state(false);
	let neu = $state('');

	const b = $derived(BEREICHE.find((x) => x.id === bereich)!);
	const start = $derived(b.start === -1 ? heute() : addDays(montag(heute()), b.start));
	const tage = $derived(tageAb(start, b.tage));
	const liste = $derived(`${start}+${b.tage}`);
	const s = $derived(store.einstellungen);

	const eintraege = $derived(
		tage.flatMap((d) =>
			MAHLZEITEN.filter((m) => s.mahlzeiten[m.id])
				.map((m) => store.eintrag(d, m.id))
				.filter((e): e is PlanEintrag => !!e?.rezept)
		)
	);
	const gruppen = $derived(einkaufsliste(eintraege, s, (id) => store.gericht(id)));
	const extras = $derived(
		Object.values(store.einkauf)
			.filter((e) => e.liste === liste && e.extra && !e.geloescht)
			.sort((a, b) => a.geaendert - b.geaendert)
	);
	const erledigt = (posten: string) => !!store.einkauf[`${liste}|${posten}`]?.erledigt;
	const anzahl = $derived(gruppen.reduce((n, g) => n + g.posten.length, 0) + extras.length);
	const offen = $derived(
		gruppen.reduce((n, g) => n + g.posten.filter((p) => !erledigt(p.key)).length, 0) +
			extras.filter((e) => !e.erledigt).length
	);

	function toggle(posten: string) {
		store.setEinkauf(liste, posten, { erledigt: !erledigt(posten) });
	}

	function hinzufuegen(e: SubmitEvent) {
		e.preventDefault();
		const t = neu.trim();
		if (!t) return;
		store.setEinkauf(liste, 'extra:' + t, { extra: true, erledigt: false, geloescht: false });
		neu = '';
	}

	function zuruecksetzen() {
		if (!confirm('Alle Haken in dieser Liste entfernen?')) return;
		for (const e of Object.values(store.einkauf))
			if (e.liste === liste && e.erledigt) store.setEinkauf(liste, e.posten, { erledigt: false });
	}

	const titel = $derived(`${tagMonat(tage[0])}–${tagMonat(tage[tage.length - 1])}`);

	async function teilen() {
		const zeilen: string[] = [`Einkauf ${titel}`];
		for (const g of gruppen) {
			const p = g.posten.filter((x) => !erledigt(x.key));
			if (!p.length) continue;
			zeilen.push('', g.label + ':');
			for (const x of p) zeilen.push(`- ${x.menge ? x.menge + ' ' : ''}${x.name}`);
		}
		const ex = extras.filter((x) => !x.erledigt);
		if (ex.length) zeilen.push('', 'Außerdem:', ...ex.map((x) => '- ' + x.posten.slice(6)));
		const text = zeilen.join('\n');
		if (navigator.share) await navigator.share({ text }).catch(() => {});
		else {
			await navigator.clipboard.writeText(text);
			alert('Liste kopiert.');
		}
	}
</script>

<svelte:head>
	<title>Einkauf – Bauchgefühl</title>
</svelte:head>

<header class="top">
	<h1>Einkauf</h1>
	<SyncStatus />
</header>
<p class="lede">
	Alles aus dem Plan zusammengerechnet, nach Abteilungen sortiert. Mittagessen aus Resten sind schon
	im Abendessen davor enthalten.
</p>

<div class="chips no-print">
	{#each BEREICHE as x (x.id)}
		<button
			type="button"
			class="chip"
			aria-pressed={bereich === x.id}
			onclick={() => (bereich = x.id)}>{x.label}</button
		>
	{/each}
</div>
<p class="range muted small">{titel} · {offen} von {anzahl} offen</p>

{#if !eintraege.length}
	<div class="card leer">
		<p>Für diesen Zeitraum ist noch nichts geplant.</p>
		<a class="btn" href={resolve('/')}>Zum Plan</a>
	</div>
{/if}

{#each gruppen as g (g.abteilung)}
	{@const posten = ausblenden
		? g.posten.filter((p) => !erledigt(p.key))
		: [...g.posten].sort((a, b) => Number(erledigt(a.key)) - Number(erledigt(b.key)))}
	{#if posten.length}
		<section>
			<h2>{g.label}</h2>
			<ul>
				{#each posten as p (p.key)}
					{@const on = erledigt(p.key)}
					<li>
						<button
							type="button"
							class="item"
							class:on
							aria-pressed={on}
							onclick={() => toggle(p.key)}
						>
							<span class="box"><Icon name="check" stroke={3} /></span>
							<span class="text">
								<span class="name">{p.name}</span>
								{#if p.menge}<span class="menge">{p.menge}</span>{/if}
								<span class="fuer"
									>{p.fuer.slice(0, 2).join(', ')}{p.fuer.length > 2
										? ` und ${p.fuer.length - 2} weitere`
										: ''}</span
								>
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
{/each}

<section>
	<h2>Außerdem</h2>
	<ul>
		{#each extras.filter((e) => !ausblenden || !e.erledigt) as e (e.posten)}
			<li class="extra">
				<button
					type="button"
					class="item"
					class:on={e.erledigt}
					aria-pressed={e.erledigt}
					onclick={() => toggle(e.posten)}
				>
					<span class="box"><Icon name="check" stroke={3} /></span>
					<span class="text"><span class="name">{e.posten.slice(6)}</span></span>
				</button>
				<button
					type="button"
					class="del no-print"
					aria-label="Entfernen"
					onclick={() => store.setEinkauf(liste, e.posten, { geloescht: true })}
					><Icon name="x" /></button
				>
			</li>
		{/each}
	</ul>
	<form class="add no-print" onsubmit={hinzufuegen}>
		<label class="visually-hidden" for="neu">Etwas ergänzen</label>
		<input
			id="neu"
			class="input"
			placeholder="z. B. Windeln, Kaffee für Gäste …"
			bind:value={neu}
		/>
		<button type="submit" class="btn" aria-label="Hinzufügen"><Icon name="plus" /></button>
	</form>
</section>

<div class="tools no-print">
	<button
		type="button"
		class="chip"
		aria-pressed={ausblenden}
		onclick={() => (ausblenden = !ausblenden)}>Erledigte ausblenden</button
	>
	<button type="button" class="chip" onclick={zuruecksetzen}>Haken entfernen</button>
	<button type="button" class="chip" onclick={teilen}><Icon name="share" />Als Text teilen</button>
</div>

<ExportActions
	spec={() =>
		shoppingDocument(
			titel,
			gruppen,
			extras.map((e) => ({ posten: e.posten.slice(6), menge: e.menge })),
			erledigt
		)}
	label="Liste als PDF"
/>

<style>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.chips,
	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 18px;
	}
	.range {
		margin: 8px 0 0;
	}
	.leer {
		padding: 18px;
		margin-top: 18px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	h2 {
		font-size: 19px;
		margin: 26px 0 6px;
	}
	.item {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 12px;
		align-items: start;
		width: 100%;
		padding: 10px 0;
		border: 0;
		border-bottom: 1px solid var(--line);
		background: none;
		text-align: left;
	}
	.box {
		width: 26px;
		height: 26px;
		border-radius: 8px;
		border: 2px solid var(--line);
		display: grid;
		place-items: center;
		color: transparent;
		background: var(--surface);
	}
	.box :global(svg) {
		width: 16px;
		height: 16px;
	}
	.on .box {
		background: var(--sage);
		border-color: var(--sage);
		color: var(--on-accent);
	}
	.text {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0 8px;
	}
	.name {
		font-weight: 700;
	}
	.menge {
		color: var(--terra-ink);
		font-weight: 700;
	}
	.fuer {
		flex-basis: 100%;
		font-size: 13px;
		color: var(--muted);
	}
	.on .name,
	.on .menge {
		text-decoration: line-through;
		color: var(--muted);
	}
	.extra {
		display: flex;
		align-items: center;
	}
	.del {
		width: 40px;
		height: 40px;
		border: 0;
		background: none;
		color: var(--muted);
		flex: none;
	}
	.del :global(svg) {
		width: 18px;
		height: 18px;
	}
	.add {
		display: flex;
		gap: 8px;
		margin-top: 12px;
	}
	.add .btn {
		padding: 0 14px;
	}
	.chip :global(svg) {
		width: 16px;
		height: 16px;
	}
	@media print {
		.fuer {
			display: none;
		}
	}
</style>
