<script lang="ts">
	import { downloadPdf, type PdfSpec } from '../pdf.ts';
	import Icon from './Icon.svelte';

	let { spec, label = 'Als PDF speichern' }: { spec: () => PdfSpec; label?: string } = $props();
	let message = $state('');
	let busy = $state(false);

	async function exportPdf() {
		busy = true;
		message = 'PDF wird erstellt …';
		try {
			await downloadPdf(spec());
			message = '';
		} catch {
			message = 'Das PDF konnte nicht erstellt werden. Bitte noch einmal versuchen.';
		} finally {
			busy = false;
		}
	}
</script>

<div class="actions no-print">
	<button type="button" class="btn" disabled={busy} onclick={exportPdf}>
		<Icon name="pdf" stroke={2} />{label}
	</button>
	<button type="button" class="btn ghost" onclick={() => window.print()}>
		<Icon name="print" stroke={2} />Drucken
	</button>
</div>
<p class="msg no-print" role="status">{message}</p>

<style>
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 28px 0 0;
	}
	.msg {
		font-size: 14px;
		color: var(--muted);
		min-height: 1.2em;
		margin: 8px 0 0;
	}
</style>
