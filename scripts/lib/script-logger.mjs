function formatScope(scope) {
	return `[${scope}]`;
}

function hasMessage(value) {
	return typeof value === 'string' && value.length > 0;
}

export function createScriptLogger(scope) {
	const prefix = formatScope(scope);

	return {
		info(message, ...args) {
			console.log(`${prefix} ${message}`, ...args);
		},
		warn(message, ...args) {
			console.warn(`${prefix} ${message}`, ...args);
		},
		error(message, ...args) {
			console.error(`${prefix} ${message}`, ...args);
		},
		exit(exitCode = 0) {
			process.exit(exitCode);
		},
		fail(message, exitCode = 1, ...args) {
			if (hasMessage(message)) {
				this.error(message, ...args);
			}
			process.exit(exitCode);
		},
	};
}
