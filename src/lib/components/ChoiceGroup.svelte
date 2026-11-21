<script lang="ts">
	let {
		legend,
		hint,
		choices,
		selected,
		onpick
	}: {
		legend: string;
		hint?: string;
		choices: { id: string; label: string; badge?: string }[];
		selected: string[];
		onpick: (id: string) => void;
	} = $props();
</script>

<fieldset>
	<legend
		>{legend}{#if hint}<span>{hint}</span>{/if}</legend
	>
	<div class="chips">
		{#each choices as c (c.id)}
			{@const on = selected.includes(c.id)}
			<button type="button" class="chip" class:on aria-pressed={on} onclick={() => onpick(c.id)}>
				{c.label}{#if c.badge}<small>{c.badge}</small>{/if}
			</button>
		{/each}
	</div>
</fieldset>

<style>
	fieldset {
		border: 0;
		padding: 0;
		margin: 0 0 18px;
		min-width: 0;
	}
	legend {
		padding: 0;
		margin: 0 0 8px;
		font-weight: 800;
		font-size: 15px;
	}
	legend span {
		font-weight: 400;
		color: var(--muted);
		font-size: 14px;
		margin-left: 8px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 42px;
		padding: 8px 15px;
		border-radius: 999px;
		border: 1.5px solid var(--line);
		background: var(--surface);
		font-size: 15px;
		line-height: 1.2;
		transition:
			border-color 0.15s,
			background 0.15s;
	}
	.chip:hover {
		border-color: var(--terra);
	}
	.chip.on {
		border-color: var(--terra);
		background: var(--terra-soft);
		color: var(--terra-ink);
		font-weight: 700;
	}
	small {
		font-size: 12px;
		color: var(--muted);
		font-weight: 600;
	}
</style>
