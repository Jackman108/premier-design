import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';
import fs from 'node:fs';
import { createScriptLogger } from './lib/script-logger.mjs';

/** Локальный Lighthouse против production-сборки и `.next/standalone` (паритет febcode). */

const logger = createScriptLogger('perf:local');

const port = Number(process.env.PERF_LOCAL_PORT || 3001);
if (!Number.isFinite(port) || port <= 0) {
	logger.fail(`invalid PERF_LOCAL_PORT: ${process.env.PERF_LOCAL_PORT ?? ''}`);
}

const baseUrl = `http://127.0.0.1:${port}/`;
const freePortScript = path.resolve(process.cwd(), 'scripts', 'free-port-win.mjs');
const perfProdScript = path.resolve(process.cwd(), 'scripts', 'perf-prod.mjs');
const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, '.next', 'standalone');
const standaloneServerPath = path.join(standaloneDir, 'server.js');

function runOrExit(cmd, args, title) {
	logger.info(title);
	try {
		// `execFileSync` корректно передаёт путь к exe с пробелами (Windows); `spawnSync`+shell раньше давал «C:\Program не является командой».
		execFileSync(cmd, args, { stdio: 'inherit' });
	} catch (err) {
		const code = err && typeof err.status === 'number' ? err.status : 1;
		logger.exit(code);
	}
}

function runYarnOrExit(args, title) {
	logger.info(title);
	/** На Windows без shell `CreateProcess("yarn")` не резолвит `yarn.cmd` → часто `status: null`, код 1 и пустой лог сборки. */
	const run =
		process.platform === 'win32'
			? spawnSync(`yarn ${args.join(' ')}`, {
					stdio: 'inherit',
					env: process.env,
					shell: true,
				})
			: spawnSync('yarn', args, { stdio: 'inherit', env: process.env });
	if (run.error) {
		logger.error(run.error.message);
		logger.exit(1);
	}
	if (run.status !== 0) logger.exit(run.status ?? 1);
}

async function waitForServer(url, timeoutMs = 60_000) {
	const startedAt = Date.now();
	while (Date.now() - startedAt < timeoutMs) {
		try {
			const response = await fetch(url, { method: 'GET' });
			if (response.ok) return;
		} catch {
			// continue polling
		}
		await sleep(500);
	}
	throw new Error(`server did not become ready in ${timeoutMs}ms: ${url}`);
}

function stopProcessTree(child) {
	if (!child?.pid) return;
	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
		return;
	}
	child.kill('SIGTERM');
}

async function ensureStandaloneAssets() {
	if (!fs.existsSync(standaloneServerPath)) {
		logger.fail(`${standaloneServerPath} not found. Run yarn build first (output: standalone).`);
	}

	const fromStatic = path.join(projectRoot, '.next', 'static');
	const toStatic = path.join(standaloneDir, '.next', 'static');
	if (fs.existsSync(fromStatic)) {
		await fs.promises.mkdir(path.dirname(toStatic), { recursive: true });
		await fs.promises.cp(fromStatic, toStatic, { recursive: true, force: true });
	}

	const fromPublic = path.join(projectRoot, 'public');
	const toPublic = path.join(standaloneDir, 'public');
	if (fs.existsSync(fromPublic)) {
		await fs.promises.cp(fromPublic, toPublic, { recursive: true, force: true });
	}
}

if (process.platform === 'win32') {
	runOrExit(process.execPath, [freePortScript, String(port)], `free port ${port}`);
}

runYarnOrExit(['build'], 'building production bundle');
await ensureStandaloneAssets();

logger.info(`starting standalone server on ${baseUrl}`);
/** Без `.env` в production режиме падает `validateStartupEnv()` (TELEGRAM_*). Для локального Lighthouse это допустимо — как при сборке образа. Строгий прогон: `PERF_LOCAL_STRICT_ENV=1`. */
const serverEnv = {
	...process.env,
	NODE_ENV: 'production',
	PORT: String(port),
};
if (process.env.PERF_LOCAL_STRICT_ENV !== '1') {
	serverEnv.SKIP_STARTUP_ENV_VALIDATION = '1';
}
const server = spawn(process.execPath, [standaloneServerPath], {
	stdio: 'inherit',
	env: serverEnv,
	cwd: standaloneDir,
});

try {
	await waitForServer(baseUrl);
	runOrExit(process.execPath, [perfProdScript, baseUrl], 'running lighthouse against local server');
} finally {
	stopProcessTree(server);
}
