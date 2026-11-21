<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ExportActions from '#lib/components/ExportActions.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import RecipePicker from '#lib/components/RecipePicker.svelte';
	import RecipePicture from '#lib/components/RecipePicture.svelte';
	import Sheet from '#lib/components/Sheet.svelte';
	import Switch from '#lib/components/Switch.svelte';
	import SyncStatus from '#lib/components/SyncStatus.svelte';
	import WeekSummary from '#lib/components/WeekSummary.svelte';
	import { planDocument } from '#lib/documents.ts';
	import {
		addDays,
		heute,
		kurz,
		montag,
		tage as tageAb,
		tagMonat,
		wochentag
	} from '#lib/logic/datum.ts';
	import {
		familienText,
		kategorieVon,
		MAHLZEITEN,
		type Mahlzeit
	} from '#lib/logic/einstellungen.ts';
	import { berechne, type Gericht } from '#lib/logic/gericht.ts';
	import { planKey, vorschlagen, wuerfeln, type PlanEintrag } from '#lib/logic/plan.ts';
	import { ART, zeitText } from '#lib/logic/text.ts';
	import { store } from '#lib/store.svelte.ts';

	let start = $state(montag(heute()));
	const tage = $derived(tageAb(start, 14));
	const wochen = $derived([tage.slice(0, 7), tage.slice(7)]);
	const s = $derived(store.einstellungen);
	const mahlzeiten = $derived(MAHLZEITEN.filter((m) => s.mahlzeiten[m.id]));
	const leer = $derived(
		tage.every((d) => mahlzeiten.every((m) => !store.eintrag(d, m.id)?.rezept))
	);

	let aktiv = $state<{ datum: string; mahlzeit: Mahlzeit } | null>(null);
	let sheet = $state(false);
	let picker = $state(false);

	const aktivEintrag = $derived(aktiv ? store.eintrag(aktiv.datum, aktiv.mahlzeit) : undefined);
	const aktivGericht = $derived(
		aktivEintrag?.rezept ? store.gericht(aktivEintrag.rezept) : undefined
	);

	function info(e: PlanEintrag | undefined) {
		if (!e?.rezept) return null;
		const g = store.gericht(e.rezept);
		if (!g) return null;
		const r = berechne(g, e.auswahl, { veg: s.veg, tm: s.tm });
		const k = kategorieVon(e.mahlzeit);
		return { g, r, ueber: s.gdm && r.nutrition.kh > s.kh[k] };
	}

	function vorschlag(ueberschreiben: boolean) {
		if (
			ueberschreiben &&
			!confirm(
				'Alle Mahlzeiten dieser zwei Wochen neu vorschlagen? Deine Auswahl geht dabei verloren.'
			)
		)
			return;
		const neu = vorschlagen({
			tage,
			plan: $state.snapshot(store.plan) as Record<string, PlanEintrag>,
			s: $state.snapshot(s),
			gerichte: store.gerichte,
			ueberschreiben
		});
		store.setPlanViele(neu);
	}

	function oeffnen(datum: string, mahlzeit: Mahlzeit) {
		aktiv = { datum, mahlzeit };
		if (store.eintrag(datum, mahlzeit)?.rezept) sheet = true;
		else picker = true;
	}

	function waehlen(g: Gericht) {
		if (!aktiv) return;
		const alt = aktivEintrag;
		store.setPlan({
			datum: aktiv.datum,
			mahlzeit: aktiv.mahlzeit,
			rezept: g.id,
			auswahl: store.auswahl[g.id] ?? {},
			reste:
				aktiv.mahlzeit === 'abend' ? g.mitnehmen && s.mittag > 0 && s.mahlzeiten.mittag : false,
			portionen: alt?.portionen ?? null
		});
		picker = false;
		sheet = false;
	}

	function neuWuerfeln() {
		if (!aktiv || !aktivEintrag) return;
		const benutzt = new Set(
			tage.flatMap((d) => MAHLZEITEN.map((m) => store.eintrag(d, m.id)?.rezept ?? ''))
		);
		const w = wuerfeln(aktivEintrag, $state.snapshot(s), store.gerichte, benutzt);
		if (!w) return;
		const g = store.gericht(w.rezept)!;
		store.setPlan({
			...aktivEintrag,
			rezept: w.rezept,
			auswahl: w.auswahl,
			reste: aktiv.mahlzeit === 'abend' ? g.mitnehmen && s.mittag > 0 && s.mahlzeiten.mittag : false
		});
	}

	function setReste(v: boolean) {
		if (!aktivEintrag) return;
		store.setPlan({ ...aktivEintrag, reste: v });
	}

	function leeren() {
		if (!aktiv) return;
		store.leeren(aktiv.datum, aktiv.mahlzeit);
		sheet = false;
	}

	const istHeute = (d: string) => d === heute();
	const titel = $derived(
		aktiv
			? `${MAHLZEITEN.find((m) => m.id === aktiv!.mahlzeit)!.label}, ${wochentag(aktiv.datum, true)} ${tagMonat(aktiv.datum)}`
			: ''
	);
</script>

<svelte:head>
	<title>Plan – Bauchgefühl</title>
</svelte:head>

<header class="top">
	<p class="brand">Bauchgefühl</p>
	<SyncStatus />
</header>
<h1>Euer Essensplan</h1>
<p class="lede">
	{tagMonat(tage[0])}–{tagMonat(tage[13])} · für {familienText(s)}{s.mittag
		? `, abends ${s.mittag === 1 ? 'eine Portion' : s.mittag + ' Portionen'} fürs Mittag`
		: ''}
</p>

<div class="actions no-print">
	<button type="button" class="btn" onclick={() => vorschlag(false)}>
		<Icon name="dice" />{leer ? 'Zwei Wochen vorschlagen' : 'Lücken füllen'}
	</button>
	{#if !leer}
		<button type="button" class="btn ghost" onclick={() => vorschlag(true)}>Alles neu</button>
	{/if}
	<span class="nav">
		<button
			type="button"
			class="round"
			aria-label="Eine Woche früher"
			onclick={() => (start = addDays(start, -7))}><Icon name="back" /></button
		>
		<button
			type="button"
			class="today"
			disabled={start === montag(heute())}
			onclick={() => (start = montag(heute()))}>Heute</button
		>
		<button
			type="button"
			class="round"
			aria-label="Eine Woche später"
			onclick={() => (start = addDays(start, 7))}><Icon name="next" /></button
		>
	</span>
</div>

{#if s.veg}
	<p class="hint no-print">
		<Icon name="veggie" />Vegetarisch ist an: Fleisch und Fisch werden ersetzt.
	</p>
{/if}

{#each wochen as woche, wi (woche[0])}
	<section class="woche">
		<h2>
			{wi === 0 ? 'Woche 1' : 'Woche 2'}
			<span class="muted">· {tagMonat(woche[0])}–{tagMonat(woche[6])}</span>
		</h2>
		<WeekSummary tage={woche} />
		<div class="days">
			{#each woche as d (d)}
				<article class="day card" class:heute={istHeute(d)}>
					<h3>
						{wochentag(d, true)} <span class="muted">{tagMonat(d)}</span>
						{#if istHeute(d)}<span class="badge terra">Heute</span>{/if}
					</h3>
					<ul>
						{#each mahlzeiten as m (m.id)}
							{@const e = store.eintrag(d, m.id)}
							{@const x = info(e)}
							<li>
								<button
									type="button"
									class="meal"
									class:empty={!x}
									onclick={() => oeffnen(d, m.id)}
								>
									<span class="label">{m.kurz}</span>
									{#if x}
										<span class="thumb"><RecipePicture gericht={x.g} sizes="40px" /></span>
										<span class="what">
											<span class="name">{x.g.name}</span>
											<span class="meta">
												{#if m.id === 'mittag' && e?.reste}
													<span class="badge sage"><Icon name="box" />Reste vom Vorabend</span>
												{:else}
													{zeitText(x.r)}
													{#if m.id === 'abend'}· {ART[x.r.art].label}{/if}
													{#if m.id === 'abend' && e?.reste}<span class="badge sage"
															><Icon name="box" />+ Mittag</span
														>{/if}
												{/if}
												{#if x.ueber}<span class="badge warn">{x.r.nutrition.kh} g KH</span>{/if}
											</span>
										</span>
									{:else}
										<span class="add"><Icon name="plus" />Rezept wählen</span>
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>
{/each}

<ExportActions spec={() => planDocument(tage, store, s)} label="Plan als PDF" />

<Sheet bind:open={sheet} title={titel}>
	{#if aktivEintrag && aktivGericht && aktiv}
		{@const r = berechne(aktivGericht, aktivEintrag.auswahl, { veg: s.veg, tm: s.tm })}
		<div class="sheet-head">
			<span class="thumb-l"><RecipePicture gericht={aktivGericht} sizes="88px" /></span>
			<div>
				<p class="sheet-name">{aktivGericht.name}</p>
				<p class="muted small">
					{zeitText(r)} · {ART[r.art].label} · {r.nutrition.kh} g KH pro Portion
				</p>
			</div>
		</div>
		{#if aktiv.mahlzeit === 'mittag' && aktivEintrag.reste}
			<p class="note"><Icon name="box" />Reste vom Abendessen am Vortag – wird dort mitgekocht.</p>
		{/if}
		{#if aktiv.mahlzeit === 'abend' && s.mittag > 0}
			<Switch
				checked={!!aktivEintrag.reste}
				label="Fürs Mittag mitkochen"
				hint={aktivGericht.mitnehmen
					? `+${s.mittag} ${s.mittag === 1 ? 'Portion' : 'Portionen'} für morgen`
					: 'Taugt nicht so gut zum Mitnehmen'}
				onchange={setReste}
			/>
		{/if}
		<div class="sheet-actions">
			<button
				type="button"
				class="btn"
				onclick={() => {
					sheet = false;
					goto(
						resolve('/rezepte/[id]', { id: aktivGericht.id }) +
							`?plan=${encodeURIComponent(planKey(aktiv!.datum, aktiv!.mahlzeit))}`
					);
				}}><Icon name="book" />Rezept öffnen</button
			>
			<button
				type="button"
				class="btn ghost small"
				onclick={() => ((sheet = false), (picker = true))}><Icon name="search" />Tauschen</button
			>
			<button type="button" class="btn ghost small" onclick={neuWuerfeln}
				><Icon name="dice" />Würfeln</button
			>
			<button type="button" class="btn ghost small" onclick={leeren}
				><Icon name="trash" />Leeren</button
			>
		</div>
	{/if}
</Sheet>

<Sheet bind:open={picker} title={aktiv ? `${titel} wählen` : 'Rezept wählen'}>
	{#if aktiv}
		<RecipePicker
			kategorie={kategorieVon(aktiv.mahlzeit)}
			aktuell={aktivEintrag?.rezept}
			onpick={waehlen}
		/>
	{/if}
</Sheet>

<style>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 6px;
	}
	.brand {
		margin: 0;
		font-family: var(--display);
		font-variation-settings: 'SOFT' 100;
		font-weight: 700;
		color: var(--terra-ink);
		font-size: 18px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin: 20px 0 8px;
	}
	.nav {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-left: auto;
	}
	.round,
	.today {
		height: 42px;
		min-width: 42px;
		border-radius: 999px;
		border: 1.5px solid var(--line);
		background: var(--surface);
		display: inline-grid;
		place-items: center;
		font-weight: 700;
		font-size: 14px;
		padding: 0 12px;
	}
	.round {
		padding: 0;
	}
	.round :global(svg) {
		width: 18px;
		height: 18px;
	}
	.today:disabled {
		opacity: 0.45;
	}
	.hint {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--sage-ink);
		font-weight: 700;
		font-size: 15px;
	}
	.hint :global(svg) {
		width: 18px;
		height: 18px;
	}
	.woche h2 span {
		font-family: var(--body);
		font-size: 15px;
		font-weight: 600;
	}
	.days {
		display: grid;
		gap: 12px;
	}
	.day {
		padding: 14px 14px 6px;
	}
	.day.heute {
		border-color: var(--terra);
		box-shadow:
			0 0 0 1px var(--terra),
			var(--shadow);
	}
	.day h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 19px;
		margin-bottom: 4px;
	}
	.day h3 .muted {
		font-family: var(--body);
		font-size: 14px;
		font-weight: 600;
	}
	.day ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.meal {
		display: grid;
		grid-template-columns: 74px 40px 1fr;
		align-items: center;
		gap: 10px;
		width: 100%;
		min-height: 56px;
		padding: 8px 0;
		border: 0;
		border-top: 1px solid var(--line);
		background: none;
		text-align: left;
	}
	li:first-child .meal {
		border-top: 0;
	}
	.meal.empty {
		grid-template-columns: 74px 1fr;
	}
	.label {
		font-size: 11px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: var(--muted);
	}
	.thumb {
		width: 40px;
		height: 40px;
	}
	.name {
		display: block;
		font-weight: 700;
		line-height: 1.25;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 6px;
		color: var(--muted);
		font-size: 13px;
		margin-top: 2px;
	}
	.meta :global(svg),
	.note :global(svg) {
		width: 14px;
		height: 14px;
	}
	.add {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--terra-ink);
		font-weight: 700;
		font-size: 15px;
	}
	.add :global(svg) {
		width: 18px;
		height: 18px;
	}
	.sheet-head {
		display: grid;
		grid-template-columns: 88px 1fr;
		gap: 14px;
		align-items: center;
		margin-bottom: 14px;
	}
	.thumb-l {
		width: 88px;
		height: 88px;
	}
	.sheet-name {
		font-family: var(--display);
		font-size: 21px;
		font-weight: 600;
		line-height: 1.2;
		margin: 0 0 4px;
	}
	.note {
		display: flex;
		gap: 8px;
		align-items: center;
		color: var(--sage-ink);
		font-weight: 600;
	}
	.sheet-actions {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 10px;
		margin-top: 16px;
	}
	.sheet-actions .btn:first-child {
		grid-column: 1 / -1;
	}
	@media (min-width: 720px) {
		.days {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
