<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { NAEHRSTOFFE } from '#lib/logic/rezept.ts';
	import type { Naehrstoff } from '#lib/data/types.ts';

	const stoffe = Object.entries(NAEHRSTOFFE) as [Naehrstoff, (typeof NAEHRSTOFFE)[Naehrstoff]][];
</script>

<svelte:head>
	<title>Wissen – Bauchgefühl</title>
</svelte:head>

<h1>Was hinter den Rezepten steckt</h1>
<p class="lede">
	Jedes Rezept in Bauchgefühl erfüllt fünf Dinge gleichzeitig: sicher in der Schwangerschaft, ruhig
	für den Blutzucker, gut für ein Kleinkind, schnell gemacht und am nächsten Mittag noch lecker.
</p>

<ul class="pillars">
	<li>
		<Icon name="heart" /><b>Sicher</b><span
			>nichts, was in der Schwangerschaft gemieden werden sollte</span
		>
	</li>
	<li>
		<Icon name="drop" /><b>Blutzucker</b><span
			>Eiweiß, Ballaststoffe und Vollkorn in jeder Mahlzeit</span
		>
	</li>
	<li>
		<Icon name="child" /><b>Kindgerecht</b><span>mild, wenig Salz, nichts zum Verschlucken</span>
	</li>
	<li>
		<Icon name="clock" /><b>Schnell</b><span
			>höchstens 30, meist 20 Minuten – Ofenzeit nicht mitgezählt</span
		>
	</li>
	<li>
		<Icon name="box" /><b>Mitnehmen</b><span>abends mehr kochen, mittags in der Box aufwärmen</span>
	</li>
</ul>

<details open>
	<summary><h2>Sicher essen in der Schwangerschaft</h2></summary>
	<p>Diese Dinge kommen in keinem Rezept vor – die App prüft das bei jedem Rezept automatisch:</p>
	<ul class="list">
		<li>
			<b>Rohes oder nicht durchgegartes Fleisch, Geflügel, Fisch und Eier</b> – wegen Toxoplasmen, Listerien
			und Salmonellen. Eigelb immer fest, Fisch nicht mehr glasig, Hähnchen ohne Rosa.
		</li>
		<li>
			<b>Rohmilchkäse und Weichkäse mit Rinde</b> (Brie, Camembert, Blauschimmel). Feta, Mozzarella, Halloumi,
			Gouda, Hüttenkäse, Quark und Frischkäse aus pasteurisierter Milch sind in Ordnung, Hartkäse wie
			Parmesan und Bergkäse ebenfalls.
		</li>
		<li><b>Geräucherter und gebeizter Fisch</b>, Sushi, rohe Meeresfrüchte und Muscheln.</li>
		<li>
			<b>Thunfisch und große Raubfische</b> (Schwertfisch, Hai, Heilbutt) wegen Quecksilber. Lachs, Seelachs
			und Kabeljau sind gute Wahlen.
		</li>
		<li>
			<b>Leber</b> wegen sehr viel Vitamin A, <b>Süßholz/Lakritz</b>, <b>Alkohol</b> – auch nicht zum
			Kochen.
		</li>
		<li>
			<b>Sprossen, Kresse und vorgeschnittene Salatmischungen</b> – ein Listerien-Risiko. Salat und Kräuter
			selbst gründlich waschen.
		</li>
		<li>
			<b>Koffein</b> kommt in den Rezepten nicht vor. Bis 200 mg am Tag (etwa zwei Tassen Kaffee) gelten
			als unbedenklich.
		</li>
	</ul>
	<p>
		<b>Tiefkühlgemüse und TK-Beeren immer erhitzen</b> – auch für Salate kurz kochen. Kühlschrank auf
		höchstens 5 °C, Reste innerhalb von zwei Stunden kühlen.
	</p>
</details>

<details>
	<summary><h2>Ein ruhiger Blutzucker</h2></summary>
	<p>
		In der Schwangerschaft reagiert der Blutzucker empfindlicher, morgens oft am stärksten. Was
		hilft – und worauf die Rezepte achten:
	</p>
	<ul class="list">
		<li>
			<b>Kohlenhydrate nie allein:</b> immer mit Eiweiß, Ballaststoffen und etwas Fett. Das bremst den
			Anstieg.
		</li>
		<li><b>Vollkorn, Hülsenfrüchte, viel Gemüse</b> statt Weißmehl. Nudeln bissfest kochen.</li>
		<li>
			<b>Kein zugesetzter Zucker</b>. Süße kommt aus Obst – und Obst am besten mit Quark, Joghurt
			oder Nussmus.
		</li>
		<li>
			<b>Lieber 5–6 kleinere Mahlzeiten</b> als wenige große – deshalb gibt es Snacks im Stil von Weekly
			Revolt.
		</li>
		<li><b>Ein kurzer Spaziergang</b> nach dem Essen senkt den Blutzucker spürbar.</li>
	</ul>
	<p>
		<b>Schwangerschaftsdiabetes-Modus</b> (unter Familie einschalten): Du legst fest, wie viele Kohlenhydrate
		pro Mahlzeit passen. Jedes Rezept zeigt dann, ob es passt und wie viel von der Beilage du nehmen kannst
		– die Familie isst ganz normal mit. 1 BE (Broteinheit) entspricht 12 g Kohlenhydraten. Die Grenzen
		sprichst du am besten mit deiner Diabetesberatung ab.
	</p>
</details>

<details>
	<summary><h2>Nährstoffe, die jetzt zählen</h2></summary>
	<p>
		Die Rezepte zeigen, wofür eine Portion eine gute Quelle ist, und der Wochenplan schätzt, wie
		viel davon zusammenkommt.
	</p>
	<dl class="stoffe">
		{#each stoffe as [, n] (n.label)}
			<div>
				<dt>{n.label}</dt>
				<dd>{n.warum}. Bedarf etwa {n.bedarf} {n.einheit} am Tag.</dd>
			</div>
		{/each}
	</dl>
	<p>
		<b>Folsäure und Jod</b> werden in Deutschland zusätzlich als Tablette empfohlen, Eisen nur nach Blutbild.
		Was du nimmst, besprichst du mit deiner Ärztin oder Hebamme – die Tabletten sind in den Wochenwerten
		nicht eingerechnet.
	</p>
</details>

<details>
	<summary><h2>Das Kind isst mit</h2></summary>
	<ul class="list">
		<li>
			<b>Kinderportion zuerst abnehmen</b>, dann für die Erwachsenen nachwürzen. Schärfe kommt am
			Tisch dazu.
		</li>
		<li>
			<b>Keine ganzen Nüsse</b> bis etwa zum 5. Geburtstag – Verschluckungsgefahr. In den Rezepten gibt
			es Nüsse nur gemahlen oder als Mus.
		</li>
		<li>
			<b>Kirschtomaten, Trauben und Weintrauben vierteln</b>, Kichererbsen leicht zerdrücken, Kerne
			weglassen.
		</li>
		<li><b>Wenig Salz</b>, dafür Kräuter. Gesalzen wird mit Jodsalz.</li>
		<li>Ein Kleinkind isst etwa <b>eine halbe Portion</b> – so rechnen die Mengen.</li>
	</ul>
</details>

<details>
	<summary><h2>Reste sicher mitnehmen</h2></summary>
	<ul class="list">
		<li>
			Abends gleich die Mittagsportion abfüllen, <b>rasch abkühlen lassen</b> und in den Kühlschrank stellen.
		</li>
		<li>Innerhalb von <b>1–2 Tagen</b> essen, gekochten Reis innerhalb eines Tages.</li>
		<li>
			In der Mikrowelle <b>dampfend heiß</b> erhitzen (zwischendurch umrühren), nicht nur lauwarm.
		</li>
		<li>Ohne Kühlschrank an der Arbeit: Kühltasche mit Kühlakku.</li>
	</ul>
</details>

<details>
	<summary><h2>Quellen</h2></summary>
	<ul class="list small">
		<li>
			Netzwerk Gesund ins Leben: Handlungsempfehlungen zur Ernährung in der Schwangerschaft – <a
				href="https://www.gesund-ins-leben.de"
				rel="noopener"
				target="_blank">gesund-ins-leben.de</a
			>
		</li>
		<li>
			Bundesinstitut für Risikobewertung: Schutz vor Lebensmittelinfektionen in der Schwangerschaft
			– <a href="https://www.bfr.bund.de" rel="noopener" target="_blank">bfr.bund.de</a>
		</li>
		<li>
			Deutsche Gesellschaft für Ernährung: Referenzwerte für die Nährstoffzufuhr – <a
				href="https://www.dge.de"
				rel="noopener"
				target="_blank">dge.de</a
			>
		</li>
		<li>
			Deutsche Diabetes Gesellschaft: Leitlinie Gestationsdiabetes – <a
				href="https://www.deutsche-diabetes-gesellschaft.de"
				rel="noopener"
				target="_blank">deutsche-diabetes-gesellschaft.de</a
			>
		</li>
	</ul>
	<p class="small muted">
		Nährwerte und Nährstoffe sind Schätzungen aus einer Nährwerttabelle und können je nach Produkt
		abweichen. Bauchgefühl ersetzt keine ärztliche oder Ernährungsberatung.
	</p>
</details>

<style>
	.pillars {
		list-style: none;
		margin: 24px 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 10px;
	}
	.pillars li {
		display: grid;
		gap: 2px;
		padding: 14px;
		border-radius: var(--radius);
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.pillars :global(svg) {
		width: 26px;
		height: 26px;
		color: var(--terra-ink);
		margin-bottom: 4px;
	}
	.pillars span {
		color: var(--muted);
		font-size: 14px;
		line-height: 1.35;
	}
	details {
		border-top: 1px solid var(--line);
		padding: 4px 0 8px;
	}
	summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		font-size: 26px;
		color: var(--terra-ink);
		font-weight: 300;
	}
	details[open] summary::after {
		content: '−';
	}
	summary h2 {
		margin: 14px 0;
		font-size: 21px;
	}
	.list {
		padding-left: 20px;
		margin: 0 0 12px;
	}
	.list li {
		margin-bottom: 8px;
	}
	.stoffe {
		display: grid;
		gap: 8px;
		margin: 0 0 12px;
	}
	.stoffe div {
		background: var(--surface-2);
		border-radius: 12px;
		padding: 10px 12px;
	}
	.stoffe dt {
		font-weight: 800;
	}
	.stoffe dd {
		margin: 0;
		color: var(--muted);
	}
</style>
