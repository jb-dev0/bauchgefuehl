<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ChoiceGroup from '#lib/components/ChoiceGroup.svelte';
	import ExportActions from '#lib/components/ExportActions.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import RecipePicture from '#lib/components/RecipePicture.svelte';
	import Sheet from '#lib/components/Sheet.svelte';
	import StepList from '#lib/components/StepList.svelte';
	import Stepper from '#lib/components/Stepper.svelte';
	import Switch from '#lib/components/Switch.svelte';
	import { recipeDocument, TM_HINWEIS, zutatenZeilen } from '#lib/documents.ts';
	import { addDays, heute, kurz, tage as tageAb } from '#lib/logic/datum.ts';
	import { eigenId } from '#lib/logic/eigene.ts';
	import { familie, MAHLZEITEN, portionenFuer, type Mahlzeit } from '#lib/logic/einstellungen.ts';
	import { be, num, roundGrams } from '#lib/logic/format.ts';
	import { berechne } from '#lib/logic/gericht.ts';
	import { planKey } from '#lib/logic/plan.ts';
	import {
		baseShare,
		effectiveSelection,
		grams,
		NAEHRSTOFFE,
		toggleOption
	} from '#lib/logic/rezept.ts';
	import { ART, zeitText } from '#lib/logic/text.ts';
	import { store } from '#lib/store.svelte.ts';

	const id = $derived(page.params.id ?? '');
	const g = $derived(store.gericht(id));
	const s = $derived(store.einstellungen);
	const planParam = $derived(page.url.searchParams.get('plan'));
	const eintrag = $derived(planParam ? store.plan[planParam] : undefined);
	const imPlan = $derived(!!eintrag && eintrag.rezept === id);
	const auswahl = $derived(imPlan ? eintrag!.auswahl : store.auswahl[id]);
	const r = $derived(g ? berechne(g, auswahl, { veg: s.veg, tm: s.tm }) : null);

	let mitMittagLokal = $state<boolean | null>(null);
	const mittagMoeglich = $derived(g?.kategorie === 'abend' && s.mittag > 0);
	const mitMittag = $derived(
		mittagMoeglich && (imPlan ? !!eintrag!.reste : (mitMittagLokal ?? !!g?.mitnehmen))
	);
	let extra = $state(0);
	const basis = $derived(
		g
			? imPlan && eintrag!.portionen
				? eintrag!.portionen
				: portionenFuer(g.kategorie, s, mitMittag)
			: 1
	);
	let menge = $state(0);
	$effect(() => {
		menge = Math.max(0.5, basis + extra);
	});
	const faktor = $derived(g ? menge / g.portionen : 1);

	const limit = $derived(g ? s.kh[g.kategorie] : 0);
	const share = $derived(r ? baseShare(r, limit) : 1);
	const beilage = $derived.by(() => {
		if (!r || !g || share === null || share >= 1) return [];
		return r.chosen
			.filter((c) => c.slot.role === 'base')
			.flatMap((c) => c.option.items)
			.map((it) => ({ name: it.name, g: roundGrams(((grams(it) ?? 0) / g.portionen) * share) }));
	});
	const gdmText = $derived.by(() => {
		if (!r || !s.gdm) return '';
		if (r.nutrition.kh <= limit)
			return `Passt: ${r.nutrition.kh} g Kohlenhydrate pro Portion, deine Grenze sind ${limit} g.`;
		if (share !== null)
			return `Für dich etwa ${Math.round(share * 100)} % der Beilage nehmen, dann kommst du auf etwa ${limit} g Kohlenhydrate.`;
		return `Mit ${r.nutrition.kh} g Kohlenhydraten pro Portion über deiner Grenze von ${limit} g: kleinere Portion nehmen und mit Gemüse oder Salat ergänzen.`;
	});

	function pick(slotId: string, optionId: string) {
		if (!g?.recipe) return;
		const next = toggleOption(g.recipe, auswahl, slotId, optionId);
		store.auswahl[id] = next;
		if (imPlan) store.setPlan({ ...eintrag!, auswahl: next });
	}

	function setMittag(v: boolean) {
		if (imPlan) store.setPlan({ ...eintrag!, reste: v });
		else mitMittagLokal = v;
	}

	const portionenText = $derived.by(() => {
		if (!g) return '';
		if (g.kategorie === 'abend' || g.kategorie === 'fruehstueck') {
			const teile = [`${s.erwachsene} Erw.`];
			if (s.kinder) teile.push(`${s.kinder} ${s.kinder === 1 ? 'Kind' : 'Kinder'}`);
			if (mitMittag) teile.push(`${s.mittag}× Mittag`);
			return teile.join(' + ');
		}
		return '';
	});

	/* In den Plan */
	let planen = $state(false);
	const standardMahlzeit = $derived<Mahlzeit>(
		g?.kategorie === 'snack' ? 'snack1' : ((g?.kategorie ?? 'abend') as Mahlzeit)
	);
	let mahlzeit = $state<Mahlzeit>('abend');
	$effect(() => {
		mahlzeit = standardMahlzeit;
	});
	const tage = $derived(tageAb(heute(), 14));
	function einplanen(datum: string) {
		if (!g) return;
		store.setPlan({
			datum,
			mahlzeit,
			rezept: g.id,
			auswahl: $state.snapshot(auswahl ?? {}),
			reste: mahlzeit === 'abend' ? mitMittag : false,
			portionen: null
		});
		planen = false;
		gespeichert = `Eingeplant: ${kurz(datum)}, ${MAHLZEITEN.find((m) => m.id === mahlzeit)!.label}`;
	}
	let gespeichert = $state('');
	const mahlzeitOptionen = $derived(MAHLZEITEN.filter((m) => m.kategorie === g?.kategorie));
</script>

<svelte:head>
	<title>{g?.name ?? 'Rezept'} – Bauchgefühl</title>
</svelte:head>

<div class="bar no-print">
	<a
		class="back"
		href={imPlan
			? resolve('/')
			: resolve('/rezepte') + `?k=${g?.eigen ? 'eigene' : (g?.kategorie ?? 'abend')}`}
		><Icon name="back" stroke={2.4} />{imPlan ? 'Zum Plan' : 'Alle Rezepte'}</a
	>
	{#if g?.eigen}
		<a class="btn small ghost" href={resolve('/eigene/[id]', { id: eigenId(g.id) })}
			><Icon name="edit" />Bearbeiten</a
		>
	{/if}
</div>

{#if !g || !r}
	<h1>Rezept nicht gefunden</h1>
	<p class="lede">
		Vielleicht wurde es gelöscht. <a href={resolve('/rezepte')}>Zu allen Rezepten</a>
	</p>
{:else}
	<section class="head">
		<div class="pic">
			<RecipePicture
				gericht={g}
				sizes="(min-width: 520px) 440px, 90vw"
				eager
				alt={g.recipe?.photoAlt ?? g.name}
			/>
		</div>
		{#if imPlan}
			<p class="context">
				<Icon name="plan" />{kurz(eintrag!.datum)} · {MAHLZEITEN.find(
					(m) => m.id === eintrag!.mahlzeit
				)?.label}
			</p>
		{/if}
		<h1>{g.name}</h1>
		{#if g.beschreibung}<p class="lede">{g.beschreibung}</p>{/if}
		<p class="meta">
			<span><Icon name="clock" />{zeitText(r)}</span>
			<span><Icon name={ART[r.art].icon} />{ART[r.art].label}</span>
			{#if g.mitnehmen}<span><Icon name="box" />zum Mitnehmen</span>{/if}
			{#if r.tm}<span><Icon name="tm" />Thermomix</span>{/if}
		</p>
	</section>

	<div class="controls no-print">
		<Stepper
			bind:value={menge}
			min={0.5}
			max={16}
			step={0.5}
			label="Portionen"
			text={(n) => `${num(n)} ${n === 1 ? 'Portion' : 'Portionen'}`}
		/>
		{#if portionenText}<span class="muted small">{portionenText}</span>{/if}
	</div>
	<div class="switches no-print">
		<Switch
			checked={s.veg}
			label="Vegetarisch"
			onchange={(v) => store.setEinstellungen({ veg: v })}
		/>
		<Switch checked={s.tm} label="Thermomix" onchange={(v) => store.setEinstellungen({ tm: v })} />
		{#if mittagMoeglich}
			<Switch
				checked={mitMittag}
				label="Fürs Mittag mitkochen"
				hint={`+${s.mittag} ${s.mittag === 1 ? 'Portion' : 'Portionen'}`}
				onchange={setMittag}
			/>
		{/if}
	</div>
	{#if s.tm && !r.tmVerfuegbar}
		<p class="note small">
			{g.recipe?.ohneTm ?? 'Für dieses Rezept gibt es keine Thermomix-Fassung.'}
		</p>
	{/if}

	{#if g.recipe && g.recipe.slots.length}
		<section class="slots no-print">
			{#each g.recipe.slots as slot (slot.id)}
				{@const sel = effectiveSelection(slot, auswahl, s.veg)}
				<ChoiceGroup
					legend={slot.label}
					hint={slot.multi ? 'mehrere möglich' : undefined}
					choices={slot.options
						.filter((o) => !s.veg || o.items.every((it) => true))
						.map((o) => ({ id: o.id, label: o.label }))}
					selected={sel}
					onpick={(oid) => pick(slot.id, oid)}
				/>
			{/each}
		</section>
	{/if}

	<section class="nutri card">
		<h2>Pro Portion</h2>
		<dl>
			<div class:warn={s.gdm && r.nutrition.kh > limit}>
				<dt>Kohlenhydrate</dt>
				<dd>{r.nutrition.kh} g <small>{be(r.nutrition.kh)} BE</small></dd>
			</div>
			<div>
				<dt>Eiweiß</dt>
				<dd>{r.nutrition.protein} g</dd>
			</div>
			<div>
				<dt>Ballaststoffe</dt>
				<dd>{r.nutrition.bst} g</dd>
			</div>
			<div>
				<dt>Fett</dt>
				<dd>{r.nutrition.fett} g</dd>
			</div>
			<div>
				<dt>Energie</dt>
				<dd>{r.nutrition.kcal} kcal</dd>
			</div>
		</dl>
		{#if r.naehrstoffe.length}
			<p class="stoffe">
				<span class="small muted">Gute Quelle für</span>
				{#each r.naehrstoffe as k (k)}<span class="badge sage" title={NAEHRSTOFFE[k].warum}
						>{NAEHRSTOFFE[k].label}</span
					>{/each}
			</p>
		{/if}
		{#if s.gdm}
			<div class="gdm" class:ok={r.nutrition.kh <= limit}>
				<p><Icon name="drop" />{gdmText}</p>
				{#if beilage.length}
					<ul>
						{#each beilage as b (b.name)}<li>ca. {b.g} g {b.name} pro Portion für dich</li>{/each}
					</ul>
				{/if}
			</div>
		{/if}
		<p class="small muted">
			Erwachsenen-Portion, geschätzt aus den Zutaten{r.unvollstaendig
				? ' (nicht alle Zutaten bekannt)'
				: ''}. Eine Kinderportion ist etwa halb so groß.
		</p>
	</section>

	<section>
		<h2>
			Zutaten <span class="muted small"
				>für {num(menge)} {menge === 1 ? 'Portion' : 'Portionen'}</span
			>
		</h2>
		<ul class="items">
			{#each zutatenZeilen(r, faktor) as it, i (i)}
				<li><b>{it.amount}</b><span>{it.name}</span></li>
			{/each}
		</ul>
	</section>

	<section>
		<h2>Zubereitung</h2>
		<StepList steps={r.steps} />
		{#if r.tm}<p class="small muted">{TM_HINWEIS}</p>{/if}
	</section>

	{@const rec = g.recipe}
	{@const kind = rec?.kind ?? g.eigenes?.kind}
	{@const mitnehmen = rec?.mitnehmen ?? g.eigenes?.mitnehmen}
	<section class="tips">
		{#if kind}
			<div class="tip">
				<Icon name="child" />
				<div>
					<h3>Für die Kleinen</h3>
					<p>{kind}</p>
				</div>
			</div>
		{/if}
		{#if mitnehmen}
			<div class="tip">
				<Icon name="box" />
				<div>
					<h3>Zum Mitnehmen</h3>
					<p>{mitnehmen}</p>
				</div>
			</div>
		{/if}
		{#if rec?.vorrat}
			<div class="tip">
				<Icon name="plan" />
				<div>
					<h3>Vorbereiten</h3>
					<p>{rec.vorrat}</p>
				</div>
			</div>
		{/if}
		{#if rec?.gdm}
			<div class="tip">
				<Icon name="drop" />
				<div>
					<h3>Noch blutzuckerfreundlicher</h3>
					<p>{rec.gdm}</p>
				</div>
			</div>
		{/if}
		{#if rec?.hinweis}
			<div class="tip">
				<Icon name="info" />
				<div>
					<h3>Gut zu wissen</h3>
					<p>{rec.hinweis}</p>
				</div>
			</div>
		{/if}
		{#if g.eigenes?.notiz}
			<div class="tip">
				<Icon name="edit" />
				<div>
					<h3>Notiz</h3>
					<p>{g.eigenes.notiz}</p>
				</div>
			</div>
		{/if}
	</section>

	{#if !imPlan}
		<div class="plan-cta no-print">
			<button type="button" class="btn sage" onclick={() => (planen = true)}
				><Icon name="plan" />In den Plan</button
			>
			{#if gespeichert}<p class="small" role="status">
					{gespeichert} · <a href={resolve('/')}>Zum Plan</a>
				</p>{/if}
		</div>
	{/if}

	<ExportActions spec={() => recipeDocument(g, r, { portionen: menge, s, gdmText })} />

	<Sheet bind:open={planen} title="In den Plan">
		{#if mahlzeitOptionen.length > 1}
			<div class="chips">
				{#each mahlzeitOptionen as m (m.id)}
					<button
						type="button"
						class="chip"
						aria-pressed={mahlzeit === m.id}
						onclick={() => (mahlzeit = m.id)}>{m.label}</button
					>
				{/each}
			</div>
		{/if}
		<ul class="days">
			{#each tage as d (d)}
				{@const e = store.eintrag(d, mahlzeit)}
				{@const alt = e?.rezept ? store.gericht(e.rezept) : undefined}
				<li>
					<button type="button" onclick={() => einplanen(d)}>
						<b>{d === heute() ? 'Heute' : d === addDays(heute(), 1) ? 'Morgen' : kurz(d)}</b>
						<span class="muted">{alt ? `ersetzt: ${alt.name}` : 'frei'}</span>
					</button>
				</li>
			{/each}
		</ul>
	</Sheet>
{/if}

<style>
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 16px;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-weight: 700;
		text-decoration: none;
	}
	.back :global(svg) {
		width: 20px;
		height: 20px;
	}
	.head .pic {
		max-width: 440px;
		margin: 0 auto 20px;
	}
	.context {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		border-radius: 999px;
		background: var(--terra-soft);
		color: var(--terra-ink);
		font-weight: 700;
		font-size: 14px;
	}
	.context :global(svg) {
		width: 16px;
		height: 16px;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		color: var(--terra-ink);
		font-weight: 700;
		font-size: 15px;
	}
	.meta span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.meta :global(svg) {
		width: 17px;
		height: 17px;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin: 20px 0 10px;
	}
	.switches {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 14px;
	}
	.note {
		color: var(--muted);
	}
	.slots {
		margin-top: 18px;
	}
	.nutri {
		padding: 16px;
		margin: 24px 0;
	}
	.nutri h2 {
		margin: 0 0 12px;
		font-size: 19px;
	}
	.nutri dl {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
		gap: 8px;
		margin: 0 0 12px;
	}
	.nutri dl div {
		background: var(--surface-2);
		border-radius: 12px;
		padding: 8px 12px;
	}
	.nutri dl div.warn {
		background: var(--warn-soft);
	}
	dt {
		font-size: 12px;
		font-weight: 700;
		color: var(--muted);
	}
	dd {
		margin: 0;
		font-weight: 800;
		font-size: 18px;
	}
	dd small {
		font-size: 13px;
		color: var(--muted);
		font-weight: 700;
	}
	.stoffe {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
	}
	.gdm {
		border-radius: 12px;
		padding: 10px 12px;
		background: var(--warn-soft);
		margin-bottom: 10px;
	}
	.gdm.ok {
		background: var(--sage-soft);
	}
	.gdm p {
		display: flex;
		gap: 8px;
		margin: 0;
		font-weight: 700;
	}
	.gdm :global(svg) {
		flex: none;
		width: 18px;
		height: 18px;
		margin-top: 3px;
	}
	.gdm ul {
		margin: 6px 0 0 26px;
		padding: 0;
	}
	h2 .small {
		font-family: var(--body);
		font-weight: 600;
	}
	.items {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.items li {
		display: grid;
		grid-template-columns: 100px 1fr;
		gap: 12px;
		padding: 9px 0;
		border-bottom: 1px solid var(--line);
	}
	.tips {
		display: grid;
		gap: 12px;
		margin-top: 28px;
	}
	.tip {
		display: grid;
		grid-template-columns: 26px 1fr;
		gap: 12px;
		padding: 14px;
		border-radius: var(--radius);
		background: var(--surface-2);
	}
	.tip :global(svg) {
		width: 24px;
		height: 24px;
		color: var(--terra-ink);
	}
	.tip h3 {
		font-size: 17px;
		margin-bottom: 4px;
	}
	.tip p {
		margin: 0;
	}
	.plan-cta {
		margin-top: 28px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 10px;
	}
	.days {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.days button {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
		padding: 12px 6px;
		border: 0;
		border-bottom: 1px solid var(--line);
		background: none;
		text-align: left;
	}
	.days button:hover {
		background: var(--surface-2);
	}
	.days .muted {
		font-size: 14px;
		text-align: right;
	}
</style>
