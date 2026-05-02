import { createScriptLogger } from './lib/script-logger.mjs';
import { runPowerShell } from './lib/run-powershell.mjs';

const logger = createScriptLogger('free-port');

const port = Number(process.argv[2]);
if (!Number.isFinite(port) || port <= 0) {
	logger.fail('Usage: node ./scripts/free-port-win.mjs <port>');
}

const find = runPowerShell(
	`Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess`,
);

if (!find.stdout) {
	logger.info(`port ${port} is free`);
	logger.exit(0);
}

const pids = Array.from(
	new Set(
		find.stdout
			.split(/\s+/)
			.map((x) => Number(x))
			.filter((n) => Number.isFinite(n) && n > 0),
	),
);

for (const pid of pids) {
	const stop = runPowerShell(`Stop-Process -Id ${pid} -Force -ErrorAction SilentlyContinue`);
	if (stop.code === 0) {
		logger.info(`killed pid ${pid} (port ${port})`);
	}
}
