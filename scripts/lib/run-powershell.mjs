import { spawnSync } from 'node:child_process';

export function runPowerShell(command) {
	const result = spawnSync('powershell', ['-NoProfile', '-Command', command], {
		encoding: 'utf8',
	});

	if (result.error) throw result.error;

	return {
		code: result.status ?? 0,
		stdout: (result.stdout ?? '').trim(),
		stderr: (result.stderr ?? '').trim(),
	};
}
