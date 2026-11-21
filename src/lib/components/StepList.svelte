<script lang="ts">
	import type { StepGroup } from '../logic/rezept.ts';

	let { steps }: { steps: StepGroup[] } = $props();
	const list = $derived(steps.filter((s) => s.lines.length));
</script>

<ol class="steps">
	{#each list as st, i (i)}
		<li>
			<span class="num">{i + 1}</span>
			<div>
				{#if list.length > 1 || st.title !== 'Zubereitung'}<h3>{st.title}</h3>{/if}
				{#each st.lines as line, j (j)}<p>{line}</p>{/each}
			</div>
		</li>
	{/each}
</ol>

<style>
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 18px;
	}
	li {
		display: grid;
		grid-template-columns: 34px 1fr;
		gap: 12px;
	}
	.num {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--terra);
		color: var(--on-accent);
		display: grid;
		place-items: center;
		font-weight: 800;
		font-size: 15px;
		margin-top: 1px;
	}
	h3 {
		font-size: 18px;
		margin: 3px 0 6px;
	}
	p {
		margin: 0 0 6px;
	}
	@media print {
		.num {
			border: 1px solid #000;
			background: none;
			color: #000;
		}
	}
</style>
