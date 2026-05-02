/**
 * Builds data/locales/en/data.json from ru by translating unique Cyrillic strings (Google gtx, unofficial).
 * Cache: data/locales/en/_translation-cache.json (regenerate by deleting cache).
 * Does not touch ui.json — keep keys in sync with data/locales/ru/ui.json manually.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const RU_PATH = path.join(ROOT, 'data/locales/ru/data.json');
const EN_PATH = path.join(ROOT, 'data/locales/en/data.json');
const CACHE_PATH = path.join(ROOT, 'data/locales/en/_translation-cache.json');

/** Whole-string or substring fixes after MT (longer phrases first). */
const POST_PROCESS = [
	[/^Leave a request\.?$/i, 'Get a quote'],
	[/Leave a request/gi, 'Get a quote'],
	[/^Submit an application\.?$/i, 'Get a quote'],
	[/Submit an application/gi, 'Get a quote'],
	[/^Send a request\.?$/i, 'Contact us'],
];

function collectCyrillicStrings(obj, set = new Set()) {
	if (typeof obj === 'string') {
		if (/[\u0400-\u04FF]/.test(obj)) set.add(obj);
	} else if (obj && typeof obj === 'object') {
		for (const v of Object.values(obj)) collectCyrillicStrings(v, set);
	}
	return set;
}

async function translateOne(text) {
	const u =
		'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=' + encodeURIComponent(text);
	const r = await fetch(u);
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
	const j = await r.json();
	return j[0].map((x) => x[0]).join('');
}

function applyMap(obj, map) {
	if (typeof obj === 'string') {
		if (/[\u0400-\u04FF]/.test(obj)) return map.get(obj) ?? obj;
		return obj;
	}
	if (Array.isArray(obj)) return obj.map((x) => applyMap(x, map));
	if (obj && typeof obj === 'object') {
		const out = {};
		for (const [k, v] of Object.entries(obj)) out[k] = applyMap(v, map);
		return out;
	}
	return obj;
}

function postProcessStrings(v) {
	if (typeof v === 'string') {
		let x = v;
		for (const [re, to] of POST_PROCESS) x = x.replace(re, to);
		return x;
	}
	if (Array.isArray(v)) return v.map(postProcessStrings);
	if (v && typeof v === 'object') {
		const o = {};
		for (const [k, val] of Object.entries(v)) o[k] = postProcessStrings(val);
		return o;
	}
	return v;
}

async function main() {
	const ru = JSON.parse(fs.readFileSync(RU_PATH, 'utf8'));
	const needed = [...collectCyrillicStrings(ru)].sort((a, b) => b.length - a.length);
	let cache = {};
	if (fs.existsSync(CACHE_PATH)) {
		cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
	}

	let n = 0;
	for (const s of needed) {
		if (cache[s]) continue;
		try {
			cache[s] = await translateOne(s);
			n++;
			await new Promise((r) => setTimeout(r, 75));
		} catch (e) {
			console.error('translate failed:', s.slice(0, 80), e.message);
			cache[s] = s;
		}
	}

	fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
	fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, '\t'));

	const map = new Map(Object.entries(cache));
	let en = applyMap(structuredClone(ru), map);
	en = postProcessStrings(en);

	fs.writeFileSync(EN_PATH, JSON.stringify(en, null, '\t') + '\n');
	console.log('Wrote', EN_PATH, 'new translations:', n, 'total cached:', Object.keys(cache).length);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
