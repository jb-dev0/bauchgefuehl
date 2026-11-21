<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';
	import Stepper from '#lib/components/Stepper.svelte';
	import Switch from '#lib/components/Switch.svelte';
	import SyncStatus from '#lib/components/SyncStatus.svelte';
	import {
		GRENZEN,
		KH_STANDARD,
		MAHLZEITEN,
		type Einstellungen
	} from '#lib/logic/einstellungen.ts';
	import { be } from '#lib/logic/format.ts';
	import { store } from '#lib/store.svelte.ts';

	const s = $derived(store.einstellungen);
	const set = (patch: Partial<Einstellungen>) => store.setEinstellungen(patch);

	// Stepper arbeiten mit bind:value – lokale Kopien, die bei Änderung gespeichert werden
	let erwachsene = $state(store.einstellungen.erwachsene);
	let kinder = $state(store.einstellungen.kinder);
	let mittag = $state(store.einstellungen.mittag);
	let snacks = $state(store.einstellungen.snacks);
	let fisch = $state(store.einstellungen.woche.fisch);
	let fleisch = $state(store.einstellungen.woche.fleisch);
	let kh = $state({ ...store.einstellungen.kh });

	// Änderungen von anderen Geräten übernehmen
	$effect(() => {
		erwachsene = s.erwachsene;
		kinder = s.kinder;
		mittag = s.mittag;
		snacks = s.snacks;
		fisch = s.woche.fisch;
		fleisch = s.woche.fleisch;
		kh = { ...s.kh };
	});
	$effect(() => {
		const next = {
			erwachsene,
			kinder,
			mittag,
			snacks,
			woche: { fisch, fleisch: Math.min(fleisch, 7 - fisch) },
			kh: { ...kh }
		};
		const cur = $state.snapshot(store.einstellungen);
		if (
			JSON.stringify(next) !==
			JSON.stringify({
				erwachsene: cur.erwachsene,
				kinder: cur.kinder,
				mittag: cur.mittag,
				snacks: cur.snacks,
				woche: cur.woche,
				kh: cur.kh
			})
		)
			set(next);
	});

	const veggie = $derived(7 - s.woche.fisch - s.woche.fleisch);

	/* Teilen */
	let kopiert = $state(false);
	let link = $state('');
	let beitretenFehler = $state('');
	let name = $state(store.haushaltName);

	async function teilen() {
		const url = store.teilenLink;
		if (navigator.share) {
			await navigator
				.share({ title: 'Bauchgefühl', text: 'Unser gemeinsamer Essensplan:', url })
				.catch(() => {});
		} else kopieren();
	}
	async function kopieren() {
		await navigator.clipboard.writeText(store.teilenLink);
		kopiert = true;
		setTimeout(() => (kopiert = false), 2500);
	}
	async function beitreten(e: SubmitEvent) {
		e.preventDefault();
		beitretenFehler = '';
		const key = link.trim().split('#').pop()?.trim() ?? '';
		if (!/^[a-z0-9]{24,64}$/.test(key)) {
			beitretenFehler = 'Das sieht nicht nach einem Bauchgefühl-Link aus.';
			return;
		}
		location.href = resolve('/beitreten') + '#' + key;
	}
	async function verlassen() {
		if (
			!confirm(
				'Diesen Haushalt auf diesem Gerät verlassen? Der Plan bleibt hier erhalten, wird aber nicht mehr mit den anderen geteilt.'
			)
		)
			return;
		await store.verlassen();
	}
	function nameSpeichern() {
		if (name === store.haushaltName) return;
		store.haushaltName = name;
		store.setEinstellungen({});
	}
</script>

<svelte:head>
	<title>Familie & Einstellungen – Bauchgefühl</title>
</svelte:head>

<h1>Familie & Einstellungen</h1>
<p class="lede">Gilt für alle Geräte im Haushalt.</p>

<section class="card">
	<h2><Icon name="users" />Wer isst mit?</h2>
	<div class="rows">
		<div class="row">
			<span>Erwachsene</span>
			<Stepper
				bind:value={erwachsene}
				min={GRENZEN.erwachsene[0]}
				max={GRENZEN.erwachsene[1]}
				label="Erwachsene"
				text={(n) => `${n} ${n === 1 ? 'Person' : 'Personen'}`}
			/>
		</div>
		<div class="row">
			<span>Kinder <small>zählen als halbe Portion</small></span>
			<Stepper
				bind:value={kinder}
				min={GRENZEN.kinder[0]}
				max={GRENZEN.kinder[1]}
				label="Kinder"
				text={(n) => (n ? `${n} ${n === 1 ? 'Kind' : 'Kinder'}` : 'keine')}
			/>
		</div>
		<div class="row">
			<span
				>Fürs Mittag mitkochen <small>Portionen, die abends für den nächsten Tag dazukommen</small
				></span
			>
			<Stepper
				bind:value={mittag}
				min={GRENZEN.mittag[0]}
				max={GRENZEN.mittag[1]}
				label="Mittagsportionen"
				text={(n) => (n ? `${n} ${n === 1 ? 'Portion' : 'Portionen'}` : 'keine')}
			/>
		</div>
		<div class="row">
			<span>Snacks <small>Portionen pro Zwischenmahlzeit</small></span>
			<Stepper
				bind:value={snacks}
				min={GRENZEN.snacks[0]}
				max={GRENZEN.snacks[1]}
				label="Snackportionen"
				text={(n) => `${n} ${n === 1 ? 'Portion' : 'Portionen'}`}
			/>
		</div>
	</div>
</section>

<section class="card">
	<h2><Icon name="heart" />Ernährung</h2>
	<div class="switches">
		<Switch
			checked={s.veg}
			label="Vegetarisch"
			hint="Fleisch und Fisch werden überall ersetzt"
			onchange={(v) => set({ veg: v })}
		/>
		<Switch
			checked={s.tm}
			label="Thermomix"
			hint="Rezepte zeigen die Thermomix-Fassung"
			onchange={(v) => set({ tm: v })}
		/>
		<Switch
			checked={s.gdm}
			label="Schwangerschaftsdiabetes"
			hint="Grenzen für Kohlenhydrate pro Mahlzeit"
			onchange={(v) => set({ gdm: v })}
		/>
	</div>
	{#if s.gdm}
		<div class="gdm">
			<p class="small">
				Höchstens so viele Kohlenhydrate pro Mahlzeit (für dich). Die Startwerte sind übliche
				Richtwerte – stell sie auf die Vorgaben deiner Diabetesberatung ein.
			</p>
			<div class="rows">
				{#each MAHLZEITEN.filter((m) => m.id !== 'snack2') as m (m.id)}
					{@const k = m.kategorie}
					<div class="row">
						<span>{k === 'snack' ? 'Snacks' : m.label}</span>
						<Stepper
							bind:value={kh[k]}
							min={GRENZEN.kh[0]}
							max={GRENZEN.kh[1]}
							step={5}
							label={`KH ${m.label}`}
							text={(n) => `${n} g · ${be(n)} BE`}
						/>
					</div>
				{/each}
			</div>
			<button type="button" class="btn small ghost" onclick={() => (kh = { ...KH_STANDARD })}
				>Startwerte</button
			>
		</div>
	{/if}
</section>

<section class="card">
	<h2><Icon name="plan" />Wochenplan</h2>
	<p class="small muted">
		So verteilt der Vorschlag die Abendessen in jeder Woche. Fleisch ist meist Geflügel.
	</p>
	<div class="rows">
		<div class="row">
			<span>Fisch <small>1–2× pro Woche wird in der Schwangerschaft empfohlen</small></span>
			<Stepper
				bind:value={fisch}
				min={0}
				max={7}
				label="Fischtage"
				text={(n) => `${n}× pro Woche`}
			/>
		</div>
		<div class="row">
			<span>Fleisch</span>
			<Stepper
				bind:value={fleisch}
				min={0}
				max={7 - fisch}
				label="Fleischtage"
				text={(n) => `${n}× pro Woche`}
			/>
		</div>
		<div class="row">
			<span>Vegetarisch</span>
			<strong>{veggie}× pro Woche</strong>
		</div>
	</div>
	<div class="switches">
		<Switch
			checked={s.rind}
			label="Ab und zu Rind"
			hint="höchstens einmal in zwei Wochen"
			onchange={(v) => set({ rind: v })}
		/>
	</div>
	<h3>Welche Mahlzeiten planen?</h3>
	<div class="switches">
		{#each MAHLZEITEN as m (m.id)}
			<Switch
				checked={s.mahlzeiten[m.id]}
				label={m.label}
				onchange={(v) => set({ mahlzeiten: { ...s.mahlzeiten, [m.id]: v } })}
			/>
		{/each}
	</div>
</section>

<section class="card">
	<h2><Icon name="share" />Gemeinsam planen</h2>
	<p class="small">
		Plan, Einkaufsliste und eigene Rezepte liegen im Haushalt auf eurem Server. Schick den Link an
		alle, die mitplanen sollen – wer ihn öffnet, sieht und ändert dasselbe. Ohne Anmeldung, also den
		Link nur an Menschen geben, denen du vertraust.
	</p>
	<p><SyncStatus /></p>
	{#if store.fehler}<p class="small warn">{store.fehler}</p>{/if}
	{#if store.haushalt}
		<label class="field">
			<span>Name des Haushalts</span>
			<input
				class="input"
				bind:value={name}
				onblur={nameSpeichern}
				placeholder="z. B. Familie Sonnenschein"
			/>
		</label>
		<div class="buttons">
			<button type="button" class="btn" onclick={teilen}><Icon name="share" />Link teilen</button>
			<button type="button" class="btn ghost" onclick={kopieren}
				><Icon name="copy" />{kopiert ? 'Kopiert!' : 'Link kopieren'}</button
			>
		</div>
	{:else}
		<p class="small muted">
			Sobald eine Verbindung zum Server besteht, wird ein Haushalt angelegt.
		</p>
		<button type="button" class="btn small" onclick={() => store.sync()}>Jetzt verbinden</button>
	{/if}

	<form class="join" onsubmit={beitreten}>
		<label class="field">
			<span>Einem anderen Haushalt beitreten</span>
			<input class="input" bind:value={link} placeholder="Link hier einfügen" />
		</label>
		{#if beitretenFehler}<p class="small warn">{beitretenFehler}</p>{/if}
		<button type="submit" class="btn small ghost">Beitreten</button>
	</form>
	{#if store.haushalt}
		<button type="button" class="link" onclick={verlassen}
			>Haushalt auf diesem Gerät verlassen</button
		>
	{/if}
</section>

<p class="small muted fuss">
	Bauchgefühl ersetzt keine ärztliche Beratung. Nährwerte sind Schätzungen aus einer
	Nährwerttabelle. Mehr dazu unter <a href={resolve('/wissen')}>Wissen</a>.
</p>

<style>
	section {
		padding: 16px;
		margin-top: 18px;
	}
	h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0 0 12px;
		font-size: 21px;
	}
	h2 :global(svg) {
		width: 24px;
		height: 24px;
		color: var(--terra-ink);
	}
	h3 {
		margin: 18px 0 8px;
		font-size: 17px;
	}
	.rows {
		display: grid;
		gap: 10px;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px 16px;
		padding: 6px 0;
		border-bottom: 1px solid var(--line);
	}
	.row:last-child {
		border-bottom: 0;
	}
	.row > span {
		font-weight: 700;
		display: grid;
	}
	.row small {
		font-weight: 400;
		color: var(--muted);
		font-size: 13px;
	}
	.switches {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}
	.gdm {
		margin-top: 14px;
		padding: 12px;
		border-radius: 12px;
		background: var(--surface-2);
	}
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.join {
		margin-top: 22px;
	}
	.link {
		margin-top: 16px;
		border: 0;
		background: none;
		padding: 0;
		color: var(--muted);
		text-decoration: underline;
		font-size: 14px;
	}
	.warn {
		color: var(--warn);
		font-weight: 700;
	}
	.fuss {
		margin-top: 24px;
	}
</style>
