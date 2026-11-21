import type { StepGroup } from './logic/rezept.ts';

export type PdfBlock =
	| { type: 'items'; title: string; items: { amount: string; name: string }[]; check?: boolean }
	| { type: 'steps'; title: string; steps: StepGroup[] }
	| { type: 'notes'; title: string; lines: string[] };

export interface PdfSpec {
	title: string;
	subtitle?: string;
	meta?: string;
	/** SVG-String mit festen Farben (siehe bowlArtSvg). */
	art?: string;
	facts?: { k: string; v: string }[];
	blocks: PdfBlock[];
	filename: string;
}

/** Die Standardschrift von jsPDF kann nur WinAnsi, also Sonderzeichen ersetzen. */
const PDF_MAP: Record<string, string> = {
	'–': '-',
	'—': '-',
	'‘': "'",
	'’': "'",
	'“': '"',
	'”': '"',
	'„': '"',
	'≈': 'ca.',
	'✓': '',
	' ': ' ',
	' ': ' ',
	'−': '-',
	'…': '...',
	'→': '->',
	'≤': '<=',
	'≥': '>='
};
const clean = (s: string) =>
	String(s)
		.replace(/[–—‘’“”„≈✓\u00a0\u202f−…→≤≥]/g, (c) => PDF_MAP[c] ?? ' ')
		.replace(/[^\x00-\xff€]/g, '');

function svgToPng(svg: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			try {
				const c = document.createElement('canvas');
				c.width = c.height = 480;
				c.getContext('2d')!.drawImage(img, 0, 0, 480, 480);
				resolve(c.toDataURL('image/png'));
			} catch (e) {
				reject(e);
			}
		};
		img.onerror = reject;
		img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
	});
}

type RGB = [number, number, number];

async function buildPdf(spec: PdfSpec): Promise<Blob> {
	const { jsPDF } = await import('jspdf');
	const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
	const W = 210;
	const H = 297;
	const M = 18;
	const CW = W - 2 * M;
	const INK: RGB = [58, 42, 33];
	const MUTED: RGB = [122, 102, 86];
	const GLAZE: RGB = [184, 92, 56];
	const LINE: RGB = [227, 212, 192];
	let y = M;
	const pageBreak = (h: number) => {
		if (y + h > H - 20) {
			pdf.addPage();
			y = M + 4;
		}
	};
	const font = (style: string, size: number, color: RGB) => {
		pdf.setFont('helvetica', style);
		pdf.setFontSize(size);
		pdf.setTextColor(...color);
	};

	let artW = 0;
	if (spec.art) {
		try {
			pdf.addImage(await svgToPng(spec.art), 'PNG', W - M - 36, M - 4, 36, 36);
			artW = 42;
		} catch {
			// ohne Bild weiter
		}
	}
	font('bold', 24, INK);
	for (const l of pdf.splitTextToSize(clean(spec.title), CW - artW)) {
		pdf.text(l, M, y + 8);
		y += 10;
	}
	if (spec.subtitle) {
		font('normal', 11, MUTED);
		for (const l of pdf.splitTextToSize(clean(spec.subtitle), CW - artW)) {
			pdf.text(l, M, y + 3);
			y += 5.2;
		}
		y += 1;
	}
	if (spec.meta) {
		font('bold', 10, GLAZE);
		for (const l of pdf.splitTextToSize(clean(spec.meta), CW - artW)) {
			pdf.text(l, M, y + 3);
			y += 5;
		}
	}
	if (artW) y = Math.max(y, M + 34);
	y += 3;
	pdf.setDrawColor(...GLAZE);
	pdf.setLineWidth(0.6);
	pdf.line(M, y, W - M, y);
	y += 8;

	for (const fact of spec.facts ?? []) {
		font('normal', 10, INK);
		const ls: string[] = pdf.splitTextToSize(clean(fact.v), CW - 30);
		pageBreak(ls.length * 4.8 + 2);
		font('bold', 10, INK);
		pdf.text(clean(fact.k), M, y);
		font('normal', 10, INK);
		ls.forEach((l, i) => pdf.text(l, M + 30, y + i * 4.8));
		y += ls.length * 4.8 + 2;
	}

	for (const bl of spec.blocks) {
		pageBreak(18);
		y += 5;
		font('bold', 14, INK);
		pdf.text(clean(bl.title), M, y);
		y += 7;
		if (bl.type === 'items') {
			for (const it of bl.items) {
				font('normal', 10.5, INK);
				const indent = bl.check ? 8 : 34;
				const ls: string[] = pdf.splitTextToSize(clean(it.name), CW - indent);
				pageBreak(ls.length * 4.9 + 3);
				if (bl.check) {
					pdf.setDrawColor(...MUTED);
					pdf.setLineWidth(0.3);
					pdf.rect(M, y - 3.4, 4, 4);
				} else {
					font('bold', 10.5, INK);
					pdf.text(clean(it.amount), M, y);
					font('normal', 10.5, INK);
				}
				ls.forEach((l, i) => pdf.text(l, M + indent, y + i * 4.9));
				y += (ls.length - 1) * 4.9;
				pdf.setDrawColor(...LINE);
				pdf.setLineWidth(0.2);
				pdf.line(M, y + 2.2, W - M, y + 2.2);
				y += 7;
			}
		} else if (bl.type === 'steps') {
			bl.steps.forEach((st, i) => {
				pageBreak(14);
				pdf.setFillColor(...GLAZE);
				pdf.circle(M + 3.2, y - 1.3, 3.3, 'F');
				font('bold', 9, [255, 255, 255]);
				pdf.text(String(i + 1), M + 3.2, y - 0.1, { align: 'center' });
				if (st.title) {
					font('bold', 11.5, INK);
					pdf.text(clean(st.title), M + 10, y);
					y += 5.6;
				}
				font('normal', 10.5, INK);
				for (const line of st.lines) {
					for (const l of pdf.splitTextToSize(clean(line), CW - 10)) {
						pageBreak(5);
						pdf.text(l, M + 10, y);
						y += 4.9;
					}
					y += 1.2;
				}
				y += 3;
			});
		} else {
			font('normal', 10, MUTED);
			for (const line of bl.lines) {
				const ls: string[] = pdf.splitTextToSize(clean(line), CW - 5);
				pageBreak(ls.length * 4.6 + 2);
				pdf.text('-', M, y);
				ls.forEach((l, i) => pdf.text(l, M + 5, y + i * 4.6));
				y += ls.length * 4.6 + 2;
			}
		}
	}

	const pages = pdf.getNumberOfPages();
	for (let i = 1; i <= pages; i++) {
		pdf.setPage(i);
		font('normal', 8, MUTED);
		pdf.text('Bauchgefühl', M, H - 10);
		pdf.text(`Seite ${i} von ${pages}`, W - M, H - 10, { align: 'right' });
	}
	return pdf.output('blob');
}

/** Baut das PDF und lädt es herunter. */
export async function downloadPdf(spec: PdfSpec): Promise<void> {
	const blob = await buildPdf(spec);
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = spec.filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 5000);
}
