<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Icon, { type IconName } from './Icon.svelte';

	const tabs: {
		href: '/' | '/rezepte' | '/einkauf' | '/wissen' | '/einstellungen';
		label: string;
		icon: IconName;
	}[] = [
		{ href: '/', label: 'Plan', icon: 'plan' },
		{ href: '/rezepte', label: 'Rezepte', icon: 'book' },
		{ href: '/einkauf', label: 'Einkauf', icon: 'cart' },
		{ href: '/wissen', label: 'Wissen', icon: 'leaf' },
		{ href: '/einstellungen', label: 'Familie', icon: 'users' }
	];

	const active = (href: string) => {
		const path = page.url.pathname;
		if (href === '/') return path === '/';
		if (href === '/rezepte') return path.startsWith('/rezepte') || path.startsWith('/eigene');
		return path.startsWith(href);
	};
</script>

<nav class="no-print" aria-label="Bereiche">
	{#each tabs as t (t.href)}
		<a href={resolve(t.href)} aria-current={active(t.href) ? 'page' : undefined}>
			<Icon name={t.icon} /><span>{t.label}</span>
		</a>
	{/each}
</nav>

<style>
	nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		display: flex;
		justify-content: center;
		gap: 2px;
		padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-top: 1px solid var(--line);
	}
	a {
		flex: 1;
		max-width: 110px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 6px 0 4px;
		border-radius: 14px;
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
		text-decoration: none;
	}
	a :global(svg) {
		width: 24px;
		height: 24px;
	}
	a[aria-current='page'] {
		color: var(--terra-ink);
		background: var(--terra-soft);
	}
</style>
