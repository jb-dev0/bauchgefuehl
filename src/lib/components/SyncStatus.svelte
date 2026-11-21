<script lang="ts">
	import { resolve } from '$app/paths';
	import { store } from '../store.svelte.ts';
	import Icon from './Icon.svelte';

	const text = $derived.by(() => {
		const offen = store.pending.length;
		switch (store.status) {
			case 'verbunden':
				return offen ? 'Wird abgeglichen …' : 'Abgeglichen';
			case 'verbinde':
				return 'Verbinde …';
			case 'offline':
				return offen ? `Offline · ${offen} Änderung${offen === 1 ? '' : 'en'} warten` : 'Offline';
			case 'fehler':
				return 'Abgleich gestört';
			default:
				return 'Nur auf diesem Gerät';
		}
	});
	const ok = $derived(store.status === 'verbunden' && !store.pending.length);
</script>

<a class="sync no-print" class:ok href={resolve('/einstellungen')} title={store.fehler || text}>
	<Icon name={store.status === 'offline' || store.status === 'fehler' ? 'offline' : 'cloud'} />
	<span>{text}</span>
</a>

<style>
	.sync {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 999px;
		background: var(--surface-2);
		color: var(--muted);
		font-size: 13px;
		font-weight: 700;
		text-decoration: none;
	}
	.sync.ok {
		background: var(--sage-soft);
		color: var(--sage-ink);
	}
	.sync :global(svg) {
		width: 16px;
		height: 16px;
	}
</style>
