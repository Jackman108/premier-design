import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const useAllFiles = args.includes('--all');

const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static', 'styled-system']);

const ALLOWLIST = new Set([
	// legacy cross-feature contracts still in progress
	'shared/ui/order/interface/OrderButton.props.ts|@features/buttons-panel/interface/PanelButton.props',
	'shared/ui/calculator-modal/hooks/useCalculatorHandlers.ts|@features/coasting/interface/Costing.props',
	'shared/ui/calculator-modal/interface/CalculatorModal.props.ts|@features/coasting/interface/Costing.props',
	'shared/utils/staticPropsHandler.ts|@features/related-services/utils/findRelatedService',
	'shared/utils/staticPropsHandler.ts|@features/services/utils/findService',
	'shared/hooks/useFallback.tsx|@features/services/ui/ServiceDetail/ServiceDetail.module.css',
	'shared/ui/order/ui/OrderButton/OrderButton.tsx|@features/buttons-panel/ui/PanelButton/PanelButton',
	'shared/ui/calculator-modal/ui/CalculatorModal/CalculatorModal.test.tsx|@features/coasting/interface/Costing.props',
	'shared/utils/__tests__/staticPropsHandler.test.ts|@features/related-services/utils/findRelatedService',
	'shared/utils/__tests__/staticPropsHandler.test.ts|@features/services/utils/findService',
	'features/buttons-panel/interface/CalculatorButton.props.ts|@features/coasting/interface/Costing.props',
	'features/related-services/ui/RelatedServiceDetail/RelatedServiceDetail.tsx|@features/services/ui/ServiceDetail/ServiceDetail.module.css',
	'features/services/interface/ServiceDetail.props.ts|@features/category/interface/Category.props',
	'features/services/interface/ServiceDetail.props.ts|@features/news/interface/News.props',
	'features/services/interface/ServiceDetail.props.ts|@features/papers/interface/Paper.props',
	'features/services/interface/ServiceDetail.props.ts|@features/coasting/interface/Costing.props',
	'features/services/interface/ServiceDetail.props.ts|@features/buttons-panel/interface/PanelButton.props',
	'features/services/interface/ServiceDetail.props.ts|@features/banner/share/interface/ShareBanner.props',
	'features/related-services/interface/RelatedService.props.ts|@features/papers/interface/Paper.props',
	'features/related-services/interface/RelatedService.props.ts|@features/news/interface/News.props',
	'features/related-services/interface/RelatedService.props.ts|@features/coasting/interface/Costing.props',
	'features/related-services/interface/RelatedService.props.ts|@features/buttons-panel/interface/PanelButton.props',
	'features/related-services/interface/RelatedService.props.ts|@features/banner/share/interface/ShareBanner.props',
]);

const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;

const toUnix = (value) => value.split('\\').join('/');
const isCodeFile = (file) => /\.(ts|tsx|js|jsx)$/.test(file);

const walkFiles = (dir) => {
	const entries = readdirSync(dir, {withFileTypes: true});
	const result = [];
	for (const entry of entries) {
		const abs = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!IGNORED_DIRS.has(entry.name)) {
				result.push(...walkFiles(abs));
			}
			continue;
		}
		if (entry.isFile() && isCodeFile(entry.name) && statSync(abs).size > 0) {
			result.push(toUnix(relative(cwd, abs)));
		}
	}
	return result;
};

const files = (useAllFiles ? walkFiles(cwd) : args.filter(isCodeFile))
	.map((file) => toUnix(file))
	.filter((file) => existsSync(resolve(cwd, file)));

const violations = [];

for (const file of files) {
	const source = readFileSync(resolve(cwd, file), 'utf-8');
	const imports = [...source.matchAll(IMPORT_RE)].map((m) => m[1]);
	const inShared = file.startsWith('shared/');
	const inFeature = file.startsWith('features/');
	const featureSlice = inFeature ? file.split('/')[1] : '';

	for (const target of imports) {
		const key = `${file}|${target}`;

		if (inShared && (target.startsWith('@features/') || target.startsWith('@services/'))) {
			if (!ALLOWLIST.has(key)) {
				violations.push(`${file}: запрещен импорт из бизнес-слоя -> ${target}`);
			}
			continue;
		}

		if (inFeature && target.startsWith('@features/')) {
			const targetSlice = target.split('/')[1] ?? '';
			if (targetSlice && targetSlice !== featureSlice && !ALLOWLIST.has(key)) {
				violations.push(`${file}: cross-feature импорт нарушает FSD -> ${target}`);
			}
		}
	}
}

if (violations.length > 0) {
	console.error('\nArchitecture boundary check failed:\n');
	for (const violation of violations) {
		console.error(`- ${violation}`);
	}
	process.exit(1);
}

console.log(`Architecture boundary check passed (${files.length} file(s)).`);
