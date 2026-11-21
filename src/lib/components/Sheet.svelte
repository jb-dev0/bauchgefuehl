<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	/** Unteres Blatt (auf großen Bildschirmen ein Dialog in der Mitte). */
	let {
		open = $bindable(false),
		title,
		children
	}: { open: boolean; title: string; children: Snippet } = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (open = false)}
	onclick={(e) => {
		if (e.target === dialog) open = false;
	}}
	aria-label={title}
>
	<div class="inner">
		<header>
			<h2>{title}</h2>
			<button type="button" class="close" aria-label="Schließen" onclick={() => (open = false)}
				><Icon name="x" /></button
			>
		</header>
		{#if open}{@render children()}{/if}
	</div>
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: 560px;
		max-height: min(88dvh, 820px);
		margin: auto auto 0;
		padding: 0;
		border: 0;
		border-radius: 24px 24px 0 0;
		background: var(--bg);
		color: var(--ink);
		box-shadow: var(--shadow);
	}
	@media (min-width: 640px) {
		dialog {
			margin: auto;
			border-radius: 24px;
		}
	}
	dialog::backdrop {
		background: rgb(29 23 19 / 0.45);
	}
	dialog[open] {
		animation: up 0.22s ease-out;
	}
	@keyframes up {
		from {
			transform: translateY(24px);
			opacity: 0;
		}
	}
	.inner {
		padding: 8px 16px calc(20px + env(safe-area-inset-bottom));
	}
	header {
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 0 10px;
		background: var(--bg);
	}
	h2 {
		margin: 0;
		font-size: 21px;
	}
	.close {
		flex: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 0;
		background: var(--surface-2);
		display: grid;
		place-items: center;
	}
	.close :global(svg) {
		width: 20px;
		height: 20px;
	}
</style>
