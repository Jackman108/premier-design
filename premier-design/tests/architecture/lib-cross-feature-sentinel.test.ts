import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = process.cwd();
const featuresRoot = resolve(root, 'features');
const forbiddenImportPattern = /from\s+['"]@shared\/lib\/(find[A-Z][^'"]*|resolveServicesTier|servicesTierStatic)['"]/g;

const toUnix = (value: string) => value.split('\\').join('/');

const walkCodeFiles = (dir: string): string[] => {
	const entries = readdirSync(dir, { withFileTypes: true });
	const result: string[] = [];
	for (const entry of entries) {
		const abs = join(dir, entry.name);
		if (entry.isDirectory()) {
			result.push(...walkCodeFiles(abs));
			continue;
		}
		if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name) && statSync(abs).size > 0) {
			result.push(abs);
		}
	}
	return result;
};

describe('feature boundaries', () => {
	it('does not import cross-feature finders from @shared/lib', () => {
		expect(existsSync(featuresRoot)).toBe(true);

		const offenders: string[] = [];
		for (const absPath of walkCodeFiles(featuresRoot)) {
			const source = readFileSync(absPath, 'utf-8');
			const matches = [...source.matchAll(forbiddenImportPattern)];
			if (matches.length > 0) {
				const imports = matches.map((match) => match[0]);
				offenders.push(`${toUnix(relative(root, absPath))}: ${imports.join(', ')}`);
			}
		}

		expect(offenders).toEqual([]);
	});
});
