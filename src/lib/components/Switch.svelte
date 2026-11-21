<script lang="ts">
	let {
		checked = $bindable(),
		label,
		hint,
		onchange
	}: { checked: boolean; label: string; hint?: string; onchange?: (v: boolean) => void } = $props();
</script>

<button
	type="button"
	class="switch"
	role="switch"
	aria-checked={checked}
	onclick={() => {
		checked = !checked;
		onchange?.(checked);
	}}
>
	<span class="track"><span class="knob"></span></span>
	<span class="text">
		<span class="label">{label}</span>
		{#if hint}<span class="hint">{hint}</span>{/if}
	</span>
</button>

<style>
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		background: var(--surface);
		border: 1.5px solid var(--line);
		border-radius: 999px;
		padding: 7px 16px 7px 7px;
		min-height: 48px;
		text-align: left;
	}
	.track {
		width: 44px;
		height: 26px;
		border-radius: 13px;
		background: var(--line);
		position: relative;
		transition: background 0.2s;
		flex: none;
	}
	.knob {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
		transition: transform 0.2s;
	}
	[aria-checked='true'] .track {
		background: var(--sage);
	}
	[aria-checked='true'] .knob {
		transform: translateX(18px);
	}
	.text {
		display: grid;
	}
	.label {
		font-size: 15px;
		font-weight: 700;
	}
	.hint {
		font-size: 13px;
		color: var(--muted);
	}
</style>
