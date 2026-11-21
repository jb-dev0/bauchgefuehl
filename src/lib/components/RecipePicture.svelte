<script lang="ts">
	import { blobPath, blobs, farben } from '../logic/art.ts';
	import { berechne, type Gericht } from '../logic/gericht.ts';
	import { photoFor } from '../photos.ts';
	import { store } from '../store.svelte.ts';

	/** Foto des Rezepts, sonst ein gezeichneter Teller aus den Zutatenfarben. */
	let {
		gericht,
		sizes = '96px',
		eager = false,
		round = false,
		alt = ''
	}: {
		gericht: Gericht;
		sizes?: string;
		eager?: boolean;
		round?: boolean;
		alt?: string;
	} = $props();

	const photo = $derived(gericht.eigen ? undefined : photoFor(gericht.id));
	const upload = $derived(
		gericht.eigenes?.foto
			? store.fotoUrl(gericht.eigenes, sizes === '96px' ? '160x160' : '480x480')
			: ''
	);
	const colors = $derived(
		photo || upload ? [] : farben(berechne(gericht, undefined, { veg: false, tm: false }).items)
	);
	const parts = $derived(blobs(gericht.id, colors));
</script>

<div class="pic" class:round>
	{#if photo}
		<enhanced:img
			src={photo}
			{alt}
			{sizes}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
		/>
	{:else if upload}
		<img src={upload} {alt} loading={eager ? 'eager' : 'lazy'} />
	{:else}
		<svg
			viewBox="0 0 100 100"
			role={alt ? 'img' : undefined}
			aria-label={alt || undefined}
			aria-hidden={alt ? undefined : true}
		>
			<circle cx="50" cy="50" r="48" class="rim" />
			<circle cx="50" cy="50" r="41" class="plate" />
			{#each parts as b, i (i)}
				<path transform="translate({b.x} {b.y})" d={blobPath(b.r, b.rot)} fill={b.color} />
			{/each}
		</svg>
	{/if}
</div>

<style>
	.pic {
		width: 100%;
		aspect-ratio: 1;
	}
	.pic :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius);
		background: var(--surface-2);
	}
	.round :global(img) {
		border-radius: 50%;
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.rim {
		fill: var(--surface-2);
	}
	.plate {
		fill: var(--surface);
		stroke: var(--line);
		stroke-width: 1;
	}
</style>
