/** IDs im PocketBase-Format: 15 Zeichen aus a–z und 0–9. */

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

/** Zufällige ID, `n` Zeichen. */
export function zufallsId(n = 15): string {
	const bytes = new Uint8Array(n);
	crypto.getRandomValues(bytes);
	let s = '';
	for (const b of bytes) s += ALPHABET[b % 36];
	return s;
}

/** Schlüssel für einen Haushalt: 32 zufällige Zeichen (≈ 165 Bit). */
export const neuerSchluessel = () => zufallsId(32);

/** Deterministische ID aus einem Text (FNV-1a, 2×32 Bit). Gleicher Text → gleiche ID auf allen Geräten. */
export function hashId(text: string): string {
	let h1 = 0x811c9dc5;
	let h2 = 0x01000193 ^ 0x5bd1e995;
	for (let i = 0; i < text.length; i++) {
		const c = text.charCodeAt(i);
		h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
		h2 = Math.imul(h2 ^ c, 0x5bd1e995) >>> 0;
		h2 ^= h2 >>> 15;
	}
	const n = (BigInt(h1) << 32n) | BigInt(h2 >>> 0);
	return n.toString(36).padStart(15, '0').slice(-15);
}
