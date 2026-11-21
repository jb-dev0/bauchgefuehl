<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '#lib/components/Icon.svelte';
	import Stepper from '#lib/components/Stepper.svelte';
	import Switch from '#lib/components/Switch.svelte';
	import { KATEGORIEN } from '#lib/data/rezepte/index.ts';
	import type { Art, Kategorie, Nutrition } from '#lib/data/types.ts';
	import {
		katalogName,
		neuesRezept,
		parseZutat,
		zutatText,
		type EigenesRezept
	} from '#lib/logic/eigene.ts';
	import { berechne, gerichtAusEigenem } from '#lib/logic/gericht.ts';
	import { ART } from '#lib/logic/text.ts';
	import { store } from '#lib/store.svelte.ts';

	const paramId = $derived(page.params.id ?? 'neu');
	const vorhanden = $derived(paramId !== 'neu' ? store.eigene[paramId] : undefined);

	let r = $state<EigenesRezept>(neuesRezept(store.neueRezeptId()));
	let zutaten = $state('');
	let schritte = $state('');
	let tmSchritte = $state('');
	let manuell = $state(false);
	let nw = $state<Nutrition>({ kcal: 0, protein: 0, fett: 0, kh: 0, bst: 0 });
	let geladen = $state('');

	$effect(() => {
		// Beim Öffnen einmal die gespeicherten Werte übernehmen
		if (geladen === paramId) return;
		const e = vorhanden;
		if (paramId !== 'neu' && !e) return;
		r = e
			? ($state.snapshot(e) as EigenesRezept)
			: neuesRezept(store.neueRezeptId(), (page.url.searchParams.get('k') as Kategorie) ?? 'abend');
		zutaten = r.zutaten.map(zutatText).join('\n');
		schritte = r.schritte.join('\n\n');
		tmSchritte = r.tmSchritte.join('\n\n');
		manuell = !!r.naehrwerte;
		if (r.naehrwerte) nw = { ...r.naehrwerte };
		geladen = paramId;
	});

	const zeilen = $derived(
		zutaten
			.split('\n')
			.map((z) => parseZutat(z))
			.filter((z) => z !== null)
	);
	const absatz = (t: string) =>
		t
			.split(/\n\s*\n|\n(?=\d+[.)]\s)/)
			.map((x) =>
				x
					.replace(/^\d+[.)]\s*/, '')
					.replace(/\s*\n\s*/g, ' ')
					.trim()
			)
			.filter(Boolean);

	const entwurf = $derived<EigenesRezept>({
		...r,
		zutaten: zeilen,
		schritte: absatz(schritte),
		tmSchritte: absatz(tmSchritte),
		naehrwerte: manuell ? { ...nw } : null
	});
	const vorschau = $derived(
		berechne(gerichtAusEigenem(entwurf), undefined, { veg: false, tm: false })
	);

	let foto = $state<File | null>(null);
	let fotoFehler = $state('');
	let busy = $state(false);

	async function verkleinern(file: File): Promise<Blob> {
		const bmp = await createImageBitmap(file);
		const max = 1600;
		const f = Math.min(1, max / Math.max(bmp.width, bmp.height));
		const c = document.createElement('canvas');
		c.width = Math.round(bmp.width * f);
		c.height = Math.round(bmp.height * f);
		c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
		return new Promise((res, rej) =>
			c.toBlob((b) => (b ? res(b) : rej(new Error('Bild'))), 'image/jpeg', 0.85)
		);
	}

	async function speichern(e: SubmitEvent) {
		e.preventDefault();
		if (!entwurf.titel.trim()) return;
		busy = true;
		const id = store.saveEigenes($state.snapshot(entwurf) as EigenesRezept);
		if (foto) {
			try {
				await store.uploadFoto(entwurf.id, await verkleinern(foto));
			} catch {
				fotoFehler =
					'Das Foto konnte nicht hochgeladen werden (Netz?). Das Rezept ist gespeichert.';
				busy = false;
				return;
			}
		}
		busy = false;
		goto(resolve('/rezepte/[id]', { id }));
	}

	async function fotoEntfernen() {
		try {
			await store.uploadFoto(r.id, null);
			r.foto = '';
		} catch {
			fotoFehler = 'Ohne Netz geht das gerade nicht.';
		}
	}

	function loeschen() {
		if (!confirm(`„${r.titel}“ wirklich löschen?`)) return;
		store.deleteEigenes(r.id);
		goto(resolve('/rezepte') + '?k=eigene');
	}

	const arten: (Art | null)[] = [null, 'veggie', 'fisch', 'gefluegel', 'rind'];
</script>

<svelte:head>
	<title>{vorhanden ? 'Rezept bearbeiten' : 'Neues Rezept'} – Bauchgefühl</title>
</svelte:head>

<a
	class="back"
	href={vorhanden
		? resolve('/rezepte/[id]', { id: 'eigen:' + r.id })
		: resolve('/rezepte') + '?k=eigene'}><Icon name="back" stroke={2.4} />Zurück</a
>
<h1>{vorhanden ? 'Rezept bearbeiten' : 'Eigenes Rezept'}</h1>
<p class="lede">Wird mit allen im Haushalt geteilt und lässt sich in den Plan legen.</p>

<form onsubmit={speichern}>
	<label class="field">
		<span>Name</span>
		<input class="input" bind:value={r.titel} required placeholder="z. B. Omas Linsensuppe" />
	</label>

	<fieldset class="field">
		<span>Mahlzeit</span>
		<div class="chips">
			{#each KATEGORIEN as k (k.id)}
				<button
					type="button"
					class="chip"
					aria-pressed={r.kategorie === k.id}
					onclick={() => (r.kategorie = k.id)}>{k.label}</button
				>
			{/each}
		</div>
	</fieldset>

	<label class="field">
		<span>Kurzbeschreibung</span>
		<input class="input" bind:value={r.beschreibung} placeholder="Ein Satz, was es ausmacht" />
	</label>

	<div class="field">
		<span>Mengen gelten für</span>
		<Stepper
			bind:value={r.portionen}
			min={1}
			max={12}
			label="Portionen"
			text={(n) => `${n} ${n === 1 ? 'Portion' : 'Portionen'}`}
		/>
	</div>
	<div class="grid">
		<label class="field">
			<span>Zeit (Min.)</span>
			<input
				class="input"
				type="number"
				min="0"
				max="240"
				inputmode="numeric"
				bind:value={r.minuten}
			/>
		</label>
		<label class="field">
			<span>davon Ofen (Min.)</span>
			<input
				class="input"
				type="number"
				min="0"
				max="240"
				inputmode="numeric"
				bind:value={r.ofen}
			/>
		</label>
	</div>

	<label class="field">
		<span>Zutaten <small>eine pro Zeile, z. B. „200 g Hähnchenbrust“</small></span>
		<textarea class="input" bind:value={zutaten} rows="8"></textarea>
	</label>
	{#if zeilen.length}
		<ul class="erkannt small">
			{#each zeilen as z, i (i)}
				{@const k = katalogName(z.name)}
				<li class:ok={!!k}>
					<Icon name={k ? 'check' : 'info'} />{zutatText(
						z
					)}{#if k && k.toLowerCase() !== z.name.toLowerCase()}<span class="muted">
							→ {k}</span
						>{/if}
					{#if !k}<span class="muted"> – unbekannt, zählt nicht zu den Nährwerten</span>{/if}
				</li>
			{/each}
		</ul>
	{/if}

	<label class="field">
		<span>Zubereitung <small>Schritte durch Leerzeilen trennen</small></span>
		<textarea class="input" bind:value={schritte} rows="8"></textarea>
	</label>

	<label class="field">
		<span>Thermomix-Fassung <small>optional</small></span>
		<textarea class="input" bind:value={tmSchritte} rows="4"></textarea>
	</label>

	<fieldset class="field">
		<span>Eiweißquelle</span>
		<div class="chips">
			{#each arten as a (a)}
				<button type="button" class="chip" aria-pressed={r.art === a} onclick={() => (r.art = a)}
					>{a ? ART[a].label : `automatisch (${ART[vorschau.art].label})`}</button
				>
			{/each}
		</div>
	</fieldset>

	<label class="field">
		<span>Zum Mitnehmen <small>leer lassen, wenn es sich nicht eignet</small></span>
		<textarea
			class="input"
			bind:value={r.mitnehmen}
			rows="2"
			placeholder="z. B. In der Box 2 Min. in der Mikrowelle erhitzen"></textarea>
	</label>
	<label class="field">
		<span>Für die Kleinen</span>
		<textarea class="input" bind:value={r.kind} rows="2"></textarea>
	</label>
	<label class="field">
		<span>Notiz</span>
		<textarea class="input" bind:value={r.notiz} rows="2"></textarea>
	</label>

	<div class="field">
		<Switch
			bind:checked={manuell}
			label="Nährwerte selbst eintragen"
			hint="sonst aus den Zutaten geschätzt"
		/>
	</div>
	{#if manuell}
		<div class="grid nw">
			<label class="field"
				><span>kcal</span><input class="input" type="number" min="0" bind:value={nw.kcal} /></label
			>
			<label class="field"
				><span>Eiweiß g</span><input
					class="input"
					type="number"
					min="0"
					bind:value={nw.protein}
				/></label
			>
			<label class="field"
				><span>KH g</span><input class="input" type="number" min="0" bind:value={nw.kh} /></label
			>
			<label class="field"
				><span>Ballastst. g</span><input
					class="input"
					type="number"
					min="0"
					bind:value={nw.bst}
				/></label
			>
			<label class="field"
				><span>Fett g</span><input
					class="input"
					type="number"
					min="0"
					bind:value={nw.fett}
				/></label
			>
		</div>
		<p class="small muted">Pro Portion.</p>
	{:else if zeilen.length}
		<p class="small muted">
			Geschätzt pro Portion: {vorschau.nutrition.kcal} kcal, {vorschau.nutrition.protein} g Eiweiß,
			{vorschau.nutrition.kh} g Kohlenhydrate, {vorschau.nutrition.bst} g Ballaststoffe{vorschau.unvollstaendig
				? ' (unvollständig)'
				: ''}.
		</p>
	{/if}

	<div class="field">
		<span>Foto</span>
		{#if r.foto}
			<img class="foto" src={store.fotoUrl(r)} alt="" />
			<button type="button" class="btn small ghost" onclick={fotoEntfernen}>Foto entfernen</button>
		{/if}
		<input
			type="file"
			accept="image/*"
			onchange={(e) => (foto = (e.currentTarget as HTMLInputElement).files?.[0] ?? null)}
		/>
		{#if fotoFehler}<p class="small warn">{fotoFehler}</p>{/if}
	</div>

	<div class="buttons">
		<button type="submit" class="btn" disabled={busy || !r.titel.trim()}
			><Icon name="check" />{busy ? 'Speichere …' : 'Speichern'}</button
		>
		{#if vorhanden}
			<button type="button" class="btn ghost" onclick={loeschen}
				><Icon name="trash" />Löschen</button
			>
		{/if}
	</div>
</form>

<style>
	.back {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-weight: 700;
		text-decoration: none;
		margin-bottom: 16px;
	}
	.back :global(svg) {
		width: 20px;
		height: 20px;
	}
	form {
		margin-top: 20px;
	}
	fieldset {
		border: 0;
		padding: 0;
		margin: 0 0 16px;
	}
	.field small {
		font-weight: 400;
		color: var(--muted);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0 12px;
	}
	.grid.nw {
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	}
	.erkannt {
		list-style: none;
		margin: -8px 0 16px;
		padding: 0;
	}
	.erkannt li {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
		color: var(--warn);
	}
	.erkannt li.ok {
		color: var(--sage-ink);
	}
	.erkannt :global(svg) {
		width: 14px;
		height: 14px;
	}
	.foto {
		width: 160px;
		height: 160px;
		object-fit: cover;
		border-radius: var(--radius);
	}
	.buttons {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 10px;
	}
	.warn {
		color: var(--warn);
	}
</style>
