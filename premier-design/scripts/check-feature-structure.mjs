import {readdirSync, existsSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';

const cwd = process.cwd();
const featuresRoot = resolve(cwd, 'features');

// Обязательные слои: см. `docs/guides/feature-structure-roadmap-ru.md` — `hooks/` и `utils/` не форсируются пустыми.
const REQUIRED_DIRS = ['ui', 'interface'];

const LEGACY_ALLOWLIST = new Set([]);

const toUnixPath = (path) => path.split('\\').join('/');

const listFeatureDirs = (root) => {
	if (!existsSync(root)) {
		return [];
	}

	return readdirSync(root, {withFileTypes: true})
		.filter((entry) => entry.isDirectory())
		.map((entry) => join(root, entry.name));
};

const missingDirs = [];
const featureDirs = listFeatureDirs(featuresRoot);

for (const featureDir of featureDirs) {
	const featureRelPath = toUnixPath(relative(cwd, featureDir));

	if (LEGACY_ALLOWLIST.has(featureRelPath)) {
		continue;
	}

	for (const requiredDir of REQUIRED_DIRS) {
		const requiredPath = join(featureDir, requiredDir);
		if (!existsSync(requiredPath)) {
			missingDirs.push(`${featureRelPath}: отсутствует папка "${requiredDir}"`);
		}
	}
}

if (missingDirs.length > 0) {
	console.error('\nFeature structure check failed:\n');
	for (const violation of missingDirs) {
		console.error(`- ${violation}`);
	}
	process.exit(1);
}

console.log(`Feature structure check passed (${featureDirs.length} feature(s)).`);
