<script lang="ts">
	let {
		value = $bindable(),
		min,
		max,
		step = 1,
		label,
		text
	}: {
		value: number;
		min: number;
		max: number;
		step?: number;
		label: string;
		/** Anzeige des Werts, z. B. „2 Erwachsene“. */
		text: (n: number) => string;
	} = $props();
</script>

<div class="stepper" role="group" aria-label={label}>
	<button
		type="button"
		aria-label="{label}: weniger"
		disabled={value <= min}
		onclick={() => (value = Math.max(min, Math.round((value - step) * 100) / 100))}>−</button
	>
	<span aria-live="polite">{text(value)}</span>
	<button
		type="button"
		aria-label="{label}: mehr"
		disabled={value >= max}
		onclick={() => (value = Math.min(max, Math.round((value + step) * 100) / 100))}>+</button
	>
</div>

<style>
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: var(--surface);
		border: 1.5px solid var(--line);
		border-radius: 999px;
		padding: 3px;
	}
	button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 0;
		background: transparent;
		font-size: 22px;
		line-height: 1;
		color: var(--ink);
	}
	button:hover:not(:disabled) {
		background: var(--terra-soft);
	}
	button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	span {
		min-width: 8.5em;
		text-align: center;
		font-size: 15px;
		font-weight: 700;
	}
</style>
