<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { store } from '#lib/store.svelte.ts';

	/** Teilen-Link: /beitreten#<schlüssel>. Der Schlüssel steht im Hash, damit er nicht in Server-Logs landet. */
	let schluessel = $state('');
	let name = $state('');
	let status = $state<'pruefe' | 'gefunden' | 'falsch' | 'fehler' | 'schon' | 'fertig'>('pruefe');
	let fehler = $state('');

	onMount(async () => {
		schluessel = location.hash.slice(1).trim();
		if (!/^[a-z0-9]{24,64}$/.test(schluessel)) {
			status = 'falsch';
			return;
		}
		if (store.haushalt?.schluessel === schluessel) {
			status = 'schon';
			return;
		}
		try {
			const h = await store.pruefen(schluessel);
			if (!h) status = 'falsch';
			else {
				name = h.name;
				status = 'gefunden';
			}
		} catch (e) {
			fehler = e instanceof Error ? e.message : String(e);
			status = 'fehler';
		}
	});

	async function bestaetigen() {
		const ok = await store.beitreten(schluessel);
		if (ok) {
			history.replaceState(null, '', location.pathname);
			status = 'fertig';
			setTimeout(() => goto(resolve('/')), 900);
		} else status = 'falsch';
	}
</script>

<svelte:head>
	<title>Beitreten – Bauchgefühl</title>
</svelte:head>

<h1>Gemeinsam planen</h1>

<div class="card box">
	{#if status === 'pruefe'}
		<p>Link wird geprüft …</p>
	{:else if status === 'gefunden'}
		<p>
			Du wurdest zum Essensplan {name ? `„${name}“` : 'eines Haushalts'} eingeladen. Danach seht ihr denselben
			Plan, dieselbe Einkaufsliste und dieselben eigenen Rezepte.
		</p>
		<p class="small muted">
			Der bisherige Plan auf diesem Gerät wird durch den gemeinsamen ersetzt. Deine eigenen Rezepte
			nimmst du mit.
		</p>
		<button type="button" class="btn" onclick={bestaetigen}><Icon name="users" />Beitreten</button>
	{:else if status === 'fertig'}
		<p><b>Geschafft!</b> Ihr plant jetzt gemeinsam.</p>
	{:else if status === 'schon'}
		<p>Dieses Gerät gehört schon zu diesem Haushalt.</p>
		<a class="btn" href={resolve('/')}>Zum Plan</a>
	{:else if status === 'fehler'}
		<p>Der Server ist gerade nicht erreichbar ({fehler}). Versuch es gleich noch einmal.</p>
		<button type="button" class="btn" onclick={() => location.reload()}>Nochmal</button>
	{:else}
		<p>Dieser Link ist ungültig oder der Haushalt existiert nicht mehr.</p>
		<a class="btn" href={resolve('/')}>Zum Plan</a>
	{/if}
</div>

<style>
	.box {
		padding: 18px;
		margin-top: 20px;
	}
</style>
