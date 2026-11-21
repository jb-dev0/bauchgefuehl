<script lang="ts">
	import '@fontsource-variable/fraunces/soft.css';
	import '@fontsource-variable/nunito-sans/wght.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import TabBar from '#lib/components/TabBar.svelte';
	import { store } from '#lib/store.svelte.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	store.load();
	onMount(() => store.start());
	$effect(() => {
		const json = store.serialize();
		if (store.loaded) store.save(json);
	});
</script>

<main class="wrap">
	{@render children()}
</main>
<TabBar />
