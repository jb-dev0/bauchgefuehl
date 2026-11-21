<script lang="ts" module>
	const PATHS = {
		plan: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
		book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/><path d="M9 7.5h6"/>',
		cart: '<path d="M3 4h2.5l2.2 11h10.6l2-7.5H6.6"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
		leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-6.5 9.5-8"/>',
		settings:
			'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
		clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
		oven: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17"/><rect x="7" y="12" width="10" height="5" rx="1"/><path d="M7 6.5h.01M10 6.5h.01"/>',
		back: '<path d="M15 5l-7 7 7 7"/>',
		next: '<path d="M9 5l7 7-7 7"/>',
		plus: '<path d="M12 5v14M5 12h14"/>',
		dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/>',
		trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
		check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
		x: '<path d="M6 6l12 12M18 6L6 18"/>',
		share:
			'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4"/>',
		copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
		pdf: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
		print:
			'<path d="M7 9V4h10v5"/><path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/>',
		fish: '<path d="M3 12c3-4.5 8-6 12-4 2 1 3.5 2.5 4.5 4-1 1.5-2.5 3-4.5 4-4 2-9 .5-12-4z"/><path d="M3 12l-1-3M3 12l-1 3"/><circle cx="15.5" cy="11" r=".8" fill="currentColor"/>',
		chicken:
			'<path d="M14.5 4.5a5 5 0 0 1 3.5 8.6l-4 4-4-4 4.5-4.5"/><path d="M14 17l-5.5 2.5c-1 .5-2-.5-1.5-1.5L9.5 12.5"/><path d="M10 13l4 4"/>',
		veggie:
			'<path d="M7 21c-2-5 0-11 5-13 2.5 2 4 6 2.5 9.5S9.5 22 7 21z"/><path d="M12 8c0-2 1-4 3-5M12 8c-1-2-3-3-5-3"/>',
		box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
		child:
			'<circle cx="12" cy="6" r="2.8"/><path d="M7 21v-4.5a5 5 0 0 1 10 0V21M5 12l3 2M19 12l-3 2"/>',
		tm: '<path d="M6 8h12l-1.5 11a2 2 0 0 1-2 1.5h-5a2 2 0 0 1-2-1.5z"/><path d="M9 8V5.5h6V8M18 10.5h2v4h-2.5"/>',
		cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.5A3.8 3.8 0 0 1 17.5 18z"/>',
		offline:
			'<path d="M7 18a4.5 4.5 0 0 1-.6-9M10 5.3A6 6 0 0 1 17.9 10.5 3.8 3.8 0 0 1 19.8 16.8M4 4l16 16"/>',
		edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
		search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
		camera:
			'<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3L9.5 4.5h5L16.2 7h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/>',
		heart:
			'<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z"/>',
		drop: '<path d="M12 3.5s6 6.5 6 10.5a6 6 0 0 1-12 0c0-4 6-10.5 6-10.5z"/>',
		info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
		sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
		apple:
			'<path d="M12 7.5c-1.5-1-5.5-1.5-6.5 2.5-1 4 1.5 10 4 10 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c2.5 0 5-6 4-10-1-4-5-3.5-6.5-2.5z"/><path d="M12 7.5c0-2 1-3.5 2.5-4"/>',
		users:
			'<circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20"/><circle cx="17" cy="10" r="2.2"/><path d="M16 14.5h1.5A3.5 3.5 0 0 1 21 18v2"/>'
	} as const;
	export type IconName = keyof typeof PATHS;
</script>

<script lang="ts">
	let { name, stroke = 1.8, size }: { name: IconName; stroke?: number; size?: number } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	aria-hidden="true"
	focusable="false"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	width={size}
	height={size}
>
	{@html PATHS[name]}
</svg>
