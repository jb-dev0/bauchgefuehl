import PocketBase, { ClientResponseError, type RecordModel } from 'pocketbase';
import type { Selection } from './data/types.ts';
import { hashId, neuerSchluessel, zufallsId } from './ids.ts';
import { addDays, heute } from './logic/datum.ts';
import {
	bereinigeEigenes,
	EIGEN_PREFIX,
	istEigen,
	eigenId,
	type EigenesRezept
} from './logic/eigene.ts';
import { bereinigen, STANDARD, type Einstellungen, type Mahlzeit } from './logic/einstellungen.ts';
import { gerichtAusEigenem, MITGELIEFERT, type Gericht } from './logic/gericht.ts';
import { mittagNachAbend, planKey, type PlanEintrag } from './logic/plan.ts';

/**
 * Alle Daten der App. Liegen immer auf dem Gerät (localStorage) und werden mit dem
 * Haushalt auf dem Server (PocketBase) abgeglichen, sobald Netz da ist. Bei Konflikten
 * gewinnt die jüngere Änderung (Feld `geaendert`).
 */

export interface EinkaufEintrag {
	liste: string;
	posten: string;
	menge: string;
	extra: boolean;
	erledigt: boolean;
	geloescht: boolean;
	geaendert: number;
}
export const einkaufKey = (liste: string, posten: string) => `${liste}|${posten}`;

export interface Haushalt {
	id: string;
	schluessel: string;
	name: string;
}

export type SyncStatus = 'lokal' | 'verbinde' | 'verbunden' | 'offline' | 'fehler';
type Art = 'plan' | 'einkauf' | 'rezept' | 'haushalt';
type EigenGespeichert = EigenesRezept & { geloescht?: boolean };
type Op = { stamp: number; add: (b: ReturnType<PocketBase['createBatch']>) => void };

const STORAGE = 'bauchgefuehl-v1';
/** So weit zurück werden Planzeilen geladen und behalten. */
const PLAN_TAGE_ZURUECK = 42;

const isObj = (v: unknown): v is Record<string, unknown> =>
	typeof v === 'object' && v !== null && !Array.isArray(v);
const MAHLZEIT_IDS = ['fruehstueck', 'snack1', 'mittag', 'snack2', 'abend'];

function planAus(raw: unknown): PlanEintrag | null {
	if (!isObj(raw)) return null;
	if (typeof raw.datum !== 'string' || !MAHLZEIT_IDS.includes(raw.mahlzeit as string)) return null;
	return {
		datum: raw.datum,
		mahlzeit: raw.mahlzeit as Mahlzeit,
		rezept: typeof raw.rezept === 'string' && raw.rezept ? raw.rezept : null,
		auswahl: isObj(raw.auswahl) ? (raw.auswahl as Selection) : {},
		reste: raw.reste === true,
		portionen: typeof raw.portionen === 'number' && raw.portionen > 0 ? raw.portionen : null,
		geaendert: typeof raw.geaendert === 'number' ? raw.geaendert : 0
	};
}

function einkaufAus(raw: unknown): EinkaufEintrag | null {
	if (!isObj(raw) || typeof raw.liste !== 'string' || typeof raw.posten !== 'string') return null;
	return {
		liste: raw.liste,
		posten: raw.posten,
		menge: typeof raw.menge === 'string' ? raw.menge : '',
		extra: raw.extra === true,
		erledigt: raw.erledigt === true,
		geloescht: raw.geloescht === true,
		geaendert: typeof raw.geaendert === 'number' ? raw.geaendert : 0
	};
}

const pbUrl = () =>
	(import.meta.env.VITE_PB_URL as string | undefined) ||
	(typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:8090');

class Store {
	einstellungen = $state<Einstellungen>(bereinigen({}));
	einstellungenGeaendert = $state(0);
	haushaltName = $state('');
	plan = $state<Record<string, PlanEintrag>>({});
	einkauf = $state<Record<string, EinkaufEintrag>>({});
	eigene = $state<Record<string, EigenGespeichert>>({});
	/** Zuletzt gewählte Bausteine je Rezept (nur auf diesem Gerät). */
	auswahl = $state<Record<string, Selection>>({});
	haushalt = $state<Haushalt | null>(null);
	/** Noch nicht hochgeladene Änderungen: „art:schlüssel“. */
	pending = $state<string[]>([]);
	status = $state<SyncStatus>('lokal');
	fehler = $state('');
	loaded = $state(false);

	readonly pb = new PocketBase(pbUrl());
	#timer: ReturnType<typeof setTimeout> | null = null;
	#flushing = false;
	#subscribed = false;
	#started = false;

	constructor() {
		this.pb.autoCancellation(false);
		this.pb.beforeSend = (url, options) => {
			if (this.haushalt)
				options.headers = { ...(options.headers ?? {}), 'X-Haushalt': this.haushalt.schluessel };
			return { url, options };
		};
	}

	/* ---------------------------------------------------------------- Lesen */

	get gerichte(): Gericht[] {
		return [
			...MITGELIEFERT,
			...Object.values(this.eigene)
				.filter((e) => !e.geloescht)
				.map(gerichtAusEigenem)
		];
	}

	gericht(id: string): Gericht | undefined {
		if (istEigen(id)) {
			const e = this.eigene[eigenId(id)];
			return e && !e.geloescht ? gerichtAusEigenem(e) : undefined;
		}
		return MITGELIEFERT.find((g) => g.id === id);
	}

	eintrag(datum: string, mahlzeit: Mahlzeit): PlanEintrag | undefined {
		return this.plan[planKey(datum, mahlzeit)];
	}

	fotoUrl(e: EigenesRezept, thumb = '480x480'): string {
		if (!e.foto) return '';
		return `${pbUrl()}/api/files/rezepte/${e.id}/${encodeURIComponent(e.foto)}?thumb=${thumb}`;
	}

	get teilenLink(): string {
		if (!this.haushalt || typeof window === 'undefined') return '';
		return `${window.location.origin}/beitreten#${this.haushalt.schluessel}`;
	}

	/* ------------------------------------------------------------ Speichern */

	load() {
		try {
			const raw = localStorage.getItem(STORAGE);
			const s: unknown = raw ? JSON.parse(raw) : null;
			if (isObj(s)) {
				this.einstellungen = bereinigen(s.einstellungen);
				this.einstellungenGeaendert =
					typeof s.einstellungenGeaendert === 'number' ? s.einstellungenGeaendert : 0;
				this.haushaltName = typeof s.haushaltName === 'string' ? s.haushaltName : '';
				const grenze = addDays(heute(), -PLAN_TAGE_ZURUECK);
				if (isObj(s.plan))
					for (const [k, v] of Object.entries(s.plan)) {
						const e = planAus(v);
						if (e && e.datum >= grenze) this.plan[k] = e;
					}
				if (isObj(s.einkauf))
					for (const [k, v] of Object.entries(s.einkauf)) {
						const e = einkaufAus(v);
						if (e) this.einkauf[k] = e;
					}
				if (isObj(s.eigene))
					for (const v of Object.values(s.eigene)) {
						const e = bereinigeEigenes(v);
						if (e) this.eigene[e.id] = { ...e, geloescht: isObj(v) && v.geloescht === true };
					}
				if (isObj(s.auswahl)) this.auswahl = s.auswahl as Record<string, Selection>;
				if (
					isObj(s.haushalt) &&
					typeof s.haushalt.id === 'string' &&
					typeof s.haushalt.schluessel === 'string'
				)
					this.haushalt = {
						id: s.haushalt.id,
						schluessel: s.haushalt.schluessel,
						name: typeof s.haushalt.name === 'string' ? s.haushalt.name : ''
					};
				if (Array.isArray(s.pending))
					this.pending = s.pending.filter((x): x is string => typeof x === 'string');
			}
		} catch {
			// Kein Speicher oder kaputte Daten: mit Standardwerten weiter
		}
		this.loaded = true;
	}

	/** Liest alle Felder, damit ein $effect jede Änderung mitbekommt. */
	serialize(): string {
		return JSON.stringify({
			einstellungen: this.einstellungen,
			einstellungenGeaendert: this.einstellungenGeaendert,
			haushaltName: this.haushaltName,
			plan: this.plan,
			einkauf: this.einkauf,
			eigene: this.eigene,
			auswahl: this.auswahl,
			haushalt: this.haushalt,
			pending: this.pending
		});
	}

	save(json = this.serialize()) {
		try {
			localStorage.setItem(STORAGE, json);
		} catch {
			// privater Modus oder Speicher voll
		}
	}

	/* ------------------------------------------------------------- Ändern */

	setEinstellungen(patch: Partial<Einstellungen>) {
		this.einstellungen = bereinigen({ ...$state.snapshot(this.einstellungen), ...patch });
		this.einstellungenGeaendert = Date.now();
		this.#mark('haushalt', '');
	}

	setPlan(e: Omit<PlanEintrag, 'geaendert'>) {
		const jetzt = Date.now();
		const eintrag: PlanEintrag = { ...e, geaendert: jetzt };
		const key = planKey(e.datum, e.mahlzeit);
		this.plan[key] = eintrag;
		this.#mark('plan', key);
		if (e.mahlzeit === 'abend') {
			const mittag = mittagNachAbend(
				eintrag,
				$state.snapshot(this.plan) as Record<string, PlanEintrag>,
				jetzt
			);
			if (mittag) {
				const k = planKey(mittag.datum, 'mittag');
				this.plan[k] = mittag;
				this.#mark('plan', k);
			}
		}
	}

	setPlanViele(eintraege: PlanEintrag[]) {
		for (const e of eintraege) {
			const key = planKey(e.datum, e.mahlzeit);
			this.plan[key] = e;
			this.#mark('plan', key);
		}
	}

	leeren(datum: string, mahlzeit: Mahlzeit) {
		this.setPlan({ datum, mahlzeit, rezept: null, auswahl: {}, reste: false, portionen: null });
	}

	setEinkauf(liste: string, posten: string, patch: Partial<EinkaufEintrag>) {
		const key = einkaufKey(liste, posten);
		const alt = this.einkauf[key] ?? {
			liste,
			posten,
			menge: '',
			extra: false,
			erledigt: false,
			geloescht: false,
			geaendert: 0
		};
		this.einkauf[key] = { ...alt, ...patch, geaendert: Date.now() };
		this.#mark('einkauf', key);
	}

	/** Speichert ein eigenes Rezept und gibt seine Gericht-ID zurück. */
	saveEigenes(r: EigenesRezept): string {
		this.eigene[r.id] = { ...r, geaendert: Date.now(), geloescht: false };
		this.#mark('rezept', r.id);
		return EIGEN_PREFIX + r.id;
	}

	deleteEigenes(id: string) {
		const e = this.eigene[id];
		if (!e) return;
		this.eigene[id] = { ...e, geloescht: true, geaendert: Date.now() };
		this.#mark('rezept', id);
	}

	neueRezeptId = () => zufallsId();

	/** Lädt ein Foto zu einem eigenen Rezept hoch (braucht Netz). */
	async uploadFoto(id: string, file: Blob | null): Promise<void> {
		await this.#ensureHaushalt();
		await this.flush();
		const fd = new FormData();
		if (file) fd.append('foto', file, 'foto.jpg');
		else fd.append('foto', '');
		const rec = await this.pb.collection('rezepte').update(id, fd);
		const e = this.eigene[id];
		if (e) this.eigene[id] = { ...e, foto: (rec.foto as string) || '' };
	}

	/* ------------------------------------------------------------ Abgleich */

	#mark(art: Art, key: string) {
		const p = `${art}:${key}`;
		if (!this.pending.includes(p)) this.pending.push(p);
		this.#schedule();
	}

	#schedule(ms = 600) {
		if (this.#timer) clearTimeout(this.#timer);
		this.#timer = setTimeout(() => {
			this.#timer = null;
			void this.flush();
		}, ms);
	}

	#serverId(art: 'plan' | 'einkauf', key: string) {
		return hashId(`${this.haushalt!.id}|${art}|${key}`);
	}

	#offline(err: unknown): boolean {
		return (
			(typeof navigator !== 'undefined' && !navigator.onLine) ||
			(err instanceof ClientResponseError && err.status === 0)
		);
	}

	#fail(err: unknown) {
		if (this.#offline(err)) {
			this.status = 'offline';
			this.fehler = '';
		} else {
			this.status = 'fehler';
			this.fehler = err instanceof Error ? err.message : String(err);
		}
	}

	/** Startet den Abgleich (einmal nach dem Laden). */
	start() {
		if (this.#started || typeof window === 'undefined') return;
		this.#started = true;
		window.addEventListener('online', () => void this.sync());
		window.addEventListener('offline', () => (this.status = 'offline'));
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') void this.sync();
		});
		setInterval(() => {
			if (document.visibilityState === 'visible' && this.status !== 'verbunden') void this.sync();
		}, 60_000);
		// Beim Öffnen eines Teilen-Links keinen eigenen Haushalt anlegen, bevor man beitritt
		if (!location.pathname.startsWith('/beitreten') || this.haushalt) void this.sync();
	}

	/** Hochladen, dann herunterladen und auf Änderungen hören. */
	async sync() {
		try {
			this.status = 'verbinde';
			await this.#ensureHaushalt();
			await this.flush();
			await this.pull();
			await this.#subscribe();
			if (!this.pending.length) this.status = 'verbunden';
		} catch (err) {
			this.#fail(err);
		}
	}

	async #ensureHaushalt() {
		if (this.haushalt) return;
		const h: Haushalt = { id: zufallsId(), schluessel: neuerSchluessel(), name: this.haushaltName };
		await this.pb.collection('haushalte').create({
			id: h.id,
			schluessel: h.schluessel,
			name: h.name,
			einstellungen: $state.snapshot(this.einstellungen),
			geaendert: this.einstellungenGeaendert
		});
		this.haushalt = h;
		this.#alles();
	}

	/** Alles Lokale zum Hochladen vormerken (nach neuem oder gewechseltem Haushalt). */
	#alles() {
		const p = new Set(this.pending);
		p.add('haushalt:');
		for (const k of Object.keys(this.plan)) p.add('plan:' + k);
		for (const k of Object.keys(this.einkauf)) p.add('einkauf:' + k);
		for (const k of Object.keys(this.eigene)) p.add('rezept:' + k);
		this.pending = [...p];
	}

	/** Eine vorgemerkte Änderung als Batch-Anfrage; `null`, wenn es den Datensatz nicht mehr gibt. */
	#op(p: string): Op | null {
		const [art, ...rest] = p.split(':');
		const key = rest.join(':');
		const h = this.haushalt!.id;
		if (art === 'haushalt') {
			const data = {
				einstellungen: $state.snapshot(this.einstellungen),
				name: this.haushaltName,
				geaendert: this.einstellungenGeaendert
			};
			return { stamp: data.geaendert, add: (b) => b.collection('haushalte').update(h, data) };
		}
		if (art === 'plan') {
			const e = this.plan[key];
			if (!e) return null;
			const data = {
				id: this.#serverId('plan', key),
				haushalt: h,
				datum: e.datum,
				mahlzeit: e.mahlzeit,
				rezept: e.rezept ?? '',
				auswahl: $state.snapshot(e.auswahl ?? {}),
				reste: !!e.reste,
				portionen: e.portionen ?? 0,
				geaendert: e.geaendert
			};
			return { stamp: e.geaendert, add: (b) => b.collection('plan').upsert(data) };
		}
		if (art === 'einkauf') {
			const e = this.einkauf[key];
			if (!e) return null;
			const data = { id: this.#serverId('einkauf', key), haushalt: h, ...$state.snapshot(e) };
			return { stamp: e.geaendert, add: (b) => b.collection('einkauf').upsert(data) };
		}
		const e = this.eigene[key];
		if (!e) return null;
		const { foto: _foto, geloescht, ...daten } = $state.snapshot(e);
		const data = { id: e.id, haushalt: h, daten, geloescht: !!geloescht, geaendert: e.geaendert };
		return { stamp: e.geaendert, add: (b) => b.collection('rezepte').upsert(data) };
	}

	#stand(p: string): number | undefined {
		const [art, ...rest] = p.split(':');
		const key = rest.join(':');
		if (art === 'haushalt') return this.einstellungenGeaendert;
		if (art === 'plan') return this.plan[key]?.geaendert;
		if (art === 'einkauf') return this.einkauf[key]?.geaendert;
		return this.eigene[key]?.geaendert;
	}

	/** Zu viele Anfragen (Bremse des Servers)? Dann später noch einmal. */
	#gebremst(err: unknown): boolean {
		if (!(err instanceof ClientResponseError)) return false;
		if (err.status === 429) return true;
		return JSON.stringify(err.response ?? {}).includes('"status":429');
	}

	/** Lädt alle vorgemerkten Änderungen hoch. */
	async flush(): Promise<void> {
		if (!this.haushalt || this.#flushing || !this.pending.length) return;
		this.#flushing = true;
		try {
			while (this.pending.length) {
				const teil = this.pending.slice(0, 40);
				const ops = new Map<string, Op>();
				for (const p of teil) {
					const op = this.#op(p);
					if (op) ops.set(p, op);
				}
				/** Erfolgreich gesendet: Stand beim Senden. */
				const erledigt = new Map<string, number>();
				/** Ungültig und verworfen. */
				const verworfen = new Set<string>();
				if (ops.size) {
					try {
						const b = this.pb.createBatch();
						for (const op of ops.values()) op.add(b);
						await b.send();
						for (const [p, op] of ops) erledigt.set(p, op.stamp);
					} catch (err) {
						if (this.#offline(err)) throw err;
						if (this.#gebremst(err)) {
							this.#schedule(15_000);
							break;
						}
						// Ein Datensatz ist ungültig: einzeln senden, damit nur der fehlerhafte wegfällt
						for (const [p, op] of ops) {
							try {
								const b = this.pb.createBatch();
								op.add(b);
								await b.send();
								erledigt.set(p, op.stamp);
							} catch (e) {
								if (this.#offline(e)) throw e;
								if (this.#gebremst(e)) continue;
								console.warn('Abgleich: verworfen', p, e);
								verworfen.add(p);
							}
						}
					}
				}
				// Entfernen, was gesendet und seither nicht wieder geändert wurde (oder nicht mehr existiert)
				const vorher = this.pending.length;
				this.pending = this.pending.filter((p) => {
					if (!teil.includes(p)) return true;
					if (verworfen.has(p) || !ops.has(p)) return false;
					return !erledigt.has(p) || erledigt.get(p) !== this.#stand(p);
				});
				if (this.pending.length === vorher) {
					// Nichts ging durch (z. B. gebremst) – später weiter
					this.#schedule(15_000);
					break;
				}
			}
			if (this.status !== 'fehler') this.status = this.#subscribed ? 'verbunden' : this.status;
		} catch (err) {
			this.#fail(err);
		} finally {
			this.#flushing = false;
		}
	}

	#offen(art: Art, key: string) {
		return this.pending.includes(`${art}:${key}`);
	}

	#mergePlan(r: RecordModel) {
		const e = planAus(r);
		if (!e) return;
		const key = planKey(e.datum, e.mahlzeit);
		const lokal = this.plan[key];
		if (lokal && this.#offen('plan', key) && lokal.geaendert >= e.geaendert) return;
		if (lokal && lokal.geaendert > e.geaendert) return;
		this.plan[key] = e;
	}

	#mergeEinkauf(r: RecordModel) {
		const e = einkaufAus(r);
		if (!e) return;
		const key = einkaufKey(e.liste, e.posten);
		const lokal = this.einkauf[key];
		if (lokal && lokal.geaendert > e.geaendert) return;
		this.einkauf[key] = e;
	}

	#mergeRezept(r: RecordModel) {
		const e = bereinigeEigenes({ ...(r.daten ?? {}), id: r.id, geaendert: r.geaendert });
		if (!e) return;
		const lokal = this.eigene[e.id];
		if (lokal && lokal.geaendert > e.geaendert) return;
		this.eigene[e.id] = { ...e, foto: (r.foto as string) || '', geloescht: r.geloescht === true };
	}

	#mergeHaushalt(r: RecordModel) {
		if (typeof r.geaendert === 'number' && r.geaendert > this.einstellungenGeaendert) {
			this.einstellungen = bereinigen(r.einstellungen);
			this.einstellungenGeaendert = r.geaendert;
			this.haushaltName = typeof r.name === 'string' ? r.name : '';
		}
	}

	/** Holt den Stand des Haushalts vom Server. */
	async pull() {
		if (!this.haushalt) return;
		const h = this.haushalt.id;
		const grenze = addDays(heute(), -PLAN_TAGE_ZURUECK);
		const [haus, plan, einkauf, rezepte] = await Promise.all([
			this.pb.collection('haushalte').getOne(h),
			this.pb
				.collection('plan')
				.getFullList({
					filter: this.pb.filter('haushalt = {:h} && datum >= {:d}', { h, d: grenze }),
					batch: 500
				}),
			this.pb
				.collection('einkauf')
				.getFullList({ filter: this.pb.filter('haushalt = {:h}', { h }), batch: 500 }),
			this.pb
				.collection('rezepte')
				.getFullList({ filter: this.pb.filter('haushalt = {:h}', { h }), batch: 200 })
		]);
		this.#mergeHaushalt(haus);
		for (const r of plan) this.#mergePlan(r);
		for (const r of einkauf) this.#mergeEinkauf(r);
		for (const r of rezepte) this.#mergeRezept(r);
		// Lokales, das der Server nicht kennt (z. B. offline angelegt), hochladen
		const aufServer = new Set(plan.map((r) => planKey(r.datum, r.mahlzeit)));
		for (const [k, e] of Object.entries(this.plan))
			if (!aufServer.has(k) && e.datum >= grenze && !this.#offen('plan', k)) this.#mark('plan', k);
		const rezeptIds = new Set(rezepte.map((r) => r.id));
		for (const k of Object.keys(this.eigene))
			if (!rezeptIds.has(k) && !this.#offen('rezept', k)) this.#mark('rezept', k);
		// Alte Planzeilen lokal aufräumen
		for (const [k, e] of Object.entries(this.plan)) if (e.datum < grenze) delete this.plan[k];
	}

	async #subscribe() {
		if (this.#subscribed || !this.haushalt) return;
		const opts = { headers: { x_haushalt: this.haushalt.schluessel } };
		await Promise.all([
			this.pb.collection('plan').subscribe('*', (ev) => this.#mergePlan(ev.record), opts),
			this.pb.collection('einkauf').subscribe('*', (ev) => this.#mergeEinkauf(ev.record), opts),
			this.pb.collection('rezepte').subscribe('*', (ev) => this.#mergeRezept(ev.record), opts),
			this.pb
				.collection('haushalte')
				.subscribe(this.haushalt.id, (ev) => this.#mergeHaushalt(ev.record), opts)
		]);
		this.#subscribed = true;
	}

	async #unsubscribe() {
		if (!this.#subscribed) return;
		this.#subscribed = false;
		try {
			await this.pb.realtime.unsubscribe();
		} catch {
			// egal
		}
	}

	/** Prüft einen Schlüssel aus einem Teilen-Link. */
	async pruefen(schluessel: string): Promise<{ id: string; name: string } | null> {
		const res = await fetch(`${pbUrl()}/api/collections/haushalte/records?perPage=1`, {
			headers: { 'X-Haushalt': schluessel }
		});
		if (!res.ok) throw new Error(`Server antwortet mit ${res.status}`);
		const data = (await res.json()) as { items: { id: string; name: string }[] };
		return data.items[0] ?? null;
	}

	/**
	 * Tritt einem Haushalt bei. Plan und Einkaufsliste dieses Geräts werden durch die des
	 * Haushalts ersetzt; eigene Rezepte wandern mit.
	 */
	async beitreten(schluessel: string): Promise<boolean> {
		const h = await this.pruefen(schluessel);
		if (!h) return false;
		await this.#unsubscribe();
		this.haushalt = { id: h.id, schluessel, name: h.name };
		this.plan = {};
		this.einkauf = {};
		this.einstellungenGeaendert = 0;
		this.pending = Object.keys(this.eigene).map((k) => 'rezept:' + k);
		await this.sync();
		return true;
	}

	/** Verlässt den Haushalt; dieses Gerät bekommt einen neuen, eigenen. */
	async verlassen() {
		await this.#unsubscribe();
		this.haushalt = null;
		this.pending = [];
		await this.sync();
	}
}

export const store = new Store();
